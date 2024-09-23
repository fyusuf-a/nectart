<script lang="ts">
import { Button } from "$lib/components/ui/button";
import Typography from "$lib/designSystem/Typography.svelte";
import { sizes } from "$lib/designSystem";

</script>

<div class="pt-24">
  <section class="px-8 w-full grid grid-rows-[auto] grid-cols-4 gap-4">
  <div class="text-scale-3-0 col-span-4">
    Typography (sizes)
  </div>
  {#each sizes as size}
  <div>
    <Typography
      octave={ size.octave }
      note={ size.note }
      sizeClass={ size.sizeClass }
    />
  </div>
  {/each}
  </section>
  <section class="my-[100px] px-8 w-full grid grid-rows-4 grid-cols-4 gap-4">
  <div class="text-scale-3-0 col-span-4">
    Buttons
  </div>
  <div>
    <Button
      variant="default"
      size="default"
      on:click={() => console.log("clicked")}
    >Primary</Button>
  </div>
  <div>
    <Button
      variant="outline"
      size="default"
      on:click={() => console.log("clicked")}
    >Outline</Button>
  </div>
  </section>
</div>
