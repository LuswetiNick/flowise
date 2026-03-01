import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import { serverEnv } from "@/config/env/server";
import { inngest } from "./client";

const google = createGoogleGenerativeAI({
  apiKey: serverEnv.GOOGLE_GENERATIVE_AI_API_KEY,
});

export const testAI = inngest.createFunction(
  { id: "test-ai" },
  { event: "test/ai" },
  async ({ event, step }) => {
    await step.sleep("testing", 2000);
    const { steps } = await step.ai.wrap("Test AI", generateText, {
      system: "You are a helpful assistant.",
      prompt: "What is the meaning of life, the universe, and everything?",
      model: google("gemini-2.5-flash"),
    });
    return steps;
  }
);
