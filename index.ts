import { evaluateSolution } from "./evaluateSolution";
import { generateQuestion } from "./generateQuestion";
import { generateSolution } from "./generateSolution";
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

const generatedQuestion = await generateQuestion(language, topic);
console.log(generatedQuestion);

// Generate a solution based on the question
// const generatedSolution = await generateSolution(language, topic, question.question);
// console.log(generatedSolution);

// Evaluate the solution provided
// const evaluation = await evaluateSolution(language, topic, question.question, solution);
// console.log(evaluation);

console.time("timeTaken");
console.timeEnd("timeTaken");
