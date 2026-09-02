"use client";

import React from "react";
import { motion } from "framer-motion";
import { SiGithub, SiInstagram, SiWhatsapp } from "react-icons/si";
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { FiArrowRight, FiArrowUp } from "react-icons/fi";

const SOCIALS = [
  {
    icon: SiGithub,
    label: "GitHub",
    href: "https://github.com/Abinashrout244",
  },
  {
    icon: FaLinkedinIn,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/abinash-rout-274285322",
  },
  {
    icon: SiInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/frequency._0.001",
  },
  {
    icon: FaXTwitter,
    label: "Twitter",
    href: "https://x.com/AbinashRout2251",
  },
  {
    icon: SiWhatsapp,
    label: "WhatsApp",
    href: "https://wa.me/918249281685?text=Hi%20Abinash,%20I%20found%20your%20portfolio.",
  },
];

export default function LuxuryFooter() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      id="site-footer"
      className="relative w-full bg-[#fbfbfb] text-[#0A0A0A] border-t border-[#E5E5E5] pt-12 selection:bg-black selection:text-white"
    >
      {/* ================= MINIMALIST FLOATING BACK TO TOP (NO GREEN DOT) ================= */}
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-50">
        <motion.button
          onClick={scrollToTop}
          whileHover={{ y: -3, scale: 1.04 }}
          whileTap={{ scale: 0.94 }}
          aria-label="Back to top"
          className="group relative flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-neutral-300 shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-all duration-300 hover:border-black hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)]"
        >
          <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-600 font-semibold transition-colors duration-300 group-hover:text-black">
            TOP
          </span>

          <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center transition-all duration-300 group-hover:bg-black group-hover:text-white">
            <FiArrowUp className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </div>
        </motion.button>
      </div>

      {/* ================= TOP CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8"
        >
          {/* LEFT CONTENT */}
          <div className="flex flex-col gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#71717a] block mb-2 font-mono font-semibold">
                Let&apos;s Connect
              </span>

              <p className="text-sm text-[#52525b] leading-relaxed max-w-[260px]">
                Building digital experiences with precision, performance, and
                modern design.
              </p>
            </div>

            {/* HIRE ME BUTTON */}
            <div>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 px-5 py-2.5 bg-[#0A0A0A] text-white text-xs font-semibold rounded-lg shadow-sm transition-all duration-300 hover:bg-neutral-800 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                Hire Me
                <FiArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* RIGHT - ANIMATED SOCIALS */}
          <div className="flex flex-col items-start sm:items-end gap-3">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#71717a] font-mono font-semibold">
              Find Me On
            </span>

            <div className="flex items-center gap-2.5">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative flex items-center justify-center w-10 h-10 rounded-full border border-neutral-200 bg-white text-neutral-800 transition-all duration-300 hover:border-black hover:bg-black hover:text-white shadow-sm"
                >
                  <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ================= GENTLY CROPPED WORDMARK (SUBTLE BOTTOM CUT ONLY) ================= */}

      <div className="relative w-full overflow-hidden pointer-events-none select-none mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.1,
          }}
          className="w-full"
        >
          {/*
            - viewBox="0 0 1000 135" starts at y=0 with 8px top padding so the top edge and "i" dot never cut off
            - The bottom edge cuts at y=135 while font size is 210px, hiding ~40% of the lower letters
          */}
          <svg
            viewBox="0 0 1000 155"
            preserveAspectRatio="none"
            className="block w-full h-auto"
            aria-hidden="true"
          >
            <text
              x="0"
              y="12"
              dominantBaseline="hanging"
              textLength="1000"
              lengthAdjust="spacingAndGlyphs"
              className="fill-[#0A0A0A]"
              style={{
                fontFamily:
                  "'Plus Jakarta Sans', 'Cabinet Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: "205px",
                fontWeight: 900,
                letterSpacing: "-0.055em",
              }}
            >
              abinash
            </text>
          </svg>
          <span className="sr-only">abinash</span>
        </motion.div>
      </div>
    </footer>
  );
}
