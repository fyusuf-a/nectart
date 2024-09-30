<script lang="ts">
  import { twMerge } from "tailwind-merge";

  export let tag = 'div';
  export let theme = 'light';
  $: color = ['light', 'transparent'].includes(theme) ? 'var(--Black)' : 'var(--White)';
  $: backgroundColor = theme === 'light'
    ? 'var(--White)'
    : theme === 'dark'
      ? 'var(--Black)'
      : 'transparent';

  $: themeStyle = `
    --foreground: ${color};\
    --background-color: ${backgroundColor};\
    --color: ${color};\
    --primary: ${backgroundColor};\
    --primary-foreground: ${color};\
    --background: ${backgroundColor};\
    --input: ${backgroundColor};\
    --tw-shadow-color: red;\
  `
</script>

<svelte:element
  this={ tag }
  id="themed"
  {...$$restProps}
  style={ themeStyle + ' ' + $$restProps.style }
  class={ 
    twMerge(
      'themed w-full h-full',
      $$restProps.class,
    )
  }
>
  <slot />
</svelte:element>

<style>
.themed {
  background-color: var(--background-color);
  color: var(--color);
}
</style>
