import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import profile from "../assets/profile.png";
import potrait from "../assets/portrait.mp4";
import { FiMapPin, FiVolume2, FiVolumeX, FiRotateCcw } from "react-icons/fi";

const CARD_REVEAL_MS = 1700;
const POST_REVEAL_DELAY_MS = 900;
const VIDEO_START_DELAY_MS = CARD_REVEAL_MS + POST_REVEAL_DELAY_MS;
const CROSSFADE_MS = 1200;

export default function PortraitCard({ isLoaded }) {
  const [isHovered, setIsHovered] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!isLoaded) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const timer = setTimeout(async () => {
      if (!videoRef.current) return;

      try {
        videoRef.current.muted = false;
        await videoRef.current.play();
        setIsMuted(false);
        setVideoVisible(true);
      } catch {
        if (videoRef.current) {
          videoRef.current.muted = true;
          await videoRef.current.play().catch(() => {});
          setIsMuted(true);
          setVideoVisible(true);
        }
      }
    }, VIDEO_START_DELAY_MS);

    return () => clearTimeout(timer);
  }, [isLoaded]);

  const toggleSound = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuteState = !isMuted;
    videoRef.current.muted = nextMuteState;
    setIsMuted(nextMuteState);
  };

  const handleReplay = (e) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.muted = isMuted;
    videoRef.current
      .play()
      .then(() => {
        setHasEnded(false);
        setVideoVisible(true);
      })
      .catch(() => {});
  };

  const handleVideoEnded = () => {
    setHasEnded(true);
    setVideoVisible(false);
  };

  return (
    <div className="flex w-full lg:w-[45%] items-center justify-center z-10 relative mt-2 sm:mt-4 lg:mt-0">
      {/* ── Ultra-Smooth Backside Atmospheric Glow (Slow Breathing) ── */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        animate={{
          scale: isHovered ? [1, 1.2, 1.15] : 1,
          opacity: isHovered ? [0.35, 0.85, 0.75] : 0.35,
        }}
        transition={{
          duration: 3.2,
          ease: "easeInOut",
          repeat: isHovered ? Infinity : 0,
          repeatType: "reverse",
        }}
        style={{
          width: "min(92vw, 480px)",
          height: "min(110vw, 540px)",
          background:
            "radial-gradient(circle, rgba(56,189,248,0.3) 0%, rgba(74,222,128,0.18) 40%, rgba(0,0,0,0) 70%)",
          filter: "blur(110px)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        aria-hidden="true"
      />

      {/* ── Secondary Ambient White Halo ── */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        animate={{
          scale: isHovered ? 1.28 : 0.85,
          opacity: isHovered ? 0.38 : 0.08,
        }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: "min(80vw, 380px)",
          height: "min(90vw, 440px)",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(56,189,248,0.12) 50%, transparent 70%)",
          filter: "blur(90px)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        aria-hidden="true"
      />

      {/* ── Portrait Card Container ── */}
      <motion.div
        className="relative w-full flex justify-center cursor-pointer"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={
          isLoaded
            ? { opacity: 1, scale: isHovered ? 1.02 : 1, y: isHovered ? -5 : 0 }
            : { opacity: 0, scale: 0.95, y: 0 }
        }
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Card Border Frame */}
        <div className="relative p-[1.5px] overflow-hidden w-full max-w-[320px] sm:max-w-[420px]">
          {/* Rotating Conic Border Ray */}
          <motion.div
            className="absolute -inset-[100%] pointer-events-none"
            style={{
              background:
                "conic-gradient(from 0deg, " +
                "rgba(56,189,248,0.9) 0deg, " +
                "transparent 40deg 70deg, " +
                "rgba(74,222,128,0.9) 100deg, " +
                "transparent 140deg 170deg, " +
                "rgba(251,146,60,0.9) 200deg, " +
                "transparent 240deg 270deg, " +
                "rgba(248,113,113,0.9) 300deg, " +
                "transparent 340deg 360deg)",
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* ── Inner Card Body ── */}
          <div
            className="relative overflow-hidden w-full bg-[#050505] transition-shadow duration-700"
            style={{
              height: "clamp(360px, 88vw, 500px)",
              boxShadow: isHovered
                ? "0 30px 90px rgba(0,0,0,0.9), 0 0 70px rgba(56,189,248,0.2)"
                : "0 25px 80px rgba(0,0,0,0.8)",
            }}
          >
            {/* Static Image */}
            <img
              src={profile}
              alt="Abinash Rout Portrait"
              className="absolute inset-0 w-full h-full object-cover transition-opacity"
              style={{
                opacity: videoVisible ? 0 : 1,
                transitionDuration: `${CROSSFADE_MS}ms`,
                transitionTimingFunction: "ease-in-out",
              }}
              loading="eager"
            />

            {/* Video Element */}
            <video
              ref={videoRef}
              src={
                potrait ||
                "https://res.cloudinary.com/dnxha9arx/video/upload/v1786892823/ABINASH_ROUT___PERSONAL_PORT_uoyuam.mp4"
              }
              muted={isMuted}
              playsInline
              preload="auto"
              onEnded={handleVideoEnded}
              className="absolute inset-0 w-full h-full object-cover transition-opacity"
              style={{
                opacity: videoVisible ? 1 : 0,
                transitionDuration: `${CROSSFADE_MS}ms`,
                transitionTimingFunction: "ease-in-out",
              }}
              aria-hidden="true"
            />

            {/* ── Luxurious Slow Corner-to-Corner White Sheen Sweep ── */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  key="shine-sweep-slow"
                  className="absolute pointer-events-none z-10"
                  style={{
                    width: "250%",
                    height: "250%",
                    top: "-75%",
                    left: "-75%",
                    background:
                      "linear-gradient(135deg, transparent 32%, rgba(255,255,255,0.03) 42%, rgba(255,255,255,0.38) 50%, rgba(255,255,255,0.03) 58%, transparent 68%)",
                  }}
                  initial={{ x: "-110%", y: "-110%", opacity: 0 }}
                  animate={{
                    x: ["-110%", "110%"],
                    y: ["-110%", "110%"],
                    opacity: [0, 1, 1, 0],
                  }}
                  exit={{ opacity: 0, transition: { duration: 0.6 } }}
                  transition={{
                    duration: 2.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  aria-hidden="true"
                />
              )}
            </AnimatePresence>

            {/* Glass Ambient Tint */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{
                background:
                  "linear-gradient(135deg, rgba(14,165,233,0.12) 0%, rgba(255,255,255,0.04) 50%, rgba(0,0,0,0) 100%)",
                mixBlendMode: "screen",
              }}
              aria-hidden="true"
            />

            {/* ── Controls (Top Right) ── */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              {hasEnded && (
                <button
                  type="button"
                  onClick={handleReplay}
                  aria-label="Replay intro"
                  className="w-8 h-8 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 cursor-pointer hover:scale-105"
                  style={{
                    border: "1px solid rgba(56,189,248,0.4)",
                    backgroundColor: "rgba(8,15,24,0.75)",
                  }}
                >
                  <FiRotateCcw className="w-3.5 h-3.5 text-sky-400" />
                </button>
              )}

              <button
                type="button"
                onClick={toggleSound}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
                className="w-8 h-8 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 cursor-pointer"
                style={{
                  border: "1px solid rgba(255,255,255,0.15)",
                  backgroundColor: "rgba(0,0,0,0.45)",
                }}
              >
                {isMuted ? (
                  <FiVolumeX className="w-4 h-4" />
                ) : (
                  <FiVolume2 className="w-4 h-4 text-sky-400" />
                )}
              </button>
            </div>

            {/* ── Status Indicator (Top Left) ── */}
            <div
              className="absolute top-4 sm:top-5 left-4 sm:left-5 w-7 sm:w-8 h-7 sm:h-8 backdrop-blur-sm flex items-center justify-center transition-colors duration-500 z-20"
              style={{
                border: isHovered
                  ? "1px solid rgba(56,189,248,0.4)"
                  : "1px solid rgba(255,255,255,0.1)",
                backgroundColor: isHovered
                  ? "rgba(8,15,24,0.85)"
                  : "rgba(0,0,0,0.42)",
              }}
            >
              <div
                className="w-2.5 h-2.5 rounded-full animate-pulse transition-colors duration-500"
                style={{
                  backgroundColor: isHovered
                    ? "rgba(56,189,248,0.95)"
                    : "rgba(74,222,128,0.8)",
                }}
              />
            </div>

            {/* ── Location Badge (Bottom Left) ── */}
            <div className="absolute bottom-4 left-4 z-20">
              <div
                className="flex items-center gap-3 px-3.5 py-2 backdrop-blur-md shadow-lg transition-all duration-500"
                style={{
                  backgroundColor: isHovered
                    ? "rgba(7, 14, 24, 0.65)"
                    : "rgba(0,0,0,0.4)",
                  border: isHovered
                    ? "1px solid rgba(56,189,248,0.3)"
                    : "1px solid rgba(255,255,255,0.10)",
                }}
              >
                <div className="flex items-center gap-2 font-mono text-[11px] tracking-wider text-white/90">
                  <span className="flex items-center gap-1 font-medium uppercase">
                    <FiMapPin
                      className="w-3 h-3 transition-colors duration-500"
                      style={{ color: isHovered ? "#38bdf8" : "#39FF88" }}
                    />
                    India
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
