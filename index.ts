import { getChatCompletions } from "./getChatCompletions";

let language = "javascript";
let topic = "distance and speed";
let question = {
  question:
    "Imagine you have a list of objects containing the speed and time taken by different vehicles to travel a certain distance. The goal is to write a JavaScript function that calculates the distance covered by each vehicle. The speed is given in kilometers per hour (km/h) and the time is given in hours. The function should return an array of distances for each vehicle.",
  input:
    "const vehicles = [{name: 'Car', speed: 60, time: 2}, {name: 'Bike', speed: 15, time: 1.5}, {name: 'Train', speed: 90, time: 3}, {name: 'Airplane', speed: 800, time: 0.5}],",
  output:
    "The distances covered by the Car, Bike, Train, and Airplane would be 120 km, 22.5 km, 270 km, and 400 km respectively.",
  testcases: [
    {
      input:
        "const vehicles = [{name: 'Car', speed: 60, time: 2}, {name: 'Bike', speed: 15, time: 1.5}, {name: 'Train', speed: 90, time: 3}, {name: 'Airplane', speed: 800, time: 0.5}],",
      output:
        "The distances covered by the Car, Bike, Train, and Airplane would be 120 km, 22.5 km, 270 km, and 400 km respectively.",
    },
    {
      input:
        "const vehicles = [{name: 'Car', speed: 0, time: 2}, {name: 'Bike', speed: 0, time: 1}, {name: 'Train', speed: 0, time: 0}, {name: 'Airplane', speed: 0, time: 0}],",
      output:
        "All vehicles did not move, so the distances covered by the Car, Bike, Train, and Airplane would be 0 km.",
    },
    {
      input:
        "const vehicles = [{name: 'Car', speed: 100, time: 0}, {name: 'Bike', speed: 20, time: 0}, {name: 'Train', speed: 100, time: 0}, {name: 'Airplane', speed: 1000, time: 0}],",
      output:
        "All vehicles did not move, so the distances covered by the Car, Bike, Train, and Airplane would be 0 km.",
    },
  ],
  condition:
    "The function should correctly calculate the distance for each vehicle using the formula: distance = speed * time. It should handle cases where speed or time is zero.",
  levels: ["Beginner", "Intermediate"],
};
const solution = `function calculateDistances(vehicles) {
  // Array to hold the distances
  let distances = [];

  // Loop through each vehicle object in the array
  for (let i = 0; i < vehicles.length; i++) {
    // Calculate the distance using the formula distance = speed * time
    let distance = vehicles[i].speed * vehicles[i].time;

    // Add the distance to the distances array
    distances.push(distance);
  }

  // Return the distances array
  return distances;
}

// Example usage:
let vehicles = [
  { speed: 60, time: 2 },
  { speed: 80, time: 1.5 },
  { speed: 100, time: 1 }
];

let distances = calculateDistances(vehicles);
console.log(distances); // [120, 120, 100]
`;


const generateQuestionPrompt = [
  {
    role: "system",
    content: `Your a programming expert  generate a scenario based question that helps us evaluate the candidate`,
  },
  {
    role: "user",
    content: `generate scenario with example based question which is descriptive that should be based on ${language} and the topic is ${topic} give them a sample input should be relative to the question and output and 3 test cases for the question you generate.Dont give any code snippets with logic but give snippet to basically receive the input according to the question, ask them to write their own code, give the response in json format {question:string,input:string,output:string,testcases:string[input:string,output:string],condition:string,levels:string[],starterCode:string} `,
  },
];
const generateSolutionPrompt = [
  {
    role: "system",
    content: `Your a programming expert generate a solution for this question based on given programming language and topic`,
  },
  {
    role: "user",
    content: `generate code based on ${language} and the topic is ${topic} and question is ${question.question}`,
  },
];
const evaluatorPrompt = [
  {
    role: "system",
    content:
      "You are a good computer programming mentor. Check the program given by the student and provide feedback to the student.",
  },
  {
    role: "user",
    content: `The question given to the student to solve in ${language} programming language on ${topic} is: 
    "${question.question}" with the following solution: 
    \`\`\`${solution}\`\`\`
    Strictly evaluate how good the solution is. Provide line-by-line feedback with three possible improvements (if any).
    Grade the solution on a scale of 10 points: 
    - Syntax (2 points), 
    - Logic (3 points),
    - Relevance to the question (3 points), 
    - Optimization techniques (2 points). 
    Respond in JSON format with the following structure strictly dont give code snippet: 
    {
      suggestions: string[], 
      marks: number, 
      feedback: string
    }`,
  },
];

console.time("timeTaken");
let responseMessage = await getChatCompletions(generateQuestionPrompt);
// let responseMessage = await getChatCompletions(evaluatorPrompt);
// let responseMessage = await getChatCompletions(generateSolutionPrompt);
console.log(responseMessage);
console.timeEnd("timeTaken");
