<script lang="ts">
  import Section1 from './Section1.svelte';
  import Section2 from './Section2.svelte';
  import Section3 from './Section3.svelte';
  import Section4 from './PerfumeIsArt.svelte';
  import Bottle from './Bottle.svelte';
  
  const bottleBlur = '10px';
</script>

<Bottle --blur={ bottleBlur } />
<Section1 />
<Section2 />
<Section3 />
<Section4 />
<div id="section5" />

<style lang="scss">
  @import "./style.scss";

  :global(body) {
    background-color: var(--Black);
  }

  #section5 {
    height: 100vh;
    background-color: red;
  }
</style>
