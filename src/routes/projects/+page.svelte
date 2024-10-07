<script lang="ts">
  import Button from "@/lib/components/ui/button/button.svelte";
  import ProjectCard from "@/lib/projects/ProjectCard.svelte";
  import Title from "@/lib/components/Title.svelte";
  import { goto } from "$app/navigation";
  import { createQuery } from "@tanstack/svelte-query";
  import axios from "axios";
  import Spinner from "@/lib/components/ui/spinner/Spinner.svelte";

  const query = createQuery({
    queryKey: ["projects"], 
    queryFn: async () => {
      const res = await axios("/api/projects");
      return res.data;
    },
  });

</script>
 
<div
  class="flex flex-col px-scale-0-0 pt-scale-2-2 pb-scale-1-2"
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

    <div class="pt-scale-1-1 md:columns-2 lg:columns-3 gap-scale-1-2"> 
      {#each $query.data as project }
        <div class="mb-scale-1-0">
          <ProjectCard
            imgUrl={project.images.length > 0 ? project.images[0].url : undefined}
            project={project}
            class="break-inside-avoid"
          />
        </div>
      {/each}
    </div>
    {/if}
  </div>
</div>