import logger from "@/app/utils/logger";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
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
    .from("preferences")
    .select("skills")
    .eq("user_id", `${user.id}`);

  //   console.log(user);
  //   console.log(data);

  return NextResponse.json(data);
}
