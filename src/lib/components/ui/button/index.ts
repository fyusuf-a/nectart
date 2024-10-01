import { type VariantProps, tv } from "tailwind-variants";
import type { Button as ButtonPrimitive } from "bits-ui";
import Root from "./button.svelte";

const buttonVariants = tv({
	base: "flex justify-between items-center ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center whitespace-nowrap text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase",
	variants: {
		variant: {
			default: "bg-[var(--color)] text-[var(--background-color)] hover:bg-[var(--background-color)]/90 border border-solid border-[var(--color)] hover:invert hover:border-[var(--background-color)]",
			destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
			outline: "border-input bg-background hover:bg-[var(--background-color)] hover:text-[var(--color)] border border-solid hover:border-[var(--color)] hover:bg-[var(--color)] hover:text-[var(--background-color)]",
			secondary: "bg-[var(--color)] text-secondary-foreground hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline",
		},
		size: {
			default: "h-12 px-16 py-2 gap-5",
			sm: "h-9 px-3",
			lg: "h-11 px-8",
			icon: "h-10 w-10",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});

type Variant = VariantProps<typeof buttonVariants>["variant"];
type Size = VariantProps<typeof buttonVariants>["size"];

type Props = ButtonPrimitive.Props & {
	variant?: Variant;
	size?: Size;
};

type Events = ButtonPrimitive.Events;

export {
	Root,
	type Props,
	type Events,
	//
	Root as Button,
	type Props as ButtonProps,
	type Events as ButtonEvents,
	buttonVariants,
};
