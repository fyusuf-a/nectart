<script lang="ts">
  import { onMount } from 'svelte';
  import { GLTFScene } from '$lib/components/scene';
  import * as THREE from 'three';

  export let scale: number = 0.3;

  let el: HTMLCanvasElement;

  onMount(() => {
    new GLTFScene(el, 'models/bottle.glb', {
      scale: 0.14,
      position: new THREE.Vector3(0, 0, -.5),
      rotation: new THREE.Euler(0, 0, 0),
    });
  });
</script>

<canvas
  class="h-full h-full"
  bind:this={el}
/>