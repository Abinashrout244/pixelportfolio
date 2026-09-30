import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.1, 0.25, 1],
      delay,
    },
  }),
};

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay,
    },
  }),
};

const slideUp = {
  hidden: { opacity: 0, y: 16 },
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
    <div className="flex flex-col justify-center w-full lg:max-w-[58%] xl:max-w-[62%] px-4 sm:px-6 md:px-8 lg:px-0 text-center lg:text-left items-center lg:items-start z-10 mx-auto lg:mx-0">
      {/* ── Labels Row ── */}
      <motion.div
        className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 mb-4 sm:mb-6"
        variants={fadeIn}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        custom={0.15}
      >
        <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-text-secondary border border-white/[0.1] bg-white/[0.02] backdrop-blur-sm px-3 sm:px-3.5 py-1.5 rounded-none whitespace-nowrap">
          FULL-STACK DEVELOPER
        </span>
        <div className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-[11px] tracking-[0.15em] text-text-secondary/70 border border-transparent px-2 py-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34d399] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34d399] shadow-[0_0_8px_#34d399]" />
          </span>
          <span>
            SYSTEM_READY:{" "}
            <span className="text-[#34d399] font-semibold">TRUE</span>
          </span>
        </div>
      </motion.div>

      {/* ── Hero Title ── */}
      <motion.h1
        className="font-geist font-[800] text-text-primary leading-[0.92] tracking-[-0.04em] mb-4 sm:mb-6 relative select-none"
        style={{ fontSize: "clamp(44px, 12vw, 128px)" }}
        variants={fadeUp}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        custom={0.25}
      >
        ABINASH
        {/* Ambient Glow */}
        <div
          className="absolute -inset-x-8 -inset-y-4 pointer-events-none -z-10"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255, 77, 77, 0.12) 0%, transparent 70%)",
            filter: "blur(48px)",
          }}
          aria-hidden="true"
        />
      </motion.h1>

      {/* ── Description ── */}
      <motion.p
        className="text-text-secondary text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-[560px] lg:max-w-[580px] mb-6 sm:mb-8 font-geist font-normal text-balance"
        variants={fadeIn}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        custom={0.4}
      >
        Building modern full-stack experiences with clean architecture,
        thoughtful UI, and scalable backend systems.
      </motion.p>

      {/* ── CTA Buttons ── */}
      <motion.div
        className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full sm:w-auto"
        variants={slideUp}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        custom={0.55}
      >
        {/* Primary Button */}
        <div className="relative group">
          {/* Animated Red Backdrop Blur Glow on Hover */}
          <div className="absolute -inset-2 rounded-none bg-[#34d399]/30 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100 group-hover:scale-105 pointer-events-none" />
          <Link
            to="/projects"
            id="cta-view-projects"
            className="relative inline-flex items-center justify-center font-mono text-[11px] sm:text-[12px] tracking-[0.12em] uppercase px-6 sm:px-7 py-3 sm:py-3.5 bg-white text-[#0B0B0B] font-medium transition-all duration-300 hover:bg-[#34d399] hover:text-white active:scale-[0.98] text-center w-full sm:w-auto overflow-hidden border border-transparent hover:border-[#34d399]"
          >
            <span className="relative z-10">View Projects</span>
            {/* Shimmer line on hover */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </Link>
        </div>

        {/* Secondary Button */}
        <div className="relative group">
          {/* Animated Red Backdrop Blur Glow on Hover */}
          <div className="absolute -inset-2 rounded-none bg-[#34d399]/20 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100 group-hover:scale-105 pointer-events-none" />
          <a
            href="https://github.com/Abinashrout244"
            target="_blank"
            rel="noopener noreferrer"
            id="cta-github"
            className="relative inline-flex items-center justify-center gap-2 font-mono text-[11px] sm:text-[12px] tracking-[0.12em] uppercase px-6 sm:px-7 py-3 sm:py-3.5 border border-white/[0.12] bg-white/[0.02] backdrop-blur-sm text-text-primary transition-all duration-300 hover:border-[#34d399]/60 hover:bg-[#34d399]/[0.08] hover:text-white active:scale-[0.98] text-center w-full sm:w-auto"
          >
            <span>GitHub</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3.5 h-3.5 text-text-secondary group-hover:text-[#34d399] transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
        </div>
      </motion.div>
    </div>
  );
}
