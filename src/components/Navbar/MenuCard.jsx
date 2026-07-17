/**
 * MenuCard.jsx
 * ─────────────────────────────────────────────────────
 * Individual card inside the MegaMenu dropdown grid.
 *
 * Features:
 * - Icon, title, and description layout
 * - Staggered Framer Motion entrance animation
 * - Hover: lift upward (translateY -5px), lighter background,
 *   brighter border
 * - Keyboard accessible (role, tabIndex)
 */

import React from "react";
import { motion } from "framer-motion";

/**
 * @param {Object}   props
 * @param {React.ElementType} props.icon - Lucide icon component
 * @param {string}   props.title        - Card title
 * @param {string}   props.description  - Short descriptor text
 * @param {string}   [props.href]       - Navigation href
 * @param {number}   [props.index]      - Stagger index (0-based)
 */
export default function MenuCard({ icon: Icon, title, description, href = "#", index = 0 }) {
  return (
    <motion.a
      href={href}
      // Staggered entrance from parent container
      variants={{
        hidden: { opacity: 0, y: 6 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            delay: index * 0.05,
            duration: 0.28,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      whileHover={{
        y: -8,
        backgroundColor: "#1E1E1E",
        borderColor: "rgba(255,255,255,0.12)",
        transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
      }}
      className={[
        // Layout
        "flex items-start gap-4 p-4",
        "min-h-[80px]",
        // Background & border
        "bg-[#171717] border border-white/[0.05]",
        // Cursor & focus
        "cursor-pointer no-underline",
        "focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30",
        // Block display for anchor
        "block",
      ].join(" ")}
    >
      {/* Icon container */}
      <span className="flex items-center justify-center mt-0.5 shrink-0 text-[#A1A1AA]">
        <Icon size={18} strokeWidth={1.5} />
      </span>

      {/* Text */}
      <span className="flex flex-col gap-1">
        <span className="font-mono text-[10px] xl:text-[12px] font-medium uppercase tracking-[0.15em] text-[#F5F5F5]">
          {title}
        </span>
        <span className="font-mono text-[9px] xl:text-[11px] text-[#A1A1AA] leading-relaxed">
          {description}
        </span>
      </span>
    </motion.a>
  );
}
