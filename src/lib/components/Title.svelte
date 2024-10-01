<script lang="ts">
export let title;
</script>

<div class="w-full flex justify-center">
  <div class="flex flex-col">
    <h1 class="text-scale-4-0 font-serif font-light italic normal-case">{ title }
    </h1>
    <div class="flex self-end">
      <slot />
    </div>
  </div>
</div>
