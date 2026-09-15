import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BadgeInfo,
  Code2,
  ContactRound,
  ExternalLink,
  FileText,
  Layers3,
  Mail,
  Sparkles,
  FolderKanban,
  TerminalSquare,
  Database,
  Braces,
  Palette,
  FileCode2,
} from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";
import { PROJECTS } from "../data/projectsData";

const skills = [
  "React",
  "JavaScript",
  "Java",
  "Node.js",
  "Express",
  "MongoDB",
  "HTML",
  "CSS",
  "Git",
  "Tailwind CSS",
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/",
    icon: SiGithub,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/",
    icon: FaLinkedinIn,
  },
];

const iconMap = {
  React: Code2,
  JavaScript: Braces,
  Java: TerminalSquare,
  "Node.js": Layers3,
  Express: FileCode2,
  MongoDB: Database,
  HTML: FileCode2,
  CSS: Palette,
  Git: FolderKanban,
  "Tailwind CSS": Sparkles,
};

function SkillPill({ label }) {
  const Icon = iconMap[label] || BadgeInfo;

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] font-mono uppercase tracking-[0.14em] text-white/75 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white">
      <Icon size={12} />
      {label}
    </span>
  );
}

function ProjectCard({ project }) {
  const isExternal =
    typeof project.liveUrl === "string" &&
    project.liveUrl.trim() &&
    project.liveUrl !== "#";
  const href = isExternal ? project.liveUrl : `/projects/${project.slug}`;
  const tech = project.tech?.slice(0, 3) || [];

  const sharedClasses =
    "group flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]";

  return (
    <motion.div
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.25 }}
      className={sharedClasses}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
              PROJECT
            </p>
            <h3 className="mt-1 text-sm font-semibold text-white leading-tight">
              {project.title}
            </h3>
          </div>
          <span className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.12em] text-white/55">
            {project.category}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {tech.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.12em] text-white/55"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {isExternal ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl border border-amber-400/20 bg-gradient-to-r from-amber-500/90 via-orange-500/85 to-amber-400/90 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#111] shadow-[0_12px_30px_rgba(249,115,22,0.18)] transition-transform duration-300 hover:scale-[1.01] active:scale-[0.98]"
        >
          View Project
          <ExternalLink size={14} />
        </a>
      ) : (
        <Link
          to={href}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] active:scale-[0.98]"
        >
          View Project
          <ArrowUpRight size={14} />
        </Link>
      )}
    </motion.div>
  );
}

function SocialButton({ label, href, icon: Icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[12px] font-medium text-white/80 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] active:scale-[0.98]"
      aria-label={label}
    >
      <Icon size={15} />
      {label}
    </a>
  );
}

function ActionButton({ href, label, icon: Icon, filled = false }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 active:scale-[0.98]";
  const styles = filled
    ? "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 text-[#111] shadow-[0_16px_40px_rgba(249,115,22,0.22)] hover:brightness-105"
    : "border border-white/10 bg-white/[0.04] text-white/85 hover:border-white/20 hover:bg-white/[0.07]";

  if (href.startsWith("mailto:")) {
    return (
      <a href={href} className={`${base} ${styles}`} aria-label={label}>
        <Icon size={15} />
        {label}
      </a>
    );
  }

  return (
    <a href={href} className={`${base} ${styles}`} aria-label={label}>
      <Icon size={15} />
      {label}
    </a>
  );
}

export default function BusinessCard() {
  const highlightProjects = PROJECTS.filter(Boolean);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="relative isolate min-h-screen overflow-hidden px-4 py-6 sm:px-6 sm:py-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.16),_transparent_60%)]" />
          <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(225deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.06]" />
        </div>

        <motion.main
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-sm flex-col justify-center"
        >
          <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-2xl backdrop-blur-xl sm:p-7">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08] text-xl font-black tracking-tight text-white shadow-[0_0_30px_rgba(255,255,255,0.08)]">
                AR
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/40">
                  ABINASH ROUT
                </p>
                <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-white">
                  ABINASH ROUT
                </h1>
                <p className="mt-1 text-sm font-medium text-white/70">
                  Full Stack Developer
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  Building • Learning • Creating 🚀
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-white/40">
                <BadgeInfo size={14} />
                About Me
              </div>
              <p className="mt-3 text-sm leading-6 text-white/70">
                I design and build modern web experiences with a strong focus on
                performance, motion, and polished UI systems that feel premium
                on every device.
              </p>
            </div>

            <div className="mt-6">
              <div className="mb-3 flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-white/40">
                <Sparkles size={14} />
                Skills
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <SkillPill key={skill} label={skill} />
                ))}
              </div>
            </div>

            {/* Scrollable Projects Section (shows ~2 cards, scrolls internally) */}
            <div className="mt-6">
              <div className="mb-3 flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-white/40">
                <FolderKanban size={14} />
                Projects
              </div>
              <div className="max-h-60 overflow-y-auto pr-1 space-y-3 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.2)_transparent]">
                {highlightProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-3 flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-white/40">
                <ContactRound size={14} />
                Connect
              </div>
              <div className="flex gap-3">
                {socialLinks.map((item) => (
                  <SocialButton key={item.label} {...item} />
                ))}
              </div>
            </div>

            {/* Action Buttons styled to match your slate/glass theme */}
            <div className="mt-6 grid gap-3">
              <ActionButton
                href="/assets/resume.pdf"
                label="View Resume"
                icon={FileText}
                className="w-full justify-center rounded-2xl bg-white/10 font-semibold text-white border border-white/15 hover:bg-white/20 transition-all shadow-[0_0_20px_rgba(255,255,255,0.05)]"
              />
              <ActionButton
                href="mailto:abinash.work@gmail.com"
                label="Contact Me"
                icon={Mail}
                className="w-full justify-center rounded-2xl bg-white/[0.04] text-white/80 border border-white/10 hover:bg-white/[0.08] hover:text-white transition-all"
              />
            </div>
          </section>
        </motion.main>
      </div>
    </div>
  );
}
