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
    content: `Generate a descriptive scenario-based programming question that focuses on the language ${language} and the topic ${topic}. The scenario should be practical and relevant to real-world applications, incorporating complexity in a way that can be handled at different levels of difficulty (beginner, intermediate, advanced). The question should be detailed enough to provide a clear problem statement, including:

Question Statement: Explain the problem, setting, and the expected outcome clearly. Ensure that the problem is related to ${topic} and showcases features specific to ${language}.

Sample Input/Output: Provide a sample input that reflects the type of data the question will be handling. The sample output should correspond to this input, showing the expected result after the problem is solved. Keep the input/output format clear and consistent with the question.

Test Cases: Include three test cases (input/output pairs) that align with the question. The test cases should represent different scenarios:

One simple test case for basic functionality.
One intermediate test case for slightly more complex scenarios.
One edge case or complex test case to challenge advanced problem-solving skills.
Conditions: Specify any important conditions or constraints (e.g., input size, special rules) that need to be considered when solving the problem.

Difficulty Levels: Clearly indicate the range of difficulty levels (beginner, intermediate, advanced) that the problem can cater to, based on the complexity of the solution.

Starter Code: Provide a small code snippet to handle receiving input and setting up the problem, but do not include any solution logic. The starter code should be language-appropriate and focus on the input structure and preparation. Encourage users to implement their own logic based on the scenario.

Make sure the response is in the following JSON format:{
  "question": "string",       // A well-detailed question related to ${language} and ${topic}
  "input": "string",          // A sample input that the problem expects
  "output": "string",         // The expected output for the sample input
  "testcases": [              // 3 test cases with input/output pairs
    {"input": "string", "output": "string"},
    {"input": "string", "output": "string"},
    {"input": "string", "output": "string"}
  ],
  "condition": "string",      // Any important constraints, rules, or conditions for solving the problem
  "levels": ["string"],       // An array of difficulty levels (e.g., "beginner", "intermediate", "advanced")
  "starterCode": "string"     // A code snippet to handle input but without any solution logic
}
 `,
  },
];
const generateSolutionPrompt = [
  {
    role: "system",
    content: `Your a programming expert generate a solution for this question based on given programming language and topic`,
  },
  {
    role: "user",
    content: `Based on the following parameters, generate a code solution in ${language} that solves the problem defined in ${question.question}. The code should be relevant to the topic ${topic}. Make sure the solution adheres to the question's requirements and conditions. Use appropriate features of ${language} and take into consideration the complexity and edge cases described in the test cases. Your solution should be efficient and clear, considering the problem's constraints."

Language: ${language}
Specify the language in which the code should be written (e.g., Python, JavaScript, etc.).

Topic: ${topic}
Indicate the programming concept or topic (e.g., arrays, functions, object-oriented programming) the problem relates to.

Question: ${question.question}
Refer to the detailed problem statement, sample input/output, and constraints provided in ${question.question}.

The generated code should provide a valid solution to the problem, considering the following:

Question Requirements: Ensure the code fully satisfies the question's requirements. Address all conditions and constraints mentioned in the problem.

Edge Cases: Handle any edge cases mentioned in the test cases, ensuring the solution works for all possible inputs, including the complex or unexpected ones.

Efficiency: Aim for an optimized solution, keeping time and space complexity in mind. The solution should be scalable for large inputs where applicable.

Code Clarity: Write clean and well-structured code. Add comments where necessary to explain critical parts of the logic or any specific algorithm used.

Input/Output Handling: Ensure that the code includes proper input/output handling. It should read input as expected and produce the correct output in the format specified by the question.

Output Format:
The generated code should be returned directly, without any extra explanations or commentary.`,
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
${question.question}.

The provided solution is:

 \`\`\`${solution}\`\`\`

Evaluate the solution thoroughly and provide line-by-line feedback. Assess the correctness of the solution, its efficiency, and whether it fully answers the question. The evaluation should focus on:

Syntax: Are there any syntax errors or improvements that can make the code cleaner and more readable? Is the code written in proper structure according to ${language} conventions?

Logic: Does the solution use correct logic to solve the problem? Are there any flaws or errors in the approach that could lead to wrong outputs? If the logic is sound, is it efficiently implemented?

Relevance to the Question: Does the solution fully solve the problem described in ${question.question}? Does it handle all the test cases and conditions mentioned, including edge cases? Is the output correct and aligned with the expectations?

Optimization Techniques: Is the solution optimized in terms of time and space complexity? Are there any areas where performance can be improved, such as reducing unnecessary loops or using more efficient algorithms or data structures?

Improvements: Provide three specific suggestions for how the solution could be improved (if necessary). These could relate to better syntax, optimization techniques, handling of edge cases, or alternative logic.

After the feedback, grade the solution on a scale of 10 points:

Syntax: 2 points (e.g., correct syntax, clean code structure).
Logic: 3 points (e.g., correct, efficient, and bug-free implementation).
Relevance to the Question: 3 points (e.g., solves the problem as expected, handles test cases and edge cases).
Optimization Techniques: 2 points (e.g., efficient use of time/space, optimized algorithm).
Ensure the response is in the following JSON format:{
  "suggestions": [     // 3 specific improvement suggestions for the solution
    "string",
    "string",
    "string"
  ],
  "marks": number,     // Total marks out of 10, based on Syntax, Logic, Relevance, and Optimization
  "feedback": "string" // Detailed feedback on the solution, covering its strengths and weaknesses
}`,
  }
];

console.time("timeTaken");
// let responseMessage = await getChatCompletions(generateQuestionPrompt);
let responseMessage = await getChatCompletions(evaluatorPrompt);
// let responseMessage = await getChatCompletions(generateSolutionPrompt);
console.log(responseMessage);
console.timeEnd("timeTaken");
