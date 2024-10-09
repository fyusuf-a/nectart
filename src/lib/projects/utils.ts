import { BUDGET_IN_SOL } from '$lib/constants';
import { del, put } from '@vercel/blob';
import type { Project } from '@prisma/client';
import { addConfigLines, create as createCandyMachine } from '@metaplex-foundation/mpl-core-candy-machine';
import { generateSigner, type PublicKey, sol, some } from '@metaplex-foundation/umi';
import { umi } from '@/lib/blockchain/backendUmi';
import { sendAndConfirmTransaction } from '@/lib/blockchain/utils';
import { createCollectionV1 } from '@metaplex-foundation/mpl-core';
import { prisma } from '@/lib/api/prisma';
import { type FormSchemaType } from '@/routes/projects/add/schema';

const env = import.meta.env ?? process.env;

const loadCandyMachine = async (candyMachinePublicKey: PublicKey, tokenNumber: number, projectId: string) => {
  const transactions = [];
  for (let i = 0; i < tokenNumber; i += 20) {
    const arrayLength = i <= tokenNumber - 20 ? 20 : tokenNumber % 20;
    const configLines = Array.from({ length: arrayLength }, (_, j) => ({
      uri: `${projectId}.json`,
      name: `${i + j}`,
    }));
    const configLinesTransaction = addConfigLines(umi, {
      candyMachine: candyMachinePublicKey,
      index: i,
      configLines,
    });
    transactions.push(configLinesTransaction);
  }
  await Promise.all(transactions.map(async (transaction) => sendAndConfirmTransaction(umi, transaction)));
}


export const createProject = async (result: FormSchemaType, locals: { user: { id: string; } }) => {
  await umi.rpc.airdrop(umi.identity.publicKey, sol(2));
  let project: Project | null = null;
  try {
    return await prisma.$transaction(async (tx) => {
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
      if (!project) {
        throw new Error('Project not created');
      }
      const { url } = await put(`projects/${project.id}/1`, result.picture as File, { access: 'public' });
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
        uri: `${env.VITE_URL}/metadata/${project.id}.json`,
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
            prefixUri: `${env.VITE_URL}/metadata/`,
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
      return project;
    }, {
      timeout: 240 * 1_000,
    });
  } catch (e) {
    console.error(e);
    if (project) {
      await del(`projects/${(project as Project).id}/1`);
    }
    throw e;
  }
}

