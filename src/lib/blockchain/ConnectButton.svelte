<script lang="ts">
import Button from "$lib/components/ui/button/button.svelte";
import { wallet } from "@/stores/wallet";
import { addressStore } from "@/stores/wallet";
import { get } from "svelte/store";
import { onMount } from "svelte";
import type { PublicKey } from "@metaplex-foundation/umi";


const openMenu = async() => {
  const walletInstance = get(wallet);
  if (!walletInstance) return;
  walletInstance.openMenu();
};

let address: string | null = null;
onMount(() => {
  wallet.initialize()
  addressStore.subscribe((value: PublicKey | null) => {
    address = value ? value.toString().slice(0, 2) + "..." + value.toString().slice(-2) : null;
  });
});

</script>

<Button
  on:click={openMenu}
  variant="outline"
>
  {#if address === null}
    Connect
  {:else}
    Disconnect wallet { address ? address : "" }
  {/if}
</Button>
