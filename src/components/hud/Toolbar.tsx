"use client";

import React, { useContext } from "react";

import GenerateButton from "@/components/hud/GenerateButton";
import { TextActionButtons } from "@/components/hud/TextActionButtons";
import { AppContext } from "@/components/context/AppProvider";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { Tick } from "@/assets/icons/Tick";
import { Clipboard } from "@/assets/icons/Clipboard";
import { useMediaQuery } from "@/hooks/use-media-query";
import { IconButton } from "@/components/common/IconButton";
import { GENERATION_STATUS_MAP } from "@/lib/constants";
import LoadingBar from "@/components/common/LoadingBar";
import BreakdownSheet from "@/components/modals/BreakdownSheet";

export default function Toolbar() {
  const { editor, generationStatus, currentTurn, turns } =
    useContext(AppContext);
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleCopyPrompt = () => {
    if (!editor) return;

    // get HTML content
    const htmlContent = editor.getHTML();

    // get plain text content
    const plainTextContent = editor.getText();

    // create a temporary element to hold the HTML content
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlContent;

    // use the existing hook to copy the plain text
    copyToClipboard(plainTextContent);

    // manually set the HTML content to clipboard
    if (navigator.clipboard && navigator.clipboard.write) {
      const clipboardItem = new ClipboardItem({
        "text/html": new Blob([htmlContent], { type: "text/html" }),
        "text/plain": new Blob([plainTextContent], { type: "text/plain" }),
      });
      navigator.clipboard.write([clipboardItem]).catch((err) => {
        console.error("Failed to copy HTML content: ", err);
      });
    }
  };

  const handleCopyResponse = () => {
    if (!turns[currentTurn].response) return;

    // use the existing hook to copy the plain text
    copyToClipboard(turns[currentTurn].response);
  };

  return (
    <div className="fixed bottom-8 z-50 max-w-[calc(100%-32px)] w-[672px] left-1/2 -translate-x-1/2 border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 rounded-full border shadow-sm">
      {generationStatus ? (
        <LoadingBar
          value={GENERATION_STATUS_MAP[generationStatus].progress}
          text={GENERATION_STATUS_MAP[generationStatus].text}
        />
      ) : (
        <div className="p-1 flex items-center text-zinc-800 justify-between">
          {
            <BreakdownSheet
              triggerClasses={`${!turns[currentTurn].response && "hidden"}`}
            >
              <button
                className={`${
                  !turns[currentTurn].response && "hidden"
                } underline  dark flex h-10 items-center gap-2 rounded-full hover:bg-zinc-100 text-zinc-600 px-6`}
              >
                See AI Breakdown
              </button>
            </BreakdownSheet>
          }

          {!turns[currentTurn].response && (
            <>
              {isDesktop ? <TextActionButtons /> : <div className="w-full" />}
            </>
          )}

          <div
            className={`flex items-center gap-2 ${
              !isDesktop && turns[currentTurn].response && "pr-2"
            }`}
          >
            <IconButton
              // onClick={() => copyToClipboard(textValue)}
              onClick={
                turns[currentTurn].response
                  ? handleCopyResponse
                  : handleCopyPrompt
              }
              icon={
                isCopied ? (
                  <Tick className="h-5" />
                ) : (
                  <Clipboard className="h-5" />
                )
              }
            />

            {!isDesktop && turns[currentTurn].response ? (
              <></>
            ) : (
              <>
                <div className="h-4 w-px bg-zinc-200 mx-1" />
                <GenerateButton disabled={!!turns[currentTurn].response} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
