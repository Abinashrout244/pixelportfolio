import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useParams, Link, Navigate } from "react-router-dom";
import { PROJECTS } from "../data/projectsData";
import ProjectHero from "./ProjectHero";

const rng = (n, salt) => {
  const x = Math.sin(n * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

const BG_STARS = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  left: rng(i, 8) * 100,
  top: rng(i, 15) * 100,
  size: 0.5 + rng(i, 22) * 1.5,
  opacity: 0.04 + rng(i, 29) * 0.09,
  duration: 4 + rng(i, 36) * 6,
  delay: rng(i, 43) * -8,
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

export default function ProjectDetailView() {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.slug === slug);
  const reduced = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) return <Navigate to="/projects" replace />;

  const mp = (initial, animate, exit, transition) =>
    reduced ? {} : { initial, animate, exit, transition };



  return (
    <motion.div
      className="min-h-screen relative w-full pt-28 pb-32 px-64 bg-[#050505]"
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
      <div className="fixed top-0 left-1/2 -translate-x-1/2 pointer-events-none z-0">
        <div
          style={{
            width: "900px",
            height: "600px",
            background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.025) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
        
        {/* Nav Back */}
        <motion.div
          className="mb-12"
          {...mp({ opacity: 0, x: -20 }, { opacity: 1, x: 0 }, undefined, { duration: 0.5, delay: 0.1 })}
        >
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
            All Projects
          </Link>
        </motion.div>

        {/* Hero Section */}
         <ProjectHero project={project} mp={mp} />

        {/* Detail Grid */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 pt-10">
          
          {/* Left Content */}
          <div className="flex-1 w-full flex flex-col gap-12">
            <section>
              <h3 className="font-mono text-[12px] tracking-[0.2em] uppercase text-white/40 mb-4">The Problem</h3>
              <p className="font-geist text-[16px] leading-[1.8] text-white/70">{project.problem}</p>
            </section>
            
            <section>
              <h3 className="font-mono text-[12px] tracking-[0.2em] uppercase text-white/40 mb-4">The Solution</h3>
              <p className="font-geist text-[16px] leading-[1.8] text-white/70">{project.solution}</p>
            </section>

            <section>
              <h3 className="font-mono text-[12px] tracking-[0.2em] uppercase text-white/40 mb-4">Key Features</h3>
              <ul className="flex flex-col gap-3">
                {project.features?.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/30 flex-shrink-0" />
                    <span className="font-geist text-[16px] leading-[1.7] text-white/70">{f}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="font-mono text-[12px] tracking-[0.2em] uppercase text-white/40 mb-4">Challenges</h3>
              <p className="font-geist text-[16px] leading-[1.8] text-white/70">{project.challenges}</p>
            </section>

            <section>
              <h3 className="font-mono text-[12px] tracking-[0.2em] uppercase text-white/40 mb-4">Key Learnings</h3>
              <p className="font-geist text-[16px] leading-[1.8] text-white/70">{project.learnings}</p>
            </section>
          </div>

          {/* Right Sticky Sidebar */}
          <div className="w-full lg:w-[320px] flex-shrink-0">
            <div className="sticky top-32 flex flex-col gap-8 p-8 rounded-[24px] bg-white/[0.02] border border-white/10">
              
              <div>
                <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/30 mb-3">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 font-mono text-[10px] text-white/70">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="h-px w-full bg-white/10" />

              <div className="grid grid-cols-2 gap-y-6">
                <div>
                  <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/30 mb-2">Role</h4>
                  <p className="font-geist text-[14px] text-white/80">{project.role}</p>
                </div>
                <div>
                  <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/30 mb-2">Duration</h4>
                  <p className="font-geist text-[14px] text-white/80">{project.duration}</p>
                </div>
                <div>
                  <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/30 mb-2">Platform</h4>
                  <p className="font-geist text-[14px] text-white/80">{project.platform}</p>
                </div>
                <div>
                  <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/30 mb-2">Status</h4>
                  <p className="font-geist text-[14px] text-white/80">{project.status}</p>
                </div>
              </div>

              <div className="h-px w-full bg-white/10" />

              <div className="flex flex-col gap-3">
                {project.liveUrl !== "#" && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-3 bg-white text-black font-mono text-[11px] tracking-[0.1em] uppercase rounded-sm hover:bg-white/90 transition-colors">
                    Live Demo ↗
                  </a>
                )}
                {project.githubUrl !== "#" && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-3 border border-white/20 text-white font-mono text-[11px] tracking-[0.1em] uppercase rounded-sm hover:bg-white/5 transition-colors">
                    Source Code ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mt-32">
            <h3 className="font-mono text-[12px] tracking-[0.2em] uppercase text-white/40 mb-8 text-center">Gallery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
              {project.gallery.map((img, i) => (
                <div key={i} className="rounded-[20px] overflow-hidden border border-white/10 bg-white/5 group cursor-pointer aspect-video relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
                  <img src={img} alt={`${project.title} screenshot ${i+1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </motion.div>
  );
}
