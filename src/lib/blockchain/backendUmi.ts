import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { mplCore } from '@metaplex-foundation/mpl-core'
import { createSignerFromKeypair, signerIdentity, type TransactionBuilderSendAndConfirmOptions } from '@metaplex-foundation/umi'

// this file is used as a standalone and in the website
const env = import.meta.env ?? process.env;

// Use the RPC endpoint of your choice.
export const umi = createUmi(env.VITE_RPC_ENDPOINT).use(mplCore())

const private_key = JSON.parse(env.VITE_BACKEND_PRIVATE_KEY);
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(private_key));

const signer = createSignerFromKeypair(umi, keypair);

umi.use(signerIdentity(signer));

export const txConfig: TransactionBuilderSendAndConfirmOptions = {
  send: { skipPreflight: true },
  confirm: { commitment: 'confirmed', }
};
