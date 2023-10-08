<script>
  import '../styles/global.scss';
  import Navbar from './Navbar.svelte';

  const theme = {
    backgroundColor: '#000',
    color: '#fff'
  };
</script>

<Navbar {theme} />
<slot />
