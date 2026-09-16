import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Copy, Download, X, AlertCircle } from "lucide-react";
import {
  downloadPortfolioQr,
  generatePortfolioQrDataUrl,
  normalizeQrValue,
} from "../utils/qr";

export default function PortfolioQRModal({
  open,
  onClose,
  title,
  description,
  projectName,
  value,
  downloadFilename = "portfolio-qr.png",
  items,
}) {
  const qrItems = useMemo(
    () => (items?.length ? items : [{ title, description, projectName, value, downloadFilename }]),
    [items, title, description, projectName, value, downloadFilename]
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copyState, setCopyState] = useState("idle");
  const closeButtonRef = useRef(null);
  const touchStartX = useRef(null);
  const activeItem = qrItems[activeIndex] || qrItems[0];

  const safeValue = useMemo(() => {
    try {
      return normalizeQrValue(activeItem?.value);
    } catch (err) {
      return "";
    }
  }, [activeItem?.value]);

  useEffect(() => {
    setActiveIndex(0);
  }, [open, items]);

  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) {
      setQrDataUrl("");
      setLoading(false);
      setError("");
      setCopyState("idle");
      return undefined;
    }

    let cancelled = false;

    const buildQr = async () => {
      try {
        setLoading(true);
        setError("");
        const dataUrl = await generatePortfolioQrDataUrl(activeItem.value);
        if (!cancelled) setQrDataUrl(dataUrl);
      } catch (err) {
        if (!cancelled) {
          setError("Unable to generate QR code. Please try again.");
          setQrDataUrl("");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    buildQr();

    return () => {
      cancelled = true;
    };
  }, [open, activeItem?.value]);

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  const handleCopy = async () => {
    if (!safeValue) return;

    try {
      await navigator.clipboard.writeText(safeValue);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1500);
    } catch (err) {
      setError("Unable to copy link. Please try again.");
    }
  };

  const handleDownload = () => {
    try {
      downloadPortfolioQr(qrDataUrl, activeItem.downloadFilename || downloadFilename);
    } catch (err) {
      setError("Unable to download QR code. Please try again.");
    }
  };

  const showPrevious = () => setActiveIndex((index) => (index - 1 + qrItems.length) % qrItems.length);
  const showNext = () => setActiveIndex((index) => (index + 1) % qrItems.length);

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;
    const distance = event.changedTouches[0]?.clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) < 45 || qrItems.length < 2) return;
    if (distance < 0) showNext();
    else showPrevious();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[12050] flex items-center justify-center p-3 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            type="button"
            aria-label="Close QR modal"
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={activeItem.title || title}
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 14 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className={[
              "relative z-10 w-full max-w-[440px] overflow-hidden",
              "border border-white/10 bg-[#0b0b0d]/95 backdrop-blur-xl",
              "shadow-[0_30px_90px_rgba(0,0,0,0.55)]",
            ].join(" ")}
          >
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%)] opacity-60" />

            <div className="relative p-4 sm:p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="space-y-2">
                  <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/40">
                    {activeItem.title || title}
                  </p>
                  <h2 className="font-geist text-[24px] sm:text-[30px] font-[800] tracking-tight text-white leading-[1.05]">
                    {activeItem.projectName || activeItem.description || description}
                  </h2>
                  <p className="text-sm sm:text-[15px] leading-relaxed text-white/55 max-w-[30ch]">
                    {activeItem.description || description}
                  </p>
                </div>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  className="flex h-10 w-10 items-center justify-center border border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
                  aria-label="Close QR modal"
                >
                  <X size={16} />
                </button>
              </div>

              <div
                className="mt-5 flex justify-center touch-pan-y"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div className="w-full max-w-[300px] rounded-2xl border border-white/10 bg-black/35 p-3 sm:p-4">
                  <div className="rounded-xl border border-white/10 bg-[#0b0b0b] p-3 sm:p-4">
                    {loading ? (
                      <div className="flex aspect-square items-center justify-center rounded-lg border border-dashed border-white/10 text-center">
                        <div className="space-y-2">
                          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                            Generating QR
                          </p>
                        </div>
                      </div>
                    ) : error ? (
                      <div className="flex aspect-square items-center justify-center rounded-lg border border-dashed border-white/10 text-center px-4">
                        <div className="space-y-3">
                          <AlertCircle className="mx-auto h-8 w-8 text-white/60" />
                          <p className="text-sm leading-relaxed text-white/70">
                            {error}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={qrDataUrl}
                        alt={activeItem.title || title}
                        className="w-full aspect-square rounded-lg bg-black object-contain"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-5 text-center">
                {activeItem.projectName && (
                  <p className="mb-2 text-[11px] font-mono uppercase tracking-[0.18em] text-white/35">
                    {activeItem.projectName}
                  </p>
                )}
                <p className="text-sm text-white/50">
                  Scan with your phone camera
                </p>
                {safeValue && (
                  <p className="mt-1 break-all text-[11px] text-white/30">
                    {safeValue}
                  </p>
                )}
              </div>

              {qrItems.length > 1 && (
                <div className="mt-4 flex items-center justify-between gap-3">
                  <button type="button" onClick={showPrevious} className="flex h-9 w-9 items-center justify-center border border-white/10 text-white/60 transition-colors hover:bg-white/10 hover:text-white" aria-label="Previous QR code">
                    <ChevronLeft size={16} />
                  </button>
                  <div className="flex items-center gap-2" aria-label="QR code selector">
                    {qrItems.map((item, index) => (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        aria-label={`Show ${item.title || `QR code ${index + 1}`}`}
                        className={`h-1.5 transition-all ${index === activeIndex ? "w-8 bg-white" : "w-2 bg-white/25 hover:bg-white/50"}`}
                      />
                    ))}
                  </div>
                  <button type="button" onClick={showNext} className="flex h-9 w-9 items-center justify-center border border-white/10 text-white/60 transition-colors hover:bg-white/10 hover:text-white" aria-label="Next QR code">
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}

              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <motion.button
                  type="button"
                  onClick={handleCopy}
                  whileTap={{ scale: 0.98 }}
                  animate={copyState === "copied" ? { scale: 1.02 } : { scale: 1 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-flex flex-1 items-center justify-center gap-2 border border-white/10 bg-white text-black px-4 py-3 text-[12px] font-mono uppercase tracking-[0.18em] transition-colors hover:bg-white/90 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
                >
                  {copyState === "copied" ? (
                    <>
                      <Check size={14} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      Copy Link
                    </>
                  )}
                </motion.button>

                <motion.button
                  type="button"
                  onClick={handleDownload}
                  whileTap={{ scale: 0.98 }}
                  disabled={!qrDataUrl}
                  className="inline-flex flex-1 items-center justify-center gap-2 border border-white/10 bg-transparent px-4 py-3 text-[12px] font-mono uppercase tracking-[0.18em] text-white transition-colors hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
                >
                  <Download size={14} />
                  Download QR
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
