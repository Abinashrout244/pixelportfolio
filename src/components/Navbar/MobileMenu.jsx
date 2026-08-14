/**
 * MobileMenu.jsx
 * Premium full-screen mobile navigation drawer.
 */

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  BookOpen,
  User,
  Monitor,
  Link2,
} from "lucide-react";
import MobileHeader from "./MobileHeader";
import MobileNavItem from "./MobileNavItem";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Stack", href: "/#stack" },
  { label: "Education", href: "/#education" },
  { label: "Projects", href: "/#projects" },
  { icon: BookOpen, label: "Achievements", href: "/achievements" },
  { icon: User, label: "About Me", href: "/about" },
  { icon: Monitor, label: "Uses", href: "/uses" },
  { icon: Link2, label: "Links", href: "/links" },
];

const drawerVariants = {
  hidden: { x: "100%", opacity: 0.98 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
  exit: {
    x: "100%",
    opacity: 0.98,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const itemVariants = {
  hidden: { y: 15, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
};

export default function MobileMenu({
  activeLink = "#",
  currentPath = "/",
  onThemeToggle,
  onDownload,
  onNavigate,
  onOpenContactModal,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      try {
        navigator.vibrate(15);
      } catch (err) {}
    }
    setIsOpen((v) => !v);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) close();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavigate = useCallback(
    (href, event) => {
      onNavigate?.(href, event);
      close();
    },
    [close, onNavigate]
  );

  const handleConnect = useCallback(() => {
    close();
    onOpenContactModal?.();
  }, [close, onOpenContactModal]);

  return (
    <>
      <motion.button
        aria-label="Open menu"
        aria-expanded={isOpen}
        aria-controls="mobile-nav-drawer"
        onClick={toggleMenu}
        whileHover={{ scale: 1.04, backgroundColor: "rgba(255,255,255,0.06)" }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={[
          "relative flex items-center justify-center w-10 h-10",
          "border border-white/[0.08] bg-transparent",
          "text-[#B4B4B4] hover:text-white cursor-pointer rounded-none",
          "focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30",
        ].join(" ")}
      >
        <motion.span
          variants={{
            rest: { rotate: 0 },
            hover: { rotate: 10 },
          }}
          initial="rest"
          whileHover="hover"
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Menu size={18} strokeWidth={1.5} />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="overlay"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={close}
              className="fixed inset-0 z-[9998] bg-[rgba(0,0,0,0.55)] backdrop-blur-sm"
            />

            <motion.nav
              key="drawer"
              id="mobile-nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={[
                "fixed inset-y-0 right-0 z-[9999] h-[100dvh]",
                "w-[100vw] sm:w-[420px] max-w-full",
                "bg-[#0A0A0A] flex flex-col overflow-hidden",
                "border-l border-white/[0.06]",
                "shadow-[0_0_80px_rgba(0,0,0,0.55)]",
              ].join(" ")}
            >
              <div className="flex-1 min-h-0 overflow-y-auto px-8 py-8 flex flex-col">
                <motion.div variants={itemVariants}>
                  <MobileHeader
                    onClose={close}
                    onThemeToggle={onThemeToggle}
                    onDownload={onDownload}
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-col gap-6 mt-6">
                  {NAV_LINKS.map((link) => (
                    <MobileNavItem
                      key={link.label}
                      href={link.href}
                      label={link.label}
                      isActive={
                        link.href.startsWith("/#")
                          ? activeLink === link.href.replace("/#", "#")
                          : currentPath === link.href
                      }
                      onClick={(event) => handleNavigate(link.href, event)}
                    />
                  ))}
                </motion.div>
              </div>

              <motion.div
                variants={itemVariants}
                className="shrink-0 bg-[#0A0A0A] border-t border-white/[0.06] px-8 pt-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))]"
              >
                <motion.button
                  type="button"
                  onClick={handleConnect}
                  whileHover={{ scale: 1.02, y: -3 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className={[
                    "flex items-center justify-center",
                    "w-full h-[52px]",
                    "font-mono text-[12px] font-semibold uppercase tracking-[0.2em]",
                    "bg-[#E7E7E7] text-[#111111]",
                    "no-underline cursor-pointer",
                    "focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30",
                  ].join(" ")}
                >
                  Let&apos;s Connect
                </motion.button>
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
