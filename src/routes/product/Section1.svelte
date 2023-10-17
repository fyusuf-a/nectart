<script lang="ts">
  import { easeCubicFactory } from '$lib/easing';
  import MouseAcceleratedVideo from '$lib/mouseAcceleratedVideo.svelte';
  import { gsap } from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';
  import { onMount } from 'svelte';
  import { lenis } from '../../stores/lenis';

  const easingParameters: [number, number, number, number] = [0.16, 1, 0.3, 1];
  const easingFunction = easeCubicFactory(...easingParameters);

  let ctaText: HTMLDivElement;

  const activateUnmuted = () => {
    // let the user scroll again
    lenis.start();
    ctaText.innerHTML = 'Scroll to discover';
  };

  onMount(() => {
    ctaText.innerHTML = 'Activate sound';
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
  <button on:click={activateUnmuted}
    class="cta"
  >
    <div bind:this={ctaText}>
      Scroll to discover
    </div>
    <div class="underline" />
  </button>
  <div id="black-rectangle" />
</div>

<style lang="scss">
  @import "./style.scss";

  #section1 {
    background-color: var(--Black);
    width: 100vw;
    margin-top: navbar-height();
    height: rest-height(1);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
  }

  .circle {
    position: relative;
    width: circle-size(0.9);
    height: circle-size(0.9);
    border-radius: 50%;
    overflow: hidden;
    z-index: 0;
  }

  $bottom-rocks: calc(50% - circle-size(0.46));
  #rocks {
    background-color: transparent;
    position: absolute;
    width: circle-size(1.8);
    bottom: $bottom-rocks;
    z-index: 2;
  }

  #black-rectangle {
    position: absolute;
    bottom: 0;
    height: calc($bottom-rocks + 5px);
    width: 100vw;
    background-color: var(--Black);
    z-index: 3;
  }

  .cta {
    position: absolute;
    color: var(--White);
    text-transform: uppercase;
    bottom: 0;
    z-index: 4;
    bottom: circle-size(0.1);
  }

  .underline {
    margin-top: 6px;
    height: 1px;
    background-color: var(--White);
    width: 100%;
  }

  button {
    @include impact;
    @include typographic-scale(0, 0);
  }
</style>
