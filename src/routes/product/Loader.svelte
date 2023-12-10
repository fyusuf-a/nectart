<script lang="ts">
  import { onMount } from 'svelte';

  let counter = 0;
  let images;

  onMount(() => {
    images = document.querySelectorAll('img');
    images.forEach((image) => {
      console.log(image);
      console.log('complete', image.complete && image.naturalHeight !== 0);
      image.onload = function () {
        // images = images;
        counter += 1;
        console.log('new image loaded');
      };
    });
    console.log(images);
    console.log('onMount');
  });
</script>

<div class="loader">
  {images ? counter / images.length : ''}%
</div>

<style lang="scss">
  .loader {
    position: fixed;
    top: 0;
    z-index: 5000;
    width: 100vw;
    height: 100vh;
    background-color: var(--Black);
    color: var(--White);
    @include accent;
    @include typographic-scale(5, 0);
  }
</style>
