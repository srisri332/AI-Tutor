import { supabase } from "@/app/utils/supabaseClient";
import logger from "@/app/utils/logger";
import { processAnswer } from "@/app/utils/openllm";
import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

async function updateCompletedStatus(
  study_plan: any,
  body: any,
  status: boolean
) {
  try {
    for (let week in study_plan) {
      if (study_plan.hasOwnProperty(week)) {
        study_plan[week].forEach((question: any) => {
          if (question.id == body.question_id) {
            question.completed = status;
          }
        });
      }
    }
    return "success";
  } catch {
    return "error";
  }
}

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

  let answerRes = await processAnswer(body.question, body.answer);
  console.log(answerRes);

  if (answerRes.score >= 7) {
    var { data, error } = await supabase
      .from("study_plan")
      .select("questions")
      .eq("id", `${body.plan_id}`);

    // console.log(data![0].questions);
    var study_plan = data![0].questions;

    let updateStatus = await updateCompletedStatus(study_plan, body, true);
    if (updateStatus === "error") {
      throw new Error("cannot update the question status");
    }

    const res = await supabase
      .from("study_plan")
      .update({ questions: study_plan })
      .eq("id", `${body.plan_id}`)
      .select();
  }

  return NextResponse.json({
    message: "success",
  });
}
