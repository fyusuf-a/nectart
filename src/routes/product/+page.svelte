<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';
  import Section1 from './Section1.svelte';
  import Section2 from './Section2.svelte';
  import Section3 from './Section3.svelte';

  gsap.registerPlugin(ScrollTrigger);

  onMount(() => {
    /*const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#section3',
        start: 'top center',
        end: 'center center',
        scrub: true,
        markers: true,
      }
    });

    tl.to('#bottle', {
      top: '50%',
      ease: easingFunction
    });*/
    /*return () => {
      tl.clear();
    };*/
  });
</script>

<img id="bottle" src="photos/bottle.png" alt="A bottle of water" />
<Section1 />
<Section2 />
<Section3 />
<div id="section4" />

<style lang="scss">
  @import "./style.scss";

  :global(body) {
    background-color: var(--Black);
  }
  #section4 {
    background-color: purple;
    height: 100vh;
  }

  #bottle {
    width: circle-size(0.5);
    z-index: 1;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    bottom: calc(rest-height(0.5) - circle-size(0.4));
    left: 50%;
    z-index: 1;
  }
</style>
