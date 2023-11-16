<script lang="ts">
  import { gsap } from 'gsap';
  import { onMount } from 'svelte';

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
        },
      })
        .to(
          '#smile .parallax',
          {
            transform: (i, target) => `translateY(${-target.dataset.speed * height}px)`,
            ease: 'none'
          })
        .to(caption.style,
          {
            opacity: 1,
            delay: 0.2,
            duration: 0.1
          },
          '<');

    });
    return () => gsapContext.revert();
  });
</script>

<div class="parallax-container" bind:this={subsection}>
  <div
    class="parallax girl"
    data-speed="0.8"
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
    data-speed="1.3"
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
      src="photos/smile/glen-hodson-NlHGKAZ3jCI-unsplash.jpg"
    />
  </div>
</div>

<style lang="scss">
  .parallax-container {
    position: relative;
    height: 150vh;
    overflow: hidden;
  }

  .parallax {
    position: absolute;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .girl {
    top: 65vh;
    left: 8vw;
    width: 42vw;
  }

  .plums {
    top: 100vh;
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
    top: 150vh;
    left: 75vw;
    width: 25vw;
    z-index: 1;
  }

  .pot {
    top: 190vh;
    left: 0;
    width: 30vw;
  }

  .grandma {
    top: 240vh;
    left: 49.5vw;
    width: 42vw;
    height: 49vh;
  }
</style>
