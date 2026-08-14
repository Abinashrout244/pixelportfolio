import React from "react";
import { Link } from "react-router-dom";

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function ArrowLeftIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </svg>
  );
}

/* ---------------------------------------------------------------- */
/* Data                                                              */
/* ---------------------------------------------------------------- */

const sections = [
  {
    index: "01",
    title: "Setup.",
    subtitle: "The Hardware",
    items: [
      {
        title: "MSI Alpha 15 B5EX",
        meta: "RYZEN 7 5800H · RX 6600M · 16GB DDR4 · 512GB NVME",
        description:
          "My daily driver laptop. The AMD Advantage combo handles Next.js builds, browser DevTools, and the occasional game without throttling.",
      },
      {
        title: 'Dell S2721QS 27" 4K',
        meta: "3840x2160 · IPS",
        description:
          "External display for the extra vertical room. Crisp text makes long coding sessions easier on the eyes.",
      },
      {
        title: "Kreo Swarm",
        meta: "STARLING LINEAR SWITCHES · WIRELESS · WHITE/PURPLE",
        description:
          "Smooth linears with zero pre-travel. The wireless freedom keeps the desk clean, and the white-purple colourway looks sharp under RGB.",
      },
      {
        title: "Logitech MX Master 3S",
        meta: "8K DPI · QUIET CLICKS",
        description:
          "The horizontal scroll wheel alone makes wide spreadsheets and timelines bearable.",
      },
    ],
  },
  {
    index: "02",
    title: "Tools.",
    subtitle: "What I Reach For",
    items: [
      {
        title: "VS Code",
        meta: "EDITOR",
        description:
          "Home base for everything I write. A handful of extensions and a custom theme is all it takes to keep me fast and focused.",
      },
      {
        title: "GitHub Copilot",
        meta: "AI PAIR",
        description:
          "Good for boilerplate and the tedious middle of a function. I still read every line before it ships.",
      },
      {
        title: "Postman",
        meta: "API TESTING",
        description:
          "Where I poke at endpoints before wiring them into the UI. Saved collections make regression checks painless.",
      },
      {
        title: "Figma",
        meta: "DESIGN",
        description:
          "For laying out a screen before touching code, and for pulling exact spacing and colour values from a design handoff.",
      },
    ],
  },
  {
    index: "03",
    title: "Stack.",
    subtitle: "What I Build With",
    items: [
      {
        title: "Next.js",
        meta: "FRAMEWORK",
        description:
          "The App Router, server components, and server actions cover almost everything I need to ship.",
      },
      {
        title: "TypeScript",
        meta: "LANGUAGE",
        description:
          "Non-negotiable at this point. The safety net pays for itself the moment a project grows past a few files.",
      },
      {
        title: "Tailwind CSS",
        meta: "STYLING",
        description:
          "Utility-first styling that keeps me in the markup and out of context-switching into CSS files.",
      },
      {
        title: "Motion",
        meta: "ANIMATION",
        description:
          "Declarative, spring-based animation that makes interfaces feel alive without the math.",
      },
      {
        title: "MongoDB + Mongoose",
        meta: "DATABASE",
        description:
          "Flexible document storage for projects where the schema is still finding its shape.",
      },
      {
        title: "Vercel",
        meta: "HOSTING",
        description:
          "Git push, get a deploy. Preview URLs on every PR make reviewing changes painless.",
      },
    ],
  },
  {
    index: "04",
    title: "Apps.",
    subtitle: "Daily Flow",
    items: [
      {
        title: "PowerToys",
        meta: "UTILITIES",
        description:
          "FancyZones for window tiling, PowerToys Run as a launcher, and Color Picker for grabbing hex values on the fly.",
      },
      {
        title: "Notion",
        meta: "NOTES",
        description:
          "Where half-formed ideas, project notes, and reading lists all live.",
      },
      {
        title: "Spotify",
        meta: "MUSIC",
        description:
          "Lo-fi and instrumental playlists are the soundtrack to most things I build.",
      },
      {
        title: "Brave",
        meta: "BROWSER",
        description:
          "Fast, privacy-first, and Chromium-based so all my dev extensions work out of the box.",
      },
    ],
  },
];

/* ---------------------------------------------------------------- */
/* Sub-components                                                    */
/* ---------------------------------------------------------------- */

function UseCard({ title, meta, description }) {
  return (
    <div className="group relative h-full">
      <div className="absolute -inset-px bg-gradient-to-br from-indigo-500/0 via-fuchsia-500/0 to-transparent opacity-0 blur-lg transition-opacity duration-300 group-hover:from-indigo-500/20 group-hover:via-fuchsia-500/10 group-hover:opacity-100" />
      <div className="relative flex flex-col h-full min-h-[220px] sm:min-h-[230px] bg-[#0d0d10]/70 backdrop-blur-sm border border-zinc-800/80 p-6 sm:p-7 transition-all duration-300 group-hover:border-zinc-700 group-hover:-translate-y-0.5">
        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
          {title}
        </h3>
        <p className="mt-3 font-mono text-[10px] sm:text-[11px] tracking-widest text-zinc-500 uppercase">
          {meta}
        </p>
        <p className="mt-3 text-zinc-400 text-sm leading-relaxed line-clamp-5">
          {description}
        </p>
      </div>
    </div>
  );
}

function UseSection({ index, title, subtitle, items }) {
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 border-t border-zinc-800/60 pt-12 sm:pt-16 pb-16 sm:pb-20">
      {/* Left label — sticks to the top of the viewport while this row's cards scroll past, releases automatically when the row (its own stretched grid cell) ends */}
      <div className="md:col-span-3">
        <div className="md:sticky md:top-24 lg:top-28 space-y-1">
          <span className="block text-xs font-mono tracking-widest text-zinc-500">
            {index}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {title}
          </h2>
          <p className="text-zinc-500 text-sm sm:text-base">{subtitle}</p>
        </div>
      </div>

      {/* Right side — the cards, whose total height determines how long the label stays pinned */}
      <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 items-stretch">
        {items.map((item, i) => (
          <UseCard key={i} {...item} />
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Page                                                               */
/* ---------------------------------------------------------------- */

export default function WhatPowersMyWork() {
  return (
    <div className="min-h-screen bg-transparent text-white font-sans antialiased selection:bg-zinc-800 selection:text-white">
      <div className="max-w-6xl mx-auto  px-6 sm:px-12 pt-24  md:pt-32">
        {/* Navigation Back Link */}
        <nav className="relative z-10 ">
          <Link to="/">
            <button className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-widest text-zinc-500 hover:text-zinc-200 transition-colors uppercase">
              <ArrowLeftIcon width={14} height={14} /> BACK TO HOME
            </button>
          </Link>
        </nav>
        {/* HERO */}
        <header className="relative pt-10 sm:pt-16 pb-16 sm:pb-20">
          <div className="relative space-y-5 max-w-3xl">
            <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
              THE GEAR
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase leading-[0.95] text-white">
              What Powers My Work
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl">
              A living list of the hardware, software, and tools I reach for
              every day. People ask what I use often enough that it's easier to
              keep it all in one place.
            </p>
          </div>
        </header>
        {/* SECTIONS */}
        <div>
          {sections.map((section) => (
            <UseSection key={section.index} {...section} />
          ))}
        </div>
      </div>
    </div>
  );
}
