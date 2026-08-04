import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "motion/react";

// ─── Deterministic RNG (zero hydration mismatch) ────────────────────────────
const rng = (n, salt) => {
  const x = Math.sin(n * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

// ─── Static background particles ─────────────────────────────────────────────
const BG_STARS = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  left: rng(i, 11) * 100,
  top: rng(i, 22) * 100,
  size: 0.6 + rng(i, 33) * 1.4,
  opacity: 0.05 + rng(i, 44) * 0.1,
  duration: 4 + rng(i, 55) * 5,
  delay: rng(i, 66) * -8,
}));

// ─── Floating ambient orbs ────────────────────────────────────────────────────
const AMBIENT_ORBS = [
  { id: 0, left: "10%",  top: "20%",  w: 320, h: 320, alpha: 0.016, dur: 22, delay: 0   },
  { id: 1, left: "70%",  top: "50%",  w: 280, h: 280, alpha: 0.013, dur: 28, delay: -10 },
  { id: 2, left: "45%",  top: "80%",  w: 240, h: 240, alpha: 0.011, dur: 18, delay: -6  },
  { id: 3, left: "85%",  top: "15%",  w: 180, h: 180, alpha: 0.009, dur: 32, delay: -20 },
];

// ─── Tech category data ───────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: "frontend",
    index: "01",
    title: "Frontend Frameworks",
    description: "Building interactive, accessible, and performant user interfaces.",
    pills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Framer Motion",
      "Redux Toolkit",
      "React Router",
      "Vite",
    ],
  },
  {
    id: "styling",
    index: "02",
    title: "Styling & UI",
    description: "Pixel-perfect interfaces with modern CSS systems and design tokens.",
    pills: [
      "Tailwind CSS",
      "CSS Modules",
      "Responsive Design",
      "Glassmorphism",
      "GSAP",
      "Styled Components",
      "Figma",
    ],
  },
  {
    id: "backend",
    index: "03",
    title: "Backend & Databases",
    description: "Scalable server-side architectures and cloud-native data solutions.",
    pills: [
      "Node.js",
      "Express",
      "MongoDB",
      "Firebase",
      "REST API",
      "JWT",
      "Mongoose",
      "Java",
    ],
  },
  {
    id: "devtools",
    index: "04",
    title: "Performance & DevTools",
    description: "Shipping production-grade software with professional tooling and workflows.",
    pills: [
      "Git",
      "GitHub",
      "VS Code",
      "Postman",
      "Vercel",
      "Netlify",
      "npm / pnpm",
      "Linux CLI",
    ],
  },
];

// ─── Pill variant ─────────────────────────────────────────────────────────────
const pillVariants = {
  hidden: { opacity: 0, scale: 0.88, y: 6 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.38,
      delay: i * 0.055,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

// ─── Individual tech pill ─────────────────────────────────────────────────────
function TechPill({ label, index, inView }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.span
      role="listitem"
      aria-label={label}
      tabIndex={0}
      custom={index}
      variants={pillVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="inline-flex items-center cursor-pointer select-none rounded-full px-3.5 py-1.5 font-mono text-[11px] tracking-[0.08em] uppercase outline-none"
      style={{
        background: hovered ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
        border: hovered ? "1px solid rgba(255,255,255,0.18)" : "1px solid rgba(255,255,255,0.08)",
        color: hovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)",
        boxShadow: hovered
          ? "0 0 12px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.08)"
          : "none",
        transition: "all 0.22s ease",
        minHeight: "36px",
      }}
    >
      {label}
    </motion.span>
  );
}

// ─── Mouse-following glow inside each card ────────────────────────────────────
function CardMouseGlow({ active, position }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 rounded-[24px] overflow-hidden"
      aria-hidden="true"
    >
      <div
        style={{
          position: "absolute",
          width: "280px",
          height: "280px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.055) 0%, transparent 70%)",
          transform: `translate(${position.x - 140}px, ${position.y - 140}px)`,
          opacity: active ? 1 : 0,
          transition: "opacity 0.35s ease",
          pointerEvents: "none",
          filter: "blur(2px)",
        }}
      />
    </div>
  );
}

