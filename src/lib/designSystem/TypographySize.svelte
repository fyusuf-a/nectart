<script lang="ts">
import { onMount } from "svelte";

export let sizeClass;
export let octave;
export let note;

let element: HTMLElement | null = null;
let size: number = 0;

onMount(() => {
  const fontSize = window.getComputedStyle(element!).fontSize;
  size = parseFloat(fontSize.replace("px", ""));
});
</script>

<div class={ sizeClass }>
  <div class="text-scale-0-0 font-normal italic normal-case">
    octave: { octave }, note: { note }, size: { Math.round(size) }px
  </div>
  
  <span bind:this={element}>
    The quick brown fox jumps over the lazy dog
  </span>
</div>
