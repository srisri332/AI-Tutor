import { NextResponse } from "next/server";
import { generateStudyPlanForUser } from "@/app/utils/openllm";
import { supabase } from "@/app/utils/supabaseClient";
import logger from "@/app/utils/logger";

// TODO: use this route to process the submitted skills, experience and learning pace.
export function GET(requst: Request, context: any) {
  return NextResponse.json({
    message: `process skills, experience and generate questions`,
  });
}

export async function POST(req: Request) {
  let body = await req.json();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    logger.error("", `User is not available`);
    throw new Error(`user is not available`);
  }

  // TODO: add logic to call database to store user details and preferences
  let { data, error }: any = await supabase
    .from("preferences")
    .insert([
      {
        experience: body.experience,
        skills: body.skills,
        weeks: body.weeks,
        questions: body.questions,
        user_id: "messga84baf86c-0c7b-4888-ae0b-e7d55c631767",
      },
    ])
    .select();

  // TODO: add complete logic to call openai api to generate questions for user
  let userPreferences = data[0];
  let messgae = await generateStudyPlanForUser(
    "SINGLE_TECH",
    userPreferences.experience,
    userPreferences.skills,
    userPreferences.weeks,
    userPreferences.questions
  );

  // TODO: store the genearted questiong in database

  return NextResponse.json({
    message: messgae,
  });
}
