<script lang="ts">
  export let href: string;
  export let disabled: boolean = false;
</script>

<a
  href={href}
  class="button"
  class:disabled={disabled}
>
  <slot></slot>
  <div class="underline" />
</a>

<style lang="scss">
@import 'src/styles/link.scss';

</style>
