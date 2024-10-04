<script lang="ts">
  import Button from "@/lib/components/ui/button/button.svelte";
  import ProjectCard from "@/lib/projects/ProjectCard.svelte";
  import { twMerge } from "tailwind-merge";
  import { navbarHeight } from "@/stores/navbarHeight";
  import Title from "@/lib/components/Title.svelte";
  import { goto } from "$app/navigation";
  import { createQuery } from "@tanstack/svelte-query";
  import axios from "axios";
  import Spinner from "@/lib/components/ui/spinner/Spinner.svelte";

  let paddingTop = 0;
  navbarHeight.subscribe((value) => {
    paddingTop = value;
  });

  const query = createQuery({
    queryKey: ["projects"], 
    queryFn: async () => {
      const res = await axios("/api/projects");
      return res.data;
    },
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

  <div class="px-scale-0-0 pt-scale-0-0">
    {#if $query.isLoading}
      <div class="w-full flex justify-center">
        <Spinner />
      </div>
    {:else if $query.isError}
      <div>Error: { $query.error.message }</div>
    {:else}

    <div class="columns-2 gap-5 gap-scale-3-0 xl:gap-scale-1-0 md:columns-2 xl:columns-3 xl:gap-scale-1-0">
      {#each $query.data as project }
        <!--<div class="h-5 w-5 bg-blue-500 md:bg-red-500 lg:bg-blue-100 xl:bg-stone-500 2xl:bg-orange-500 overflow-hidden"></div>-->
        <div class="mb-scale-1-0">
          <ProjectCard
            project={project}
            class={
              twMerge(
                "p-scale-1-2 w-full break-inside-avoid w-scale-5-0 lg:w-scale-4-2 xl:w-scale-4-1", 
                "2xl:w-scale-4-2",
              )
            }
          />
        </div>
      {/each}
    </div>
    {/if}
  </div>
</div>