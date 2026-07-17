import React from "react";
import { motion } from "framer-motion";
import { X, Moon, Download } from "lucide-react";

/**
 * TactileIconButton
 * Reusable icon button with scale spring + rotation + vibration on click
 */
export function TactileIconButton({ icon: Icon, onClick, ariaLabel }) {
  const handleClick = (e) => {
    // Attempt to trigger vibration if supported
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      try {
        navigator.vibrate(15);
      } catch (err) {
        // ignore
      }
    }
    if (onClick) onClick(e);
  };

  return (
    <motion.button
      aria-label={ariaLabel}
      onClick={handleClick}
      whileHover={{ scale: 1.04, backgroundColor: "rgba(255,255,255,0.06)" }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="relative flex items-center justify-center w-10 h-10 border border-white/[0.08] bg-transparent text-[#B4B4B4] hover:text-white cursor-pointer rounded-none focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
    >
      <motion.span
        variants={{
          rest: { rotate: 0 },
          hover: { rotate: 10 },
        }}
        initial="rest"
        whileHover="hover"
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-center"
      >
        <Icon size={16} strokeWidth={1.5} />
      </motion.span>
    </motion.button>
  );
}

/**
 * MobileHeader
 * Top row of the mobile menu
 */
export default function MobileHeader({ onClose, onThemeToggle, onDownload }) {
  return (
    <div className="flex items-center justify-between w-full shrink-0 mb-8">
      <span className="font-geist font-black text-[26px] text-white tracking-tight leading-none select-none">
        ABHI.
      </span>

      <div className="flex items-center gap-3">
        <TactileIconButton icon={Moon} ariaLabel="Toggle theme" onClick={onThemeToggle} />
        <TactileIconButton icon={Download} ariaLabel="Download CV" onClick={onDownload} />
        <TactileIconButton icon={X} ariaLabel="Close menu" onClick={onClose} />
      </div>
    </div>
  );
}
