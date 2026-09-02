import React, { useRef, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";

const sections = [
  {
    index: "01",
    title: "Tools.",
    subtitle: "What I Reach For",
    items: [
      {
        title: "VS Code",
        meta: "EDITOR",
        description:
          "Home base for everything I write. Fast, lightweight, and customized.",
        image:
          "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&auto=format&fit=crop&q=80",
      },
      {
        title: "GitHub Copilot",
        meta: "AI PAIR",
        description:
          "Handles boilerplate and speed-runs tedious logic without losing precision.",
        image:
          "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&auto=format&fit=crop&q=80",
      },
      {
        title: "Postman",
        meta: "API TESTING",
        description:
          "Where endpoints get refined and verified before UI integration.",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
      },
      {
        title: "Figma",
        meta: "DESIGN",
        description:
          "Pixel-level prototyping and tokens handoff before touching JSX.",
        image:
          "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    index: "02",
    title: "Stack.",
    subtitle: "What I Build With",
    items: [
      {
        title: "React.js",
        meta: "FRAMEWORK",
        description:
          "Declarative UI with server components, actions, and custom hooks.",
        image:
          "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80",
      },
      {
        title: "JavaScript",
        meta: "LANGUAGE",
        description:
          "Dynamic scripting powering seamless client-side interactions.",
        image:
          "https://images.unsplash.com/photo-1516116211227-bbc1541334c4?w=800&auto=format&fit=crop&q=80",
      },
      {
        title: "Tailwind CSS",
        meta: "STYLING",
        description:
          "Utility-first design tokens directly bound inside component markup.",
        image:
          "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
      },
      {
        title: "Motion",
        meta: "ANIMATION",
        description:
          "Spring physics and fluid layout transitions that breathe life into screens.",
        image:
          "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
      },
      {
        title: "MongoDB",
        meta: "DATABASE",
        description:
          "Flexible JSON document schemas mapped via Mongoose models.",
        image:
          "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=80",
      },
      {
        title: "Vercel & Render",
        meta: "HOSTING",
        description:
          "Continuous deployment and preview branches wired directly to GitHub.",
        image:
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    index: "03",
    title: "Apps.",
    subtitle: "Daily Flow",
    items: [
      {
        title: "ChatGPT",
        meta: "AI ASSISTANT",
        description:
          "High-speed brainstorming, syntax queries, and exploratory refactors.",
        image:
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80",
      },
      {
        title: "Notion",
        meta: "WORKSPACE",
        description:
          "Architecture blueprints, client notes, and technical specs.",
        image:
          "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop&q=80",
      },
      {
        title: "Spotify",
        meta: "AUDIO",
        description:
          "Deep focus beats and ambient electronica for uninterrupted flow.",
        image:
          "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80",
      },
      {
        title: "Chrome",
        meta: "DEV BROWSER",
        description:
          "Profiling performance bottlenecks and network waterfalls.",
        image:
          "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
      },
    ],
  },
];

const letterVariants = {
  initial: { y: 0, rotateX: 0, opacity: 1 },
  hover: (i) => ({
    y: [0, -8, 0],
    rotateX: [0, -90, 0],
    opacity: [1, 0.6, 1],
    transition: {
      duration: 0.55,
      delay: i * 0.02,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function InteractiveRow({ item, index, hoveredIndex, setHoveredIndex }) {
  const isHovered = hoveredIndex === index;
  const isAnyHovered = hoveredIndex !== null;

  const letters = useMemo(() => item.title.split(""), [item.title]);

  return (
    <div
      onMouseEnter={() => setHoveredIndex(index)}
      className="group relative py-6 sm:py-8 transition-all duration-300 cursor-default flex flex-col items-start justify-center text-left"
      style={{ perspective: 1000 }}
    >
      {/* Subtle left glow indicator that activates on hover */}
      <div
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-full transition-all duration-300 ${
          isHovered
            ? "h-10 bg-white opacity-100 shadow-[0_0_12px_rgba(255,255,255,0.7)]"
            : "h-0 bg-transparent opacity-0"
        }`}
      />

      {/* Main content pushed slightly right for the hover bar */}
      <div
        className={`flex flex-col sm:flex-row sm:items-baseline justify-between w-full gap-3 transition-transform duration-300 ${
          isHovered ? "translate-x-3.5" : "translate-x-0"
        }`}
      >
        {/* Title with increased size and left alignment */}
        <motion.h3
          className="inline-flex flex-wrap text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-none text-left"
          animate={{
            color: isAnyHovered
              ? isHovered
                ? "#ffffff"
                : "#3f3f46"
              : "#e4e4e7",
          }}
          transition={{ duration: 0.2 }}
        >
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial="initial"
              animate={isHovered ? "hover" : "initial"}
              className="inline-block will-change-transform"
              style={{ originX: 0.5, originY: 0.5 }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.h3>

        {/* Minimal pill meta badge */}
        <span
          className={`font-mono text-[11px] sm:text-xs tracking-widest uppercase transition-colors duration-200 shrink-0 ${
            isHovered ? "text-zinc-300" : "text-zinc-500"
          }`}
        >
          {item.meta}
        </span>
      </div>

      {/* Mobile / Tablet description fallback */}
      <p
        className={`block lg:hidden mt-3 max-w-xl text-sm text-zinc-400 leading-relaxed text-left transition-transform duration-300 ${
          isHovered ? "translate-x-3.5" : "translate-x-0"
        }`}
      >
        {item.description}
      </p>
    </div>
  );
}
function InteractiveSection({ index, title, subtitle, items }) {
  const containerRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springX = useSpring(rawX, { stiffness: 220, damping: 24, mass: 0.4 });
  const springY = useSpring(rawY, { stiffness: 220, damping: 24, mass: 0.4 });

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(e.clientX - rect.left + 35);
    rawY.set(e.clientY - rect.top - 70);
  };

  const activeItem = hoveredIndex !== null ? items[hoveredIndex] : null;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredIndex(null)}
      className="relative grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 border-t border-zinc-800/60 pt-12 sm:pt-16 pb-16 sm:pb-20"
    >
      {/* Sticky Header */}
      <div className="md:col-span-4">
        <div className="md:sticky md:top-28 space-y-1">
          <span className="block text-xs font-mono tracking-widest text-zinc-500">
            {index}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {title}
          </h2>
          <p className="text-zinc-500 text-sm sm:text-base">{subtitle}</p>
        </div>
      </div>

      {/* Floating Image Preview (Desktop Only) */}
      <motion.div
        className="hidden lg:block pointer-events-none absolute z-30 w-56 aspect-[3/4] rounded-lg overflow-hidden border border-white/10 bg-zinc-950/80 backdrop-blur-md shadow-[0_25px_60px_rgba(0,0,0,0.85)] p-1.5"
        style={{
          left: 0,
          top: 0,
          x: springX,
          y: springY,
        }}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{
          opacity: hoveredIndex !== null ? 1 : 0,
          scale: hoveredIndex !== null ? 1 : 0.92,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
      >
        {activeItem && (
          <div className="relative w-full h-full rounded-md overflow-hidden bg-zinc-900">
            <img
              src={activeItem.image}
              alt={activeItem.title}
              className="w-full h-full object-cover"
            />
            {/* Subtle specular vignette highlight */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-white/10" />
            <div className="absolute inset-0 pointer-events-none rounded-md ring-1 ring-inset ring-white/10" />
          </div>
        )}
      </motion.div>

      {/* Tech Item Rows */}
      <div className="md:col-span-8 flex flex-col divide-y divide-zinc-800/40">
        {items.map((item, i) => (
          <InteractiveRow
            key={item.title}
            item={item}
            index={i}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        ))}
      </div>
    </div>
  );
}

export default function WhatPowersMyWork() {
  return (
    <div className="min-h-screen bg-[#070709] text-white font-sans antialiased selection:bg-zinc-800 selection:text-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-12 pt-24 md:pt-32">
        <nav className="relative z-10">
          <Link to="/">
            <button className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-widest text-zinc-500 hover:text-zinc-200 transition-colors uppercase">
              ← BACK TO HOME
            </button>
          </Link>
        </nav>

        <header className="relative pt-10 sm:pt-16 pb-16 sm:pb-20">
          <div className="space-y-5 max-w-3xl">
            <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
              THE GEAR
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase leading-[0.95] text-white">
              What Powers My Work
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl">
              A living list of the hardware, software, and tools I reach for
              every day.
            </p>
          </div>
        </header>

        <div>
          {sections.map((section) => (
            <InteractiveSection key={section.index} {...section} />
          ))}
        </div>
      </div>
    </div>
  );
}
