<script lang="ts">
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

    timeline.to('#bottle-container', {
      opacity: 1,
      delay: 0.5,
    });


  });
</script>

<div class="subsection2">
  <div class="section-background" />
  <div class="background"/>
  <div id="dialogue"> A dialogue between</div>
  <div class="banner-container">
    <div class="banner-couple">
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
    <div class="banner-couple">
      <Banner
        direction="left"
        text="the perfumer"
        --block-size-factor="1.2"
        --number-of-characters="12"
      />
      <Banner
        direction="right"
        text="you"
        --block-size-factor="3.8"
        --number-of-characters="3"
      />
    </div>
  </div>
</div>

<style lang="scss">
@import 'style.scss';

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
