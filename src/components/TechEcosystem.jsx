import React, { useState } from "react";
import { motion } from "motion/react";

// ─── 8 Slots Data Matching Exact Reference Layout ───────────────────────────
const CATEGORIES = [
  {
    id: "frontend",
    tag: "S01 E01",
    match: "99% Match",
    subHeader: "FRONTEND ARCHITECTURE",
    title: "Frontend Frameworks",
    description:
      "Building interactive, accessible, and performant user interfaces.",
    direction: { x: -80, y: -70, rotate: -3 }, // Top-Left
    pills: ["React", "JavaScript", "Framer Motion", "Redux Toolkit", "Vite"],
  },
  {
    id: "styling",
    tag: "S01 E02",
    match: "98% Match",
    subHeader: "UI/UX & MOTION DESIGN",
    title: "Styling & Design Systems",
    description:
      "Pixel-perfect interfaces with modern CSS systems and micro-interactions.",
    direction: { x: 0, y: -80, rotate: 0 }, // Top-Center
    pills: [
      "Tailwind CSS",
      "Bootstrap",
      "CSS",
      "Responsive Design",
      "Glassmorphism",
      "Figma",
    ],
  },
  {
    id: "backend",
    tag: "S01 E03",
    match: "97% Match",
    subHeader: "SERVER-SIDE ARCHITECTURE",
    title: "Backend Development",
    description:
      "Designing scalable APIs, authentication systems, and server architectures.",
    direction: { x: 80, y: -70, rotate: 3 }, // Top-Right
    pills: ["Node.js", "Express.js", "REST APIs", "JWT", "Socket.IO", "SSE"],
  },
  {
    id: "databases",
    tag: "S01 E04",
    match: "97% Match",
    subHeader: "DATA & PERSISTENCE",
    title: "Databases & Storage",
    description:
      "Working with structured and document-based data stores for applications.",
    direction: { x: -90, y: 0, rotate: -2 }, // Middle-Left
    pills: ["MongoDB", "Mongoose", "PostgreSQL", "Firebase"],
  },
  {
    id: "realtime",
    tag: "S01 E05",
    match: "96% Match",
    subHeader: "REAL-TIME SYSTEMS",
    title: "Real-Time & Streams",
    description:
      "Building responsive systems that synchronize data and events in real time.",
    direction: { x: 90, y: 0, rotate: 2 }, // Middle-Right
    pills: ["Socket.IO", "WebSockets"],
  },
  {
    id: "devops",
    tag: "S01 E06",
    match: "100% Match",
    subHeader: "DEVOPS & DEPLOYMENT",
    title: "Performance & CI/CD",
    description:
      "Shipping production-ready software with modern automated workflows.",
    direction: { x: -80, y: 70, rotate: -3 }, // Bottom-Left
    pills: ["Git", "GitHub", "Vercel", "Render", "npm", "Netlify"],
  },
  {
    id: "testing",
    tag: "S01 E07",
    match: "95% Match",
    subHeader: "QUALITY & DEV EXPERIENCE",
    title: "Testing & API Tools",
    description:
      "Debugging, testing, and validating applications throughout development.",
    direction: { x: 0, y: 80, rotate: 0 }, // Bottom-Center
    pills: [
      "Postman",
      "Jest",
      "Chrome DevTools",
      "ESLint",
      "VS Code",
      "Cursor",
    ],
  },
  {
    id: "architecture",
    tag: "S01 E08",
    match: "94% Match",
    subHeader: "SOFTWARE ENGINEERING",
    title: "Architecture & DSA",
    description:
      "Applying engineering principles to build maintainable scalable systems.",
    direction: { x: 80, y: 70, rotate: 3 }, // Bottom-Right
    pills: ["DSA", "OOP", "Clean Architecture", "Scalability"],
  },
];

// ─── Individual HUD Pill ──────────────────────────────────────────────────────
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
          ? "rgba(255, 77, 77, 0.18)"
          : "rgba(255, 255, 255, 0.05)",
        border: hovered
          ? "1px solid rgba(255, 77, 77, 0.5)"
          : "1px solid rgba(255, 255, 255, 0.09)",
        color: hovered ? "#ffffff" : "rgba(255, 255, 255, 0.7)",
        boxShadow: hovered ? "0 0 12px rgba(255, 77, 77, 0.25)" : "none",
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
      className="relative flex flex-col w-full h-full min-h-[250px] sm:min-h-[270px] rounded-2xl overflow-hidden"
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
                duration: 0.65,
                delay: 0.02 * index,
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
                duration: 0.4,
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
            ? "1px solid rgba(255, 77, 77, 0.55)"
            : "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow:
          hovered && isOpen
            ? "0 0 35px rgba(255, 77, 77, 0.3), 0 20px 50px rgba(0, 0, 0, 0.95)"
            : "0 15px 35px rgba(0, 0, 0, 0.85)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <div className="p-5 sm:p-6 flex flex-col h-full gap-3 relative z-10">
        {/* Top Header Row with Red HUD Chips */}
        <div className="flex items-center justify-between">
          <span className="px-2 py-0.5 rounded-full font-mono text-[9px] sm:text-[10px] font-bold text-[#ff4d4d] bg-[#ff4d4d]/10 border border-[#ff4d4d]/30">
            {category.tag}
          </span>
          <span className="font-mono text-[9.5px] sm:text-[10px] tracking-wider text-[#ff4d4d] flex items-center gap-1.5">
            {category.match}
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ff4d4d] shadow-[0_0_6px_#ff4d4d]" />
          </span>
        </div>

        {/* Subheader & Bold Title */}
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40 mb-1">
            {category.subHeader}
          </p>
          <h3 className="font-geist font-[800] text-white text-base sm:text-xl tracking-tight leading-snug">
            {category.title}
          </h3>
          <p className="font-geist text-[11.5px] sm:text-[12.5px] text-white/50 mt-1.5 leading-relaxed">
            {category.description}
          </p>
        </div>

        <div className="w-full h-px bg-white/[0.06] my-auto" />

        {/* Pills List */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {category.pills.map((pill, pillIdx) => (
            <TechPill key={pill} label={pill} index={pillIdx} isOpen={isOpen} />
          ))}
        </div>
      </div>

      {/* Red Corner Status Dot */}
      <div className="absolute bottom-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-[#ff4d4d] shadow-[0_0_8px_#ff4d4d]" />
    </motion.article>
  );
}

