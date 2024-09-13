import { getChatCompletions } from "./getChatCompletions";

let language = "javascript";
let topic = "calculate time and hours based on given iso";
let question = {
  question:
    "Create a JavaScript function named 'fetchData' that takes a URL as a parameter and returns a promise that resolves with the data fetched from the given URL as a JSON object. Use async/await syntax for the function.",

  input: "url = 'https://jsonplaceholder.typicode.com/todos'",

  output:
    "Promise resolved with JSON object containing the data fetched from the URL",

  testcases: [
    {
      input: "url = 'https://jsonplaceholder.typicode.com/todos'",

      output: "Promise resolved with JSON object containing the todos data",
    },

    {
      input: "url = 'https://jsonplaceholder.typicode.com/posts'",

      output: "Promise resolved with JSON object containing the posts data",
    },

    {
      input: "url = 'https://jsonplaceholder.typicode.com/comments'",

      output: "Promise resolved with JSON object containing the comments data",
    },
  ],

  condition:
    "The function should handle errors by rejecting the promise if the fetch operation fails",

  levels: ["beginner"],
};
let solution = 'console.log("json")';

const generateQuestionPrompt = [
  {
    role: "system",
    content: `Your a programming expert  generate a scenario based question that helps us evaluate the candidate`,
  },
  {
    role: "user",
    content: `generate scenario based question that should be based on ${language} and the topic is ${topic} give them a sample input and output and 3 test cases for the question you generate.Dont give any code snippets, ask them to write their own code, give the response in json format {question:string,input:string,output:string,testcases:string[input:string,output:string],condition:string,levels:string[]} `,
  },
];

const evaluatorPrompt = [
  {
    role: "system",
    content:
      "You are a good computer programing mentor. Who can asses the students with their pr. Check the program given by the student and provide feedback to the student.",
  },
  {
    role: "user",
    content: `${question} was the question given to the student to solve in ${language} programming language on ${topic} and this ${solution} was the solution given by the student based on the question strictly evaluate how good the solution is give the feedback should be line by line explanation of the solution with three improvements that can be done if not any, give score out of 10 points based on syntax-2 point,logic-3 point,logic releated to question-3 points,utilizing optimization techniques -2 points, respond in json format {
     suggestions:string[],marks:number,feedback:string} `,
  },
];
console.time("timeTaken");
let responseMessage = await getChatCompletions(generateQuestionPrompt);
// let responseMessage = await getChatCompletions(evaluatorPrompt);
console.log(responseMessage);
console.timeEnd("timeTaken");
