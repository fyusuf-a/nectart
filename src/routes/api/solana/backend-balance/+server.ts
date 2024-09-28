import { txConfig, umi } from '$lib/blockchain/backendUmi';
import { amountToString } from '@metaplex-foundation/umi';
import { json } from '@sveltejs/kit';

export async function GET() {
  const amount = await umi.rpc.getBalance(umi.identity.publicKey, txConfig.confirm);
  return json({ amount: amountToString(amount) }, { status: 200 });
}
