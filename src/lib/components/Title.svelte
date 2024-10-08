<script lang="ts">
  import { twMerge } from "tailwind-merge";

  export let title;
</script>

<div
  class={
    twMerge(
      "w-full flex justify-center text-scale-4-0 font-serif font-light italic normal-case mb-scale-3-0",
      $$props.class
    )
  }
>
  <div class="flex flex-col">
    <h1>{ title }</h1>
    <div class="flex self-end">
      <slot />
    </div>
  </div>
</div>
