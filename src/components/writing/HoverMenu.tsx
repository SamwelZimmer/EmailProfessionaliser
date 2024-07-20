"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import { BubbleMenu } from "@tiptap/react";
import { AppContext } from "@/components/context/AppProvider";
import { IconButton } from "@/components/common/IconButton";
import { Heading1 } from "@/assets/icons/Heading1";
import { Heading2 } from "@/assets/icons/Heading2";
import { Heading3 } from "@/assets/icons/Heading3";
import { Bold } from "@/assets/icons/Bold";
import { Italic } from "@/assets/icons/Italic";
import { Strikethrough } from "@/assets/icons/Strikethrough";
import { Underline } from "@/assets/icons/Underline";
import { PaintBrush } from "@/assets/icons/PaintBrush";
import { Code } from "@/assets/icons/Code";
import { ListBullet } from "@/assets/icons/ListBullet";
import { ListOrdered } from "@/assets/icons/ListOrdered";
import { Link } from "@/assets/icons/Link";
import { AccordionHeader, AccordionPanel } from "@/components/common/Accordion";
import { useMediaQuery } from "@/hooks/use-media-query";

// TODO: Linking logic

export default function HoverMenu() {
  const { editor } = useContext(AppContext);
  const [showUrlForm, setShowUrlForm] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isBubbleMenuOpen, setIsBubbleMenuOpen] = useState(false);

  const shouldShowBubbleMenu = useCallback(({ editor }: { editor: any }) => {
    // using the default logic for showing the bubble menu
    const shouldShow = editor.view.state.selection.empty === false;

    // able to track if bubble menu is open
    setIsBubbleMenuOpen(shouldShow);

    return shouldShow;
  }, []);

  // ensures we hide link form for new bubble
  useEffect(() => {
    if (!isBubbleMenuOpen) {
      setShowUrlForm(false);
    }
  }, [isBubbleMenuOpen]);

  if (!editor) return;

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100 }}
      shouldShow={shouldShowBubbleMenu}
      className="min-w-max"
    >
      <AccordionHeader className="min-h-12 flex justify-center flex-col border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 rounded-[24px] border shadow-lg">
        <div className="overflow-hidden">
          <AccordionPanel isOpen={showUrlForm}>
            <UrlForm />
          </AccordionPanel>
        </div>

        <div
          className={`flex items-center gap-x-2 px-3 inset-12 ${
            isDesktop ? "h-12" : "flex-wrap max-w-[calc(100vw-24px)]"
          }`}
        >
          <IconButton
            className="h-12"
            icon={
              <Heading1
                className={`h-5 ${
                  editor.isActive("heading", { level: 1 }) && "text-zinc-400"
                }`}
              />
            }
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          />

          <IconButton
            icon={
              <Heading2
                className={`h-5 ${
                  editor.isActive("heading", { level: 2 }) && "text-zinc-400"
                }`}
              />
            }
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          />

          <IconButton
            icon={
              <Heading3
                className={`h-5 ${
                  editor.isActive("heading", { level: 3 }) && "text-zinc-400"
                }`}
              />
            }
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
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
                className={`h-5 ${
                  editor.isActive("italic") && "text-zinc-400"
                }`}
              />
            }
            onClick={() => editor.chain().focus().toggleItalic().run()}
          />

          <IconButton
            icon={
              <Strikethrough
                className={`h-5 ${
                  editor.isActive("strike") && "text-zinc-400"
                }`}
              />
            }
            onClick={() => editor.chain().focus().toggleStrike().run()}
          />

          <IconButton
            icon={
              <Underline
                className={`h-5 ${
                  editor.isActive("underline") && "text-zinc-400"
                }`}
              />
            }
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          />

          <IconButton
            icon={
              <PaintBrush
                className={`h-5 ${
                  editor.isActive("highlight") && "text-zinc-400"
                }`}
              />
            }
            onClick={() => editor.chain().focus().toggleHighlight().run()}
          />

          <div className="h-4 w-px bg-zinc-200 mx-1" />

          <IconButton
            icon={
              <Code
                className={`h-5 ${editor.isActive("code") && "text-zinc-400"}`}
              />
            }
            onClick={() => editor.chain().focus().toggleCode().run()}
          />

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

          <div className="h-4 w-px bg-zinc-200 mx-1 text-indigo-500" />

          <IconButton
            className="h-12"
            icon={
              <Link
                className={`h-5 ${editor.isActive("link") && "text-zinc-400"}`}
              />
            }
            onClick={() => setShowUrlForm(!showUrlForm)}
          />
        </div>
      </AccordionHeader>
    </BubbleMenu>
  );
}

const UrlForm = ({}) => {
  const { editor } = useContext(AppContext);
  const [url, setUrl] = useState("");

  const setLink = useCallback(() => {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href;
    setUrl(previousUrl);

    // const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();

    setUrl("");
  }, [editor]);

  return (
    <div className="pt-2 px-2">
      <div className="flex items-center w-full h-9 gap-2">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Doesn't work yet..."
          className="flex h-9 w-full rounded-tl-[14px] rounded-md border border-input focus:border-zinc-600 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground placeholder:text-xs focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
        <button
          onClick={setLink}
          className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 dark rounded-tr-[14px] rounded-md h-full px-4 text-white text-xs"
        >
          Add
        </button>
      </div>
    </div>
  );
};
