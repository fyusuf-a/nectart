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
  bordered={bordered}
  class={
    twMerge(
      $$props.class,
      "flex-1 project-root relative",
    )
  }
>
  <Card.Header>
    <Card.Title >
      { project.name }
      <div slot="subtitle">
      {#if project?.user?.address}
        { abbreviateAddress(project.user.address) }
      {/if}
      </div>
    </Card.Title>
    <Card.Description>{ project.description }</Card.Description>
  </Card.Header>
  <Card.Content>
    <OlfactivePyramid
      topNotes={project.topNotes}
      heartNotes={project.heartNotes}
      baseNotes={project.baseNotes}
      noteClass="h-scale-2-0 w-scale-2-0"
      labelClass="h-scale-1-1"
    />
  </Card.Content>
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
