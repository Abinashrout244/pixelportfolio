import React, { useEffect, useRef, useState } from "react";

const DEFAULT_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80",
  },
  {
    src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  },
  {
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
  },
  {
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
  },
  {
    src: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&q=80",
  },
  {
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
  },
  {
    src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&q=80",
  },
];

export default function RoundCarousel({
  images = DEFAULT_IMAGES,
  imageWidth = 240,
  imageHeight = 320,
  spacing = 5,
  speed = 5,
  direction = "right",
  drag = true,
  sensitivity = 5,
  tilt = -8,
  perspective = 2500,
  cornerRadius = 24,
  innerDim = 8,
  background = "transparent",
  style = {},
  className = "",
}) {
  const items = images && images.length > 0 ? images : DEFAULT_IMAGES;
  const count = items.length;

  // ─── Responsive Screen Dimensions Hook ───────────────────────────
  const [dimensions, setDimensions] = useState({
    width: imageWidth,
    height: imageHeight,
    spacing: spacing,
  });

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 640) {
        // Mobile Phones (< 640px)
        setDimensions({
          width: Math.round(imageWidth * 0.65), // e.g. 156px
          height: Math.round(imageHeight * 0.65), // e.g. 208px
          spacing: Math.max(1, spacing * 0.5),
        });
      } else if (screenWidth < 1024) {
        // Tablets (< 1024px)
        setDimensions({
          width: Math.round(imageWidth * 0.85), // e.g. 204px
          height: Math.round(imageHeight * 0.85), // e.g. 272px
          spacing: Math.max(2, spacing * 0.75),
        });
      } else {
        // Desktop / Large screens
        setDimensions({
          width: imageWidth,
          height: imageHeight,
          spacing: spacing,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [imageWidth, imageHeight, spacing]);

  const activeWidth = dimensions.width;
  const activeHeight = dimensions.height;
  const activeSpacing = dimensions.spacing;

  const ringRef = useRef(null);
  const rafRef = useRef(0);
  const rotYRef = useRef(0);
  const velRef = useRef(0);
  const lastRef = useRef(0);
  const dragRef = useRef({ active: false, x: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const angle = 360 / count;
  const factor = 1 + activeSpacing * 0.15;
  const radius = Math.round(
    (activeWidth * factor) / (2 * Math.tan(Math.PI / count)),
  );
  const degPerSec = speed * 6 * (direction === "left" ? -1 : 1);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;

    const applyTransform = () => {
      ring.style.transform = `translateZ(${-radius}px) rotateY(${rotYRef.current}deg)`;
    };

    applyTransform();

    const draw = (now) => {
      const dt = lastRef.current ? (now - lastRef.current) / 1000 : 0;
      lastRef.current = now;
      const f = Math.min(dt, 0.1);
      const d = dragRef.current;

      if (!d.active) {
        if (Math.abs(velRef.current) > 0.01) {
          rotYRef.current += velRef.current * f;
          velRef.current *= 0.94; // Inertia deceleration
        } else {
          rotYRef.current += degPerSec * f;
        }
      }

      applyTransform();
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [radius, degPerSec, count]);

  const onPointerDown = (e) => {
    if (!drag) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Fallback if setPointerCapture is unsupported
    }
    dragRef.current = { active: true, x: e.clientX };
    velRef.current = 0;
    setIsDragging(true);
  };

  const onPointerMove = (e) => {
    const d = dragRef.current;
    if (!d.active) return;
    const dx = e.clientX - d.x;
    d.x = e.clientX;
    const k = 0.25 * sensitivity;
    rotYRef.current += dx * k;
    velRef.current = dx * k * 60;
  };

  const onPointerUp = (e) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Fallback
    }
    dragRef.current.active = false;
    setIsDragging(false);
  };

  const faceStyle = {
    position: "absolute",
    inset: 0,
    borderRadius: `${cornerRadius}px`,
    overflow: "hidden",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    backgroundSize: "cover",
    backgroundPosition: "center",
    userSelect: "none",
    pointerEvents: "none",
  };

  return (
    <div
      className={className}
      style={{
        ...style,
        width: "100%",
        minHeight: `${activeHeight + 100}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background,
        perspective: `${perspective}px`,
        cursor: drag ? (isDragging ? "grabbing" : "grab") : "default",
        touchAction: "none",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* 3D Scene container with X-axis tilt */}
      <div
        style={{
          transformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d",
          transform: `rotateX(${tilt}deg)`,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Revolving ring element */}
        <div
          ref={ringRef}
          style={{
            position: "relative",
            width: activeWidth,
            height: activeHeight,
            transformStyle: "preserve-3d",
            WebkitTransformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          {items.map((img, i) => {
            const src = typeof img === "string" ? img : img?.src;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  inset: 0,
                  transform: `rotateY(${i * angle}deg) translateZ(${radius}px)`,
                  transformStyle: "preserve-3d",
                  WebkitTransformStyle: "preserve-3d",
                }}
              >
                {/* Front Face */}
                <div
                  style={{
                    ...faceStyle,
                    backgroundColor: src ? "transparent" : "#1a1a1a",
                    backgroundImage: src ? `url("${src}")` : undefined,
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.7)",
                  }}
                />

                {/* Back Face (Inverted facing inward) */}
                <div
                  style={{
                    ...faceStyle,
                    transform: "rotateY(180deg)",
                    backgroundColor: src ? "transparent" : "#111111",
                    backgroundImage: src ? `url("${src}")` : undefined,
                    border: "1px solid rgba(255, 255, 255, 0.04)",
                    filter: `brightness(${Math.max(0.1, innerDim / 10)}) contrast(0.95)`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export { RoundCarousel };
