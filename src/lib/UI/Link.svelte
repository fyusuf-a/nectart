<script lang="ts">
  export let href: string;
  export let disabled: boolean = false;
</script>

<a
  {href} class="button"
  class:disabled
  {...$$restProps}
>
  <slot />
  <div class="underline" />
</a>

<style lang="scss">
  @import 'src/styles/link.scss';
</style>
