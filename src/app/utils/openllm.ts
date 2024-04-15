import OpenAI from "openai";

import logger from "@/app/utils/logger";
import { getStudyPlan } from "@/app/utils/prompts";

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
): Promise<string> {
  const studyPlanPrompt = getStudyPlan(
    id,
    experience,
    technologies,
    weeks,
    questions
  );

  logger.info(now, `PROMPTING: ${studyPlanPrompt}`);

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: studyPlanPrompt }],
    model: "gpt-3.5-turbo",
  });
  console.log(completion.choices[0]);

  logger.info(now, "PROMPT COMPLETED");
  return "success";
}
