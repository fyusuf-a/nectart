<script>
	import Navbar from '../Navbar.svelte';
	import Theme from '$lib/style/Theme.svelte';
  
	const theme = {
	  backgroundColor: 'var(--White)',
	  color: 'var(--Black)'
	};
  </script>
  
  <Theme {theme} />
  <Navbar />
<slot />