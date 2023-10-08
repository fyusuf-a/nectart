<script lang="ts">
  import MouseAcceleratedVideo from '$lib/mouseAcceleratedVideo.svelte';
  import { easeCubicFactory } from '$lib/easing';

  let easingParameters: [number, number, number, number] = [0.16, 1, 0.3, 1];
  let easingFunction = easeCubicFactory(...easingParameters);
</script>

<div class="section1">
  <div class="circle">
    <MouseAcceleratedVideo targetReturnTime={1} {easingFunction} />
  </div>
  <img src="photos/rocks.png" alt="Black rocks shining reflecting a discreet blue light" />
</div>

<style lang="scss">
  .section1 {
    background-color: var(--Black);
    width: 100vw;
    height: calc(100vh - 92px);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .circle {
    width: 90vw;
    height: 90vw;
    @include sm {
      width: 80vw;
      height: 80vw;
    }
    @include md {
      width: 50vw;
      height: 50vw;
    }
    background-color: green;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    z-index: 1;
  }

  img {
    background-color: transparent;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 200%;
    bottom: calc(50% - 110vw);

    @include sm {
      width: 150%;
      bottom: calc(50% - 82.5vw);
    }

    @include md {
      width: 100%;
      bottom: calc(50% - 55vw);
    }
    z-index: 1;
  }
</style>
