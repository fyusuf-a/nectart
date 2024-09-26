<script lang="ts">
  import { onMount } from 'svelte';
  import Link from '$lib/UI/Link.svelte';
  import { page } from '$app/stores';
  import { navbarHeight } from '../stores/navbarHeight';
  import Theme from '$lib/style/Theme.svelte';
  import ConnectButton from '$lib/blockchain/ConnectButton.svelte';

  type Route = {
    name: string;
    path: string;
    theme?: 'light' | 'dark';
  };

  const routes: Route[] = [
    {
      name: 'Our product',
      path: '/product',
      theme: 'dark'
    },
    {
      name: 'Auction',
      path: '/auction'
    },
    //{
    //  name: 'Contact',
    //  path: 'mailto:contact@nect.art'
    //},
  ];

  let navbar: HTMLElement;
  function updateNavbarHeight() {
    navbarHeight.set(navbar.offsetHeight);
  }

  const currentTheme: 'light' | 'dark' =  routes.find((route) => route.path === $page.url.pathname)?.theme ?? "light";

  onMount(() => {
    updateNavbarHeight();
    window.addEventListener('resize', updateNavbarHeight);


    let prevScrollpos = window.scrollY;
    const unsubscribe = navbarHeight.subscribe((height) => {
      window.onscroll = function () {
        const currentScrollPos = window.scrollY;
        if (prevScrollpos > currentScrollPos) {
          navbar.style.top = '';
        } else {
          navbar.style.top = '-' + height + 'px';
        }
        prevScrollpos = currentScrollPos;
      };
    });
    return () => {
      window.onscroll = null;
      window.removeEventListener('resize', updateNavbarHeight);
      unsubscribe();
    };
  });
</script>

<Theme tag="div" theme={currentTheme} class="navbar">
<nav
  class="navbar items-center"
  bind:this={navbar}
>
  {#each routes as route}
    <div class="link">
      <Link href={route.path} disabled={route.path === $page.url.pathname}>
        {route.name}
      </Link>
    </div>
  {/each}
  <ConnectButton />
</nav>
</Theme>

<style lang="scss">
  .link {
    width: 10em;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .navbar {
    background-color: var(--background-color);
    padding: #{$navbar-vertical-padding} 0px;
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
    @include sm {
      padding: #{$navbar-vertical-padding} 60px;
    }
  }
</style>
