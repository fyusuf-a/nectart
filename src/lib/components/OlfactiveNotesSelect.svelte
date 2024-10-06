<script lang="ts">
  import { MultiSelect, type Option } from "svelte-multiselect";
  import { olfactiveNotes } from "@/lib/olfactive-notes";
  import { createEventDispatcher } from "svelte";

  export let name: string;

  let selected: { label: string, url: string }[] = [];

  const options = olfactiveNotes;

  const dispatch = createEventDispatcher();
</script>

<MultiSelect
  bind:selected
  style="padding: 7px 10.5px 7px 10.5px;border-radius: 0px"
  options={ olfactiveNotes }
  removeAllTitle="Remove all notes"
  closeDropdownOnSelect={false}
  {name}
  on:change={() => {
    const selectedNotes = selected.map((s) => s.label);
    dispatch("input", selectedNotes);
  }}
>
  <div let:option slot="option" class="flex items-center">
    <img src={`/images/olfactive-notes/${option.tinyUrl}`} alt={option.label} style="width: 20px; height: 20px; margin-right: 8px;" />
    {option.label}
  </div>
  <div let:option slot="selected" class="flex items-center">
    <img src={`/images/olfactive-notes/${option.tinyUrl}`} alt={option.label} style="width: 20px; height: 20px; margin-right: 8px;" />
    {option.label}
  </div>
</MultiSelect>
