import { getChatCompletions } from "../Ai/getChatCompletions";

export async function evaluateSolution(language:string, topic:string, question:string, solution:string) {
  const evaluatorPrompt = [
    {
      role: "system",
      content: `You are a programming mentor. Provide detailed feedback for the student's solution.`,
    },
    {
      role: "user",
      content: `The question given to the student to solve in ${language} programming language on ${topic} is:"${question}".The provided solution is:\`\`\`${solution}\`\`\` Evaluate the solution thoroughly and provide line-by-line feedback. Assess the correctness, efficiency, and relevance. Provide suggestions for improvements, and grade the solution on a scale of 10. Make sure the response is in the following JSON format:{"suggestions": [ "string", "string", "string" ],"marks": number,"feedback": "string"}`,
    },
  ];

  return await getChatCompletions(evaluatorPrompt);
}