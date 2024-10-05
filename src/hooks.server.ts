import { PublicKey } from '@solana/web3.js';
import nacl from 'tweetnacl';
import bs58 from 'bs58';
import { prisma } from './lib/api/prisma';

const signedRoutes = [
  {
    route: '/api/projects',
    method: 'POST',
  }
];

export async function handle({ event, resolve }) {
  const url = new URL(event.request.url);
  const isSignedRoute = signedRoutes.some(({ route, method }) => {
    return url.pathname === route && event.request.method === method;
  });

  if (!isSignedRoute) {
    return resolve(event);
  }

  const { request } = event;
  const clonedRequest = request.clone();

  let toBeEncoded: string;

  if (event.request.headers.get('Content-Type')!.startsWith('multipart/form-data')) {
    const formData = await clonedRequest.formData();
    toBeEncoded = formData.get('data') as string;
  }
  else {
    const rawBody = await clonedRequest.text();
    toBeEncoded = rawBody;
  }
  const encodedMessage = new TextEncoder().encode(toBeEncoded);

  const signature = clonedRequest.headers.get('X-Signature');
  if (!signature) {
    return new Response('Unauthorized', { status: 401 });
  }

  const publicKeyString = clonedRequest.headers.get('X-Public-Key');
  if (!publicKeyString) {
    return new Response('Unauthorized', { status: 401 });
  }
  const publicKey: PublicKey = new PublicKey(publicKeyString);
  const isVerified = nacl.sign.detached.verify(encodedMessage, bs58.decode(signature), bs58.decode(publicKey.toBase58()));
  if (!isVerified) {
    return new Response('Forbidden', { status: 403 });
  }

  const user = await prisma.user.upsert({
    where: { address: publicKey.toBase58() },
    update: {},
    create: {
      address: publicKey.toBase58(),
    },
  });

  event.locals.user = {
    id: user.id,
    address: publicKey.toBase58(),
  };

  return resolve(event);
}
