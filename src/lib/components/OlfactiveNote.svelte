<script lang="ts">
  import { olfactiveNotes } from '$lib/olfactive-notes';
  import * as Tooltip from '$lib/components/ui/tooltip';
  import { twMerge } from 'tailwind-merge';

  export let label: string;
  export let labelStyle: string;

  $: note = olfactiveNotes.find(note => note.label === label);
  $: url = `/images/olfactive-notes/${note?.slashUrl ?? (note?.tinyUrl ?? "")}`
</script>

<Tooltip.Root>
  <Tooltip.Trigger>
      {#if url}
        <img 
          src={url} 
          alt={label} 
          class={
            twMerge(
              "w-scale-1-2 h-scale-1-2 object-cover",
              $$props.class
            )
          }
        />
      {/if}
  </Tooltip.Trigger>
  <Tooltip.Content>
    <p>{label}</p>
  </Tooltip.Content>
</Tooltip.Root>