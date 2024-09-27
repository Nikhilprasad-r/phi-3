import { JsonOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";

// Define your desired data structure using TypeScript interfaces for typing
interface QuestionData {
  question: string;
  input: string;
  output: string;
  testcases: Array<{
    input: string;
    output: string;
  }>;
  condition: string;
  levels: string[];
  starterCode: string;
}

// Initialize ChatOpenAi model
const model = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  temperature: 0,
  openAIApiKey:process.env.OPEN_AI_KEY
});

// Function to generate a programming question
export async function generateQuestion(language: string, topic: string) {
  // Query to generate a programming question
  const generateQuestionQuery = `Generate a descriptive scenario-based programming question that focuses on the language ${language} and the topic ${topic}. The scenario should be practical and relevant to real-world applications, incorporating complexity in a way that can be handled at different levels of difficulty (beginner, intermediate, advanced). Provide a JSON object as output containing the following fields:
  - 'question': A string containing the question statement.
  - 'input': A string representing the sample input.
  - 'output': A string representing the expected output.
  - 'testcases': An array of 3 test cases with 'input' and 'output' fields.
  - 'condition': A string specifying important conditions or constraints.
  - 'levels': An array containing difficulty levels.
  - 'starterCode': A string containing starter code that sets up the problem, without the solution logic.`;

  // JSON format instructions for the response
  const formatInstructions = `Respond with a valid JSON object containing the fields 'question', 'input', 'output', 'testcases', 'condition', 'levels', and 'starterCode'.`;

  // Set up the output parser for the expected data structure
  const parser = new JsonOutputParser<QuestionData>();

  // Create a prompt template
  const prompt = ChatPromptTemplate.fromTemplate(
    "Answer the user query.\n{format_instructions}\n{query}\n"
  );

  // Inject the query and formatting instructions into the prompt template
  const partialedPrompt = await prompt.partial({
    format_instructions: formatInstructions,
  });

  // Chain the prompt with the model and parser
  const chain = partialedPrompt.pipe(model).pipe(parser);

  try {
    // Invoke the chain and generate the question
    const response = await chain.invoke({ query: generateQuestionQuery });

    return response;
  } catch (error) {
    console.error("Error generating question:", error);
    return { error: "An error occurred while generating the question" };
  }
}
