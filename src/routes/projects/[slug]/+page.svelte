<script lang="ts">
  import OlfactivePyramid from '@/lib/components/OlfactivePyramid.svelte';
  import Title from "@/lib/components/Title.svelte";
  import * as Card from "$lib/components/ui/card/index.js";
  import Slider from '@/lib/components/ui/slider/slider.svelte';
  import { sol, amountToString, type Umi, type PublicKey } from '@metaplex-foundation/umi';
  import MintButton from '@/lib/components/blockchain/MintButton.svelte';
  import { createQuery } from '@tanstack/svelte-query';
  import { page } from '$app/stores';
  import axios from 'axios';
  import type { ProjectWithCandyMachine } from '$lib/types/project';
  import Spinner from '@/lib/components/ui/spinner/Spinner.svelte';
  import { fetchCandyMachine, type CandyMachine } from '@metaplex-foundation/mpl-core-candy-machine';
  import { umiStore } from '@/stores/frontendUmi.js';

  let umi: Umi;
  umiStore.subscribe((value) => {
    if (value) umi = value;
  });

  let tokensOwned = 0; // TODO: get from wallet

  export let data;
  //$: project = data.props.project;

  const query = createQuery({
    queryKey: ["projects", $page.params.slug],
    queryFn: async () => {
      const res = await axios(`/api/projects/${$page.params.slug}`);
      return res.data as ProjectWithCandyMachine;
    },
  });

  $: project = $query.data;


  $: tokenPrice = project?.budgetInSol ? sol(project.budgetInSol / project.tokenNumber) : undefined;

  $: remainingTokens = project ? project?.tokenNumber - project?.boughtTokens : undefined;

  let candyMachine: CandyMachine | undefined;
  $: (async () => {
    if (umi && project?.candyMachineAddress) {
      candyMachine = project?.candyMachineAddress ? await fetchCandyMachine(umi, project.candyMachineAddress as PublicKey) : undefined;
    }
  })();
</script>

<div
  class="flex flex-col px-scale-1-0 pt-scale-2-2 pb-scale-1-2"
>
  {#if $query.isLoading}
    <div class="flex justify-center m-scale-2-0">
      <Spinner />
    </div>
  {:else if $query.isError}
    <Title
      class="font-sans font-extralight uppercase"
      title="Not found"
    />
  {:else}
    {#if project}
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
        labelClass="text-scale-1-2 h-scale-2-2 font-extralight"
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
            { project.itemsAvailable } tokens available / { project.itemsTotal}

          </div>
        </Card.Title>
        <Card.Description>
          <div class="grid grid-cols-2 gap-y-scale--1-0 gap-x-scale-2-0">
            <p>
              Token price
            </p>
            <p class="text-end">
              { Number(amountToString(tokenPrice)) } SOL
            </p>
            <div>
              Number of tokens
            </div>
            <div class="text-end">{project.itemsAvailable}</div>
            <div>
              Owned by you
            </div>
            <p class="text-end">{tokensOwned}</div>
        </Card.Description>
      </Card.Header>
      <Card.Footer class="Footer">
        <MintButton
          price={ tokenPrice }
          project={ project }
          bind:tokensOwned
        />
      </Card.Footer>
    </Card.Root>
  </div>
  {/if}
  {/if}
  {/if}
</div>
