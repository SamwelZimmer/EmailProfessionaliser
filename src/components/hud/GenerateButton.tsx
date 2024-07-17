"use client";

import React, { useState } from "react";

import { Tie } from "@/assets/icons/Tie";

export default function GenerateButton() {
  const [hovering, setHovering] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="flex items-center gap-2 bg-zinc-800 dark rounded-full h-10 px-6"
    >
      <span
        className={`font-medium ${hovering ? "text-zinc-200" : "text-white"}`}
      >
        Professionalise
      </span>
      <Tie className={hovering ? "text-zinc-200" : "text-white"} />
    </button>
  );
}
