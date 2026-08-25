import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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

function IconX(props) {
  return (
    <svg {...iconProps} {...props} fill="currentColor" stroke="none">
      <path d="M18.2 3h3l-7.5 8.6L22.5 21h-6.9l-5.4-6.6L3.9 21H.9l8-9.2L1.5 3h7l4.9 6zM17 19h1.7L7.1 4.9H5.3z" />
    </svg>
  );
}
function IconLinkedin(props) {
  return (
    <svg {...iconProps} {...props} fill="currentColor" stroke="none">
      <path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0zM3.5 8.75h3.4V21H3.5V8.75zM9.75 8.75h3.26v1.68h.05c.45-.86 1.56-1.77 3.22-1.77 3.44 0 4.08 2.27 4.08 5.22V21h-3.4v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.54 1.72-2.54 3.48V21H9.75V8.75z" />
    </svg>
  );
}
function IconGithub(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
    </svg>
  );
}
function IconDiscord(props) {
  return (
    <svg {...iconProps} {...props} fill="currentColor" stroke="none">
      <path d="M20.3 5.4A18 18 0 0 0 15.7 4l-.3.6a13 13 0 0 1 3.9 1.5 15 15 0 0 0-11.6 0A13 13 0 0 1 11.6 4l-.3-.6a18 18 0 0 0-4.6 1.4C3.6 9 2.9 12.6 3.2 16.1a18 18 0 0 0 5.2 2.6l.8-1.3a12 12 0 0 1-1.9-.9l.4-.3a13 13 0 0 0 11 0l.4.3c-.6.4-1.2.6-1.9.9l.8 1.3a18 18 0 0 0 5.2-2.6c.4-4-.7-7.6-2.9-10.7zM9.7 14.3c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8zm4.6 0c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8z" />
    </svg>
  );
}
function IconMail(props) {
  return (
    <svg {...iconProps} {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}
function IconFolder(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
}
function IconFileText(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M8 13h8M8 17h5" />
    </svg>
  );
}
function IconRss(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M4 11a9 9 0 0 1 9 9" />
      <path d="M4 4a16 16 0 0 1 16 16" />
      <circle cx="5" cy="19" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
function IconWrench(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M14.7 6.3a4 4 0 1 0-5.4 5.4l-7 7a1.5 1.5 0 0 0 2.1 2.1l7-7a4 4 0 0 0 5.4-5.4l-2.7 2.7-2.1-2.1z" />
    </svg>
  );
}
function IconBookOpen(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M2 4.5A2.5 2.5 0 0 1 4.5 2H9a3 3 0 0 1 3 3 3 3 0 0 1 3-3h4.5A2.5 2.5 0 0 1 22 4.5v14A2.5 2.5 0 0 1 19.5 21H15a3 3 0 0 0-3 3 3 3 0 0 0-3-3H4.5A2.5 2.5 0 0 1 2 18.5v-14z" />
      <path d="M12 5v19" transform="translate(0 -3)" />
    </svg>
  );
}
function IconArrowUpRight(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

/* ---------------------------------------------------------------- */
/* Data                                                             */
/* ---------------------------------------------------------------- */

const SOCIALS = [
  { icon: IconGithub, href: "https://github.com/", label: "GitHub" },
  { icon: IconLinkedin, href: "https://linkedin.com/", label: "LinkedIn" },
  { icon: IconX, href: "https://x.com/", label: "X" },
  { icon: IconDiscord, href: "#discord", label: "Discord" },
  { icon: IconMail, href: "mailto:abinash.work@gmail.com", label: "Email" },
];

const SERVICES = [
  {
    id: "portfolio",
    title: "Portfolio",
    desc: "All my shipped projects & case studies",
    icon: IconFolder,
    href: "/",
    baseMs: 38,
  },
  {
    id: "github",
    title: "GitHub",
    desc: "Open-source code & experiments",
    icon: IconGithub,
    href: "https://github.com/",
    baseMs: 64,
  },
  {
    id: "resume",
    title: "Resume",
    desc: "Download the latest PDF",
    icon: IconFileText,
    href: "#resume",
    baseMs: 21,
  },
  {
    id: "blog",
    title: "Blog",
    desc: "Notes on building & shipping",
    icon: IconRss,
    href: "#blog",
    baseMs: 47,
  },
  {
    id: "uses",
    title: "Uses",
    desc: "The gear & stack behind the work",
    icon: IconWrench,
    href: "#uses",
    baseMs: 29,
  },
  {
    id: "guestbook",
    title: "Guestbook",
    desc: "Leave a note, say hello",
    icon: IconBookOpen,
    href: "#guestbook",
    baseMs: 33,
  },
];

/* ---------------------------------------------------------------- */

function formatAgo(seconds) {
  if (seconds < 60) return `${seconds}s ago`;
  const m = Math.floor(seconds / 60);
  return `${m}m ago`;
}

function useLiveLatency(services) {
  const [ms, setMs] = useState(() =>
    Object.fromEntries(services.map((s) => [s.id, s.baseMs])),
  );
  useEffect(() => {
    const id = setInterval(() => {
      setMs((prev) => {
        const next = { ...prev };
        services.forEach((s) => {
          const jitter = Math.round((Math.random() - 0.5) * 8);
          next[s.id] = Math.max(9, s.baseMs + jitter);
        });
        return next;
      });
    }, 3200);
    return () => clearInterval(id);
  }, [services]);
  return ms;
}

export default function ConnectWithMe() {
  const latency = useLiveLatency(SERVICES);
  const [secondsAgo, setSecondsAgo] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSecondsAgo((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const avgMs = useMemo(() => {
    const vals = Object.values(latency);
    return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
  }, [latency]);

  return (
    <div className="relative min-h-screen bg-[#08090a] font-sans text-white antialiased selection:bg-emerald-500/30 selection:text-white">
      {/* Texture & Glow */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_20%,black_10%,transparent_75%)]" />
      <div className="pointer-events-none fixed left-1/2 top-0 h-96 w-[44rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px] lg:h-[32rem] lg:w-[60rem]" />

      {/* Main Container */}
      <div className="relative mx-auto flex min-h-screen max-w-2xl flex-col px-5 pb-20 pt-24 sm:px-8 sm:pt-28">
        {/* Profile — ID badge on a lanyard */}
        <div className="flex flex-col items-center text-center">
          <div className="relative flex flex-col items-center">
            {/* strap */}
            <div className="h-8 w-1.5 rounded-full bg-gradient-to-b from-zinc-800 to-zinc-700 sm:h-11" />
            {/* swivel clip */}
            <div className="z-10 -mt-0.5 h-3.5 w-3.5 rounded-full border-2 border-zinc-600 bg-[#08090a]" />

            {/* CARD WITH HOVER ANIMATION */}
            <motion.div
              initial={{ y: -36, opacity: 0, rotate: -9 }}
              animate={{
                y: 0,
                opacity: 1,
                rotate: [-3, 3, -3],
              }}
              whileHover={{
                scale: 1.03,
                y: -6,
                borderColor: "rgba(16, 185, 129, 0.4)",
                boxShadow:
                  "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 20px 2px rgba(16, 185, 129, 0.15)",
                transition: { type: "spring", stiffness: 350, damping: 20 },
              }}
              transition={{
                y: { type: "spring", stiffness: 140, damping: 13, delay: 0.05 },
                opacity: { duration: 0.35, delay: 0.05 },
                rotate: {
                  delay: 0.65,
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              style={{ transformOrigin: "top center" }}
              className="group relative -mt-px w-56 cursor-pointer overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/80 p-2.5 shadow-2xl shadow-black/60 backdrop-blur-md transition-colors duration-300 sm:w-64 sm:p-3"
            >
              {/* punch hole */}
              <span className="absolute -top-2 left-1/2 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-[#08090a] ring-2 ring-zinc-700" />

              {/* photo */}
              <div className="relative">
                <div className="absolute -inset-1 rounded-xl bg-emerald-500/20 blur-md transition-all duration-300 group-hover:bg-emerald-500/30 group-hover:blur-lg" />
                <img
                  src="https://res.cloudinary.com/dnxha9arx/image/upload/v1785697277/profile_igdi61.png"
                  alt="Abinash"
                  loading="eager"
                  className="relative aspect-[3/4] w-full rounded-xl border border-white/10 object-cover shadow-lg transition-transform duration-300 group-hover:scale-[1.01]"
                />
              </div>
            </motion.div>
          </div>

          <p className="mt-7 max-w-md text-sm font-normal leading-relaxed text-zinc-400 sm:text-[15px]">
            Full-stack developer building fast, opinionated interfaces.
            Currently shipping things worth showing off.
          </p>

          <div className="mt-5 flex items-center gap-2.5">
            {SOCIALS.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/70 text-zinc-400 outline-none transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/40 hover:bg-zinc-900 hover:text-emerald-400 focus-visible:ring-2 focus-visible:ring-emerald-500/60"
                >
                  <Icon width={16} height={16} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Status Banner */}
        <div className="mt-10 flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] px-5 py-3.5 backdrop-blur-sm">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-sm font-medium tracking-tight text-emerald-300">
              All systems operational
            </span>
          </div>
          <span className="font-mono text-[11px] tabular-nums text-zinc-500">
            {avgMs}ms avg · checked {formatAgo(secondsAgo)}
          </span>
        </div>

        {/* Services List */}
        <div className="mt-3.5 divide-y divide-zinc-800/60 overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-md">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            const val = latency[s.id];
            return (
              <motion.a
                key={s.id}
                href={s.href}
                whileHover={{ x: 5, backgroundColor: "rgba(39, 39, 42, 0.5)" }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="group/row flex items-center gap-4 px-5 py-4 outline-none transition-colors duration-150 focus-visible:bg-zinc-800/40 sm:px-6 sm:py-4.5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/90 text-zinc-400 transition-colors group-hover/row:border-emerald-500/40 group-hover/row:text-emerald-400">
                  <Icon width={17} height={17} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold tracking-tight text-zinc-100 sm:text-[15px]">
                    {s.title}
                  </span>
                  <span className="block truncate text-xs text-zinc-400 sm:text-[13px]">
                    {s.desc}
                  </span>
                </span>

                <span className="flex shrink-0 items-center gap-3">
                  <span className="hidden items-center gap-1.5 font-mono text-[11px] tabular-nums text-zinc-500 sm:flex">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {val}ms
                  </span>
                  <IconArrowUpRight
                    width={15}
                    height={15}
                    className="text-zinc-600 transition-all duration-150 group-hover/row:-translate-y-0.5 group-hover/row:translate-x-0.5 group-hover/row:text-emerald-400"
                  />
                </span>
              </motion.a>
            );
          })}
        </div>

        {/* Subscribe */}
        <motion.div
          whileHover={{ y: -3, borderColor: "rgba(63, 63, 70, 1)" }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="mt-8 rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5 backdrop-blur-md transition-shadow duration-300 hover:shadow-xl hover:shadow-black/40 sm:p-6"
        >
          <p className="text-sm font-semibold text-zinc-200">
            Get notified on new posts & projects
          </p>
          <p className="mt-1 text-xs text-zinc-400 sm:text-[13px]">
            No spam — just updates when something ships.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-3.5 flex flex-col gap-2.5 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="you@email.com"
              className="min-w-0 flex-1 rounded-lg border border-zinc-800 bg-zinc-900/80 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-emerald-500/50"
            />
            <button
              type="submit"
              className="shrink-0 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-400"
            >
              Subscribe
            </button>
          </form>
        </motion.div>

        {/* Footer */}
        <div className="mt-10 text-center font-mono text-[11px] text-zinc-500">
          All systems nominal · built by Abinash · © 2026
        </div>
      </div>
    </div>
  );
}
