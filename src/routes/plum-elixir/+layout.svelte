<script>
  import Navbar from '../Navbar.svelte';

  const theme = {
    backgroundColor: 'var(--White)',
    color: 'var(--Black)'
  };
</script>

<Navbar {theme} />
<slot />
