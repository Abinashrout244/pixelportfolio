import React from "react";
import Hero from "../components/Hero";
import StatsSection from "../components/StatsSection";
import TechEcosystem from "../components/TechEcosystem";
import EducationSection from "../components/EducationSection";
import FeaturedProjects from "../components/FeaturedProjects";

export default function Home({ isLoaded }) {
  return (
    <div>
      <Hero isLoaded={isLoaded} />
      <StatsSection />
      <TechEcosystem />
      <EducationSection />
      <FeaturedProjects />
    </div>
  );
}
