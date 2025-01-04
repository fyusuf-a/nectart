<script lang="ts">
  import { onMount } from 'svelte';

  export let src = '';
  export let video: HTMLVideoElement | null = null;
  export let poster: string = `/${src}-200.webp`;
  export let onLoad = () => {};
  const resolutions = [1800, 1400, 1000, 800, 400, 200];
  let videoAvailable = true;
  let loaded = false;

  const playVideo = () => {
      video!.play();
      videoAvailable = true;
  };

  const setVideoUnavailable = () => {
    videoAvailable = false;
  };

  onMount(() => {
    document.addEventListener('DOMContentLoaded', setVideoUnavailable);
    video!.addEventListener('canplaythrough', playVideo);

    const checkProgressTick = setInterval(() => {
      if (video!.buffered.length !== 0) {
        if (video!.buffered.end(0) / video!.duration > 0.9) {
          loaded = true;
          onLoad();
          clearInterval(checkProgressTick);
        }
        return;
      }
    }, 500);

    return () => {
      video!.removeEventListener('canplaythrough', playVideo);
      document.removeEventListener('DOMContentLoaded', setVideoUnavailable);
      if (!loaded)
        clearInterval(checkProgressTick);
    };
  })
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<div class="video-container">
  <video
    preload="metadata"
    class="video"
    bind:this={video}
    poster={poster}
    style={$$restProps.style + (videoAvailable ? 'display: block;' : 'display: none;')}
    {...$$restProps}
  >
    {#each resolutions as resolution, i }
      <source
        src={`/${src}-${resolution}.webm`}
        {...(i < resolutions.length - 1 ? { media: `(min-width: ${resolutions[i + 1]}px)` } : {})}
      />
    {/each}
  </video>
</div>

<style lang="scss">
  .video-container {
    width: 100%;
    height: 100%;
  }

  .video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