// ─── Individual category card ─────────────────────────────────────────────────
function CategoryCard({ category, index, inView }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.article
      ref={cardRef}
      id={`tech-card-${category.id}`}
      aria-label={`${category.title} technologies`}
      className="relative flex flex-col"
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
      transition={{
        duration: 0.75,
        delay: 0.25 + index * 0.13,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -5 }}
      style={{ transformOrigin: "center bottom" }}
    >
      {/* Outer hover glow ring */}
      <motion.div
        className="absolute -inset-px rounded-[26px] pointer-events-none"
        animate={{
          opacity: hovered ? 1 : 0,
          boxShadow: hovered
            ? "0 0 0 1px rgba(255,255,255,0.1), 0 20px 80px rgba(0,0,0,0.7), 0 8px 32px rgba(255,255,255,0.04)"
            : "0 0 0 0px transparent",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Glass surface */}
      <div
        className="relative flex flex-col h-full rounded-[24px] overflow-hidden"
        style={{
          background: hovered
            ? "rgba(255,255,255,0.038)"
            : "rgba(255,255,255,0.026)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: hovered
            ? "1px solid rgba(255,255,255,0.13)"
            : "1px solid rgba(255,255,255,0.07)",
          transition: "background 0.35s ease, border-color 0.35s ease",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.2)",
        }}
      >
        {/* Mouse glow overlay */}
        <CardMouseGlow active={hovered} position={mousePos} />

        {/* Top shimmer */}
        <div
          className="absolute top-0 left-10 right-10 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)",
            opacity: hovered ? 1 : 0.45,
            transition: "opacity 0.35s ease",
          }}
          aria-hidden="true"
        />

        {/* Card content wrapper */}
        <div className="flex flex-col h-full p-8 sm:p-10 gap-6">
          {/* Header row */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3
                className="font-geist font-[700] text-white leading-tight mb-2"
                style={{ fontSize: "clamp(18px, 2vw, 22px)", letterSpacing: "-0.01em" }}
              >
                {category.title}
              </h3>
              <p
                className="font-geist text-[13px] leading-[1.65]"
                style={{ color: "rgba(255,255,255,0.38)" }}
              >
                {category.description}
              </p>
            </div>

            {/* Category index badge */}
            <motion.div
              className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
              animate={{
                background: hovered
                  ? "rgba(255,255,255,0.07)"
                  : "rgba(255,255,255,0.04)",
                borderColor: hovered
                  ? "rgba(255,255,255,0.14)"
                  : "rgba(255,255,255,0.07)",
              }}
              transition={{ duration: 0.3 }}
              style={{
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <span
                className="font-mono text-[10px] tracking-[0.1em]"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                {category.index}
              </span>
            </motion.div>
          </div>

          {/* Divider */}
          <div
            className="w-full"
            style={{ height: "1px", background: "rgba(255,255,255,0.05)" }}
          />

          {/* Pills */}
          <div
            role="list"
            aria-label={`${category.title} technologies`}
            className="flex flex-wrap gap-2"
          >
            {category.pills.map((pill, pillIdx) => (
              <TechPill
                key={pill}
                label={pill}
                index={pillIdx}
                inView={inView}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Section-level mouse spotlight ───────────────────────────────────────────
function SectionSpotlight({ sectionRef }) {
  const rawX = useMotionValue(50);
  const rawY = useMotionValue(50);
  const x = useSpring(rawX, { stiffness: 50, damping: 22 });
  const y = useSpring(rawY, { stiffness: 50, damping: 22 });
  const [pos, setPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 100;
      const ny = ((e.clientY - rect.top) / rect.height) * 100;
      rawX.set(nx);
      rawY.set(ny);
      setPos({ x: nx, y: ny });
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    return () => el.removeEventListener("mousemove", onMove);
  }, [rawX, rawY, sectionRef]);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <div
        style={{
          position: "absolute",
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          width: "700px",
          height: "700px",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.018) 0%, transparent 65%)",
          filter: "blur(40px)",
          pointerEvents: "none",
          transition: "left 0.18s ease, top 0.18s ease",
        }}
      />
    </div>
  );
}

// ─── Main TechEcosystem section ───────────────────────────────────────────────
export default function TechEcosystem() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });
  const headingInView = useInView(headingRef, { once: true, margin: "-40px" });

  // prefers-reduced-motion
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const motionProps = (initial, animate, transition) =>
    reducedMotion
      ? {}
      : { initial, animate, transition };

  return (
    <section
      id="tech-ecosystem"
      ref={sectionRef}
      className="relative w-full"
      style={{ backgroundColor: "#060606" }}
      aria-labelledby="tech-ecosystem-heading"
    >
      {/* ── Seamless top blend from StatsSection ── */}
      <div
        className="absolute top-0 left-0 right-0 h-40 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to bottom, #080808 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Static star particles ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
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

      {/* ── Ambient floating orbs ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {AMBIENT_ORBS.map((orb) => (
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

      {/* ── Central radial glow (behind heading) ── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none z-0"
        aria-hidden="true"
        style={{
          width: "900px",
          height: "600px",
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.025) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* ── Mouse spotlight ── */}
      <div className="absolute inset-0 z-0">
        <SectionSpotlight sectionRef={sectionRef} />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-16 py-28 sm:py-32 lg:py-[140px]">

        {/* ── Section header ── */}
        <div ref={headingRef} className="mb-16 sm:mb-20 lg:mb-24">

          {/* Top row: label */}
          <motion.div
            className="flex items-center gap-3 mb-6 sm:mb-8"
            {...motionProps(
              { opacity: 0, y: 16 },
              headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
              { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
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
              Technical Stack
            </span>
          </motion.div>

          {/* Desktop: heading left + description right */}
          {/* Mobile: heading then description below */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between lg:gap-16">

            {/* Main heading */}
            <div className="flex-shrink-0">
              <motion.h2
                id="tech-ecosystem-heading"
                className="font-geist font-[800] text-white leading-[0.92] tracking-tight"
                style={{
                  fontSize: "clamp(40px, 7.5vw, 90px)",
                  letterSpacing: "-0.04em",
                }}
                {...motionProps(
                  { opacity: 0, x: -30 },
                  headingInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 },
                  { duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }
                )}
              >
                TECHNICAL
                <br />
                <span
                  style={{
                    WebkitTextStroke: "1px rgba(255,255,255,0.15)",
                    color: "transparent",
                  }}
                >
                  ECOSYSTEM
                </span>
              </motion.h2>
            </div>

            {/* Description */}
            <motion.p
              className="mt-6 lg:mt-0 font-geist text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.75] max-w-full lg:max-w-[460px]"
              style={{ color: "rgba(255,255,255,0.38)" }}
              {...motionProps(
                { opacity: 0, x: 24 },
                headingInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 },
                { duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }
              )}
            >
              A curated collection of the technologies I work with daily — from
              pixel-perfect UIs to scalable server infrastructure. Each tool
              chosen for craft, performance, and developer experience.
            </motion.p>
          </div>
        </div>

        {/* ── Cards grid ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8"
          role="list"
          aria-label="Technical categories"
        >
          {CATEGORIES.map((cat, i) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        {/* ── Bottom accent rule ── */}
        <motion.div
          className="mt-20 sm:mt-24 flex items-center gap-6"
          {...motionProps(
            { opacity: 0 },
            inView ? { opacity: 1 } : { opacity: 0 },
            { duration: 1.2, delay: 1.0 }
          )}
        >
          <div
            className="flex-1 h-px"
            style={{ background: "rgba(255,255,255,0.045)" }}
          />
          <span
            className="font-mono text-[10px] tracking-[0.22em] uppercase whitespace-nowrap"
            style={{ color: "rgba(255,255,255,0.18)" }}
          >
            And always learning
          </span>
          <div
            className="flex-1 h-px"
            style={{ background: "rgba(255,255,255,0.045)" }}
          />
        </motion.div>
      </div>

      {/* ── Bottom fade into next section ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to top, #060606 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
