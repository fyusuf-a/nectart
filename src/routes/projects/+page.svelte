<script lang="ts">
  import Button from "@/lib/components/ui/button/button.svelte";
  import ProjectCard from "@/lib/projects/ProjectCard.svelte";
  import { twMerge } from "tailwind-merge";
  import { navbarHeight } from "@/stores/navbarHeight";
  import Title from "@/lib/components/Title.svelte";
  import { goto } from "$app/navigation";

  let paddingTop = 0;
  navbarHeight.subscribe((value) => {
    paddingTop = value;
  });
</script>
 
<div
  style="padding-top: {paddingTop}px"
  class="flex flex-col px-scale-0-0"
>
  <Title title="Projects">
    <Button
      on:click={() => goto("/projects/add")}
    >
      Add yours
    </Button>
  </Title>

  <div class="px-scale-0-0 pt-scale-0-0 columns-2 gap-scale-3-0 xl:gap-scale-1-0 md:columns-2 xl:columns-3 xl:gap-scale-1-0">
    {#each Array.from({ length: 30 }, (_, index) => index) as number }
      <div class="h-5 w-5 bg-blue-500 md:bg-red-500 lg:bg-blue-100 xl:bg-stone-500 2xl:bg-orange-500 overflow-hidden"></div>
      <ProjectCard class={
          twMerge(
            "w-full bg-red-100 break-inside-avoid mb-scale-1-0 w-scale-5-0 lg:w-scale-4-2 xl:w-scale-4-1 h-scale-3-0",
            "2xl:w-scale-4-2",
            number % 2 === 0 && "h-scale-5-1",
            number % 3 === 0 && "h-scale-5-2",
          )
        }
      />
    {/each}
  </div>
</div>