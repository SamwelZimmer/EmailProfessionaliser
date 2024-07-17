"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const IconButton = ({ icon, onClick, className }: IconButtonProps) => {
  const [hovering, setHovering] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={cn(`relative`, className)}
    >
      <div
        className={`${
          hovering ? "opacity-100" : "opacity-0"
        } absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-10 w-10 bg-zinc-200 -z-10 rounded-full transition-all duration-300`}
      />
      {icon}
    </button>
  );
};
