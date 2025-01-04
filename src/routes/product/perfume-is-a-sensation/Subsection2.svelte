<script lang="ts">
  import Banner from './Banner.svelte';
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  let dialogue: HTMLElement;
  let couple1: HTMLElement;
  let couple2: HTMLElement;

  onMount(() => {
    // hides the second couple
    couple2.style.display = 'none';
    document.querySelectorAll('.couple2 .banner-text').forEach((el: Element) => {
      (el as HTMLElement).style.opacity = '0';
    });

    const gsapContext = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: '#perfume-is-a-sensation .subsection2',
          pin: '#perfume-is-a-sensation .subsection2',
          invalidateOnRefresh: true,
          scrub: true
        }
      });

      timeline
        .to('.couple1 .banner-text', {
          opacity: 0,
          onComplete: () => {
            couple1.style.display = 'none';
            couple2.style.display = 'flex';
          }
        })
        .to('.couple2 .banner-text', {
          opacity: 1,
          onReverseComplete: () => {
            couple1.style.display = 'flex';
            couple2.style.display = 'none';
            document.querySelectorAll('.couple1 .banner-text').forEach((el: Element) => {
              (el as HTMLElement).style.opacity = '0';
            });
          }
        });
    });
    return () => {
      gsapContext.revert();
    };
  });
</script>

<section class="subsection2">
  <div class="section-background"></div>
  <div class="background"></div>
  <div id="dialogue" bind:this={dialogue}>A dialogue between</div>
  <div class="banner-container uppercase">
    <div class="banner-couple couple1" bind:this={couple1}>
      <Banner
        direction="left"
        text="the soul"
        --block-size-factor="1.45"
        --number-of-characters="8"
      />
      <Banner
        direction="right"
        text="the senses"
        --block-size-factor="1.23"
        --number-of-characters="10"
      />
    </div>
    <div class="banner-couple couple2 uppercase" bind:this={couple2}>
      <Banner
        direction="left"
        text="the perfumer"
        --block-size-factor="0.96"
        --number-of-characters="12"
      />
      <Banner direction="right" text="you" --block-size-factor="3.1" --number-of-characters="3" />
    </div>
  </div>
</section>

<style lang="scss">
  @import 'style.scss';

  .subsection2 {
    background: #f9e5e3;
    position: relative;
    height: 100vh;
    width: 100%;
    z-index: -2;
  }

  .background {
    background-color: #bdbdbd;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -4;
  }

  #dialogue {
    @include accent;

    @include typographic-scale(2, 0);
    color: var(--Black);
    text-align: center;
    z-index: 4;
    height: calc(100vh / 4);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
  }

  .banner-container {
    margin-top: calc(100vh / 10);
    height: calc(100vh / 5 * 2);
  }

  .banner-couple {
    margin-bottom: calc(100vh / 10);
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 40px;
  }

  .section-background {
    @include background;
    background-position: 0 -100vh;
  }
</style>
