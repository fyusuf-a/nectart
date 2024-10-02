import { SolAmount, TransactionBuilder, dateTime, displayAmount, generateSigner, isLessThanAmount, sol, some } from '@metaplex-foundation/umi';
import { keypair, umi } from '../src/lib/blockchain/backendUmi';
import { addPlugin, create, createCollectionV1, fetchAsset, pluginAuthorityPair, ruleSet } from '@metaplex-foundation/mpl-core';
import { create as createCandyMachine, fetchAllCandyMachine } from '@metaplex-foundation/mpl-core-candy-machine';
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

  /*console.log('--- Creating asset', assetSigner.publicKey);

  await create(umi, {
    asset: assetSigner,
    name: 'Exquisite Fluids',
    uri: `http://localhost:5173/${uuidv4()}.json`,
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
  */

  const keypair = generateSigner(umi);
  const collectionMint = generateSigner(umi);
  const treasury = generateSigner(umi);
  const candyMachine = generateSigner(umi);

  console.table({
    keypair: keypair.publicKey.toString(),
    collectionMint: collectionMint.publicKey.toString(),
    treasury: treasury.publicKey.toString(),
    candyMachine: candyMachine.publicKey.toString(),
  });

  console.log('--- Creating collection');
  await createCollectionV1(umi, {
    collection: collectionMint,
    name: 'Exquisite Fluids',
    uri: 'http://localhost:5173/metadata/test.json',
  }).sendAndConfirm(umi);
  console.log('--- Collection created');

  const createIx = await createCandyMachine(umi, {
            candyMachine,
            collection: collectionMint.publicKey,
            collectionUpdateAuthority: umi.identity,
            itemsAvailable: 3,
            authority: umi.identity.publicKey,
            isMutable: false,
            configLineSettings: some({
                prefixName: 'Quick NFT #',
                nameLength: 11,
                prefixUri: 'https://example.com/metadata/',
                uriLength: 29,
                isSequential: false,
            }),
            guards: {
                botTax: some({ lamports: sol(0.001), lastInstruction: true }),
                solPayment: some({ lamports: sol(1.5), destination: treasury.publicKey }),
                startDate: some({ date: dateTime('2023-04-04T16:00:00Z') }),
                 //All other guards are disabled...
            }
        })

  /*const createIx: TransactionBuilder = await createCandyMachine(umi, {
    candyMachine,
    collection: collectionMint.publicKey,
    collectionUpdateAuthority: umi.identity,
    itemsAvailable: 3,
    authority: umi.identity.publicKey,
    isMutable: false,
  });*/

  console.log(createIx);

  await createIx.sendAndConfirm(umi);

  console.log('--- Candy machine created');

  const machines = await fetchAllCandyMachine(umi, [umi.identity.publicKey]);
  console.log('Fetched candy machine:', machines);
}



main().catch(console.error);
