import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SHUTTER_BARS = 14;

const Loader = ({ onComplete }) => {
  // Orchestration Phase States
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("loading"); // loading -> explode -> shutter -> done

  useEffect(() => {
    let start = null;
    let animationFrameId;

    // Timeline Configuration Milestones (in milliseconds)
    const T_FIRST_NAME = 500; // 0.5s -> Reveal ABINASH
    const T_LAST_NAME = 1300; // 1.3s -> Reveal ROUT
    const T_MAX_LOAD = 2000; // 2.0s -> Hit 100%
    const T_EXPLODE = 2600; // 2.6s -> Trigger letter explosion
    const T_SHUTTER = 3100; // 3.1s -> Bottom-to-top ladder reveal begins
    const T_COMPLETE = 8400; // 5.4s -> Clear component completely (slowed down, gives the slowest bar time to clear)

    const tick = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;

      // 1. Text Entry Sequence Triggers
      if (elapsed >= T_FIRST_NAME && !showFirst) setShowFirst(true);
      if (elapsed >= T_LAST_NAME && !showSecond) setShowSecond(true);

      // 2. Linear Counter Interpolation mapping 0 -> 100 up to the 2.0s mark
      if (elapsed <= T_MAX_LOAD) {
        const pct = Math.min(100, Math.round((elapsed / T_MAX_LOAD) * 100));
        setProgress(pct);
      } else {
        setProgress(100);
      }

      // 3. Phase Transition Lifecycle Controllers
      if (elapsed >= T_EXPLODE && elapsed < T_SHUTTER) {
        setPhase("explode");
      } else if (elapsed >= T_SHUTTER && elapsed < T_COMPLETE) {
        setPhase("shutter");
      } else if (elapsed >= T_COMPLETE) {
        setPhase("done");
        return; // Break animation loop execution
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, [showFirst, showSecond]);

  // UI Split Mapping
  const firstName = ["A", "B", "I", "N", "A", "S", "H"];
  const lastName = ["R", "O", "U", "T"];

  // Framer Motion Variant Declarations
  // "visible" is a function so each letter gets its own tiny delay off its index (custom prop) —
  // that per-letter stagger is what makes the name feel like it flows in smoothly rather than
  // snapping in as one flat block.
  const letterVariants = {
    hidden: { y: "110%", opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        ease: [0.215, 0.61, 0.355, 1],
        duration: 0.75,
        delay: i * 0.045,
      },
    }),
    explode: {
      scale: 5,
      opacity: 0,
      filter: "blur(15px)",
      transition: { ease: [0.76, 0, 0.24, 1], duration: 0.7 },
    },
  };

  // Precompute each ladder bar's own personality: width, delay, distance, duration.
  // Center-out stagger + per-bar variance is what breaks the "uniform curtain" look
  // and makes it read as a hand-tuned ladder rather than 24 identical blinds.
  const shutterBars = useMemo(() => {
    const center = (SHUTTER_BARS - 1) / 2;
    // deterministic pseudo-random so it's stable across re-renders but not a clean pattern
    const seeded = (i, salt) => {
      const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
      return x - Math.floor(x);
    };

    return Array.from({ length: SHUTTER_BARS }).map((_, i) => {
      const distFromCenter = Math.abs(i - center) / center; // 0 at center, 1 at edges

      // Center bars lead, edges trail (a ripple, not a left-to-right wipe).
      // distFromCenter is 0 at the middle, so the middle gets the smallest delay.
      const baseDelay = distFromCenter * 0.32;
      const jitterDelay = seeded(i, 1) * 0.1;

      // Uneven travel distance per bar — this is the "not same height, like a ladder" part
      const travel = 105 + seeded(i, 2) * 35; // 105% -> 140%

      // Slower, slightly varied speed per bar so it reads as an unhurried, deliberate reveal
      const duration = 1.0 + seeded(i, 3) * 0.5; // 1.0s -> 1.5s

      // Subtle width variance so the bars themselves aren't perfectly even slats
      const growBase = 1;
      const growVariance = seeded(i, 4) * 0.6 - 0.3; // -0.3 to +0.3

      return {
        key: i,
        delay: baseDelay + jitterDelay,
        // All bars exit upward only — a bottom-to-top reveal, not an alternating split
        y: `-${travel}%`,
        duration,
        flexGrow: growBase + growVariance,
      };
    });
  }, []);

  if (phase === "done") {
    // Notify parent App context structure that the timeline loop is fully finished
    setTimeout(onComplete, 10);
    return null;
  }

  const bgColor = "#060608";

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden select-none font-sans">
      {/* The page IS these bars, from the first frame to the last.
          They sit at y:0 (a solid wall) through loading/explode, then in the
          shutter phase they peel apart to their own uneven distances —
          there is no separate solid backdrop left behind them, so what's
          actually mounted underneath (the real app) shows through the gaps. */}
      <div className="absolute inset-0 flex z-0">
        {shutterBars.map((bar) => (
          <motion.div
            key={bar.key}
            style={{
              flexGrow: bar.flexGrow,
              flexBasis: 0,
              backgroundColor: bgColor,
            }}
            initial={{ y: 0 }}
            animate={{ y: phase === "shutter" ? bar.y : 0 }}
            transition={{
              delay: phase === "shutter" ? bar.delay : 0,
              duration: phase === "shutter" ? bar.duration : 0,
              ease: [0.76, 0, 0.24, 1],
            }}
          />
        ))}
      </div>

      {/* 0.0s Base Stage Layer: Structural Matrix & HUD Panels */}
      {phase === "loading" && (
        <>
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-screen"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "8vw 8vw",
            }}
          />
          <div className="absolute top-12 left-10 w-24 h-[1px] bg-white/10 animate-pulse" />
          <div className="absolute top-16 left-10 w-16 h-[1px] bg-white/5" />
        </>
      )}

      {/* Main Kinetic Typography Layout Area */}
      {phase !== "shutter" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 tracking-tighter z-10">
          {/* 0.5s Milestone Row */}
          <div className="flex overflow-hidden py-1">
            <AnimatePresence>
              {showFirst &&
                firstName.map((char, i) => (
                  <motion.span
                    key={`f-${i}`}
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate={phase === "explode" ? "explode" : "visible"}
                    className="text-[12vw] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400"
                  >
                    {char}
                  </motion.span>
                ))}
            </AnimatePresence>
          </div>

          {/* 1.3s Milestone Row */}
          <div className="flex overflow-hidden py-1">
            <AnimatePresence>
              {showSecond &&
                lastName.map((char, i) => (
                  <motion.span
                    key={`l-${i}`}
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate={phase === "explode" ? "explode" : "visible"}
                    className="text-[12vw] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-300 to-zinc-500"
                  >
                    {char}
                  </motion.span>
                ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* 2.0s Metric Loader HUD Dashboard Area */}
      {phase === "loading" && (
        <div className="absolute bottom-12 left-10 right-10 flex justify-between items-end border-t border-white/5 pt-6 z-10">
          <div className="flex flex-col gap-1 font-mono text-[10px] tracking-[0.3em] text-zinc-500">
            <span className="text-zinc-400 font-medium font-sans">
              SYS_INIT // 2026
            </span>
            <span className="opacity-60">MERN_STACK_CORE</span>
          </div>

          <div className="flex flex-col items-end gap-2 font-mono">
            <span className={`text-2xl font-extralight tracking-widest  text-gray-300 `}>
              {progress.toString().padStart(3, "0")}%
            </span>
            <div className="w-32 h-[1px] bg-white/5 overflow-hidden relative">
              <div
                className="h-full bg-white transition-all duration-75 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loader;

