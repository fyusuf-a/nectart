<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import { validator } from "@felte/validator-zod";
  import { formSchema, type FormSchemaType, BUDGET_IN_SOL } from "./schema";
  import { createForm } from "felte";
  import Button from "@/lib/components/ui/button/button.svelte";
  import { FormField } from "@/lib/components/ui/form";
  import { umiStore } from "@/stores/wallet";
  import type { Umi } from "@metaplex-foundation/umi";
  import OlfactiveNotesSelect from "@/lib/components/OlfactiveNotesSelect.svelte";
  import { Textarea } from "$lib/components/ui/textarea";
  import { createMutation } from "@tanstack/svelte-query";
  import axios from "axios";
  import Spinner from "@/lib/components/ui/spinner/Spinner.svelte";
  import { walletStore } from "@/stores/wallet";
  import { get } from "svelte/store";
  import { signMessage } from "@/lib/crypto";
  import { goto } from "$app/navigation";
  import ProjectCard from "@/lib/projects/ProjectCard.svelte";
  import type { Project } from "@prisma/client";

  let umi: Umi;
  umiStore.subscribe((value) => {
    umi = value;
  });

  const mutationStore = createMutation({
    mutationFn: async (data: FormSchemaType) => {
      await walletStore.connect();
      const dataField = {
        name: data.name,
        description: data.description,
        topNotes: data.topNotes,
        heartNotes: data.heartNotes,
        baseNotes: data.baseNotes,
        tokenNumber: data.tokenNumber,
      };
      const form = new FormData();
      form.append("picture", data.picture);
      form.append("data", JSON.stringify(dataField));
      const umi = get(umiStore);
      const signature = await signMessage(umi, JSON.stringify(dataField));
      await axios.post("/api/projects", form, {
        headers: {
          'X-Signature': signature,
          'X-Public-Key': umi.identity.publicKey,
          'Content-Type': 'multipart/form-data'
        }
      });
      goto("/projects");
    }
  });
  let mutation: any;
  mutationStore.subscribe((value) => {
    mutation = value;
  });


  const { form, data, errors, setFields } = createForm({
    onSubmit: async (values) => {
      mutation.mutate(values);
    },
    extend: validator({ schema: formSchema }),
    initialValues: {
      name: "Name",
      description: "",
      topNotes: [],
      heartNotes: [],
      baseNotes: [],
      picture: null,
      tokenNumber: null,
    },
  });

  let coverImage: string | null = null;
  function handleFileChange(e) {
    const selectedFile = e.target?.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) coverImage = e.target.result as string;
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  let formElement: HTMLFormElement | null;
  let project: Project & { user?: { address: string } };
  data.subscribe((value) => {
    project = {
      name: value.name ?? "",
      description: value.description ?? "",
      topNotes: value.topNotes ?? [],
      heartNotes: value.heartNotes ?? [],
      baseNotes: value.baseNotes ?? [],
      tokenNumber: value.tokenNumber ?? 100,
      budgetInSol: BUDGET_IN_SOL,
      user: {
        address: '0x1234567890',
      },
    };
  });
</script>

<div class="flex flex-col items-center">
{#if $mutationStore.isPending}
  <Spinner />
{:else}
  <form
    class="w-scale-5-2 flex flex-col gap-scale-0-0"
    use:form
    enctype="multipart/form-data"
    bind:this={formElement}
  >
    <div class="flex justify-between gap-scale-0-2 mb-scale-2-0">
      <ProjectCard
        project={project}
        class="p-scale-1-2 break-inside-avoid hidden md:block"
        imgUrl={coverImage}
      />
      <ProjectCard
        project={project}
        class="p-scale-1-2 break-inside-avoid"
        uncovered
        bordered
      />
    </div>
    <FormField
      title="Name of the project"
      name="name"
      {errors}
    >
      <Input
        id="name"
        name="name"
      />
    </FormField>
    <FormField
      title="Description"
      name="description"
      {errors}
    >
      <Textarea
        id="description"
        name="description"
      />
    </FormField>
    <FormField
      title="Top notes"
      name="topNotes"
      on:input={(e) => setFields('topNotes', e.detail)}
      {errors}
    >
      <OlfactiveNotesSelect
        on:input={(e) => setFields('topNotes', e.detail)}
        name="topNotes"
      />
    </FormField>
    <FormField
      title="Heart notes"
      name="heartNotes"
      {errors}
    >
      <OlfactiveNotesSelect
        on:input={(e) => setFields('heartNotes', e.detail)}
        name="heartNotes"
      />
    </FormField>
    <FormField
      title="Base notes"
      name="baseNotes"
      {errors}
    >
      <OlfactiveNotesSelect
        on:input={(e) => setFields('baseNotes', e.detail)}
        name="baseNotes"
      />
    </FormField>
    <FormField
      title="Picture"
      name="picture"
      {errors}
    >
      <Input
        id="picture"
        type="file"
        on:input={(e) => {
         setFields('picture', e.target.files[0]);
         handleFileChange(e);
        }}
      />
    </FormField>
    <FormField
      title="Token number"
      name="tokenNumber"
      {errors}
    >
      <Input
        name="tokenNumber"
        type="number"
      />
    </FormField>
    <FormField
      title="Budget (SOL)"
      name="budget"
    >
      <Input
        id="budget"
        type="number"
        value={BUDGET_IN_SOL}
        readonly
      />
    </FormField>
    <FormField
      title="Price per token (SOL)"
      name="pricePerToken"
    >
      <Input
        type="number"
        value={BUDGET_IN_SOL / $data.tokenNumber}
        readonly
      />
    </FormField>
    <Button
      type="submit"
      class="mt-scale-1-0"
    >
      Submit
    </Button>
  </form>
{/if}
</div>
