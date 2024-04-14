import { NextResponse } from "next/server";

type ResponseData = {
  message: string;
};

// usage of routes to get params from URL
export function GET(requst: Request, context: any) {
  const id = context.params.llmID;
  console.log(context.params.llmID);
  return NextResponse.json({
    message: `use this route ${id}`,
  });
}
