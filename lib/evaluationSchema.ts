import { z } from "zod";

// Define the schema for individual test results
const testResultSchema = z.object({
  testCase: z.string(), // The test case description or input
  result: z.enum(["pass", "fail"]), // The result can either be "pass" or "fail"
  error: z.string().nullable(), // Error message or null if the test passed
});

// Define the Zod schema for the entire response
export const evaluationSchema = z
  .string()
  .nonempty("Input string cannot be empty") // Ensure the input string is not empty
  .transform((data) => {
    // Try to parse the string as JSON
    try {
      return JSON.parse(data.trim()); // Trim any extra spaces
    } catch (error) {
      throw new Error("Invalid JSON format");
    }
  })
  .refine((parsedData) => typeof parsedData === "object" && parsedData !== null, {
    message: "Parsed data must be a valid object",
  })
  .transform((parsedData) =>
    z.object({
      testResults: z.array(testResultSchema), // Array of test results
      suggestions: z.array(z.string()), // Array of feedback suggestions
      marks: z.number().min(0).max(10), // Marks out of 10
      feedback: z.string(), // Detailed feedback string
    }).parse(parsedData)
  );
