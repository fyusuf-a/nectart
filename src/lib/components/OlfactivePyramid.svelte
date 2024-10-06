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
      <!--<div class="relative h-scale-3-2 w-scale-1-2">-->
        <!--<div class="absolute w-scale-3-2 h-scale-1-2 right-0 -translate-y-full -rotate-90 origin-bottom-right flex justify-end items-end">-->
        <!--<div class="font-sans uppercase font-light text-end">-->
          <!--Top notes-->
        <!--</div>-->
        <!--</div>-->
      <!--</div>-->
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
  <!--<div class="flex items-end justify-end w-scale-2-2 h-scale-2-2 font-sans uppercase font-light"><div class="text-end bg-red-100">Heart notes</div></div>-->
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
<div class="flex flex-wrap">
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
</div>
{/if}
