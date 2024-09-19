export function extractJsonData(response: string) {
  let extractedData = {};
  const jsonMatch = response.match(/{\s*"data"\s*:\s*\{[^}]*\}\s*}/s);
  
  if (jsonMatch) {
    try {
      // Extract the matched JSON string
      const jsonString = jsonMatch[0];

      // Parse the JSON string
      extractedData = JSON.parse(jsonString).data;
    } catch (parseError) {
      console.error("Error parsing JSON data:", parseError);
    }
  }

  return extractedData;
}