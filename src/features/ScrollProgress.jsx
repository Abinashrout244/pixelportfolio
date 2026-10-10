import { useEffect, useRef } from "react";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export default function ScrollProgress() {
  const fillRef = useRef(null);
  const headRef = useRef(null);

  useEffect(() => {
    const fill = fillRef.current;
    const head = headRef.current;
    if (!fill || !head) return undefined;

    let targetProgress = 0;
    let displayedProgress = 0;
    let frameId = 0;
    let isRunning = false;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const getProgress = () => {
      const scrollRange = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        0,
      );

      return scrollRange === 0 ? 0 : clamp(window.scrollY / scrollRange, 0, 1);
    };

    const paint = (progress) => {
      const percentage = `${progress * 100}%`;
      fill.style.transform = `scaleX(${progress})`;
      head.style.left = percentage;
      fill.setAttribute("aria-valuenow", String(Math.round(progress * 100)));
    };

    const stopWhenSettled = () => {
      isRunning = false;
      frameId = 0;
    };

    const animate = () => {
      if (reducedMotion.matches) {
        displayedProgress = targetProgress;
        paint(displayedProgress);
        stopWhenSettled();
        return;
      }

      const difference = targetProgress - displayedProgress;
      displayedProgress += difference * 0.18;

      if (Math.abs(difference) < 0.0005) {
        displayedProgress = targetProgress;
        paint(displayedProgress);
        stopWhenSettled();
        return;
      }

      paint(displayedProgress);
      frameId = requestAnimationFrame(animate);
    };

    const update = () => {
      targetProgress = getProgress();

      if (reducedMotion.matches) {
        displayedProgress = targetProgress;
        paint(displayedProgress);
        return;
      }

      if (!isRunning) {
        isRunning = true;
        frameId = requestAnimationFrame(animate);
      }
    };

    const handleMotionPreferenceChange = () => {
      targetProgress = getProgress();
      if (reducedMotion.matches) {
        displayedProgress = targetProgress;
        paint(displayedProgress);
        if (frameId) {
          cancelAnimationFrame(frameId);
          stopWhenSettled();
        }
      } else {
        update();
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    reducedMotion.addEventListener?.("change", handleMotionPreferenceChange);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      reducedMotion.removeEventListener?.(
        "change",
        handleMotionPreferenceChange,
      );
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-label="Page scroll progress">
      <div
        ref={fillRef}
        className="scroll-progress__fill"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="0"
      />
      <span
        ref={headRef}
        className="scroll-progress__head"
        aria-hidden="true"
      />
    </div>
  );
}
