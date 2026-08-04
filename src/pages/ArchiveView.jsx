import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { PROJECTS } from "../data/projectsData";

// ─── Deterministic RNG ───────────────────────────────────────────────────────
const rng = (n, salt) => {
  const x = Math.sin(n * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

// ─── Background stars & orbs ────────────────────────────────────────────────
const BG_STARS = Array.from({ length: 45 }, (_, i) => ({
  id: i,
  left: rng(i, 8) * 100,
  top: rng(i, 15) * 100,
  size: 0.5 + rng(i, 22) * 1.5,
  opacity: 0.04 + rng(i, 29) * 0.09,
  duration: 4 + rng(i, 36) * 6,
  delay: rng(i, 43) * -8,
}));

const ORBS = [
  { id: 0, left: "15%", top: "25%", w: 320, h: 320, alpha: 0.015, dur: 22, delay: 0 },
  { id: 1, left: "75%", top: "65%", w: 280, h: 280, alpha: 0.012, dur: 28, delay: -10 },
];

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

function SectionSpotlight() {
  const [pos, setPos] = useState({ x: 50, y: 20 });
  const rawX = useMotionValue(50);
  const rawY = useMotionValue(20);
  useSpring(rawX, { stiffness: 50, damping: 22 });
  useSpring(rawY, { stiffness: 50, damping: 22 });

  useEffect(() => {
    const onMove = (e) => {
      setPos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      <div
        style={{
          position: "absolute",
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          width: "750px",
          height: "750px",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 60%)",
          filter: "blur(45px)",
          transition: "left 0.2s ease, top 0.2s ease",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

// ─── Archive Grid Card ───────────────────────────────────────────────────────
 function ArchiveCard({ project, index = 0, reduced = false }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  // Auto-formatted project number (e.g., "01")
  const projectNumber = index < 9 ? `0${index + 1}` : `${index + 1}`;

  // Formatting date for the uppercase mono look
  const formattedDate = project?.date?.length === 4 ? `FEB ${project.date}` : project?.date?.toUpperCase() || '2026';

  // Framer Motion animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const metadataVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.7, transition: { duration: 0.5 } },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const previewBoxVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const techTagVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const handleClick = () => {
    if (project?.liveUrl && project.liveUrl !== '#') {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
    } else if (project?.slug) {
      navigate(`/projects/${project.slug}`);
    }
  };

  return (
    <section className="relative w-full bg-gradient-to-b from-[#161616] to-[#0c0c0c] text-white py-12 md:py-20 overflow-hidden select-none">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-black to-black opacity-60" />
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-[1500px] px-4 sm:px-6 md:px-10 lg:px-12"
        variants={reduced ? {} : containerVariants}
        initial={reduced ? 'visible' : 'hidden'}
        animate="visible"
      >
        {/* 1. Metadata Row */}
        <motion.div
          variants={metadataVariants}
          className="flex items-center justify-between font-mono text-[11px] sm:text-[13px] uppercase tracking-[0.2em] text-white/70 mb-4 sm:mb-6"
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-white/90 font-semibold">{projectNumber}</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>{project?.category || 'WEB APPLICATION'}</span>
          </div>
          <div>
            <span>{formattedDate}</span>
          </div>
        </motion.div>

        {/* 2. Project Title */}
        <motion.h1
          variants={titleVariants}
          className="font-extrabold text-white tracking-tight mb-10 text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px] leading-[1.05]"
        >
          {project?.title}
        </motion.h1>

        {/* 3. Main Preview Container */}
        <motion.div
          variants={previewBoxVariants}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={handleClick}
          className="group cursor-pointer relative w-full bg-white/[0.03] border border-white/[0.08] p-6 sm:p-8 md:p-10 mb-8 sm:mb-10 transition-colors duration-300 hover:border-white/20"
          style={{ borderRadius: '0px' }}
        >
          {/* Top Row: Large Description + Minimal Top-Right Arrow */}
          <div className="flex items-start justify-between gap-6 mb-8 md:mb-12">
            <p className="font-semibold text-white/90 leading-[1.3] max-w-[85%] text-[12px] sm:text-[14px] md:text-[18px]">
              {project?.description || project?.shortDescription}
            </p>

            {/* Top-Right Arrow (No circle, no background) */}
            <motion.div
              animate={{
                y: hovered ? -4 : 0,
                x: hovered ? 4 : 0,
                opacity: hovered ? 1 : 0.7,
              }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="text-white shrink-0 pt-2"
              aria-label="Open Project"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </motion.div>
          </div>

          {/* Screenshot Container */}
          <div className="w-full overflow-hidden border border-white/[0.08]">
            <img
              src={project?.image}
              alt={project?.title || 'Project Preview'}
              className="w-full h-auto object-cover block"
            />
          </div>
        </motion.div>

        {/* 4. Technology Stack Tags */}
        <motion.div
          className="flex flex-wrap gap-3"
          variants={reduced ? {} : containerVariants}
        >
          {project?.tech?.map((item, i) => (
            <motion.span
              key={`${item}-${i}`}
              variants={techTagVariants}
              className="bg-white/[0.04] border border-white/[0.08] px-4 py-2 font-mono text-[12px] sm:text-[13px] uppercase tracking-[1px] text-white/80 transition-colors duration-200 hover:border-white/20 hover:text-white"
            >
              {item}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Main Archive View ───────────────────────────────────────────────────────
export default function ArchiveView() {
  const reduced = useReducedMotion();
  const mp = (initial, animate, exit, transition) =>
    reduced ? {} : { initial, animate, exit, transition };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      className="min-h-screen relative w-full pt-28 pb-32 "
      style={{ backgroundColor: "transparent" }}
      {...mp({ opacity: 0 }, { opacity: 1 }, { opacity: 0 }, { duration: 0.6, ease: "easeInOut" })}
    >
      {/* ── Background Elements ── */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
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
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
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
      
      <div className="fixed top-0 left-1/2 -translate-x-1/2 pointer-events-none z-0">
        <div
          style={{
            width: "900px",
            height: "600px",
            background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.02) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
      </div>

      <SectionSpotlight />

  <div className="relative z-10 w-full max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-32">
  {/* Nav Back - Aligned with Grid Margin */}
  <motion.div
    className="mb-6 sm:mb-8"
    {...mp({ opacity: 0, x: -20 }, { opacity: 1, x: 0 }, undefined, { duration: 0.5, delay: 0.1 })}
  >
    <Link
      to="/"
      className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors"
    >
      <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
      Back to Portfolio
    </Link>
  </motion.div>

  {/* Header Section - Single Line & Aligned */}
 <div className="mb-12 sm:mb-16">
  {/* Archive Label */}
  <motion.div
    className="flex items-center gap-3 mb-4 sm:mb-6"
    {...mp({ opacity: 0, y: 16 }, { opacity: 1, y: 0 }, undefined, { duration: 0.6 })}
  >
    <div className="h-px w-6" style={{ background: "rgba(255,255,255,0.2)" }} />
    <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.24em] uppercase text-white/30">
      Archive
    </span>
  </motion.div>

  {/* Main Title */}
  <motion.h1
    className="font-geist font-[800] text-white leading-none tracking-tight flex flex-wrap items-center gap-x-4 mb-6"
    style={{ fontSize: "clamp(36px, 6.5vw, 80px)", letterSpacing: "-0.04em" }}
    {...mp({ opacity: 0, x: -30 }, { opacity: 1, x: 0 }, undefined, { duration: 0.8, delay: 0.1 })}
  >
    <span>ALL</span>
    <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>
      PROJECTS
    </span>
  </motion.h1>

  {/* Subtitle / Description Paragraph */}
  <motion.p
    className="font-geist text-[15px] sm:text-[18px] text-white/50 leading-relaxed max-w-2xl"
    {...mp({ opacity: 0, y: 20 }, { opacity: 1, y: 0 }, undefined, { duration: 0.7, delay: 0.2 })}
  >
    A curated collection of web applications, experiments, and digital experiences 
    built with modern technologies and a focus on design systems.
  </motion.p>
</div>

  {/* 2-Column Grid - Perfectly Aligned with Header */}
  <div className="grid grid-cols-1 md:grid-cols-2 ">
    {PROJECTS.map((project, idx) => (
      <ArchiveCard key={project.id} project={project} index={idx} reduced={reduced} />
    ))}
  </div>
</div>
    </motion.div>
  );
}
