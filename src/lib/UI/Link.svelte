<script lang="ts">
  import { twMerge } from 'tailwind-merge';

  export let href: string;
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
  <div class="absolute z-20 h-[1px] w-full underline bottom-scale--1-0"></div>
</a>

<style lang="scss">
 a:hover > div {
    background-color: var(--color);
  }
  /* @import 'src/styles/link.scss'; */
</style>
