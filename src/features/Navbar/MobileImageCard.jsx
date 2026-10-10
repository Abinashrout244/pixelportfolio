import React from "react";
import { motion } from "framer-motion";
import portraitImg from "../../assets/portrait.png";

/**
 * MobileImageCard
 * Premium image section displayed in the mobile drawer.
 */
export default function MobileImageCard() {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className="relative w-full h-[320px] shrink-0 mt-8"
    >
      {/* Background Image */}
      <img
        src={portraitImg}
        alt="Portrait"
        className="absolute inset-0 w-full h-full object-cover object-center rounded-none"
      />

      {/* Gradient Overlay for text readability (bottom fade) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.5) 40%, rgba(10,10,10,0) 100%)",
        }}
      />

      {/* Text Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-1">
        <span className="font-mono text-[10px] text-[#A1A1AA] uppercase tracking-[0.2em]">
          San Francisco, CA
        </span>
        <span className="font-geist font-bold text-[18px] text-white leading-tight">
          Frontend Engineer
        </span>
        <div className="flex items-center gap-2 mt-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-[10px] text-white/80 uppercase tracking-widest">
            Available for work
          </span>
        </div>
      </div>
    </motion.div>
  );
}
