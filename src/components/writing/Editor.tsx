"use client";

import { useContext } from "react";
import { EditorContent } from "@tiptap/react";
import { AppContext } from "@/components/context/AppProvider";

import HoverMenu from "@/components/writing/HoverMenu";

const Tiptap = ({ className }: { className?: string }) => {
  const { editor } = useContext(AppContext);

  return (
    <>
      <HoverMenu />
      <EditorContent className={className} editor={editor} />
    </>
  );
};

export default Tiptap;
