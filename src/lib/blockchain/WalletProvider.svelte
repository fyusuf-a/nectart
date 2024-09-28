<script lang="ts">
  import { wallet } from '@/stores/wallet';
  import type { SolanaConnect } from 'solana-connect';
  import { onMount } from 'svelte';

  onMount(() => wallet.set(new (window as any).SolanaConnect() as SolanaConnect));
</script>


<svelte:head>
  <!-- Solana connect will not be packaged by vite -->
  <script src="https://www.unpkg.com/solana-connect"></script>
</svelte:head>
<slot />
