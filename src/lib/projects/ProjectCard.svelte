<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import type { Project } from "@prisma/client";
  import { abbreviateAddress, capitalizeFirstLetter } from "$lib/style/utils.js";
  import { twMerge } from "tailwind-merge";
  import OlfactivePyramid from "../components/OlfactivePyramid.svelte";
  import { goto } from "$app/navigation";

  export let project: Project & { user?: { address: string } };
  export let imgUrl: string | null = null;
  export let uncovered: boolean = false;
  export let bordered: boolean = false;
</script>

<Card.Root
  class={
    twMerge(
      $$props.class,
      "flex-1 project-root relative",
      bordered && "border border-[var(--color)] border-solid"
    )
  }
>
  <Card.Header>
    <Card.Title
      class="font-serif text-5xl font-bold italic"
    >
      { capitalizeFirstLetter(project.name) }
    </Card.Title>
    {#if project.user}
    <Card.Description class="mb-scale-1-0 text-scale-0-2 italic">
      { abbreviateAddress(project.user.address) }
    </Card.Description>
    {/if}
    <Card.Description>{ project.description }</Card.Description>
    <Card.Content>
      <OlfactivePyramid
        topNotes={project.topNotes}
        heartNotes={project.heartNotes}
        baseNotes={project.baseNotes}
      />
    </Card.Content>
  </Card.Header>
  <Card.Footer>
    <Button
      variant="outline"
      on:click={() => {
        goto(`/projects/${project.id}`);
      }}
    >
      Discover
    </Button>
  </Card.Footer>

  {#if !uncovered}
  <img class="absolute top-0 left-0 right-0 w-full h-full object-cover z-40" src={ imgUrl ?? `https://picsum.photos/800?random=${ Math.floor(Math.random() * 100) }` } alt="Project" />
  <div
    class="title tracking-tight font-serif text-5xl font-bold italic absolute left-scale-1-0 top-scale-1-2 z-50 text-white"
    style="mix-blend-mode: color;"
  >
      { capitalizeFirstLetter(project.name) }
  </div>
  <div
    class="title tracking-tight font-serif text-5xl font-bold italic absolute left-scale-1-0 top-scale-1-2 z-50 text-white"
    style="mix-blend-mode: exclusion;"
  >
      { capitalizeFirstLetter(project.name) }
  </div>
  {/if}
</Card.Root>

<style>
  :global(.project-root > img, .project-root > .title) {
    opacity: 1;
    transition: opacity 1s;
  }
  :global(.project-root:hover > img, .project-root:hover .title ) {
    opacity: 0;
    transition: opacity 1s;
  }
</style>
