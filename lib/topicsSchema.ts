import { z } from 'zod';

// Define the schema for the topics response data
export const TopicsSchema = z.object({
  data: z.object({
    topic1: z.string().default(""),
    topic2: z.string().default(""),
    topic3: z.string().default(""),
  }),
});

// Type for the validated response
export type TopicsResponseData = z.infer<typeof TopicsSchema>;
