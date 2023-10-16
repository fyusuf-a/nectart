<script lang="ts">
  export let theme;
  import { onMount } from 'svelte';

  const style = `background-color: ${theme.backgroundColor}; color: ${theme.color};`;

  let navbar: HTMLElement;
  onMount(() => {
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
  })
</script>

<nav {style} id="navbar" bind:this={navbar}>
    <a href="/">Our product</a>
    <a href="/plum-elixir">Plum elixir</a>
    <a href="/contact">Contact</a>
</nav>

<style lang="scss">
  a {
    width: 10em;
    text-align: center;
    @include typographic-scale(0, 0);
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
