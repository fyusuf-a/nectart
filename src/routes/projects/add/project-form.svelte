<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import { validator } from "@felte/validator-zod";
  import { formSchema } from "./schema";
  import { createForm } from "felte";
  import Button from "@/lib/components/ui/button/button.svelte";
  import { FormField, FormLabel } from "@/lib/components/ui/form";
 
  const { form, errors, isSubmitting } = createForm({
    onSubmit: async (values) => {
      console.log(values);
    },
    extend: validator({ schema: formSchema }),
  });
</script>

<div class="flex flex-col items-center">
<form class="w-scale-5-2 flex flex-col gap-scale--1-2" use:form>
  <FormField
    title="Name of the project"
    name="name"
    {errors}
  >
    <Input id="name" name="name" />
  </FormField>
  <FormField
    title="Email"
    name="email"
    {errors}
  >
    <Input type="email" id="email" name="email" />
  </FormField>
  <FormField
    title="Password"
    name="password"
    {errors}
  >
    <Input id="password" type="password" name="password" />
  {#if $errors.password?.length}
    <p>{$errors.password[0]}</p>
  {/if}
  </FormField>
  <Button
    type="submit"
    class="mt-scale-1-0"
  >
    Submit
  </Button>
</form>
</div>
