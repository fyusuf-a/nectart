import { error, json, RequestHandler } from '@sveltejs/kit';
import { BUDGET_IN_SOL } from '$lib/constants';
import { formSchema, FormSchemaType } from '@/routes/projects/add/schema';
import { ZodError } from 'zod';
import { prisma } from '@/lib/api/prisma';
import { del, put } from '@vercel/blob';
import { Project } from '@prisma/client';
import { addConfigLines, create as createCandyMachine } from '@metaplex-foundation/mpl-core-candy-machine';
import { generateSigner, PublicKey, sol, some } from '@metaplex-foundation/umi';
import { umi } from '@/lib/blockchain/backendUmi';
import { sendAndConfirmTransaction } from '@/lib/blockchain/utils';
import { createCollectionV1 } from '@metaplex-foundation/mpl-core';

const loadCandyMachine = async (candyMachinePublicKey: PublicKey, tokenNumber: number, projectId: string) => {
  for (let i = 0; i < tokenNumber;) {
    const arrayLength = i < tokenNumber - 20 ? 20 : tokenNumber % 20;
    const configLines = Array.from({ length: arrayLength }, (_, j) => ({
      uri: `${projectId}.json`,
      name: `${i + j}`,
    }));
    const configLinesTransaction = addConfigLines(umi, {
      candyMachine: candyMachinePublicKey,
      index: i,
      configLines,
    });
    await sendAndConfirmTransaction(umi, configLinesTransaction);
    i += arrayLength;
  }
}

export const GET: RequestHandler = async() => {
  const projects = await prisma.project.findMany({
    include: {
      user: true,
      images: {
        take: 1,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return json(projects, { status: 200 });
}

export const POST: RequestHandler = async({ request, locals }) => {
  await umi.rpc.airdrop(umi.identity.publicKey, sol(2));
  let result: FormSchemaType;
  try {
    const body = await request.formData();
    const data = JSON.parse(body.get('data') as string);
    result = formSchema.parse({
      ...data,
      picture: body.get('picture'),
    });
  } catch (e) {
    if (e instanceof ZodError) {
      const firstError = e.errors[0];
      const message = firstError.path.join('.') + ': ' + firstError.message;
      throw error(400, message);
    }
    throw error(400, 'Invalid body');
  }

  let project: Project | null = null;
  try {
    await prisma.$transaction(async (tx) => {
      project = await tx.project.create({
        data: {
          name: result.name,
          description: result.description,
          topNotes: result.topNotes,
          baseNotes: result.baseNotes,
          heartNotes: result.heartNotes,
          userId: locals.user.id,
          budgetInSol: BUDGET_IN_SOL,
          tokenNumber: result.tokenNumber,
        },
      });
      const { url } = await put(`projects/${project.id}/1`, result.picture, { access: 'public' });
      await tx.image.create({
        data: {
          url,
          projectId: project.id,
        },
      });

      const candyMachine = generateSigner(umi);
      const collectionMint = generateSigner(umi);
      const treasury = generateSigner(umi);
      await tx.candyMachine.create({
        data: {
          projectId: project.id,
          key: candyMachine.secretKey.toString(),
          collectionKey: collectionMint.secretKey.toString(),
          treasuryKey: treasury.secretKey.toString(),
        },
      });
      await createCollectionV1(umi, {
        collection: collectionMint,
        name: result.name,
        uri: `${import.meta.env.VITE_URL}/metadata/${project.id}.json`,
      }).sendAndConfirm(umi)
      const transactionBuilder = await createCandyMachine(umi, {
        candyMachine,
        collection: collectionMint.publicKey,
        collectionUpdateAuthority: umi.identity,
        itemsAvailable: result.tokenNumber,
        authority: umi.identity.publicKey,
        isMutable: false,
        configLineSettings: some({
            prefixName: '',
            nameLength: 11,
            prefixUri: `${import.meta.env.VITE_URL}/metadata/`,
            uriLength: 40,
            isSequential: false,
        }),
        guards: {
          botTax: some({ lamports: sol(0.001), lastInstruction: true }),
          solPayment: some({ lamports: sol(project.budgetInSol / project.tokenNumber), destination: treasury.publicKey }),
        },
      });
      await sendAndConfirmTransaction(umi, transactionBuilder);
      await loadCandyMachine(candyMachine.publicKey, result.tokenNumber, project.id);
    },
    {
      timeout: 120000,
    });
  } catch (e) {
    console.error(e);
    if (project) {
      await del(`projects/${(project as Project).id}/1`);
    }
    throw e;
  }
  return json(project, { status: 200 });
}
