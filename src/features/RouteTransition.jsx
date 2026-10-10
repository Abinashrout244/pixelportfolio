import { useMemo } from "react";
import { motion } from "framer-motion";

const BAR_COUNT = 14;

export default function RouteTransition({ active, transitionKey }) {
  const bars = useMemo(
    () => Array.from({ length: BAR_COUNT }, (_, index) => ({
      index,
      delay: Math.abs(index - (BAR_COUNT - 1) / 2) * 0.04,
      duration: 0.92 + (index % 4) * 0.08,
    })),
    []
  );

  return (
    active && (
        <motion.div
          key={transitionKey}
          className="pointer-events-none fixed inset-0 z-[10000] flex gap-[2px] select-none bg-[#050507]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 1.28 }}
          aria-hidden="true"
        >
          {bars.map((bar) => (
            <motion.div
              key={bar.index}
              className="h-full flex-1 bg-gradient-to-b from-white/[0.28] via-white/[0.12] to-[#0c0c0f]"
              initial={{ y: "100%" }}
              animate={{ y: "-105%" }}
              transition={{
                delay: bar.delay,
                duration: bar.duration,
                ease: [0.76, 0, 0.24, 1],
              }}
            />
          ))}
        </motion.div>
      )
  );
}
