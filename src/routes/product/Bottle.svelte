<script>
  // import Image from '$lib/Image.svelte';
  import ThreeScene from '$lib/components/ThreeScene.svelte';
</script>

<div
  id="bottle-container"
  class="fixed z-10 text-white"
>
  <ThreeScene
    scale={0.3}
  />
</div>
<!--<div id="bottle-container"
  class="left-[50vw] fixed top-0 bottom-0 z-10 -translate-x-1/2" 
>
  <div
    id="bottle-centering-container"
    class="absolute z-50 w-full translate-y-1/2"
  >
    <div
      id="bottle-blur"
      class="absolute z-10 top-0 left-0"
    />
    <Image
      id="bottle"
      src="photos/bottle"
      alt="A bottle of water"
      class="w-full z-20 h-auto absolute top-0 left-0"
    />
    <Image
      id="bottle-shadow"
      src="photos/bottle"
      alt="A bottle of water"
      class="w-full invisible"
    />
  </div>
</div>-->

<style lang="scss">
  @use 'sass:math';
  @import './style.scss';

  $image-ratio: math.div(477, 727);

  :root {
    --blur: 0px;
  }

  #bottle-container {
    width: circle-size-with-navbar(0.5);
  }

  #bottle-centering-container {
    bottom: calc(rest-height(0.5));
    height: calc(image-ratio * rest-height(0.5));
  }

  #bottle-blur {
    margin-top: 29%;
    margin-left: 2%;
    margin-right: 2%;
    width: 96%;
    height: 79%;
    backdrop-filter: blur(var(--blur));
  }
</style>
