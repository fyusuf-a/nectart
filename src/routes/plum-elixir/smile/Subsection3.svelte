<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';

  let pouring: HTMLDivElement;

  onMount(() => {
    pouring.style.opacity = '0';
    pouring.querySelectorAll('span')!.forEach((span) => {
      span.style.transform = 'translateY(-20px)';
    });

    const gsapContext = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: '.pouring',
          start: 'top center',
          end: 'bottom top',
        },
      })
        .to(pouring.style, {
          duration: 2,
          opacity: 1,
          ease: 'power1.inOut',
        })
        .to('#smile .pouring span', {
          duration: 1,
          y: 0,
          ease: 'power1.inOut',
          stagger: 0.3,
        },
        '<');
    });
    return () => gsapContext.revert();
  });

</script>

<div class="pouring" bind:this={pouring}>
  A pouring of <span style="font-style:italic">soul</span> and <span style="font-style:italic">love</span>
</div>

<style lang="scss">
  .pouring {
    position: absolute;
    bottom: 50vh;
    @include accent;
    font-style: normal;
    @include typographic-scale(2, 1);
    width: 50vw;
    transform: translateX(calc(50vw - 50%));
    text-align: center;
  }
  
  .pouring span {
    display: inline-block;
  }
</style>
