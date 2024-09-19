<script lang="ts">
  import type { Theme } from '$lib/types/theme.d';

  export let theme: Theme;
  const cssString = `<style>\
      :root {\
        --background-color: ${theme.backgroundColor};\
        --color: ${theme.color};\
        --primary: ${theme.backgroundColor};\
        --primary-foreground: ${theme.color};\
        --background: ${theme.backgroundColor};\
        --input: ${theme.backgroundColor};\
      }\

      body {\
        background-color: var(--background-color);\
        color: var(--color);\
      }\
    </style>`;
</script>

<svelte:head>
  {@html cssString}
</svelte:head>
