import { readable, writable } from 'svelte/store';
import type { PublicKey, Umi } from '@metaplex-foundation/umi';
import type { SolanaConnect } from 'solana-connect';
import type { Adapter } from "@solana/wallet-adapter-base";
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";

export let addressStore = writable<PublicKey | null>(null);
export const umiStore = readable<Umi>(createUmi(import.meta.env.VITE_RPC_ENDPOINT));

const createWallet = () => {
  const { subscribe, set, update } = writable<SolanaConnect | null>(null);
  const initialize = () => subscribe((value) => {
    if (value) {
      value.onWalletChange((adapter: Adapter | null) => {
        if (adapter) {
          console.log("setting signer");
          umiStore.subscribe((umi) => {
            umi.use(walletAdapterIdentity(adapter))
            addressStore.set(umi.identity.publicKey);
          });
          return;
        }
      });
    }
  });
  return {
    set,
    subscribe,
    update,
    initialize,
  }
}

export const wallet = createWallet();
