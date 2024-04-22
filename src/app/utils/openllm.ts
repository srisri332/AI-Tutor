import OpenAI from "openai";

import logger from "@/app/utils/logger";
import { checkAnswer, getStudyPlan } from "@/app/utils/prompts";

var now = new Date().toLocaleTimeString();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function callGptApi(prompt: any) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Provide output in valid JSON. The id field each question should be unique and sequential. The data schema should be like this: " +
          JSON.stringify(prompt.jsonExample),
      },
      { role: "user", content: prompt.value },
    ],
    model: "gpt-3.5-turbo-0125",
    response_format: { type: "json_object" },
    temperature: 0.2,
  });
  return completion;
}

export async function generateStudyPlanForUser(
  id: string,
  experience: Number,
  technologies: string,
  weeks: Number,
  questions: Number
): Promise<Object> {
  const studyPlanPromptObj = getStudyPlan(
    "SINGLE_TECH",
    experience,
    technologies,
    weeks,
    questions
  );

  logger.info(now, `PROMPTING: ${studyPlanPromptObj.value}`);
  const completion = await callGptApi(studyPlanPromptObj);
  logger.info(now, "PROMPT COMPLETED");

  return JSON.parse(completion.choices[0].message.content!);
}

export async function processAnswer(question: string, answer: string) {
  const checkAnswePromptObj = checkAnswer("CHECK_ANSWER", question, answer);

  logger.info(now, `PROMPTING: ${checkAnswePromptObj.value}`);
  const completion: any = await callGptApi(checkAnswePromptObj);
  logger.info(now, "PROMPT COMPLETED");
  // console.log(completion[0]);

  return JSON.parse(completion.choices[0].message.content!);
}
