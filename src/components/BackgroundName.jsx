import React from "react";

export default function BackgroundName() {
  return (
    <div
      className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
    >
      <span
        className="font-geist font-black text-white whitespace-nowrap"
        style={{
          fontSize: "clamp(200px, 40vw, 700px)",
          lineHeight: 0.85,
          opacity: 0.04,
          filter: "blur(2px)",
          letterSpacing: "-0.02em",
        }}
      >
        AVI
      </span>
    </div>
  );
}
