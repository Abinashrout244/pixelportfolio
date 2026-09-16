import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export default function AboutHero({ img }) {
  return (
    <section className="relative overflow-hidden px-6 sm:px-10 pb-16 ">
      {/* Background watermark — cropped, editorial, very low opacity */}
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-6 left-1/2 -translate-x-1/2 lg:left-[-4%] lg:translate-x-0 text-[22vw] sm:text-[18vw] lg:text-[14vw] font-extrabold tracking-tight text-white/[0.03] whitespace-nowrap leading-none"
      >
        ABINASH
      </span>

      <div className="relative max-w-6xl mx-auto">
        {/* Top metadata row */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="flex items-center justify-between mb-16 sm:mb-20"
        >
          <span className="text-xs font-mono tracking-[0.2em] text-zinc-500 uppercase">
            About
          </span>
          <span className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-emerald-400 uppercase">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>
            Open to work
          </span>
        </motion.div>

        {/* Main identity — outside any card, dominant */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerParent}
          className="max-w-3xl mb-14 sm:mb-20"
        >
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.95]"
          >
            <span className="text-emerald-400">Hi,</span> I'm Abinash.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-lg sm:text-xl text-zinc-400 leading-relaxed max-w-xl"
          >
            Full-stack developer building thoughtful digital experiences — from
            interfaces to the systems behind them.
          </motion.p>
        </motion.div>

        {/* Asymmetric workspace: terminal (wide, left) + image (offset, right) */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-0 items-start">
          {/* Connector line — desktop only */}
          <svg
            aria-hidden="true"
            className="hidden lg:block absolute top-[38%] left-[58%] w-[10%] h-px overflow-visible pointer-events-none z-0"
          >
            <line
              x1="0"
              y1="0"
              x2="100%"
              y2="0"
              stroke="rgb(63 63 70)"
              strokeWidth="1"
            />
            <motion.circle
              cy="0"
              r="2"
              fill="rgb(52 211 153)"
              initial={{ cx: "0%", opacity: 0 }}
              animate={{ cx: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                repeatDelay: 3.5,
                ease: "easeInOut",
              }}
            />
          </svg>

          {/* Terminal window */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.25 }}
            className="lg:col-span-7 relative z-10"
          >
            <div className="rounded-lg border border-zinc-800 bg-black/60 backdrop-blur-sm overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-800 bg-zinc-950/80">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
                <span className="ml-3 text-[11px] font-mono text-zinc-500">
                  whoami.sh
                </span>
              </div>
              <div className="p-5 sm:p-7 font-mono text-[13px] sm:text-sm leading-relaxed">
                <p className="text-zinc-500">
                  <span className="text-emerald-400">$</span> whoami
                </p>
                <p className="mt-1 text-zinc-300">abinash@portfolio</p>

                <div className="mt-5 space-y-1.5">
                  <p className="text-zinc-500">
                    role<span className="text-zinc-700"> </span>
                    <span className="text-emerald-400">→</span>{" "}
                    <span className="text-zinc-300">Full-stack Developer</span>
                  </p>
                  <p className="text-zinc-500">
                    focus<span className="text-zinc-700"> </span>
                    <span className="text-emerald-400">→</span>{" "}
                    <span className="text-zinc-300">Web Applications</span>
                  </p>
                  <p className="text-zinc-500">
                    status<span className="text-zinc-700"> </span>
                    <span className="text-emerald-400">→</span>{" "}
                    <span className="text-zinc-300">Open to Work</span>
                  </p>
                </div>

                <p className="mt-6 text-zinc-500">
                  <span className="text-emerald-400">$</span>{" "}
                  ./build-something-great
                  <span className="inline-block w-[7px] h-[14px] bg-emerald-400/80 ml-1 align-middle animate-pulse" />
                </p>
              </div>
            </div>
          </motion.div>

          {/* Image window — offset asymmetrically */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.45 }}
            className="lg:col-span-5 lg:mt-[-3.5rem] lg:pl-8 relative z-10"
          >
            {/* Outer Wrapper for the Animated Border */}
            <div className="relative max-w-xs lg:ml-auto rounded-lg p-[1px] overflow-hidden group">
              {/* Infinite Rotating Emerald Glow */}
              <motion.div
                aria-hidden="true"
                className="absolute -inset-[150%] opacity-80 blur-sm pointer-events-none"
                style={{
                  background:
                    "conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 280deg, #34d399 340deg, #10b981 360deg)",
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Subtle Background Glow Beam */}
              <motion.div
                aria-hidden="true"
                className="absolute -inset-[150%] opacity-40 blur-xl pointer-events-none"
                style={{
                  background:
                    "conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 280deg, #34d399 340deg, #10b981 360deg)",
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Inner Card Content */}
              <div className="relative rounded-[7px] border border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-800 bg-zinc-950/80">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
                  <span className="ml-3 text-[11px] font-mono text-zinc-500">
                    whoami.png
                  </span>
                </div>
                <div className="p-2">
                  <img
                    src={img}
                    alt="Abinash - Full-Stack Developer"
                    className="w-full aspect-[4/5] object-cover object-center rounded-md"
                  />
                </div>
              </div>
            </div>

            <p className="mt-3 text-[11px] font-mono tracking-widest text-zinc-500 uppercase text-right lg:pr-1">
              India · Available
            </p>
          </motion.div>
        </div>

        {/* Tech pills */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerParent}
          transition={{ delayChildren: 0.7 }}
          className="flex flex-wrap gap-2 mt-14 sm:mt-16"
        >
          {["React", "Node.js", "MongoDB", "Java", "Spring Boot"].map(
            (label) => (
              <motion.span
                key={label}
                variants={fadeUp}
                className="px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-mono"
              >
                {label}
              </motion.span>
            ),
          )}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ delay: 0.9 }}
          className="flex flex-wrap gap-3 mt-8"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-white text-zinc-950 text-sm font-mono font-medium transition-transform duration-200 hover:-translate-y-0.5"
          >
            view projects
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </a>
          <a
            href="#resume"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-zinc-700 text-zinc-300 text-sm font-mono transition-colors duration-200 hover:border-zinc-500 hover:text-white"
          >
            $ curl resume.pdf
          </a>
        </motion.div>
      </div>
    </section>
  );
}
