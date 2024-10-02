<script lang="ts">
  import { MultiSelect } from "svelte-multiselect";
  import { olfactiveNotes } from "@/lib/olfactive-notes";
  import { createEventDispatcher } from "svelte";

  export let name: string;

  let selected: { label: string, url: string }[] = [];

  export let selectedNotes: string[] = [];

  const dispatch = createEventDispatcher();

  $: {
    selectedNotes = selected.map((s) => s.label);
    dispatch("input", selectedNotes);
  }
</script>

<MultiSelect
  bind:selected
  options={ olfactiveNotes }
  removeAllTitle="Remove all foods"
  closeDropdownOnSelect={false}
  {name}
>
  <div let:option slot="option" class="flex items-center">
    <img src={option.url} alt={option.label} style="width: 20px; height: 20px; margin-right: 8px;" />
    {option.label}
  </div>
  <div let:option slot="selected" class="flex items-center">
    <img src={option.url} alt={option.label} style="width: 20px; height: 20px; margin-right: 8px;" />
    {option.label}
  </div>
</MultiSelect>
