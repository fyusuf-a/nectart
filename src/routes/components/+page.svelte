<script lang="ts">
import { Button } from "$lib/components/ui/button";
import TypographySize from "$lib/designSystem/TypographySize.svelte";
import TypographyStyle from "$lib/designSystem/TypographyStyle.svelte";
import { sizes } from "$lib/designSystem";
import { onMount } from "svelte";

let rootElement: HTMLElement | null = null;
let remSize: number = 0;
const fontStyles = ["italic", "normal"] as const;
const fonts = ["sans-serif", "serif"] as const;

onMount(() => {
  rootElement = document.documentElement;
  const fontSize = window.getComputedStyle(rootElement!).fontSize;
  remSize = parseFloat(fontSize.replace("px", ""));
});

</script>

<div>
  <section class="py-24 px-8 w-full grid grid-rows-[auto] grid-cols-3 gap-3">
  <div class="text-scale-3-0 col-span-3">
    Typography (sizes)
    <div class="text-scale-1-0">
      <a class="italic normal-case font-normal" href="https://spencermortensen.com/articles/typographic-scale/">See this description (3 notes per octave, 1rem = { remSize }px)</a>
    </div>
  </div>
  {#each sizes as size}
    <div>
      <TypographySize
        octave={ size.octave }
        note={ size.note }
        sizeClass={ size.sizeClass }
      />
    </div>
  {/each}
  </section>
  <section class="px-8 w-full flex flex-col gap-4">
  <div class="text-scale-3-0 col-span-4">
    Typography (fonts)
  </div>
  {#each fonts as font}
    { #each fontStyles as style }
      <div>
        <TypographyStyle
          font={ font }
          style={ style }
        />
      </div>
    {/each}
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
