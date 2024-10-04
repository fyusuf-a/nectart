<script lang="ts">
  import { olfactiveNotes } from '$lib/olfactive-notes';
  import * as Tooltip from '$lib/components/ui/tooltip';

  export let label: string;

  $: note = olfactiveNotes.find(note => note.label === label);
  $: url = note ? note.url : '';
</script>

<Tooltip.Root>
  <Tooltip.Trigger>
    <div class="flex flex-col items-center w-25 m-2.5">
      {#if url}
        <img 
          src={url} 
          alt={label} 
          class="w-20 h-20 object-cover rounded-full"
        />
      {:else}
        <div class="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
          <span class="text-gray-400">?</span>
        </div>
      {/if}
    </div>
  </Tooltip.Trigger>
  <Tooltip.Content>
    <p>{label}</p>
  </Tooltip.Content>
</Tooltip.Root>