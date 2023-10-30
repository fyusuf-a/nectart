<script>
  import Banner from './Banner.svelte';
  import { onMount } from 'svelte';
  import gsap from 'gsap';

  onMount(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#section3 .subsection2',
        pin: '#section3 .subsection2',
        invalidateOnRefresh: true,
        scrub: true,
      }
    });

    timeline.to('#dialogue', {
      autoAlpha: 0,
      duration: 0.5
    });


  });
</script>

<div class="subsection2">
  <div id="dialogue"> A dialogue between</div>
  <div class="banner">
    the soul
  </div>
  <div>
    the senses
  </div>
  <Banner />
</div>

<style>
.subsection2 {
  height: 100vh;
}
</style>
