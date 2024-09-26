<script lang="ts">
import { onMount } from "svelte";
import { twMerge } from "tailwind-merge";
export let style: "italic" | "normal" = "normal";
export let font: "sans-serif" | "serif" = "sans-serif";
</script>

<div class="flex flex-col gap-1">
  <div class="text-scale-0-0 font-normal italic normal-case">
    { font } ({ font === 'sans-serif' ? 'Avantt' : 'Saol Display' }), { style }
  </div>
  <div class={
    twMerge(
      "text-scale-1-0",
      font === "sans-serif" ? "font-sans" : "font-serif",
      style === "italic" ? "italic" : "normal",
      "normal-case"
    )
  }>
    The quick brown fox jumps over the lazy dog
  </div>
</div>
