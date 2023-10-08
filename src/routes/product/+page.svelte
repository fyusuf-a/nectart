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
  <div class="rocks">
    <img src="photos/rocks.png" alt="" />
  </div>
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
    width: 50vw;
    height: 50vw;
    background-color: green;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    z-index: 1;
  }

  .rocks img {
    background-color: transparent;
    position: absolute;
    width: 100%;
    bottom: calc(50% - 27vw);
    left: 0;
    right: 0;
    z-index: 2;
  }

  .rocks {
    position: relative;
    width: 100vw;
    height: calc(100vh - 92px);
  }
</style>
