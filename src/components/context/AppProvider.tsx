"use client";

import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import ServerLoadingPage from "@/components/common/ServerLoadingPage";
import { useMounted } from "@/hooks/use-mounted";
import { Editor, useEditor } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import Heading from "@tiptap/extension-heading";
import StarterKit from "@tiptap/starter-kit";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import { Turn, GenerationStatus } from "@/lib/types";
import { EMPTY_TURN } from "@/lib/constants";

interface AppContextProviderProps {
  children: ReactNode;
}

export interface AppContextType {
  editor: Editor | null;
  turns: Turn[];
  setTurns: (_turns: Turn[]) => void;
  currentTurn: number;
  generationStatus: GenerationStatus;
  setGenerationStatus: (_generationStatus: GenerationStatus) => void;
  isGenerating: boolean;
  setIsGenerating: (_isGenerating: boolean) => void;
}

// Provide a default context object that matches the type AppContextType
const defaultContextValue: AppContextType = {
  editor: null,
  turns: [],
  setTurns: () => {},
  currentTurn: 0,
  generationStatus: null,
  setGenerationStatus: () => {},
  isGenerating: false,
  setIsGenerating: () => {},
};

export const AppContext = createContext<AppContextType>(defaultContextValue);

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [turns, setTurns] = useState<Turn[]>([EMPTY_TURN]);
  const [generationStatus, setGenerationStatus] =
    useState<GenerationStatus>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const mounted = useMounted();

  let currentTurn = 0;

  // initialise the editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write something …",
      }),
      Heading.configure({
        levels: [1, 2, 3],
        HTMLAttributes: {
          class: "font-semibold= text-3xl=",
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "my-custom-class",
        },
        itemTypeName: "listItem",
        keepMarks: true,
        keepAttributes: true,
      }),
      Link.configure({
        // openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
      ListItem,
      Underline,
      Highlight,
    ],
    content: turns[currentTurn].prompt,
    editorProps: {
      attributes: {
        class: "min-h-[calc(100vh-96px-56px-128px)] outline-none",
      },
    },
    onUpdate({ editor }) {
      setTurns((prevTurns: Turn[]) =>
        prevTurns.map((turn, index) =>
          index === currentTurn ? { ...turn, prompt: editor.getHTML() } : turn
        )
      );
    },
  });

  const valueObj: AppContextType = {
    editor,
    turns,
    setTurns,
    currentTurn,
    generationStatus,
    setGenerationStatus,
    isGenerating,
    setIsGenerating,
  };

  if (mounted) {
    return (
      <AppContext.Provider value={valueObj}>{children}</AppContext.Provider>
    );
  }

  return <ServerLoadingPage />;
};

export default AppContextProvider;
