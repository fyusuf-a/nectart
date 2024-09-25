<script lang="ts">
  import ScrollTrigger from 'gsap/ScrollTrigger';
  import { onMount } from 'svelte';
  import { odors } from '$lib/carousel-odors';
  import { gsap } from 'gsap';
  import Image from '$lib/Image.svelte';
  import Video from '$lib/Video.svelte';

  gsap.registerPlugin(ScrollTrigger);
  let video: HTMLVideoElement;

  const trueModulo = (x: number) => {
    const result = x % odors.length;
    return result < 0 ? result + odors.length : result;
  };
  const INITIAL_CURRENT_ODOR = 3;
  let currentOdor = INITIAL_CURRENT_ODOR;

  enum Direction {
    LEFT,
    RIGHT
  }

  $: shownOdorIndexes = [trueModulo(currentOdor - 1), currentOdor, trueModulo(currentOdor + 1)];

  $: precedingOdor = trueModulo(currentOdor - 1);
  $: nextLeftOdor = trueModulo(currentOdor - 2);
  $: followingOdor = trueModulo(currentOdor + 1);
  $: nextRightOdor = trueModulo(currentOdor + 2);

  const tryToPlay = () => {
    let video = document.getElementById(`video-${currentOdor}`) as HTMLVideoElement;
    video.volume = 0.3;
    video.muted = false;
    video
      .play()
      .then(() => {
        // Autoplay started!
      })
      .catch((error) => {
        video.muted = true;
        video.play();
        console.log(error);
        // Autoplay was prevented.
        // Show a "Play" button so that user can start playback.
      });
  };

  const mute = () => {
    video = document.getElementById(`video-${currentOdor}`) as HTMLVideoElement;
    video.muted = true;
  };

  const whichClass = (i: number, currentOdor: number) => {
    if (i === currentOdor) return 'middle-odor';
    if (i === trueModulo(currentOdor - 1)) return 'left-odor';
    if (i === trueModulo(currentOdor + 1)) return 'right-odor';
    return 'faded';
  };

  const odor = (i: number, cssSelector: string = '') => {
    let selector = `#odor-${i}` + (cssSelector ? ` ${cssSelector}` : '');
    return document.querySelector(selector) as HTMLElement;
  };

  let handleClick: (i: number) => void;
  let buttonsActive = true;

  const backgroundStyle = `
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  `;

  onMount(() => {
    const gsapContext = gsap.context(() => {
      // Try to play the video's audio when the section is in view
      ScrollTrigger.create({
        trigger: '#odor-carousel',
        start: 'top center',
        end: 'bottom center',
        onEnter: tryToPlay,
        onLeave: mute,
        onEnterBack: tryToPlay,
        onLeaveBack: mute,
        invalidateOnRefresh: true
      });

      // The carousel animation
      const smallTextStyle = () => {
        const _smallTextStyle = window.getComputedStyle(odor(precedingOdor));
        return {
          fontSize: _smallTextStyle.fontSize,
          fontStyle: _smallTextStyle.fontStyle
        }
      }
      const bigTextStyle = () => {
        const _bigTextStyle = window.getComputedStyle(odor(currentOdor));
        return {
          fontSize: _bigTextStyle.fontSize,
          fontStyle: _bigTextStyle.fontStyle
        }
      };

      const middleStyle = () => {
        const _middleStyle = window.getComputedStyle(odor(currentOdor));
        return {
          left: _middleStyle.left
        }
      }

      const fadeTween = (odorIndex: number, newTextStyle: string) =>
        gsap.to(`#odor-${odorIndex} .odor-caption`, {
          opacity: 0.0,
          onComplete() {
            odor(odorIndex).style.fontStyle = newTextStyle;
          }
        });

      const slide = (direction: Direction) => {
        const nextOdorTimeline = gsap.timeline({
          defaults: { duration: 1, ease: 'power4.out' }
        });
        const disappearingOdor = direction === Direction.LEFT ? precedingOdor : followingOdor;
        const appearingOdor = direction === Direction.LEFT ? nextRightOdor : nextLeftOdor;
        const nextOdor = direction === Direction.LEFT ? followingOdor : precedingOdor;

        nextOdorTimeline
          .fromTo(
            `#odor-${nextOdor} > .video-container`,
            {
              scale: 0,
              opacity: 0
            },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5
            }
          )
          .add(fadeTween(nextOdor, 'italic'), '<')
          .to(
            `#background-${currentOdor}`,
            {
              onStart() {
                (
                  document.querySelector(`#background-${nextOdor}`) as HTMLElement
                ).style.visibility = 'visible';
              },
              opacity: 0.0,
              duration: 1.5
            },
            '<'
          )
          .to(
            `#odor-${nextOdor}`,
            {
              left: () => middleStyle().left,
              duration: 1.5,
              ease: 'power3.out'
            },
            '<'
          )
          .to(
            `#odor-${nextOdor}`,
            {
              fontSize: () => bigTextStyle().fontSize,
              duration: 1
            },
            '<50%'
          )
          .to(
            `#odor-${nextOdor} .odor-caption`,
            {
              opacity: 1,
              duration: 0.5
            },
            '<10%'
          );

        const restTimeline = gsap.timeline({
          defaults: { duration: 1, ease: 'power1.out' }
        });

        restTimeline
          .to(
            `#odor-${currentOdor}, #odor-${disappearingOdor}`,
            {
              opacity: 0.0,
              duration: 0.5,
              onComplete() {
                odor(currentOdor).style.left = `var(--odor-${
                  direction === Direction.LEFT ? '0' : '2'
                })`;
                odor(currentOdor, '> .video-container').style.visibility = 'hidden';
              }
            },
            '<'
          )
          .to(
            `#odor-${currentOdor}, #odor-${appearingOdor}`,
            {
              opacity: 1,
              delay: 1.5,
              duration: 0.5,
              onStart() {
                odor(currentOdor).style.fontSize = smallTextStyle().fontSize;
                odor(currentOdor).style.fontStyle = smallTextStyle().fontStyle;
                odor(appearingOdor).classList.remove('faded');
                odor(appearingOdor).classList.add(
                  direction === Direction.LEFT ? 'right-odor' : 'left-odor'
                );
                document.querySelector(`#background-${currentOdor}`)!.removeAttribute('style');
                odor(appearingOdor).removeAttribute('style');
                odor(currentOdor).classList.add(
                  direction === Direction.LEFT ? 'left-odor' : 'right-odor'
                );
                odor(nextOdor).removeAttribute('style');
                odor(nextOdor, '> .video-container').removeAttribute('style');
                odor(currentOdor).removeAttribute('style');
                odor(currentOdor, '> .video-container').removeAttribute('style');
                currentOdor = trueModulo(currentOdor + (direction === Direction.LEFT ? 1 : -1));
                buttonsActive = true;
              }
            },
            '<'
          );

        const masterTimeline = gsap.timeline({
          onComplete() {}
        });

        masterTimeline.add(nextOdorTimeline).add(restTimeline, '<');
      };

      handleClick = (i: number) => {
        if (i === currentOdor || !buttonsActive) return;
        buttonsActive = false;
        if (i === precedingOdor) {
          slide(Direction.RIGHT);
        }
        if (i === followingOdor) {
          slide(Direction.LEFT);
        }
      };
    });
    return () => {
      gsapContext.revert();
    };
  });
