<script lang="ts">
  import { gsap } from 'gsap';
  import { onMount } from 'svelte';

  let first: HTMLDivElement;
  let second: HTMLDivElement;
  let third: HTMLDivElement;

  onMount(() => {
    // initializes the elements
    first.style.transform = 'translateX(-100vw)';
    second.style.opacity = '0';
    second.style.transform = 'translateY(1rem)';
    third.style.transform = 'translateX(100vw)';

    const gsapContext = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '.smile:nth-child(2)',
            start: 'top +=80%',
            end: 'bottom top',
          }
        })
        .to('.smile:nth-child(1)', {
          duration: 1.5,
          x: 0
        })
        .to(
          '.smile:nth-child(3)',
          {
            duration: 1.5,
            x: 0
          },
          '-=1'
        )
        .to('.smile:nth-child(2)', {
          duration: 1,
          opacity: 3,
          y: 0,
          ease: 'power1.inOut'
        });
    });
    return () => {
      gsapContext.revert();
    };
  });
</script>

<div class="text-container">
  <div class="smile accent" bind:this={first}>After the effort</div>
  <div class="smile uppercase" bind:this={second}>A smile</div>
  <div class="smile accent" bind:this={third}>A warmth</div>
</div>

<style lang="scss">
  .text-container {
    padding-top: 15rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    align-items: center;
    height: 56vh;
  }

  .smile {
    @include typographic-scale(3, 1);
    @include impact;
    width: 100%;
    padding: 0 2rem;
  }
  .smile.accent {
    @include typographic-scale(2, 1);
    @include accent;
  }

  .smile:nth-child(1) {
    text-align: left;
    @include sm {
      padding-left: 10vw;
    }
  }

  .smile:nth-child(2) {
    text-align: center;
  }

  .smile:nth-child(3) {
    text-align: right;
    @include sm {
      padding-right: 10vw;
    }
  }
</style>
