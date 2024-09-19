<script lang="ts">
  import { easeCubicFactory } from '$lib/easing';
  import Image from '$lib/Image.svelte';
  import MouseAcceleratedVideo from '$lib/mouseAcceleratedVideo.svelte';
  import ClickableText from '$lib/UI/ClickableText.svelte';
  import { gsap } from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';
  import { onMount } from 'svelte';

  const easingParameters: [number, number, number, number] = [0.16, 1, 0.3, 1];
  const easingFunction = easeCubicFactory(...easingParameters);

  let ctaText: string = 'Activate sound';
  let ctaDisabled: boolean = false;

  const activateUnmuted = () => {
    ctaText = 'Scroll to discover';
    ctaDisabled = true;
  };

  onMount(() => {
    const gsapContext = gsap.context(() => {
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
    return () => {
      gsapContext.revert();
    };
  });
</script>

<section id="above-the-fold">
  <div class="circle">
    <MouseAcceleratedVideo targetReturnTime={1} {easingFunction} />
  </div>
  <div
    class="z-20"
    id="rocks"
  >
    <Image src="photos/rocks" alt="Black rocks shining reflecting a discreet blue light" />
  </div>
  <div class="cta">
    <ClickableText text={ctaText} disabled={ctaDisabled} onClick={activateUnmuted} />
  </div>
  <div
    class="z-30"
    id="black-rectangle"
  />
</section>

<style lang="scss">
  @import './style.scss';

  #above-the-fold {
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
    width: circle-size-with-navbar(0.9);
    height: circle-size-with-navbar(0.9);
    border-radius: 50%;
    overflow: hidden;
    z-index: 0;
  }

  $bottom-rocks: calc(50% - circle-size-with-navbar(0.46));
  #rocks {
    position: absolute;
    width: circle-size-with-navbar(1.8);
    bottom: $bottom-rocks;
  }

  #black-rectangle {
    position: absolute;
    bottom: 0;
    height: calc($bottom-rocks + 5px);
    width: 100vw;
    background-color: var(--Black);
  }

  .cta {
    position: absolute;
    bottom: 0;
    z-index: 4;
    bottom: circle-size-with-navbar(0.1);
  }
</style>
