import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { memoryTools } from "@/lib/tools";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is not set");
      return new Response(
        JSON.stringify({ error: "OpenAI API key not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("Starting chat with", messages.length, "messages");

    const result = streamText({
      model: openai("gpt-4o"),
      messages,
      tools: memoryTools,
      system: `You are an AI assistant with memory capabilities. You MUST use memory tools.

CRITICAL RULES:
1. ALWAYS use createMemory when user shares: name, job, interests, preferences, or personal info
2. ALWAYS use searchMemory before answering questions about the user
3. Tell user what you're remembering: "I'll remember that..." or "Let me save that..."

Examples:
- User: "My name is John" → MUST call createMemory("name is John")
- User: "I work at Google" → MUST call createMemory("works at Google")
- User: "What's my name?" → MUST call searchMemory("name")

Be conversational but USE THE TOOLS.`,
      maxSteps: 5,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    console.error("Error details:", error instanceof Error ? error.message : String(error));
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "An error occurred",
        details: error instanceof Error ? error.stack : String(error)
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
