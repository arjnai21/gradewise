import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { NextResponse } from "next/server";

// export const runtime = "edge";

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY || '',
// });

export async function POST(req: Request) {
    try {
        if (!process.env.OPENAI_API_KEY) {
            return new NextResponse("OPENAI_API_KEY is not set", { status: 500 });
        }

        const { messages } = await req.json();

        // Add system prompt as the first message
        const messagesWithSystem = [
            {
                role: "system",
                content: "You only speak Spanish. Use only basic Spanish vocabulary. Treat it like a conversational oral exam. Don't ask where they are from." +
                "if the user is not on the right track, you can gently guide them to the right answer without giving the answer away.the exam will be graded later. If the user gives short answers that are in English, try and get them to use Spanish." +
                "hav a short conversation where they send 3-4 messages. when that is done, wrap up the exam by saying thank you and that the results will be sent to your professor. after that no longer engage with the user."
            },
            
            ...messages
        ];

        const response = streamText({
            model: openai("gpt-4o-mini"),
            messages: messagesWithSystem, // Use the updated messages array
            experimental_providerMetadata: {
                openai: {
                  store: true,
                },
              },
        });

        // console.log(response);

        // const stream = OpenAIStream(response);
        return response.toDataStreamResponse();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("chat api error", error);
        return new NextResponse(error.message || "Internal Error", { status: 500 });
    }
}