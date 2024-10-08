<script lang="ts">
  import Button from '@/lib/components/ui/button/button.svelte';
  import { type SolAmount, amountToString, type Umi, multiplyAmount, transactionBuilder, generateSigner, some, type PublicKey } from '@metaplex-foundation/umi';
  import { walletStore, umiStore } from "@/stores/wallet";
  import { setComputeUnitLimit } from '@metaplex-foundation/mpl-toolbox';
  import Spinner from '../ui/spinner/Spinner.svelte';
  import { useQueryClient } from '@tanstack/svelte-query';
  import type { ProjectWithCandyMachine } from '$lib/types/project';
  import { mintV1 } from '@metaplex-foundation/mpl-core-candy-machine';

  export let project: ProjectWithCandyMachine;
  export let price: SolAmount;
  export let tokensOwned: number;

  let loading = false;

  const queryClient = useQueryClient();

  let umi: Umi;
  umiStore.subscribe((value) => {
    umi = value;
  });

  const mint= async () => {
    await transactionBuilder()
      .add(mintV1(umi, {
        candyMachine: project.candyMachineAddress as PublicKey,
        asset: generateSigner(umi),
        collection: project.collectionAddress as PublicKey,
        mintArgs: {
          solPayment: some({ destination: project.treasuryAddress as PublicKey }),
        },
      }))
      .sendAndConfirm(umi);
    tokensOwned += 1;
    queryClient.invalidateQueries({
      queryKey: ["projects", project.id]
    });
  }

  const mutate = async () => {
    try {
      loading = true;
      await walletStore.connect();
      await mint();
    } catch (e) {
      console.error(e);
    } finally {
      loading = false;
    }
  }
</script>

{#if loading}
<Spinner />
{:else}
<Button
  class="w-1/2"
  on:click={mutate}
>
  Mint ({Number(amountToString(price))} SOL)
</Button>
{/if}
