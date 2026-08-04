import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export function ProjectHero({ project, mp = (initial, animate, exit, transition) => ({ initial, animate, exit, transition }) }) {
  const ref = useRef(null);

  // Motion values for tracking cursor position within the card
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for fluid 3D movement
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  // Map cursor coordinates to 3D rotation degrees
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse offset relative to card center (-0.5 to 0.5)
    const mouseXPos = (e.clientX - rect.left) / width - 0.5;
    const mouseYPos = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseXPos);
    y.set(mouseYPos);
  };

  const handleMouseLeave = () => {
    // Reset back to flat position
    x.set(0);
    y.set(0);
  };

  return (
    <>
      {/* Main Outer Card Container */}
      <div className="mx-auto max-w-[1500px] w-full bg-gradient-to-b from-[#161616] to-[#0c0c0c] border border-white/[0.08] p-6 sm:p-10 md:p-14 rounded-none relative overflow-hidden">
        
        {/* Subtle radial spotlight overlay */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-white/[0.03] rounded-full blur-[100px] pointer-events-none" />

        {/* Hero Section */}
        <motion.div
          className="mb-8 md:mb-12 relative z-10"
          {...mp({ opacity: 0, y: 30 }, { opacity: 1, y: 0 }, undefined, { duration: 0.7, delay: 0.2 })}
        >
          {/* Category Tag + Date Row */}
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[11px] sm:text-[12px] tracking-[0.15em] uppercase text-white/90 px-3 py-1.5 bg-white/10 rounded-none font-medium">
              {project.category}
            </span>
            <span className="font-mono text-[11px] sm:text-[12px] tracking-[0.15em] uppercase text-white/60">
              {project.date}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-geist font-[800] text-white text-[42px] md:text-[64px] lg:text-[76px] leading-[1.0] tracking-tight mb-6">
            {project.title}
          </h1>

          {/* Description */}
          <p className="font-geist text-[16px] md:text-[20px] text-white/70 leading-relaxed max-w-3xl mb-8">
            {project.description}
          </p>

          {/* Live Link Button */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-black font-mono text-[12px] font-bold tracking-[0.1em] uppercase px-5 py-3 rounded-none hover:bg-white/90 transition-colors"
            >
              <span>LIVE LINK</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          )}
        </motion.div>

        {/* Dynamic Interactive 3D Perspective Tilt Container */}
        <div className="w-full relative z-10 [perspective:1200px]">
          <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0px 25px 50px -12px rgba(0, 0, 0, 0.8), 0px 0px 30px 2px rgba(255, 255, 255, 0.12)",
              borderColor: "rgba(255, 255, 255, 0.3)"
            }}
            className="w-full aspect-[16/9] rounded-none overflow-hidden border border-white/10 bg-black/60 relative cursor-pointer transition-colors duration-300"
            {...mp({ opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1 }, undefined, { duration: 0.8, delay: 0.3 })}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover block pointer-events-none"
            />
          </motion.div>
        </div>

      </div>
    </>
  );
}

export default ProjectHero;