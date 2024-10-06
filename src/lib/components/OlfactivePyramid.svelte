<script lang="ts">
    import { twMerge } from "tailwind-merge";
  import OlfactiveNote from "./OlfactiveNote.svelte";
  export let topNotes: string[] | null;
  export let heartNotes: string[] | null;
  export let baseNotes: string[] | null;

</script>

{#if topNotes && topNotes.length > 0}
  <div class="font-sans uppercase font-light">Top notes</div>
  <div class="relative flex flex-wrap">
      {#each topNotes as note}
        <OlfactiveNote
          class="h-scale-3-2 w-scale-1-2"
          label={note}
        />
      {/each}
  </div>
{/if}
{#if heartNotes && heartNotes.length > 0}
<div class="font-sans uppercase font-light h-scale-0-2 flex items-end">Heart notes</div>
<div class="flex flex-wrap">
  {#each heartNotes as note }
    <div class="flex">
      <OlfactiveNote
        class="h-scale-2-2 w-scale-2-2"
        label={note}
      />
    </div>
  {/each}
</div>
{/if}
{#if baseNotes && baseNotes.length > 0}
<div class="font-sans uppercase font-light h-scale-0-2 flex items-end">Base notes</div>
  {#each baseNotes as note, i}
    <div class="flex">
      <div class={
        twMerge(
         (i + 1) % 2 === 0 && "h-scale-1-2 w-scale-1-2",
        )
      } />
      <OlfactiveNote
        class="h-scale-1-2 w-scale-3-2"
        label={note}
      />
    </div>
  {/each}
{/if}
