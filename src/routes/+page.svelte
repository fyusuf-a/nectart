<script lang="ts">
  import MouseAcceleratedVideo from '$lib/mouseAcceleratedVideo.svelte';
  import { easeCubicFactory } from '$lib/easing';

  let easingParameters: [number, number, number, number] = [0.16, 1, 0.3, 1];
  let easingFunction = easeCubicFactory(...easingParameters);
</script>

<div class="section1">
  <MouseAcceleratedVideo
    cssSelector="video.mouseAccelerated"
    targetReturnTime={1}
    {easingFunction}
  />
  <div class="circle">
    <video autoplay muted loop class="mouseAccelerated">
      <source src="videos/oleg-lehnitsky.mp4" type="video/mp4" />
    </video>
  </div>
</div>

<style>
  .section1 {
    background-color: var(--Black);
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .circle {
    width: 50vw;
    height: 50vw;
    background-color: red;
    border-radius: 50%;
    overflow: hidden;
  }

  .circle video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
