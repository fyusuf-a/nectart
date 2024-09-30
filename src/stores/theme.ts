import { writable } from "svelte/store";

export const themeStore = writable<'light' | 'dark' | 'transparent'>('light');
