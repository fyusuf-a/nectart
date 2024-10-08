import { readable, writable } from 'svelte/store';
import type { Umi } from '@metaplex-foundation/umi';
import type { SolanaConnect } from 'solana-connect';
import type { Adapter } from "@solana/wallet-adapter-base";
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { mplCandyMachine } from '@metaplex-foundation/mpl-core-candy-machine';

let solConnect: SolanaConnect | null = null;
let umi: Umi = createUmi(import.meta.env.VITE_RPC_ENDPOINT);
export const umiStore = readable<Umi>(umi);

const createWallet = () => {
  const { subscribe, set, update } = writable<SolanaConnect | null>(null);
  const initialize = () => {
    solConnect = new (window as any).SolanaConnect() as SolanaConnect;
    solConnect.onWalletChange((adapter: Adapter | null) => {
      if (adapter) {
        umi = umi.use(walletAdapterIdentity(adapter))
          .use(mplCandyMachine());
        return;
      }
    });
  }
  const connect = async () => {
    return new Promise((resolve, reject) => {
      if (!solConnect) return;
      const wallet = solConnect.getWallet();
      if (wallet) {
        resolve(wallet);
        return;
      }
      solConnect.onVisibilityChange((visible: boolean) => {
        const wallet = solConnect?.getWallet();
        if (!visible) {
          if (!wallet) {
            reject(new Error('Wallet not initialized'));
            return;
          }
          resolve(wallet);
        }
      });
      solConnect.openMenu();
    });
  }
  let actionStackOnConnect: (() => Promise<void>)[] = [];
  const addActionStackOnConnect = (action: () => Promise<void>) => {
    actionStackOnConnect.push(action);
  }
  return {
    set,
    subscribe,
    update,
    initialize,
    addActionStackOnConnect,
    connect,
  }
}

export const walletStore = createWallet();
