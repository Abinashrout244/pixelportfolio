import React from "react";
import Hero from "../features/Hero";
import StatsSection from "../features/StatsSection";
import TechEcosystem from "../features/TechEcosystem";
import EducationSection from "../features/EducationSection";
import FeaturedProjects from "../features/FeaturedProjects";
import RoundCarousel from "../features/RoundCarousel";
import GallerySection from "../features/GallerySection";

export default function Home({ isLoaded }) {
  return (
    <div>
      <Hero isLoaded={isLoaded} />
      <StatsSection />
      <TechEcosystem />
      <EducationSection />
      <FeaturedProjects />

      <GallerySection />
    </div>
  );
}
