<script lang="ts">
  export let targetReturnTime: number;
  export let easingFunction: (t: number) => number;

  import { onMount } from 'svelte';
  import * as THREE from 'three';
  import Video from './Video.svelte';

  let video: HTMLVideoElement;
  let timeAtLastMouseMove = 0;
  let videoRateAtLastMouseMove = 0;
  let targetPlaybackRate = 0.7;
  let loaded: boolean;

  type Mouse = {
    x: number;
    y: number;
  };

  const videoStyle = `
    object-fit: cover;
  `;

  onMount(() => {
    const mouse = { x: 0, y: 0 };
    const clock = new THREE.Clock();

    const onMouseMove = (event: MouseEvent) => {
      if (!loaded) {
        return;
      }
      const mouseSpeed = Math.sqrt(
        Math.pow(mouse.x - event.clientX, 2) + Math.pow(mouse.y - event.clientY, 2)
      );

      videoRateAtLastMouseMove = mouseSpeed * 0.02;
      if (videoRateAtLastMouseMove > 3) {
        videoRateAtLastMouseMove = 3;
      }
      if (videoRateAtLastMouseMove < targetPlaybackRate) {
        videoRateAtLastMouseMove = targetPlaybackRate;
      }
      timeAtLastMouseMove = clock.getElapsedTime();
    }

    window.addEventListener('mousemove', onMouseMove)

    let frame = requestAnimationFrame(function tick() {
      const elapsed = clock.getElapsedTime();
      const delta = elapsed - timeAtLastMouseMove;
      if (delta < targetReturnTime) {
        const progress = easingFunction((elapsed - timeAtLastMouseMove) / targetReturnTime);
        video.playbackRate =
          videoRateAtLastMouseMove + (targetPlaybackRate - videoRateAtLastMouseMove) * progress;
      }
      frame = requestAnimationFrame(tick);
    });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMouseMove);
    };
  });
</script>

<Video
  src="videos/oleg-lehnitsky"
  autoplay
  muted
  loop
  style={videoStyle}
  onLoad={() => {
    loaded = true;
  }}
  bind:video
/>
