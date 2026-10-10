import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useMotionValue,
  useTransform,
} from "motion/react";

// ─── Deterministic RNG ───────────────────────────────────────────────────────
const rng = (n, salt) => {
  const x = Math.sin(n * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

// ─── Reduced Motion Hook ─────────────────────────────────────────────────────
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

// ─── Background Stars ────────────────────────────────────────────────────────
const BG_STARS = Array.from({ length: 45 }, (_, i) => ({
  id: i,
  left: rng(i, 7) * 100,
  top: rng(i, 14) * 100,
  size: 0.5 + rng(i, 21) * 1.5,
  opacity: 0.04 + rng(i, 28) * 0.09,
  duration: 4 + rng(i, 35) * 6,
  delay: rng(i, 42) * -8,
}));

// ─── Ambient Orbs ────────────────────────────────────────────────────────────
const ORBS = [
  {
    id: 0,
    left: "5%",
    top: "15%",
    w: 350,
    h: 350,
    alpha: 0.015,
    dur: 24,
    delay: 0,
  },
  {
    id: 1,
    left: "65%",
    top: "55%",
    w: 290,
    h: 290,
    alpha: 0.012,
    dur: 30,
    delay: -12,
  },
  {
    id: 2,
    left: "40%",
    top: "85%",
    w: 220,
    h: 220,
    alpha: 0.01,
    dur: 20,
    delay: -7,
  },
  {
    id: 3,
    left: "88%",
    top: "10%",
    w: 170,
    h: 170,
    alpha: 0.008,
    dur: 35,
    delay: -22,
  },
];

// ─── Education Data ──────────────────────────────────────────────────────────
const EDUCATION = [
  {
    id: "btech",
    index: "01",
    status: "CURRENTLY PURSUING",
    degree: "Bachelor of Technology",
    stream: "Computer Science & Engineering",
    institution: "Oxford College Of Engineering & Management",
    years: "2024 — 2028",
    location: "Bhubaneswar, Odisha",
    leftPanel: {
      title: "CORE LEARNING",
      items: [
        "Data Structures",
        "Algorithms",
        "Web Development",
        "MERN Stack",
        "Database Systems",
        "Operating Systems",
        "Computer Networks",
        "Software Engineering",
      ],
    },
    rightPanel: {
      title: "CURRENT FOCUS",
      status: "ACTIVE",
      score: "8.7 CGPA",
      scoreLabel: "CGPA",
      items: [
        "Currently in 5th Semester",
        "Building full-stack applications",
        "Practising DSA consistently",
        "Improving React & MERN skills",
        "Exploring AI & scalable applications",
        "Working with Java and C++",
      ],
    },
  },
  {
    id: "hsc",
    index: "02",
    status: null,
    degree: "Higher Secondary Certificate",
    stream: "Science (PCM)",
    institution: "Shanti Institute of Management & Higher Secondary School",
    years: "2023 — 2024",
    location: "CDA-10, Cuttack, Odisha",
    leftPanel: {
      title: "SUBJECTS STUDIED",
      items: [
        "Physics",
        "Chemistry",
        "Mathematics",
        "English",
        "Odia",
        "Information Technology",
      ],
    },
    rightPanel: {
      title: "ACADEMIC HIGHLIGHTS",
      status: "COMPLETED",
      score: "86%",
      scoreLabel: "PERCENTAGE",
      items: [
        "Science stream with PCM",
        "Strong mathematical foundation",
        "Developed analytical thinking",
        "Improved problem-solving skills",
        "Prepared for engineering studies",
        "Board: CHSE Odisha",
      ],
    },
  },
  {
    id: "ssc",
    index: "03",
    status: null,
    degree: "Secondary School Certificate",
    stream: "General Studies",
    institution: "Baghua Brahmani Devi High School, Baghua",
    years: "2021 — 2022",
    location: "Balishai, Jajpur, Odisha",
    leftPanel: {
      title: "SUBJECTS STUDIED",
      items: [
        "Mathematics",
        "Science",
        "English",
        "Social Studies",
        "Computer Basics",
      ],
    },
    rightPanel: {
      title: "ACADEMIC HIGHLIGHTS",
      status: "COMPLETED",
      score: "85%",
      scoreLabel: "PERCENTAGE",
      items: [
        "Strong academic foundation",
        "Developed problem-solving skills",
        "Built basic computing knowledge",
        "Strengthened communication skills",
        "Board: BSE Odisha",
      ],
    },
  },
];

// ─── Section-level Mouse Spotlight ───────────────────────────────────────────
function SectionSpotlight({ sectionRef }) {
  const [pos, setPos] = useState({ x: 50, y: 30 });

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
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden rounded-none"
      aria-hidden="true"
    >
      <div
        style={{
          position: "absolute",
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          width: "750px",
          height: "750px",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(52, 211, 153, 0.08) 0%, rgba(16, 185, 129, 0.02) 40%, transparent 70%)",
          filter: "blur(50px)",
          transition: "left 0.2s ease, top 0.2s ease",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

// ─── Square Timeline Node ────────────────────────────────────────────────────
function TimelineSquareNode({ inView, delay = 0, active = false }) {
  return (
    <motion.div
      className="relative flex-shrink-0 flex items-center justify-center rounded-none"
      style={{ width: "22px", height: "22px" }}
      initial={{ opacity: 0, scale: 0 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute rounded-none"
        style={{
          width: "22px",
          height: "22px",
          border: active
            ? "1px solid rgba(52, 211, 153, 0.6)"
            : "1px solid rgba(255, 255, 255, 0.18)",
          background: active ? "rgba(52, 211, 153, 0.1)" : "transparent",
        }}
        animate={{
          scale: active ? [1, 1.6, 1] : [1, 1.4, 1],
          opacity: active ? [0.85, 0, 0.85] : [0.4, 0, 0.4],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeOut",
          delay: delay + 0.8,
        }}
      />

      <motion.div
        className="rounded-none border"
        animate={{
          backgroundColor: active
            ? "rgba(52, 211, 153, 1)"
            : "rgba(255, 255, 255, 0.85)",
          borderColor: active
            ? "rgba(52, 211, 153, 0.9)"
            : "rgba(255, 255, 255, 0.3)",
          boxShadow: active
            ? "0 0 16px rgba(52, 211, 153, 0.8), 0 0 32px rgba(52, 211, 153, 0.4)"
            : "0 0 10px rgba(255, 255, 255, 0.3)",
        }}
        style={{ width: "10px", height: "10px" }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

// ─── Education Card ──────────────────────────────────────────────────────────
function EducationCard({ entry, index, inView, active }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), {
    stiffness: 300,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), {
    stiffness: 300,
    damping: 25,
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const posX = (e.clientX - rect.left) / rect.width - 0.5;
    const posY = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(posX);
    y.set(posY);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      id={`edu-card-${entry.id}`}
      className="relative max-w-[1100px] mx-auto [perspective:1000px] rounded-none"
      initial={reduced ? {} : { opacity: 0, y: 35, scale: 0.94 }}
      animate={
        reduced
          ? {}
          : inView
            ? {
                opacity: active ? 1 : 0.45,
                y: 0,
                scale: active ? 1 : 0.965,
                filter: active ? "blur(0px)" : "blur(0.8px)",
              }
            : { opacity: 0, y: 35, scale: 0.94, filter: "blur(2px)" }
      }
      transition={{
        duration: 0.65,
        delay: 0.12 + index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* ── Exact Green Neon Backdrop Blur Glow ── */}
      <div
        className="absolute -inset-4 rounded-none pointer-events-none transition-all duration-500"
        style={{
          background:
            hovered || active
              ? "radial-gradient(circle at 50% 50%, rgba(52, 211, 153, 0.28) 0%, rgba(16, 185, 129, 0.1) 50%, transparent 75%)"
              : "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.05) 0%, transparent 70%)",
          filter: "blur(32px)",
          opacity: hovered ? 1 : active ? 0.85 : 0.2,
          transform: hovered ? "scale(1.03)" : "scale(0.98)",
        }}
      />

      {/* 3D Tilted Sharp Chassis */}
      <motion.div
        style={{
          rotateX: reduced ? 0 : rotateX,
          rotateY: reduced ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative rounded-none overflow-hidden bg-gradient-to-b from-[#141414] to-[#0a0a0a] transition-all duration-300"
      >
        {/* Dynamic Green Border */}
        <div
          className="absolute inset-0 rounded-none pointer-events-none transition-colors duration-300 z-20"
          style={{
            border:
              hovered || active
                ? "1px solid rgba(52, 211, 153, 0.5)"
                : "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow:
              hovered || active
                ? "0 0 35px rgba(52, 211, 153, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.15)"
                : "inset 0 1px 0 rgba(255, 255, 255, 0.05)",
          }}
        />

        {/* Top Shimmer Strip */}
        <div
          className="absolute inset-x-0 top-0 h-px pointer-events-none z-30 transition-opacity duration-300"
          style={{
            background:
              active || hovered
                ? "linear-gradient(90deg, transparent, rgba(52, 211, 153, 0.8), transparent)"
                : "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.12), transparent)",
          }}
        />

        {/* Dynamic Light Reflection Layer */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-none"
          style={{
            background: hovered
              ? `radial-gradient(400px circle at ${
                  (x.get() + 0.5) * 100
                }% ${(y.get() + 0.5) * 100}%, rgba(52, 211, 153, 0.08) 0%, transparent 80%)`
              : "none",
          }}
        />

        {/* Card Content Container */}
        <div className="p-5 sm:p-7 [transform:translateZ(20px)] relative z-10">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
            <div className="flex-1 min-w-0">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-1.5 mb-2">
                <span
                  className={`font-mono text-[8px] tracking-[0.18em] uppercase px-2 py-0.5 border rounded-none transition-colors duration-300 ${
                    entry.status === "CURRENTLY PURSUING" ||
                    entry.rightPanel?.status === "ACTIVE" ||
                    active
                      ? "bg-[#34d399]/10 border-[#34d399]/30 text-[#34d399]"
                      : "bg-white/5 border-white/10 text-white/50"
                  }`}
                >
                  ● {entry.status || entry.rightPanel?.status || "COMPLETED"}
                </span>
              </div>

              {/* Title & Stream */}
              <h3 className="font-geist font-[700] text-white text-[18px] sm:text-[22px] tracking-tight mb-0.5 leading-tight">
                {entry.degree}
              </h3>
              <p className="font-geist text-[13px] text-white/50 mb-3">
                {entry.stream}
              </p>

              {/* Info Tags */}
              <div className="flex flex-wrap gap-1.5">
                {[entry.institution, entry.years, entry.location].map(
                  (label) => (
                    <span
                      key={label}
                      className="font-mono text-[9px] tracking-[0.05em] px-2.5 py-1 bg-white/[0.03] border border-white/10 text-white/50 rounded-none"
                    >
                      {label}
                    </span>
                  ),
                )}
              </div>
            </div>

            {/* Index Badge */}
            <div
              className={`flex-shrink-0 w-8 h-8 flex items-center justify-center border rounded-none transition-colors duration-300 ${
                active
                  ? "bg-[#34d399]/10 border-[#34d399]/40 text-[#34d399] shadow-[0_0_12px_rgba(52,211,153,0.3)]"
                  : "bg-white/[0.04] border-white/10 text-white/30"
              }`}
            >
              <span className="font-mono text-[10px] font-bold tracking-[0.1em]">
                {entry.index}
              </span>
            </div>
          </div>

          <div className="mb-5 h-px bg-white/5" />

          {/* Side-by-Side Panels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Left Panel */}
            <div className="flex flex-col h-full bg-[#0f1110] border border-white/5 p-4 sm:p-5 rounded-none">
              <div className="flex items-center gap-2 mb-3">
                <div
                  className={`w-[2.5px] h-[12px] rounded-none ${
                    active ? "bg-[#34d399]" : "bg-white/20"
                  }`}
                />
                <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-white/40">
                  {entry.leftPanel.title}
                </span>
              </div>
              <ul className="flex flex-col gap-1.5">
                {entry.leftPanel.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span
                      className={`mt-1.5 w-1 h-1 rounded-none flex-shrink-0 ${
                        active ? "bg-[#34d399]/80" : "bg-white/20"
                      }`}
                    />
                    <span className="font-geist text-[12px] text-white/60 leading-tight">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Panel */}
            <div className="flex flex-col h-full bg-[#0f1110] border border-white/5 rounded-none">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
                <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-white/40">
                  {entry.rightPanel.title}
                </span>
                <span
                  className={`font-mono text-[8px] tracking-[0.15em] uppercase px-1.5 py-0.5 border rounded-none ${
                    entry.rightPanel.status === "ACTIVE" || active
                      ? "bg-[#34d399]/10 border-[#34d399]/30 text-[#34d399]"
                      : "bg-white/5 border-white/10 text-white/40"
                  }`}
                >
                  ● {entry.rightPanel.status}
                </span>
              </div>

              {/* Score bar */}
              {entry.rightPanel.score && (
                <div className="flex items-center gap-3.5 px-4 py-3 border-b border-white/5">
                  <div>
                    <div className="font-geist font-[800] text-white text-[22px] sm:text-[26px] leading-none">
                      {entry.rightPanel.score}
                    </div>
                    <div className="font-mono text-[8px] tracking-[0.15em] uppercase text-white/30 mt-0.5">
                      {entry.rightPanel.scoreLabel}
                    </div>
                  </div>
                  <div className="flex-1 h-1 bg-white/5 rounded-none overflow-hidden">
                    <div
                      className={`h-full rounded-none ${
                        entry.rightPanel.status === "ACTIVE" || active
                          ? "bg-[#34d399] w-[90%]"
                          : "bg-white/30 w-[86%]"
                      }`}
                    />
                  </div>
                </div>
              )}

              {/* Item Rows */}
              <div className="flex flex-col gap-0 flex-1 px-4 py-2.5">
                {entry.rightPanel.items.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 py-1.5 border-b border-white/[0.03] last:border-none"
                  >
                    <span
                      className={`w-[2px] h-[10px] rounded-none ${
                        active ? "bg-[#34d399]/70" : "bg-white/20"
                      }`}
                    />
                    <span className="font-geist text-[12px] text-white/50 leading-tight">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Green HUD Corner Accent Dot */}
        <div className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-none bg-[#34d399] shadow-[0_0_8px_#34d399]" />
      </motion.div>
    </motion.article>
  );
}

// ─── Main Education Section ──────────────────────────────────────────────────
export default function EducationSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const timelineRef = useRef(null);

  const inView = useInView(sectionRef, { once: true, margin: "-60px" });
  const headingInView = useInView(headingRef, { once: true, margin: "-40px" });
  const timelineInView = useInView(timelineRef, {
    once: true,
    margin: "-40px",
  });
  const [activeEducationIndex, setActiveEducationIndex] = useState(0);

  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 50%"],
  });

  const timelineScaleY = useSpring(timelineProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.2,
  });

  useEffect(() => {
    const unsubscribe = timelineProgress.on("change", (latest) => {
      if (latest < 0.33) {
        setActiveEducationIndex(0);
      } else if (latest < 0.66) {
        setActiveEducationIndex(1);
      } else {
        setActiveEducationIndex(2);
      }
    });

    return unsubscribe;
  }, [timelineProgress]);

  const reduced = useReducedMotion();

  const mp = (initial, animate, transition) =>
    reduced ? {} : { initial, animate, transition };

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative w-full rounded-none"
      style={{ backgroundColor: "transparent" }}
      aria-labelledby="education-heading"
    >
      {/* Top Gradient Blend */}
      <div
        className="absolute top-0 left-0 right-0 h-40 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(6,6,6,0.25) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Static Star Particles */}
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {BG_STARS.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-none bg-white"
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

      {/* Floating Orbs */}
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {ORBS.map((orb) => (
          <div
            key={orb.id}
            className="absolute rounded-none"
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

      {/* Spotlight */}
      <div className="absolute inset-0 z-0">
        <SectionSpotlight sectionRef={sectionRef} />
      </div>

      <div className="relative z-10 w-full max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-16 py-16 sm:py-24 lg:py-[120px]">
        {/* Header Section */}
        <div ref={headingRef} className="mb-12 sm:mb-20 lg:mb-24">
          <motion.div
            className="flex items-center gap-3 mb-6 sm:mb-8"
            {...mp(
              { opacity: 0, y: 16 },
              headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
              { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
            )}
          >
            <div
              className="h-px w-6"
              style={{ background: "rgba(255,255,255,0.2)" }}
            />
            <span
              className="font-mono text-[10px] tracking-[0.24em] uppercase"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Education
            </span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <div className="flex-shrink-0">
              <motion.h2
                id="education-heading"
                className="font-geist font-[800] text-white leading-[0.92] tracking-tight"
                style={{
                  fontSize: "clamp(40px, 7.5vw, 90px)",
                  letterSpacing: "-0.04em",
                }}
                {...mp(
                  { opacity: 0, x: -30 },
                  headingInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 },
                  { duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] },
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

            <motion.p
              className="mt-6 lg:mt-0 font-geist text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.75] max-w-full lg:max-w-[520px] border-l-2 border-white/20 pl-4 sm:pl-5"
              style={{ color: "rgba(255,255,255,0.38)" }}
              {...mp(
                { opacity: 0, x: 24 },
                headingInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 },
                { duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] },
              )}
            >
              My academic journey has built a strong foundation in computer
              science, software engineering, and problem-solving — while
              continuously strengthening practical development skills through
              projects and daily practice.
            </motion.p>
          </div>
        </div>

        {/* Vertical Timeline Container */}
        <div ref={timelineRef} className="relative">
          {/* Background Track Line */}
          <motion.div
            className="absolute left-[9px] top-6 bottom-6 w-[3px] block -translate-x-1/2 rounded-none"
            style={{
              background: "rgba(255,255,255,0.08)",
              transformOrigin: "top",
            }}
            initial={reduced ? {} : { scaleY: 0 }}
            animate={
              reduced ? {} : timelineInView ? { scaleY: 1 } : { scaleY: 0 }
            }
            transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Active Green Neon Progress Line */}
          <motion.div
            className="absolute left-[9px] top-6 bottom-6 w-[3px] block -translate-x-1/2 rounded-none"
            style={{
              scaleY: reduced ? 1 : timelineScaleY,
              background:
                "linear-gradient(to bottom, rgba(52,211,153,1), rgba(16,185,129,0.85))",
              boxShadow:
                "0 0 18px rgba(52,211,153,0.7), 0 0 36px rgba(16,185,129,0.35)",
              transformOrigin: "top",
            }}
          />

          {/* Timeline Cards Row */}
          <div className="flex flex-col gap-10 sm:gap-12">
            {EDUCATION.map((entry, i) => (
              <div key={entry.id} className="flex items-start gap-4 sm:gap-8">
                {/* Square Timeline Node */}
                <div
                  className="flex flex-col items-center pt-2 flex-shrink-0"
                  style={{ width: "22px" }}
                >
                  <TimelineSquareNode
                    inView={timelineInView}
                    delay={0.35 + i * 0.22}
                    active={activeEducationIndex >= i}
                  />
                </div>

                {/* Card */}
                <div className="flex-1 min-w-0">
                  <EducationCard
                    entry={entry}
                    index={i}
                    inView={inView}
                    active={activeEducationIndex === i}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Accent Line */}
        <motion.div
          className="mt-20 sm:mt-24 flex items-center gap-6"
          {...mp({ opacity: 0 }, inView ? { opacity: 1 } : { opacity: 0 }, {
            duration: 1.2,
            delay: 1.1,
          })}
        >
          <div
            className="flex-1 h-px"
            style={{ background: "rgba(255,255,255,0.045)" }}
          />
          <span
            className="font-mono text-[10px] tracking-[0.22em] uppercase whitespace-nowrap"
            style={{ color: "rgba(255,255,255,0.18)" }}
          >
            Learning never stops
          </span>
          <div
            className="flex-1 h-px"
            style={{ background: "rgba(255,255,255,0.045)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
