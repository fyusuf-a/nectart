<script lang="ts">
  import { onMount } from 'svelte';
  import Link from '$lib/UI/Link.svelte';
  import { page } from '$app/stores';
  import { navbarHeight } from '../stores/navbarHeight';
  import Theme from '@/lib/style/Theme.svelte';
  import type { Theme as ThemeType } from '$lib/types/theme.d';
  import { themeStore } from '@/stores/theme';
  import Logo from '@/lib/components/Logo.svelte';

  export let theme: ThemeType = 'light' as ThemeType;


  type Route = {
    name: string;
    path: string;
    theme?: 'light' | 'dark' | 'transparent';
  };

  const routesLeft: Route[] = [
    {
      name: 'Boutique',
      path: '/boutique',
      theme: 'dark'
    }
    //{
    //  name: 'Contact',
    //  path: 'mailto:contact@nect.art'
    //},
  ];

  const routesRight: Route[] = [
    {
      name: 'Projects',
      path: '/projects'
    },
  ];

  const routes = [...routesLeft, { name: 'Home', path: '/product', theme: 'dark' }, ...routesRight];

  let navbar: HTMLElement;
  function updateNavbarHeight() {
    navbarHeight.set(navbar.offsetHeight);
  }

  $: {
    theme = routes.find((route) => route.path === $page.url.pathname)?.theme ?? "light";
    themeStore.set(theme);
  };

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

<Theme tag="div" theme={theme} class="navbar">
<nav
  class="navbar flex items-center bg-[var(--background-color)] h-scale-2-2"
  bind:this={navbar}
>
  {#each routesLeft as route}
    <div class="flex flex-1 justify-center">
      <Link href={route.path} disabled={route.path === $page.url.pathname}>
        {route.name}
      </Link>
    </div>
  {/each}
  <a class="flex-1" href="/product">
    <Logo class="h-scale-1-0" />
  </a>
  {#each routesRight as route}
    <div class="flex flex-1 justify-center">
      <Link href={route.path} disabled={route.path === $page.url.pathname}>
        {route.name}
      </Link>
    </div>
  {/each}
</nav>
</Theme>

<style lang="scss">
  .navbar {
    box-sizing: border-box;
    position: fixed;
    top: 0;
    width: 100vw;
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
