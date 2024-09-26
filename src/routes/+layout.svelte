<script lang="ts">
  import '../styles/site-wide.scss';
  import "../app.css";
  import '../styles/global.scss';
  import { onMount } from 'svelte';
  import Lenis from '@studio-freight/lenis';
  import { lenis } from '../stores/lenis';
  import ScrollTrigger from 'gsap/ScrollTrigger';
  import { gsap } from 'gsap';
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
  import { wallet } from '@/stores/wallet';
  import type { SolanaConnect } from 'solana-connect';

  const queryClient = new QueryClient();

  gsap.registerPlugin(ScrollTrigger);

  onMount(() => {
    lenis.initialize(new Lenis());
    wallet.set(new (window as any).SolanaConnect() as SolanaConnect);
    return () => {
      window.onscroll = null;
      lenis.destroy();
    };
  });
</script>

<svelte:head>
  <!-- Solana connect will not be packaged by vite -->
  <script src="https://www.unpkg.com/solana-connect"></script>
</svelte:head>
<QueryClientProvider client={queryClient}>
  <slot />
</QueryClientProvider>