// ─── Compact Center Trigger Button (Slightly smaller than outer cards) ───────
function CyberFolderTrigger({ isOpen, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-3">
      <motion.button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.96 }}
        className="relative z-40 w-full max-w-[90%] sm:max-w-[85%] h-[85%] sm:h-[88%] rounded-2xl flex flex-col items-center justify-center p-5 outline-none cursor-pointer overflow-hidden transition-all duration-300"
        style={{
          background: "linear-gradient(180deg, #18181b 0%, #0d0d0f 100%)",
          border:
            hovered || isOpen
              ? "1px solid rgba(255, 77, 77, 0.65)"
              : "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow:
            hovered || isOpen
              ? "0 0 45px rgba(255, 77, 77, 0.35), 0 20px 50px rgba(0, 0, 0, 0.95)"
              : "0 15px 35px rgba(0, 0, 0, 0.85)",
        }}
        aria-expanded={isOpen}
      >
        {/* Top Folder Notch Tab */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-2.5 rounded-b-md border-b border-x transition-colors duration-300"
          style={{
            background: "#111113",
            borderColor:
              hovered || isOpen
                ? "rgba(255, 77, 77, 0.5)"
                : "rgba(255, 255, 255, 0.15)",
          }}
        />

        {/* Center Play Capsule */}
        <div className="flex flex-col items-center gap-2.5">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg"
            style={{
              background:
                hovered || isOpen
                  ? "rgba(255, 77, 77, 0.18)"
                  : "rgba(255, 255, 255, 0.05)",
              border:
                hovered || isOpen
                  ? "1px solid rgba(255, 77, 77, 0.5)"
                  : "1px solid rgba(255, 255, 255, 0.12)",
            }}
          >
            <span
              className="inline-block transition-transform duration-300 text-base text-white ml-0.5"
              style={{
                transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
              }}
            >
              ▶
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#ff4d4d] drop-shadow-[0_0_10px_rgba(255,77,77,0.4)]">
              ARCHIVE_SLOTS
            </span>
            <span className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-white/40 mt-0.5">
              {isOpen ? "Collapse System" : "Click To Deploy 08 Slots"}
            </span>
          </div>
        </div>

        {/* Small Bottom Accent Line */}
        <div className="absolute bottom-3 w-10 h-1 rounded-full bg-white/20" />
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
      className="relative w-full min-h-[1050px] lg:min-h-screen flex items-center justify-center overflow-hidden py-24 bg-black"
    >
      {/* ── Low-Opacity Background Typography ("SKILLS" / "STACK") ── */}
      <div
        className="absolute inset-0 z-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-geist font-[900] tracking-[-0.04em] uppercase text-center"
          style={{
            fontSize: "clamp(90px, 22vw, 340px)",
            lineHeight: 0.75,
            color: "rgba(255, 255, 255, 0.012)",
            WebkitTextStroke: "1px rgba(255, 255, 255, 0.05)",
            filter: "drop-shadow(0 0 50px rgba(255, 255, 255, 0.02))",
          }}
        >
          SKILLS
        </span>
      </div>

      {/* ── Red Atmospheric Glow (Visible when open) ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0.25 }}
        transition={{ duration: 0.7 }}
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255, 30, 30, 0.22) 0%, rgba(180, 10, 10, 0.08) 50%, transparent 80%)",
          filter: "blur(60px)",
        }}
      />

      {/* ── Center Glow Behind Trigger ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 50, 50, 0.26) 0%, rgba(255, 50, 50, 0.04) 55%, transparent 70%)",
          filter: "blur(75px)",
        }}
      />

      {/* ── 3x3 Matrix Grid ── */}
      <div className="relative z-20 w-full max-w-[1550px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col items-center">
        <div className="relative w-full">
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 min-h-[720px] transition-all duration-500 ${
              isOpen ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            {/* Row 1 */}
            <DirectionalCategoryCard
              category={CATEGORIES[0]}
              index={0}
              isOpen={isOpen}
            />
            <DirectionalCategoryCard
              category={CATEGORIES[1]}
              index={1}
              isOpen={isOpen}
            />
            <DirectionalCategoryCard
              category={CATEGORIES[2]}
              index={2}
              isOpen={isOpen}
            />

            {/* Row 2 */}
            <DirectionalCategoryCard
              category={CATEGORIES[3]}
              index={3}
              isOpen={isOpen}
            />

            {/* Center Trigger Key (Slightly smaller, centered slot) */}
            <div className="flex items-center justify-center pointer-events-auto z-40 w-full h-full">
              <CyberFolderTrigger
                isOpen={isOpen}
                onClick={() => setIsOpen((prev) => !prev)}
              />
            </div>

            <DirectionalCategoryCard
              category={CATEGORIES[4]}
              index={4}
              isOpen={isOpen}
            />

            {/* Row 3 */}
            <DirectionalCategoryCard
              category={CATEGORIES[5]}
              index={5}
              isOpen={isOpen}
            />
            <DirectionalCategoryCard
              category={CATEGORIES[6]}
              index={6}
              isOpen={isOpen}
            />
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
