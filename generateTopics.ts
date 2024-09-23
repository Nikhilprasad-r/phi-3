import { getChatCompletions } from "./getChatCompletions";
import { extractJsonData } from "./lib/extractJsonData";
import { TopicsSchema } from "./lib/topicsSchema";

export async function generateTopics(language: string, years: number) {
  const promptContent = `You are tasked with generating 3 interview topics to test coding skills for a software development role. The candidate has ${years} years of experience in ${language}. 
  Consider the depth and breadth of their experience, focusing on concepts, best practices, and real-world applications. Include topics that would challenge their understanding of ${language} in both theoretical and practical aspects. 
  Make sure these topics cover key areas such as performance optimization, code scalability, design patterns, coding knowledge, solving problems, and any unique features of ${language} that are relevant to experienced developers. At the end of each conversation, include only a JSON response formatted exactly like this (in a single line with no line breaks or extra text):
          {"data":{"topic1":"topic description","topic2":"topic description","topic3":"topic description"}}. Ensure that the JSON is the last part of your response, with no extra text or formatting errors. If any field is missing, use an empty string ("")`;

  const generateTopicsPrompt = [
    {
      role: "system",
      content: `You are a programming expert and interview coding question generator. ${promptContent}`,
    },
    {
      role: "user",
      content: promptContent,
    },
  ];

  try {
    // Call getChatCompletions and wait for the response
    const assistantMessage = await getChatCompletions(generateTopicsPrompt);

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
