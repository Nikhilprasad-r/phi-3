import { getChatCompletions } from "./getChatCompletions";

let language = "javascript";
let topic = "distance and speed";
let question = {
  "question": "You are tasked with creating a JavaScript function that calculates the number of hours and minutes elapsed between two ISO 8601 timestamps. The function should return the difference in hours and minutes in a formatted string. Write a JavaScript function that takes two ISO 8601 timestamps as inputs and returns the difference between these timestamps in hours and minutes. Provide a sample input and output, and also provide three test cases with their respective inputs and expected outputs.",
  "input": "Write a JavaScript function `calculateTimeDifference` that takes two ISO 8601 timestamps as arguments and returns a string in the format 'HH hours MM minutes'.",
  "output": "For example, if the input timestamps are '2023-04-01T12:00:00Z' and '2023-04-01T15:30:00Z', the output should be '3 hours 30 minutes'.",
  "testcases": [
    {
      "input": "'2023-04-02T08:00:00Z', '2023-04-02T11:15:00Z'",
      "output": "3 hours 15 minutes"
    },
    {
      "input": "'2023-04-03T18:45:00Z', '2023-04-03T11:00:00Z'",
      "output": "7 hours 15 minutes"
    },
    {
      "input": "'2023-04-04T00:00:00Z', '2023-04-04T23:59:59Z'",
      "output": "23 hours 59 minutes"
    }
  ],
  "condition": "The function must handle edge cases such as daylight saving time changes and leap seconds.",
  "levels": ["Intermediate"]
};
let solution = 'console.log("json")';

const generateQuestionPrompt = [
  {
    role: "system",
    content: `Your a programming expert  generate a scenario based question that helps us evaluate the candidate`,
  },
  {
    role: "user",
    content: `generate scenario with example based question which is descriptive that should be based on ${language} and the topic is ${topic} give them a sample input should be relative to the question and output and 3 test cases for the question you generate.Dont give any code snippets, ask them to write their own code, give the response in json format {question:string,input:string,output:string,testcases:string[input:string,output:string],condition:string,levels:string[]} `,
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
