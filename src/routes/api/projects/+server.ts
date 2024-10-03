import { error, json, RequestHandler } from '@sveltejs/kit';
import { formSchema, FormSchemaType } from '@/routes/projects/add/schema';
import { ZodError } from 'zod';
import { prisma } from '@/lib/api/prisma';
import { PublicKey } from '@solana/web3.js';
import nacl from 'tweetnacl';
import bs58 from 'bs58';


export const POST: RequestHandler = async({ request }) => {
  const rawBody = await request.text();
  const encodedMessage = new TextEncoder().encode(rawBody);
  const signature = request.headers.get('X-Signature');
  if (!signature) {
    throw error(401, 'Unauthorized');
  }
  const publicKeyString = request.headers.get('X-Public-Key');
  if (!publicKeyString) {
    throw error(401, 'Unauthorized');
  }
  const publicKey: PublicKey = new PublicKey(publicKeyString);
  const isVerified = nacl.sign.detached.verify(encodedMessage, bs58.decode(signature), bs58.decode(publicKey.toBase58()));
  if (!isVerified) {
    throw error(403, 'Forbidden');
  }

  let result: FormSchemaType;
  try {
    const jsonBody = JSON.parse(rawBody);
    result = formSchema.parse(jsonBody);
  } catch (e) {
    if (e instanceof ZodError) {
      const firstError = e.errors[0];
      const message = firstError.path.join('.') + ': ' + firstError.message;
      throw error(400, message);
    }
    throw error(400, 'Invalid body');
  }

  const project = await prisma.project.create({
    data: {
      name: result.name,
      description: result.description,
      topNotes: result.topNotes,
      baseNotes: result.baseNotes,
      middleNotes: result.middleNotes,
    },
  });
  return json(project, { status: 200 });
}
