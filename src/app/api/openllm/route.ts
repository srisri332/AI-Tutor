import { NextResponse } from "next/server";

type ResponseData = {
  message: string;
};

export function GET() {
  return NextResponse.json({ message: "use this route " });
}
