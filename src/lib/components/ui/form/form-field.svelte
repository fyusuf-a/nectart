<script lang="ts">
  import FormLabel from "./form-label.svelte";

  export let name;
  export let errors;
  export let title: string;
</script>

<div class="flex flex-col gap-scale--2-0">
  <FormLabel
    class="uppercase"
    for={ name }
  >
    { title }
  </FormLabel>
  <slot />
  {#if $errors[name]?.length}
    <p class="red-100">{$errors[name][0]}</p>
  {/if}
</div>
