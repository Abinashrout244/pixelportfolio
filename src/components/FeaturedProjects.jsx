import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
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

// ─── Section-level mouse spotlight ──────────────────────────────────────────
function SectionSpotlight({ sectionRef }) {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const rawX = useMotionValue(50);
  const rawY = useMotionValue(50);
  useSpring(rawX, { stiffness: 50, damping: 22 });
  useSpring(rawY, { stiffness: 50, damping: 22 });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      setPos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    el.addEventListener("mousemove", onMove, { passive: true });
    return () => el.removeEventListener("mousemove", onMove);
  }, [sectionRef]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
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

// ─── Individual Tech Pill ───────────────────────────────────────────────────
function TechPill({ label }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="inline-flex items-center cursor-default select-none rounded-full px-3.5 py-1.5 font-mono text-[10px] sm:text-[11px] tracking-[0.08em] uppercase"
      style={{
        background: hovered ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
        border: hovered ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(255,255,255,0.08)",
        color: hovered ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.6)",
        transition: "all 0.2s ease",
      }}
    >
      {label}
    </span>
  );
}

// ─── Featured Project Card ──────────────────────────────────────────────────
function ProjectImageSlide({ project, reduced, onOpen }) {
  const imageRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const lift = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [12, -12]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 150,
    damping: 20,
  });
  const translateY = useSpring(lift, { stiffness: 150, damping: 20 });
  const borderColor = {
    "netflix-clone": "rgba(229, 9, 20, 0.7)",
    devtinder: "rgba(96, 165, 250, 0.7)",
    noteflow: "rgba(192, 132, 252, 0.7)",
    shopcart: "rgba(52, 211, 153, 0.7)",
  }[project?.slug] || "rgba(255,255,255,0.35)";
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
    if (!reduced) lift.set(-8);
  };

  const handlePointerLeave = () => {
    setHovered(false);
    pointerX.set(0);
    pointerY.set(0);
    lift.set(0);
  };

  return (
    <div className="w-full max-w-[1500px] border border-white/10 bg-[#18181b] p-6 sm:p-10 lg:p-14">
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
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") onOpen();
        }}
        className="group relative aspect-[16/9] w-full cursor-pointer overflow-hidden border border-white/10 bg-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50"
        style={{
          rotateX,
          rotateY,
          y: translateY,
          transformStyle: "preserve-3d",
          borderColor: hovered ? borderColor : "rgba(255,255,255,0.1)",
          boxShadow: hovered
            ? "0 30px 60px rgba(0,0,0,0.8), 0 0 40px rgba(255,255,255,0.08)"
            : "0 10px 30px rgba(0,0,0,0.4)",
          transition: "border-color 300ms ease, box-shadow 300ms ease",
        }}
      >
        <div className="relative h-full w-full">
          {project?.image ? (
            <motion.img
              src={project.image}
              alt={project?.title || "Project preview"}
              className="relative z-10 h-full w-full object-cover"
              loading="lazy"
              animate={{ scale: 1 }}
              whileHover={reduced ? undefined : { scale: 1.04 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
          ) : (
            <div className="flex h-full items-center justify-center font-mono text-xs uppercase tracking-[0.2em] text-white/40">
              Image unavailable
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <motion.div
            className="absolute right-4 top-4 z-30 flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24"
            animate={reduced ? undefined : { rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full fill-white">
              <defs>
                <path id={badgePathId} d="M 60,60 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0" />
              </defs>
              <text className="font-mono text-[9px] uppercase tracking-[0.12em]">
                <textPath href={`#${badgePathId}`}>DISCOVER • OPEN • EXPLORE • </textPath>
              </text>
            </svg>
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white text-black">
              <Eye size={16} strokeWidth={2.2} />
            </span>
          </motion.div>
        </div>
      </motion.div>
      </div>
    </div>
  );
}

function FeaturedProjectCard({ project, index, inView, reduced }) {
  const isImageRight = index % 2 === 0;
  const navigate = useNavigate();

  return (
    <motion.article
      initial={reduced ? {} : { opacity: 0, y: 50 }}
      animate={reduced ? {} : inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.8,
        delay: 0.2 + index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`flex flex-col ${isImageRight ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-16 items-center`}
    >
      {/* Content Side */}
      <div className="flex-1 w-full flex flex-col items-start z-10">
        <div className="flex items-center gap-4 mb-6">
          <span className="font-mono text-[12px] tracking-[0.1em] text-white/30">0{index + 1}</span>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/50 px-3 py-1 rounded-full border border-white/10 bg-white/5">
            {project.category}
          </span>
          <span className="font-mono text-[10px] tracking-[0.1em] text-white/30">{project.date}</span>
        </div>

        <h3 className="font-geist font-[800] text-white text-[32px] sm:text-[40px] leading-tight tracking-tight mb-5">
          {project.title}
        </h3>
        
        <p className="font-geist text-[15px] sm:text-[16px] text-white/50 leading-relaxed max-w-lg mb-8">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-10">
          {project.tech.map((t) => (
            <TechPill key={t} label={t} />
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => navigate(`/projects/${project.slug}`)}
            className="group relative px-6 py-3 bg-white text-black font-mono text-[11px] tracking-[0.15em] uppercase rounded-none overflow-hidden transition-transform active:scale-95"
          >
            <span className="relative z-10 font-bold">Case Study</span>
            <div className="absolute inset-0 bg-white/90 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </button>

          {project.liveUrl !== "#" && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 border border-white/10 text-white font-mono text-[11px] tracking-[0.15em] uppercase rounded-none hover:border-white/30 hover:bg-white/5 transition-colors"
            >
              Live Demo
            </a>
          )}
          {project.githubUrl !== "#" && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 border border-white/10 text-white font-mono text-[11px] tracking-[0.15em] uppercase rounded-none hover:border-white/30 hover:bg-white/5 transition-colors"
            >
              Source
            </a>
          )}
        </div>
      </div>

      {/* Image Side */}
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

// ─── Main FeaturedProjects Section ────────────────────────────────────────────
export default function FeaturedProjects() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });
  const headingInView = useInView(headingRef, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();

  const featured = PROJECTS.filter((p) => p.featured).slice(0, 4);

  const mp = (initial, animate, transition) =>
    reduced ? {} : { initial, animate, transition };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "transparent" }}
      aria-labelledby="featured-projects-heading"
    >
      {/* ── Top blend from Education ── */}
      <div
        className="absolute top-0 left-0 right-0 h-40 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, rgba(6,6,6,0.25) 0%, transparent 100%)" }}
        aria-hidden="true"
      />

      {/* ── Stars & Orbs ── */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
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
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
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

      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none z-0">
        <div
          style={{
            width: "900px",
            height: "600px",
            background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.02) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
      </div>

      <SectionSpotlight sectionRef={sectionRef} />

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-16 py-28 sm:py-32 lg:py-[140px]">
        
        {/* Header exact match to TechEcosystem / Education */}
        <div ref={headingRef} className="mb-24 lg:mb-32 relative">
          <motion.div
            className="flex items-center gap-3 mb-6 sm:mb-8"
            {...mp(
              { opacity: 0, y: 16 },
              headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
              { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
            )}
          >
            <div className="h-px w-6" style={{ background: "rgba(255,255,255,0.2)" }} />
            <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-white/30">
              Projects
            </span>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <motion.h2
              id="featured-projects-heading"
              className="font-geist font-[800] text-white leading-[0.92] tracking-tight"
              style={{ fontSize: "clamp(40px, 7.5vw, 90px)", letterSpacing: "-0.04em" }}
              {...mp(
                { opacity: 0, x: -30 },
                headingInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 },
                { duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }
              )}
            >
              FEATURED
              <br />
              <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)", color: "transparent" }}>
                PROJECTS
              </span>
            </motion.h2>

            <motion.div
              {...mp(
                { opacity: 0, x: 24 },
                headingInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 },
                { duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }
              )}
            >
              <Link 
                to="/projects"
                className="group flex items-center gap-3 font-mono text-[11px] sm:text-[12px] tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors"
              >
                Explore Full Archive
                <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                  →
                </span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* ── Featured Projects List ── */}
        <div className="flex flex-col gap-24 lg:gap-40">
          {featured.map((project, index) => (
            <FeaturedProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              inView={inView}
              reduced={reduced}
            />
          ))}
        </div>
        
        {/* Bottom CTA to Archive */}
        <motion.div
          className="mt-32 flex justify-center"
          {...mp({ opacity: 0, y: 20 }, inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }, { delay: 0.4, duration: 0.8 })}
        >
          <Link
            to="/projects"
            className="group relative px-8 py-4 bg-transparent border border-white/10 overflow-hidden rounded-full font-mono text-[12px] tracking-[0.2em] uppercase hover:border-white/30 transition-colors"
          >
            <div className="absolute inset-0 bg-white/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 flex items-center gap-3">
              View All Projects
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

