import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const RESUME_URL =
  "https://drive.google.com/file/d/1apdbjSpM7w5qHi9fRZAOTbPWvK8QK03U/view?usp=sharing";
const GITHUB_URL = "https://github.com/Abinashrout244";
const LINKEDIN_URL = "https://www.linkedin.com/in/abinash-rout-274285322";

const experience = [
  {
    period: "2025 — Present",
    title: "Full-Stack Developer",
    org: "Personal Projects · MERN Stack",
  },
  {
    period: "2026 — Present",
    title: "DSA & Problem Solving",
    org: "Data Structures · Algorithms · Java",
  },
  {
    period: "2026 — Present",
    title: "JAVA Developer",
    org: "OOPS · Micro service · Spring Boot",
  },
];

const education = [
  {
    period: "2044 - 2028",
    title: "Bachelor's Degree in CSE",
    org: "Oxford College of Enginnering & Management , BBSR",
  },
  {
    period: "2022 - 2024",
    title: "Higher Secondary",
    org: "Shanti Institue of Management & Higher Studies , CUTTACK",
  },
];

const parent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const rise = {
  hidden: { opacity: 0, y: 28, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const card =
  "group relative overflow-hidden rounded-[28px] bg-gradient-to-br from-white/[0.07] via-white/[0.025] to-white/[0.005] backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_30px_60px_-30px_rgba(0,0,0,0.8)]";

const label =
  "text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500";

const edgeMask =
  "p-px [mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] [-webkit-mask-composite:xor] [mask-composite:exclude]";

function Glow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-[inherit]"
    >
      {/* Border that fades from one corner to the other */}
      <div
        className={`absolute inset-0 rounded-[inherit] ${edgeMask} bg-[linear-gradient(135deg,rgba(255,255,255,0.24),rgba(255,255,255,0.05)_55%,rgba(255,255,255,0.01))]`}
      />

      {/* Soft light sweeping top-left to bottom-right */}
      <div className="absolute inset-0 rounded-[inherit] bg-[linear-gradient(135deg,transparent_40%,rgba(255,255,255,0.09)_50%,transparent_60%)] bg-[length:300%_300%] bg-[position:100%_100%] transition-[background-position] duration-0 ease-out group-hover:bg-[position:0%_0%] group-hover:duration-[1400ms]" />

      {/* The same light running along the edge */}
      <div
        className={`absolute inset-0 z-20 rounded-[inherit] ${edgeMask} bg-[linear-gradient(135deg,transparent_42%,rgba(255,255,255,0.95)_50%,transparent_58%)] bg-[length:300%_300%] bg-[position:100%_100%] transition-[background-position] duration-0 ease-out group-hover:bg-[position:0%_0%] group-hover:duration-[1400ms]`}
      />
    </div>
  );
}

function Burst({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`fill-white ${className}`}
    >
      {[0, 45, 90, 135].map((r) => (
        <path
          key={r}
          d="M12 0.5 L13.3 12 L12 23.5 L10.7 12Z"
          transform={`rotate(${r} 12 12)`}
        />
      ))}
    </svg>
  );
}

function Sparkle({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={`stroke-zinc-500 transition-all duration-700 group-hover:rotate-90 group-hover:stroke-white ${className}`}
      strokeWidth="1"
    >
      <path d="M12 0C12 6.6 17.4 12 24 12C17.4 12 12 17.4 12 24C12 17.4 6.6 12 0 12C6.6 12 12 6.6 12 0Z" />
    </svg>
  );
}

