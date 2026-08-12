import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";

/* ---------------------------------------------------------------- */
/* Inline SVG icons — stroke-based, inherit color via currentColor   */
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

/* ---------------------------------------------------------------- */
/* Data — replace with your real certificates                       */
/* ---------------------------------------------------------------- */

const stats = [
  { value: 12, suffix: "+", label: "Certificates" },
  { value: 4, suffix: "", label: "Specializations" },
  { value: 500, suffix: "+", label: "Hours Learned" },
];

const achievements = [
  {
    icon: CodeIcon,
    title: "Full Stack Web Development",
    issuer: "Udemy",
    date: "2025",
    credentialId: "UC-XXXXXXX",
    description:
      "End-to-end coverage of React, Node.js, Express, and MongoDB — from building REST APIs to shipping production-ready interfaces.",
    skills: ["React", "Node.js", "MongoDB", "Express"],
    link: "#",
  },
  {
    icon: LayersIcon,
    title: "Data Structures & Algorithms",
    issuer: "GeeksforGeeks",
    date: "2025",
    credentialId: "GFG-XXXXXXX",
    description:
      "Core problem-solving track covering arrays, trees, graphs, dynamic programming, and complexity analysis.",
    skills: ["DSA", "Java", "Problem Solving"],
    link: "#",
  },
  {
    icon: CloudIcon,
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2024",
    credentialId: "AWS-XXXXXXX",
    description:
      "Foundational understanding of AWS cloud services, architecture best practices, security, and billing.",
    skills: ["AWS", "Cloud", "Deployment"],
    link: "#",
  },
  {
    icon: CodeIcon,
    title: "Java Programming Masterclass",
    issuer: "Coursera",
    date: "2024",
    credentialId: "COURSERA-XXXXXXX",
    description:
      "Deep dive into object-oriented Java — collections, multithreading, and building small backend services.",
    skills: ["Java", "OOP", "Spring Boot"],
    link: "#",
  },
  {
    icon: AwardIcon,
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "2023",
    credentialId: "FCC-XXXXXXX",
    description:
      "Hands-on certification in semantic HTML, modern CSS, Flexbox, and Grid through five graded projects.",
    skills: ["HTML", "CSS", "Accessibility"],
    link: "#",
  },
  {
    icon: LayersIcon,
    title: "JavaScript Algorithms & Data Structures",
    issuer: "freeCodeCamp",
    date: "2023",
    credentialId: "FCC-XXXXXXY",
    description:
      "300+ hours of ES6+, functional programming, and algorithmic challenges validated through project builds.",
    skills: ["JavaScript", "ES6+", "Algorithms"],
    link: "#",
  },
];

/* ---------------------------------------------------------------- */
/* Animated counter                                                  */
/* ---------------------------------------------------------------- */

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame;
    const duration = 1200;
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
/* Achievement card                                                  */
/* ---------------------------------------------------------------- */

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

function AchievementCard({
  icon: Icon,
  title,
  issuer,
  date,
  credentialId,
  description,
  skills,
  link,
}) {
  return (
    <motion.div variants={cardVariants} className="group relative h-full">
      {/* Ambient glow */}
      <div className="absolute -inset-px  bg-gradient-to-br from-indigo-500/0 via-fuchsia-500/0 to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:from-indigo-500/25 group-hover:via-fuchsia-500/15 group-hover:opacity-100" />

      <div className="relative flex h-full flex-col overflow-hidden  border border-zinc-800/80 bg-[#101012]/80 backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-zinc-700">
        {/* Icon header panel with shine sweep */}
        <div className="relative overflow-hidden border-b border-zinc-800/80 bg-gradient-to-br from-zinc-900 to-[#0a0a0c] px-6 py-8">
          <div className="flex items-start justify-between">
            <span className="flex h-12 w-12 items-center justify-center border border-zinc-700/60 bg-zinc-800/60 text-zinc-300 transition-all duration-300 group-hover:border-indigo-400/40 group-hover:text-white group-hover:scale-105">
              <Icon width={22} height={22} />
            </span>

            <span className="inline-flex items-center gap-1 l border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-mono font-semibold tracking-widest text-emerald-400 uppercase">
              <ShieldCheckIcon width={12} height={12} />
              Verified
            </span>
          </div>

          {/* Shine sweep on hover */}
          <div className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
          <div className="space-y-1.5">
            <h3 className="text-lg font-bold tracking-tight text-white sm:text-xl">
              {title}
            </h3>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
              <span>{issuer}</span>
              <span className="text-zinc-700">·</span>
              <span className="inline-flex items-center gap-1">
                <CalendarIcon width={11} height={11} />
                {date}
              </span>
            </div>
          </div>

          <p className="flex-1 text-sm leading-relaxed text-zinc-400">
            {description}
          </p>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="l border border-zinc-800 bg-zinc-900/60 px-2.5 py-1 font-mono text-[10px] tracking-wider text-zinc-400 transition-colors duration-300 group-hover:border-zinc-700 group-hover:text-zinc-200"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-zinc-800/70 pt-4">
            <span className="font-mono text-[10px] tracking-widest text-zinc-600 uppercase">
              ID: {credentialId}
            </span>
            <a
              href={link}
              className="inline-flex items-center gap-1 font-mono text-xs font-semibold tracking-wider text-zinc-300 uppercase transition-colors duration-300 group-hover:text-white"
            >
              View
              <ArrowUpRightIcon
                width={13}
                height={13}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------------------------------------------------------- */
/* Section                                                            */
/* ---------------------------------------------------------------- */

const gridVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

export default function Achievements() {
  return (
    <section className="relative bg-transparent px-4 py-16 text-white sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Back button */}
        <Link to="/">
          <motion.button
            type="button"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="group pt-7 md:pt-0 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-white sm:text-xs"
          >
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
            Back to home
          </motion.button>
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col gap-6 sm:mt-14 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-3xl">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-500 sm:text-xs">
              05 · Credentials
            </span>

            <h2 className="mt-3 text-3xl leading-[1.1] font-black tracking-tight uppercase text-white sm:text-6xl lg:text-7xl">
              Achievements
              <br />
              &amp; Certs
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
              A record of the courses, certifications, and milestones I've
              picked up along the way — proof that the learning never really
              stops.
            </p>
          </div>

          {/* cd button */}
          <button
            type="button"
            onClick={() => window.history.back()}
            className="group inline-flex w-fit shrink-0 items-center gap-2 border border-zinc-800/80 bg-[#101012]/70 px-4 py-2.5 font-mono text-[11px] uppercase tracking-widest text-zinc-400 backdrop-blur-sm transition-colors hover:border-zinc-700 hover:text-white sm:text-xs"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5"
            >
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            cd ..
          </button>
        </motion.div>

        {/* Stat bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 grid grid-cols-3 divide-x divide-zinc-800/80 overflow-hidden border border-zinc-800/80 bg-[#101012]/70 backdrop-blur-sm sm:mt-12"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="px-2 py-4 text-center xs:px-3 xs:py-5 sm:px-8 sm:py-8"
            >
              <div className="font-mono text-lg font-bold text-white xs:text-2xl sm:text-3xl md:text-4xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-1 font-mono text-[8px] leading-tight uppercase tracking-tight text-zinc-500 xs:text-[9px] xs:tracking-widest sm:text-xs">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          {achievements.map((item) => (
            <AchievementCard key={item.title} {...item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
