<script lang="ts">
  import { twMerge } from "tailwind-merge";

  export let href: string;
  export let disabled: boolean = false;
</script>

<a
  {href}
  {...$$restProps}
  class={ twMerge(
    $$restProps.class,
    'uppercase relative',
  )}
>
  <slot />
  <div class="absolute bottom-scale--1-0 w-full h-[1px] z-20 underline" />
</a>

<style lang="scss">
 a:hover > div {
    background-color: var(--color);
  }
  /* @import 'src/styles/link.scss'; */
</style>
