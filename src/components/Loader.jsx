import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SHUTTER_BARS = 14; // fewer, chunkier bars read more premium than 24 thin slats

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
            <span className={`text-2xl font-extralight tracking-widest `}>
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

// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { motion, animate } from "framer-motion";
// import { useTheme } from "../context/ThemeContext";

// /* ------------------------------------------------------------------ */
// /*  Timeline constants                                                  */
// /*  The entire pacing of the loader lives here. Nothing below this      */
// /*  block needs to change to retime the sequence — 3.88s total,         */
// /*  comfortably inside the 3–4s requirement.                            */
// /* ------------------------------------------------------------------ */
// const TIMELINE = {
//   LETTER_STAGGER: 0.045, // s between each letter's entrance
//   LETTER_DURATION: 0.9, // s, single letter entrance duration
//   PROGRESS_DURATION: 2100, // ms, 0 -> 100 progress sweep
//   HOLD_DURATION: 250, // ms, breathing room once progress hits 100
//   FLASH_DURATION: 180, // ms, white flash right before explode
//   EXPLODE_DURATION: 1350, // ms, letters explode + ladder shutter reveals the page
// };

// // Number of vertical bars that make up the background ladder shutter.
// // Fewer, chunkier bars read more premium than a dense strip of thin slats.
// const SHUTTER_BARS = 16;

// // Absolute checkpoints, derived once (ms from mount)
// const T_FLASH = TIMELINE.PROGRESS_DURATION + TIMELINE.HOLD_DURATION;
// const T_EXPLODE = T_FLASH + TIMELINE.FLASH_DURATION;
// const T_DONE = T_EXPLODE + TIMELINE.EXPLODE_DURATION;

// // Single shared easing curve (expo-out) so every moving part feels
// // like it belongs to the same premium motion language.
// const EASE_CINEMATIC = [0.16, 1, 0.3, 1];

// /* ------------------------------------------------------------------ */
// /*  Deterministic pseudo-random helpers                                 */
// /*  Stable across re-renders, but not a visibly repeating pattern.      */
// /* ------------------------------------------------------------------ */
// const seededRandom = (seed) => {
//   const x = Math.sin(seed * 12.9898) * 43758.5453;
//   return x - Math.floor(x);
// };

// // Every letter gets its own explosion trajectory: a random direction,
// // distance, rotation, scale, and blur — never identical between letters.
// const getExplodeTarget = (i) => {
//   const angle = seededRandom(i * 7 + 1) * Math.PI * 2;
//   const distance = 220 + seededRandom(i * 7 + 2) * 260; // 220 -> 480px
//   return {
//     x: Math.cos(angle) * distance,
//     y: Math.sin(angle) * distance * 0.6, // flatten vertical spread a bit
//     rotate: (seededRandom(i * 7 + 3) * 2 - 1) * 35, // -35deg -> 35deg
//     scale: 2.4 + seededRandom(i * 7 + 4) * 2.4, // 2.4 -> 4.8
//     blur: 6 + seededRandom(i * 7 + 5) * 10, // 6px -> 16px
//   };
// };

// // Stable ambient rectangle field, generated once per mount.
// const generateFloatingRects = (count) =>
//   Array.from({ length: count }).map((_, i) => ({
//     id: i,
//     left: 6 + seededRandom(i * 3 + 1) * 88, // % across width
//     width: 2 + Math.round(seededRandom(i * 3 + 2) * 2), // 2-4px
//     height: 60 + seededRandom(i * 3 + 3) * 140, // 60-200px
//     duration: 8 + seededRandom(i * 3 + 4) * 10, // 8-18s drift cycle
//     delay: seededRandom(i * 3 + 5) * 6,
//     baseOpacity: 0.04 + seededRandom(i * 3 + 6) * 0.08,
//   }));

