import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import { QUICK_PROMPTS, getReply } from "../data/asterAssistant";

export default function AsterChatbot({ isLoaded = true }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi, I’m Aster, Abinash’s portfolio assistant. Ask me about projects, skills, education, or contact options.",
    },
  ]);

  const messagesRef = useRef(null);

  useEffect(() => {
    const messagesPanel = messagesRef.current;
    if (!messagesPanel) return;

    messagesPanel.scrollTo({
      top: messagesPanel.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const canSend = input.trim().length > 0;

  const sendMessage = (value) => {
    const text = value.trim();
    if (!text) return;

    const reply = getReply(text);

    setMessages((prev) => [
      ...prev,
      { role: "user", text },
      { role: "assistant", text: reply },
    ]);

    setInput("");
  };

  const promptButtons = useMemo(
    () => QUICK_PROMPTS.map((prompt) => prompt.toLowerCase()),
    [],
  );

  const handleNavigation = (target) => {
    const section = document.querySelector(target);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setOpen(false);
    }
  };

  const renderMessage = (message) => {
    if (
      message.role === "assistant" &&
      typeof message.text === "string" &&
      message.text.startsWith("#")
    ) {
      return (
        <button
          type="button"
          onClick={() => handleNavigation(message.text)}
          className="font-medium text-sky-300 underline"
        >
          Open {message.text.replace("#", "")} section
        </button>
      );
    }

    const parts = message.text.split(/(https?:\/\/[^\s]+)/g);

    return (
      <p className="whitespace-pre-wrap">
        {parts.map((part, index) => {
          if (part.match(/^https?:\/\//)) {
            return (
              <a
                key={index}
                href={part}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-sky-300 underline"
              >
                {part}
              </a>
            );
          }
          return <React.Fragment key={index}>{part}</React.Fragment>;
        })}
      </p>
    );
  };

  return (
    <>
      {/* ======================================================
          CHAT BUTTON — Synchronized with Hero content entrance
      ====================================================== */}
      <motion.div
        className="group fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[1200]"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{
          opacity: isLoaded ? 1 : 0,
          scale: isLoaded ? 1 : 0.8,
          y: isLoaded ? 0 : 20,
        }}
        transition={{
          duration: 0.8,
          delay: 0.25,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ pointerEvents: isLoaded ? "auto" : "none" }}
      >
        {/* Hover label */}
        {!open && (
          <span
            className={[
              "pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 translate-x-1",
              "whitespace-nowrap rounded-full border border-white/10",
              "bg-[#121212]/90 backdrop-blur-md px-3 py-1.5",
              "font-mono text-[10px] uppercase tracking-[0.18em] text-white/75",
              "opacity-0 transition-all duration-200 ease-out",
              "group-hover:translate-x-0 group-hover:opacity-100",
            ].join(" ")}
          >
            Ask Aster
          </span>
        )}

        <motion.button
          type="button"
          onClick={() => setOpen((v) => !v)}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className={[
            "relative inline-flex h-14 w-14 items-center justify-center",
            "rounded-full border border-white/10",
            "bg-[#121212]/75 backdrop-blur-md",
            "text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)]",
            "transition-colors duration-300 hover:border-sky-400/30",
          ].join(" ")}
          aria-label="Open chatbot"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-400/10 text-sky-300">
            <MessageCircle className="h-5 w-5" />
          </span>
        </motion.button>
      </motion.div>

      {/* ======================================================
          CHAT WINDOW
      ====================================================== */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.25, x: 24, y: 24 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.25, x: 24, y: 24 }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 28,
              mass: 0.7,
            }}
            style={{ transformOrigin: "bottom right" }}
            className={[
              "fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-[1201]",
              "w-[calc(100vw-2rem)] sm:w-[360px] max-w-[360px]",
              "rounded-2xl border border-white/10 bg-[#0d0d0d]/95 backdrop-blur-xl",
              "shadow-[0_30px_70px_rgba(0,0,0,0.5)] overflow-hidden",
            ].join(" ")}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <div>
                <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/45">
                  Aster
                </p>
                <p className="text-sm text-white">Portfolio Assistant</p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-2 text-white/60 hover:text-white transition-colors"
                aria-label="Close chatbot"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={messagesRef}
              className="chat-scroll-area max-h-[320px] overflow-y-auto overscroll-contain px-4 py-4 space-y-3"
              onWheel={(event) => event.stopPropagation()}
              onTouchMove={(event) => event.stopPropagation()}
            >
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={[
                    "flex",
                    message.role === "user" ? "justify-end" : "justify-start",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
                      message.role === "user"
                        ? "bg-white text-black"
                        : "bg-white/8 text-white border border-white/10",
                    ].join(" ")}
                  >
                    {renderMessage(message)}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="px-4 pb-4">
              <div className="flex flex-wrap gap-2 mb-3">
                {promptButtons.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => sendMessage(prompt)}
                    className="rounded-full border border-white/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-white/70 hover:text-white hover:border-white/25 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  sendMessage(input);
                }}
                className="flex items-center gap-2"
              >
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about Abinash..."
                  className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/25"
                />

                <button
                  type="submit"
                  disabled={!canSend}
                  className="inline-flex items-center justify-center rounded-full bg-white px-3.5 py-3 text-black disabled:opacity-40"
                  aria-label="Send message"
                >
                  <Send size={14} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
