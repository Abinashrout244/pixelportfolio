import React from "react";
import Hero from "../components/Hero";
import StatsSection from "../components/StatsSection";
import TechEcosystem from "../components/TechEcosystem";
import EducationSection from "../components/EducationSection";
import FeaturedProjects from "../components/FeaturedProjects";
import PreFooterCTA from "./PreFooterCTA";
import LuxuryFooter from "../components/LuxryFooter";

export default function Home({ isLoaded }) {
  return (
    <div>
      <Hero isLoaded={isLoaded} />
      <StatsSection />
      <TechEcosystem />
      <EducationSection />
      <FeaturedProjects />
      <PreFooterCTA />
      <LuxuryFooter />
    </div>
  );
}
