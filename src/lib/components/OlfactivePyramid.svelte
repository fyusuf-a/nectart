<script lang="ts">
  import { twMerge } from "tailwind-merge";
  import OlfactiveNote from "./OlfactiveNote.svelte";
  export let topNotes: string[] | null;
  export let heartNotes: string[] | null;
  export let baseNotes: string[] | null;
  export let labelClass: string = "";
  export let noteClass: string = "";

</script>

{#if topNotes && topNotes.length > 0}
<div class={
  twMerge(
    "font-body uppercase font-light text-scale-0-0 h-scale-0-2 flex items-end",
    $$props.labelClass
  )}
>
Top notes
</div>
  <div class="relative flex flex-wrap">
      {#each topNotes as note}
        <OlfactiveNote
          class={
            twMerge(
              // TODO, customize tailwind-merge -> "h-scale-2-2 w-scale-2-2",
              noteClass,
            )
          }
          label={note}
        />
      {/each}
  </div>
{/if}
{#if heartNotes && heartNotes.length > 0}
<div class={
  twMerge(
    "font-body uppercase font-light text-scale-0-0 h-scale-0-2 flex items-end",
    labelClass
  )}
>
Heart notes
</div>
<div class="flex flex-wrap">
  {#each heartNotes as note }
    <div class="flex">
      <OlfactiveNote
        class={
          twMerge(
            // TODO, customize tailwind-merge -> "h-scale-2-2 w-scale-2-2",
            noteClass
          )
        }
        label={note}
      />
    </div>
  {/each}
</div>
{/if}
{#if baseNotes && baseNotes.length > 0}
<div class={
  twMerge(
    "font-body uppercase font-light text-scale-0-0 h-scale-0-2 flex items-end",
    labelClass
  )}
>
  Base notes
</div>
<div class="flex flex-wrap">
  {#each baseNotes as note }
    <div class="flex">
      <OlfactiveNote
        class={
          twMerge(
            // TODO, customize tailwind-merge -> "h-scale-2-2 w-scale-2-2",
            noteClass
          )
        }
        label={note}
      />
    </div>
  {/each}
</div>
{/if}
