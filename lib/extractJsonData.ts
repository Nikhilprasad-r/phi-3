export function extractJsonData(response: string) {
  let extractedData = {};
  
  // Updated regex to capture nested JSON structure correctly
  const jsonMatch = response.match(/{\s*"data"\s*:\s*\{[\s\S]*\}\s*\}/);

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
