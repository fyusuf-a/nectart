<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { type HeadingLevel, subtitleTag } from "./index.js";
	import { cn } from "$lib/utils.js";

	type $$Props = HTMLAttributes<HTMLHeadingElement> & {
		tag?: HeadingLevel;
	};

	let className: $$Props["class"] = undefined;
	export let tag: $$Props["tag"] = "h3";
        $: subtitleHeading = tag ? subtitleTag(tag) : undefined;
	export { className as class };
</script>

<div class="mb-scale-1-0">
  <svelte:element
          this={tag}
          class={cn("text-5xl font-serif font-bold leading-none tracking-tight italic", className)}
          {...$$restProps}
  >
    <slot />
  </svelte:element>
  <svelte:element this={subtitleHeading} class="text-scale-0-1 italic font-normal">
    <slot name="subtitle"></slot>
  </svelte:element>
</div>
