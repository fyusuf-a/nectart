import { txConfig, umi } from '$lib/blockchain/umi';
import { sol } from '@metaplex-foundation/umi';
import { json } from '@sveltejs/kit';

export async function POST() {
  const airDropAmount = sol(100);
  await umi.rpc.airdrop(umi.identity.publicKey, airDropAmount, txConfig.confirm);
  return json({ message: 'Airdrop successful' }, { status: 200 });
}
