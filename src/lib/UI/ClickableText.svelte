<script lang="ts">
  export let text: string;
  export let onClick: () => void;
  export let disabled: boolean = false;
</script>

<button on:click={onClick} class={`button${disabled ? ' disabled' : ''}`}>
  <div>
    {text ?? ''}
  </div>
  <div class="underline"></div>
</button>

<style lang="scss">
  @import 'src/styles/link.scss';

  .button {
    width: 100%;
    height: 100%;
  }
</style>
