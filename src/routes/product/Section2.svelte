<script lang="ts">
  import ScrollTrigger from 'gsap/ScrollTrigger';
  import { onMount } from 'svelte';
  import { odors } from '$lib/carousel-odors';
  import { gsap } from 'gsap';

  gsap.registerPlugin(ScrollTrigger);
  let video: HTMLVideoElement;

  const trueModulo = (x: number) => {
    const result = x % odors.length;
    return result < 0 ? result + odors.length : result;
  };
  let currentOdor = 3;

  $: shownOdorIndexes = [
    trueModulo(currentOdor - 1),
    currentOdor,
    trueModulo(currentOdor + 1),
  ];

  $: precedingOdor = trueModulo(currentOdor - 1);
  $: nextLeftOdor = trueModulo(currentOdor - 2);
  $: followingOdor = trueModulo(currentOdor + 1);
  $: nextRightOdor = trueModulo(currentOdor + 2);
  
  const tryToPlay = () => {
    let video = document.getElementById(`video-${currentOdor}`) as HTMLVideoElement;
    video.volume = 0.3;
    video.muted = false;
    video.play()
      .then(() => {
        // Autoplay started!
      })
      .catch((error) => {
        console.log(error);
        // Autoplay was prevented.
        // Show a "Play" button so that user can start playback.
      });
  }

  const mute = () => {
    video = document.getElementById(`video-${currentOdor}`) as HTMLVideoElement;
    video.muted = true;
  }

  const whichClass = (i: number, currentOdor: number) => {
    if (i === currentOdor) return 'middle-odor';
    if (i === trueModulo(currentOdor - 1)) return 'left-odor';
    if (i === trueModulo(currentOdor + 1)) return 'right-odor';
    return 'faded';
  }

  let leftStyle;
  let middleStyle;
  let rightStyle;

  const getAnimatableProperties = (style) => {
    return {
      left: style.left,
      fontSize: style.fontSize,
      opacity: style.opacity,
    }
  }

  const odor = (i: number, cssSelector: string = '') => {
    let selector = `#odor-${i}` + (cssSelector ? ` ${cssSelector}` : '');
    return document.querySelector(selector) as HTMLElement;
  }

  onMount(() => {
    ScrollTrigger.create({
      trigger: '#section2',
      start: 'top center',
      end: 'bottom center',
      onEnter: tryToPlay,
      onLeave: mute,
      onEnterBack: tryToPlay,
      onLeaveBack: mute,
    });


    let smallTextStyle =
    window.getComputedStyle(odor(followingOdor));
    console.log('small', smallTextStyle.fontSize);
    let bigTextStyle = window.getComputedStyle(odor(currentOdor));

    leftStyle = window.getComputedStyle(odor(precedingOdor));
    middleStyle = window.getComputedStyle(odor(currentOdor));
    rightStyle = window.getComputedStyle(odor(followingOdor));


    const fadeTween = (odorIndex: number, newTextStyle: string) => gsap.to(`#odor-${odorIndex} .odor-caption`,
      {
        opacity: 0.0,
        onComplete() {
          odor(odorIndex).style.fontStyle = newTextStyle
        }
      },
    )

    const precedingOdorTimeline = gsap.timeline({
      defaults: { duration: 1, ease: 'power4.out' },
    });

    precedingOdorTimeline
      .to(`#odor-${precedingOdor} .video-container`,
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
        },
      )
      .add(fadeTween(precedingOdor, 'italic'), '<')
      .to(`#odor-${precedingOdor}`, 
        {
          left: middleStyle.left,
          duration: 1.5,
          ease: 'power3.out',
        },
        '<'
      )
      .to(`#odor-${precedingOdor}`,
        {
          fontSize: bigTextStyle.fontSize,
          duration: 1,
        },
        '<50%'
      )
      .to(`#odor-${precedingOdor} .odor-caption`,
        {
          opacity: 1,
        },
        '<50%'
      );

    const restTimeline = gsap.timeline({
      defaults: { duration: 1, ease: 'power1.out' },
    });

    restTimeline
      .to(`#odor-${currentOdor}, #odor-${followingOdor}`,
        {
          opacity: 0.0,
          duration: 0.5,
          onComplete() {
            odor(currentOdor).style.fontSize = smallTextStyle.fontSize;
            odor(currentOdor).style.fontStyle = smallTextStyle.fontStyle
            odor(currentOdor).style.left = 'var(--odor-2)';
            odor(currentOdor, '.video-container').style.visibility = 'hidden';
          }
        },
        '<'
      )
      .to(`#odor-${currentOdor}, #odor-${nextLeftOdor}`,
        {
          opacity: 1,
          delay: 1.5,
          onStart() {
            odor(nextLeftOdor).classList.remove('faded');
            odor(nextLeftOdor).classList.add('left-odor');
          }
        },
        '<'
      );

    const masterTimeline = gsap.timeline({
      onComplete() {
        odor(nextLeftOdor).removeAttribute('style');
        odor(precedingOdor).classList.remove('left-odor');
        odor(precedingOdor).classList.add('middle-odor');
        odor(precedingOdor).removeAttribute('style');
        odor(precedingOdor, '.video-container').removeAttribute('style');
        odor(precedingOdor, '.odor-caption').removeAttribute('style');
        odor(currentOdor).classList.remove('middle-odor');
        odor(currentOdor).classList.add('right-odor');
        odor(currentOdor, '.video-container').removeAttribute('style');
        odor(followingOdor).classList.remove('right-odor');
        odor(followingOdor).classList.add('faded');
        odor(followingOdor).removeAttribute('style');
        currentOdor = precedingOdor;
      }
    });

    masterTimeline
      .add(precedingOdorTimeline)
      .add(restTimeline, '<');



  //.to(`#odor-${precedingOdor} .odor-caption`,
  //  bigTextStyle,
  //  '-=1'
  //)
  //.to(`#odor-${currentOdor}`, 
  //  getAnimatableProperties(rightStyle),
  //  '-=1'
  //)
  //.to(`#video-${currentOdor}`,
  //  {
  //    opacity: 0,
  //  },
  //  '-=1'
  //)
  //.to(`#odor-${followingOdor}`, 
  //  {
  //    opacity: 0,
  //  },
  //  '-=1'
  //);
  });
