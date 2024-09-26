<script>
  import '../styles/site-wide.scss';
  import "../app.css";
  import '../styles/global.scss';
  import { onMount } from 'svelte';
  import Lenis from '@studio-freight/lenis';
  import { lenis } from '../stores/lenis';
  import ScrollTrigger from 'gsap/ScrollTrigger';
  import { gsap } from 'gsap';
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';

  const queryClient = new QueryClient();

  gsap.registerPlugin(ScrollTrigger);

  onMount(() => {
    lenis.initialize(new Lenis());
    return () => {
      window.onscroll = null;
      lenis.destroy();
    };
  });
</script>

<QueryClientProvider client={queryClient}>
  <slot />
</QueryClientProvider>
