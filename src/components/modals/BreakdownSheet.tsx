import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useContext } from "react";
import { AppContext } from "../context/AppProvider";
import Markdown from "react-markdown";
import { interpolateHexColor } from "@/lib/utils";

interface BreakdownSheetProps {
  children: React.ReactNode;
  triggerClasses?: string;
}

export default function BreakdownSheet({
  children,
  triggerClasses,
}: BreakdownSheetProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { turns, currentTurn } = useContext(AppContext);

  const activeTurn = turns[currentTurn];

  return (
    <Sheet>
      <SheetTrigger className={triggerClasses}>{children}</SheetTrigger>
      <SheetContent
        side={isDesktop ? "right" : "bottom"}
        className={`text-left ${
          isDesktop ? "min-w-[600px]" : "w-screen max-h-[90vh]"
        }`}
      >
        <SheetHeader>
          <SheetTitle>AI Breakdown</SheetTitle>

          <div className="h-full w-full text-left flex flex-col gap-6 pt-6">
            <div className="flex items-center w-full justify-center gap-16">
              {/* pre-ai score */}
              {activeTurn.initialScore && (
                <Score score={activeTurn.initialScore} text="Before" />
              )}

              {/* new score */}
              {activeTurn.improvedScore && (
                <Score score={activeTurn.improvedScore} text="After" />
              )}
            </div>

            {/* improvement actions */}
            {activeTurn.actions && (
              <div className="">
                <span className="text-sm text-zinc-600">
                  Recommended Changes
                </span>
                <Markdown className="markdown -mt-4">
                  {activeTurn.actions}
                </Markdown>
              </div>
            )}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

const Score = ({ score, text }: { score: number; text: string }) => {
  const color1 = "#FF0000";
  const color2 = "#00FF00";
  const percentage = score / 100;

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-baseline">
        <span
          style={{
            color: interpolateHexColor(color1, color2, percentage),
          }}
          className="text-5xl font-black"
        >
          {score}
        </span>
        <span className="text-sm text-zinc-600">{"%"}</span>
      </div>

      <span className="text-sm text-zinc-600">{text}</span>
    </div>
  );
};
