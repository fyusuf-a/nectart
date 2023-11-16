<script lang="ts">
  import { gsap } from 'gsap';
  import { onMount } from 'svelte';
  import Subsection1 from './smile/Subsection1.svelte';
  import Subsection2 from './smile/Subsection2.svelte';

  let first: HTMLDivElement;
  let second: HTMLDivElement;
  let third: HTMLDivElement;

  onMount(() => {
    // initializes the elements
    first.style.transform = 'translateX(-100vw)';
    second.style.opacity = '0';
    second.style.transform = 'translateY(1rem)';
    third.style.transform = 'translateX(100vw)';

    gsap.to( '.smile:nth-child(1)',
      {
        scrollTrigger: {
          trigger: '.smile:nth-child(1)',
          start: 'top center',
          end: 'bottom top',
        },
        x: 0,
      });

    gsap.to( '.smile:nth-child(3)',
      {
        scrollTrigger: {
          trigger: '.smile:nth-child(2)',
          start: 'top center',
          end: 'bottom top',
        },
        x: 0,
      });
    gsap.to( '.smile:nth-child(2)',
      {
        scrollTrigger: {
          trigger: '.smile:nth-child(3)',
          start: 'top center',
          end: 'bottom top',
        },
        opacity: 3,
        y: 0,
        ease: 'power1.inOut',
      });
  });
</script>

<section id="smile">
  <Subsection1 />
  <Subsection2 />
</section>

<style lang="scss">
#smile {
  width: 100vw;
  height: 300vh;
  background-color: var(--Grey);
}
</style>
