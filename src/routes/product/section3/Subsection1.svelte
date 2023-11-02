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

    timeline.to('#bottle-centering-container', {
      bottom: 'calc(50vh)',
      transform: 'translate(0, 50%)',
      rotate: 0,
    })
      .to('#bottle-container', {
        scale: 1.8 * Math.max(screenWidth / bottleWidth, screenHeight / bottleHeight),
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
        }
      })
      .to('#emotion', {
        autoAlpha: 1,
        duration: 0.5,
      })
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
  <div id="sensation" bind:this={sensation}>Perfume <span class="accent">is</span><br> a sensation</div>
  <div id="emotion" bind:this={emotion}>an emotion</div>
</div>

<style lang="scss">
  .subsection1 {
    /* background-color: red; */
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  #sensation {
    @include impact;
    @include typographic-scale(3, 0);
    color: var(--Red);
    z-index: 1;

    & .accent {
      @include accent;
    }
  }

  #emotion {
    @include accent;
    @include typographic-scale(2, 1);
    color: var(--Black);
    background-color: #bdbdbd;
    border-radius: 50%;
    width: circle-size(0.7);
    height: circle-size(0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -2;
  }
    
</style>
