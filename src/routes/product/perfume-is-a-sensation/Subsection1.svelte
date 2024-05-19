<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';

  // const BOTTLE_RATIO = 0.6561;
  let sensation: HTMLElement;
  let emotion: HTMLElement;

  // Pin the section
  onMount(() => {
    emotion.style.display = 'none';
    emotion.style.opacity = '0';

    let screenWidth = 0;
    let screenHeight = 0;
    let navbarHeight = 0;
    let circleSizeWithNavbar = 0;
    let bottleWidth = 0;
    let bottleHeight = 0;

    // getting dimensions to scale the bottle
    let getScreenSize = () => {
      screenWidth = window.innerWidth;
      screenHeight = window.innerHeight;
      // navbarHeight = document.querySelector('#navbar')!.clientHeight;
      navbarHeight = 0;
      circleSizeWithNavbar = Math.min(0.9 * screenWidth, 0.9 * (screenHeight - navbarHeight));
      bottleWidth = 0.5 * circleSizeWithNavbar;
      bottleHeight = 0.6561 * bottleWidth;
    };
    getScreenSize();
    window.addEventListener('resize', getScreenSize);

    const gsapContext = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: '#perfume-is-a-sensation .subsection1',
          scrub: true,
          pin: '#perfume-is-a-sensation .subsection1',
          invalidateOnRefresh: true
        }
      });

      // https://gsap.com/community/forums/topic/8237-blur-filters/
      const blurElement: HTMLElement = document.querySelector('#bottle-blur')!;
      const blurStyle = window.getComputedStyle(blurElement)['backdrop-filter'];

      const blur = Number(/[0-9]+/.exec(blurStyle)![0]);
      const blurHelper = { blur };
      const scaleFactor = 1.8;

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
    });
    return () => {
      gsapContext.revert();
      window.removeEventListener('resize', getScreenSize);
    };
  });
</script>

<section class="subsection1">
  <div class="section-background" />
  <div class="background-circle" />
  <div id="sensation" bind:this={sensation}>
    Perfume <span class="accent">is</span><br /> a sensation
  </div>
  <div id="emotion" bind:this={emotion}>an emotion</div>
</section>

<style lang="scss">
  @import 'style.scss';

  .subsection1 {
    background: #f9e5e3;
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
    text-align: center;
    color: var(--Red);
    z-index: 1;

    & .accent {
      @include accent;
    }
  }

  $emotion-size: circle-size(0.9);
  .background-circle {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #bdbdbd;
    border-radius: 50%;
    width: $emotion-size;
    height: $emotion-size;
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
    width: $emotion-size;
    text-align: center;
  }

  .section-background {
    @include background;
  }
</style>
