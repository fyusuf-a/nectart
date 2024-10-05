import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(1).max(30),
  description: z.string().min(1).max(500),
  topNotes: z.array(z.string()).optional().default([]),
  baseNotes: z.array(z.string()).optional().default([]),
  heartNotes: z.array(z.string()).optional().default([]),
  picture: z.instanceof(File),
});

export type FormSchema = typeof formSchema;
export type FormSchemaType = z.infer<typeof formSchema>;
