import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(2).max(30),
  email: z.string().min(2).max(30),
  password: z.string().min(2).max(30),
});

export type FormSchema = typeof formSchema;
