/**
 * NavItem.jsx
 * ─────────────────────────────────────────────────────
 * Individual navigation link used in the desktop navbar.
 *
 * Features:
 * - IBM Plex Mono, uppercase, tracking-[0.18em]
 * - Active state: white text + underline that expands from center
 * - Hover: smooth white color transition + underline preview
 * - Keyboard accessible anchor element
 */

import React from "react";
import { motion } from "framer-motion";

/**
 * @param {Object}  props
 * @param {string}  props.href       - Navigation href
 * @param {string}  props.label      - Display text
 * @param {boolean} props.isActive   - Whether this link is the current page
 * @param {Function} [props.onClick] - Optional click handler (for SPA navigation)
 */
export default function NavItem({ href = "#", label, isActive = false, onClick }) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      whileHover="hover"
      initial="rest"
      animate="rest"
      aria-current={isActive ? "page" : undefined}
      className={[
        // Font
        "font-mono text-[11px] xl:text-[13px] font-medium uppercase tracking-[0.18em]",
        // Color — active is white, default is secondary
        isActive ? "text-[#F5F5F5]" : "text-[#A1A1AA]",
        // Transition
        "transition-colors duration-300 hover:text-[#FFFFFF]",
        // Layout
        "relative flex flex-col items-center gap-0",
        // No default underline
        "no-underline",
        // Focus
        "focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30 rounded-sm",
      ].join(" ")}
    >
      {/* Label text */}
      <span>{label}</span>

      {/* Animated underline — expands from center */}
      <motion.span
        className="absolute -bottom-1 left-0 right-0 h-px bg-white"
        variants={{
          rest: { scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 },
          hover: { scaleX: 1, opacity: 1 },
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: "50%" }}
      />
    </motion.a>
  );
}
