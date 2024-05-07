<script lang="ts">
  export let elementNumber = 50;
  export let direction = 'left';
  export let text = 'the soul';

  const whichClass = (i: number) => {
    let classList = 'banner-text';
    if (i % 2 === 0) {
      classList += ' transparent';
    }
    if (i === 0) classList += ' first ' + direction;
    return classList;
  };
</script>

<div class="container">
  <div class="banner">
    <!-- eslint-disable -->
    {#each Array(elementNumber) as _, i}
      <span class={whichClass(i)} aria-hidden={i !== 0}>
        {text}
      </span>
    {/each}
  </div>
</div>

<style lang="scss">
  $total-size: calc(var(--block-size) * 50);
  $direction: 'left';

  .container {
    --speed: 120s;
    --block-size: calc(#{typographic-scale(3, 0)} / var(--block-size-factor) * var(--number-of-characters));
    --number-of-characters: 8;
  }

  .container {
    width: 100%;
    overflow: hidden;
  }

  .banner {
    display: flex;
    flex-wrap: nowrap;
  }

  .banner-text {
    @include impact;
    @include typographic-scale(3, 1);
    color: var(--White);
    flex-basis: var(--block-size);
    flex-shrink: 0;
  }

  .transparent {
    color: var(--Black);
    mix-blend-mode: soft-light;
  }

  .first.left {
    animation: bannermovesleft var(--speed) linear infinite;
  }

  .first.right {
    animation: bannermovesright var(--speed) linear infinite;
  }

  @keyframes bannermovesright {
    0% {
      margin-left: calc(-25 * var(--block-size));
    }
    100% {
      margin-left: 0px;
    }
  }

  @keyframes bannermovesleft {
    0% {
      margin-left: 0px;
    }
    100% {
      margin-left: calc(-25 * var(--block-size));
    }
  }
</style>
