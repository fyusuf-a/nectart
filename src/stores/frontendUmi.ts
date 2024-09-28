import { readable, writable } from 'svelte/store';
import type { Umi } from '@metaplex-foundation/umi';
import type { SolanaConnect } from 'solana-connect';
import type { Adapter } from "@solana/wallet-adapter-base";
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import type { PublicKey } from "@metaplex-foundation/umi";
import { sol } from "@metaplex-foundation/umi";

export const umi = readable<Umi | null>(null);

const createWallet = () => {
  const { subscribe, set, update } = writable<SolanaConnect | null>(null);
  const initialize = async () => subscribe(async (value) => {
    if (value) {
      value.onWalletChange((adapter: Adapter | null) => {
        if (adapter) {
          console.log(adapter.publicKey?.toBase58());
          const umi = createUmi(import.meta.env.VITE_RPC_ENDPOINT)
          umi.use(walletAdapterIdentity(adapter))
          umi.rpc.airdrop(adapter.publicKey?.toBase58()! as PublicKey, sol(1.5)).then(() => {
            umi.rpc.getBalance(adapter.publicKey?.toBase58()! as PublicKey).then(balance => {
              console.log(balance);
            });
          });
          return;
        }
        console.log("Wallet disconnected");
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
