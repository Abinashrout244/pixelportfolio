import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, ArrowUpRight } from "lucide-react";
import { PROJECTS } from "../data/projectsData";

// ─── Background Stars ────────────────────────────────────────────────────────
const rng = (n, salt) => {
  const x = Math.sin(n * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

const BG_STARS = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: rng(i, 8) * 100,
  top: rng(i, 15) * 100,
  size: 0.5 + rng(i, 22) * 1.5,
  opacity: 0.03 + rng(i, 29) * 0.06,
}));

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

// ─── Centered Background "WORK" Watermark (Small -> Big on Scroll) ───────────
function FixedCenterWork({ targetRef, reduced }) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    mass: 0.8,
    restDelta: 0.001,
  });

  /*
   * WORK animation
   *
   * 0.00  → section approaching
   * 0.15  → WORK becomes visible
   * 0.50  → strongest / clearest point
   * 0.85  → starts fading
   * 1.00  → section leaving
   */

  const opacity = useTransform(
    smoothProgress,
    [0, 0.12, 0.28, 0.5, 0.72, 0.88, 1],
    [0, 0.35, 0.72, 0.95, 0.72, 0.35, 0],
  );

  /*
   * Start slightly smaller → grow → hold → gently shrink
   */
  const scale = useTransform(
    smoothProgress,
    [0, 0.2, 0.45, 0.7, 1],
    [0.72, 0.9, 1, 0.98, 0.82],
  );

  /*
   * Small horizontal movement makes the word feel alive
   * without destroying the centered layout.
   */
  const x = useTransform(smoothProgress, [0, 0.5, 1], ["-2%", "0%", "2%"]);

  /*
   * Slight blur while entering/leaving.
   * Completely sharp around the center.
   */
  const blur = useTransform(
    smoothProgress,
    [0, 0.2, 0.45, 0.55, 0.8, 1],
    [6, 2, 0, 0, 2, 6],
  );

  const filter = useTransform(blur, (value) => `blur(${value}px)`);

  /*
   * Letter spacing animation.
   * Keeps the same visual style but gives the word
   * a subtle cinematic expansion.
   */
  const letterSpacing = useTransform(
    smoothProgress,
    [0, 0.3, 0.5, 0.7, 1],
    ["-0.01em", "-0.035em", "-0.04em", "-0.025em", "-0.01em"],
  );

  if (reduced) return null;

  return (
    <div
      aria-hidden="true"
      className="
        sticky
        top-0
        h-screen
        w-full
        pointer-events-none
        z-0
        flex
        items-center
        justify-center
        -mb-[100vh]
        overflow-hidden
        select-none
      "
    >
      {/* Emerald atmospheric glow */}
      <div
        className="
          absolute
          w-[500px]
          sm:w-[850px]
          h-[350px]
          sm:h-[450px]
          bg-emerald-950/25
          blur-[130px]
          rounded-full
          pointer-events-none
        "
      />

      <motion.div
        style={{
          opacity,
          scale,
          x,
          filter,
        }}
        className="
          relative
          w-full
          flex
          items-center
          justify-center
          pointer-events-none
          px-4
          will-change-transform
        "
      >
        <motion.span
          className="
            font-geist
            font-[900]
            uppercase
            select-none
            text-transparent
            leading-none
            text-center
            block
            whitespace-nowrap
          "
          style={{
            fontSize: "clamp(120px, 28vw, 440px)",

            /*
             * KEEPING YOUR ORIGINAL COLOR
             */
            WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.11)",

            /*
             * Same subtle emerald atmosphere
             */
            textShadow: "0 0 80px rgba(16, 185, 129, 0.05)",

            letterSpacing,
          }}
        >
          WORK
        </motion.span>
      </motion.div>
    </div>
  );
}

// ─── Individual Tech Pill ───────────────────────────────────────────────────
function TechPill({ label }) {
  return (
    <span className="inline-flex items-center justify-center bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-white/60 hover:text-white transition-all duration-200 select-none">
      {label}
    </span>
  );
}

