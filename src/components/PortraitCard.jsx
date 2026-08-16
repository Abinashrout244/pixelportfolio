import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import profile from "../assets/profile.png";
import potrait from "../assets/portrait.mp4";
import { FiMapPin, FiVolume2, FiVolumeX, FiRotateCcw } from "react-icons/fi";

const CARD_REVEAL_MS = 1700;
const POST_REVEAL_DELAY_MS = 900;
const VIDEO_START_DELAY_MS = CARD_REVEAL_MS + POST_REVEAL_DELAY_MS;
const CROSSFADE_MS = 900;

export default function PortraitCard({ isLoaded }) {
  const [isHovered, setIsHovered] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // Starts unmuted
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
        // Browser autoplay audio restriction fallback
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

  // Toggle Mute / Unmute
  const toggleSound = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuteState = !isMuted;
    videoRef.current.muted = nextMuteState;
    setIsMuted(nextMuteState);
  };

  // Replay Video
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

  // When video completes its monologue
  const handleVideoEnded = () => {
    setHasEnded(true);
    setVideoVisible(false); // Smoothly crossfades back to static photo
  };

  return (
    <div className="flex w-full lg:w-[45%] items-center justify-center z-10 relative mt-2 sm:mt-4 lg:mt-0">
      {/* ── Background Ambient Glow ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "min(92vw, 550px)",
          height: "min(110vw, 600px)",
          background:
            "radial-gradient(circle, rgba(56,189,248,0.15) 0%, rgba(255,255,255,0.06) 40%, transparent 70%)",
          filter: "blur(140px)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        aria-hidden="true"
      />

      {/* ── Portrait Card with Infinite Border Beam ── */}
      <motion.div
        className="relative animate-float w-full flex justify-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={
          isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
        }
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Animated Moving Light Glow Outside Border */}
        <div className="relative p-[1.5px] overflow-hidden w-full max-w-[320px] sm:max-w-[420px]">
          <motion.div
            className="absolute -inset-[100%] pointer-events-none"
            style={{
              background:
                "conic-gradient(from 0deg, " +
                "rgba(56,189,248,0.9) 0deg, " + // blue
                "transparent 40deg 70deg, " +
                "rgba(74,222,128,0.9) 100deg, " + // green
                "transparent 140deg 170deg, " +
                "rgba(251,146,60,0.9) 200deg, " + // orange
                "transparent 240deg 270deg, " +
                "rgba(248,113,113,0.9) 300deg, " + // red
                "transparent 340deg 360deg)",
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Sharp Edge Inner Container (No rounded corners) */}
          <div
            className="relative overflow-hidden w-full bg-[#050505]"
            style={{
              height: "clamp(360px, 88vw, 500px)",
              boxShadow: isHovered
                ? "0 25px 80px rgba(0,0,0,0.8), 0 0 80px rgba(56,189,248,0.18)"
                : "0 25px 80px rgba(0,0,0,0.8)",
            }}
          >
            {/* Static Portrait */}
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

            {/* Video Portrait */}
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

            {/* Glass Hover Gradient Filter */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                opacity: isHovered ? 1 : 0,
                background:
                  "linear-gradient(135deg, rgba(14,165,233,0.12) 0%, rgba(34,197,94,0.04) 45%, rgba(255,255,255,0) 100%)",
                mixBlendMode: "screen",
              }}
              aria-hidden="true"
            />

            {/* ── Top-Right Controls ── */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              {/* Replay Button */}
              {hasEnded && (
                <button
                  type="button"
                  onClick={handleReplay}
                  aria-label="Replay intro"
                  className="w-8 h-8 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer hover:scale-105"
                  style={{
                    border: "1px solid rgba(56,189,248,0.4)",
                    backgroundColor: "rgba(8,15,24,0.75)",
                  }}
                >
                  <FiRotateCcw className="w-3.5 h-3.5 text-sky-400" />
                </button>
              )}

              {/* Sound Toggle Button */}
              <button
                type="button"
                onClick={toggleSound}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
                className="w-8 h-8 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer"
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

            {/* ── Top-Left Indicator Badge ── */}
            <div
              className="absolute top-4 sm:top-5 left-4 sm:left-5 w-7 sm:w-8 h-7 sm:h-8 backdrop-blur-sm flex items-center justify-center transition-colors duration-300"
              style={{
                border: isHovered
                  ? "1px solid rgba(56,189,248,0.35)"
                  : "1px solid rgba(255,255,255,0.1)",
                backgroundColor: isHovered
                  ? "rgba(8,15,24,0.85)"
                  : "rgba(0,0,0,0.42)",
              }}
            >
              <div
                className="w-2.5 h-2.5 rounded-full animate-pulse transition-colors duration-300"
                style={{
                  backgroundColor: isHovered
                    ? "rgba(56,189,248,0.95)"
                    : "rgba(74,222,128,0.8)",
                }}
              />
            </div>

            {/* ── Bottom-Left Location Overlay ── */}
            <div className="absolute bottom-4 left-4 z-10">
              <div
                className="flex items-center gap-3 px-3.5 py-2 backdrop-blur-md shadow-lg transition-all duration-300"
                style={{
                  backgroundColor: isHovered
                    ? "rgba(7, 14, 24, 0.62)"
                    : "rgba(0,0,0,0.4)",
                  border: isHovered
                    ? "1px solid rgba(56,189,248,0.22)"
                    : "1px solid rgba(255,255,255,0.10)",
                }}
              >
                <div className="flex items-center gap-2 font-mono text-[11px] tracking-wider text-white/90">
                  <span className="flex items-center gap-1 font-medium uppercase">
                    <FiMapPin
                      className="w-3 h-3 transition-colors duration-300"
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
