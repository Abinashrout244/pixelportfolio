import React from "react";
import Hero from "../components/Hero";
import StatsSection from "../components/StatsSection";
import TechEcosystem from "../components/TechEcosystem";
import EducationSection from "../components/EducationSection";
import FeaturedProjects from "../components/FeaturedProjects";
import PreFooterCTA from "./PreFooterCTA";
import LuxuryFooter from "../components/LuxryFooter";
import AboutMe from "./Aboutme";
import ConnectWithMe from "./Links";
import WhatPowersMyWork from "./Uses";
import Achievements from "./Achievements";

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
