/**
 * MegaMenu.jsx
 * ─────────────────────────────────────────────────────
 * Floating mega-menu dropdown triggered by hovering "More".
 *
 * Anti-flicker strategy:
 * - A single unified hover zone covers both the trigger text and
 *   the dropdown panel — managed by `onMouseEnter` / `onMouseLeave`
 *   on the wrapper <div>, so moving the cursor between them never
 *   triggers a close.
 *
 * Features:
 * - AnimatePresence for smooth mount/unmount
 * - Framer Motion: opacity, y, scale with custom ease
 * - 2-column MenuCard grid with staggered children
 * - 800px wide, auto height, #111111 background
 * - Tablet responsive: 650px
 */

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  User,
  Monitor,
  Link2,
  MessageSquare,
  ChevronDown,
} from "lucide-react";
import MenuCard from "./MenuCard";

/* ─── Dropdown content definition ─────────────────────── */
const MENU_ITEMS = [
  {
    icon: MessageSquare,
    title: "Guestbook",
    description: "Let me know you were here",
    href: "#guestbook",
  },
  {
    icon: BookOpen,
    title: "Blog",
    description: "Thoughts on code and craft",
    href: "#blog",
  },
  {
    icon: User,
    title: "About Me",
    description: "The story behind the code",
    href: "#about",
  },
  {
    icon: Monitor,
    title: "Uses",
    description: "A peek into my setup",
    href: "#uses",
  },
  {
    icon: Link2,
    title: "Links",
    description: "All my social links",
    href: "#links",
  },
];

/* ─── Animation variants ───────────────────────────────── */
const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: -10,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.28,
      ease: [0.22, 1, 0.36, 1],
      // Stagger children (MenuCards)
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    transition: {
      duration: 0.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/**
 * @param {Object}   props
 * @param {boolean}  props.isOpen          - Controlled open state
 * @param {Function} props.onMouseEnter    - Hover enter handler
 * @param {Function} props.onMouseLeave    - Hover leave handler
 * @param {boolean}  props.isActive        - Whether any "More" child is active
 */
export default function MegaMenu({ isOpen, onMouseEnter, onMouseLeave, isActive = false }) {
  return (
    /*
     * Unified hover zone: wraps both the trigger label and the dropdown panel.
     * Mouse enter/leave is handled here rather than on individual children,
     * so cursor movement between trigger and panel is seamless.
     */
    <div
      className="relative flex flex-col items-start"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* ── Trigger Label ─────────────────────────────────── */}
      <button
        aria-haspopup="true"
        aria-expanded={isOpen}
        className={[
          "flex items-center gap-1.5",
          "font-mono text-[11px] xl:text-[13px] font-medium uppercase tracking-[0.18em]",
          isActive || isOpen ? "text-[#F5F5F5]" : "text-[#A1A1AA]",
          "transition-colors duration-300 hover:text-[#FFFFFF]",
          "bg-transparent border-0 cursor-pointer p-0",
          "focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30 rounded-none",
        ].join(" ")}
      >
        More
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center"
        >
          <ChevronDown size={12} strokeWidth={2} />
        </motion.span>
      </button>

      {/* Active underline indicator */}
      <motion.span
        className="absolute -bottom-1 left-0 right-0 h-px bg-white"
        animate={{ scaleX: isActive || isOpen ? 1 : 0, opacity: isActive || isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: "50%" }}
      />

      {/* ── Dropdown Panel ────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="menu"
            aria-label="More navigation options"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={[
              // Positioning — left-aligned with the trigger
              "absolute top-[calc(100%+20px)] right-0",
              // Size
        "w-[650px] xl:w-[650px] lg:w-[500px] sm:w-[90vw]",
              // Scroll on smaller screens, auto height on desktop
              "max-h-[60vh] lg:max-h-[70vh] xl:max-h-none overflow-y-auto xl:overflow-visible",
              // Background & border
              "bg-[#111111] border border-white/[0.08]",
              // Shadow
              "shadow-[0_30px_80px_rgba(0,0,0,0.45)]",
              // No border radius (spec)
              "rounded-none",
              // Padding
              "p-4",
              // Z-index — above everything
              "z-[9999]",
            ].join(" ")}
          >
            {/* 2-column grid */}
            <div className="grid grid-cols-2 gap-4">
              {MENU_ITEMS.map((item, i) => (
                <MenuCard
                  key={item.title}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  href={item.href}
                  index={i}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
