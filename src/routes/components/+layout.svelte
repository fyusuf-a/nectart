<script lang="ts">
  import Navbar from '../Navbar.svelte';
  import Theme from '$lib/style/Theme.svelte';

  const theme = {
    backgroundColor: 'var(--Black)',
    color: 'var(--White)'
  };
</script>

<Theme {theme} />
<Navbar /> 
<slot />
