<script>
  import OlfactivePyramid from '@/lib/components/OlfactivePyramid.svelte';
  import Title from "@/lib/components/Title.svelte";
  import ProjectCard from '@/lib/projects/ProjectCard.svelte';

  export let data;
  $: project = data.props.project;
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

    <ProjectCard
      project={project}
      class="p-scale-1-2 break-inside-avoid"
    />
  {/if}
</div>
