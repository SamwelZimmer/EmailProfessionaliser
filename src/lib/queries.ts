"use server";

import { streamText, generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { createStreamableValue } from "ai/rsc";
import { z } from "zod";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function streamEmailResponse(input: string, improvements: string) {
  const stream = createStreamableValue("");

  (async () => {
    const { textStream } = await streamText({
      model: openai("gpt-3.5-turbo"),
      system: `You are going to passed an email and some improvements for this email to sound more professional. Your task is to make these improvements to the email. Only reply with the improved email and nothing else.`,
      prompt: `Email: ${input}\nImprovements: ${improvements}:`,
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  })();

  return stream.value;
}

export async function getImprovements(email: string) {
  "use server";

  const { object: improvements } = await generateObject({
    model: openai("gpt-4-turbo"),
    system:
      "You look at an email give a list of actions to improve its flow and professionalism. You rate this email's performance with a percentage score.",
    prompt: email,
    schema: z.object({
      improvements: z.array(
        z.object({
          actions: z
            .string()
            .describe(
              "List of actions to improve email flow and professionalism"
            ),
          score: z
            .number()
            .describe("Percentage representing email's performance"),
        })
      ),
    }),
  });

  return improvements;
}

export async function getRetro(email: string) {
  "use server";

  const { object: retros } = await generateObject({
    model: openai("gpt-4-turbo"),
    system:
      "You are given an email. You rate this email's performance with a percentage score.",
    prompt: email,
    schema: z.object({
      retros: z.array(
        z.object({
          score: z
            .number()
            .describe("Percentage representing email's performance"),
        })
      ),
    }),
  });

  return retros;
}
