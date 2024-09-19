<script lang="ts">
	import { Button as ButtonPrimitive } from "bits-ui";
	import { type Events, type Props, buttonVariants } from "./index.js";
	import { cn } from "$lib/utils.js";

	type $$Props = Props;
	type $$Events = Events;

	let className: $$Props["class"] = undefined;
	export let variant: $$Props["variant"] = "default";
	export let size: $$Props["size"] = "default";
	export let builders: $$Props["builders"] = [];
	export { className as class };

        const variantColor = variant === "default" ? "--background-color" : "--color";
</script>

<ButtonPrimitive.Root
	{builders}
	class={cn(buttonVariants({ variant, size, className }))}
	type="button"
	{...$$restProps}
	on:click
	on:keydown
>
	<slot />
        <svg width="4" height="6" viewBox="0 0 4 6" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 3L0.25 5.59808L0.25 0.401924L4 3Z" fill="var({ variantColor })"/>
        </svg>
</ButtonPrimitive.Root>
