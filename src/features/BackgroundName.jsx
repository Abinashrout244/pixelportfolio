import React from "react";

export default function BackgroundName() {
  return (
    <div
      className="absolute inset-0 z-[1] flex items-center justify-center overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* Ambient glow */}
      <div className="absolute h-[40rem] w-[40rem] rounded-full bg-violet-500/10 blur-[180px]" />

      <h1
        className="
    font-geist
    font-black
    whitespace-nowrap
    tracking-[0.03em]
    text-transparent
    bg-clip-text
    bg-gradient-to-b
    from-white/15
    via-white/8
    to-transparent
  "
        style={{
          fontSize: "min(20vw,24rem)",
          filter: "blur(1.5px)",
        }}
      >
        ABINASH
      </h1>
    </div>
  );
}
