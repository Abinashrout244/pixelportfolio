import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring } from "motion/react";

// ─── Deterministic pseudo-random (no hydration mismatch) ───────────────────
const rng = (n, salt) => {
  const x = Math.sin(n * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

// ─── Static star data ───────────────────────────────────────────────────────
const STAR_COUNT = 60;
const stars = Array.from({ length: STAR_COUNT }, (_, i) => ({
  id: i,
  left: rng(i, 10) * 100,
  top: rng(i, 20) * 100,
  size: 0.8 + rng(i, 30) * 1.6,
  opacity: 0.06 + rng(i, 40) * 0.12,
  duration: 3 + rng(i, 50) * 4,
  delay: rng(i, 60) * -6,
}));

// ─── Floating light orbs ────────────────────────────────────────────────────
const ORBS = [
  { id: 0, left: "20%",  top: "30%",  w: 300, h: 300, color: "rgba(255,255,255,0.018)", dur: 18, delay: 0   },
  { id: 1, left: "60%",  top: "60%",  w: 250, h: 250, color: "rgba(255,255,255,0.014)", dur: 24, delay: -8  },
  { id: 2, left: "80%",  top: "10%",  w: 200, h: 200, color: "rgba(255,255,255,0.012)", dur: 20, delay: -14 },
];

// ─── Card data ───────────────────────────────────────────────────────────────
const STATS = [
  {
    id: "projects",
    number: 15,
    suffix: "+",
    label: "Projects Built",
    description:
      "Built responsive websites and full-stack MERN applications while continuously improving architecture, UI design, and performance.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    id: "dsa",
    number: 500,
    suffix: "+",
    label: "DSA Problems Solved",
    description:
      "Practicing Data Structures and Algorithms consistently on LeetCode and GeeksforGeeks to sharpen analytical thinking and ace technical interviews.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    id: "stacks",
    number: 25,
    suffix: "+",
    label: "Tech Stacks Mastered",
    description:
      "Hands-on experience with React, Next.js, Tailwind CSS, Node.js, Express, MongoDB, Firebase, Git, Java, and modern frontend tooling.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    ),
  },
];

// ─── Count-up hook ──────────────────────────────────────────────────────────
function useCountUp(end, duration = 2200, delay = 0, enabled = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!enabled) { setCount(0); return; }
    let timeoutId;
    timeoutId = setTimeout(() => {
      const startTime = performance.now();
      const easeOut = (t) => 1 - Math.pow(1 - t, 3);
      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setCount(Math.floor(easeOut(progress) * end));
        if (progress < 1) requestAnimationFrame(step);
        else setCount(end);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [end, duration, delay, enabled]);
  return count;
}

function StatCard({ stat, index, sectionInView }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const count = useCountUp(stat.number, 2200, 400 + index * 200, sectionInView);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPos({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      id={`stat-card-${stat.id}`}
      className="relative flex flex-col group"
      initial={{ opacity: 0, y: 50 }}
      animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.8,
        delay: 0.2 + index * 0.15,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -6, scale: 1.02 }}
      style={{ transformOrigin: "center bottom" }}
    >
      {/* Outer glow on hover */}
      <motion.div
        className="absolute -inset-px rounded-[24px] pointer-events-none"
        animate={{
          opacity: hovered ? 1 : 0,
          boxShadow: hovered
            ? "0 0 40px rgba(255,255,255,0.07), 0 0 80px rgba(255,255,255,0.03), 0 20px 60px rgba(0,0,0,0.6)"
            : "0 0 0px transparent",
        }}
        transition={{ duration: 0.35 }}
      />

      {/* Glass card */}
      <div
        className="relative flex flex-col h-full rounded-[24px] p-10 overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.028)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: hovered
            ? "1px solid rgba(255,255,255,0.14)"
            : "1px solid rgba(255,255,255,0.07)",
          transition: "border-color 0.35s ease",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Mouse-reactive inner glow */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[24px]"
          style={{
            background: hovered
              ? `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(255,255,255,0.06) 0%, transparent 60%)`
              : "none",
            transition: "background 0.1s ease",
          }}
        />

        {/* Top border shimmer */}
        <div
          className="absolute top-0 left-8 right-8 h-px pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
            opacity: hovered ? 1 : 0.5,
            transition: "opacity 0.35s ease",
          }}
        />

        {/* Icon */}
        <motion.div
          className="mb-8 w-11 h-11 rounded-xl flex items-center justify-center"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.6)",
          }}
          animate={{ color: hovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.6)" }}
          transition={{ duration: 0.3 }}
        >
          {stat.icon}
        </motion.div>

        {/* Number */}
        <div
          className="font-geist font-[800] text-white leading-none tracking-tight mb-3 relative"
          style={{ fontSize: "clamp(52px, 5vw, 72px)", letterSpacing: "-0.03em" }}
        >
          {count}{stat.suffix}

          {/* Subtle glow under number */}
          <div
            className="absolute -bottom-2 left-0 w-16 h-8 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at left, rgba(255,255,255,0.06) 0%, transparent 70%)",
              filter: "blur(8px)",
            }}
          />
        </div>

        {/* Label */}
        <div
          className="font-mono uppercase tracking-[0.22em] text-[10px] mb-5"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          {stat.label}
        </div>

        {/* Thin divider */}
        <div
          className="w-full mb-6"
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.06)",
          }}
        />

        {/* Description */}
        <p
          className="font-geist text-[15px] leading-[1.75] flex-1"
          style={{ color: "rgba(255,255,255,0.42)" }}
        >
          {stat.description}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Mouse-reactive global glow ──────────────────────────────────────────────
