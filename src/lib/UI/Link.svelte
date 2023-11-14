<script lang="ts">
  import type { Theme } from '$lib/types/theme.d';

  export let href: string;
  export let theme: Theme;
  export let disabled: boolean = false;
</script>

<a
  href={href}
  class="button"
  class:disabled={disabled}
  style="--color: {theme.color};"
>
  <slot></slot>
  <div class="underline" />
</a>

<style lang="scss">
@import 'src/styles/link.scss';

</style>
