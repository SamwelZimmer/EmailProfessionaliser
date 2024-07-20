"use client";

import { useContext, useState } from "react";

import { MailAdd } from "@/assets/icons/MailAdd";
import { AppContext } from "../context/AppProvider";
import { EMPTY_TURN } from "@/lib/constants";

export default function Topbar() {
  return (
    <div className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className=" w-full mx-auto px-4 flex h-14 max-w-screen-2xl items-center text-zinc-800 justify-between">
        <NewButton />
      </div>
    </div>
  );
}

const NewButton = () => {
  const [hovering, setHovering] = useState(false);

  const { setTurns, editor } = useContext(AppContext);

  const handleClick = () => {
    setTurns([EMPTY_TURN]);

    if (!editor) return;
    editor.commands.clearContent();
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="flex items-center gap-2"
    >
      <div
        className={`relative font-medium ${
          hovering ? "text-zinc-600" : "text-zinc-800"
        }`}
      >
        <span>New</span>
        <div
          className={`absolute bottom-0 left-0 transition-all duration-300 ${
            hovering ? "w-full bg-zinc-600" : "w-0 bg-zinc-800"
          } h-0.5`}
        />
      </div>
      <MailAdd className={hovering ? "text-zinc-600" : "text-zinc-800"} />
    </button>
  );
};
