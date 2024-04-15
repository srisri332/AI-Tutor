import logger from "@/app/utils/logger";
const prompts = [
  {
    // To generate questions for any single technology
    // can be used for DSA and Algos too
    id: "SINGLE_TECH",
    value: `generate study plan for a person with YEARS_OF_EXPERIENCE years of experience to practice TECHNOLOGY questions in this Json format. for WEEKS_NUMBER weeks and each week containing QUESTIONS_NUMBER questions. 
           {
                "week1": [
                        {
                        "id": 1,
                        "question": "question1"
                        }
                ],
                "week2": [
                        {
                        "id": 2,
                        "question": "question2"
                        }
                ]
        }
    `,
  },
  {
    // To check the correctness of the answer
    id: "CHECK_ANSWER",
    value: `on a scale of 1 to 10, how correct is this answer for the question "PROMPT_QUESTION". Give your answer in the following json format, by putting your explaining against the value in json
        {
                score: 1,
                explanation: "abc"
        }

        PROMPT_ANSWER
    `,
  },
  {
    // To generate questions for multiple technologies
    id: "MULTIPLE_TECH",
    value: `Generate a study plan for a person with YEARS_OF_EXPERIENCE years of experience to practice TECHNOLOGY questions in this Json format. For WEEKS_NUMBER weeks and each week containing minimum QUESTIONS_NUMBER questions on each individual topic
           {
                "week1": [
                        {
                        "id": 1,
                        "question": "question1"
                        }
                ],
                "week2": [
                        {
                        "id": 2,
                        "question": "question2"
                        }
                ]
        }
    `,
  },
];

export function getStudyPlan(
  id: string = "",
  experience: Number = 0,
  technologies: string = "",
  weeks: Number = 1,
  questions: Number = 1
): string {
  const matchingPrompt = prompts.find((prompt) => prompt.id === id);
  if (!matchingPrompt) {
    logger.error("", `Prompt with ID '${id}' not found.`);
    throw new Error(`Prompt with ID '${id}' not found.`);
  }

  const filledPrompt = matchingPrompt?.value
    .replace("YEARS_OF_EXPERIENCE", experience.toString())
    .replace("TECHNOLOGY", technologies.toString())
    .replace("WEEKS_NUMBER", weeks.toString())
    .replace("QUESTIONS_NUMBER", questions.toString());

  return filledPrompt != undefined
    ? filledPrompt
    : "Error occured while generating prompt";
}

export function checkAnswer(
  id: string,
  question: string,
  answer: string
): string {
  const matchingPrompt = prompts.find((prompt) => prompt.id === id);
  if (!matchingPrompt) {
    logger.error("", `Prompt with ID '${id}' not found.`);
    throw new Error(`Prompt with ID '${id}' not found.`);
  }

  const filledPrompt = matchingPrompt?.value
    .replace("PROMPT_QUESTION", question)
    .replace("PROMPT_ANSWER", answer);
  return filledPrompt;
}
