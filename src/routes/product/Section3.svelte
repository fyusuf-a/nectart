<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';

  let screenWidth;
  let screenHeight;
  const BOTTLE_RATIO = 0.6561;
  let bottleHeight;
  let bottleWidth;

  // Pin the section
  onMount(() => {
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

  });
</script>

<div id="section3">
  <div class="centered">Perfume <span class="accent">is</span><br> a sensation</div>
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

  #section3 div {
    @include impact;
    @include typographic-scale(3, 0);

    & .accent {
      @include accent;
    }

  }

  .centered {
    width: 100%;
    text-align: center;
    color: var(--Red);
  }
    
</style>

