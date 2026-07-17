import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Tooltip({ content, children }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative inline-flex items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {children}

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 10, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="absolute top-full mt-2 z-50 pointer-events-none"
          >
            <div className="px-2.5 py-1 bg-[#111] border border-white/10 text-[#A1A1AA] font-mono text-[9px] uppercase tracking-[0.15em] whitespace-nowrap rounded shadow-lg">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
