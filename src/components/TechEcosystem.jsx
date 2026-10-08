import React, { useState } from "react";
import { motion } from "motion/react";
import { CATEGORIES } from "../data/techEcoSystem";

function TechPill({ label, index, isOpen }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.span
      role="listitem"
      custom={index}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.28, delay: 0.1 + index * 0.025 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="px-2.5 py-1 rounded-md font-mono text-[10px] sm:text-[11px] font-medium tracking-wider transition-all duration-200 select-none cursor-default"
      style={{
        background: hovered
          ? "rgba(52, 211, 153, 0.18)"
          : "rgba(255, 255, 255, 0.05)",
        border: hovered
          ? "1px solid rgba(52, 211, 153, 0.5)"
          : "1px solid rgba(255, 255, 255, 0.09)",
        color: hovered ? "#ffffff" : "rgba(255, 255, 255, 0.7)",
        boxShadow: hovered ? "0 0 12px rgba(52, 211, 153, 0.25)" : "none",
      }}
    >
      {label}
    </motion.span>
  );
}

// ─── Directional HUD Category Card ───────────────────────────────────────────
function DirectionalCategoryCard({ category, index, isOpen }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      id={`tech-card-${category.id}`}
      className={`relative flex flex-col w-full rounded-xl sm:rounded-2xl overflow-hidden transition-[border-color,box-shadow] duration-300 ${
        // On mobile: collapsible height when closed to eliminate massive dead space
        isOpen
          ? "min-h-[200px] sm:min-h-[270px] flex"
          : "hidden lg:flex min-h-[270px]"
      }`}
      initial={{
        opacity: 0,
        x: category.direction.x,
        y: category.direction.y,
        scale: 0.8,
        rotate: category.direction.rotate,
      }}
      animate={
        isOpen
          ? {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotate: 0,
              transition: {
                duration: 0.6,
                delay: 0.03 * index,
                ease: [0.16, 1, 0.3, 1],
              },
            }
          : {
              opacity: 0,
              x: category.direction.x,
              y: category.direction.y,
              scale: 0.78,
              rotate: category.direction.rotate,
              transition: {
                duration: 0.35,
                ease: [0.7, 0, 0.84, 0],
              },
            }
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={isOpen ? { y: -4, scale: 1.015 } : {}}
      style={{
        background: "linear-gradient(180deg, #18181b 0%, #0d0d0f 100%)",
        border:
          hovered && isOpen
            ? "1px solid rgba(52, 211, 153, 0.55)"
            : "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow:
          hovered && isOpen
            ? "0 0 30px rgba(52, 211, 153, 0.28), 0 20px 40px rgba(0, 0, 0, 0.95)"
            : "0 10px 25px rgba(0, 0, 0, 0.7)",
      }}
    >
      <div className="p-4 sm:p-6 flex flex-col h-full gap-2 sm:gap-3 relative z-10">
        {/* Top Header Row with Green HUD Chips */}
        <div className="flex items-center justify-between">
          <span className="px-2 py-0.5 rounded-full font-mono text-[8.5px] sm:text-[10px] font-bold text-[#34d399] bg-[#34d399]/10 border border-[#34d399]/30">
            {category.tag}
          </span>
          <span className="font-mono text-[9px] sm:text-[10px] tracking-wider text-[#34d399] flex items-center gap-1.5">
            {category.match}
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#34d399] shadow-[0_0_6px_#34d399]" />
          </span>
        </div>

        {/* Subheader & Bold Title */}
        <div>
          <p className="font-mono text-[8.5px] sm:text-[9px] uppercase tracking-[0.2em] text-white/40 mb-0.5">
            {category.subHeader}
          </p>
          <h3 className="font-geist font-[800] text-white text-base sm:text-xl tracking-tight leading-snug">
            {category.title}
          </h3>
          <p className="font-geist text-[11px] sm:text-[12.5px] text-white/50 mt-1 leading-relaxed line-clamp-2 sm:line-clamp-none">
            {category.description}
          </p>
        </div>

        <div className="w-full h-px bg-white/[0.06] my-auto" />

        {/* Pills List */}
        <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-auto">
          {category.pills.map((pill, pillIdx) => (
            <TechPill key={pill} label={pill} index={pillIdx} isOpen={isOpen} />
          ))}
        </div>
      </div>

      {/* Green Corner Status Dot */}
      <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-[#34d399] shadow-[0_0_8px_#34d399]" />
    </motion.article>
  );
}

// ─── Compact Center Trigger Button (Slightly smaller than outer cards) ───────
function CyberFolderTrigger({ isOpen, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative w-full h-full flex items-center justify-center p-1 sm:p-3">
      <motion.button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="relative z-40 w-full max-w-full sm:max-w-[85%] min-h-[110px] sm:min-h-[220px] rounded-xl sm:rounded-2xl flex flex-row sm:flex-col items-center justify-center gap-4 sm:gap-0 p-4 sm:p-5 outline-none cursor-pointer overflow-hidden transition-all duration-300"
        style={{
          background: "linear-gradient(180deg, #18181b 0%, #0d0d0f 100%)",
          border:
            hovered || isOpen
              ? "1px solid rgba(52, 211, 153, 0.65)"
              : "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow:
            hovered || isOpen
              ? "0 0 35px rgba(52, 211, 153, 0.3), 0 15px 35px rgba(0, 0, 0, 0.95)"
              : "0 10px 25px rgba(0, 0, 0, 0.85)",
        }}
        aria-expanded={isOpen}
      >
        {/* Top Folder Notch Tab (Desktop only) */}
        <div
          className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-24 h-2.5 rounded-b-md border-b border-x transition-colors duration-300"
          style={{
            background: "#111113",
            borderColor:
              hovered || isOpen
                ? "rgba(52, 211, 153, 0.5)"
                : "rgba(255, 255, 255, 0.15)",
          }}
        />

        {/* Center Play Capsule */}
        <div className="flex flex-row sm:flex-col items-center gap-3 sm:gap-2.5">
          <div
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 shadow-md"
            style={{
              background:
                hovered || isOpen
                  ? "rgba(52, 211, 153, 0.18)"
                  : "rgba(255, 255, 255, 0.05)",
              border:
                hovered || isOpen
                  ? "1px solid rgba(52, 211, 153, 0.5)"
                  : "1px solid rgba(255, 255, 255, 0.12)",
            }}
          >
            <span
              className="inline-block transition-transform duration-300 text-sm sm:text-base text-white ml-0.5"
              style={{
                transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
              }}
            >
              ▶
            </span>
          </div>

          <div className="flex flex-col items-start sm:items-center text-left sm:text-center">
            <span className="font-mono text-[11px] sm:text-sm font-bold tracking-[0.18em] uppercase text-[#34d399] drop-shadow-[0_0_10px_rgba(52,211,153,0.4)]">
              ARCHIVE_SLOTS
            </span>
            <span className="font-mono text-[8px] sm:text-[8.5px] uppercase tracking-[0.16em] text-white/40 mt-0.5">
              {isOpen ? "Collapse System" : "Click To Deploy 08 Slots"}
            </span>
          </div>
        </div>

        {/* Small Bottom Accent Line (Desktop only) */}
        <div className="hidden sm:block absolute bottom-3 w-10 h-1 rounded-full bg-white/20" />
      </motion.button>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function TechEcosystem() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      id="stack"
      className="relative w-full min-h-[500px] lg:min-h-screen flex items-center justify-center overflow-hidden py-12 sm:py-24 bg-black"
    >
      {/* ── Low-Opacity Background Typography ── */}
      <div
        className="absolute inset-0 z-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-geist font-[900] tracking-[-0.04em] uppercase text-center"
          style={{
            fontSize: "clamp(80px, 20vw, 340px)",
            lineHeight: 0.75,
            color: "rgba(255, 255, 255, 0.012)",
            WebkitTextStroke: "1px rgba(255, 255, 255, 0.05)",
            filter: "drop-shadow(0 0 50px rgba(255, 255, 255, 0.02))",
          }}
        >
          SKILLS
        </span>
      </div>

      {/* ── Green Atmospheric Glow ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0.25 }}
        transition={{ duration: 0.7 }}
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(16, 185, 129, 0.22) 0%, rgba(6, 78, 59, 0.1) 50%, transparent 80%)",
          filter: "blur(60px)",
        }}
      />

      {/* ── Center Glow Behind Trigger ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[300px] sm:h-[450px] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(52, 211, 153, 0.24) 0%, rgba(52, 211, 153, 0.03) 55%, transparent 70%)",
          filter: "blur(75px)",
        }}
      />

      {/* ── Matrix Grid ── */}
      <div className="relative z-20 w-full max-w-[1550px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col items-center">
        <div className="relative w-full">
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 min-h-0 lg:min-h-[720px] transition-all duration-500 ${
              isOpen
                ? "pointer-events-auto"
                : "pointer-events-auto lg:pointer-events-none"
            }`}
          >
            {/* Slot 0 */}
            <DirectionalCategoryCard
              category={CATEGORIES[0]}
              index={0}
              isOpen={isOpen}
            />

            {/* Slot 1 */}
            <DirectionalCategoryCard
              category={CATEGORIES[1]}
              index={1}
              isOpen={isOpen}
            />

            {/* Slot 2 */}
            <DirectionalCategoryCard
              category={CATEGORIES[2]}
              index={2}
              isOpen={isOpen}
            />

            {/* Slot 3 */}
            <DirectionalCategoryCard
              category={CATEGORIES[3]}
              index={3}
              isOpen={isOpen}
            />

            {/* 
              CENTER TRIGGER:
              - Mobile / Tablet: 'order-first' puts it at the top so users can toggle it instantly
              - Desktop (lg:): 'lg:order-none' returns it to the center (slot 4) in the 3x3 grid
            */}
            <div className="order-first lg:order-none flex items-center justify-center pointer-events-auto z-40 w-full h-full">
              <CyberFolderTrigger
                isOpen={isOpen}
                onClick={() => setIsOpen((prev) => !prev)}
              />
            </div>

            {/* Slot 4 */}
            <DirectionalCategoryCard
              category={CATEGORIES[4]}
              index={4}
              isOpen={isOpen}
            />

            {/* Slot 5 */}
            <DirectionalCategoryCard
              category={CATEGORIES[5]}
              index={5}
              isOpen={isOpen}
            />

            {/* Slot 6 */}
            <DirectionalCategoryCard
              category={CATEGORIES[6]}
              index={6}
              isOpen={isOpen}
            />

            {/* Slot 7 */}
            <DirectionalCategoryCard
              category={CATEGORIES[7]}
              index={7}
              isOpen={isOpen}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
