import React from "react";
import { motion } from "framer-motion";
import { SiSpotify } from "react-icons/si";

export default function HeroFloatingSpotifyButton({
  href = "https://open.spotify.com/playlist/66gSU1vcL7enOHvHMlTudu?si=9264f4a7cd3842dd&pt=d9054c1dc305cc60ca18341ed0fc0f69",
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={[
        "fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[1200]",
        "inline-flex items-center gap-3",
        "px-3.5 sm:px-4 py-2.5",
        "rounded-full ",

        "text-white no-underline shadow-[0_10px_30px_rgba(0,0,0,0.35)]",
        "transition-colors duration-300 hover:border-emerald-400/30",
      ].join(" ")}
      aria-label="Open Spotify"
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full animate-[spin_9s_linear_infinite] group-hover:[animation-play-state:paused]"
      >
        <defs>
          <path
            id="circlePath"
            d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
          />
        </defs>
        <text
          className="fill-white/70 font-mono uppercase"
          style={{ fontSize: "6.2px", letterSpacing: "0.15em" }}
        >
          <textPath href="#circlePath" startOffset="0%">
            Open Playlist • Open Playlist • Open Playlist •
          </textPath>
        </text>
      </svg>

      <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-400">
        <SiSpotify className="h-4.5 w-4.5" />
      </span>
    </motion.a>
  );
}
