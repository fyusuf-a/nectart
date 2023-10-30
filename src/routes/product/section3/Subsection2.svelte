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
  <div class="background"/>
  <div id="dialogue"> A dialogue between</div>
  <div class="banner">
    the soul
  </div>
  <div class="banner">
    the senses
  </div>
  <Banner />
</div>

<style lang="scss">
.subsection2 {
  height: 100vh;
  position: relative;
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
  @include typographic-scale(1, 1);
  color: var(--Black);
  text-align: center;
  z-index: 4;
}

.banner {
  @include impact;
  @include typographic-scale(3, 0);
  color: var(--White);
}
</style>
