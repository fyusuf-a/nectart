<script lang="ts">
  import { onMount } from 'svelte';
  import Link from '$lib/UI/Link.svelte';
  import type { Theme } from '$lib/types/theme.d';
  export let theme: Theme;

  const style = `background-color: ${theme.backgroundColor}; color: ${theme.color};`;

  let navbar: HTMLElement;
  onMount(() => {
    const navbarHeight = () => getComputedStyle(navbar).height;
    let prevScrollpos = window.scrollY;
    window.onscroll = function () {
      const currentScrollPos = window.scrollY;
      if (prevScrollpos > currentScrollPos) {
        navbar.style.top = '';
      } else {
        navbar.style.top = '-' + navbarHeight();
      }
      prevScrollpos = currentScrollPos;
    };
    return () => {
      window.onscroll = null;
    };
  })
</script>

<nav {style} id="navbar" bind:this={navbar}>
  <div class="link">
    <Link
      { theme }
      href="/"
    >
      Our product
    </Link>
  </div>
  <div class="link">
    <Link
      { theme }
      href="/plum-elixir"
    >
      Plum elixir
    </Link>
  </div>
  <div class="link">
    <Link
      { theme }
      href="/contact"
    >
      Contact
    </Link>
  </div>
</nav>

<style lang="scss">
  .link {
    width: 10em;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  nav {
    padding: #{$navbar-vertical-padding} 0px;
    @include sm {
      padding: #{$navbar-vertical-padding} 60px;
    }
    box-sizing: border-box;
    position: fixed;
    top: 0;
    width: 100vw;
    height: navbar-height();
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    z-index: 100;
    transition: top 1s;
  }
</style>
