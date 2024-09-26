import { writable } from 'svelte/store';
import type { SolanaConnect } from 'solana-connect';

export const wallet = writable<SolanaConnect | null>(null);
