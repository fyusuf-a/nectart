import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { mplCore } from '@metaplex-foundation/mpl-core'
import { createSignerFromKeypair, generateSigner, signerIdentity, type TransactionBuilderSendAndConfirmOptions } from '@metaplex-foundation/umi'


// Use the RPC endpoint of your choice.
export const umi = createUmi(import.meta.env.VITE_RPC_ENDPOINT).use(mplCore())

const private_key = JSON.parse(import.meta.env.VITE_BACKEND_PRIVATE_KEY);
const array = new Uint8Array(private_key);
console.log('array', array.length);
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(private_key));

const signer = createSignerFromKeypair(umi, keypair);

umi.use(signerIdentity(signer));

export const txConfig: TransactionBuilderSendAndConfirmOptions = {
  send: { skipPreflight: true },
  confirm: { commitment: 'confirmed', }
};
