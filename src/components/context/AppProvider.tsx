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

interface AppContextProviderProps {
  children: ReactNode;
}

export interface AppContextType {
  editor: Editor | null;
  textValue: string;
  setTextValue: (_textValue: string) => void;
}

// Provide a default context object that matches the type AppContextType
const defaultContextValue: AppContextType = {
  editor: null,
  textValue: "",
  setTextValue: () => {},
};

export const AppContext = createContext<AppContextType>(defaultContextValue);

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [textValue, setTextValue] = useState("");
  const mounted = useMounted();

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
    content: textValue,
    editorProps: {
      attributes: {
        class: "min-h-[calc(100vh-96px-56px-128px)] outline-none",
      },
    },
    onUpdate({ editor }) {
      setTextValue(editor.getHTML());
    },
  });

  const valueObj: AppContextType = {
    editor,
    textValue,
    setTextValue,
  };

  if (mounted) {
    return (
      <AppContext.Provider value={valueObj}>{children}</AppContext.Provider>
    );
  }

  return <ServerLoadingPage />;
};

export default AppContextProvider;
