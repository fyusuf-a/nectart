<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import type { Project } from "@prisma/client";
  import { capitalizeFirstLetter } from "@metaplex-foundation/mpl-core/dist/src/utils";
  import { twMerge } from "tailwind-merge";

  export let project: Project;
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
      class="font-serif text-5xl font-bold italic mb-scale-1-0"
    >
      { capitalizeFirstLetter(project.name) }
    </Card.Title>
    <Card.Description>{ project.description }</Card.Description>
  </Card.Header>
 rueqoiuper ureoiuquroiuiqwer uroiuoiqweru riuoiqr uqwer iruoiuqweri uqroip
 rueqoiuper ureoiuquroiuiqwer uroiuoiqweru riuoiqr uqwer iruoiuqweri uqroip
 rueqoiuper ureoiuquroiuiqwer uroiuoiqweru riuoiqr uqwer iruoiuqweri uqroip
 rueqoiuper ureoiuquroiuiqwer uroiuoiqweru riuoiqr uqwer iruoiuqweri uqroip
 rueqoiuper ureoiuquroiuiqwer uroiuoiqweru riuoiqr uqwer iruoiuqweri uqroip
 rueqoiuper ureoiuquroiuiqwer uroiuoiqweru riuoiqr uqwer iruoiuqweri uqroip
 rueqoiuper ureoiuquroiuiqwer uroiuoiqweru riuoiqr uqwer iruoiuqweri uqroip
 rueqoiuper ureoiuquroiuiqwer uroiuoiqweru riuoiqr uqwer iruoiuqweri uqroip
 rueqoiuper ureoiuquroiuiqwer uroiuoiqweru riuoiqr uqwer iruoiuqweri uqroip
 rueqoiuper ureoiuquroiuiqwer uroiuoiqweru riuoiqr uqwer iruoiuqweri uqroip
 rueqoiuper ureoiuquroiuiqwer uroiuoiqweru riuoiqr uqwer iruoiuqweri uqroip
 rueqoiuper ureoiuquroiuiqwer uroiuoiqweru riuoiqr uqwer iruoiuqweri uqroip
 rueqoiuper ureoiuquroiuiqwer uroiuoiqweru riuoiqr uqwer iruoiuqweri uqroip
 rueqoiuper ureoiuquroiuiqwer uroiuoiqweru riuoiqr uqwer iruoiuqweri uqroip
 rueqoiuper ureoiuquroiuiqwer uroiuoiqweru riuoiqr uqwer iruoiuqweri uqroip
 rueqoiuper ureoiuquroiuiqwer uroiuoiqweru riuoiqr uqwer iruoiuqweri uqroip
 rueqoiuper ureoiuquroiuiqwer uroiuoiqweru riuoiqr uqwer iruoiuqweri uqroip
 rueqoiuper ureoiuquroiuiqwer uroiuoiqweru riuoiqr uqwer iruoiuqweri uqroip
 rueqoiuper ureoiuquroiuiqwer uroiuoiqweru riuoiqr uqwer iruoiuqweri uqroip
 rueqoiuper ureoiuquroiuiqwer uroiuoiqweru riuoiqr uqwer iruoiuqweri uqroip

  <!--<Card.Content>-->
   <!--<form>-->
    <!--<div class="grid w-full items-center gap-4">-->
     <!--<div class="flex flex-col space-y-1.5">-->
      <!--<Label for="name">Name</Label>-->
      <!--<Input id="name" placeholder="Name of your project" />-->
     <!--</div>-->
     <!--<div class="flex flex-col space-y-1.5">-->
      <!--<Label for="framework">Framework</Label>-->
      <!--<Select.Root>-->
       <!--<Select.Trigger id="framework">-->
        <!--<Select.Value placeholder="Select" />-->
       <!--</Select.Trigger>-->
       <!--<Select.Content>-->
        <!--{#each frameworks as framework}-->
         <!--<Select.Item value={framework.value} label={framework.label}-->
          <!-->{framework.label}</Select.Item-->
         <!-->-->
        <!--{/each}-->
       <!--</Select.Content>-->
      <!--</Select.Root>-->
     <!--</div>-->
    <!--</div>-->
   <!--</form>-->
  <!--</Card.Content>-->
  <!--<Card.Footer class="flex flex-wrap justify-between">-->
   <!--<Button variant="outline">Cancel</Button>-->
   <!--<Button>Deploy</Button>-->
  <!--</Card.Footer>-->
  <img class="absolute top-0 left-0 w-full h-full object-cover z-40" src={ `https://picsum.photos/800?random=${ Math.floor(Math.random() * 100) }` } alt="Project" />
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
  :global(.project-root:hover > img, .project-root:hover .title ) {
    opacity: 0;
    transition: opacity 0.3s;
  }
</style>
