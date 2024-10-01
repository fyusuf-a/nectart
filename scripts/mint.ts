import { SolAmount, displayAmount, generateSigner, isLessThanAmount, sol } from '@metaplex-foundation/umi';
import { umi } from '../src/lib/blockchain/backendUmi';
import { addPlugin, create, fetchAsset, pluginAuthorityPair, ruleSet } from '@metaplex-foundation/mpl-core';
import { v4 as uuidv4 } from 'uuid';

async function main() {
  console.log('--- Checking balance of backend');
  const balance: SolAmount = await umi.rpc.getBalance(umi.identity.publicKey);
  if (isLessThanAmount(balance, sol(2))) {
    console.log('--- Airdropping to: ', umi.identity.publicKey);
    await umi.rpc.airdrop(umi.identity.publicKey, sol(2));
  }
  const newBalance = await umi.rpc.getBalance(umi.identity.publicKey);
  console.log(`Balance is ${displayAmount(newBalance)}`);

  const assetSigner = generateSigner(umi)

  console.log('--- Creating asset', assetSigner.publicKey);

  await create(umi, {
    asset: assetSigner,
    name: 'Exquisite Fluids',
    uri: `http://localhost:5173/${uuidv4}.json`,
    updateAuthority: umi.identity.publicKey,
  }).sendAndConfirm(umi)

  await addPlugin(umi, {
    asset: assetSigner.publicKey,
    plugin: {
      type: 'Royalties',
      basisPoints: 500,
      creators: [
        { address: umi.identity.publicKey, percentage: 100 },
      ],
      ruleSet: ruleSet('None'),
    },
  }).sendAndConfirm(umi);

  console.log('--- Asset created');

  const asset = await fetchAsset(umi, assetSigner.publicKey);
  console.log('Created asset:', asset);
}



main().catch(console.error);
