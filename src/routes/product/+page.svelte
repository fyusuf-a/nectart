<script lang="ts">
  import { onMount } from 'svelte';
  import Section1 from './Section1.svelte';
  import Section2 from './Section2.svelte';
  import Section3 from './Section3.svelte';

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

<div id="bottle-container">
  <div id="centering-container">
    <div id="bottle-blur"/>
    <img id="bottle-shadow" src="photos/bottle.png" alt="A bottle of water" />
    <img id="bottle" src="photos/bottle.png" alt="A bottle of water" />
  </div>
</div>
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

  #bottle-container {
    position: fixed;
    width: circle-size(0.5);
    left: 50%;
    transform: translate(-50%, 0);
    top: 0;
    bottom: calc(rest-height(0.5) - circle-size-with-navbar(0.7));
    left: 50%;
    z-index: 1;
  }

  #centering-container {
    position: absolute;
    top: 50%;
    transform: translate(0%, -50%);
  }

  #bottle, #bottle-shadow {
    width: 100%;
    height: auto;
    z-index: 200;
  }

  #bottle-shadow {
    visibility: hidden;
  }

  #bottle {
    position: absolute;
    left: 0;
  }

  #bottle-blur {
    position: absolute;
    left: 0;
    top: 0;
    margin-top: 29%;
    margin-left: 2%;
    margin-right: 2%;
    width: 96%;
    height: 79%;
    backdrop-filter: blur(5px);
    z-index: 1;
  }
</style>
