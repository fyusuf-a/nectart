import { readable, writable } from 'svelte/store';
import type { Umi } from '@metaplex-foundation/umi';
import type { SolanaConnect } from 'solana-connect';
import type { Adapter } from "@solana/wallet-adapter-base";
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { mplCandyMachine } from '@metaplex-foundation/mpl-core-candy-machine';

export const umiStore = readable<Umi | null>(null);

const createWallet = () => {
  const { subscribe, set, update } = writable<SolanaConnect | null>(null);
  const initialize = async () => subscribe(async (value) => {
    if (value) {
      value.onWalletChange((adapter: Adapter | null) => {
        if (adapter) {
          const umi = createUmi(import.meta.env.VITE_RPC_ENDPOINT)
          umi
            .use(walletAdapterIdentity(adapter))
            .use(mplCandyMachine());
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
