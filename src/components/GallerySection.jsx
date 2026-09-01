import React from "react";
import { motion } from "framer-motion";
import { MoveHorizontal } from "lucide-react";
import { RoundCarousel } from "./RoundCarousel";

export default function GallerySection() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-black overflow-hidden">
      {/* faint radial glow, consistent with the green accent used elsewhere */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          background:
            "radial-gradient(600px circle at 50% 0%, #22c55e, transparent 70%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 text-center mb-16 sm:mb-20 lg:mb-24">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="h-px w-7 bg-emerald-400/50" />

          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-emerald-400/80">
            03 / Visual Journal
          </span>

          <span className="h-px w-7 bg-emerald-400/50" />
        </div>

        {/* Heading */}
        <h2
          className="font-geist font-[900] uppercase leading-[0.82] tracking-[-0.055em]"
          style={{
            fontSize: "clamp(52px, 8vw, 108px)",
          }}
        >
          <span className="block text-white">Frames I keep</span>

          <span
            className="block text-transparent"
            style={{
              WebkitTextStroke: "1.5px rgba(255,255,255,0.28)",
            }}
          >
            Coming back to
          </span>
        </h2>

        {/* Description */}
        <p className="mt-8 mx-auto max-w-xl font-geist text-sm sm:text-base leading-7 text-white/40">
          A few stills from outside the editor — the other half of how I see,
          design, and build.
        </p>
      </div>

      <div className="relative">
        <RoundCarousel
          imageWidth={240}
          imageHeight={320}
          spacing={5}
          speed={5}
          tilt={-8}
          cornerRadius={16}
          background="transparent"
        />
      </div>

      {/* drag affordance */}
      <div className="relative flex flex-col items-center gap-2 mt-10">
        <motion.div
          animate={{ x: [-6, 6, -6] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center w-9 h-9 rounded-full border border-white/15 bg-white/5"
        >
          <MoveHorizontal className="w-4 h-4 text-green-400" strokeWidth={2} />
        </motion.div>
        <span className="font-[JetBrains_Mono] text-[11px] text-white/30 tracking-wide">
          drag to explore
        </span>
      </div>
    </section>
  );
}

export { GallerySection };
