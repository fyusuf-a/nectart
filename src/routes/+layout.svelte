<script>
  import '../styles/global.scss';
  import Navbar from './Navbar.svelte';
  import { onMount } from 'svelte';
  import Lenis from '@studio-freight/lenis';
  import { lenis } from '../stores/lenis';
  import ScrollTrigger from 'gsap/ScrollTrigger';
  import { gsap } from 'gsap';

  gsap.registerPlugin(ScrollTrigger);

  const theme = {
    backgroundColor: 'var(--Black)',
    color: 'var(--White)'
  };

  onMount(() => {
    lenis.initialize(new Lenis());
    return () => {
      window.onscroll = null;
      lenis.destroy();
    }
  }); 
</script>

<Navbar {theme} />
<slot />
