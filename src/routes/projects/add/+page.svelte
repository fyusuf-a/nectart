<script lang="ts">
  import { navbarHeight } from "@/stores/navbarHeight";
  import Title from "@/lib/components/Title.svelte";
  import ProjectForm from "./project-form.svelte";

  let paddingTop = 0;
  navbarHeight.subscribe((value) => {
    paddingTop = value;
  });
</script>
 
<div
  style="padding-top: {paddingTop}px"
  class="flex flex-col px-scale-0-0"
>
  <Title title="Create" />

  <ProjectForm />
</div>
