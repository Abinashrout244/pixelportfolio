import React from "react";

/* ---------------------------------------------------------------- */
/* Inline SVG icons — stroke-based, 24x24, inherit color via currentColor */
/* ---------------------------------------------------------------- */

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function ArrowLeftIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </svg>
  );
}

function ArrowUpRightIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

function GithubIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
    </svg>
  );
}

function BookOpenIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M2 4.5A2.5 2.5 0 0 1 4.5 2H9a3 3 0 0 1 3 3 3 3 0 0 1 3-3h4.5A2.5 2.5 0 0 1 22 4.5v14A2.5 2.5 0 0 1 19.5 21H15a3 3 0 0 0-3 3 3 3 0 0 0-3-3H4.5A2.5 2.5 0 0 1 2 18.5v-14z" />
      <path d="M12 5v19" transform="translate(0 -3)" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg {...iconProps} {...props} fill="currentColor" stroke="none">
      <path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0zM3.5 8.75h3.4V21H3.5V8.75zM9.75 8.75h3.26v1.68h.05c.45-.86 1.56-1.77 3.22-1.77 3.44 0 4.08 2.27 4.08 5.22V21h-3.4v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.54 1.72-2.54 3.48V21H9.75V8.75z" />
    </svg>
  );
}

function MailIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}

function RssIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M4 11a9 9 0 0 1 9 9" />
      <path d="M4 4a16 16 0 0 1 16 16" />
      <circle cx="5" cy="19" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WrenchIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M14.7 6.3a4 4 0 1 0-5.4 5.4l-7 7a1.5 1.5 0 0 0 2.1 2.1l7-7a4 4 0 0 0 5.4-5.4l-2.7 2.7-2.1-2.1z" />
    </svg>
  );
}

function FolderGitIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M4 20a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v1" />
      <circle cx="14" cy="14" r="1.8" />
      <circle cx="20" cy="19" r="1.8" />
      <path d="M14 15.8V17a2 2 0 0 0 2 2h2.2" />
    </svg>
  );
}

/* ---------------------------------------------------------------- */

function LinkCard({ icon: Icon, title, subtitle, href = "#", accent }) {
  return (
    <a href={href} className="group relative block">
      {/* Glow layer, only visible on hover — same system as the rest of the site */}
      <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-indigo-500/0 via-fuchsia-500/0 to-transparent opacity-0 blur-lg transition-opacity duration-300 group-hover:from-indigo-500/25 group-hover:via-fuchsia-500/15 group-hover:opacity-100" />

      <div className="relative flex items-center justify-between gap-4 bg-[#18181b]/80 backdrop-blur-sm border border-zinc-800/80 rounded-xl px-5 py-5 sm:px-6 sm:py-6 transition-all duration-300 group-hover:border-zinc-700 group-hover:-translate-y-1">
        <div className="flex items-center gap-4 min-w-0">
          <span className="shrink-0 w-11 h-11 rounded-lg bg-zinc-800/70 border border-zinc-700/50 flex items-center justify-center text-zinc-300 transition-colors duration-300 group-hover:text-white group-hover:border-zinc-600">
            <Icon width={18} height={18} />
          </span>
          <div className="min-w-0">
            <h3
              className={`text-base sm:text-lg font-bold tracking-tight truncate ${
                accent ? "text-sky-400" : "text-white"
              }`}
            >
              {title}
            </h3>
            <p className="text-zinc-500 text-xs sm:text-sm font-mono truncate">
              {subtitle}
            </p>
          </div>
        </div>

        <ArrowUpRightIcon
          width={18}
          height={18}
          className="shrink-0 text-zinc-500 transition-all duration-300 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>
    </a>
  );
}

function LinkGroup({ label, children }) {
  return (
    <div className="space-y-4">
      <span className="block text-xs font-mono tracking-widest text-zinc-500 uppercase">
        {label}
      </span>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {children}
      </div>
    </div>
  );
}

