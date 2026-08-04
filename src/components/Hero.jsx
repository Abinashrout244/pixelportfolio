import React from "react";
import { motion } from "motion/react";
import HeroContent from "./HeroContent";
import PortraitCard from "./PortraitCard";

export default function Hero({ isLoaded }) {
  return (
    <section
      id="hero"
      className="hero-section relative w-full h-screen overflow-hidden flex items-center justify-center bg-transparent"
    >
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 lg:px-16 flex items-center h-full pt-20">
        <motion.div
          className="flex w-full items-center"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 35 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroContent isLoaded={isLoaded} />
          <PortraitCard isLoaded={isLoaded} />
        </motion.div>
      </div>
    </section>
  );
}
