"use client";

import React, { useContext, useState } from "react";
import { toast } from "sonner";
import { readStreamableValue } from "ai/rsc";

import { Tie } from "@/assets/icons/Tie";
import { AppContext } from "@/components/context/AppProvider";
import { streamEmailResponse, getImprovements, getRetro } from "@/lib/queries";
import { Turn } from "@/lib/types";

export default function GenerateButton({ disabled }: { disabled: boolean }) {
  const { turns, currentTurn, setTurns, setGenerationStatus, setIsGenerating } =
    useContext(AppContext);

  const [hovering, setHovering] = useState(false);

  const handleClick = async () => {
    setIsGenerating(true);

    try {
      setGenerationStatus("improvements");

      const improvement = await getImprovements(turns[currentTurn].prompt);

      setTurns((prevTurns: Turn[]): Turn[] =>
        prevTurns.map((turn, index) =>
          index === currentTurn
            ? {
                ...turn,
                initialScore: improvement.improvements[0].score,
                actions: improvement.improvements[0].actions,
              }
            : turn
        )
      );

      // non-noticeable state
      setGenerationStatus("thinking");

      const output = await streamEmailResponse(
        turns[currentTurn].prompt,
        improvement.improvements[0].actions
      );

      // when streaming the response
      setGenerationStatus("writing");

      for await (const delta of readStreamableValue(output)) {
        setTurns((prevTurns: Turn[]) =>
          prevTurns.map((turn, index) =>
            index === currentTurn
              ? {
                  ...turn,
                  response: `${prevTurns[currentTurn].response || ""}${delta}`,
                }
              : turn
          )
        );
      }

      // analysing the response
      setGenerationStatus("retro");

      const retro = await getRetro(turns[currentTurn].response ?? "");

      for await (const delta of readStreamableValue(output)) {
        setTurns((prevTurns: Turn[]) =>
          prevTurns.map((turn, index) =>
            index === currentTurn
              ? {
                  ...turn,
                  improvedScore: retro.retros[0].score,
                }
              : turn
          )
        );
      }

      setGenerationStatus("done");

      // leave the loading bar there for a little bit
      setTimeout(() => {
        setGenerationStatus(null);
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsGenerating(true);
    }
  };

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="dark flex h-10 items-center gap-2 rounded-full bg-zinc-800 px-6 disabled:opacity-50"
    >
      <span
        className={`font-serif font-medium ${
          hovering ? "text-zinc-200" : "text-white"
        }`}
      >
        Professionalise
      </span>
      <Tie className={hovering ? "text-zinc-200" : "text-white"} />
    </button>
  );
}
