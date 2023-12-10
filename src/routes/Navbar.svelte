<script lang="ts">
  import { onMount } from 'svelte';
  import Link from '$lib/UI/Link.svelte';
  import { page } from '$app/stores';

  const routes = [
    {
      name: 'Our product',
      path: '/product'
    },
    {
      name: 'Plum elixir',
      path: '/plum-elixir'
    },
    {
      name: 'Contact',
      path: '/contact'
    }
  ];

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
  });
</script>

<nav id="navbar" bind:this={navbar}>
  {#each routes as route}
    <div class="link">
      <Link href={route.path} disabled={route.path === $page.url.pathname}>
        {route.name}
      </Link>
    </div>
  {/each}
</nav>

<style lang="scss">
  .link {
    width: 10em;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  nav {
    background-color: var(--background-color);
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
