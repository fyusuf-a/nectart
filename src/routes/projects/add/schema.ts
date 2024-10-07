import { z } from 'zod';
import { BUDGET_IN_SOL } from '@/lib/constants';

export const SOL_IN_LAMPORTS = 100_0000_000;

export const formSchema = z.object({
  name: z.string().min(1).max(30),
  description: z.string().min(1).max(500),
  topNotes: z.array(z.string()).optional().default([]),
  baseNotes: z.array(z.string()).optional().default([]),
  heartNotes: z.array(z.string()).optional().default([]),
  picture: z.instanceof(File),
  tokenNumber: z.number().int().positive()
}).refine(data => {
    return Number.isInteger(BUDGET_IN_SOL * SOL_IN_LAMPORTS / data.tokenNumber);
  }, {
  message: `Token number must be a divisor of ${BUDGET_IN_SOL}`,
  path: ['tokenNumber']
});

export type FormSchema = typeof formSchema;
export type FormSchemaType = z.infer<typeof formSchema>;
