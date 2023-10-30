<script>
  import Subsection1 from './section3/Subsection1.svelte';
  import Subsection2 from './section3/Subsection2.svelte';
</script>

<div id="section3">
  <div class="section-background" />
  <Subsection1 />
  <Subsection2 />
</div>

<style lang="scss">
  #section3 {
    background: #F9E5E3;
    height: 400vh;
    position: relative;
    z-index: -2;
  }

  .section-background {
    opacity: 0.7;
    background: url("./photos/mio-ito-B_SLtmXPKNA.jpg"), lightgray -9px -744.762px / 142.222% 193.074% no-repeat;
    background-size: cover;
    mix-blend-mode: overlay;
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
  }

  #section3 div {
    text-align: center;
    z-index: 0;
  }
</style>

