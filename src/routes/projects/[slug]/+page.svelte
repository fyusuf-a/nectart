<script lang="ts">
  import OlfactivePyramid from '@/lib/components/OlfactivePyramid.svelte';
  import Title from "@/lib/components/Title.svelte";
  import * as Card from "$lib/components/ui/card/index.js";
  import Slider from '@/lib/components/ui/slider/slider.svelte';
  import { sol, amountToString } from '@metaplex-foundation/umi';
  import MintButton from '@/lib/components/blockchain/MintButton.svelte';

  let value = [10];
  let tokensOwned = 0; // TODO: get from wallet

  export let data;
  $: project = data.props.project;

  $: tokenPrice = project?.budgetInSol ? sol(project.budgetInSol / project.tokenNumber) : undefined;

  $: remainingTokens = project ? project?.tokenNumber - project?.boughtTokens : undefined;
</script>

<div
  class="flex flex-col px-scale-1-0 pt-scale-2-2 pb-scale-1-2"
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
      class="ml-scale--1-0 mb-scale--1-0 w-scale-5-0 h-scale-5-0 object-cover float-end"
    />
    <div class="break-normal text-scale-1-2 font-light mb-scale-1-1">
      { project.description }
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
            { remainingTokens } tokens available / { project.tokenNumber}

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
            <div>
              Owned by you
            </div>
            <div>{tokensOwned}</div>
        </Card.Description>
      </Card.Header>
      <Card.Content class="w-scale-5-0">
          <Slider
            bind:value={value}
            max={remainingTokens}
            min={1}
            step={1}
            class="mt-scale-1-0"
          />
      </Card.Content>
      <Card.Footer class="Footer">
        <MintButton
          price={ tokenPrice }
          wantedTokens={ value[0] }
          projectId={ project.id }
          bind:tokensOwned
        />
      </Card.Footer>
    </Card.Root>
  </div>
  {/if}

  {/if}
</div>
