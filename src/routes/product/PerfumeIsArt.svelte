<script lang="ts">
  import HollowedArt from './perfume-is-art/HollowedArt.svelte';
  import gsap from 'gsap';
  import { onMount } from 'svelte';
  import SplitType from 'split-type';
  import Video from '$lib/Video.svelte';
  import Theme from '$lib/style/Theme.svelte';

  let section: HTMLElement;
  let sentenceStart: HTMLElement;
  let firstChild: HTMLDivElement;
  let secondChild: HTMLDivElement;
  let videoContainer: HTMLDivElement;

  const videoStyle = `
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
  `;

  onMount(() => {
    sentenceStart.style.opacity = '0';
    firstChild.style.display = 'none';
    secondChild.style.display = 'none';
    videoContainer.style.bottom = '50vh';
    videoContainer.style.scale = '0.69';
    videoContainer.style.opacity = '0';

    new SplitType('#perfume-is-art .sentence-start', {
      types: ['words', 'chars']
    });

    let secondChildAlreadyDisplayed = false;

    const gsapContext = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '#perfume-is-art',
            start: 'top top',
            end: 'bottom top',
          }
        })
        .to('html', {
          duration: 3
        });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: '#perfume-is-art',
          start: 'top top',
          end: 'bottom top'
        },
        onStart() {
          sentenceStart.style.opacity = '1';
        }
      });

      const words = section.querySelectorAll('.sentence-start .word');
      words.forEach((_, i) => {
        const delay = i;
        timeline.from(
          `#perfume-is-art .sentence-start .word:nth-child(${i + 1}) .char`,
          {
            opacity: 0,
            y: -20,
            duration: 1,
            delay,
            stagger: 0.04
          },
          '<'
        );
      });
      timeline.to(videoContainer.style, {
        bottom: '20vh',
        duration: 1.25,
        ease: 'power4.out',
        scale: 1,
        onStart: () => {
          firstChild.style.display = 'block';
          videoContainer.style.opacity = '1';
        },
        onUpdate: function () {
          const progress = this.progress();
          if (!secondChildAlreadyDisplayed && progress > 0.11) {
            secondChild.style.display = 'block';
            secondChildAlreadyDisplayed = true;
          }
        }
      });
    });
    return () => {
      gsapContext.revert();
    };
  });
</script>

<Theme theme="dark">
  <section id="perfume-is-art" bind:this={section}>
    <div class="top-container">
      <div class="sentence-start" bind:this={sentenceStart}>Perfume is</div>
    </div>

    <div class="hollowed-art-container">
      <div class="hollowed-art" bind:this={firstChild}>
        <HollowedArt />
      </div>
      <div class="hollowed-art" bind:this={secondChild}>
        <HollowedArt />
      </div>
    </div>

    <div class="video-container" bind:this={videoContainer}>
      <Video
        src="videos/oleg-lehnitsky"
        autoplay
        muted
        loop
        style={videoStyle}
      />
    </div>

    <svg version="1.1" width="0" height="0" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="svgTextPath">
          <text x="50vw" text-anchor="middle"> Art </text>
        </clipPath>
      </defs>
    </svg>
  </section>
</Theme>

<style lang="scss">
  $text-height: $impact-line-height * typographic-scale(4, 1);

  #perfume-is-art {
    position: relative;
    height: 120vh;
    padding: 10vh 0;
  }

  .top-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    height: 20vh;
  }

  .sentence-start {
    @include accent;
    @include typographic-scale(2, 0);
    color: var(--White);
  }

  .video-container {
    position: absolute;
    bottom: 20vh;
    clip-path: url(#svgTextPath);
    width: 100%;
    height: $text-height;
  }

  svg text {
    @include impact;
    @include typographic-scale(4, 1);
    transform: translate(0, $text-height);
    stroke-width: 1px;
    stroke: url(#paint0_linear_377_166);
  }

  .hollowed-art:nth-child(n) {
    position: absolute;
    width: 100%;
    left: 0;
  }

  .hollowed-art:nth-child(1) {
    bottom: 50vh;
    scale: 0.69;
  }

  .hollowed-art:nth-child(2) {
    bottom: 35.7vh;
    scale: 0.86;
  }
</style>
