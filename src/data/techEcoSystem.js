export const CATEGORIES = [
  {
    id: "frontend",
    tag: "S01 E01",
    match: "99% Match",
    subHeader: "FRONTEND ARCHITECTURE",
    title: "Frontend Frameworks",
    description:
      "Building interactive, accessible, and performant user interfaces.",
    direction: { x: -80, y: -70, rotate: -3 }, // Top-Left
    pills: ["React", "JavaScript", "Framer Motion", "Redux Toolkit", "Vite"],
  },
  {
    id: "styling",
    tag: "S01 E02",
    match: "98% Match",
    subHeader: "UI/UX & MOTION DESIGN",
    title: "Styling & Design Systems",
    description:
      "Pixel-perfect interfaces with modern CSS systems and micro-interactions.",
    direction: { x: 0, y: -80, rotate: 0 }, // Top-Center
    pills: [
      "Tailwind CSS",
      "Bootstrap",
      "CSS",
      "Responsive Design",
      "Glassmorphism",
      "Figma",
    ],
  },
  {
    id: "backend",
    tag: "S01 E03",
    match: "97% Match",
    subHeader: "SERVER-SIDE ARCHITECTURE",
    title: "Backend Development",
    description:
      "Designing scalable APIs, authentication systems, and server architectures.",
    direction: { x: 80, y: -70, rotate: 3 }, // Top-Right
    pills: ["Node.js", "Express.js", "REST APIs", "JWT", "Socket.IO", "SSE"],
  },
  {
    id: "databases",
    tag: "S01 E04",
    match: "97% Match",
    subHeader: "DATA & PERSISTENCE",
    title: "Databases & Storage",
    description:
      "Working with structured and document-based data stores for applications.",
    direction: { x: -90, y: 0, rotate: -2 }, // Middle-Left
    pills: ["MongoDB", "Mongoose", "PostgreSQL", "Firebase"],
  },
  {
    id: "realtime",
    tag: "S01 E05",
    match: "96% Match",
    subHeader: "REAL-TIME SYSTEMS",
    title: "Real-Time & Streams",
    description:
      "Building responsive systems that synchronize data and events in real time.",
    direction: { x: 90, y: 0, rotate: 2 }, // Middle-Right
    pills: ["Socket.IO", "WebSockets"],
  },
  {
    id: "devops",
    tag: "S01 E06",
    match: "100% Match",
    subHeader: "DEVOPS & DEPLOYMENT",
    title: "Performance & CI/CD",
    description:
      "Shipping production-ready software with modern automated workflows.",
    direction: { x: -80, y: 70, rotate: -3 }, // Bottom-Left
    pills: ["Git", "GitHub", "Vercel", "Render", "npm", "Netlify"],
  },
  {
    id: "testing",
    tag: "S01 E07",
    match: "95% Match",
    subHeader: "QUALITY & DEV EXPERIENCE",
    title: "Testing & API Tools",
    description:
      "Debugging, testing, and validating applications throughout development.",
    direction: { x: 0, y: 80, rotate: 0 }, // Bottom-Center
    pills: [
      "Postman",
      "Jest",
      "Chrome DevTools",
      "ESLint",
      "VS Code",
      "Cursor",
    ],
  },
  {
    id: "architecture",
    tag: "S01 E08",
    match: "94% Match",
    subHeader: "SOFTWARE ENGINEERING",
    title: "Architecture & DSA",
    description:
      "Applying engineering principles to build maintainable scalable systems.",
    direction: { x: 80, y: 70, rotate: 3 }, // Bottom-Right
    pills: ["DSA", "OOP", "Clean Architecture", "Scalability"],
  },
];
