<script lang="ts">
  import OlfactivePyramid from '@/lib/components/OlfactivePyramid.svelte';
  import Title from "@/lib/components/Title.svelte";
  import Button from '@/lib/components/ui/button/button.svelte';
  import * as Card from "$lib/components/ui/card/index.js";
  import Slider from '@/lib/components/ui/slider/slider.svelte';
  import { sol, amountToString, multiplyAmount } from '@metaplex-foundation/umi';

  let value = [10];

  export let data;
  $: project = data.props.project;

  $: tokenPrice = project?.budgetInSol ? sol(project.budgetInSol / project.tokenNumber) : undefined;
</script>

<div
  class="flex flex-col px-scale-0-0 pt-scale-2-2 pb-scale-1-2"
>
  {#if !project}
    <Title
      class="font-sans font-extralight uppercase"
      title="Not found"
    />

  {:else}
    <Title title={ project.name } />

    <div>
    <img
      src={ project.images[0].url }
      alt={ project.name }
      class="mt-scale-1-1 w-scale-5-0 h-scale-5-0 object-cover float-end"
    />
    <div class="text-scale-1-2 font-light mt-scale-1-1">
      { project.description }

      <!--<div-->
        <!--class="font-serif text-scale-2-0"-->
      <!-->-->
        <!--Olfactive pyramid-->
      <!--</div>-->
    </div>

    <div
      class="mt-scale-1-1"
    >
      <OlfactivePyramid
        topNotes={ project.topNotes }
        heartNotes={ project.heartNotes }
        baseNotes={ project.baseNotes }
        noteClass="w-scale-3-2 h-scale-3-2"
        labelClass="text-scale-1-2 h-scale-2-0 font-extralight"
      />
    </div>
    </div>

  {#if tokenPrice}
  <div class="flex justify-center pt-scale-2-2">
    <Card.Root
      bordered
    >
      <Card.Header>
        <Card.Title>
          Pledge
          <div slot="subtitle">
            { project.tokenNumber - project.boughtTokens } tokens available / { project.tokenNumber}

          </div>
        </Card.Title>
        <Card.Description>
          <div class="grid grid-cols-2 gap-y-2">
            <p>
              Token price
            </p>
            <p>
              { Number(amountToString(tokenPrice)) } SOL
            </p>
            <div>
              Number of tokens
            </div>
            <div>{project.tokenNumber}</div>
        </Card.Description>
      </Card.Header>
      <Card.Content class="w-scale-5-0">
          <Slider
            bind:value={value}
            max={100}
            min={1}
            step={1}
            class="mt-scale-1-0"
          />
      </Card.Content>
      <Card.Footer class="Footer">
        <Button class="w-1/2">
          Get { value } token{ value[0] > 1 ? 's' : '' } ({ Number(amountToString(multiplyAmount(tokenPrice, value[0]))) } SOL)
        </Button>
      </Card.Footer>
    </Card.Root>
  </div>
  {/if}

  {/if}
</div>
