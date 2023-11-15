<script lang="ts">
  import { Slideshow } from './cerulean-sky/Slideshow';
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { slidesContent } from './cerulean-sky/slides';
  import { lenis } from '../../stores/lenis';

  let title: HTMLHeadingElement;
  let pinTimeline: gsap.core.Timeline;

  onMount(() => {
    const slides = document.querySelector('.slides') as HTMLElement;
    const slideshow = new Slideshow(slides);
    const slideDuration = 0.2;

    pinTimeline = gsap.timeline({
      ease: 'none',
      scrollTrigger: {
        trigger: '#cerulean-sky',
        start: 'top top',
        end: `+=${slideDuration * 10}00%`,
        scrub: true,
        pin: true,
      },
    });

    pinTimeline.fromTo('h1', {
      opacity: 1,
      y: 0,
    }, {
      duration: slideDuration,
      opacity: 0,
      y: -100,
    })

    for (let i = 0; i < slidesContent.length; i++) {
      pinTimeline.to('html', {
        duration: 1,
        onStart: () => {
          lenis.stop();
          slideshow.next();
          lenis.start();
        },
        onReverseComplete: () => {
          lenis.stop();
          slideshow.navigate(-1, i === 0);
          lenis.start();
        },
      })
    }
  });
</script>

<div id="cerulean-sky">
  <h1 bind:this={ title }>Plum Elixir</h1>
  <div class="frame">
    <div class="slides">
      {#each slidesContent as slide}
        <div class="slide">
          <div
            class="slide__img"
            style="background-image:url({slide.img})"
          />
          <div
            style="color: {slide.color}"
            class="slide__content"
          >
            {@html slide.text}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
#cerulean-sky {
  width: 100vw;
  height: 100vh;
}

h1 {
  @include typographic-scale(3, 1);
  position: absolute;
  top: navbar-height();
  width: 100%;
  text-align: center;
  z-index: 1;
}

.slides {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 100%;
  place-items: center;
}

.slide {
  width: 100%;
  height: 100%;
  grid-area: 1 / 1 / -1 / -1;
  pointer-events: none;
  opacity: 0;
  overflow: hidden;
  position: relative;
  display: grid;
  place-items: center;
  will-change: transform, opacity;
}

.slide--current {
  pointer-events: auto;
  opacity: 1;
}

.slide__img {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  will-change: transform, opacity, filter;
}

.slide__content {
  @include accent;
  font-style: normal;
  @include typographic-scale(2, 1);
  position: absolute;
  text-align: center;
  padding: 2rem;
}
</style>
