<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';

  let screenWidth;
  let screenHeight;
  const BOTTLE_RATIO = 0.6561;
  let bottleHeight;
  let bottleWidth;
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
    window.addEventListener('resize', () => {
      screenWidth = window.innerWidth;
      screenHeight = window.innerHeight;
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#section3',
        scrub: true,
        pin: true,
        end: 'bottom -100%',
        markers: true,
      }
    });

    // https://gsap.com/community/forums/topic/8237-blur-filters/
    const blurElement: HTMLElement = document.querySelector('#bottle-blur')!;
    const blurStyle = window.getComputedStyle(blurElement)['backdrop-filter'];
    const blur = Number(/[0-9]+/.exec(blurStyle)[0]);
    const blurHelper = { blur };

    timeline.to('#bottle-centering-container', {
      bottom: 'calc(50vh)',
      transform: 'translate(0, 50%)',
      rotate: 0,
    })
      .to('#bottle-container', {
        scale: 1.5 * Math.max(screenWidth / bottleWidth, screenHeight / bottleHeight),
        onUpdate: () => {
          gsap.set('#bottle-centering-container', {
            transform: 'translate(0, 50%)',
          })
        }
      })
      .to('#sensation', {
        autoAlpha: 0,
        onComplete: () => {
          sensation.style.display = 'none';
          emotion.style.display = 'block';
        }
      })
      .to('#emotion', {
        autoAlpha: 1,
        duration: 3,
      })
      .to(blurHelper, {
        blur: 0,
        onUpdate: () => {
          gsap.set(blurElement, {
            'backdrop-filter': `blur(${blurHelper.blur}px)`,
          });
        }
      });

  });
</script>

<div id="section3">
  <div id="sensation" bind:this={sensation}>Perfume <span class="accent">is</span><br> a sensation</div>
  <div id="emotion" bind:this={emotion}>an emotion</div>
</div>

<style lang="scss">
  #section3 {
    opacity: 0.7;
    /* background: url("./photos/mio-ito-B_SLtmXPKNA.jpg"),
    * linear-gradient(0deg, #F8E2E0 0%, rgba(247, 223, 221, 0.00) 95.43%),
    * #F9E5E3; */
    background: url("./photos/mio-ito-B_SLtmXPKNA.jpg"), linear-gradient(0deg, #F8E2E0 0%, rgba(247, 223, 221, 0.00) 95.43%), #ffe0dd;
    background-blend-mode: overlay, multiply;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #section3 {
    display: flex;
    flex-direction: column;

  }

  #section3 div {
    text-align: center;
  }

  #sensation {
    @include impact;
    @include typographic-scale(3, 0);
    color: var(--Red);

    & .accent {
      @include accent;
    }
  }

  #emotion {
    @include accent;
    @include typographic-scale(2, 1);
    color: var(--Black);
  }
    
</style>

