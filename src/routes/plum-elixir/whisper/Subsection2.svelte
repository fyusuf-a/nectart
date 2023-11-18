<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';

  let subsection: HTMLDivElement;

  const slides = [
    {
      src: 'anuj-yadav-W1jNzyZFmIU-unsplash.jpg',
      position: 0,
      text: 'A sultry dance&mdash;',
    },
    {
      src: 'loes-klinker-T5VHI-Pj2NQ-unsplash.jpg',
      text: 'A sultry dance&mdash;of aromas',
      position: 2,
    },
    {
      src: 'pexels-studio-naae-17795179.jpg',
      text: 'A sweet whisper',
      position: 3,
    },
    {
      src: 'anthony-salerno-I1hzGTtKMgU-unsplash.jpg',
      position: 5,
      text: 'A breath of mediterranean breeze',
    },
    {
      src: 'vlad-kutepov-OBR9-lQE_H4-unsplash.jpg',
      position: 4,
      text: ' aged in antique cellars',
    },
    {
      src: 'glasses.png',
      position: 6,
      text: 'A ripe jewel',
    },
    {
      src: 'monika-grabkowska--1PzCC5XAzo-unsplash.jpg',
      position: 7,
      text: 'A ripe jewel bursting with sugar',
    },
    {
      src: 'wine.png',
      position: 1,
      text: 'A liquid sonnet',
    },
  ]
  let currentSlideIndex = 0;

  onMount(() => {

    // initializes the styles
    subsection.querySelectorAll('.img-container').forEach((img, i) => {
      img.style.top = i === 1 ? '0' : '100vh';
      img.style.width = '60vw';
      img.style.height = '100vh';
      img.style.left = '20vw';
    });


    const gsapContext = gsap.context(() => {
      const bringToView = (imgIndex: number, timeline: gsap.core.Timeline) => {
        return timeline.to(`#whisper .img-${imgIndex}`, {
          duration: 1,
          top: '0vh',
          height: '100vh',
          ease: 'power2.inOut',
          onStart() {
            currentSlideIndex = imgIndex;
          },
          onReverseComplete: () => {
            currentSlideIndex = imgIndex - 1;
          }
        }
        , '<');
      }

      const baseHeight = 100 / 17;

      const slideToNthPosition = (imgIndex: number, destinationIndex: number, timeline: gsap.core.Timeline) => {
        timeline.fromTo(`#whisper .img-${imgIndex}`, {
          height: '100%',
        }, {
          duration: 1,
          height: `${3 * baseHeight}%`,
          top: `calc(${1 + 4 * (destinationIndex % 4)} * ${baseHeight}vh)`,
        })
          .to(`#whisper .img-${imgIndex}`, {
            duration: 1,
            width: '15vw',
            left: destinationIndex < 4 ? '0' : '85vw',
            ease: 'power2.inOut'
          })
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: subsection,
          start: 'top top',
          end: '+800%',
          scrub: true,
          pin: true,
          markers: true
        }
      });

      for (let i = 0; i < 8; i++) {
        if (i !== 0)
          bringToView(i, timeline);
        console.log('slides', i, slides[i]);
        slideToNthPosition(i, slides[i].position, timeline);
      }
    });

    return () => {
      gsapContext.revert();
    };
  });
</script>
<div class="subsection2" bind:this={subsection}>
  <div class="img-container central img-8">
    <img src="photos/whisper/jake-thacker-I63YZy3S9Ns-unsplash.jpg" />
  </div>
  {#each slides as slide, i}
    <div class={`img-container img-${i}`}>
      <img
        src={`photos/whisper/${slide.src}`}
      />
    </div>
    <div class="text-container">
      <div
        class="text-stack layer"
        class:active={i === currentSlideIndex}
      >
        {@html slide.text }
      </div>
      <div
        class="text-stack"
        class:active={i === currentSlideIndex}
      >
        {@html slide.text }
      </div>
  </div>
  {/each}
</div>

<style lang="scss">
  $lateral-height: calc(100vh / 17);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .subsection2 {
    position: relative;
    height: 100vh;
    background: var(--Grey);
  }

  .img-container {
    position: absolute;
    width: 15vw;
    height: #{$lateral-height * 3};
  }

  .central.img-container {
    left: 20vw;
    width: 60vw;
    height: 100vh;
  }

  @for $i from 0 to 4 {
    .img-#{$i} {
      top: calc(#{(1 + 4 * $i)} * $lateral-height);
      left: 0;
    }
  }

  @for $i from 4 to 9 {
    .img-#{$i} {
      top: calc(#{(1 + 4 * ($i - 4))} * $lateral-height);
      right: 0;
    }
  }

  .text-container {
    position: absolute;
    top: 0;
    left: 20vw;
    width: 60vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .text-stack {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    width: 60vw;
    @include typographic-scale(2, 1);
    text-align: center;
    color: var(--White);
    mix-blend-mode: exclusion;
    visibility: hidden;
  }

  .text-stack.layer {
    color: black;
    mix-blend-mode: color;
  }

  .text-stack.active {
    visibility: visible;
  }
</style>
