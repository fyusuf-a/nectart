<script lang="ts">
  import Navbar from '../Navbar.svelte';
  import type { Theme } from '$lib/types/theme.d';

  const theme: Theme = {
    backgroundColor: 'var(--Black)',
    color: 'var(--White)'
  };
</script>

<Navbar {theme} />
<slot />
