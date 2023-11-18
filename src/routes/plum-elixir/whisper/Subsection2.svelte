<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';

  let subsection: HTMLDivElement;

  const slides = [
    {
      src: 'anuj-yadav-W1jNzyZFmIU-unsplash.jpg',
      order: 0,
      text: 'A sultry dance&emdash;',
    },
    {
      src: 'wine.png',
      order: 7,
      text: 'a liquid sonnet',
    },
    {
      src: 'loes-klinker-T5VHI-Pj2NQ-unsplash.jpg',
      order: 1,
      text: 'of aromas',
    },
    {
      src: 'pexels-studio-naae-17795179.jpg',
      order: 2,
      text: 'A breath of mediteranean breeze',
    },
    {
      src: 'vlad-kutepov-OBR9-lQE_H4-unsplash.jpg',
      order: 4,
      text: 'aged in antique cellars',
    },
    {
      src: 'anthony-salerno-I1hzGTtKMgU-unsplash.jpg',
      order: 3,
      text: 'a sweet whisper',
    },
    {
      src: 'glasses.png',
      order: 5,
      text: 'a ripe jewel',
    },
    {
      src: 'monika-grabkowska--1PzCC5XAzo-unsplash.jpg',
      order: 6,
      text: 'bursting with sugar'
    }
  ]
  onMount(() => {
    const bringToView = (imgIndex: number, timeline: gsap.core.Timeline) => {
      return timeline.to(`#whisper .img-${imgIndex}`, {
        duration: 1,
        top: '0vh',
        height: '100vh',
        ease: 'power2.inOut'
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
        top: `calc(${1 + 4 * (imgIndex % 4)} * ${baseHeight}vh)`,
      })
        .to(`#whisper .img-${imgIndex}`, {
          duration: 1,
          width: '15vw',
          left: destinationIndex < 4 ? '0' : '85vw',
          ease: 'power2.inOut'
        })
    }

    // initializes the styles
    subsection.querySelectorAll('.img-container').forEach((img, i) => {
      img.style.top = i === 1 ? '0' : '100vh';
      img.style.width = '60vw';
      img.style.height = '100vh';
      img.style.left = '20vw';
    });

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
      const currentSlide = slides.findIndex(slide => slide.order === i);
      if (currentSlide !== 0)
        bringToView(currentSlide, timeline);
      slideToNthPosition(currentSlide, currentSlide, timeline);
    }
    bringToView(8, timeline);

    const gsapContext = gsap.context(() => {

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
</style>
