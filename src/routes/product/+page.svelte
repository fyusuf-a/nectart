<script lang="ts">
  import type { Theme } from '$lib/types/theme.d';
  import Section1 from './Section1.svelte';
  import Section2 from './Section2.svelte';
  import Section3 from './Section3.svelte';
  import Section4 from './PerfumeIsArt.svelte';
  import Section5 from './FleetingEmbrace.svelte';
  import Bottle from './Bottle.svelte';

  const theme: Theme = {
    backgroundColor: 'var(--Black)',
    color: 'var(--White)'
  };
  
  const bottleBlur = '10px';
</script>

<Bottle --blur={ bottleBlur } />
<Section1 { theme } />
<Section2 />
<Section3 />
<Section4 />
<Section5 />
<div id="section6" />

<style lang="scss">
  @import "./style.scss";

  #section6 {
    height: 100vh;
    background-color: red;
  }
</style>
