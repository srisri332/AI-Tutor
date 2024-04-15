import { NextResponse } from "next/server";
import { generateStudyPlanForUser } from "@/app/utils/openllm";

type ResponseData = {
  message: string;
};

// TODO: use this route to process the submitted skills, experience and learning pace.
export function GET(requst: Request, context: any) {
  const id = context.params.llmID;
  console.log(context.params.llmID);
  return NextResponse.json({
    message: `process skills, experience and generate questions`,
  });
}

export async function POST(req: Request) {
  // TODO: add logic to call database to store user details and preferences

  // TODO: add complete logic to call openai api to generate questions for user
  let body = await req.json();
  let messgae = await generateStudyPlanForUser(
    body.promptID,
    body.experience,
    body.technologies,
    body.weeks,
    body.questions
  );

  // TODO: store the genearted questiong in database

  return NextResponse.json({
    message: messgae,
  });
}
