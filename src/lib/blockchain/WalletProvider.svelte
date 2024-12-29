<script lang="ts">
 // import { walletStore } from '@/stores/wallet';
  import { onMount } from 'svelte';

//  onMount(() => {
//    walletStore.initialize();
//  });
</script>


<svelte:head>
  <!-- Solana connect will not be packaged by vite -->
  <script src="/scripts/solana-connect@0.1.10.js"></script>
</svelte:head>
<slot />
