<script lang="ts">
  import { onMount } from 'svelte';

  let sensation: HTMLElement;
  let emotion: HTMLElement;

  onMount(() => {
    emotion.style.display = 'none';
    emotion.style.opacity = '0';
  });
</script>

<section class="subsection1">
  <div class="section-background" />
  <div class="background-circle" />
  <div id="sensation" bind:this={sensation}>
    Perfume <span class="accent">is</span><br /> a sensation
  </div>
  <div id="emotion" bind:this={emotion}>an emotion</div>
</section>

<style lang="scss">
  @import 'style.scss';

  .subsection1 {
    background: #f9e5e3;
    position: relative;
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    z-index: -2;
  }

  #sensation {
    @include impact;
    @include typographic-scale(3, 1);
    text-align: center;
    color: var(--Red);
    z-index: 1;

    & .accent {
      @include accent;
    }
  }

  $emotion-size: circle-size(0.9);
  .background-circle {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #bdbdbd;
    border-radius: 50%;
    width: $emotion-size;
    height: $emotion-size;
    z-index: -5;
    opacity: 0;
  }

  #emotion {
    @include accent;
    @include typographic-scale(3, 0);
    color: var(--Black);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: -2;
    width: $emotion-size;
    text-align: center;
  }

  .section-background {
    @include background;
  }
</style>
