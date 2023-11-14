<script lang="ts">
  import type { Theme } from '$lib/types/theme.d';
  export let text: string;
  export let onClick: () => void;
  export let theme: Theme;
  export let disabled: boolean = false;
</script>

<button
  on:click={onClick}
  class={`button${disabled ? ' disabled' : ''}`}
  style={`--color: ${theme.color};`}
>
  <div>
    { text ?? '' }
  </div>
  <div class="underline" />
</button>

<style lang="scss">
@import 'src/styles/link.scss';

.button {
  width: 100%;
  height: 100%;
}
</style>

