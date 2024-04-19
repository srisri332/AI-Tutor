import { NextResponse } from "next/server";
import { generateStudyPlanForUser } from "@/app/utils/openllm";
import { supabase } from "@/app/utils/supabaseClient";
import logger from "@/app/utils/logger";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export function GET(requst: Request, context: any) {
  return NextResponse.json({
    message: `process skills, experience and generate questions`,
  });
}

// TODO: use this route to process the submitted skills, experience and learning pace.
export async function POST(req: Request) {
  let body = await req.json();

  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });

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
        user_id: user.id,
        // user_id: "84baf86c-0c7b-4888-ae0b-e7d55c631767", // use this for testing
      },
    ])
    .select();

  if (error != null) {
    logger.error("", error);
    throw new Error(error.toString());
  }

  let userPreferences = data[0];

  // skills must be comma separated values
  // TODO: add validation in frontend for this
  let skills = userPreferences.skills.replace(/\s+/g, "").split(",");
  let studyPlans: any[] = [];

  Promise.all(
    skills.map(async (skill: string) => {
      // TODO: add complete logic to call openai api to generate questions for user
      let generatedSinglePlan = await generateStudyPlanForUser(
        "SINGLE_TECH",
        userPreferences.experience,
        skill,
        userPreferences.weeks,
        userPreferences.questions
      );
      studyPlans.push({ skill: skill, questions: generatedSinglePlan });
    })
  ).then(() => {
    console.log(studyPlans);
    Promise.all(
      studyPlans.map(async (studyPlan) => {
        // TODO: store the genearted questiong in database
        let { data, error }: any = await supabase
          .from("study_plan")
          .insert([
            {
              technology: studyPlan.skill,
              questions: studyPlan.questions,
              user_id: user.id,
              // user_id: "84baf86c-0c7b-4888-ae0b-e7d55c631767", // use this for testing
            },
          ])
          .select();

        if (error != null) {
          logger.error("", error);
          throw new Error(error.toString());
        }
      })
    );
  });

  return NextResponse.json({
    message: "success",
  });
}
