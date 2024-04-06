<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { createQuery } from '@tanstack/svelte-query';

  const query = createQuery({
    queryKey: ["me"],
    queryFn: async () => {
      return 5;
    }
  })

  onMount(() => {
    if ($page.url.pathname === '/') {
      goto('/product');
    }
  });
</script>
