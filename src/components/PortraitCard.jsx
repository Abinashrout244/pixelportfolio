import React from "react";
import { motion } from "framer-motion";
import portrait from "../assets/profile.png";
import { FiMapPin, FiGlobe } from "react-icons/fi";
export default function PortraitCard({ isLoaded }) {
  return (
    <div className="hidden lg:flex w-[45%] items-center justify-center z-10 relative">
      {/* ── Radial glow behind card ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "550px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 65%)",
          filter: "blur(250px)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        aria-hidden="true"
      />

      {/* ── Portrait Card ── */}
      <motion.div
        className="relative animate-float"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={
          isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
        }
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.5 }}
      >
        <div
          className="relative overflow-hidden"
          style={{
            width: "420px",
            height: "500px",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow:
              "0 25px 80px rgba(0,0,0,0.6), 0 0 120px rgba(255,255,255,0.02)",
          }}
        >
          {/* Portrait Image */}
          <img
            src={portrait}
            alt="Abhi — Frontend Engineer portrait"
            className="w-full h-full object-cover"
            loading="eager"
          />

          {/* ── Top-left badge ── */}
          <div className="absolute top-5 left-5 w-8 h-8 rounded-full border border-white/10 bg-surface/80 backdrop-blur-sm flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/80 animate-pulse" />
          </div>

          {/* ── Bottom-left info overlay ── */}

          <div className="absolute bottom-4 left-4 z-10">
            <div className="flex items-center gap-3 px-3.5 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-lg transition-all duration-300 hover:bg-black/60 hover:border-white/20">
              {/* Active Status Pulse Dot */}

              <div className="flex items-center gap-2 font-mono text-[11px] tracking-wider text-white/90">
                <span className="flex items-center gap-1 font-medium uppercase">
                  <FiMapPin className="w-3 h-3 text-[#39FF88]" /> India
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
