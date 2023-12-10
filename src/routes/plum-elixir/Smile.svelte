<script lang="ts">
  import Subsection1 from './smile/Subsection1.svelte';
  import Subsection2 from './smile/Subsection2.svelte';
  import Subsection3 from './smile/Subsection3.svelte';
</script>

<section id="smile">
  <Subsection1 />
  <Subsection2 />
  <Subsection3 />
</section>

<style lang="scss">
  #smile {
    position: relative;
    width: 100vw;
    background-color: var(--Grey);
  }
</style>
