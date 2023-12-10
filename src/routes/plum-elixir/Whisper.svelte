<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import Image from '$lib/Image.svelte';

  let whisper: HTMLDivElement;

  const imageStyle = `
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  `;

  const slides = [
    {
      src: 'anuj-yadav-W1jNzyZFmIU-unsplash',
      position: 0,
      text: 'A sultry dance<span style="visibility:hidden;font-family:\'Saol Display\', serif;text-transform:none;font-style:italic">&mdash;of aromas</span>'
    },
    {
      src: 'loes-klinker-T5VHI-Pj2NQ-unsplash',
      text: 'A sultry dance<span style="font-family:\'Saol Display\', serif;text-transform:none;font-style:italic">&mdash;of aromas</span>',
      position: 2
    },
    {
      src: 'pexels-studio-naae-17795179',
      text: '<span style="font-family:\'Saol Display\', serif;text-transform:none;font-style:italic">A sweet</span> whisper',
      position: 3
    },
    {
      src: 'anthony-salerno-I1hzGTtKMgU-unsplash',
      position: 5,
      text: '<span style="font-family:\'Saol Display\', serif;text-transform:none;font-style:italic">A breath of mediterranean</span> breeze'
    },
    {
      src: 'vlad-kutepov-OBR9-lQE_H4-unsplash',
      position: 4,
      text: '<span style="font-family:\'Saol Display\', serif;text-transform:none;font-style:italic">Aged in</span> antique cellars'
    },
    {
      src: 'glasses',
      position: 6,
      text: 'A ripe jewel <span style="visibility:hidden"><span style="font-family:\'Saol Display\', serif;text-transform:none;font-style:italic">bursting with</span> sugar'
    },
    {
      src: 'monika-grabkowska--1PzCC5XAzo-unsplash',
      position: 7,
      text: 'A ripe jewel <span style="font-family:\'Saol Display\', serif;text-transform:none;font-style:italic">bursting with</span> sugar'
    },
    {
      src: 'wine',
      position: 1,
      text: '<span style="font-family:\'Saol Display\', serif;text-transform:none;font-style:italic">A liquid sonnet</span>'
    },
    {
      src: 'jake-thacker-I63YZy3S9Ns-unsplash',
      text: '<span style="font-family:\'Saol Display\', serif;text-transform:none;font-style:italic">An ode <span class="end-phrase">to time-honored traditions</span></span>'
    }
  ];
  let currentSlideIndex = 0;

  onMount(() => {
    // initializes the styles
    whisper.querySelectorAll<HTMLElement>('.img-container').forEach((img, i) => {
      img.style.top = i === 0 ? '0' : '100vh';
      img.style.width = '60vw';
      img.style.height = '100vh';
      img.style.left = '20vw';
    });

    const gsapContext = gsap.context(() => {
      const bringToView = (imgIndex: number, timeline: gsap.core.Timeline) => {
        return timeline.to(
          `#whisper .img-${imgIndex}`,
          {
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
          },
          '<'
        );
      };

      const baseHeight = 100 / 17;

      const slideToNthPosition = (
        imgIndex: number,
        destinationIndex: number,
        timeline: gsap.core.Timeline
      ) => {
        timeline
          .fromTo(
            `#whisper .img-${imgIndex}`,
            {
              height: '100%'
            },
            {
              duration: 1,
              height: `${3 * baseHeight}%`,
              top: `calc(${1 + 4 * (destinationIndex % 4)} * ${baseHeight}vh)`
            }
          )
          .to(`#whisper .img-${imgIndex}`, {
            duration: 1,
            width: '15vw',
            left: destinationIndex < 4 ? '0' : '85vw',
            ease: 'power2.inOut'
          });
      };

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: whisper,
          start: 'top top',
          end: '+800%',
          scrub: true,
          pin: true
        }
      });

      for (let i = 0; i < 8; i++) {
        if (i !== 0) bringToView(i, timeline);
        slideToNthPosition(i, slides[i].position, timeline);
      }
      bringToView(8, timeline);
      timeline
        .to('#whisper .img-8', {
          duration: 1,
          width: '100%',
          left: '0vw',
          ease: 'power2.inOut'
        })
        .to(
          '#whisper .end-phrase',
          {
            duration: 0.5,
            opacity: 0,
            ease: 'power2.inOut'
          },
          '-=0.75'
        )
        .to(
          '#whisper .end-phrase',
          {
            duration: 0.5,
            opacity: 1,
            ease: 'power2.inOut',
            onStart() {
              document
                .querySelectorAll('#whisper .end-phrase')
                .forEach((el) => (el.innerHTML = 'to her'));
            },
            onReverseComplete() {
              document
                .querySelectorAll('#whisper .end-phrase')
                .forEach((el) => (el.innerHTML = 'to time-honored traditions'));
            }
          },
          '<'
        );
    });

    return () => {
      gsapContext.revert();
    };
  });
</script>

<div id="whisper" bind:this={whisper}>
  {#each slides as slide, i}
    <div class={`img-container img-${i}`}>
      <Image style={imageStyle} src={`photos/whisper/${slide.src}`} />
    </div>
    <div class="text-container">
      <div class="text-stack layer" class:active={i === currentSlideIndex}>
        <!-- eslint-disable -->
        {@html slide.text}
      </div>
      <div class="text-stack" class:active={i === currentSlideIndex}>
        <!-- eslint-disable -->
        {@html slide.text}
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  $lateral-height: calc(100vh / 17);

  #whisper {
    position: relative;
    height: 100vh;
    background: var(--Grey);
  }

  .img-container {
    position: absolute;
    width: 15vw;
    height: #{$lateral-height * 3};
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
