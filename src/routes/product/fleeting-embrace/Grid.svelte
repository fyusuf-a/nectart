<script>
  import { photos } from '$lib/fleeting-embrace-images.ts';
</script>

<div class="container">
  <div class="grid-container">
    <div class="grid">
      {#each photos as photo}
      <img
        src={`photos/fleeting-embrace/${photo.photoUrl}`}
      />
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
$ratio: 1.5;
$img-horizontal-padding: 2vw;
$img-height: 20vh;
$img-width: calc(#{$ratio * $img-height} + 2 * #{$img-horizontal-padding});

img {
  height: $img-height;
  aspect-ratio: $ratio;
  object-fit: cover;
}

.grid-container {
  padding: 4vh 8vw;
  height: 100vh;
  overflow: hidden;
  justify-content: center;
  align-items: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(calc(#{$img-width}), 1fr));
  row-gap: 4vh;
  justify-items: center;
}

.container {
  position: relative;
}
</style>
  
