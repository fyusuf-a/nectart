<script lang="ts">
  import Image from '$lib/Image.svelte';
  import ThreeScene from '$lib/components/ThreeScene.svelte';
  import WEBGL from 'three/examples/jsm/capabilities/WebGL.js';

  let bottleContainer: HTMLDivElement;
  const isWebGLSuported = WEBGL.isWebGLAvailable();

 // onMount(() => {
 //   const gsapContext = gsap.context(() => {
 //     let randomAngle = gsap.utils.random(-5, 5, true);
 //     let randomTime = gsap.utils.random(3, 5, true);
 //     const bouncingTimeline = gsap.timeline({
 //       repeat: -1,
 //       repeatRefresh: true,
 //       paused: true
 //     });

 //     bouncingTimeline.to('#bottle-container', {
 //       rotate: randomAngle,
 //       duration: randomTime,
 //       ease: 'easeInOut'
 //     });

 //     ScrollTrigger.create({
 //       trigger: '#perfume-is-a-sensation',
 //       onEnter: () => bouncingTimeline.play(),
 //       onLeave: () => bouncingTimeline.pause(),
 //       onEnterBack: () => bouncingTimeline.play(),
 //       onLeaveBack: () => bouncingTimeline.pause(),
 //       invalidateOnRefresh: true
 //     });

 //     const straightBottleAnimation = () => {
 //       gsap.to('#bottle-container', {
 //         rotate: 0,
 //         duration: 1,
 //         ease: 'easeInOut'
 //       });
 //     };
 //     ScrollTrigger.create({
 //       trigger: '#above-the-fold',
 //       onEnter: straightBottleAnimation,
 //       onEnterBack: straightBottleAnimation,
 //       invalidateOnRefresh: true
 //     });
 //   });

 //   return () => {
 //     gsapContext.revert();
 //   };
 // });
</script>
{#if isWebGLSuported }
<div class="h-[100vh] w-[100vw] z-10 fixed">
  <ThreeScene
    objectWidth={bottleContainer?.clientWidth ?? 100}
  />
</div>
{/if}
<div id="bottle-container"
  class="left-[50vw] fixed top-0 bottom-0 z-10 -translate-x-1/2 pointer-events-none" 
  bind:this={bottleContainer}
>
  {#if !isWebGLSuported }
  <div
    id="bottle-centering-container"
    class="absolute w-full translate-y-1/2"
  >
    <!--<div-->
      <!--id="bottle-blur"-->
      <!--class="absolute z-10 top-0 left-0"-->
    <!--/>-->
    <Image
      id="bottle"
      src="photos/bottle"
      alt="A bottle of water"
      class="w-full z-20 h-auto absolute top-0 left-0"
    />
    <Image
      id="bottle-shadow"
      src="photos/bottle"
      alt="A bottle of water"
      class="w-full invisible"
    />
  </div>
  {/if}
</div>

<style lang="scss">
  @use 'sass:math';
  @import './style.scss';

  $image-ratio: math.div(477, 727);

  :root {
    --blur: 0px;
  }

  #bottle-container {
    width: circle-size-with-navbar(0.5);
  }

  #bottle-centering-container {
    bottom: calc(rest-height(0.5));
    height: calc(image-ratio * rest-height(0.5));
  }

  #bottle-blur {
    margin-top: 29%;
    margin-left: 2%;
    margin-right: 2%;
    width: 96%;
    height: 79%;
    backdrop-filter: blur(var(--blur));
  }
</style>
