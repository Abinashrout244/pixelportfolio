import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Moon, Download } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import NavItem from "./NavItem";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";
import IconButton from "./IconButton";
import Tooltip from "./Tooltip";

/* ─── Primary navigation links ──────────────────────────── */
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Stack", href: "/#stack" },
  { label: "Education", href: "/#education" },
  { label: "Projects", href: "/#projects" },
];

export default function Navbar({ onOpenContactModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("#");
  const [megaOpen, setMegaOpen] = useState(false);
  const closeTimer = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const sectionIds = useRef(["hero", "stack", "education", "projects"]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMegaEnter = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  }, []);

  const handleMegaLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 80);
  }, []);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const getActiveSectionLink = useCallback(() => {
    if (location.pathname !== "/") return "#";

    const scrollMarker = window.scrollY + 120;
    const linkById = {
      hero: "#",
      stack: "#stack",
      education: "#education",
      projects: "#projects",
    };

    let currentLink = "#";

    for (const sectionId of sectionIds.current) {
      const element = document.getElementById(sectionId);
      if (!element) continue;

      if (scrollMarker >= element.offsetTop) {
        currentLink = linkById[sectionId] || "#";
      }
    }

    return currentLink;
  }, [location.pathname]);

  const handleLinkClick = useCallback(
    (href, event) => {
      event?.preventDefault?.();

      if (href === "/") {
        setActiveLink("#");
        navigate("/");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      if (href.startsWith("/#")) {
        const sectionId = href.slice(2);
        if (location.pathname === "/" && location.hash === `#${sectionId}`) {
          scrollToSection(sectionId);
          return;
        }

        setActiveLink(`#${sectionId}`);
        navigate({ pathname: "/", hash: `#${sectionId}` });
        return;
      }

      setActiveLink("#");
      navigate(href);
    },
    [location.hash, location.pathname, navigate, scrollToSection]
  );

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveLink("#");
      return;
    }

    if (location.hash) {
      setActiveLink(location.hash);
      return;
    }

    setActiveLink("#");
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (location.pathname !== "/") return;
    if (location.hash) {
      const targetId = location.hash.replace("#", "");
      const element = document.getElementById(targetId);

      if (element) {
        const raf = window.requestAnimationFrame(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        });

        return () => window.cancelAnimationFrame(raf);
      }
    }
  }, [location.pathname, location.hash, scrollToSection]);

  useEffect(() => {
    if (location.pathname !== "/") return undefined;

    let rafId = 0;

    const updateActiveLink = () => {
      rafId = 0;
      setActiveLink(getActiveSectionLink());
    };

    const onScrollOrResize = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(updateActiveLink);
    };

    updateActiveLink();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [getActiveSectionLink, location.pathname, location.hash]);

  const isMoreActive = ["/about", "/achievements", "/uses", "/links"].includes(
    location.pathname
  );

  const openContactModal = useCallback(() => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      try {
        navigator.vibrate(15);
      } catch (err) {}
    }

    onOpenContactModal?.();
  }, [onOpenContactModal]);

  return (
    <motion.header
      role="banner"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className={[
        "fixed top-0 left-0 right-0 z-[9000]",
        "h-[80px]",
        scrolled
          ? "bg-[rgba(6,6,8,0.92)] backdrop-blur-[12px] border-b border-white/[0.05]"
          : "bg-[#060608] border-b border-white/[0.05]",
        "transition-all duration-500",
      ].join(" ")}
    >
      <div className="relative flex items-center h-full w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <a
          href="/"
          aria-label="Home"
          className="flex-shrink-0 no-underline focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30 rounded-none"
          onClick={(event) => handleLinkClick("/", event)}
        >
          <span
            className={[
              "font-geist font-black text-[#F5F5F5]",
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
              isActive={
                link.href === "/"
                  ? location.pathname === "/" && activeLink === "#"
                  : activeLink === link.href.replace("/#", "#")
              }
              onClick={(event) => handleLinkClick(link.href, event)}
            />
          ))}

          <MegaMenu
            isOpen={megaOpen}
            onMouseEnter={handleMegaEnter}
            onMouseLeave={handleMegaLeave}
            isActive={isMoreActive}
          />
        </nav>

        <div className="hidden lg:flex items-center gap-3 ml-auto">
          <motion.button
            type="button"
            onClick={openContactModal}
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
          </motion.button>

          <div className="w-px h-5 bg-white/[0.08] mx-1" />

          <Tooltip content="FUN">
            <IconButton
              icon={Moon}
              label="Toggle theme"
              onClick={() => console.log("theme toggle")}
            />
          </Tooltip>

          <Tooltip content="Download Resume">
            <IconButton
              icon={Download}
              label="Download CV"
              onClick={() => console.log("download CV")}
            />
          </Tooltip>
        </div>

        <div className="flex lg:hidden items-center ml-auto">
          <MobileMenu
            activeLink={activeLink}
            currentPath={location.pathname}
            onThemeToggle={() => console.log("theme toggle")}
            onDownload={() => console.log("download CV")}
            onNavigate={handleLinkClick}
            onOpenContactModal={onOpenContactModal}
          />
        </div>
      </div>
    </motion.header>
  );
}
