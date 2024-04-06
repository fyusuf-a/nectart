<script lang="ts">
  import '../styles/global.scss';
  import { onMount } from 'svelte';
  import Lenis from '@studio-freight/lenis';
  import { lenis } from '../stores/lenis';
  import ScrollTrigger from 'gsap/ScrollTrigger';
  import { gsap } from 'gsap';
  import { http, createConfig } from '@wagmi/core';
  import { type Chain } from 'viem';

  gsap.registerPlugin(ScrollTrigger);

  onMount(() => {
    lenis.initialize(new Lenis());
    return () => {
      window.onscroll = null;
      lenis.destroy();
    };
  });
</script>

<slot />
