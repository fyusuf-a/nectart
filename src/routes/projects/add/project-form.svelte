<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import { validator } from "@felte/validator-zod";
  import { formSchema, type FormSchemaType } from "./schema";
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

  let umi: Umi;
  umiStore.subscribe((value) => {
    umi = value;
  });

  const mutationStore = createMutation({
    mutationFn: async (data: FormSchemaType) => {
      await walletStore.connect();
      const umi = get(umiStore);
      const signature = await signMessage(umi, JSON.stringify(data));
      axios.post("/api/projects", data, {
        headers: {
          'X-Signature': signature,
          'X-Public-Key': umi.identity.publicKey
        }
      });
    }
  });
  let mutation: any;
  mutationStore.subscribe((value) => {
    mutation = value;
  });


  const { form, errors, setFields } = createForm({
    onSubmit: async (values) => {
      mutation.mutate(values);
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
{#if $mutationStore.isPending}
  <Spinner />
{:else}
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
    <Button
      type="submit"
      class="mt-scale-1-0"
    >
      Submit
    </Button>
  </form>
{/if}
</div>
