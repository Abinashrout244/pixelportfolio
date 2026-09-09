import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import profile from "../assets/profile.jpeg";
import { FiArrowRight, FiMail } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";

function ShareAction({ to, href, label, sublabel, icon: Icon }) {
  const sharedClass =
    "group flex items-center justify-between gap-4 rounded-none border border-white/10 bg-white/[0.03] px-4 py-4 text-left transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]";

  if (to) {
    return (
      <Link to={to} className={sharedClass}>
        <div className="min-w-0">
          <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/40">
            {label}
          </p>
          <p className="text-sm text-white/90 truncate">{sublabel}</p>
        </div>
        <FiArrowRight className="h-4 w-4 shrink-0 text-white/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white" />
      </Link>
    );
  }

  return (
    <a href={href} className={sharedClass}>
      <div className="min-w-0">
        <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/40">
          {label}
        </p>
        <p className="text-sm text-white/90 truncate">{sublabel}</p>
      </div>
      <FiArrowRight className="h-4 w-4 shrink-0 text-white/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white" />
    </a>
  );
}

export default function Share() {
  const actions = [
    { label: "Explore Portfolio", sublabel: "Go to home", to: "/" },
    { label: "Projects", sublabel: "Browse featured work", to: "/projects" },
    { label: "GitHub", sublabel: "github.com", href: "https://github.com/" },
    {
      label: "LinkedIn",
      sublabel: "linkedin.com",
      href: "https://linkedin.com/",
    },
    {
      label: "Contact Me",
      sublabel: "abinashrout.mail@gmail.com",
      href: "mailto:abinashrout.mail@gmail.com",
    },
  ];

  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-white/20 selection:text-white">
      <div className="relative mx-auto flex min-h-screen w-full max-w-[560px] flex-col px-4 py-6 sm:px-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden border border-white/10 bg-[#0b0b0d]/90 backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
        >
          <div className="relative p-5 sm:p-6">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_55%)]" />

            <div className="relative flex items-start gap-4">
              <img
                src="https://res.cloudinary.com/dnxha9arx/image/upload/v1785697277/profile_igdi61.png"
                alt="Abinash Rout profile"
                className="h-20 w-20 shrink-0 border border-white/10 object-cover"
              />

              <div className="min-w-0 flex-1">
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/40">
                  ABINASH ROUT
                </p>
                <h1 className="mt-2 text-[28px] sm:text-[34px] font-[800] leading-none tracking-tight">
                  Full Stack Developer
                </h1>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
                  Building modern web experiences
                  <span className="inline-block"> 🚀</span>
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              {actions.map((action) => (
                <ShareAction key={action.label} {...action} />
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-none border border-white/10 bg-white/[0.03] px-4 py-3">
                <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/35">
                  Status
                </p>
                <p className="mt-1 text-sm text-white/85">Available</p>
              </div>
              <div className="rounded-none border border-white/10 bg-white/[0.03] px-4 py-3">
                <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/35">
                  Location
                </p>
                <p className="mt-1 text-sm text-white/85">India</p>
              </div>
              <div className="rounded-none border border-white/10 bg-white/[0.03] px-4 py-3 col-span-2 sm:col-span-1">
                <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/35">
                  Identity
                </p>
                <p className="mt-1 text-sm text-white/85">Portfolio Share</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
