/**
 * IconButton.jsx
 * ─────────────────────────────────────────────────────
 * Reusable 40×40 square icon button used for the Moon
 * and Download actions in the navbar.
 *
 * Features:
 * - 1px border outline (white/12%)
 * - Hover: subtle white fill + slight icon rotation
 * - Keyboard accessible (role="button", tabIndex)
 * - Accepts any Lucide icon as `icon` prop
 */

import React from "react";
import { motion } from "framer-motion";

/**
 * @param {Object}   props
 * @param {React.ElementType} props.icon      - Lucide icon component
 * @param {string}   props.label              - Accessible aria-label
 * @param {Function} [props.onClick]          - Click handler
 * @param {string}   [props.className]        - Extra Tailwind classes
 */
export default function IconButton({ icon: Icon, label, onClick, className = "" }) {
  return (
    <motion.button
      aria-label={label}
      onClick={onClick}
      whileHover="hover"
      initial="rest"
      animate="rest"
      className={[
        // Base layout
        "relative flex items-center justify-center",
        "w-10 h-10 shrink-0",
        // Border
        "border border-white/[0.12] rounded-none",
        // Colors
        "bg-transparent text-[#A1A1AA]",
        // Interaction
        "cursor-pointer transition-colors duration-300",
        "hover:bg-white/[0.08] hover:text-[#F5F5F5]",
        // Focus ring (keyboard accessibility)
        "focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30",
        className,
      ].join(" ")}
    >
      {/* Icon — rotates slightly on hover via Framer Motion */}
      <motion.span
        variants={{
          rest: { rotate: 0 },
          hover: { rotate: 12 },
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-center"
      >
        <Icon size={16} strokeWidth={1.5} />
      </motion.span>
    </motion.button>
  );
}
