<script lang="ts">
  import Button from '@/lib/components/ui/button/button.svelte';
  import { type SolAmount, amountToString, type Umi, multiplyAmount } from '@metaplex-foundation/umi';
  import { sendAndConfirmTransaction } from '@/lib/blockchain/utils';
  import { walletStore, umiStore } from "@/stores/wallet";
  import { transferSol } from '@metaplex-foundation/mpl-toolbox';
  import { umi as backendUmi } from '$lib/blockchain/backendUmi';
  import { base58 } from '@metaplex-foundation/umi/serializers';
  import axios from 'axios';

  export let projectId: string;
  export let price: SolAmount;
  export let wantedTokens: number;

  $: totalPrice = multiplyAmount(price, wantedTokens);
  let umi: Umi;
  umiStore.subscribe((value) => {
    umi = value;
  });

  let transactionSignature: string = '';
  const mutate = async () => {
      await walletStore.connect();
      const tx = transferSol(umi, {
        destination: backendUmi.identity.publicKey,
        amount: totalPrice,
      });
      const res = await sendAndConfirmTransaction(umi, tx);
      transactionSignature = base58.deserialize(res.signature)[0];
      axios.post(`/api/projects/${projectId}/mint`, {
        transactionSignature,
      });
  }
</script>

<Button
  class="w-1/2"
  on:click={mutate}
>
  Mint { wantedTokens } token{ wantedTokens > 1 ? 's' : '' } ({Number(amountToString(multiplyAmount(price, wantedTokens)))} SOL)
</Button>
