import { z } from 'zod';

// Define the schema for a single test case
const TestCaseSchema = z.object({
  input: z.string(),
  output: z.string(),
});

// Define the schema for the response data
const questionSchema = z.object({
  question: z.string(),
  input: z.string(),
  output: z.string(),
  testcases: z.array(TestCaseSchema),
  condition: z.string(),
  levels: z.array(z.string()),
  starterCode: z.string(),
});

// Type for the validated response
type questionData = z.infer<typeof questionSchema>;
