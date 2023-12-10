<script lang="ts">
  export let video: HTMLVideoElement;
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<video preload="metadata" {...$$restProps} bind:this={video}>
  <slot />
</video>
