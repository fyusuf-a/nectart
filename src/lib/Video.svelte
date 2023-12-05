<script lang="ts">
export let video: HTMLVideoElement;
export let customStyle: string = '';
</script>

<video
  preload="metadata"
  {...$$restProps}
  bind:this={video}
>
  <slot />
</video>
