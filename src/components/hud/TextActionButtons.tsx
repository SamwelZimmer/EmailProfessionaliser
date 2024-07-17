"use client";

import React, { useContext } from "react";

import { Heading1 } from "@/assets/icons/Heading1";
import { Heading2 } from "@/assets/icons/Heading2";
import { AppContext } from "@/components/context/AppProvider";
import { Bold } from "@/assets/icons/Bold";
import { Italic } from "@/assets/icons/Italic";
import { ListBullet } from "@/assets/icons/ListBullet";
import { ListOrdered } from "@/assets/icons/ListOrdered";
import { IconButton } from "@/components/common/IconButton";

export function TextActionButtons() {
  const { editor } = useContext(AppContext);

  if (!editor) return;

  return (
    <div className="rounded-full h-10  flex items-center px-2 gap-2">
      <IconButton
        icon={
          <Heading1
            className={`h-5 ${
              editor.isActive("heading", { level: 1 }) && "text-zinc-400"
            }`}
          />
        }
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      />
      <IconButton
        icon={
          <Heading2
            className={`h-5 ${
              editor.isActive("heading", { level: 2 }) && "text-zinc-400"
            }`}
          />
        }
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      />

      <div className="h-4 w-px bg-zinc-200 mx-1" />

      <IconButton
        icon={
          <Bold
            className={`h-5 ${editor.isActive("bold") && "text-zinc-400"}`}
          />
        }
        onClick={() => editor.chain().focus().toggleBold().run()}
      />

      <IconButton
        icon={
          <Italic
            className={`h-5 ${editor.isActive("italic") && "text-zinc-400"}`}
          />
        }
        onClick={() => editor.chain().focus().toggleItalic().run()}
      />

      <div className="h-4 w-px bg-zinc-200 mx-1" />

      <IconButton
        icon={
          <ListBullet
            className={`h-5 ${
              editor.isActive("bulletList") && "text-zinc-400"
            }`}
          />
        }
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      />
      <IconButton
        icon={
          <ListOrdered
            className={`h-5 ${
              editor.isActive("orderedList") && "text-zinc-400"
            }`}
          />
        }
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      />
    </div>
  );
}
