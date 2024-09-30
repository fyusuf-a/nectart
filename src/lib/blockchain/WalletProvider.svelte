<script lang="ts">
  import { wallet } from '@/stores/wallet';
  import type { SolanaConnect } from 'solana-connect';
  import { onMount } from 'svelte';

  onMount(() => wallet.set(new (window as any).SolanaConnect() as SolanaConnect));
</script>


<svelte:head>
  <!-- Solana connect will not be packaged by vite -->
  <script src="/scripts/solana-connect@0.1.10.js"></script>
</svelte:head>
<slot />