</script>

<section
  id="odor-carousel"
  class="z-10"
>
  <Image
    id={`background-${precedingOdor}`}
    style={`visibility:hidden;${backgroundStyle}`}
    src={`photos/carousel/${odors[precedingOdor].photo}`}
    alt={odors[precedingOdor].photoAlt}
  />
  <Image
    id={`background-${followingOdor}`}
    style={`visibility:hidden;${backgroundStyle}`}
    src={`photos/carousel/${odors[followingOdor].photo}`}
    alt={odors[followingOdor].photoAlt}
  />
  <Image
    style={`${backgroundStyle}`}
    id={`background-${currentOdor}`}
    src={`photos/carousel/${odors[currentOdor].photo}`}
    alt={odors[currentOdor].photoAlt}
  />

  {#each odors as odor, i}
    <div
      key={odor.name}
      id={`odor-${i}`}
      class={'odor ' + whichClass(i, currentOdor)}
      on:click={() => handleClick(i)}
      on:keyup={() => {}}
      on:keydown={() => {}}
      aria-label={odor.name}
      aria-selected={i === currentOdor ? 'true' : 'false'}
      aria-hidden={shownOdorIndexes.includes(i) ? 'false' : 'true'}
    >
      <div class="video-container">
        <Video
          src={`videos/${odor.videoUrl}`}
          autoplay
          muted
          loop
          id={`video-${i}`}
          bind:video
        />
      </div>
      <div class="odor-caption">
        {odor.name}
      </div>
    </div>
  {/each}
  <div
    class="odor-carousel-indicator"
  >
    {#each odors as odor, i}
    <div
      class="dot-container"
    >
      <div
        class={`dot${i === currentOdor ? ' selected' : ''}`}
      />
    </div>
    {/each}
    <div
      on:click={() => handleClick(precedingOdor)}
      on:keydown={(event) => {
        if (event.key === 'Enter' || event.key === 'Space') {
          handleClick(precedingOdor);
        }
      }}
      class="go-left"
      role="button"
      tabindex="0"
    />
    <div
      on:click={() => handleClick(followingOdor)}
      on:keydown={(event) => {
        if (event.key === 'Enter' || event.key === 'Space') {
          handleClick(followingOdor);
        }
      }}
      class="go-right"
      role="button"
      tabindex="0"
    />
  </div>
</section>

<style lang="scss">
  #odor-carousel {
    --circle-ratio: 0.5;
    --odor-0: calc((100vw - #{circle-size(var(--circle-ratio))}) / 4);
    --odor-1: calc(2 * var(--odor-0) + #{circle-size(var(--circle-ratio))} / 2);
    --odor-2: calc(3 * var(--odor-0) + #{circle-size(var(--circle-ratio))});
    background-color: var(--Black);
    height: 120vh;
    padding: 10vh 0;
    width: 100vw;
    position: relative;
    overflow: hidden;
  }

  .left-odor {
    left: var(--odor-0);
    font-style: normal;
    @include typographic-scale(1, 0);

    & > .video-container,
    & .gradient {
      opacity: 0;
      transform: scale(0);
    }
    & .odor-caption {
      display: none;
      @include sm {
        display: block;
      }
    }
    z-index: 3;
  }

  .middle-odor {
    left: var(--odor-1);
    font-style: italic;
    @include typographic-scale(2, 0);

    & > .video-container,
    & .gradient {
      opacity: 1;
      transform: scale(1);
    }
    z-index: 2;
  }

  .right-odor {
    left: var(--odor-2);
    font-style: normal;
    @include typographic-scale(1, 0);

    & > .video-container,
    & .gradient {
      opacity: 0;
      transform: scale(0);
    }
    & .odor-caption {
      display: none;
      @include sm {
        display: block;
      }
    }
  }

  .faded {
    opacity: 0;
  }

  .video-container {
    position: relative;
    border-radius: 50%;
    overflow: hidden;

    width: circle-size(0.8);
    height: circle-size(0.8);

    @include sm {
      width: circle-size(0.5);
      height: circle-size(0.5);
    }

    @include xl {
      width: circle-size(0.6);
      height: circle-size(0.6);
    }

    & video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    & .gradient {
      position: absolute;
      width: 100%;
      height: 100%;
      background: linear-gradient(215deg, #fff 14.29%, rgba(255, 255, 255, 0) 69.87%);
      mix-blend-mode: soft-light;
    }
  }

  .odor {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .odor-caption {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-family: 'Saol Display', serif;
    font-weight: 400;
    text-transform: none;
    color: white;
    cursor: default;
  }

  .left-odor .odor-caption:hover, .right-odor .odor-caption:hover {
    transform: translate(-50%, -50%) scale(1.1);
    cursor: pointer;
    transition: transform 0.1s ease-out;
  }

  .odor-carousel-indicator {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 20%;
    justify-content: center;
    align-items: center;
    gap: 20px;
    display: flex;
  }

  .dot-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
  }

  .dot {
    background-color:var(--White);
    border-radius: 50%;
    width: 10px;
    height: 10px;

    &.selected {
      width: 20px;
      height: 20px;
    }
    transition: all 0.5s ease-in-out;
  }

  .dot.no-color {
    font-size: 10rem;
    width: auto;
    height: auto;
    background-color: transparent;
  }

  .go-left, .go-right {
    position: absolute;
    width: 50%;
    height: 100%;
    z-index: 10;
  }

  .go-left {
    left: 0;
  }

  .go-right {
    right: 0;
  }
</style>
