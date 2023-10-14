<script>
  import '../styles/global.scss';
  import Navbar from './Navbar.svelte';
  import { onMount } from 'svelte';

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
    return () => {
      window.onscroll = null;
    };
  });

</script>

<Navbar {theme} />
<slot />
