import React, { useMemo } from "react";

export default function Particles() {
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => {
      // Deterministic pseudo-random
      const seed = (n, salt) => {
        const x = Math.sin(n * 12.9898 + salt * 78.233) * 43758.5453;
        return x - Math.floor(x);
      };

      return {
        id: i,
        left: `${seed(i, 1) * 100}%`,
        top: `${seed(i, 2) * 100}%`,
        size: 1 + seed(i, 3) * 2,
        duration: 15 + seed(i, 4) * 20,
        delay: seed(i, 5) * -20,
        opacity: 0.12 + seed(i, 6) * 0.1,
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden" aria-hidden="true">
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
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
