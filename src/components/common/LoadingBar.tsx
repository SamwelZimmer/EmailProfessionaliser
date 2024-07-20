import { interpolateHexColor } from "@/lib/utils";

export default function LoadingBar({
  value,
  text,
  animate = true,
}: {
  value: number;
  text?: string;
  animate?: boolean;
}) {
  // Example usage:
  const color1 = "#DBEAFE";
  const color2 = "#60A5FA";
  const percentage = value / 100;

  return (
    <div className="h-full w-full p-1 relative">
      <div
        style={{
          width: value ? `${value}%` : 0,
          background: `linear-gradient(90deg, ${color1} 0%, ${interpolateHexColor(
            color1,
            color2,
            percentage
          )} 100%)`,
        }}
        className={`w-full rounded-full h-10 transition-all duration-300`}
      >
        {animate && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0) 100%)",
              transform: "translateX(-100%)",
              animation: "sheen 3s infinite",
            }}
          />
        )}
      </div>

      {text && (
        <span className="font-serif absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 font-bold opacity-70">
          {text}
        </span>
      )}

      <style jsx>{`
        @keyframes sheen {
          to {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
