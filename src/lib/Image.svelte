<script lang="ts">
  export let src = 'photos/';
  export let image: HTMLImageElement | undefined = undefined;
  const resolutions = [100, 200, 400, 800, 1000, 1400, 1800]
</script>

<img
  loading="lazy"
  src={`${src}-200.webp`}
  srcset={resolutions.map(resolution => `${src}-${resolution}.webp ${resolution}w`).join(', ')}
  {...$$restProps}
  bind:this={image}
/>

<style lang="scss">
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
