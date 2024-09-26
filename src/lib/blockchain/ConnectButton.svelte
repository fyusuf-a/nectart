<script lang="ts">
import Button from "$lib/components/ui/button/button.svelte";
import { wallet } from "@/stores/wallet";
import { get } from "svelte/store";
import type { Adapter } from "@solana/wallet-adapter-base";
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { sol } from "@metaplex-foundation/umi";
import type { PublicKey } from "@metaplex-foundation/umi";


const connectWallet = async() => {
  const walletInstance = get(wallet);
  if (!walletInstance) return;
  walletInstance.openMenu();

};

wallet.subscribe((value) => {
  if (value) {
    value.activeWallet;
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
</script>

<Button
  on:click={connectWallet}
>
    Connect
</Button>