function MouseGlow() {
  const sectionRef = useRef(null);
  const rawX = useMotionValue(50);
  const rawY = useMotionValue(50);
  const x = useSpring(rawX, { stiffness: 60, damping: 20 });
  const y = useSpring(rawY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const onMove = (e) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      rawX.set(((e.clientX - rect.left) / rect.width) * 100);
      rawY.set(((e.clientY - rect.top) / rect.height) * 100);
    };
    const el = sectionRef.current;
    el?.addEventListener("mousemove", onMove);
    return () => el?.removeEventListener("mousemove", onMove);
  }, [rawX, rawY]);

  return (
    <div ref={sectionRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 70%)",
          filter: "blur(40px)",
          translateX: "-50%",
          translateY: "-50%",
          left: x.get() + "%",
          top: y.get() + "%",
        }}
      />
    </div>
  );
}

// ─── Main StatsSection ───────────────────────────────────────────────────────
export default function StatsSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="relative w-full"
      style={{ backgroundColor: "#080808" }}
    >
      {/* ── Hero-to-section transition gradient ── */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to bottom, #0B0B0B 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Thin divider line ── */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none z-20"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Animated stars ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {stars.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              opacity: s.opacity,
              animationDuration: `${s.duration}s`,
              animationDelay: `${s.delay}s`,
              animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ── Floating glass blur orbs ── */}
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
              background: orb.color,
              filter: "blur(60px)",
              animation: `floatOrb ${orb.dur}s ease-in-out ${orb.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ── Central radial glow ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center"
        aria-hidden="true"
      >
        <div
          style={{
            width: "700px",
            height: "700px",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.022) 0%, transparent 65%)",
            filter: "blur(30px)",
          }}
        />
      </div>

      {/* ── Mouse reactive glow ── */}
      <MouseGlow />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 lg:px-16 py-[120px]">

        {/* Section header */}
        <motion.div
          className="mb-16 flex flex-col items-start"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span
            className="font-mono text-[10px] tracking-[0.22em] uppercase mb-4"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            ── Proof of Work
          </span>
          <h2
            className="font-geist font-[800] text-white leading-none tracking-tight"
            style={{ fontSize: "clamp(32px, 4vw, 52px)", letterSpacing: "-0.03em" }}
          >
            By the Numbers
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {STATS.map((stat, i) => (
            <StatCard key={stat.id} stat={stat} index={i} sectionInView={inView} />
          ))}
        </div>

        {/* Bottom accent */}
        <motion.div
          className="mt-20 flex items-center gap-6"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div
            className="flex-1 h-px"
            style={{ background: "rgba(255,255,255,0.05)" }}
          />
          <span
            className="font-mono text-[10px] tracking-[0.2em] uppercase whitespace-nowrap"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            Always improving
          </span>
          <div
            className="flex-1 h-px"
            style={{ background: "rgba(255,255,255,0.05)" }}
          />
        </motion.div>
      </div>

      {/* ── Bottom fade into next section ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to top, #080808 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
