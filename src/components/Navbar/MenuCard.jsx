import React from "react";
import { motion } from "framer-motion";

export default function MenuCard({
  icon: Icon,
  title,
  description,
  href = "#",
  index = 0,
  featured = false,
}) {
  return (
    <motion.a
      href={href}
      variants={{
        hidden: { opacity: 0, y: 6 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            delay: index * 0.05,
            duration: 0.28,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      whileHover={{
        y: -8,
        backgroundColor: "#1E1E1E",
        borderColor: "rgba(255,255,255,0.12)",
        transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
      }}
      className={[
        "relative flex items-center gap-4 p-4",
        "min-h-[80px] h-full",
        "bg-[#171717] border border-white/[0.05]",
        "cursor-pointer no-underline",
        "focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30",
        "block overflow-hidden",
        featured ? "p-6" : "",
      ].join(" ")}
    >
      {featured && (
        <>
          {/* Gradient accent border */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              padding: 1,
              borderRadius: "inherit",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.16), rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.1))",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />

          {/* Faint grid backdrop */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
              maskImage:
                "radial-gradient(ellipse 80% 80% at 20% 85%, black 40%, transparent 90%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 80% at 20% 85%, black 40%, transparent 90%)",
            }}
          />

          {/* Scanning beam sweep */}
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 h-24"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgba(255,255,255,0.09), transparent)",
            }}
            animate={{ top: ["-15%", "115%"] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Thin bright scan line riding the beam's center */}
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
              boxShadow: "0 0 8px 1px rgba(255,255,255,0.25)",
            }}
            animate={{ top: ["-2%", "102%"] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Vignette so content stays readable over the scan */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 90% 70% at 20% 85%, rgba(23,23,23,0.4), rgba(23,23,23,0.85) 75%)",
            }}
          />
        </>
      )}

      {/* Icon container */}
      <span
        className={[
          "relative z-10 flex items-center justify-center shrink-0 rounded-full",
          featured
            ? "w-11 h-11 bg-white/[0.04] border border-white/[0.06] text-[#D4D4D8]"
            : "text-[#A1A1AA]",
        ].join(" ")}
      >
        <Icon size={featured ? 22 : 18} strokeWidth={1.5} />
      </span>

      {/* Text */}
      <span className="relative z-10 flex flex-col gap-1">
        <span
          className={[
            "font-mono font-medium uppercase tracking-[0.15em] text-[#F5F5F5]",
            featured
              ? "text-[13px] xl:text-[15px]"
              : "text-[10px] xl:text-[12px]",
          ].join(" ")}
        >
          {title}
        </span>
        <span
          className={[
            "font-mono text-[#A1A1AA] leading-relaxed",
            featured
              ? "text-[11px] xl:text-[13px]"
              : "text-[9px] xl:text-[11px]",
          ].join(" ")}
        >
          {description}
        </span>
      </span>
    </motion.a>
  );
}
