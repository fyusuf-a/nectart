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
  import WalletProvider from '@/lib/blockchain/WalletProvider.svelte';
  import Navbar from './Navbar.svelte';
  import Theme from '@/lib/style/Theme.svelte';
  import { themeStore } from '@/stores/theme';

  let theme: 'light' | 'dark' | 'transparent' = 'light';
  themeStore.subscribe((value) => {
    theme = value;
  });

  const queryClient = new QueryClient();

  gsap.registerPlugin(ScrollTrigger);

  onMount(() => {
    lenis.initialize(new Lenis());
    return () => {
      window.onscroll = null;
      lenis.destroy();
      queryClient.unmount();
    };
  });
</script>

<QueryClientProvider client={queryClient}>
  <WalletProvider>
    <Theme tag="div" theme={theme}>
      <Navbar theme={theme} />
      <slot />
    </Theme>
  </WalletProvider>
</QueryClientProvider>
