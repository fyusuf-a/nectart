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
  <div class="section-background" />
  <div class="background"/>
  <div id="dialogue"> A dialogue between</div>
  <Banner
    direction="left"
    text="the soul"
    --block-size-factor="1.8"
  />
  <Banner
    direction="right"
    text="the senses"
    --block-size-factor="1.53"
  />
</div>

<style lang="scss">
.subsection2 {
  background: #F9E5E3;
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

.section-background {
  opacity: 0.7;
  background: url("./photos/mio-ito-B_SLtmXPKNA.jpg"), lightgray -9px -744.762px / 142.222% 193.074% no-repeat;
  background-size: auto 200vh;
  background-position: 0 100vh;
  mix-blend-mode: overlay;
  height: 200vh;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
}
</style>
