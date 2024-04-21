import logger from "@/app/utils/logger";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type ResponseData = {
  message: string;
};

async function formatData(weeklyQuestions: any, result: any): Promise<any> {
  for (var week in weeklyQuestions) {
    // console.log(week);
    result.push({
      week: week,
      questions: weeklyQuestions[week],
    });
    // console.log(result);
  }
}

// usage of routes to get params from URL
export async function POST(req: Request, context: any) {
  const body = await req.json();

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

  var { data, error } = await supabase
    .from("study_plan")
    .select("questions")
    .eq("user_id", `${user.id}`)
    // .eq("user_id", `84baf86c-0c7b-4888-ae0b-e7d55c631767`) // use for testing
    .eq("technology", `${body.skill}`);

  let weeklyQuestions = data![0].questions;
  // console.log(weeklyQuestions);
  var res: any = [];
  await formatData(weeklyQuestions, res);

  var plan = await supabase
    .from("study_plan")
    .select("id")
    .eq("user_id", `${user.id}`)
    // .eq("user_id", `84baf86c-0c7b-4888-ae0b-e7d55c631767`) // use for testing
    .eq("technology", `${body.skill}`);

  console.log(plan.data![0].id);
  var id = plan.data![0].id;
  return NextResponse.json({
    planID: id,
    questions: res,
  });
}
