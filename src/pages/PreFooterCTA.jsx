import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";

export function PreFooterCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setIsModalOpen(false);
        setFormData({ name: "", email: "", message: "" });
      }, 2000);
    }, 1200);
  };

  return (
    <>
      {/* ── Main Pre-Footer CTA Section ── */}
      <section className="relative w-full bg-[#080808] text-white py-28 sm:py-36 overflow-hidden border-t border-white/5 select-none">
        {/* 1. Fine Dot Grid Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20 z-0"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />

        {/* Outer Edge Vignette Mask */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#080808_85%)] pointer-events-none z-0" />

        {/* 2. Network Arc SVG Overlay */}
        <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
          <svg
            className="w-full h-full min-w-[1200px] max-w-[1600px] opacity-80"
            viewBox="0 0 1440 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M -100,180 Q 550,-10 1350,320"
              stroke="#10b981"
              strokeWidth="1.25"
              strokeOpacity="0.45"
            />
            <path
              d="M 50,340 Q 650,480 1500,220"
              stroke="#059669"
              strokeWidth="1.25"
              strokeOpacity="0.35"
            />
            <g>
              <circle cx="120" cy="140" r="3" fill="#34d399" />
              <circle cx="120" cy="140" r="8" fill="#10b981" opacity="0.25" />
              <circle cx="1020" cy="270" r="4.5" fill="#34d399" />
              <circle
                cx="1020"
                cy="270"
                r="10"
                fill="#10b981"
                opacity="0.35"
                className="animate-pulse"
              />
              <circle
                cx="1020"
                cy="270"
                r="18"
                stroke="#10b981"
                strokeWidth="1"
                opacity="0.2"
              />
              <circle cx="1180" cy="380" r="3" fill="#34d399" opacity="0.8" />
            </g>
          </svg>
        </div>

        {/* 3. Main Content Container */}
        <div className="relative z-10 max-w-[1300px] mx-auto px-6 text-center flex flex-col items-center">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-white/40 mb-8"
          >
            AVAILABLE FOR PROJECTS
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-geist font-[800] text-white tracking-[-0.03em] text-[36px] sm:text-[56px] md:text-[72px] lg:text-[84px] leading-[0.95] mb-8"
          >
            READY TO BUILD THE NEXT
            <br />
            <span>SYSTEM?</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-geist text-white/50 text-[14px] sm:text-[15px] leading-relaxed max-w-lg mb-12"
          >
            Currently accepting high-impact opportunities in frontend
            engineering and scalable web applications.
          </motion.p>

          {/* Primary Action Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={() => setIsModalOpen(true)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#c8cbd0] hover:bg-white text-black font-mono text-[11px] font-bold tracking-[0.2em] uppercase px-8 py-4 transition-all duration-200 rounded-none mb-20 shadow-[0_0_20px_rgba(255,255,255,0.08)]"
          >
            LET'S CONNECT
          </motion.button>

          {/* Contact Metadata Row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-mono text-[11px] sm:text-[12px] text-white/40 tracking-wider"
          >
            {/* Email */}
            <a
              href="mailto:sunilbandwork@gmail.com"
              className="hover:text-white transition-colors flex items-center gap-1.5"
              aria-label="Email"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M1.5 4.5h21c.825 0 1.5.675 1.5 1.5v12c0 .825-.675 1.5-1.5 1.5h-21c-.825 0-1.5-.675-1.5-1.5v-12c0-.825.675-1.5 1.5-1.5zm0 1.5v.375l10.5 6.562 10.5-6.562v-.375h-21zm21 12v-10.125l-10.5 6.562-10.5-6.562v10.125h21z" />
              </svg>
              <span>abinashrout.mail@gmail.com</span>
            </a>

            <span className="text-white/20 hidden sm:inline">•</span>

            {/* Phone */}
            <a
              href="tel:+918390685016"
              className="hover:text-white transition-colors flex items-center gap-1.5"
              aria-label="Phone"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 0 0-1.02.24l-2.2 2.2a15.045 15.045 0 0 1-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
              </svg>
              <span>+91 8249281685</span>
            </a>

            <span className="text-white/20 hidden sm:inline">•</span>

            {/* GitHub */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
              aria-label="GitHub Profile"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </a>

            <span className="text-white/20 hidden sm:inline">•</span>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
              aria-label="LinkedIn Profile"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
              <span>LinkedIn</span>
            </a>

            <span className="text-white/20 hidden sm:inline">•</span>

            {/* Twitter / X */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
              aria-label="Twitter X Profile"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>X (Twitter)</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Exact Replaced Contact Modal ── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[999] flex items-start justify-center pt-16 sm:pt-24 p-4 overflow-y-auto">
            {/* Overlay Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md "
              aria-hidden="true"
            />

            {/* Modal Card Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[450px] max-h-[90vh] my-auto bg-[#0c0f0d] border border-white/10 p-6 sm:p-8 z-10 rounded-none shadow-2xl text-white overflow-y-auto"
            >
              {/* Top Subtle Ambient Glow */}
              <div className="absolute top-0 left-1/4 w-[200px] h-[120px] bg-emerald-500/10 rounded-full blur-[70px] pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 bg-black/40 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors rounded-none z-20"
                aria-label="Close modal"
              >
                <X size={15} />
              </button>

              {/* Header */}
              <div className="mb-4 pr-6">
                <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-white/50 block mb-0.5">
                  LET'S BUILD SOMETHING
                </span>
                <h2 className="font-geist font-[800] text-[28px] sm:text-[36px] text-white tracking-tight leading-none">
                  REACH OUT
                </h2>
              </div>

              {/* Form Content */}
              {isSubmitted ? (
                <div className="py-8 flex flex-col items-center justify-center text-center">
                  <CheckCircle2
                    size={40}
                    className="text-emerald-400 mb-3 animate-bounce"
                  />
                  <h4 className="font-geist font-bold text-[18px] text-white mb-1">
                    Message Sent!
                  </h4>
                  <p className="font-geist text-[13px] text-white/60">
                    Thanks for reaching out. I'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                  {/* NAME FIELD */}
                  <div>
                    <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-white/70 font-bold mb-1">
                      NAME
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      className="w-full bg-[#151816] border border-white/15 px-3.5 py-2.5 text-[13px] text-white placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors rounded-none font-geist"
                    />
                  </div>

                  {/* EMAIL FIELD */}
                  <div>
                    <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-white/70 font-bold mb-1">
                      EMAIL{" "}
                      <span className="text-white/40 font-normal">
                        (optional)
                      </span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      className="w-full bg-[#151816] border border-white/15 px-3.5 py-2.5 text-[13px] text-white placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors rounded-none font-geist"
                    />
                  </div>

                  {/* MESSAGE FIELD */}
                  <div>
                    <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-white/70 font-bold mb-1">
                      MESSAGE
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Hey Sunil, I have a project idea..."
                      className="w-full bg-[#151816] border border-white/15 px-3.5 py-2.5 text-[13px] text-white placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors rounded-none resize-none font-geist"
                    />
                  </div>

                  {/* DIRECT EMAIL + SUBMIT BUTTON ROW */}
                  <div className="w-full pt-1">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#c8cbd0] hover:bg-white text-black font-mono text-[10px] font-bold tracking-[0.15em] uppercase px-5 py-3.5 transition-colors rounded-none flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span className="animate-pulse">SENDING...</span>
                      ) : (
                        <>
                          <span>SEND MESSAGE</span>
                          <span aria-hidden="true">→</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default PreFooterCTA;
