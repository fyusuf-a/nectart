<script lang="ts">
  import Grid from './fleeting-embrace/Grid.svelte';
  import gsap from 'gsap';
  import { onMount } from 'svelte';
  import SplitType from 'split-type';

  let text: HTMLDivElement;

  onMount(() => {
    // initializes styles
    const text = new SplitType('.text span', {
      types: ['words', 'chars'],
    });

    text.chars!.forEach((c: HTMLElement) => {
      c.style.color = '#ccc';
    });
    

    gsap.timeline({
      scrollTrigger: {
        trigger: '#fleeting-embrace',
        start: 'top top',
        end: 'bottom top',
      }
    })
      .to('.text span .char', {
        color: '#000',
        duration: 1,
        ease: 'sine.inOut',
        stagger: 0.1,
      })
    
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#fleeting-embrace .grid',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        pin: true,
      },
    });

    timeline.to('.veil.behind', {
      height: '100vh',
      duration: 2,
      ease: 'sine.inOut',
    })
      .to('.veil.before', {
        height: '0vh',
        duration: 2,
        ease: 'sine.inOut',
      }, '<');
  });
</script>

<section id="fleeting-embrace">
  <div class="text-container">
    <div class="text" bind:this={text}>
      <span>It's ephemeral</span>
      <span>a dance</span>
      <span>A fleeting embrace that captures moments in time</span>
    </div>
  </div>
  <div class="grid">
    <div class="veil behind" />
    <div class="veil before" />
    <Grid />
  </div>
</section>

<style lang="scss">
section {
  background-color: var(--White);
  position: relative;
}

.text-container { 
  padding: 0 5rem;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @include accent;
  @include typographic-scale(2,1);
}

.text span:last-child {
  margin-bottom: 0;
}

.text-container span {
  display: block;
  text-align: center;
  margin-bottom: 80px;
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
