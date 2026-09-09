"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

function modIdx(i, n) {
  return ((i % n) + n) % n;
}

function easeCubicInOut(p) {
  return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
}

const items = [
  {
    number: "01",
    title: "Build With Purpose",
    description:
      "I don't build just to build. Every project is a chance to solve a problem, explore an idea, and become a better developer. I believe the best work comes from understanding why something should exist before deciding how to build it.",
    theme: {
      accentText: "text-indigo-400",
      accentBar: "bg-indigo-400",
      glowBg: "from-indigo-500/20 via-indigo-500/5 to-transparent",
      activeBtn:
        "bg-indigo-500 text-white border-indigo-300 shadow-[0_0_30px_rgba(99,102,241,0.85)] scale-110",
      idleBtn:
        "border-indigo-500/30 text-indigo-300/80 hover:border-indigo-400 hover:text-white bg-[#14141c]/90",
    },
  },
  {
    number: "02",
    title: "Fundamentals Matter",
    description:
      "Frameworks come and go, but strong fundamentals stay. I invest in problem-solving, data structures, algorithms, and core programming concepts because they give me the foundation to learn whatever comes next.",
    theme: {
      accentText: "text-emerald-400",
      accentBar: "bg-emerald-400",
      glowBg: "from-emerald-500/20 via-emerald-500/5 to-transparent",
      activeBtn:
        "bg-emerald-500 text-white border-emerald-300 shadow-[0_0_30px_rgba(16,185,129,0.85)] scale-110",
      idleBtn:
        "border-emerald-500/30 text-emerald-300/80 hover:border-emerald-400 hover:text-white bg-[#121a16]/90",
    },
  },
  {
    number: "03",
    title: "Learn by Building",
    description:
      "Tutorials can show you the path, but building teaches you how to walk it. I learn by creating real projects, breaking things, debugging them, and figuring out why they failed. Every error is part of the process.",
    theme: {
      accentText: "text-amber-400",
      accentBar: "bg-amber-400",
      glowBg: "from-amber-500/20 via-amber-500/5 to-transparent",
      activeBtn:
        "bg-amber-400 text-black border-amber-200 shadow-[0_0_30px_rgba(251,191,36,0.85)] scale-110 font-black",
      idleBtn:
        "border-amber-500/30 text-amber-300/80 hover:border-amber-400 hover:text-white bg-[#1a1712]/90",
    },
  },
  {
    number: "04",
    title: "Focus on Impact",
    description:
      "Code is simply a tool. What truly matters is the experience it provides and the value it brings to real users. High performance, accessible UX, and clarity always triumph over arbitrary complexity.",
    theme: {
      accentText: "text-sky-400",
      accentBar: "bg-sky-400",
      glowBg: "from-sky-500/20 via-sky-500/5 to-transparent",
      activeBtn:
        "bg-sky-500 text-white border-sky-300 shadow-[0_0_30px_rgba(14,165,233,0.85)] scale-110",
      idleBtn:
        "border-sky-500/30 text-sky-300/80 hover:border-sky-400 hover:text-white bg-[#121820]/90",
    },
  },
  {
    number: "05",
    title: "Progress Over Perfection",
    description:
      "I'm still learning, and that's the point. I would rather keep building, experimenting, and improving than wait until I know everything. Small improvements, repeated consistently, compound into something meaningful.",
    theme: {
      accentText: "text-fuchsia-400",
      accentBar: "bg-fuchsia-400",
      glowBg: "from-fuchsia-500/25 via-pink-500/5 to-transparent",
      activeBtn:
        "bg-[#e040fb] text-white border-[#f38bff] shadow-[0_0_35px_rgba(224,64,251,0.9)] scale-110",
      idleBtn:
        "border-fuchsia-500/30 text-fuchsia-300/80 hover:border-fuchsia-400 hover:text-white bg-[#1a121d]/90",
    },
  },
];

