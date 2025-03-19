<script lang="ts">
  import ScrollTrigger from 'gsap/ScrollTrigger';
  import { onMount } from 'svelte';
  import { odors } from '$lib/carousel-odors';
  import { trueModulo } from '$lib/utils';
  import { gsap } from 'gsap';
  import Image from '$lib/Image.svelte';
  import Video from '$lib/Video.svelte';
  import { twMerge } from 'tailwind-merge';

  gsap.registerPlugin(ScrollTrigger);
  let video: HTMLVideoElement;

  const INITIAL_CURRENT_ODOR = 2;
  let currentOdor = INITIAL_CURRENT_ODOR;

  enum Direction {
    LEFT,
    RIGHT
  }

  const l = odors.length;

  $: shownOdorIndexes = [trueModulo(currentOdor - 1, l), currentOdor, trueModulo(currentOdor + 1, l)];

  $: leftOdor = trueModulo(currentOdor - 1, l);
  $: nextLeftOdor = trueModulo(currentOdor - 2, l);
  $: rightOdor = trueModulo(currentOdor + 1, l);
  $: nextRightOdor = trueModulo(currentOdor + 2, l);

  const tryToPlay = () => {
    let video = document.getElementById(`video-${currentOdor}`) as HTMLVideoElement;
    video.volume = 0.3;
    video.muted = false;
    // video
    //   .play()
    //   .then(() => {
    //     // Autoplay started!
    //   })
    //   .catch((error) => {
    //     video.muted = true;
    //     video.play();
    //     console.log(error);
    //     // Autoplay was prevented.
    //     // Show a "Play" button so that user can start playback.
    //   });
  };

  const mute = () => {
    video = document.getElementById(`video-${currentOdor}`) as HTMLVideoElement;
    video.muted = true;
  };

  const whichClass = (i: number, currentOdor: number) => {
    if (i === currentOdor) return 'middle-odor';
    if (i === leftOdor) return 'left-odor pointer-events-none sm:pointer-events-auto';
    if (i === rightOdor) return 'right-odor pointer-events-none sm:pointer-events-auto';
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
        const _smallTextStyle = window.getComputedStyle(odor(leftOdor));
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
        const disappearingOdor = direction === Direction.LEFT ? leftOdor : rightOdor;
        const appearingOdor = direction === Direction.LEFT ? nextRightOdor : nextLeftOdor;
        const nextOdor = direction === Direction.LEFT ? rightOdor : leftOdor;
        const dotWidth = gsap.getProperty('#dots :first-child', 'width');
        const amountTranslated = direction === Direction.LEFT ? -dotWidth : dotWidth as number;

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
                currentOdor = trueModulo(currentOdor + (direction === Direction.LEFT ? 1 : -1), l);
              }
            },
            '<'
          );

        const dotTimeline = gsap.timeline({
          defaults: { duration: 0.5, ease: 'power1.out' }
        })
          .to(
            '#dots',
            {
              x: amountTranslated,
            },
            '<'
          )
          .to(
            {},
            {
              duration: 0.5,
              onStart() {
                const dots = document.querySelectorAll('#dots .bg-white')!;
                const biggerDot = dots[2] as HTMLElement;
                biggerDot.classList.remove('bigger');
                const nextBiggerDot = dots[direction === Direction.LEFT ? 3 : 1] as HTMLElement;
                nextBiggerDot.classList.add('bigger');
              },
            },
            '<'
          )
          .to(
            '#dots',
            {
              duration: .001,
              onStart() {
                const dots = document.querySelector('#dots') as HTMLElement;
                const dot = dots.children[0];
                
                let newDot: HTMLElement;


                if (direction === Direction.LEFT) {
                  dots.appendChild(dot.cloneNode(true));
                  newDot = dots.children[dots.children.length - 1] as HTMLElement;
                } else {
                  dots.insertBefore(dot.cloneNode(true), dot);
                  newDot = dots.children[0] as HTMLElement;
                }
                newDot.style.opacity = '0';
                gsap.set(dots, { x: amountTranslated / 2 });
                gsap.to(newDot, {
                  opacity: 1,
                  duration: 0.25,
                  delay: 0.1,
                });
              }
            },
          )
          .to(
            `#dots >  :${direction === Direction.LEFT ? 'first' : 'last'}-child`,
            {
              opacity: 1,
              duration: 0.25,
            },
            '0.1'
          )
          .to(
            `#dots > :${direction === Direction.LEFT ? 'first' : 'last'}-child`,
            {
              opacity: 0,
              duration: .001,
              onComplete() {
                const dots = document.querySelector('#dots') as HTMLElement;
                if (direction === Direction.LEFT) {
                  dots.removeChild(dots.children[0]);
                } else {
                  dots.removeChild(dots.children[dots.children.length - 1]);
                }
                gsap.set(dots, { x: 0 });
              },
            },
          );
            
          

        const masterTimeline = gsap.timeline({
          onComplete() {
            buttonsActive = true;
          }
        });

        masterTimeline.add(nextOdorTimeline).add(restTimeline, '<').add(dotTimeline, '<');
      };

      handleClick = (i: number) => {
        if ((i !== leftOdor && i !== rightOdor) || !buttonsActive) return;
        buttonsActive = false;
        slide(i === leftOdor ? Direction.RIGHT : Direction.LEFT);
      };
    });
    return () => {
      gsapContext.revert();
    };
  });
