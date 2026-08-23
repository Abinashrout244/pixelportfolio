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
  {
    id: 0,
    left: "20%",
    top: "30%",
    w: 300,
    h: 300,
    color: "rgba(255,255,255,0.018)",
    dur: 18,
    delay: 0,
  },
  {
    id: 1,
    left: "60%",
    top: "60%",
    w: 250,
    h: 250,
    color: "rgba(255,255,255,0.014)",
    dur: 24,
    delay: -8,
  },
  {
    id: 2,
    left: "80%",
    top: "10%",
    w: 200,
    h: 200,
    color: "rgba(255,255,255,0.012)",
    dur: 20,
    delay: -14,
  },
];

// ─── Minimal Stats Data (matching screenshot layout) ────────────────────────
const STATS = [
  {
    id: "projects",
    number: 7,
    suffix: "+",
    label: "PROJECTS SHIPPED & BUILT",
    description:
      "Built responsive websites and full-stack MERN applications while continuously improving architecture, UI design, and performance.",
  },
  {
    id: "dsa",
    number: 100,
    suffix: "+",
    label: "DSA PROBLEMS SOLVED",
    description:
      "Practicing Data Structures and Algorithms consistently on LeetCode and GeeksforGeeks to sharpen analytical thinking and problem solving.",
  },
  {
    id: "stacks",
    number: 18,
    suffix: "+",
    label: "TECH STACKS & TOOLS",
    description:
      "Hands-on experience with React, Next.js, Tailwind CSS, Node.js, Express, MongoDB, Firebase, Git, Java, and modern frontend tooling.",
  },
];

// ─── Count-up hook ──────────────────────────────────────────────────────────
function useCountUp(end, duration = 2200, delay = 0, enabled = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!enabled) {
      setCount(0);
      return;
    }
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

function StatItem({ stat, index, sectionInView }) {
  const count = useCountUp(stat.number, 2200, 200 + index * 150, sectionInView);

  return (
    <motion.div
      id={`stat-item-${stat.id}`}
      className="flex flex-col text-left pr-4 sm:pr-8"
      initial={{ opacity: 0, y: 30 }}
      animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.7,
        delay: 0.15 + index * 0.12,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {/* Big Number Header */}
      <div
        className="font-geist font-[800] text-white leading-none tracking-tight mb-4"
        style={{ fontSize: "clamp(48px, 6vw, 76px)", letterSpacing: "-0.03em" }}
      >
        {count}
        {stat.suffix}
      </div>

      {/* Label */}
      <div
        className="font-mono uppercase tracking-[0.2em] text-[11px] sm:text-[12px] font-semibold mb-3"
        style={{ color: "rgba(255,255,255,0.7)" }}
      >
        {stat.label}
      </div>

      {/* Description */}
      <p
        className="font-geist text-[13px] sm:text-[14px] leading-[1.65]"
        style={{ color: "rgba(255,255,255,0.4)" }}
      >
        {stat.description}
      </p>
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
    <div
      ref={sectionRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)",
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
      className="relative w-full py-10 sm:py-16 "
      style={{ backgroundColor: "transparent" }}
    >
      {/* ── Top Section Border Line ── */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none z-20"
        style={{
          background: "rgba(255,255,255,0.08)",
        }}
        aria-hidden="true"
      />

      {/* ── Animated stars ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
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
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
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

      {/* ── Mouse reactive glow ── */}
      <MouseGlow />

      {/* ── Minimal 3-Column Content Layout ── */}
      <div className="relative  z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16 py-6 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 items-start">
          {STATS.map((stat, i) => (
            <StatItem
              key={stat.id}
              stat={stat}
              index={i}
              sectionInView={inView}
            />
          ))}
        </div>
      </div>

      {/* ── Bottom Section Border Line ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none z-20"
        style={{
          background: "rgba(255,255,255,0.08)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
