import { getChatCompletions } from "../Ai/getChatCompletions";
import { evaluationSchema } from "../lib/evaluationSchema";
import { extractJsonData } from "../lib/extractJsonData";

export async function evaluateSolution(
  language: string,
  topic: string,
  question: string,
  solution: string,
  testCases: { input: string; expectedOutput: string }[]
) {
  const evaluatorPrompt = [
    {
      role: "system",
      content: `You are a programming mentor. Evaluate the student's solution by running test cases and providing feedback.`,
    },
    {
      role: "user",
      content: `The question given to the student to solve in ${language} programming language on ${topic} is: "${question}". The provided solution is: \`\`\`${solution}\`\`\`. Evaluate the solution by running the following test cases:
${testCases
  .map(
    (testCase, index) =>
      `Test Case ${index + 1}:\nInput: \`${
        testCase.input
      }\`\nExpected Output: \`${testCase.expectedOutput}\`\n`
  )
  .join("\n")}
Ensure that the solution is tested thoroughly. If the code produces the correct output for each test case, give detailed line-by-line feedback. If it fails for any test case, return an error specifying which test case failed and why. Also, assess the efficiency and grade the solution on a scale of 10.

Return a JSON object formatted exactly like this (on a single line with no line breaks or extra text):
 {"data":{
  "testResults": [
    {
      "testCase": "string",
      "result": "pass" | "fail",
      "error": "string | null"
    }
  ],
  "suggestions": [ "string", "string", "string" ],
  "marks": number,
  "feedback": "string"
}}. Make sure the JSON is the last part of your response and doesnt have formatting error.`,
    },
  ];

  try {
    // Call getChatCompletions and wait for the response
    const evaluatorResponse = await getChatCompletions(evaluatorPrompt);
    const extractedData = evaluatorResponse
    ? extractJsonData(evaluatorResponse)
    : null;
  return extractedData;
  } catch (e) {
    console.error("Validation errors:", e);
    return null;
  }
}
