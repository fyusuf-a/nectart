<script lang="ts">
  import './style.scss';
  import Section1 from './AboveTheFold.svelte';
  import Section2 from './OdorCarousel.svelte';
  import Section3 from './PerfumeIsASensation.svelte';
  import Section4 from './PerfumeIsArt.svelte';
  import Section5 from './FleetingEmbrace.svelte';
  import Bottle from './Bottle.svelte';

  const bottleBlur = '10px';
</script>

<Bottle --blur={bottleBlur} />
<Section1 />
<Section2 />
<Section3 />
<Section4 />
<Section5 />
