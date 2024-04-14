import { NextResponse } from "next/server";

type ResponseData = {
  message: string;
};

// TODO: use this route to implement auth
export function GET() {
  return NextResponse.json({ message: "use this route auth " });
}
