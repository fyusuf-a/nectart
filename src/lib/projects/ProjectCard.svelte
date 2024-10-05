<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import type { Project } from "@prisma/client";
  import { abbreviateAddress, capitalizeFirstLetter } from "$lib/style/utils.js";
  import { twMerge } from "tailwind-merge";
  import OlfactiveNote from "$lib/components/OlfactiveNote.svelte";

  export let project: Project & { user: { address: string } };
  export let imgUrl: string;
</script>

<Card.Root
  class={
    twMerge(
      $$props.class,
      "project-root relative"
    )
  }
>
  <Card.Header>
    <Card.Title
      class="font-serif text-5xl font-bold italic"
    >
      { capitalizeFirstLetter(project.name) }
    </Card.Title>
    <Card.Description class="mb-scale-1-0 text-scale-0-2 italic">
      { abbreviateAddress(project.user.address) }
    </Card.Description>
    <Card.Description>{ project.description }</Card.Description>
    <Card.Content>
    {#if project?.topNotes.length > 0}
      <div class="relative flex mt-4">
          {#each project.topNotes as note}
            <OlfactiveNote label={note} />
          {/each}
          <div class="flex items-end rotate-90 w-scale-1-2 h-scale-1-2 font-sans uppercase font-light">Top</div>
      </div>
    {/if}
    {#if project?.heartNotes.length > 0}
    <div class="flex">
      <div class="flex items-end w-scale-1-2 h-scale-1-2 -rotate-90 font-sans uppercase font-light">Heart</div>
      {#each project.heartNotes as note}
        <OlfactiveNote label={note} />
      {/each}
    </div>
    {/if}
    {#if project?.baseNotes.length > 0}
    <div class="flex">
      {#each project.baseNotes as note}
        <OlfactiveNote label={note} />
      {/each}
      <div class="flex items-end rotate-90 w-scale-1-2 h-scale-1-2 font-sans uppercase font-light">Base</div>
    </div>
    {/if}
    </Card.Content>
  </Card.Header>
  <Card.Footer>
    <Button variant="outline">Discover</Button>
  </Card.Footer>

  <img class="absolute top-0 left-0 w-full h-full object-cover z-40" src={ imgUrl ?? `https://picsum.photos/800?random=${ Math.floor(Math.random() * 100) }` } alt="Project" />
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
