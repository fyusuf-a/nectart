<script lang="ts">
  import { gsap } from 'gsap';
  import { onMount } from 'svelte';
  import ScrollTrigger from 'gsap/ScrollTrigger';

  onMount(() => {
    let randomAngle = gsap.utils.random(-5, 5, true);
    let randomTime = gsap.utils.random(3, 5, true);
    const bouncingTimeline = gsap.timeline({
      repeat: -1,
      repeatRefresh: true,
      paused: true
    });

    bouncingTimeline.to('#bottle', {
      rotate: randomAngle,
      duration: randomTime,
      ease: 'easeInOut'
    });

    ScrollTrigger.create({
      trigger: '#section3',
      scrub: true,
      onEnter: () => bouncingTimeline.play(),
      onLeave: () => bouncingTimeline.pause(),
      onEnterBack: () => bouncingTimeline.play(),
      onLeaveBack: () => bouncingTimeline.pause()
    });
  });
</script>

<div id="section3" />

<style>
  #section3 {
    background-color: blue;
    height: 100vh;
  }
</style>
