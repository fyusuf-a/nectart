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
    const navbar = document.querySelector('#navbar');
    const navbarHeight = getComputedStyle(navbar).height;
    let prevScrollpos = window.scrollY;
    window.onscroll = function () {
      const currentScrollPos = window.scrollY;
      if (prevScrollpos > currentScrollPos) {
        navbar.style.top = null;
      } else {
        navbar.style.top = '-' + navbarHeight;
      }
      prevScrollpos = currentScrollPos;
    };
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
