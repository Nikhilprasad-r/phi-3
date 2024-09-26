import { z } from "zod";

// Define the schema for a single test case
const TestCaseSchema = z.object({
  input: z.string().describe("Input for the test case"),
  output: z.string().describe("Output for the test case"),
});

// Define the schema for the response data
export const questionSchema = z.object({
  question: z.string().describe("Question for the interview"),
  input: z.string().describe("Input for the question"),
  output: z.string().describe("Output for the question"),
  testcases: z.array(TestCaseSchema).describe("Test cases for the question"),
  condition: z.string().describe("Condition for the question"),
  levels: z.array(z.string()).describe("Levels for the question"),
  starterCode: z.string().describe("Starter code for the question"),
});

// Type for the validated response
type questionData = z.infer<typeof questionSchema>;
