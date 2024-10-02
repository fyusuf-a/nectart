import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(1).max(30),
  description: z.string().min(1).max(500),
  topNotes: z.array(z.string()).optional().default([]),
  baseNotes: z.array(z.string()).optional().default([]),
  middleNotes: z.array(z.string()).optional().default([]),
});

export type FormSchema = typeof formSchema;