// ─── Project Image Slide ────────────────────────────────────────────────────
function ProjectImageSlide({ project, reduced, onOpen }) {
  const imageRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const lift = useMotionValue(0);

  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [7, -7]), {
    stiffness: 180,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-7, 7]), {
    stiffness: 180,
    damping: 24,
  });
  const translateY = useSpring(lift, { stiffness: 180, damping: 24 });
  const badgePathId = `discover-path-${project?.slug || "project"}`;

  const handlePointerMove = (event) => {
    const element = imageRef.current;
    if (!element || reduced) return;
    const bounds = element.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  const handlePointerEnter = () => {
    setHovered(true);
    if (!reduced) lift.set(-6);
  };

  const handlePointerLeave = () => {
    setHovered(false);
    pointerX.set(0);
    pointerY.set(0);
    lift.set(0);
  };

  return (
    <div className="w-full border border-white/[0.08] bg-[#0c0c0e]/90 backdrop-blur-xl p-4 sm:p-7 lg:p-9 shadow-2xl">
      <div className="[perspective:1200px]">
        <motion.div
          ref={imageRef}
          role="button"
          tabIndex={0}
          aria-label={`Open ${project?.title || "project"}`}
          onMouseMove={handlePointerMove}
          onMouseEnter={handlePointerEnter}
          onMouseLeave={handlePointerLeave}
          onClick={onOpen}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onOpen();
          }}
          className="group relative aspect-[16/10] w-full cursor-pointer overflow-hidden border bg-black/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50"
          style={{
            rotateX: reduced ? 0 : rotateX,
            rotateY: reduced ? 0 : rotateY,
            y: reduced ? 0 : translateY,
            transformStyle: "preserve-3d",
            borderColor: hovered
              ? "rgba(52, 211, 153, 0.35)"
              : "rgba(255,255,255,0.1)",
            boxShadow: hovered
              ? "0 25px 55px -12px rgba(0,0,0,0.85), 0 0 45px rgba(16,185,129,0.14)"
              : "0 10px 30px rgba(0,0,0,0.6)",
            transition: "border-color 300ms ease, box-shadow 300ms ease",
          }}
        >
          <div className="relative h-full w-full">
            {project?.image ? (
              <motion.img
                src={project.image}
                alt={project?.title || "Project preview"}
                className="relative z-10 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full items-center justify-center font-mono text-xs uppercase tracking-[0.2em] text-white/40">
                Image preview unavailable
              </div>
            )}

            <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            {/* Rotating Stamp */}
            <motion.div
              className="absolute right-3 top-3 z-30 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center opacity-90 transition-opacity duration-300 group-hover:opacity-100"
              animate={reduced ? undefined : { rotate: 360 }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            >
              <svg
                viewBox="0 0 120 120"
                className="absolute inset-0 h-full w-full fill-white/80"
              >
                <defs>
                  <path
                    id={badgePathId}
                    d="M 60,60 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
                  />
                </defs>
                <text className="font-mono text-[9px] uppercase tracking-[0.14em]">
                  <textPath href={`#${badgePathId}`}>
                    DISCOVER • OPEN • EXPLORE •{" "}
                  </textPath>
                </text>
              </svg>
              <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white text-black shadow-lg">
                <Eye size={14} strokeWidth={2.4} />
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Individual Project Card Row ────────────────────────────────────────────
function FeaturedProjectCard({ project, index, reduced }) {
  const isImageRight = index % 2 === 0;
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.article
      ref={cardRef}
      initial={reduced ? {} : { opacity: 0, y: 40 }}
      animate={
        reduced ? {} : cardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
      }
      transition={{
        duration: 0.8,
        delay: 0.1 + index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`relative z-20 flex flex-col ${
        isImageRight ? "lg:flex-row" : "lg:flex-row-reverse"
      } gap-8 lg:gap-14 xl:gap-20 items-center`}
    >
      {/* Fully Transparent Content Info */}
      <div className="flex-1 w-full flex flex-col items-start bg-transparent border-none p-0">
        <div className="flex items-center gap-3.5 mb-5">
          <span className="font-mono text-[12px] tracking-[0.1em] text-white/40">
            0{index + 1}
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-emerald-400/90 px-2.5 py-0.5 border border-emerald-500/20 bg-emerald-500/5">
            {project.category}
          </span>
          <span className="font-mono text-[11px] tracking-[0.1em] text-white/40">
            {project.date}
          </span>
        </div>

        <h3 className="font-geist font-[800] text-white text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.08] tracking-tight mb-4 drop-shadow-md">
          {project.title}
        </h3>

        <p className="font-geist text-[15px] sm:text-[16px] text-white/70 leading-relaxed max-w-lg mb-7 drop-shadow-sm">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((t) => (
            <TechPill key={t} label={t} />
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3.5">
          <button
            onClick={() => navigate(`/projects/${project.slug}`)}
            className="group relative px-6 py-3 bg-white text-black font-mono text-[11px] tracking-[0.15em] uppercase overflow-hidden active:scale-95 transition-transform"
          >
            <span className="relative z-10 font-bold flex items-center gap-1.5">
              Case Study <ArrowUpRight size={13} strokeWidth={2.5} />
            </span>
            <div className="absolute inset-0 bg-neutral-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </button>

          {project.liveUrl && project.liveUrl !== "#" && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 border border-white/10 text-white/80 hover:text-white font-mono text-[11px] tracking-[0.15em] uppercase hover:border-white/30 hover:bg-white/[0.04] transition-colors"
            >
              Live Demo
            </a>
          )}
          {project.githubUrl && project.githubUrl !== "#" && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 border border-white/10 text-white/80 hover:text-white font-mono text-[11px] tracking-[0.15em] uppercase hover:border-white/30 hover:bg-white/[0.04] transition-colors"
            >
              Source
            </a>
          )}
        </div>
      </div>

      {/* Project Media */}
      <div className="flex-1 w-full">
        <ProjectImageSlide
          project={project}
          reduced={reduced}
          onOpen={() => navigate(`/projects/${project.slug}`)}
        />
      </div>
    </motion.article>
  );
}

// ─── Main Featured Projects Section ───────────────────────────────────────────
export default function FeaturedProjects() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();

  const featured = PROJECTS.filter((p) => p.featured).slice(0, 4);

  const mp = (initial, animate, transition) =>
    reduced ? {} : { initial, animate, transition };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full bg-[#050507]"
      aria-labelledby="featured-projects-heading"
    >
      {/* ── Fixed Viewport Center Background "WORK" with dynamic scaling ── */}
      <FixedCenterWork targetRef={sectionRef} reduced={reduced} />

      {/* ── Star Background Dots ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
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
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 py-20 sm:py-28 lg:py-36">
        {/* Header Block */}
        <div ref={headingRef} className="mb-16 sm:mb-24 lg:mb-32">
          <motion.div
            className="flex items-center gap-3 mb-6"
            {...mp(
              { opacity: 0, y: 12 },
              headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
              { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
            )}
          >
            <div className="h-px w-6 bg-emerald-400/50" />
            <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-emerald-400/80">
              Selected Works
            </span>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <motion.h2
              id="featured-projects-heading"
              className="font-geist font-[800] text-white leading-[0.9] tracking-tight"
              style={{
                fontSize: "clamp(42px, 7vw, 92px)",
                letterSpacing: "-0.04em",
              }}
              {...mp(
                { opacity: 0, x: -20 },
                headingInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 },
                { duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] },
              )}
            >
              FEATURED
              <br />
              <span
                style={{
                  WebkitTextStroke: "1px rgba(255,255,255,0.25)",
                  color: "transparent",
                }}
              >
                PROJECTS
              </span>
            </motion.h2>

            <motion.div
              {...mp(
                { opacity: 0, x: 20 },
                headingInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 },
                { duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
              )}
            >
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2.5 font-mono text-[11px] sm:text-[12px] tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors"
              >
                Archive Catalogue
                <span className="transform group-hover:translate-x-1.5 transition-transform duration-200">
                  →
                </span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* ── Foreground Scrolling Project Cards ── */}
        <div className="relative z-20 flex flex-col gap-24 sm:gap-32 lg:gap-44">
          {featured.map((project, index) => (
            <FeaturedProjectCard
              key={project.id || index}
              project={project}
              index={index}
              reduced={reduced}
            />
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          className="mt-24 sm:mt-36 flex justify-center relative z-20"
          {...mp(
            { opacity: 0, y: 20 },
            headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
            { delay: 0.3, duration: 0.8 },
          )}
        >
          <Link
            to="/projects"
            className="group relative px-8 py-4 bg-transparent border border-white/15 hover:border-white/35 transition-colors font-mono text-[11px] tracking-[0.2em] uppercase text-white"
          >
            <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 flex items-center gap-3">
              Explore All Repositories
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
