import React, { useMemo } from "react";

export default function Particles() {
  const particles = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => {
      // Deterministic pseudo-random seed generator
      const seed = (n, salt) => {
        const x = Math.sin(n * 12.9898 + salt * 78.233) * 43758.5453;
        return x - Math.floor(x);
      };

      const sizeVal = seed(i, 3);

      return {
        id: i,
        left: `${seed(i, 1) * 100}%`,
        top: `${seed(i, 2) * 100}%`,
        // Varying sizes from fine dust (0.8px) to brighter distant stars (3px)
        size: 0.8 + sizeVal * 2.2,
        // Drift duration (10s to 35s)
        duration: 10 + seed(i, 4) * 25,
        // Negative delay for pre-warmed initial placement
        delay: seed(i, 5) * -25,
        // Opacity variation (0.1 to 0.75)
        opacity: 0.1 + seed(i, 6) * 0.65,
        // Twinkle speed variation (2s to 6s)
        twinkleDur: 2 + seed(i, 7) * 4,
        // Optional subtle blur for star depth effect
        blur: sizeVal > 0.8 ? "0.5px" : "0px",
        // Glow for larger stars
        hasGlow: sizeVal > 0.7,
      };
    });
  }, []);

  return (
    <div
      className="absolute inset-0 z-[2] pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white animate-particle-drift"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            filter: p.blur !== "0px" ? `blur(${p.blur})` : "none",
            boxShadow: p.hasGlow
              ? `0 0 ${p.size * 2}px rgba(255, 255, 255, 0.6)`
              : "none",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