// // Each background bar gets its own delay, travel distance, speed, and width —
// // a center-out ripple with per-bar variance, so the reveal reads as a
// // hand-tuned ladder rather than a mechanical, uniform wipe. All bars travel
// // upward only (bottom-to-top reveal).
// const generateShutterBars = (count) => {
//   const center = (count - 1) / 2;
//   return Array.from({ length: count }).map((_, i) => {
//     const distFromCenter = Math.abs(i - center) / center; // 0 at middle, 1 at edges
//     const baseDelay = distFromCenter * 0.28; // middle leads, edges trail
//     const jitterDelay = seededRandom(i * 5 + 11) * 0.08;
//     const travel = 105 + seededRandom(i * 5 + 12) * 30; // 105% -> 135%
//     const duration = 0.65 + seededRandom(i * 5 + 13) * 0.3; // 0.65s -> 0.95s
//     const growVariance = seededRandom(i * 5 + 14) * 0.6 - 0.3; // -0.3 -> 0.3

//     return {
//       key: i,
//       delay: baseDelay + jitterDelay,
//       y: `-${travel}%`,
//       duration,
//       flexGrow: 1 + growVariance,
//     };
//   });
// };

// const letterVariants = {
//   hidden: { opacity: 0, y: 70, filter: "blur(14px)" },
//   visible: (i) => ({
//     opacity: 1,
//     y: 0,
//     filter: "blur(0px)",
//     transition: {
//       delay: i * TIMELINE.LETTER_STAGGER,
//       duration: TIMELINE.LETTER_DURATION,
//       ease: EASE_CINEMATIC,
//     },
//   }),
//   explode: (i) => {
//     const t = getExplodeTarget(i);
//     return {
//       opacity: 0,
//       x: t.x,
//       y: t.y,
//       rotate: t.rotate,
//       scale: t.scale,
//       filter: `blur(${t.blur}px)`,
//       transition: {
//         delay: i * 0.018,
//         duration: TIMELINE.EXPLODE_DURATION / 1000,
//         ease: EASE_CINEMATIC,
//       },
//     };
//   },
// };

// const hudVariants = {
//   hidden: { opacity: 0, y: 8 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.6, ease: EASE_CINEMATIC, delay: 0.2 },
//   },
//   exit: {
//     opacity: 0,
//     transition: {
//       duration: TIMELINE.EXPLODE_DURATION / 1000,
//       ease: EASE_CINEMATIC,
//     },
//   },
// };

// /* ------------------------------------------------------------------ */
// /*  Small presentational sub-components                                 */
// /*  Split out purely for readability — each one owns a single visual    */
// /*  layer of the scene.                                                  */
// /* ------------------------------------------------------------------ */

// const BackgroundGrid = () => (
//   <motion.div
//     className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-screen"
//     style={{
//       backgroundImage:
//         "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
//       backgroundSize: "8vw 8vw",
//     }}
//     animate={{ backgroundPosition: ["0px 0px", "8vw 8vw"] }}
//     transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
//   />
// );

// const FloatingRects = ({ rects }) => (
//   <div className="absolute inset-0 pointer-events-none overflow-hidden">
//     {rects.map((r) => (
//       <motion.span
//         key={r.id}
//         className="absolute bg-white rounded-full"
//         style={{
//           left: `${r.left}%`,
//           width: r.width,
//           height: r.height,
//           top: "50%",
//         }}
//         animate={{
//           y: ["-20%", "10%", "-20%"],
//           opacity: [0, r.baseOpacity, 0],
//         }}
//         transition={{
//           duration: r.duration,
//           delay: r.delay,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />
//     ))}
//   </div>
// );

// const RadialGlow = () => (
//   <motion.div
//     className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
//     style={{
//       width: "60vw",
//       height: "60vw",
//       maxWidth: 900,
//       maxHeight: 900,
//       background:
//         "radial-gradient(circle, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 70%)",
//     }}
//     animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
//     transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//   />
// );

