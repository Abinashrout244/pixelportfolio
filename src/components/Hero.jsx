import React, { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import BackgroundName from "./BackgroundName";
import HeroContent from "./HeroContent";
import PortraitCard from "./PortraitCard";

function HeroWaterSurface() {
  const [cursor, setCursor] = useState({ x: 50, y: 28, active: false });
  const [drops, setDrops] = useState([]);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) return undefined;

    const el = document.getElementById("hero");
    if (!el) return undefined;

    let lastDropAt = 0;

    const spawnDrop = (x, y) => {
      const now = Date.now();
      if (now - lastDropAt < 45) return;
      lastDropAt = now;

      setDrops((prev) => [
        {
          id: `${now}-${Math.random()}`,
          x,
          y,
          size: 120 + Math.random() * 220,
          driftX: (Math.random() - 0.5) * 18,
          driftY: (Math.random() - 0.5) * 14,
        },
        ...prev.slice(0, 9),
      ]);
    };

    const handleMove = (event) => {
      const rect = el.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      setCursor({ x, y, active: true });
      spawnDrop(x, y);
    };

    const handleLeave = () => {
      setCursor((prev) => ({ ...prev, active: false }));
    };

    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerleave", handleLeave);

    const fadeTimer = window.setInterval(() => {
      setDrops((prev) =>
        prev
          .map((drop) => ({ ...drop, life: (drop.life ?? 1) - 0.03 }))
          .filter((drop) => (drop.life ?? 1) > 0)
      );
    }, 16);

    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", handleLeave);
      window.clearInterval(fadeTimer);
    };
  }, []);

  const surfaceStyle = useMemo(
    () => ({
      background: `
        radial-gradient(circle at ${cursor.x}% ${cursor.y}%,
          rgba(255,255,255,0.10) 0%,
          rgba(255,255,255,0.05) 10%,
          rgba(255,255,255,0.015) 20%,
          transparent 36%
        ),
        radial-gradient(circle at calc(${cursor.x}% + 12%) calc(${cursor.y}% + 10%),
          rgba(255,255,255,0.02) 0%,
          transparent 30%
        ),
        linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 34%, rgba(255,255,255,0.012) 100%)
      `,
    }),
    [cursor.x, cursor.y]
  );

    return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.025)_0%,transparent_58%)] opacity-60 mix-blend-screen"
        style={{ filter: "blur(32px)" }}
      />

      <div
        className="absolute inset-0 mix-blend-screen opacity-75"
        style={surfaceStyle}
      />

      {drops.map((drop) => (
        <span
          key={drop.id}
          className="absolute rounded-full border border-white/25"
          style={{
            left: `${drop.x}%`,
            top: `${drop.y}%`,
            width: `${drop.size}px`,
            height: `${drop.size}px`,
            transform: `translate(-50%, -50%) translate(${drop.driftX}px, ${drop.driftY}px) scale(${drop.life ?? 1})`,
            opacity: (drop.life ?? 1) * 0.28,
            background:
              "radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 24%, transparent 68%)",
            filter: "blur(12px)",
            transition: "transform 120ms linear, opacity 120ms linear",
          }}
        />
      ))}

      <div
        className="absolute rounded-full pointer-events-none mix-blend-screen"
        style={{
          left: `${cursor.x}%`,
          top: `${cursor.y}%`,
          width: "300px",
          height: "300px",
          transform: "translate(-50%, -50%)",
          opacity: cursor.active ? 0.35 : 0.14,
          background:
            "radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 18%, transparent 64%)",
          filter: "blur(20px)",
          transition: "left 0.12s ease, top 0.12s ease, opacity 0.24s ease",
        }}
      />
    </div>
  );
}

export default function Hero({ isLoaded }) {
  return (
    <section
      id="hero"
      className="hero-section relative w-full min-h-[100svh] overflow-hidden bg-transparent cursor-auto"
    >
      <BackgroundName />
      <HeroWaterSurface />
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-16 pt-24 sm:pt-28 lg:pt-24 pb-12 sm:pb-16 lg:pb-0 min-h-[100svh] flex">
        <motion.div
          className="flex w-full flex-col lg:flex-row items-stretch lg:items-center justify-center lg:justify-between gap-10 sm:gap-12 lg:gap-8"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 35 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroContent isLoaded={isLoaded} />
          <PortraitCard isLoaded={isLoaded} />
        </motion.div>
      </div>
    </section>
  );
}
