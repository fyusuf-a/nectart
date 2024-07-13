import { json } from '@sveltejs/kit';
import nacl from 'tweetnacl';


export async function POST({ request }) {
  console.log(import.meta.env);
  const PUBLIC_KEY = import.meta.env.VITE_DISCORD_PUBLIC_KEY;
  console.log('public key', PUBLIC_KEY);
  const headerList = request.headers;
  const signature = headerList.get('x-signature-ed25519');
  const timestamp = headerList.get('x-signature-timestamp');
  const rawBody = await request.text();
  const body = JSON.parse(rawBody);

  if (!signature || !timestamp) {
    return json({ error: 'Invalid request' }, { status: 401 });
  }
  
  const isVerified = nacl.sign.detached.verify(
    Buffer.from(timestamp + rawBody),
    Buffer.from(signature, 'hex'),
    Buffer.from(PUBLIC_KEY, 'hex')
  );

  if (!isVerified) {
    return json({ error: 'Invalid request' }, { status: 401 });
  }

  if (body.type == 1) {
    return json({ type: 1 });
  }
  return json({ hello: 'world' });
}
