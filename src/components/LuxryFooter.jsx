import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { SiGithub, SiX } from "react-icons/si";
import { FiArrowRight, FiMail, FiMapPin } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa6";

// Magnetic Hover Wrapper
const Magnetic = ({ children, distance = 0.3 }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * distance);
    y.set((clientY - centerY) * distance);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
};

const NAV_LINKS = [
  "Home",
  "About",
  "Stack",
  "Projects",
  "Experience",
  "Contact",
];
const RESOURCE_LINKS = [
  "Resume",
  "Blog",
  "Case Studies",
  "Certificates",
  "Open Source",
];
const SOCIALS = [
  { icon: FiMail, label: "email", href: "mailto:hello@example.com" },
  { icon: FaLinkedinIn, label: "linkedin", href: "https://linkedin.com" },
  { icon: SiGithub, label: "github", href: "https://github.com" },
  { icon: SiX, label: "twitter", href: "https://twitter.com" },
];

export default function LuxuryFooter() {
  const [time, setTime] = useState("");

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer id="site-footer" className="relative w-full bg-[#050505] text-[#A3A3A3] font-sans overflow-hidden py-16 sm:py-24 border-t border-white/[0.08] selection:bg-white selection:text-black">
      <style>{`
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.035'/%3E%3C/svg%3E");
        }
      `}</style>

      {/* Ambient background */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#4D8DFF]/[0.03] rounded-full blur-[140px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#8B5CF6]/[0.03] rounded-full blur-[160px] pointer-events-none translate-x-1/3 translate-y-1/3" />
      <div className="absolute inset-0 bg-noise pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-14"
        >
          {/* Heading + CTA */}
          <div className="sm:col-span-2 lg:col-span-5 flex flex-col gap-6">
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-tight text-white leading-[0.95]">
              Let&apos;s{" "}
              <span className="font-light italic text-[#39FF88]">connect.</span>
            </h2>
            <p className="text-sm sm:text-base leading-relaxed max-w-sm text-white/50">
              Building digital experiences with precision, performance, and
              modern design. Available for freelance &amp; collaborations.
            </p>
            <div>
              <Magnetic distance={0.2}>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center gap-2 px-7 py-3 bg-white text-black text-sm font-medium rounded-full transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]"
                >
                  <span>Hire Me</span>
                  <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.a>
              </Magnetic>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <span className="text-xs uppercase tracking-widest text-white/40 block mb-5">
              Navigation
            </span>
            <ul className="space-y-3 text-sm">
              {NAV_LINKS.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="group relative inline-flex items-center text-white/60 hover:text-white transition-colors duration-300"
                  >
                    <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                      {item}
                    </span>
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 ease-out group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <span className="text-xs uppercase tracking-widest text-white/40 block mb-5">
              Resources
            </span>
            <ul className="space-y-3 text-sm">
              {RESOURCE_LINKS.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-white/60 hover:text-green-500 hover:font-semibold transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + status */}
          <div className="sm:col-span-2 lg:col-span-3 flex flex-col gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-white/40 block mb-5">
                Connect
              </span>
              <div className="flex items-center gap-3 flex-wrap">
                {SOCIALS.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <Magnetic key={idx} distance={0.3}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.label}
                        className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300"
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    </Magnetic>
                  );
                })}
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full max-w-[220px] p-4 rounded-xl bg-white/[0.03] backdrop-blur-md border border-white/[0.08] shadow-2xl"
            >
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/[0.06]">
                <span className="text-xs uppercase tracking-wider text-white/50">
                  Status
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium text-[#39FF88]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39FF88] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#39FF88]" />
                  </span>
                  Online
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center text-white/80">
                  <span className="text-white/40">Location</span>
                  <span>India</span>
                </div>
                <div className="flex justify-between items-center text-white/80">
                  <span className="text-white/40">Time</span>
                  <span className="text-[#39FF88]">{time || "--:--:--"}</span>
                </div>
                <div className="flex justify-between items-center text-white/80">
                  <span className="text-white/40">Latency</span>
                  <span>18ms</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom row */}
        <div className="mt-16 pt-8 border-t border-white/[0.08]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
            <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
              <span className="text-white/80 font-medium">© 2026 Abhi.</span>
              <span className="hidden sm:inline text-white/20">•</span>
              <span>Crafted with React, Tailwind CSS &amp; Framer Motion</span>
            </div>
            <div className="text-center italic text-sm text-white/60 tracking-wide">
              Designing experiences. Engineering performance.
            </div>
            <div className="flex items-center gap-1.5 text-white/60">
              <FiMapPin className="w-3.5 h-3.5 text-[#39FF88]" />
              <span>Odisha, India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
