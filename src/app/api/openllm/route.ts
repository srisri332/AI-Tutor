import { NextResponse } from "next/server";
import ollama from "ollama";
import OpenAI from "openai";

const logger = require("@/app/utils/logger");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET() {
  logger.info("Starting prompt");

  // const completion = await openai.chat.completions.create({
  //   messages: [{ role: "system", content: "You are a helpful assistant." }],
  //   model: "gpt-3.5-turbo",
  // });

  // console.log(completion.choices[0]);
  logger.info("Prompt Completed");
  return NextResponse.json({ message: "test" });
}

/***** This is implementation for Ollama ******/

// export async function GET() {
//   console.log("endpoint hit");
//   const response = await ollama.chat({
//     model: "llama2",
//     messages: [
//       {
//         role: "user",
//         content: `generate 5 java questions to practive in this json format
//           {
//             id : 1,
//           question: "sbc"
//         }`,
//       },
//     ],
//     format: "json",
//   });
//   console.log(response.message.content);
//   return NextResponse.json({ message: response.message });
// }
