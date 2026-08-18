import React, { useRef } from "react";

export default function ProjectGallery({ project }) {
  // Reference for direct DOM manipulation of the scroll container
  const galleryScrollRef = useRef(null);

  /**
   * Smoothly scrolls the gallery horizontally left or right.
   * Scrolls by 75% of the container width to show the next item cleanly.
   */
  const scrollGallery = (direction) => {
    if (galleryScrollRef.current) {
      const scrollAmount = galleryScrollRef.current.clientWidth * 0.75;
      galleryScrollRef.current.scrollBy({
        left: direction === "next" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Only render if the project object contains non-empty gallery items
  if (!project?.gallery || project.gallery.length === 0) return null;

  return (
    <div className="relative mt-36">
      {/* ------------------------------------------------------------- */}
      {/* Background Ambient Glow: Gives a subtle cyber/emerald backlight */}
      {/* ------------------------------------------------------------- */}
      <div className="pointer-events-none absolute -top-16 left-1/2 -z-10 h-44 w-[46rem] -translate-x-1/2  bg-emerald-500/10 blur-[130px]" />

      {/* ------------------------------------------------------------- */}
      {/* Section Header: Title, counter tag, and interactive arrows   */}
      {/* ------------------------------------------------------------- */}
      <div className="mb-8 flex items-center justify-between border-b border-zinc-800/80 pb-4">
        {/* Status indicator + section title */}
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping  bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2  bg-emerald-400" />
          </span>
          <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-300">
            Visual Artifacts & Case Previews
          </h3>
        </div>

        {/* Right side controls (Total count + Prev/Next buttons) */}
        <div className="flex items-center gap-3">
          <span className="hidden font-mono text-[11px] tabular-nums text-zinc-500 sm:inline">
            [ {String(project.gallery.length).padStart(2, "0")} ARTIFACTS ]
          </span>

          <div className="flex items-center gap-1.5">
            {/* Previous slide button */}
            <button
              type="button"
              onClick={() => scrollGallery("prev")}
              aria-label="Previous image"
              className="flex h-8 w-8 items-center justify-center  border border-zinc-800 bg-zinc-900/80 text-zinc-400 transition-colors hover:border-emerald-500/40 hover:text-emerald-400 active:scale-95"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Next slide button */}
            <button
              type="button"
              onClick={() => scrollGallery("next")}
              aria-label="Next image"
              className="flex h-8 w-8 items-center justify-center  border border-zinc-800 bg-zinc-900/80 text-zinc-400 transition-colors hover:border-emerald-500/40 hover:text-emerald-400 active:scale-95"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Horizontal Carousel Track: Snap scroll with hidden scrollbar */}
      {/* ------------------------------------------------------------- */}
      <div
        ref={galleryScrollRef}
        className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {project.gallery.map((img, i) => (
          <div
            key={i}
            className="group relative w-[85vw] max-w-[540px] shrink-0 snap-center cursor-pointer overflow-visible sm:w-[480px] lg:w-[560px]"
          >
            {/* Hover Glow Technique: Outer blur reveals emerald aura */}
            <div className="pointer-events-none absolute -inset-1  bg-gradient-to-r from-emerald-500/30 via-teal-500/20 to-emerald-500/0 opacity-0 blur-xl transition-opacity duration-700 ease-out group-hover:opacity-100" />

            {/* Micro-Border Gradient Wrapper: Provides 1px crisp outline */}
            <div className="relative aspect-video overflow-hidden  p-[1px] transition-transform duration-500 ease-out will-change-transform group-hover:-translate-y-1">
              {/* Dynamic border highlight on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-zinc-700/60 via-zinc-800/30 to-transparent transition-all duration-700 group-hover:from-emerald-400/80 group-hover:via-emerald-500/40 group-hover:to-zinc-800" />

              {/* Inner Card Container */}
              <div className="relative h-full w-full overflow-hidden  bg-zinc-950">
                {/* Radial beam effect inside image on hover */}
                <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.15),transparent_60%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                {/* Dark shading layer for contrast */}
                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-30" />

                {/* Top-Left Index Tag */}
                <div className="absolute left-3.5 top-3.5 z-20 flex items-center gap-1.5  border border-white/10 bg-zinc-950/70 px-2.5 py-1 backdrop-blur-md transition-all duration-300 group-hover:border-emerald-500/40">
                  <span className="h-1.5 w-1.5  bg-emerald-400" />
                  <span className="font-mono text-[10px] tracking-wider text-zinc-300">
                    REF_{String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Top-Right Expand Arrow */}
                <div className="absolute right-3.5 top-3.5 z-20 flex h-8 w-8 -translate-y-1 items-center justify-center  border border-white/10 bg-zinc-950/70 text-zinc-400 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-hover:border-emerald-500/40 group-hover:text-emerald-400">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-3.5 w-3.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 17L17 7M17 7H7M17 7V17"
                    />
                  </svg>
                </div>

                {/* Gallery Image */}
                <img
                  src={img}
                  alt={`${project.title} gallery asset ${i + 1}`}
                  className="h-full w-full object-cover brightness-[0.88] transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-105"
                  loading="lazy"
                />

                {/* Bottom Slide-in Info Bar */}
                <div className="absolute inset-x-0 bottom-0 z-20 translate-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="flex items-center justify-between  border border-white/10 bg-zinc-950/80 px-3 py-2 backdrop-blur-md">
                    <span className="font-mono text-xs text-zinc-200">
                      {project.title} — Artifact #{i + 1}
                    </span>
                    <span className="font-mono text-[10px] text-emerald-400">
                      VIEW RAW
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
