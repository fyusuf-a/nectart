<script>
  import { onMount } from 'svelte';
  import ScrollTrigger from 'gsap/ScrollTrigger';

  // Pin the section
  onMount(() => {
    ScrollTrigger.create({
      trigger: '#section3',
      pin: true,
      end: 'bottom -100%'
    });

  });
</script>

<div id="section3">
  <div class="centered">Perfume <span class="accent">is</span><br> a sensation</div>
</div>

<style lang="scss">
  #section3 {
    opacity: 0.7;
    /* background: url("./photos/mio-ito-B_SLtmXPKNA.jpg"),
    * linear-gradient(0deg, #F8E2E0 0%, rgba(247, 223, 221, 0.00) 95.43%),
    * #F9E5E3; */
    background: url("./photos/mio-ito-B_SLtmXPKNA.jpg"), linear-gradient(0deg, #F8E2E0 0%, rgba(247, 223, 221, 0.00) 95.43%), #ffe0dd;
    background-blend-mode: overlay, multiply;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #section3 div {
    @include impact;
    @include typographic-scale(3, 0);

    & .accent {
      @include accent;
    }

  }

  centered {
    text-align: center;
  }
    
</style>

