import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring } from "motion/react";

// ─── Deterministic RNG ───────────────────────────────────────────────────────
const rng = (n, salt) => {
  const x = Math.sin(n * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

// ─── Background stars ────────────────────────────────────────────────────────
const BG_STARS = Array.from({ length: 45 }, (_, i) => ({
  id: i,
  left: rng(i, 7) * 100,
  top: rng(i, 14) * 100,
  size: 0.5 + rng(i, 21) * 1.5,
  opacity: 0.04 + rng(i, 28) * 0.09,
  duration: 4 + rng(i, 35) * 6,
  delay: rng(i, 42) * -8,
}));

// ─── Ambient orbs ────────────────────────────────────────────────────────────
const ORBS = [
  { id: 0, left: "5%",  top: "15%", w: 350, h: 350, alpha: 0.015, dur: 24, delay: 0   },
  { id: 1, left: "65%", top: "55%", w: 290, h: 290, alpha: 0.012, dur: 30, delay: -12 },
  { id: 2, left: "40%", top: "85%", w: 220, h: 220, alpha: 0.010, dur: 20, delay: -7  },
  { id: 3, left: "88%", top: "10%", w: 170, h: 170, alpha: 0.008, dur: 35, delay: -22 },
];

// ─── Education data ──────────────────────────────────────────────────────────
const EDUCATION = [
  {
    id: "btech",
    index: "01",
    status: "CURRENTLY PURSUING",
    degree: "Bachelor of Technology",
    stream: "Computer Science & Engineering",
    institution: "Oxford College of Engineering & Management",
    years: "2024 — 2028",
    location: "Bhubaneswar, Odisha",
    leftPanel: {
      title: "CORE LEARNING",
      items: [
        "Data Structures & Algorithms",
        "Object-Oriented Programming",
        "Database Management Systems",
        "Operating Systems",
        "Computer Networks",
        "Software Engineering",
        "Web Technologies",
      ],
    },
    rightPanel: {
      title: "CURRENT FOCUS",
      status: "ACTIVE",
      items: [
        "Building scalable MERN applications",
        "Learning Next.js & Server Components",
        "Practising DSA daily on LeetCode",
        "Exploring System Design",
        "Improving UI Engineering & Motion",
      ],
    },
  },
  {
    id: "hsc",
    index: "02",
    status: null,
    degree: "Higher Secondary Education",
    stream: "Science Stream",
    institution: "Shanti Institute of Management Studies",
    years: "2022 — 2024",
    location: "Odisha, India",
    leftPanel: {
      title: "SUBJECTS STUDIED",
      items: [
        "Physics",
        "Chemistry",
        "Mathematics",
        "Computer Science",
        "English",
      ],
    },
    rightPanel: {
      title: "ACADEMIC HIGHLIGHTS",
      status: "COMPLETED",
      score: "86%",
      scoreLabel: "Science Stream",
      items: [
        "Strong analytical foundation",
        "Top performer in Mathematics",
        "Computer Science distinction",
        "Completed successfully",
      ],
    },
  },
];

// ─── prefers-reduced-motion hook ────────────────────────────────────────────
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const h = () => setReduced(mq.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);
  return reduced;
}

// ─── Section-level mouse spotlight ──────────────────────────────────────────
function SectionSpotlight({ sectionRef }) {
  const [pos, setPos] = useState({ x: 50, y: 30 });
  const rawX = useMotionValue(50);
  const rawY = useMotionValue(30);
  useSpring(rawX, { stiffness: 50, damping: 22 });
  useSpring(rawY, { stiffness: 50, damping: 22 });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      setPos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    el.addEventListener("mousemove", onMove, { passive: true });
    return () => el.removeEventListener("mousemove", onMove);
  }, [sectionRef]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div
        style={{
          position: "absolute",
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          width: "750px",
          height: "750px",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(255,255,255,0.016) 0%, transparent 65%)",
          filter: "blur(45px)",
          transition: "left 0.2s ease, top 0.2s ease",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

// ─── Timeline dot with pulse ─────────────────────────────────────────────────
function TimelineDot({ inView, delay = 0 }) {
  return (
    <motion.div
      className="relative flex-shrink-0 flex items-center justify-center"
      style={{ width: "20px", height: "20px" }}
      initial={{ opacity: 0, scale: 0 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Pulse ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "20px",
          height: "20px",
          border: "1px solid rgba(255,255,255,0.18)",
          background: "transparent",
        }}
        animate={{ scale: [1, 1.7, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut", delay: delay + 0.8 }}
      />
      {/* Core dot */}
      <div
        className="rounded-full"
        style={{
          width: "8px",
          height: "8px",
          background: "rgba(255,255,255,0.75)",
          boxShadow: "0 0 10px rgba(255,255,255,0.4), 0 0 20px rgba(255,255,255,0.15)",
        }}
      />
    </motion.div>
  );
}

// ─── Left info panel (Core Learning / Subjects) ──────────────────────────────
function LeftPanel({ panel, inView, cardIndex }) {
  return (
    <div
      className="flex flex-col h-full rounded-[16px] p-5 sm:p-6"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div style={{ width: "3px", height: "14px", background: "rgba(255,255,255,0.25)", borderRadius: "2px" }} />
        <span
          className="font-mono text-[9px] tracking-[0.22em] uppercase"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          {panel.title}
        </span>
      </div>
      <ul className="flex flex-col gap-2.5">
        {panel.items.map((item, i) => (
          <motion.li
            key={item}
            className="flex items-start gap-2.5"
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{
              duration: 0.4,
              delay: 0.45 + cardIndex * 0.15 + i * 0.06,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <span
              className="mt-[5px] flex-shrink-0 rounded-full"
              style={{ width: "4px", height: "4px", background: "rgba(255,255,255,0.25)" }}
            />
            <span
              className="font-geist text-[13px] sm:text-[14px] leading-snug"
              style={{ color: "rgba(255,255,255,0.48)" }}
            >
              {item}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

// ─── Right dashboard panel ───────────────────────────────────────────────────
function RightPanel({ panel, inView, cardIndex }) {
  const hasScore = !!panel.score;

  return (
    <div
      className="flex flex-col h-full rounded-[16px] overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.022)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Panel header bar */}
      <div
        className="flex items-center justify-between px-5 py-3.5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <span
          className="font-mono text-[9px] tracking-[0.22em] uppercase"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          {panel.title}
        </span>
        <motion.span
          className="font-mono text-[8px] tracking-[0.18em] uppercase px-2 py-0.5 rounded-full"
          style={{
            background:
              panel.status === "ACTIVE"
                ? "rgba(134,239,172,0.08)"
                : "rgba(255,255,255,0.06)",
            border:
              panel.status === "ACTIVE"
                ? "1px solid rgba(134,239,172,0.2)"
                : "1px solid rgba(255,255,255,0.1)",
            color:
              panel.status === "ACTIVE"
                ? "rgba(134,239,172,0.8)"
                : "rgba(255,255,255,0.4)",
          }}
          animate={
            panel.status === "ACTIVE"
              ? { opacity: [1, 0.6, 1] }
              : { opacity: 1 }
          }
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          ● {panel.status}
        </motion.span>
      </div>

      {/* Score widget (HSC only) */}
      {hasScore && (
        <div
          className="flex items-center gap-4 px-5 py-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div>
            <div
              className="font-geist font-[800] text-white leading-none"
              style={{ fontSize: "clamp(28px, 3vw, 36px)", letterSpacing: "-0.03em" }}
            >
              {panel.score}
            </div>
            <div
              className="font-mono text-[9px] tracking-[0.18em] uppercase mt-1"
              style={{ color: "rgba(255,255,255,0.28)" }}
            >
              {panel.scoreLabel}
            </div>
          </div>
          <div
            className="flex-1 h-1.5 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: "rgba(255,255,255,0.3)" }}
              initial={{ width: "0%" }}
              animate={inView ? { width: "86%" } : { width: "0%" }}
              transition={{
                duration: 1.2,
                delay: 0.6 + cardIndex * 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </div>
        </div>
      )}

      {/* Items */}
      <div className="flex flex-col gap-0 flex-1 px-5 py-4">
        {panel.items.map((item, i) => (
          <motion.div
            key={item}
            className="flex items-center gap-3 py-2"
            style={{
              borderBottom:
                i < panel.items.length - 1
                  ? "1px solid rgba(255,255,255,0.04)"
                  : "none",
            }}
            initial={{ opacity: 0, x: 12 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
            transition={{
              duration: 0.38,
              delay: 0.5 + cardIndex * 0.15 + i * 0.065,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <span
              className="flex-shrink-0 rounded-sm"
              style={{
                width: "2px",
                height: "12px",
                background: "rgba(255,255,255,0.18)",
              }}
            />
            <span
              className="font-geist text-[12px] sm:text-[13px] leading-snug"
              style={{ color: "rgba(255,255,255,0.42)" }}
            >
              {item}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Education card ──────────────────────────────────────────────────────────
function EducationCard({ entry, index, inView }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotion();

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.article
      ref={cardRef}
      id={`edu-card-${entry.id}`}
      aria-label={`${entry.degree}, ${entry.institution}`}
      className="relative"
      initial={reduced ? {} : { opacity: 0, y: 52 }}
      animate={
        reduced ? {} : inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 52 }
      }
      transition={{
        duration: 0.78,
        delay: 0.22 + index * 0.18,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      whileHover={reduced ? {} : { y: -4 }}
      style={{ transformOrigin: "center bottom" }}
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute -inset-px rounded-[26px] pointer-events-none"
        animate={{
          opacity: hovered ? 1 : 0,
          boxShadow: hovered
            ? "0 0 0 1px rgba(255,255,255,0.1), 0 24px 80px rgba(0,0,0,0.7), 0 8px 30px rgba(255,255,255,0.04)"
            : "0 0 0 0px transparent",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Glass surface */}
      <div
        className="relative rounded-[24px] overflow-hidden"
        style={{
          background: hovered ? "rgba(255,255,255,0.036)" : "rgba(255,255,255,0.024)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: hovered
            ? "1px solid rgba(255,255,255,0.13)"
            : "1px solid rgba(255,255,255,0.07)",
          transition: "background 0.35s ease, border-color 0.35s ease",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.2)",
        }}
      >
        {/* Mouse follow inner glow */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[24px]"
          style={{
            background: hovered
              ? `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.05) 0%, transparent 70%)`
              : "none",
            transition: "background 0.08s ease",
          }}
          aria-hidden="true"
        />

        {/* Top shimmer */}
        <div
          className="absolute top-0 left-10 right-10 h-px pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.13), transparent)",
            opacity: hovered ? 1 : 0.45,
            transition: "opacity 0.35s ease",
          }}
          aria-hidden="true"
        />

        <div className="p-7 sm:p-9 lg:p-10">
          {/* ── Card top: degree + metadata ── */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6 mb-7">
            <div className="flex-1 min-w-0">
              {/* Status badge */}
              {entry.status && (
                <motion.div
                  className="inline-flex items-center gap-1.5 mb-3"
                  animate={{ opacity: [1, 0.65, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span
                    className="font-mono text-[8px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full"
                    style={{
                      background: "rgba(134,239,172,0.07)",
                      border: "1px solid rgba(134,239,172,0.18)",
                      color: "rgba(134,239,172,0.75)",
                    }}
                  >
                    ● {entry.status}
                  </span>
                </motion.div>
              )}

              {/* Degree */}
              <h3
                className="font-geist font-[700] text-white leading-tight mb-1"
                style={{ fontSize: "clamp(19px, 2.2vw, 26px)", letterSpacing: "-0.02em" }}
              >
                {entry.degree}
              </h3>

              {/* Stream */}
              <p
                className="font-geist text-[14px] sm:text-[15px] mb-4"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                {entry.stream}
              </p>

              {/* Metadata pills row */}
              <div className="flex flex-wrap gap-2">
                {[
                  { label: entry.institution },
                  { label: entry.years },
                  { label: entry.location },
                ].map((m) => (
                  <span
                    key={m.label}
                    className="inline-flex items-center font-mono text-[10px] tracking-[0.06em] px-3 py-1.5 rounded-full"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.38)",
                    }}
                  >
                    {m.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Index badge */}
            <div
              className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center self-start"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <span
                className="font-mono text-[10px] tracking-[0.1em]"
                style={{ color: "rgba(255,255,255,0.28)" }}
              >
                {entry.index}
              </span>
            </div>
          </div>

          {/* ── Divider ── */}
          <div
            className="mb-6 sm:mb-7"
            style={{ height: "1px", background: "rgba(255,255,255,0.05)" }}
          />

          {/* ── Two-panel content row ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <LeftPanel panel={entry.leftPanel} inView={inView} cardIndex={index} />
            <RightPanel panel={entry.rightPanel} inView={inView} cardIndex={index} />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Vertical timeline connector ─────────────────────────────────────────────
function TimelineConnector({ inView }) {
  return (
    <motion.div
      className="absolute left-[9px] top-0 bottom-0 w-px pointer-events-none"
      initial={{ scaleY: 0 }}
      animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
      transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: "rgba(255,255,255,0.06)",
        transformOrigin: "top center",
      }}
    />
  );
}

// ─── Main EducationSection ───────────────────────────────────────────────────
export default function EducationSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const timelineRef = useRef(null);

  const inView = useInView(sectionRef, { once: true, margin: "-60px" });
  const headingInView = useInView(headingRef, { once: true, margin: "-40px" });
  const timelineInView = useInView(timelineRef, { once: true, margin: "-40px" });

  const reduced = useReducedMotion();

  const mp = (initial, animate, transition) =>
    reduced ? {} : { initial, animate, transition };

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative w-full"
      style={{ backgroundColor: "#060606" }}
      aria-labelledby="education-heading"
    >
      {/* ── Top blend from TechEcosystem ── */}
      <div
        className="absolute top-0 left-0 right-0 h-40 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, #060606 0%, transparent 100%)" }}
        aria-hidden="true"
      />

      {/* ── Stars ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {BG_STARS.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              opacity: s.opacity,
              animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ── Ambient orbs ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {ORBS.map((orb) => (
          <div
            key={orb.id}
            className="absolute rounded-full"
            style={{
              left: orb.left,
              top: orb.top,
              width: orb.w,
              height: orb.h,
              background: `rgba(255,255,255,${orb.alpha})`,
              filter: "blur(70px)",
              animation: `floatOrb ${orb.dur}s ease-in-out ${orb.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ── Top radial glow ── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none z-0"
        aria-hidden="true"
        style={{
          width: "900px",
          height: "600px",
          background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.022) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* ── Mouse spotlight ── */}
      <div className="absolute inset-0 z-0">
        <SectionSpotlight sectionRef={sectionRef} />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-16 py-28 sm:py-32 lg:py-[140px]">

        {/* ═══ Section header — exact same pattern as TechEcosystem ═══ */}
        <div ref={headingRef} className="mb-16 sm:mb-20 lg:mb-24">

          {/* Label row */}
          <motion.div
            className="flex items-center gap-3 mb-6 sm:mb-8"
            {...mp(
              { opacity: 0, y: 16 },
              headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
              { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
            )}
          >
            <div className="h-px w-6" style={{ background: "rgba(255,255,255,0.2)" }} />
            <span
              className="font-mono text-[10px] tracking-[0.24em] uppercase"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Education
            </span>
          </motion.div>

          {/* Heading + description row */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between lg:gap-16">

            {/* ── h2 — identical styling to TECHNICAL / ECOSYSTEM ── */}
            <div className="flex-shrink-0">
              <motion.h2
                id="education-heading"
                className="font-geist font-[800] text-white leading-[0.92] tracking-tight"
                style={{ fontSize: "clamp(40px, 7.5vw, 90px)", letterSpacing: "-0.04em" }}
                {...mp(
                  { opacity: 0, x: -30 },
                  headingInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 },
                  { duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }
                )}
              >
                ACADEMIC
                <br />
                <span
                  style={{
                    WebkitTextStroke: "1px rgba(255,255,255,0.15)",
                    color: "transparent",
                  }}
                >
                  FOUNDATION
                </span>
              </motion.h2>
            </div>

            {/* Description */}
            <motion.p
              className="mt-6 lg:mt-0 font-geist text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.75] max-w-full lg:max-w-[520px]"
              style={{ color: "rgba(255,255,255,0.38)" }}
              {...mp(
                { opacity: 0, x: 24 },
                headingInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 },
                { duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }
              )}
            >
              My academic journey has built a strong foundation in computer science,
              software engineering, and problem-solving — while continuously strengthening
              practical development skills through projects and daily practice.
            </motion.p>
          </div>
        </div>

        {/* ═══ Vertical timeline + cards ═══ */}
        <div ref={timelineRef} className="relative">

          {/* Vertical line */}
          <motion.div
            className="absolute left-[9px] top-5 bottom-5 w-px hidden sm:block"
            style={{ background: "rgba(255,255,255,0.06)", transformOrigin: "top" }}
            initial={reduced ? {} : { scaleY: 0 }}
            animate={reduced ? {} : timelineInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Timeline items */}
          <div className="flex flex-col gap-10 sm:gap-12">
            {EDUCATION.map((entry, i) => (
              <div key={entry.id} className="flex items-start gap-6 sm:gap-8">

                {/* Timeline dot — hidden on very small mobile */}
                <div className="hidden sm:flex flex-col items-center pt-1 flex-shrink-0" style={{ width: "20px" }}>
                  <TimelineDot inView={timelineInView} delay={0.35 + i * 0.22} />
                </div>

                {/* Card */}
                <div className="flex-1 min-w-0">
                  <EducationCard entry={entry} index={i} inView={inView} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom accent ── */}
        <motion.div
          className="mt-20 sm:mt-24 flex items-center gap-6"
          {...mp(
            { opacity: 0 },
            inView ? { opacity: 1 } : { opacity: 0 },
            { duration: 1.2, delay: 1.1 }
          )}
        >
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.045)" }} />
          <span
            className="font-mono text-[10px] tracking-[0.22em] uppercase whitespace-nowrap"
            style={{ color: "rgba(255,255,255,0.18)" }}
          >
            Learning never stops
          </span>
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.045)" }} />
        </motion.div>
      </div>

      {/* ── Bottom fade ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10"
        style={{ background: "linear-gradient(to top, #060606 0%, transparent 100%)" }}
        aria-hidden="true"
      />
    </section>
  );
}
