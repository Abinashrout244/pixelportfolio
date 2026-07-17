import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Moon, Download } from "lucide-react";

import NavItem from "./NavItem";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";
import IconButton from "./IconButton";
import Tooltip from "./Tooltip";

/* ─── Primary navigation links ──────────────────────────── */
const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Stack", href: "#stack" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
];

export default function Navbar() {
  /* ── Scroll state ──────────────────────────────────────── */
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Active link tracking ──────────────────────────────── */
  const [activeLink, setActiveLink] = useState("#");

  /* ── Mega menu open/close (hover-bridge pattern) ────────── */
  const [megaOpen, setMegaOpen] = useState(false);
  // Use a ref timer to debounce the close so cursor movement between
  // trigger and dropdown doesn't flicker
  const closeTimer = useRef(null);

  const handleMegaEnter = useCallback(() => {
    // Cancel any pending close
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  }, []);

  const handleMegaLeave = useCallback(() => {
    // Delay close so cursor can travel to/from dropdown
    closeTimer.current = setTimeout(() => setMegaOpen(false), 80);
  }, []);

  // Cleanup timer on unmount
  useEffect(() => () => clearTimeout(closeTimer.current), []);

  /* ── Handlers ─────────────────────────────────────────── */
  const handleThemeToggle = () => {
    // Placeholder — wire to theme context when available
    console.log("theme toggle");
  };

  const handleDownload = () => {
    // Placeholder — wire to CV file when available
    console.log("download CV");
  };

  /* ── Render ───────────────────────────────────────────── */
  return (
    <motion.header
      role="banner"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className={[
        // Position & stacking
        "fixed top-0 left-0 right-0 z-[9000]",
        // Height
        "h-[80px]",
        // Background — transitions to blurred on scroll
        scrolled
          ? "bg-[rgba(6,6,8,0.92)] backdrop-blur-[12px] border-b border-white/[0.05]"
          : "bg-[#060608] border-b border-white/[0.05]",
        // Smooth transition
        "transition-all duration-500",
      ].join(" ")}
    >
      {/* ── Inner container: max-width + padding ──────────── */}
      <div className="relative flex items-center h-full w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* ══════════════════════════════════════════════════
            LEFT: Logo
        ══════════════════════════════════════════════════ */}
        <a
          href="#"
          aria-label="Home"
          className="flex-shrink-0 no-underline focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30 rounded-sm"
          onClick={() => setActiveLink("#")}
        >
          <span
            className={[
              "font-geist font-black text-[#F5F5F5]",
              // 42px on desktop, scale down on smaller screens
              "text-[30px] lg:text-[34px] xl:text-[42px]",
              "tracking-[-0.02em] leading-none select-none",
            ].join(" ")}
          >
            ABHI<span className="text-white">.</span>
          </span>
        </a>
        <nav
          role="navigation"
          aria-label="Primary navigation"
          className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-6 xl:gap-10"
        >
          {NAV_LINKS.map((link) => (
            <NavItem
              key={link.href}
              href={link.href}
              label={link.label}
              isActive={activeLink === link.href}
              onClick={() => setActiveLink(link.href)}
            />
          ))}

          {/* More ▼ with mega menu */}
          <MegaMenu
            isOpen={megaOpen}
            onMouseEnter={handleMegaEnter}
            onMouseLeave={handleMegaLeave}
            isActive={false}
          />
        </nav>

        {/* ══════════════════════════════════════════════════
            RIGHT: Action buttons (desktop only)
        ══════════════════════════════════════════════════ */}
        <div className="hidden lg:flex items-center gap-3 ml-auto">
          {/* Let's Connect CTA */}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03, backgroundColor: "#FFFFFF" }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className={[
              "flex items-center justify-center",
              "px-[24px] xl:px-[34px] py-[10px] xl:py-[14px]",
              "bg-[#D9D9D9] text-[#222222]",
              "font-mono text-[10px] xl:text-[12px] font-semibold uppercase tracking-[0.2em]",
              "no-underline cursor-pointer shrink-0",
              "focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30",
            ].join(" ")}
          >
            Let&apos;s Connect
          </motion.a>

          {/* Divider */}
          <div className="w-px h-5 bg-white/[0.08] mx-1" />

          {/* Moon icon button */}
          <Tooltip content="FUN">
            <IconButton
              icon={Moon}
              label="Toggle theme"
              onClick={handleThemeToggle}
            />
          </Tooltip>

          {/* Download icon button */}
          <Tooltip content="Download Resume">
            <IconButton
              icon={Download}
              label="Download CV"
              onClick={handleDownload}
            />
          </Tooltip>
        </div>

        {/* ══════════════════════════════════════════════════
            MOBILE: Hamburger (< lg)
        ══════════════════════════════════════════════════ */}
        <div className="flex lg:hidden items-center ml-auto">
          <MobileMenu
            activeLink={activeLink}
            onThemeToggle={handleThemeToggle}
            onDownload={handleDownload}
          />
        </div>
      </div>
    </motion.header>
  );
}
