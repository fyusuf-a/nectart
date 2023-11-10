<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';

  let screenWidth: number;
  let screenHeight: number;
  const BOTTLE_RATIO = 0.6561;
  let bottleHeight: number;
  let bottleWidth: number;
  let sensation: HTMLElement;
  let emotion: HTMLElement;

  // Pin the section
  onMount(() => {
    emotion.style.display = 'none';
    emotion.style.opacity = '0';

    // getting dimensions to scale the bottle
    bottleWidth = (document.getElementById('bottle-container') as HTMLElement).offsetWidth;
    bottleHeight = bottleWidth * BOTTLE_RATIO;
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    let getScreenSize = () => {
      screenWidth = window.innerWidth;
      screenHeight = window.innerHeight;
    };
    window.addEventListener('resize', getScreenSize);

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#section3 .subsection1',
        scrub: true,
        pin: '#section3 .subsection1',
        invalidateOnRefresh: true,
      }
    });

    // https://gsap.com/community/forums/topic/8237-blur-filters/
    const blurElement: HTMLElement = document.querySelector('#bottle-blur')!;
    const blurStyle = window.getComputedStyle(blurElement)['backdrop-filter'];

    const blur = Number(/[0-9]+/.exec(blurStyle)![0]);
    const blurHelper = { blur };
    const scaleFactor = 1.8;

    timeline.to('#bottle-centering-container', {
      bottom: 'calc(50vh)',
      transform: 'translate(0, 50%)',
      rotate: 0,
    })
      .to('#bottle-container', {
        scale: scaleFactor * Math.max(screenWidth / bottleWidth, screenHeight / bottleHeight),
        duration: 2,
        onUpdate: () => {
          gsap.set('#bottle-centering-container', {
            transform: 'translate(0, 50%)',
          })
        }
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
        duration: 0.5,
      })
      .to('#section3 .background-circle',
        {
          opacity: 1,
          duration: 0.5,
        },
        '<'
      )
      .to(blurHelper, {
        blur: 0,
        onUpdate: () => {
          gsap.set(blurElement, {
            'backdrop-filter': `blur(${blurHelper.blur}px)`,
          });
        }
      });
    return () => {
      window.removeEventListener('resize', getScreenSize);
    }
  });
</script>

<div class="subsection1">
  <div class="section-background" />
  <div class="background-circle"/>
  <div id="sensation" bind:this={sensation}>Perfume <span class="accent">is</span><br> a sensation</div>
  <div id="emotion" bind:this={emotion}>an emotion</div>
</div>

<style lang="scss">
  @import 'style.scss';

  .subsection1 {
    background: #F9E5E3;
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
    color: var(--Red);
    z-index: 1;

    & .accent {
      @include accent;
    }
  }

  .background-circle {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #bdbdbd;
    border-radius: 50%;
    width: circle-size(0.7);
    height: circle-size(0.7);
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
  }

  .section-background {
    @include background;
  }
</style>