function Hang({ className = "" }) {
  // thin vertical line that ends in a sparkle
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute top-0 flex flex-col items-center ${className}`}
    >
      <span className="h-8 w-px bg-gradient-to-b from-transparent to-zinc-600 sm:h-10" />
      <Sparkle className="h-6 w-6 sm:h-7 sm:w-7" />
    </div>
  );
}

function Ring({ className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-zinc-700/80 text-zinc-500 transition-all duration-500 group-hover:rotate-45 group-hover:border-white group-hover:text-white ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 17 17 7M8 7h9v9" />
      </svg>
    </span>
  );
}

function TimelineItem({ period, title, org }) {
  return (
    <div>
      <p className="text-[13px] text-zinc-500">{period}</p>
      <p className="mt-1.5 text-base font-medium text-zinc-100 sm:text-[17px]">
        {title}
      </p>
      <p className="mt-1 text-xs text-zinc-500">{org}</p>
    </div>
  );
}

export default function AboutHero({ img }) {
  return (
    <section className="relative px-5 pb-20 pt-10 sm:px-8 sm:pb-28 sm:pt-0">
      <motion.div
        variants={parent}
        initial="hidden"
        animate="show"
        className="relative mx-auto flex max-w-5xl flex-col gap-3 sm:gap-4"
      >
        {/* ---------- Row 1: photo + heading + intro ---------- */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-12 lg:grid-rows-[auto_1fr]">
          {/* Heading */}
          <motion.div
            variants={rise}
            className="order-1 flex items-center justify-between gap-3 lg:order-none lg:col-span-8 lg:col-start-5 lg:row-start-1"
          >
            <Burst className="h-7 w-7 shrink-0 sm:h-9 sm:w-9 lg:h-10 lg:w-10" />
            <h1 className="text-center text-[clamp(1.7rem,6.4vw,3.75rem)] font-extrabold uppercase leading-none tracking-tight text-white">
              Self-Summary
            </h1>
            <Burst className="h-7 w-7 shrink-0 sm:h-9 sm:w-9 lg:h-10 lg:w-10" />
          </motion.div>

          {/* Photo */}
          <motion.div
            variants={rise}
            className="order-2 lg:order-none lg:col-span-4 lg:col-start-1 lg:row-span-2 lg:row-start-1"
          >
            <div
              className={`${card} mx-auto aspect-square w-full max-w-[340px] p-3 sm:p-4 lg:max-w-none`}
            >
              <Glow />
              <div className="relative h-full w-full overflow-hidden rounded-[20px] bg-gradient-to-br from-zinc-800 to-zinc-900">
                <img
                  src={img}
                  alt="Abinash - Full-Stack Developer"
                  className="h-full w-full object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 rounded-[20px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 py-1.5 pl-2.5 pr-3 text-[11px] font-medium text-white backdrop-blur-md">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  Open to work
                </span>
              </div>
            </div>
          </motion.div>

          {/* Intro */}
          <motion.div
            variants={rise}
            className={`${card} order-3 flex min-h-[230px] flex-col justify-end p-6 sm:p-8 lg:order-none lg:col-span-8 lg:col-start-5 lg:row-start-2`}
          >
            <Glow />
            <Hang className="left-7 sm:left-9" />
            <h2 className="text-4xl font-medium tracking-tight text-white sm:text-5xl">
              Abinash
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-[15px]">
              I am a full-stack developer from India building thoughtful digital
              experiences, from interfaces to the systems behind them. I work
              with React, Node.js, MongoDB, Express js , Java and Spring Boot,
              and learn best by shipping real projects.
            </p>
          </motion.div>
        </div>

        {/* ---------- Row 2: experience + education ---------- */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-[1.08fr_1fr]">
          <motion.div variants={rise} className={`${card} p-6 sm:p-8`}>
            <Glow />
            <p className={label}>Experience</p>
            <div className="mt-6 space-y-7">
              {experience.map((e) => (
                <TimelineItem key={e.title} {...e} />
              ))}
            </div>
            <Link
              to="/projects"
              className="mt-8 inline-flex items-center gap-2 text-xs font-medium text-zinc-400 transition-colors hover:text-white"
            >
              View projects
              <span aria-hidden="true">→</span>
            </Link>
          </motion.div>

          <motion.div variants={rise} className={`${card} p-6 sm:p-8`}>
            <Glow />
            <p className={label}>Education</p>
            <div className="mt-6 space-y-7">
              {education.map((e) => (
                <TimelineItem key={e.title} {...e} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* ---------- Row 3: profiles + CTA + credentials ---------- */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-[1fr_2.1fr_1fr]">
          {/* Profiles */}
          <motion.div
            variants={rise}
            className={`${card} flex h-[220px] flex-col justify-between p-4 sm:h-[240px] sm:p-5`}
          >
            <Glow />
            <div className="relative flex items-center justify-center gap-3 rounded-2xl bg-black/40 py-4 shadow-[inset_0_2px_12px_rgba(0,0,0,0.7),inset_0_0_0_1px_rgba(255,255,255,0.03)]">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-b from-[#1c1c1c] to-[#0a0a0a] text-zinc-300 shadow-[0_6px_14px_-4px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-[18px] w-[18px] fill-current"
                >
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                </svg>
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-b from-[#1c1c1c] to-[#0a0a0a] text-zinc-300 shadow-[0_6px_14px_-4px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-[18px] w-[18px] fill-current"
                >
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
                </svg>
              </a>
            </div>
            <div className="flex items-end justify-between px-1">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                  Stay with me
                </p>
                <p className="mt-1 text-base font-medium text-white">
                  Profiles
                </p>
              </div>
              <Ring className="hidden sm:grid" />
            </div>
          </motion.div>

          {/* Work together */}
          <motion.div
            variants={rise}
            className="order-first col-span-2 lg:order-none lg:col-span-1"
          >
            <Link
              to="/contact"
              className={`${card} flex h-[200px] w-full flex-col justify-end p-6 sm:h-[240px] sm:p-8`}
            >
              <Glow />
              <Hang className="left-8 sm:left-9" />
              <p className="text-4xl font-medium leading-[1.1] tracking-tight text-white sm:text-5xl">
                Let&apos;s
                <br />
                work{" "}
                <span className="bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
                  together.
                </span>
              </p>
              <Ring className="absolute bottom-6 right-6 sm:bottom-7 sm:right-8" />
            </Link>
          </motion.div>

          {/* Credentials */}
          <motion.div variants={rise}>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
              className={`${card} flex h-[220px] w-full flex-col justify-between p-4 sm:h-[240px] sm:p-5`}
            >
              <Glow />
              <svg
                aria-hidden="true"
                viewBox="0 0 120 60"
                fill="none"
                className="mx-auto mt-3 h-14 w-28 stroke-zinc-300/80 transition-all duration-500 group-hover:stroke-white sm:h-16 sm:w-32"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 42C16 12 30 6 28 26C27 38 21 48 31 38C40 29 46 21 50 31C53 39 48 44 56 36C65 27 70 28 74 35C78 41 85 25 92 18C98 13 101 24 97 33C95 38 104 35 112 29" />
                <path d="M14 50C40 46 72 50 108 44" opacity="0.5" />
              </svg>
              <div className="flex items-end justify-between px-1">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                    More about me
                  </p>
                  <p className="mt-1 text-base font-medium text-white">
                    Resume
                  </p>
                </div>
                <Ring className="hidden sm:grid" />
              </div>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