// const FilmGrain = () => (
//   <>
//     {/* Scoped keyframes for a cheap, GPU-friendly grain shift — no JS per-frame cost */}
//     <style>{`
//       @keyframes loaderGrainShift {
//         0%   { transform: translate(0, 0); }
//         25%  { transform: translate(-2%, 2%); }
//         50%  { transform: translate(2%, -1%); }
//         75%  { transform: translate(-1%, -2%); }
//         100% { transform: translate(0, 0); }
//       }
//     `}</style>
//     <div
//       className="absolute -inset-[2%] pointer-events-none opacity-[0.05] mix-blend-overlay"
//       style={{
//         backgroundImage:
//           "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
//         animation: "loaderGrainShift 1.2s steps(2) infinite",
//       }}
//     />
//   </>
// );

// const LadderShutter = ({ bars, active, color }) => (
//   <div className="absolute inset-0 flex z-0">
//     {bars.map((bar) => (
//       <motion.div
//         key={bar.key}
//         style={{ flexGrow: bar.flexGrow, flexBasis: 0, backgroundColor: color }}
//         initial={{ y: 0 }}
//         animate={{ y: active ? bar.y : 0 }}
//         transition={{
//           delay: active ? bar.delay : 0,
//           duration: active ? bar.duration : 0,
//           ease: EASE_CINEMATIC,
//         }}
//       />
//     ))}
//   </div>
// );

// const FlashOverlay = ({ active }) => (
//   <motion.div
//     className="absolute inset-0 bg-white pointer-events-none z-[99999]"
//     initial={{ opacity: 0 }}
//     animate={active ? { opacity: [0, 0.35, 0] } : { opacity: 0 }}
//     transition={{ duration: TIMELINE.FLASH_DURATION / 1000, ease: "easeOut" }}
//   />
// );

// /* ------------------------------------------------------------------ */
// /*  Main component                                                      */
// /* ------------------------------------------------------------------ */

// const FIRST_NAME = "ABINASH".split("");
// const LAST_NAME = "ROUT".split("");

// const Loader = ({ onComplete }) => {
//   const { theme } = useTheme();
//   const isDark = theme === "dark";

//   const [phase, setPhase] = useState("running"); // running -> flash -> explode -> done
//   const [progress, setProgress] = useState(0);
//   const progressRef = useRef(0);

//   const rects = useMemo(() => generateFloatingRects(10), []);
//   const shutterBars = useMemo(() => generateShutterBars(SHUTTER_BARS), []);

//   // Phase timeline: scheduled once on mount, always cleaned up.
//   useEffect(() => {
//     const timers = [
//       setTimeout(() => setPhase("flash"), T_FLASH),
//       setTimeout(() => setPhase("explode"), T_EXPLODE),
//       setTimeout(() => setPhase("done"), T_DONE),
//     ];
//     return () => timers.forEach(clearTimeout);
//   }, []);

//   // Progress sweep, driven by Framer Motion's `animate` with a cinematic
//   // easing curve instead of a raw linear ramp. Re-renders only fire when
//   // the rounded percentage actually changes, not on every frame.
//   useEffect(() => {
//     const controls = animate(0, 100, {
//       duration: TIMELINE.PROGRESS_DURATION / 1000,
//       ease: EASE_CINEMATIC,
//       onUpdate: (v) => {
//         const rounded = Math.round(v);
//         if (rounded !== progressRef.current) {
//           progressRef.current = rounded;
//           setProgress(rounded);
//         }
//       },
//     });
//     return () => controls.stop();
//   }, []);

//   // Completion callback lives in an effect, never called during render.
//   useEffect(() => {
//     if (phase === "done") {
//       onComplete?.();
//     }
//   }, [phase, onComplete]);

//   if (phase === "done") return null;

//   const isExploding = phase === "explode";
//   const bgColor = isDark ? "#060608" : "#090a10";

//   return (
//     <motion.div
//       className="fixed inset-0 z-[9999] overflow-hidden select-none font-sans"
//       // Subtle, continuous "camera breathing" — independent of phase.
//       animate={{ scale: [1, 1.02, 1] }}
//       transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
//     >
//       {/* The page's background IS this ladder of bars, from the first frame
//           onward. They sit at y:0 (a solid wall) through loading/flash, then
//           during the explode phase they lift away — bottom to top, uneven
//           per-bar timing — so whatever's actually mounted underneath (the
//           real portfolio) is revealed naturally, with no separate solid
//           backdrop left behind them. */}
//       <LadderShutter bars={shutterBars} active={isExploding} color={bgColor} />

