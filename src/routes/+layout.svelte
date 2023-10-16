<script>
  import '../styles/global.scss';
  import Navbar from './Navbar.svelte';
  import { onMount } from 'svelte';
  import Lenis from '@studio-freight/lenis';
  import { lenis } from '../stores/lenis';

  const theme = {
    backgroundColor: 'var(--Black)',
    color: 'var(--White)'
  };

  onMount(() => {
    lenis.initialize(new Lenis());

    // stop the scroll to force the user to click
    lenis.stop();
    return () => {
      window.onscroll = null;
      lenis.destroy();
    }
  }); 
</script>

<Navbar {theme} />
<slot />
