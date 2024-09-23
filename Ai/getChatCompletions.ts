import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import type {
  GetChatCompletionsDefaultResponse,
  GetChatCompletions200Response,
} from "@azure-rest/ai-inference";

export async function getChatCompletions(
  messages: Array<{ role: string; content: string }>
) {
  const Phi_Hosted_Url = process.env.Phi_Hosted_Url;
  const Phi_Hosted_Key = process.env.Phi_Hosted_Key;

  if (!Phi_Hosted_Url || !Phi_Hosted_Key) {
    throw new Error(
      "Environment variables Phi_Hosted_Url and Phi_Hosted_Key are required."
    );
  }

  try {
    const client = ModelClient(
      Phi_Hosted_Url,
      new AzureKeyCredential(Phi_Hosted_Key)
    );

    const response:
      | GetChatCompletionsDefaultResponse
      | GetChatCompletions200Response = await client
      .path("/chat/completions")
      .post({ body: { messages } });
    if (!isUnexpected(response)) {
      return response.body?.choices[0].message.content;
    } else {
      console.error("Unexpected response: ", response);
      throw new Error("Unexpected response from Azure OpenAI service.");
    }
  } catch (error) {
    console.error("Error occurred while getting chat completions: ", error);
    throw error;
  }
}
