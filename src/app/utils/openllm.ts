import OpenAI from "openai";

import logger from "@/app/utils/logger";
import { getStudyPlan } from "@/app/utils/prompts";
import { json } from "stream/consumers";

var now = new Date().toLocaleTimeString();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateStudyPlanForUser(
  id: string,
  experience: Number,
  technologies: string,
  weeks: Number,
  questions: Number
): Promise<Object> {
  const studyPlanPromptObj = getStudyPlan(
    id,
    experience,
    technologies,
    weeks,
    questions
  );

  logger.info(now, `PROMPTING: ${studyPlanPromptObj.value}`);
  // console.log(studyPlanPromptObj.jsonExample);

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Provide output in valid JSON. The data schema should be like this: " +
          JSON.stringify(studyPlanPromptObj.jsonExample),
      },
      { role: "user", content: studyPlanPromptObj.value },
    ],
    model: "gpt-3.5-turbo-0125",
    response_format: { type: "json_object" },
    temperature: 0.2,
  });
  // console.log(completion.choices[0]);

  logger.info(now, "PROMPT COMPLETED");
  return JSON.parse(completion.choices[0].message.content!);
}
