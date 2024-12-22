<script lang="ts">
  import Image from '$lib/Image.svelte';
  import ThreeScene from '$lib/components/ThreeScene.svelte';
  import { onMount } from 'svelte';
  import WEBGL from 'three/examples/jsm/capabilities/WebGL.js';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  let bottleContainer: HTMLDivElement;
  const isWebGLSuported = WEBGL.isWebGLAvailable();


  let screenWidth = 0;
  let screenHeight = 0;
  let navbarHeight = 0;
  let circleSizeWithNavbar = 0;
  let bottleWidth = 0;
  let bottleHeight = 0;

  onMount(() => {
    let emotion = document.querySelector('#emotion')! as HTMLElement;
    const sensation = document.querySelector('#sensation')! as HTMLElement;
    const gsapContext = gsap.context(() => {
      let randomAngle = gsap.utils.random(-5, 5, true);
      let randomTime = gsap.utils.random(3, 5, true);
      const bouncingTimeline = gsap.timeline({
        repeat: -1,
        repeatRefresh: true,
        paused: true
      });

      bouncingTimeline.to('#bottle-container', {
        rotate: randomAngle,
        duration: randomTime,
        ease: 'easeInOut'
      });

      ScrollTrigger.create({
        trigger: '#perfume-is-a-sensation',
        onEnter: () => bouncingTimeline.play(),
        onLeave: () => bouncingTimeline.pause(),
        onEnterBack: () => bouncingTimeline.play(),
        onLeaveBack: () => bouncingTimeline.pause(),
        invalidateOnRefresh: true
      });

      const straightBottleAnimation = () => {
        gsap.to('#bottle-container', {
          rotate: 0,
          duration: 1,
          ease: 'easeInOut'
        });
      };
      ScrollTrigger.create({
        trigger: '#above-the-fold',
        onEnter: straightBottleAnimation,
        onEnterBack: straightBottleAnimation,
        invalidateOnRefresh: true
      });
    });

    // getting dimensions to scale the bottle
    let getScreenSize = () => {
      screenWidth = window.innerWidth;
      screenHeight = window.innerHeight;
      navbarHeight = document.querySelector('nav')!.clientHeight;
      circleSizeWithNavbar = Math.min(0.9 * screenWidth, 0.9 * (screenHeight - navbarHeight));
      bottleWidth = 0.5 * circleSizeWithNavbar;
      bottleHeight = 0.6561 * bottleWidth;
    };
    getScreenSize();
    window.addEventListener('resize', getScreenSize);


    // https://gsap.com/community/forums/topic/8237-blur-filters/
    const blurElement: HTMLElement = document.querySelector('#bottle-blur')!;
    const blurStyle = window.getComputedStyle(blurElement)['backdrop-filter'];

    const blur = Number(/[0-9]+/.exec(blurStyle)![0]);
    const blurHelper = { blur };
    const scaleFactor = 1.8;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#perfume-is-a-sensation .subsection1',
        scrub: true,
        pin: '#perfume-is-a-sensation .subsection1',
        invalidateOnRefresh: true
      }
    });

    timeline
      .fromTo(
        '#bottle-centering-container',
        {
          bottom: () => `${(screenHeight - navbarHeight) / 2}px`
        },
        {
          bottom: () => '50vh'
        }
      )
      .to('#bottle-container', {
        scale: () =>
          scaleFactor * Math.max(screenWidth / bottleWidth, screenHeight / bottleHeight),
        duration: 2
      })
      .to('#sensation', {
        autoAlpha: 0,
        duration: 0.5,
        onComplete: () => {
          sensation.style.display = 'none';
          emotion.style.display = 'flex';
        },
        onReverseComplete: () => {
          sensation.style.display = 'block';
          emotion.style.display = 'none';
        }
      })
      .to('#emotion', {
        autoAlpha: 1,
        duration: 0.5
      })
      .to(
        '#perfume-is-a-sensation .background-circle',
        {
          opacity: 1,
          duration: 0.5
        },
        '<'
      )
      .to(blurHelper, {
        blur: 0,
        onUpdate: () => {
          gsap.set(blurElement, {
            'backdrop-filter': `blur(${blurHelper.blur}px)`
          });
        }
      });

    return () => {
      window.removeEventListener('resize', getScreenSize);
      gsapContext.revert();
    };
  });
</script>
{#if false }
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
  {#if true }
  <div
    id="bottle-centering-container"
    class="absolute w-full translate-y-1/2"
  >
    <div
      id="bottle-blur"
      class="absolute z-10 top-0 left-0"
    />
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
