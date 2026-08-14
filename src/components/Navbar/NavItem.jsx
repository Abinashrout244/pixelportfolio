import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

export default function NavItem({
  href = "/",
  label,
  isActive = false,
  onClick,
}) {
  return (
    <MotionLink
      to={href}
      onClick={onClick}
      whileHover="hover"
      initial="rest"
      animate={isActive ? "active" : "rest"}
      aria-current={isActive ? "page" : undefined}
      className={[
        "font-mono text-[11px] xl:text-[13px] font-medium uppercase tracking-[0.18em]",
        isActive ? "text-[#F5F5F5]" : "text-[#A1A1AA]",
        "transition-colors duration-300 hover:text-[#FFFFFF]",
        "relative flex flex-col items-center gap-0 no-underline",
        "focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30 rounded-none",
      ].join(" ")}
    >
      <span>{label}</span>

      {/* Underline */}
      <motion.span
        className="absolute -bottom-1 left-0 right-0 h-px bg-white pointer-events-none"
        variants={{
          rest: { scaleX: 0, opacity: 0 },
          hover: { scaleX: 1, opacity: 1 },
          active: { scaleX: 1, opacity: 1 },
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: "50%" }}
      />
    </MotionLink>
  );
}
