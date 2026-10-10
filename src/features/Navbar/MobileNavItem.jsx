import React from "react";
import { motion } from "framer-motion";

/**
 * MobileNavItem
 * Single primary navigation link inside the mobile drawer.
 */
export default function MobileNavItem({ href, label, isActive, onClick }) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      // The entrance animation is managed by staggered parents in MobileMenu
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="relative flex items-center w-full py-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30 no-underline cursor-pointer group"
    >
      <motion.span
        variants={{
          rest: { x: 0 },
          hover: { x: 6 },
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={[
          "relative",
          "font-mono text-[13px] font-medium uppercase tracking-[0.18em]",
          isActive ? "text-white" : "text-[#B4B4B4]",
          "transition-colors duration-300 group-hover:text-white",
        ].join(" ")}
      >
        {label}

        {/* Animated Underline for active state */}
        <motion.span
          className="absolute -bottom-1 left-0 right-0 h-px bg-white origin-center"
          variants={{
            rest: { scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 },
            hover: { scaleX: 1, opacity: 1 },
          }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.span>
    </motion.a>
  );
}
