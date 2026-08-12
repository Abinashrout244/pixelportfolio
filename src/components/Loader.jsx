import React, { useEffect, useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SHUTTER_BARS = 14;

const Loader = ({ onComplete }) => {
  // Orchestration Phase States
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("loading"); // loading -> explode -> shutter -> done
  const showFirstRef = useRef(false);
  const showSecondRef = useRef(false);
  const hasCompletedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

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
      if (elapsed >= T_FIRST_NAME && !showFirstRef.current) {
        showFirstRef.current = true;
        setShowFirst(true);
      }
      if (elapsed >= T_LAST_NAME && !showSecondRef.current) {
        showSecondRef.current = true;
        setShowSecond(true);
      }

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
        if (!hasCompletedRef.current) {
          hasCompletedRef.current = true;
          onCompleteRef.current();
        }
        return; // Break animation loop execution
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // UI Split Mapping
  const firstName = ["A", "B", "I", "N", "A", "S", "H"];
  const lastName = ["R", "O", "U", "T"];

  // Framer Motion Variant Declarations
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
  const shutterBars = useMemo(() => {
    const center = (SHUTTER_BARS - 1) / 2;
    const seeded = (i, salt) => {
      const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
      return x - Math.floor(x);
    };

    return Array.from({ length: SHUTTER_BARS }).map((_, i) => {
      const distFromCenter = Math.abs(i - center) / center;
      const baseDelay = distFromCenter * 0.32;
      const jitterDelay = seeded(i, 1) * 0.1;
      const travel = 105 + seeded(i, 2) * 35;
      const duration = 1.0 + seeded(i, 3) * 0.5;
      const growBase = 1;
      const growVariance = seeded(i, 4) * 0.6 - 0.3;

      return {
        key: i,
        delay: baseDelay + jitterDelay,
        y: `-${travel}%`,
        duration,
        flexGrow: growBase + growVariance,
      };
    });
  }, []);

  const bgColor = "#060608";

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden select-none font-sans">
      {/* Shutter bars — the page IS these bars from first frame to last */}
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
            className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-screen"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(52,211,153,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(52,211,153,0.6) 1px, transparent 1px)",
              backgroundSize: "8vw 8vw",
            }}
          />
          <div className="absolute top-6 left-4 sm:top-12 sm:left-10 w-16 sm:w-24 h-[1px] bg-emerald-400/30 animate-pulse" />
          <div className="absolute top-9 left-4 sm:top-16 sm:left-10 w-10 sm:w-16 h-[1px] bg-white/10" />
        </>
      )}

      {/* Main Kinetic Typography Layout Area */}
      {phase !== "shutter" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 sm:gap-2 tracking-tighter z-10 px-4">
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
                    className="text-[clamp(2.75rem,11vw,8rem)] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-emerald-200 drop-shadow-[0_0_25px_rgba(52,211,153,0.25)]"
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
                    className="text-[clamp(2.75rem,11vw,8rem)] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-emerald-300/80 drop-shadow-[0_0_25px_rgba(52,211,153,0.2)]"
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
        <div className="absolute bottom-6 left-4 right-4 sm:bottom-10 sm:left-8 sm:right-8 md:bottom-12 md:left-10 md:right-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-0 border-t border-white/5 pt-4 sm:pt-6 z-10">
          <div className="flex flex-col gap-1 font-mono text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] text-zinc-500">
            <span className="text-zinc-300 font-medium font-sans">
              FULL-STACK DEVELOPER // 2026
            </span>
            <span className="opacity-60 text-emerald-400/70">
              5+ YEARS BUILDING FOR THE WEB
            </span>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-2 font-mono w-full sm:w-auto">
            <span className="text-xl sm:text-2xl font-extralight tracking-widest text-emerald-300/90">
              {progress.toString().padStart(3, "0")}%
            </span>
            <div className="w-full sm:w-28 md:w-32 h-[1px] bg-white/5 overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-white transition-all duration-75 ease-out"
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
