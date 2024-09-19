import { getChatCompletions } from "./getChatCompletions";

export async function generateSolution(language:string, topic:string, question:string) {
  const generateSolutionPrompt = [
    {
      role: "system",
      content: `You are a programming expert, generate a solution for the given question.`,
    },
    {
      role: "user",
      content: `Based on the following parameters, generate a code solution in ${language} that solves the problem defined in ${question}. The code should be relevant to the topic ${topic}. Make sure the solution adheres to the question's requirements and conditions. Use appropriate features of ${language} and take into consideration the complexity and edge cases described in the test cases. Your solution should be efficient and clear, considering the problem's constraints.Language: ${language} Topic: ${topic} Question: ${question}The generated code should provide a valid solution to the problem, considering: - Question Requirements - Edge Cases - Efficiency - Code Clarity - Input/Output Handling`,
    },
  ];

  return await getChatCompletions(generateSolutionPrompt);
}