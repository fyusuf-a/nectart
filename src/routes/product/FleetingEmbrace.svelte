<script lang="ts">
  import Grid from './fleeting-embrace/Grid.svelte';
  import gsap from 'gsap';
  import { onMount } from 'svelte';
  import SplitType from 'split-type';

  let text: HTMLDivElement;

  onMount(() => {
    // initializes styles
    const text = new SplitType('.text span', {
      types: ['words', 'chars']
    });

    text.chars!.forEach((c: HTMLElement) => {
      c.style.color = '#ccc';
    });

    const gsapContext = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '#fleeting-embrace',
            start: 'top +=70%',
            end: 'bottom top',
          }
        })
        .to('.text span .char', {
          color: '#000',
          duration: 1,
          ease: 'sine.inOut',
          stagger: 0.1
        });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: '#fleeting-embrace .grid',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          pin: true
        }
      });

      timeline
        .to('.veil.behind', {
          height: '100vh',
          duration: 2,
          ease: 'sine.inOut'
        })
        .to(
          '.veil.before',
          {
            height: '0vh',
            duration: 2,
            ease: 'sine.inOut'
          },
          '<'
        );
    });
    return () => {
      gsapContext.revert();
    };
  });
</script>

<section id="fleeting-embrace">
  <div class="text-container">
    <div class="text" bind:this={text}>
      <span>It's ephemeral</span>
      <span>a dance</span>
      <span>A fleeting embrace</span>
      <span>that</span>
      <span>captures</span>
      <span>moments in time</span>
    </div>
  </div>
  <div class="grid">
    <div class="veil behind"></div>
    <div class="veil before"></div>
    <Grid />
  </div>
</section>

<style lang="scss">
  section {
    background-color: var(--White);
    position: relative;
  }

  .text-container {
    padding: 5rem 5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @include accent;
    @include typographic-scale(2, 1);
  }

  .text span:last-child {
    margin-bottom: 0;
  }

  .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4rem;
  }

  .text-container span {
    display: block;
    text-align: center;
  }

  .veil {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50vh;
  }

  .grid {
    position: relative;
    height: 100vh;
    overflow: hidden;
  }

  .veil.behind {
    z-index: 0;
    height: 0;
    background-color: var(--Black);
  }

  .veil.before {
    z-index: 1;
    height: 100vh;
    top: 0;
    backdrop-filter: saturate(0%);
  }
</style>
