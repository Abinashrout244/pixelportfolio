import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.25, 0.1, 0.25, 1],
      delay,
    },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay,
    },
  }),
};

const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
      delay,
    },
  }),
};

export default function HeroContent({ isLoaded }) {
  return (
    <div className="flex flex-col justify-center z-10 w-full lg:w-[55%] px-6 lg:px-0">
      {/* ── Labels Row ── */}
      <motion.div
        className="flex items-center gap-4 mb-8"
        variants={fadeIn}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        custom={0.2}
      >
        <span
          className="font-mono text-[11px] tracking-[0.15em] uppercase text-text-secondary border border-white/[0.08] px-4 py-1.5 rounded-none"
        >
          Frontend Engineer
        </span>
        <span className="font-mono text-[11px] tracking-[0.15em] text-text-secondary/60 hidden sm:inline">
          SYSTEM_READY: <span className="text-green-400/80">TRUE</span>
        </span>
      </motion.div>

      {/* ── Hero Title ── */}
      <motion.h1
        className="font-geist font-[800] text-text-primary leading-[0.9] tracking-[-0.03em] mb-8 relative"
        style={{ fontSize: "clamp(72px, 8vw, 140px)" }}
        variants={fadeUp}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        custom={0.3}
      >
        ABINASH
        {/* Subtle heading glow */}
        <div
          className="absolute -inset-10 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(255,255,255,0.04) 0%, transparent 70%)",
            filter: "blur(40px)",
            zIndex: -1,
          }}
          aria-hidden="true"
        />
      </motion.h1>

      {/* ── Description ── */}
      <motion.p
        className="text-text-secondary text-[18px] sm:text-[20px] leading-relaxed max-w-[650px] mb-10 font-geist font-normal"
        variants={fadeIn}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        custom={0.6}
      >
        Crafting high-performance interfaces with precision engineering.
        Focused on motion, interaction design, and pixel-perfect details
        that transform digital experiences.
      </motion.p>

      {/* ── CTA Buttons ── */}
      <motion.div
        className="flex items-center gap-4 flex-wrap"
        variants={slideUp}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        custom={0.8}
      >
        {/* Primary */}
        <a
          href="#projects"
          id="cta-view-projects"
          className="group font-mono text-[12px] tracking-[0.12em] uppercase px-7 py-3.5 bg-white text-[#0B0B0B] rounded-none transition-all duration-300 glow-soft-hover hover:bg-white/90"
        >
          View Projects
        </a>

        {/* Secondary */}
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          id="cta-github"
          className="group font-mono text-[12px] tracking-[0.12em] uppercase px-7 py-3.5 border border-white/[0.12] text-text-primary rounded-none transition-all duration-300 hover:border-white/30 glow-soft-hover"
        >
          GitHub
        </a>
      </motion.div>
    </div>
  );
}
