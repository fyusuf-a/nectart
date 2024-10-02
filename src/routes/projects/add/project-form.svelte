<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import { validator } from "@felte/validator-zod";
  import { formSchema } from "./schema";
  import { createForm } from "felte";
  import Button from "@/lib/components/ui/button/button.svelte";
  import { FormField } from "@/lib/components/ui/form";
  import { umiStore } from "@/stores/wallet";
  import type { Umi } from "@metaplex-foundation/umi";
  import OlfactiveNotesSelect from "@/lib/components/OlfactiveNotesSelect.svelte";
  import { Textarea } from "$lib/components/ui/textarea";

  let umi: Umi;
  umiStore.subscribe((value) => {
    umi = value;
  });

  const { form, errors, data } = createForm({
    onSubmit: async (values) => {
      const newData = {
        ...values,
        topNotes: data.topNotes,
        heartNotes: data.heartNotes,
        baseNotes: data.baseNotes,
      };
      console.log(newData);
    },
    extend: validator({ schema: formSchema }),
    initialValues: {
      name: "",
      description: "",
      topNotes: [],
      heartNotes: [],
      baseNotes: [],
    },
  });
</script>

<div class="flex flex-col items-center">
{ JSON.stringify(data) }
<form class="w-scale-5-2 flex flex-col gap-scale-0-0" use:form>
  <FormField
    title="Name of the project"
    name="name"
    {errors}
  >
    <Input id="name" name="name" />
  </FormField>
  <FormField
    title="Description"
    name="description"
    {errors}
  >
    <Textarea id="description" name="description" />
  </FormField>
  <FormField
    title="Top notes"
    name="topNotes"
    {errors}
  >
    <OlfactiveNotesSelect
      bind:selectedNotes={data.topNotes}
      name="topNotes"
    />
  </FormField>
  <FormField
    title="Middle notes"
    name="heartNotes"
    {errors}
  >
    <OlfactiveNotesSelect
      bind:selectedNotes={data.heartNotes}
      name="heartNotes"
    />
  </FormField>
  <FormField
    title="Base notes"
    name="baseNotes"
    {errors}
  >
    <OlfactiveNotesSelect
      bind:selectedNotes={data.baseNotes}
      name="baseNotes"
    />
  </FormField>
  <Button
    type="submit"
    class="mt-scale-1-0"
  >
    Submit
  </Button>
</form>
</div>