</script>

<section
  id="odor-carousel"
  class="relative z-10 h-screen w-screen overflow-hidden text-black"
>
  <Image
    id={`background-${leftOdor}`}
    style={`visibility:hidden;${backgroundStyle}`}
    src={`photos/carousel/${odors[leftOdor].photo}`}
    alt={odors[leftOdor].photoAlt}
  />
  <Image
    id={`background-${rightOdor}`}
    style={`visibility:hidden;${backgroundStyle}`}
    src={`photos/carousel/${odors[rightOdor].photo}`}
    alt={odors[rightOdor].photoAlt}
  />
  <Image
    style={`${backgroundStyle}`}
    id={`background-${currentOdor}`}
    src={`photos/carousel/${odors[currentOdor].photo}`}
    alt={odors[currentOdor].photoAlt}
  />

  <div>
  {#each odors as odor, i}
    <div
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

  <div class="bottom-scale-4-2 absolute left-0 flex w-full items-center justify-center sm:hidden sm:bottom-scale-4-0">
    <div
      id="dots"
      class="flex" 
    >
      {#each odors as _, i}
      <div
        class={
          twMerge(
            'flex items-center justify-center w-44 h-44'
          )
        }
      >
        <div
          class={
            twMerge(
              'bg-white w-scale-1-1 h-scale-1-1 rounded-full transition-all ease-in-out duration-500',
              i === 2 && 'bigger'
              //i === currentOdor && 'w-scale-2-0 h-scale-2-0'
            )
          }
        ></div>
      </div>
      {/each}
    </div>
    <button
      aria-label="Previous"
      on:click={() => handleClick(leftOdor)}
      on:keydown={(event) => {
        if (event.key === 'Enter' || event.key === 'Space') {
          handleClick(leftOdor);
        }
      }}
      class="absolute left-0 z-10 h-full w-1/2"
      tabindex="0"
    ></button>
    <button
      aria-label="Next"
      on:click={() => handleClick(rightOdor)}
      on:keydown={(event) => {
        if (event.key === 'Enter' || event.key === 'Space') {
          handleClick(rightOdor);
        }
      }}
      class="absolute right-0 z-10 h-full w-1/2"
      tabindex="0"
    ></button>
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
    padding: 0;
  }

  .left-odor {
    left: var(--odor-0);
    font-style: normal;
    @include typographic-scale(1, 0);
    z-index: 3;

    & > .video-container {
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

  .middle-odor {
    left: var(--odor-1);
    font-style: italic;
    z-index: 2;
    @include typographic-scale(3, 0);

    @include sm {
      @include typographic-scale(2, 0);
    }

    & > .video-container {
      opacity: 1;
      transform: scale(1);
    }
  }

  .right-odor {
    left: var(--odor-2);
    font-style: normal;
    @include typographic-scale(1, 0);

    & > .video-container {
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

  #dots > * {
    transition: transform 0.5s ease-in-out;
  }

  #dots .bigger {
    transform: scale(1.5);
  }
</style>
