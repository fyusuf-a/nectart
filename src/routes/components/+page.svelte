<script>
import { Button } from "$lib/components/ui/button";

</script>

<div>
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
