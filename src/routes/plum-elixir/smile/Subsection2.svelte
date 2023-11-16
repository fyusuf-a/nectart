<script lang="ts">
  import { gsap } from 'gsap';
  import { onMount } from 'svelte';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  let subsection: HTMLDivElement;
  let caption: HTMLDivElement;

  onMount(() => {
    // Initializes the styles
    caption.style.opacity = '0';

    const height = subsection.clientHeight;
    const gsapContext = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: '#smile .parallax-container',
          scrub: true,
          pin: '#smile .parallax-container, #smile .filter',
        },
      })
        .to(
          '#smile .parallax',
          {
            transform: (i, target) => `translateY(calc(${-target.dataset.speed * height}px)`,
            ease: 'none'
          })
        .to(caption.style,
          {
            opacity: 1,
            delay: 0.1,
            duration: 0.1
          },
          '<');
    });
    return () => gsapContext.revert();
  });
</script>

<div class="parallax-container" bind:this={subsection}>
  <div class="filter" />
  <div
    class="parallax girl"
    data-speed="1.4"
  >
    <img src="photos/smile/girl.jpeg" />
  </div>
  <div
    class="parallax knife"
    data-speed="1.5"
  >
    <img
      src="photos/smile/heather-gill-HLBki_64qNY-unsplash.jpg"
    />
  </div>
  <div
    class="parallax plums"
    data-speed="1"
  >
    <div class="caption" bind:this={caption}>
      A plum compote passed down as a secret
    </div>
    <img src="photos/smile/plums.jpeg" />
  </div>
  <div
    class="parallax pot"
    data-speed="1.8"
  >
    <img
      src="photos/smile/loes-klinker-T5VHI-Pj2NQ-unsplash.jpg"
    />
  </div>
  <div
    class="parallax grandma"
    data-speed="1.6"
  >
    <img
      src="photos/smile/old-lady.jpeg"
    />
  </div>
</div>

<style lang="scss">
  .parallax-container {
    position: relative;
    height: 100vh;
    overflow: hidden;
  }

  .parallax {
    position: absolute;
    transform: translateY(20vw);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .filter {
    position: absolute;
    content: '';
    top: -50vh;
    right: 0;
    left: 0;
    height: 150vh;
    opacity: 0.9;
    backdrop-filter: saturate(0%);
    mask-image: linear-gradient(to top, black, black 30%, transparent 60%);
    z-index: 2;
  }

  .girl {
    top: 35vh;
    left: 8vw;
    width: 42vw;
    z-index: 1;
  }

  .plums {
    top: 45vh;
    left: 20vw;
    width: 60vw;
    height: 94vh;
  }

  .plums .caption {
    @include typographic-scale(1, 3);
    @include accent;
    color: var(--White);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    width: 40vw;
  }

  .knife {
    top: 90vh;
    left: 75vw;
    width: 25vw;
    z-index: 1;
  }

  .pot {
    top: 130vh;
    left: 0;
    width: 30vw;
  }

  .grandma {
    top: 165vh;
    left: 49.5vw;
    width: 42vw;
    height: 49vh;
  }
</style>
