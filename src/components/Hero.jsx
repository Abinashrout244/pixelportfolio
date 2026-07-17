import React from "react";
import LiquidGlassBackground from "./LiquidGlassBackground";
import BackgroundName from "./BackgroundName";
import Particles from "./Particles";
import FilmGrain from "./FilmGrain";
import HeroContent from "./HeroContent";
import PortraitCard from "./PortraitCard";

export default function Hero({ isLoaded }) {
  return (
    <section
      id="hero"
      className="hero-section relative w-full h-screen overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: "#0B0B0B" }}
    >
      {/* ── WebGL Liquid Glass Background ── */}
      <LiquidGlassBackground />

      {/* ── Background Name Typography ── */}
      <BackgroundName />

      {/* ── Floating Particles ── */}
      <Particles />

      {/* ── Film Grain Overlay ── */}
      <FilmGrain />

      {/* ── Main Content Area ── */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 lg:px-16 flex items-center h-full pt-20">
        <div className="flex w-full items-center">
          {/* Left: Content */}
          <HeroContent isLoaded={isLoaded} />

          {/* Right: Portrait */}
          <PortraitCard isLoaded={isLoaded} />
        </div>
      </div>
    </section>
  );
}
