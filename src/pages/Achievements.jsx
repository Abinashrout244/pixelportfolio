import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";

/* ---------------------------------------------------------------- */
/* Icons                                                            */
/* ---------------------------------------------------------------- */

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function AwardIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <circle cx="12" cy="8" r="6" />
      <path d="M8.5 13.5 7 22l5-3 5 3-1.5-8.5" />
    </svg>
  );
}

function CloudIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.4-1.5A4.5 4.5 0 0 0 6.5 19h11z" />
    </svg>
  );
}

function CodeIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="m8 8-4 4 4 4" />
      <path d="m16 8 4 4-4 4" />
      <path d="m13 6-2 12" />
    </svg>
  );
}

function LayersIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M12 3 2 8l10 5 10-5-10-5z" />
      <path d="m2 14 10 5 10-5" />
      <path d="m2 11 10 5 10-5" />
    </svg>
  );
}

function ShieldCheckIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M12 2 4 5v6c0 5 3.4 8.4 8 11 4.6-2.6 8-6 8-11V5l-8-3z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function CalendarIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <rect x="3" y="4.5" width="18" height="16" rx="0" />
      <path d="M3 9.5h18" />
      <path d="M8 2.5v4M16 2.5v4" />
    </svg>
  );
}

function ArrowUpRightIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

function ChevronDownIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function BarChartIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M12 20V10" />
      <path d="M18 20V4" />
      <path d="M6 20v-4" />
    </svg>
  );
}

/* ---------------------------------------------------------------- */
/* Data                                                             */
/* ---------------------------------------------------------------- */

const stats = [
  { value: 12, suffix: "+", label: "Certificates Verified", icon: AwardIcon },
  { value: 4, suffix: "", label: "Core Specializations", icon: LayersIcon },
  { value: 500, suffix: "+", label: "Hours Documented", icon: CodeIcon },
];

const achievements = [
  {
    icon: CodeIcon,
    title: "Full Stack Web Development",
    issuer: "Udemy",
    date: "2025",
    credentialId: "UC-XXXXXXX",
    description:
      "End-to-end React, Node.js, Express, and MongoDB backend pipelines with production-ready REST API structures.",
    skills: ["React", "Node.js", "MongoDB", "Express"],
    link: "#",
    leftPercent: "58%",
    rotation: 1.5,
  },
  {
    icon: LayersIcon,
    title: "Data Structures & Algorithms",
    issuer: "GeeksforGeeks",
    date: "2025",
    credentialId: "GFG-XXXXXXX",
    description:
      "Problem-solving covering trees, graphs, dynamic programming, and computational complexity analysis.",
    skills: ["DSA", "Java", "Trees", "Graph Theory"],
    link: "#",
    leftPercent: "8%",
    rotation: -1.5,
  },
  {
    icon: CloudIcon,
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2024",
    credentialId: "AWS-XXXXXXX",
    description:
      "Cloud infrastructure, IAM protocols, security guidelines, VPCs, and serverless architectures.",
    skills: ["AWS", "Cloud", "IAM", "S3"],
    link: "#",
    leftPercent: "62%",
    rotation: 1.5,
  },
  {
    icon: CodeIcon,
    title: "Java Programming Masterclass",
    issuer: "Coursera",
    date: "2024",
    credentialId: "COURSERA-XXXXXXX",
    description:
      "Object-oriented design patterns, multithreading, concurrency, and Spring Boot backend integration.",
    skills: ["Java", "OOP", "Spring Boot", "Threads"],
    link: "#",
    leftPercent: "12%",
    rotation: -2,
  },
  {
    icon: AwardIcon,
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "2023",
    credentialId: "FCC-XXXXXXX",
    description:
      "CSS Grid architecture, Flexbox layout design, responsive typography, animations, and WCAG standards.",
    skills: ["CSS Grid", "Flexbox", "A11y", "SVG"],
    link: "#",
    leftPercent: "56%",
    rotation: 2,
  },
  {
    icon: LayersIcon,
    title: "JavaScript Algorithms",
    issuer: "freeCodeCamp",
    date: "2023",
    credentialId: "FCC-XXXXXXY",
    description:
      "ES6+ modular design, functional programming patterns, and asynchronous challenge solutions.",
    skills: ["JavaScript", "ES6+", "Async", "FP"],
    link: "#",
    leftPercent: "6%",
    rotation: -1.5,
  },
];