const deepCardVariants = {
  enter: (dir) => ({
    x: dir > 0 ? 320 : -320,
    y: 15,
    opacity: 0,
    scale: 0.88,
    rotateZ: dir > 0 ? 8 : -8,
    rotateY: dir > 0 ? 15 : -15,
  }),
  center: {
    x: 0,
    y: 0,
    opacity: 1,
    scale: 1,
    rotateZ: 0,
    rotateY: 0,
    zIndex: 10,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: (dir) => ({
    x: dir > 0 ? -320 : 320,
    y: -20,
    opacity: 0,
    scale: 0.82,
    rotateZ: dir > 0 ? -10 : 10,
    rotateY: dir > 0 ? -20 : 20,
    zIndex: 1,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

function AnimatedCard({ item, activeIdx, total, dir }) {
  const cardRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 260, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 260, damping: 20 });

  const tiltX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const tiltY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      key={activeIdx}
      custom={dir}
      variants={deepCardVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="absolute inset-0 w-full h-full flex justify-center [perspective:1200px]"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
          transformStyle: "preserve-3d",
        }}
        className="relative  w-full h-full rounded-[26px] overflow-hidden border border-zinc-800/80 bg-[#141416]/95 backdrop-blur-md shadow-2xl p-7 sm:p-9 flex flex-col justify-between group cursor-pointer transition-colors duration-300 hover:border-zinc-700"
      >
        {/* Ambient Glow */}
        <div
          className={`absolute -inset-1 rounded-3xl bg-gradient-to-br ${item.theme.glowBg} blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
        />

        {/* Top Section */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className={`w-1 h-7 rounded-full ${item.theme.accentBar}`} />
            <span
              className={`font-mono text-2xl font-bold tracking-tight ${item.theme.accentText}`}
            >
              {item.number}
            </span>
          </div>
          <span className="font-mono text-xs tracking-widest text-zinc-500">
            {activeIdx + 1} / {total}
          </span>
        </div>

        {/* Middle / Text Section */}
        <div className="relative z-10 space-y-4 my-auto">
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-snug">
            {item.title}
          </h3>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-normal">
            {item.description}
          </p>
        </div>

        {/* Bottom Accent Line */}
        <div className="relative z-10 w-full h-1 bg-zinc-800/60 rounded-full overflow-hidden mt-4">
          <motion.div
            className={`h-full ${item.theme.accentBar}`}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function BeliefsCarousel() {
  const M = items.length;

  const posRef = useRef(0);
  const [posDisplay, setPosDisplay] = useState(0);
  const rafRef = useRef(null);
  const animRef = useRef({ startPos: 0, targetPos: 0, startTime: 0 });
  const [dir, setDir] = useState(1);

  const active = modIdx(Math.round(posDisplay), M || 1);

  // Dial Geometry
  const buttonSize = 52;
  const gap = 20;
  const buttonCount = 5;
  const half = Math.floor(buttonCount / 2);
  const buffer = half + 1;
  const curve = 4.8;
  const t = Math.max(0.0001, curve / 10);
  const step = buttonSize + gap;
  const dPsi = ((Math.PI * 2) / Math.max(1, M)) * t;
  const R = step / (2 * Math.sin(dPsi / 2 || 0.01));

  const baseTop = 36;
  const fadeInner = Math.max(0, half - 0.2);
  const fadeEnd = half + 0.8;
  const maxPsi = Math.min(Math.PI, fadeEnd * dPsi);
  const stripHeight = baseTop + R * (1 - Math.cos(maxPsi)) + buttonSize + 30;

  const select = useCallback(
    (itemIdx) => {
      const currentActive = modIdx(Math.round(posRef.current), M);
      if (itemIdx === currentActive) return;

      let delta = itemIdx - Math.round(posRef.current);
      delta = ((delta % M) + M) % M;
      if (delta > M / 2) delta -= M;
      setDir(Math.sign(delta));

      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      animRef.current = {
        startPos: posRef.current,
        targetPos: posRef.current + delta,
        startTime: performance.now(),
      };

      const DURATION = 480;
      function tick(now) {
        const { startPos, targetPos, startTime } = animRef.current;
        const progress = Math.min(1, (now - startTime) / DURATION);
        posRef.current =
          startPos + (targetPos - startPos) * easeCubicInOut(progress);
        setPosDisplay(posRef.current);
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          posRef.current = targetPos;
          setPosDisplay(targetPos);
          rafRef.current = null;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    },
    [M],
  );

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const center = Math.round(posDisplay);
  const renderItems = [];
  const seen = new Set();
  for (let s = -buffer; s <= buffer; s++) {
    const idx = modIdx(center + s, M);
    if (!seen.has(idx)) {
      seen.add(idx);
      renderItems.push(idx);
    }
  }

  function getVisualSlot(itemIdx) {
    let slot = itemIdx - posDisplay;
    slot = slot % M;
    if (slot > M / 2) slot -= M;
    if (slot < -M / 2) slot += M;
    return slot;
  }

  function slotStyle(slot) {
    const angle = slot * dPsi;
    const x = R * Math.sin(angle);
    const y = R * (1 - Math.cos(angle));
    const deg = (angle * 180) / Math.PI;
    const absSlot = Math.abs(slot);
    const depth = Math.max(0, 1 - (0.45 * absSlot) / Math.max(1, half));
    const scale = 0.78 + 0.22 * depth;
    const opacity =
      absSlot <= fadeInner
        ? 1
        : absSlot >= fadeEnd
          ? 0
          : 1 - (absSlot - fadeInner) / (fadeEnd - fadeInner);
    const zIndex = Math.round(depth * 100) + (absSlot < 0.5 ? 100 : 0);
    return { x, y, deg, scale, opacity, zIndex };
  }

  const activeItem = items[active];

  return (
    <div className="relative w-full flex flex-col items-center justify-center gap-6 overflow-hidden py-4">
      {/* Viewport Stage: Width reduced (560px -> 460px) and height increased (280px/320px -> 390px/420px) */}
      <div className="relative w-full max-w-[460px] h-[420px] sm:h-[390px] px-4 overflow-hidden">
        <AnimatePresence initial={false} custom={dir}>
          <AnimatedCard
            key={active}
            item={activeItem}
            activeIdx={active}
            total={M}
            dir={dir}
          />
        </AnimatePresence>
      </div>

      {/* Dial Controls */}
      <div
        className="relative w-full select-none flex justify-center pt-2 pb-6"
        style={{ height: stripHeight }}
      >
        {renderItems.map((itemIdx) => {
          const slot = getVisualSlot(itemIdx);
          const { x, y, deg, scale, opacity, zIndex } = slotStyle(slot);
          const isActive = itemIdx === active;
          const item = items[itemIdx];

          return (
            <div
              key={itemIdx}
              className="absolute left-1/2 will-change-transform"
              style={{
                top: baseTop,
                marginLeft: -buttonSize / 2,
                marginTop: -buttonSize / 2,
                width: buttonSize,
                height: buttonSize,
                transform: `translate(${x}px, ${y}px) rotate(${deg}deg) scale(${scale})`,
                transformOrigin: "center",
                opacity,
                zIndex,
              }}
            >
              <button
                type="button"
                onClick={() => select(itemIdx)}
                aria-label={`Select belief ${item.number}`}
                className={`w-full h-full rounded-full flex items-center justify-center font-mono text-sm font-bold transition-all duration-300 border cursor-pointer ${
                  isActive ? item.theme.activeBtn : item.theme.idleBtn
                }`}
                style={{
                  transform: `rotate(${-deg}deg)`,
                  transformOrigin: "center",
                }}
              >
                {item.number}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
