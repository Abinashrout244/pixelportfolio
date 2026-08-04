import React from "react";
import { motion } from "motion/react";
import Hero from "../components/Hero";
import StatsSection from "../components/StatsSection";
import TechEcosystem from "../components/TechEcosystem";
import EducationSection from "../components/EducationSection";
import FeaturedProjects from "../components/FeaturedProjects";

export default function Home({ isLoaded }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: isLoaded ? 0.15 : 0, ease: [0.22, 1, 0.36, 1] }}
    >
      <Hero isLoaded={isLoaded} />
      <StatsSection />
      <TechEcosystem />
      <EducationSection />
      <FeaturedProjects />
    </motion.div>
  );
}
