<script>
  import Navbar from '../Navbar.svelte';

  const theme = {
    backgroundColor: 'var(--Black)',
    color: 'var(--White)'
  };
</script>

<Navbar {theme} />
<slot />
