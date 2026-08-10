import React from "react";
import img from "../assets/profile.jpeg";
import { Link } from "react-router-dom";

export default function AboutMe() {
  const beliefs = [
    {
      number: "01",
      title: "Build With Purpose",

      description:
        "I don't build just to build. Every project is a chance to solve a problem, explore an idea, and become a better developer. I believe the best work comes from understanding why something should exist before deciding how to build it.",
    },
    {
      number: "02",
      title: "Fundamentals Matter",
      description:
        "Frameworks come and go, but strong fundamentals stay. I invest in problem-solving, data structures, algorithms, and core programming concepts because they give me the foundation to learn whatever comes next.",
    },
    {
      number: "03",
      title: "Learn by Building",
      description:
        "Tutorials can show you the path, but building teaches you how to walk it. I learn by creating real projects, breaking things, debugging them, and figuring out why they failed. Every error is part of the process.",
    },
    {
      number: "04",
      title: "Progress Over Perfection",
      description:
        "I'm still learning, and that's the point. I would rather keep building, experimenting, and improving than wait until I know everything. Small improvements, repeated consistently, compound into something meaningful.",
    },
  ];

  const pathItems = [
    {
      label: "NOW",
      title: "Computer Science Student & Developer",
      description:
        "Currently pursuing my B.Tech in Computer Science and Engineering while building projects and strengthening my skills across frontend, backend, Java, and problem-solving. I'm focused on becoming a well- full-stack developer.",
    },
    {
      label: "THE SPARK",
      title: "From Curiosity to Code",
      description:
        "Started with curiosity about how websites and applications work, then began learning HTML, CSS, and JavaScript. That curiosity gradually turned into a passion for building interfaces, solving problems, and understanding what happens behind the screen.",
    },
    {
      label: "THE BUILD",
      title: "Learning Through Projects",
      description:
        "Moved from small experiments to building real projects with React, Node.js, Express, MongoDB, and other modern tools. Every project has pushed me to learn something new, debug something difficult, and write better code.",
    },
    {
      label: "THE GRIND",
      title: "DSA & Fundamentals",
      description:
        "Alongside development, I'm strengthening my programming fundamentals and problem-solving skills through Data Structures and Algorithms, Java, and regular practice on platforms like LeetCode and GeeksforGeeks.",
    },
    {
      label: "ALWAYS",
      title: "Always Learning",
      description:
        "Technology keeps changing, and I'm constantly exploring what comes next. I enjoy learning new tools, experimenting with ideas, breaking things, fixing them, and becoming a little better with every project I build.",
    },
  ];

  return (
    // bg-transparent so the page-level particle/background layer shows through behind this section
    <div className="min-h-screen bg-transparent text-white font-sans antialiased selection:bg-zinc-800 selection:text-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-12 py-12 sm:py-20 space-y-28 sm:space-y-36">
        {/* Navigation Back Link */}
        <nav>
          <Link to="/">
            <button
              href="#back"
              className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-widest text-zinc-500 hover:text-zinc-200 transition-colors uppercase"
            >
              <span>&larr;</span> BACK
            </button>
          </Link>
        </nav>

        {/* SECTION 1: HERO / ABOUT INTRO */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7 space-y-8 relative">
            <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
              ABOUT
            </span>

            <div className="relative">
              {/* Overlay Watermark Background Text */}
              <span className="absolute -top-12 -left-2 text-6xl sm:text-8xl lg:text-9xl font-extrabold text-zinc-800/40 select-none pointer-events-none tracking-tight">
                ABINASH
              </span>
              <h1 className="relative text-4xl sm:text-6xl font-bold tracking-tight text-white">
                Hi, I'm Abinash.
              </h1>
            </div>

            <div className="space-y-6 text-base sm:text-lg text-zinc-400 leading-relaxed font-normal">
              <p>
                I'm a Computer Science student and developer who enjoys turning
                ideas into useful, thoughtful digital experiences. I started
                with the fundamentals of programming and gradually moved into
                building applications across the frontend and backend.
              </p>
              <p>
                My current focus is on becoming a stronger full-stack developer
                — working with technologies like React, JavaScript, Node.js,
                Express, MongoDB, and Java , ADV java,SpringBoot,MicroServise
                while continuously improving my problem-solving and DSA skills.
              </p>
              <p>
                I'm still early in my journey, but that's what makes it
                exciting. I'm constantly learning, exploring new technologies,
                solving problems, and pushing myself to write better code and
                build better things.
              </p>
            </div>
          </div>

          {/* Hero image card with ambient glow */}
          <div className="lg:col-span-5">
            <div className="group relative">
              {/* Ambient glow ring, breathes slowly, intensifies on hover */}
              <div className="absolute -inset-1 -2xl bg-gradient-to-br from-indigo-500/40 via-fuchsia-500/20 to-transparent opacity-40 blur-xl transition-all duration-500 group-hover:opacity-80 group-hover:blur-2xl animate-pulse" />
              <div className="relative -xl overflow-hidden bg-[#18181b]/80 backdrop-blur-sm border border-zinc-800 p-2 transition-colors duration-300 group-hover:border-zinc-700">
                <img
                  src={img}
                  alt="Abinash - Frontend Engineer"
                  className="w-full h-[380px] sm:h-[460px] lg:h-[500px] object-cover object-center -lg transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: WHAT I BELIEVE */}
        <section className="space-y-10">
          <div>
            <span className="text-xs font-mono text-zinc-500 tracking-wider">
              01
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
              What I Believe.
            </h2>
            <p className="text-zinc-400 mt-1 text-sm sm:text-base font-normal">
              The principles behind the work
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {beliefs.map((item) => (
              <div key={item.number} className="group relative">
                {/* Glow layer, only visible on hover */}
                <div className="absolute -inset-px -xl bg-gradient-to-br from-indigo-500/0 via-fuchsia-500/0 to-transparent opacity-0 blur-lg transition-opacity duration-300 group-hover:from-indigo-500/30 group-hover:via-fuchsia-500/20 group-hover:opacity-100" />
                <div className="relative bg-[#18181b]/80 backdrop-blur-sm border border-zinc-800/80 text-white p-8 sm:p-10 -xl space-y-4 transition-all duration-300 group-hover:border-zinc-700 group-hover:-translate-y-1">
                  <div className="font-mono text-xl sm:text-2xl font-bold text-zinc-500 transition-colors duration-300 group-hover:text-white">
                    {item.number}
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-10">
          <div>
            <span className="text-xs font-mono text-zinc-500 tracking-wider">
              02
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
              The Path.
            </h2>
            <p className="text-zinc-400 mt-1 text-sm sm:text-base font-normal">
              How I got here
            </p>
          </div>

          <div className="bg-[#18181b]/80 backdrop-blur-sm border border-zinc-800/80 -xl divide-y divide-zinc-800/80 overflow-hidden">
            {pathItems.map((item, idx) => (
              <div
                key={idx}
                className="group relative grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-8 px-6 sm:px-10 py-7 sm:py-9 transition-colors duration-300"
              >
                {/* Row-scoped glow that only lights up the hovered line */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-indigo-500/10 via-fuchsia-500/5 to-transparent" />

                <div className="relative sm:col-span-3">
                  <span className="inline-flex items-center px-2.5 py-1 -full bg-zinc-800/70 border border-zinc-700/50 font-mono text-[10px] sm:text-xs font-semibold tracking-widest text-zinc-300 uppercase transition-colors duration-300 group-hover:border-fuchsia-500/40 group-hover:text-white">
                    {item.label}
                  </span>
                </div>
                <div className="relative sm:col-span-9 space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: CALL TO ACTION FOOTER */}
        <section className="pt-8 border-t border-zinc-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Let's build something.
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base">
                Always up for interesting problems and good conversation.
              </p>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none px-6 py-3 bg-white hover:bg-zinc-200 text-black font-mono text-xs font-bold tracking-widest uppercase transition-colors ">
                FIND ME ONLINE
              </button>
              <button className="flex-1 sm:flex-none px-6 py-3 bg-transparent border border-zinc-700 hover:border-zinc-400 text-zinc-300 hover:text-white font-mono text-xs font-bold tracking-widest uppercase transition-colors ">
                SIGN GUESTBOOK
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