</script>

<div id="section2">
  <img
    class="background"
    src={`photos/${odors[currentOdor].photoUrl}`}
    alt="Black rocks shining reflecting a discreet blue light"
  />

  {#each odors as odor, i }
    <div
      key={odor.name}
      id={ `odor-${i}` }
      class={ 'odor ' + whichClass(i, currentOdor) }
      on:click={() => {
        if (i === currentOdor) return;
        //currentOdor = currentOdor + (i == 0 ? -1 : 1);
        if (i === precedingOdor)
          currentOdor -= 1;
        if (i === followingOdor)
          currentOdor += 1;
      }}
      on:keyup={() => {}}
      on:keydown={() => {}}
      aria-label={odor.name}
      aria-selected={ i === currentOdor ? 'true' : 'false' }
      aria-hidden={ shownOdorIndexes.includes(i) ? 'false' : 'true' }
    >
      <div class="video-container">
        <video
          id={ `video-${i}` }
          autoplay
          muted
          loop>
        />
        <div class="gradient" />
        <source src={ `videos/${odor.videoUrl}` } type="video/mp4" />
        </video>
      </div>
      <div class="odor-caption" >
        {odor.name}
      </div>
    </div>
  {/each}

</div>

<style lang="scss">
  #section2 {
    --circle-ratio: 0.5;
    --odor-0: calc((100vw - #{circle-size(var(--circle-ratio))})/4);
    --odor-1: calc(2 * var(--odor-0) + #{circle-size(var(--circle-ratio))} / 2);
    --odor-2: calc(3 * var(--odor-0) + #{circle-size(var(--circle-ratio))});
    background-color: var(--Black);
    z-index: 3;
    height: 100vh;
    position: relative;
  }

  .left-odor {
    left: var(--odor-0);
    font-style: normal;
    @include typographic-scale(1, 0);

    & .video-container, & .gradient {
      opacity: 0;
      scale: 0;
    }
    z-index: 3;
  }

  .middle-odor {
    left: var(--odor-1);
    font-style: italic;
    @include typographic-scale(2, 0);

    & .video-container, & .gradient {
      opacity: 1;
      scale: 1;
    }
    z-index: 2;
  }

  .right-odor {
    left: var(--odor-2);
    font-style: normal;
    @include typographic-scale(1, 0);

    & .video-container, & .gradient {
      opacity: 0;
      scale: 0;
    }
  }

  .faded {
    opacity: 0;
  }

  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }
  

  .video-container {
    position: relative;
    width: circle-size(0.7);
    height: circle-size(0.7);
    border-radius: 50%;
    overflow: hidden;

    & video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    & .gradient {
      position: absolute;
      width: 100%;
      height: 100%;
      background: linear-gradient(215deg, #FFF 14.29%, rgba(255, 255, 255, 0.00) 69.87%); 
      mix-blend-mode: soft-light; 
    }
  }

  .odor {
    /* transition: all 0.5s ease-in-out; */
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .odor-caption {
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 250px;
    text-align: center;
    font-family: 'Saol Display', serif;
    text-transform: none;
    color: white;
  }
</style>
