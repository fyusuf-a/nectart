<script lang="ts">
  import { easeCubicFactory } from '$lib/easing';
  import MouseAcceleratedVideo from '$lib/mouseAcceleratedVideo.svelte';
  import { gsap } from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';
  import { onMount } from 'svelte';

  const easingParameters: [number, number, number, number] = [0.16, 1, 0.3, 1];
  const easingFunction = easeCubicFactory(...easingParameters);

  onMount(() => {
    const straightBottleAnimation = () => {
      gsap.to('#bottle', {
        rotate: 0,
        duration: 1,
        ease: 'easeInOut'
      });
    };
    ScrollTrigger.create({
      trigger: '#section1',
      onEnter: straightBottleAnimation,
      onEnterBack: straightBottleAnimation
    });
  });
</script>

<div id="section1">
  <div class="circle">
    <MouseAcceleratedVideo targetReturnTime={1} {easingFunction} />
  </div>
  <img
    id="rocks"
    src="photos/rocks.png"
    alt="Black rocks shining reflecting a discreet blue light"
  />
</div>

<style lang="scss">
  #section1 {
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
      width: max(50vh, 50vw);
      height: max(50vh, 50vw);
    }
    background-color: green;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    z-index: 0;
  }

  #rocks {
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
    z-index: 2;
  }
</style>
