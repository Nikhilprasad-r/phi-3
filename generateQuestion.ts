import { getChatCompletions } from "./getChatCompletions";
import { extractJsonData } from "./lib/extractJsonData";

export async function generateQuestion(language: string, topic: string) {
  const generateQuestionPrompt = [
    {
      role: "system",
      content: `You are a programming expert, generate a scenario-based question that helps evaluate the candidate.`,
    },
    {
      role: "user",
      content: `Generate a descriptive scenario-based programming question that focuses on the language ${language} and the topic ${topic}. The scenario should be practical and relevant to real-world applications, incorporating complexity in a way that can be handled at different levels of difficulty (beginner, intermediate, advanced). The question should be detailed enough to provide a clear problem statement, including:
      - **Question Statement**: Explain the problem, setting, and the expected outcome clearly. Ensure that the problem is related to ${topic} and showcases features specific to ${language}.
      - **Sample Input/Output**: Provide a sample input that reflects the type of data the question will be handling. The sample output should correspond to this input, showing the expected result after the problem is solved. Keep the input/output format clear and consistent with the question.
      - **Test Cases**: Include three test cases (input/output pairs) that align with the question. The test cases should represent different scenarios:
        - One simple test case for basic functionality.
        - One intermediate test case for slightly more complex scenarios.
        - One edge case or complex test case to challenge advanced problem-solving skills.
      - **Conditions**: Specify any important conditions or constraints (e.g., input size, special rules) that need to be considered when solving the problem.
      - **Difficulty Levels**: Clearly indicate the range of difficulty levels (beginner, intermediate, advanced) that the problem can cater to, based on the complexity of the solution.
      - **Starter Code**: Provide a small code snippet to handle receiving input and setting up the problem, but do not include any solution logic. The starter code should be language-appropriate and focus on the input structure and preparation. Encourage users to implement their own logic based on the scenario.
  
      Return only a JSON object formatted exactly like this (on a single line with no line breaks or extra text):
      {"data":{"question":"string","input":"string","output":"string","testcases":[{"input":"string","output":"string"},{"input":"string","output":"string"},{"input":"string","output":"string"}],"condition":"string","levels":["string"],"starterCode":"string"}}. Make sure the JSON is the last part of your response and doesnt have formatting error.`,
    },
  ];
  
  
  try {
    // Call getChatCompletions and wait for the response
    const assistantMessage = await getChatCompletions(generateQuestionPrompt);
console.log(assistantMessage)
    // Use the helper function to extract JSON data
    const extractedData = assistantMessage
      ? extractJsonData(assistantMessage)
      : { data: "" };

    return extractedData;
  } catch (error) {
    console.error("Error generating topics:", error);
    return {};
  }
}