//       {/* This wrapper is the foreground content: it fades + zooms out on
//           explode while the ladder shutter reveals the page behind it. */}
//       <motion.div
//         className="absolute inset-0 z-10"
//         animate={
//           isExploding ? { opacity: 0, scale: 1.06 } : { opacity: 1, scale: 1 }
//         }
//         transition={{
//           duration: TIMELINE.EXPLODE_DURATION / 1000,
//           ease: EASE_CINEMATIC,
//         }}
//       >
//         <BackgroundGrid />
//         <FloatingRects rects={rects} />
//         <RadialGlow />

//         {/* Kinetic Typography */}
//         <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 tracking-tighter z-10">
//           <div className="flex py-1">
//             {FIRST_NAME.map((char, i) => (
//               <motion.span
//                 key={`f-${i}`}
//                 custom={i}
//                 variants={letterVariants}
//                 initial="hidden"
//                 animate={isExploding ? "explode" : "visible"}
//                 className="text-[12vw] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400"
//                 style={{
//                   filter: "drop-shadow(0 0 24px rgba(255,255,255,0.10))",
//                 }}
//               >
//                 {char}
//               </motion.span>
//             ))}
//           </div>
//           <div className="flex py-1">
//             {LAST_NAME.map((char, i) => (
//               <motion.span
//                 key={`l-${i}`}
//                 custom={i + FIRST_NAME.length}
//                 variants={letterVariants}
//                 initial="hidden"
//                 animate={isExploding ? "explode" : "visible"}
//                 className="text-[12vw] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-300 to-zinc-500"
//                 style={{
//                   filter: "drop-shadow(0 0 24px rgba(255,255,255,0.10))",
//                 }}
//               >
//                 {char}
//               </motion.span>
//             ))}
//           </div>
//         </div>

//         {/* Bottom HUD */}
//         <motion.div
//           className="absolute bottom-12 left-10 right-10 flex justify-between items-end border-t border-white/5 pt-6 z-10"
//           variants={hudVariants}
//           initial="hidden"
//           animate={isExploding ? "exit" : "visible"}
//         >
//           <div className="flex flex-col gap-1 font-mono text-[10px] tracking-[0.3em] text-zinc-500">
//             <span className="text-zinc-400 font-medium font-sans flex items-center gap-2">
//               <motion.span
//                 className="w-1 h-1 rounded-full bg-white"
//                 animate={{ opacity: [0.3, 1, 0.3] }}
//                 transition={{
//                   duration: 1.6,
//                   repeat: Infinity,
//                   ease: "easeInOut",
//                 }}
//               />
//               SYS_INIT // 2026
//             </span>
//             <span className="opacity-60">MERN_STACK_CORE</span>
//           </div>

//           <div className="flex flex-col items-end gap-2 font-mono">
//             <span
//               className={`text-2xl font-extralight tracking-widest tabular-nums ${
//                 isDark ? "text-white" : "text-zinc-200"
//               }`}
//             >
//               {progress.toString().padStart(3, "0")}%
//             </span>
//             <div className="w-32 h-[2px] bg-white/[0.06] overflow-hidden relative rounded-full">
//               <motion.div
//                 className="h-full rounded-full bg-gradient-to-r from-zinc-400 via-white to-white"
//                 style={{ boxShadow: "0 0 8px rgba(255,255,255,0.5)" }}
//                 animate={{ width: `${progress}%` }}
//                 transition={{ duration: 0.2, ease: "easeOut" }}
//               />
//             </div>
//           </div>
//         </motion.div>

//         <FilmGrain />
//       </motion.div>

//       <FlashOverlay active={phase === "flash"} />
//     </motion.div>
//   );
// };

// export default Loader;