const ACCENT_STOPS = ["#10b981", "#06b6d4", "#38bdf8", "#10b981"];
const ACCENT_RANGE = [0, 0.33, 0.66, 1];

/* ---------------------------------------------------------------- */
/* Directional Path Generator                                       */
/* ---------------------------------------------------------------- */

function buildRoadPath(points) {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const curr = points[i];
    const next = points[i + 1];
    const dy = next.y - curr.y;

    const cp1x = curr.x;
    const cp1y = curr.y + dy * 0.55;
    const cp2x = next.x;
    const cp2y = curr.y + dy * 0.45;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
  }
  return d;
}

/* ---------------------------------------------------------------- */
/* Animated Counter                                                 */
/* ---------------------------------------------------------------- */

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame;
    const duration = 1000;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

/* ---------------------------------------------------------------- */
/* Achievement Card Component                                       */
/* ---------------------------------------------------------------- */

function AchievementCard({
  icon: Icon,
  title,
  issuer,
  date,
  credentialId,
  description,
  skills,
  link,
  accent,
  index,
  pinRef,
}) {
  return (
    <div className="group relative w-full">
      <div className="pointer-events-none absolute -inset-3 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-teal-500/15 to-cyan-500/20 opacity-30 blur-xl transition-opacity duration-500 group-hover:opacity-100 sm:-inset-4 sm:blur-2xl" />

      {/* Anchor Pin Node */}
      <div
        ref={pinRef}
        className="pointer-events-none absolute -top-3.5 left-1/2 z-20 -translate-x-1/2 flex items-center justify-center"
      >
        <span className="relative flex h-4 w-4">
          <motion.span
            style={{ backgroundColor: accent }}
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
          />
          <motion.span
            style={{ backgroundColor: accent }}
            className="relative inline-flex h-4 w-4 rounded-full border-2 border-[#090a0c] shadow-[0_0_12px_rgba(16,185,129,0.8)]"
          />
        </span>
      </div>

      <div className="relative flex flex-col overflow-hidden rounded-2xl border border-emerald-500/20 bg-[#090a0d]/95 backdrop-blur-xl shadow-2xl shadow-black/90 transition-all duration-300 group-hover:border-emerald-500/40 group-hover:-translate-y-1">
        <div className="relative overflow-hidden border-b border-zinc-800/80 bg-gradient-to-br from-emerald-950/20 via-zinc-900/60 to-[#0a0a0c] px-4 py-3 sm:px-5">
          <div className="flex items-center justify-between">
            <motion.span
              style={{ borderColor: accent, color: accent }}
              className="flex h-8 w-8 items-center justify-center rounded-lg border bg-zinc-900/80 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
            >
              <Icon width={16} height={16} />
            </motion.span>

            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-mono font-semibold tracking-wider text-emerald-400 uppercase">
              <ShieldCheckIcon width={10} height={10} />
              Step {index + 1}
            </span>
          </div>

          <div className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
        </div>

        <motion.div
          style={{ backgroundColor: accent }}
          className="h-[2px] w-full opacity-80"
        />

        <div className="flex flex-1 flex-col gap-2.5 p-4 sm:p-5">
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold tracking-tight text-white sm:text-[15px]">
              {title}
            </h3>
            <div className="flex flex-wrap items-center gap-x-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
              <span className="text-zinc-400">{issuer}</span>
              <span className="text-zinc-700">·</span>
              <span className="inline-flex items-center gap-1">
                <CalendarIcon width={10} height={10} />
                {date}
              </span>
            </div>
          </div>

          <p className="text-xs leading-relaxed text-zinc-400 line-clamp-2">
            {description}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded border border-emerald-500/20 bg-emerald-950/20 px-2 py-0.5 font-mono text-[9px] text-emerald-300"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-1 flex items-center justify-between border-t border-zinc-800/80 pt-2.5">
            <span className="font-mono text-[9px] tracking-wider text-zinc-600 uppercase">
              {credentialId}
            </span>
            <a
              href={link}
              className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold tracking-wider text-emerald-400 uppercase transition-colors duration-200 hover:text-emerald-300"
            >
              View
              <ArrowUpRightIcon width={12} height={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Main Component                                                   */
/* ---------------------------------------------------------------- */

export default function Achievements() {
  const sectionRef = useRef(null);
  const mapContainerRef = useRef(null);
  const startAnchorRef = useRef(null);
  const pinRefs = useRef([]);
  pinRefs.current = [];

  const [showStats, setShowStats] = useState(false);

  const registerPinRef = (el) => {
    if (el && !pinRefs.current.includes(el)) {
      pinRefs.current.push(el);
    }
  };

  const [pathD, setPathD] = useState("");
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });

  const computePath = useCallback(() => {
    const container = mapContainerRef.current;
    if (!container || pinRefs.current.length === 0) return;
    const containerRect = container.getBoundingClientRect();

    const allPoints = [];

    // Origin Anchor Point at the Top Navbar
    if (startAnchorRef.current) {
      const startRect = startAnchorRef.current.getBoundingClientRect();
      allPoints.push({
        x: startRect.left - containerRect.left + startRect.width / 2,
        y: startRect.top - containerRect.top + startRect.height / 2,
      });
    }

    // Step Milestone Points
    pinRefs.current.forEach((el) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      allPoints.push({
        x: r.left - containerRect.left + r.width / 2,
        y: r.top - containerRect.top + r.height / 2,
      });
    });

    setSvgSize({ width: containerRect.width, height: containerRect.height });
    setPathD(buildRoadPath(allPoints));
  }, []);

  useLayoutEffect(() => {
    computePath();
    const raf = requestAnimationFrame(computePath);
    const timer = setTimeout(computePath, 350);

    const onResize = () => computePath();
    window.addEventListener("resize", onResize);

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => computePath())
        : null;
    if (ro && mapContainerRef.current) ro.observe(mapContainerRef.current);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
      if (ro) ro.disconnect();
    };
  }, [computePath, showStats]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.15"],
  });
  const accent = useTransform(scrollYProgress, ACCENT_RANGE, ACCENT_STOPS);

  const firstCard = achievements[0];
  const remainingCards = achievements.slice(1);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-x-hidden bg-transparent px-3.5 py-8 text-white sm:px-8 sm:py-16 "
    >
      <div className="relative mx-auto max-w-6xl">
        <div className="pointer-events-none absolute -top-12 left-1/2 -z-10 h-72 w-full max-w-2xl -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />

        {/* ---------------- WHOLE ROADMAP WRAPPER ---------------- */}
        <div ref={mapContainerRef} className="relative">
          {/* Dynamic SVG Road Path */}
          <svg
            className="pointer-events-none absolute inset-0 z-0 h-full w-full"
            width={svgSize.width}
            height={svgSize.height}
          >
            {pathD && (
              <>
                <motion.path
                  d={pathD}
                  fill="none"
                  strokeWidth={7}
                  style={{ stroke: accent }}
                  className="opacity-30 blur-md"
                />
                <motion.path
                  d={pathD}
                  fill="none"
                  strokeWidth={2.5}
                  strokeDasharray="6 8"
                  strokeLinecap="round"
                  style={{ stroke: accent }}
                  className="opacity-80"
                />
              </>
            )}
          </svg>

          {/* ---------------- TOP NAVBAR (WITH TRAIL ORIGIN) ---------------- */}
          <div className="relative z-20 flex items-center justify-between gap-3 pt-14 md:pt-10">
            <Link to="/" className="inline-flex items-center">
              <motion.button
                ref={startAnchorRef}
                type="button"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="group relative inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-zinc-900/80 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-300 backdrop-blur-md transition-all duration-200 hover:border-emerald-500/60 hover:text-emerald-300 active:scale-95 sm:px-3.5 sm:text-xs"
              >
                {/* Ping origin indicator */}
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1"
                >
                  <path d="M19 12H5" />
                  <path d="M12 19l-7-7 7-7" />
                </svg>
                <span className="font-semibold">Back</span>
              </motion.button>
            </Link>

            {/* Mobile-Safe Back Action */}
            <button
              type="button"
              onClick={() => window.history.back()}
              className="group inline-flex items-center gap-1.5 rounded-xl border border-zinc-800/90 bg-zinc-900/80 px-3 py-2 font-mono text-[11px] text-zinc-400 backdrop-blur-md transition-all duration-200 hover:border-zinc-700 hover:text-white active:scale-95 sm:text-xs"
            >
              <span className="text-zinc-600">cmd</span>
              <span className="font-semibold text-emerald-400">cd ..</span>
            </button>
          </div>

          {/* ---------------- METRICS TOGGLE BUTTON ---------------- */}
          <div className="relative z-10 mt-6 flex flex-col items-start sm:mt-8">
            <button
              type="button"
              onClick={() => setShowStats((prev) => !prev)}
              className="group inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-[#0d0e11]/90 px-3.5 py-2 text-xs font-mono text-zinc-300 backdrop-blur-md transition-all duration-200 hover:border-emerald-500/40 hover:text-emerald-400 shadow-lg shadow-black/40"
            >
              <BarChartIcon
                width={13}
                height={13}
                className="text-emerald-400"
              />
              <span>
                {showStats ? "Hide Track Metrics" : "View Track Metrics"}
              </span>
              <motion.span
                animate={{ rotate: showStats ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="text-zinc-500 group-hover:text-emerald-400"
              >
                <ChevronDownIcon width={12} height={12} />
              </motion.span>
            </button>

            {/* 3 Metric Cards Accordion */}
            <AnimatePresence>
              {showStats && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -6 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -6 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full overflow-hidden pt-4"
                >
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-4">
                    {stats.map((stat, idx) => {
                      const Icon = stat.icon;
                      return (
                        <div
                          key={stat.label}
                          className="group relative overflow-hidden rounded-xl border border-zinc-800/80 bg-[#0d0e11]/90 p-3.5 backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/30 shadow-md shadow-black/30 sm:p-4"
                        >
                          <div className="flex items-center justify-between">
                            <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/80 text-emerald-400 sm:h-7 sm:w-7">
                              <Icon width={13} height={13} />
                            </span>
                            <span className="font-mono text-[9px] text-zinc-600">
                              METRIC_0{idx + 1}
                            </span>
                          </div>

                          <div className="mt-2.5 sm:mt-3">
                            <div className="font-mono text-lg font-bold tracking-tight text-white sm:text-2xl">
                              <Counter
                                value={stat.value}
                                suffix={stat.suffix}
                              />
                            </div>
                            <div className="mt-0.5 font-mono text-[8.5px] uppercase tracking-wider text-zinc-400 sm:text-[9px]">
                              {stat.label}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ---------------- TOP ROW (HEADING + STEP 1 CARD) ---------------- */}
          <div className="relative z-10 mt-8 grid grid-cols-1 items-start gap-8 md:mt-12 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-6 lg:col-span-7">
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-black tracking-tight uppercase text-white xs:text-4xl sm:text-6xl lg:text-7xl"
              >
                Learning
                <br />
                <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
                  Roadmap
                </span>
              </motion.h2>
            </div>

            {/* Step 1 Card */}
            <div className="flex justify-center md:col-span-6 md:justify-end lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 25, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{
                  scale: 1.02,
                  rotateZ: 0,
                  transition: { type: "spring", stiffness: 350, damping: 20 },
                }}
                className="w-full max-w-[310px] rotate-0 sm:max-w-[330px] sm:rotate-1"
              >
                <AchievementCard
                  {...firstCard}
                  index={0}
                  accent={accent}
                  pinRef={registerPinRef}
                />
              </motion.div>
            </div>
          </div>

          {/* ---------------- REMAINING CARDS ---------------- */}
          <div className="space-y-20 pt-16 sm:space-y-28 sm:pt-24">
            {remainingCards.map((item, i) => (
              <div
                key={item.title}
                className="relative z-10 flex w-full justify-center sm:justify-start"
                style={{
                  paddingLeft:
                    typeof window !== "undefined" && window.innerWidth < 640
                      ? "0%"
                      : item.leftPercent,
                }}
              >
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 35,
                    scale: 0.92,
                    rotateX: 12,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotateX: 0,
                    rotateZ: item.rotation,
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.65,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{
                    scale: 1.02,
                    rotateZ: 0,
                    transition: { type: "spring", stiffness: 350, damping: 20 },
                  }}
                  className="w-full max-w-[300px] sm:max-w-[330px]"
                  style={{ perspective: 1000 }}
                >
                  <AchievementCard
                    {...item}
                    index={i + 1}
                    accent={accent}
                    pinRef={registerPinRef}
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
