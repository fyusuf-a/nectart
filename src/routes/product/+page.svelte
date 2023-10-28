<script lang="ts">
  import { onMount } from 'svelte';
  import Section1 from './Section1.svelte';
  import Section2 from './Section2.svelte';
  import Section3 from './Section3.svelte';
  import Bottle from './Bottle.svelte';

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

<Bottle />
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
</style>
