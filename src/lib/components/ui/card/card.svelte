<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils.js";
  import { twMerge } from "tailwind-merge";

  type $$Props = HTMLAttributes<HTMLDivElement>;

  let className: $$Props["class"] = undefined;
  export { className as class };
  export let bordered: boolean = false;
</script>

<div
  class={
    twMerge(
      bordered && "border border-[var(--color)] border-solid",
      cn("bg-card p-scale-1-2 text-card-foreground", className)
  )}
  {...$$restProps}
>
  <slot />
</div>
