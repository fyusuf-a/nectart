<script lang="ts">
  import { onMount } from "svelte";
  import Image from "./Image.svelte";

  export let src = '';
  export let video: HTMLVideoElement | null = null;
  export let poster: HTMLImageElement | null = null;
  export let loaded = false;
  export let onLoad = () => {};
  const resolutions = [1800, 1400, 1000, 800, 400, 200];
  let videoAvailable = false;

  const playVideo = () => {
      video!.play();
      videoAvailable = true;
  };

  onMount(() => {
    const screenSize = window.innerWidth;
    let videoResolution;
    for (let i = 0; i < resolutions.length; i++) {
      videoResolution = resolutions[i];
      if (resolutions[i] < screenSize) {
        break;
      }
    }
    video!.src = `${src}-${videoResolution}.webm`;
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
      if (!loaded)
        clearInterval(checkProgressTick);
    };
  })
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<div class="video-container">
  <Image
    src={src}
    image={poster ?? undefined}
    style={$$restProps.style + (videoAvailable ? 'display: none;' : '')}
    alt=""
  />
  <video
    preload="metadata"
    class="video"
    bind:this={video}
    {...$$restProps}
  />
</div>

<style lang="scss">
  .video-container {
    width: 100%;
    height: 100%;
  }

  .video {
    width: 100%;
    height: 100%;
  }
</style>
