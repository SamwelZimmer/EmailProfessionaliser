"use client";

import React, { useContext } from "react";

import Tiptap from "@/components/writing/Editor";
import { AppContext } from "@/components/context/AppProvider";
import BreakdownSheet from "@/components/modals/BreakdownSheet";
import Markdown from "react-markdown";

export default function Body() {
  const { turns, currentTurn } = useContext(AppContext);

  return (
    <div
      // onClick={() => editor?.commands.focus("end")}
      className="w-full px-4 pb-32 pt-24"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="mx-auto w-full max-w-2xl relative"
      >
        <Tiptap className={!turns[currentTurn].response ? "" : "hidden"} />

        {/* note - the formatting is not quite the same for tiptap and markdown */}
        {turns[currentTurn].response && (
          <Markdown className="font-serif response markdown">
            {turns[currentTurn].response}
          </Markdown>
        )}
      </div>
    </div>
  );
}