export default function ConnectWithMe() {
  return (
    <div className="min-h-screen bg-transparent text-white font-sans antialiased selection:bg-zinc-800 selection:text-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-12 py-12 sm:py-20">
        {/* Navigation Back Link */}
        <nav className="relative z-10">
          <a
            href="#home"
            className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-widest text-zinc-500 hover:text-zinc-200 transition-colors uppercase"
          >
            <ArrowLeftIcon width={14} height={14} /> BACK TO HOME
          </a>
        </nav>

        {/* HEADER */}
        <header className="relative pt-10 sm:pt-16 pb-16 sm:pb-20 text-center">
          {/* Full-width watermark, matches the rest of the site's ABINASH treatment */}
          <span className="absolute inset-x-0 top-0 sm:top-2 text-[4.5rem] sm:text-[8rem] lg:text-[10rem] font-extrabold text-zinc-800/40 select-none pointer-events-none tracking-tighter leading-none whitespace-nowrap overflow-hidden text-center">
            ABINASH
          </span>

          <div className="relative space-y-5">
            <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
              NETWORK
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
              Connect With <span className="italic font-serif">Me</span>
            </h1>
            <p className="max-w-xl mx-auto text-zinc-400 text-sm sm:text-base leading-relaxed">
              Every place you can find me online, gathered in one spot. Whether
              you want to see my code, connect professionally, or just say hi —
              pick your channel.
            </p>
          </div>
        </header>

        {/* LINK GROUPS */}
        <div className="relative space-y-14 sm:space-y-16">
          <LinkGroup label="Code & Craft">
            <LinkCard
              icon={GithubIcon}
              title="GitHub"
              subtitle="@abinash"
              href="https://github.com/"
            />
            <LinkCard
              icon={BookOpenIcon}
              title="Guestbook"
              subtitle="Leave a mark"
              href="#guestbook"
            />
          </LinkGroup>

          <LinkGroup label="Connect">
            <LinkCard
              icon={LinkedinIcon}
              title="LinkedIn"
              subtitle="in/abinash"
              href="https://linkedin.com/"
            />
            <LinkCard
              icon={MailIcon}
              title="Email"
              subtitle="abinash.work@gmail.com"
              href="mailto:abinash.work@gmail.com"
              accent
            />
          </LinkGroup>

          <LinkGroup label="Explore">
            <LinkCard
              icon={RssIcon}
              title="Blog"
              subtitle="Thoughts on code"
              href="#blog"
            />
            <LinkCard
              icon={WrenchIcon}
              title="Uses"
              subtitle="My gear & tools"
              href="#uses"
            />
            <LinkCard
              icon={FolderGitIcon}
              title="Projects"
              subtitle="Things I've built"
              href="#projects"
            />
          </LinkGroup>
        </div>
      </div>

      {/* Now-playing widget, fixed to the corner like the reference */}
      <div className="hidden sm:flex fixed bottom-6 left-6 items-center gap-3 bg-[#18181b]/80 backdrop-blur-sm border border-zinc-800/80 rounded-full pl-3 pr-4 py-2 shadow-lg">
        <span className="w-7 h-7 rounded-full bg-green-500/15 flex items-center justify-center text-green-500">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24 0-.36-.06-.6-.18-1.68-1.02-3.72-1.56-6.06-1.56-1.38 0-2.82.18-4.14.6-.18.06-.42.12-.54.12-.36 0-.6-.3-.6-.6 0-.42.24-.6.6-.72 1.5-.42 3.12-.66 4.68-.66 2.58 0 4.86.6 6.78 1.74.24.18.36.36.36.66.06.36-.24.6-.48.6zm1.26-2.82c-.3 0-.48-.12-.72-.24-1.68-1.02-4.2-1.62-6.66-1.62-1.32 0-2.76.24-3.96.6-.24.06-.36.12-.6.12-.42 0-.78-.36-.78-.78s.24-.72.66-.84c1.5-.42 3.06-.66 4.68-.66 2.76 0 5.4.66 7.44 1.86.36.18.6.48.6.9 0 .42-.36.66-.66.66zm.12-3.06c-2.34-1.32-6.24-1.62-8.7-1.02-.36.12-.66.18-.9.18-.48 0-.9-.42-.9-.96s.3-.9.78-1.02c2.94-.72 7.32-.36 10.02 1.14.42.24.72.6.72 1.08 0 .48-.42.9-.9.9-.18 0-.36-.06-.6-.3z" />
          </svg>
        </span>
        <div className="leading-tight">
          <p className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
            Listening now
          </p>
          <p className="text-xs text-zinc-300">Lo-fi Coding Beats</p>
        </div>
      </div>
    </div>
  );
}
