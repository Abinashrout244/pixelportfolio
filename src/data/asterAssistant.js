import { PROJECTS } from "./projectsData";

export const QUICK_PROMPTS = ["Projects", "Skills", "Contact"];

// ============================================================
// ABINASH PROFILE
// ============================================================

export const assistantProfile = {
  name: "Abinash Rout",
  nickname: "AVI",

  location: {
    city: "Jajpur",
    state: "Odisha",
    country: "India",
  },

  education: {
    current: {
      degree: "B.Tech in Computer Science and Engineering",
      college: "Oxford College of Engineering and Management",
      location: "Bhubaneswar, Odisha",
      status: "Pursuing",
      duration: "2024 - 2028",
      grade: "8.7 CGPA",
      semester: "5th Semester",
    },

    higher_secondary: {
      degree: "Higher Secondary Certificate",
      institution: "Shanti Institute of Management & Higher Secondary School",
      location: "CDA-10, Cuttack, Odisha",
      duration: "2023 - 2024",
      percentage: "86%",
      stream: "Science (PCM)",
    },

    secondary: {
      degree: "Secondary School Certificate",
      institution: "Baghua Brahmani Devi High School, Baghua",
      location: "Balishai, Jajpur, Odisha",
      duration: "2021 - 2022",
      percentage: "85%",
    },
  },

  skills: {
    frontend: [
      "React",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Bootstrap",
      "Next.js",
      "TypeScript",
      "Vite",
      "Framer Motion",
    ],

    backend: ["Node.js", "Express.js", "REST APIs", "Socket.io"],

    database: ["MongoDB", "MongoDB Atlas"],

    tools: ["Git", "GitHub", "Redux Toolkit", "Firebase"],
  },

  role: "MERN Stack Developer",

  techStack: ["MongoDB", "Express.js", "React", "Node.js"],

  contact: {
    email: "abinashrout.mail@gmail.com",
    phone: "+91 8249281685",
    github: "https://github.com/Abinashrout244",
    linkedin: "https://www.linkedin.com/in/abinash-rout-274285322",
    twitter: "https://x.com/AbinashRout2251",
    instagram: "https://www.instagram.com/frequency._0.001",
  },

  summary:
    "Abinash Rout is a MERN Stack Developer and Computer Science Engineering student at Oxford College of Engineering and Management, Bhubaneswar. He is passionate about web development, modern JavaScript frameworks, AI-powered applications, and building responsive full-stack web applications.",

  interests: [
    "Web Development",
    "Full Stack Development",
    "Artificial Intelligence",
    "Generative AI",
    "Open Source",
    "Modern JavaScript Frameworks",
  ],
};

// ============================================================
// HELPERS
// ============================================================

const includesAny = (text, terms) => terms.some((term) => text.includes(term));

const getProjectName = (project) =>
  project.title || project.name || "Untitled Project";

const getProjectDescription = (project) =>
  project.shortDescription ||
  project.description ||
  project.desc ||
  "No description available.";

const getProjectLiveUrl = (project) =>
  project.liveUrl || project.Deploy || project.deploy || "#";

const getProjectGithubUrl = (project) =>
  project.githubUrl || project.github || "#";

const getProjectTech = (project) => {
  if (!project.tech) return [];

  return project.tech.map((item) =>
    typeof item === "string" ? item : item.text,
  );
};

// ============================================================
// REPLY ENGINE
// ============================================================

export function getReply(message) {
  const q = message.toLowerCase().trim();

  const { contact, education, skills, nickname, name } = assistantProfile;

  // ============================================================
  // NAME / NICKNAME
  // ============================================================

  if (
    includesAny(q, [
      "abinash nickname",
      "nickname",
      "homename",
      "nickname of abinash",
      "what is his nickname",
      "what's his nickname",
    ])
  ) {
    return `Abinash's nickname is ${nickname}.`;
  }

  if (
    includesAny(q, [
      "full name",
      "fullname",
      "full name of avi",
      "fullname of avi",
      "owner",
      "who is avi",
    ])
  ) {
    return `Abinash's full name is ${name}.`;
  }

  // ============================================================
  // ABOUT
  // ============================================================

  if (
    includesAny(q, [
      "who is abhi",
      "who is abinash",
      "about abhi",
      "about abinash",
      "tell me about abhi",
      "tell me about abinash",
    ])
  ) {
    return assistantProfile.summary;
  }

  // ============================================================
  // CONTACT - ALL
  // ============================================================

  if (
    includesAny(q, [
      "all contact",
      "all contacts",
      "contact details",
      "contact information",
      "how can i contact abhi",
      "how to contact abhi",
      "contact abhi",
      "reach abhi",
      "connect with abhi",
      "how can i reach abinash",
    ])
  ) {
    return [
      "📬 Contact Information",
      "",
      `📧 Email: ${contact.email}`,
      `📱 Phone: ${contact.phone}`,
      `🐙 GitHub: ${contact.github}`,
      `💼 LinkedIn: ${contact.linkedin}`,
      `🐦 X/Twitter: ${contact.twitter}`,
      `📸 Instagram: ${contact.instagram}`,
    ].join("\n");
  }

  // ============================================================
  // CONTACT - SPECIFIC
  // ============================================================

  if (
    includesAny(q, [
      "contact number",
      "phone number",
      "mobile number",
      "phone",
      "mobile",
    ])
  ) {
    return `Abhi's contact number is ${contact.phone}.`;
  }

  if (includesAny(q, ["email", "mail", "email address"])) {
    return `📧 Abhi's email is ${contact.email}`;
  }

  if (q.includes("github")) {
    return `🐙 GitHub: ${contact.github}`;
  }

  if (q.includes("linkedin")) {
    return `💼 LinkedIn: ${contact.linkedin}`;
  }

  if (includesAny(q, ["instagram", "insta"])) {
    return `📸 Instagram: ${contact.instagram}`;
  }

  if (includesAny(q, ["twitter", "x profile", "twitter profile"])) {
    return `🐦 X/Twitter: ${contact.twitter}`;
  }

  // ============================================================
  // NAVIGATION
  // ============================================================

  if (
    includesAny(q, [
      "project section",
      "projects section",
      "go to projects",
      "open projects",
      "show projects",
    ])
  ) {
    return "#project";
  }

  if (includesAny(q, ["contact section", "go to contact", "open contact"])) {
    return "#contact";
  }

  if (includesAny(q, ["skills section", "go to skills", "open skills"])) {
    return "#skill";
  }

  if (
    includesAny(q, [
      "about section",
      "go to about",
      "open about",
      "about section",
    ])
  ) {
    return "#about";
  }

  // ============================================================
  // PROJECT COUNT
  // ============================================================

  if (
    includesAny(q, [
      "how many projects",
      "total projects",
      "project count",
      "number of projects",
    ])
  ) {
    return `Abhi currently has ${PROJECTS.length} projects in his portfolio.`;
  }

  // ============================================================
  // TOP / FEATURED PROJECTS
  // ============================================================

  if (
    includesAny(q, [
      "top projects",
      "best projects",
      "featured projects",
      "top 3 projects",
      "best 3 projects",
    ])
  ) {
    const topProjects = PROJECTS.filter((project) => project.featured).slice(
      0,
      3,
    );

    const projects =
      topProjects.length > 0 ? topProjects : PROJECTS.slice(0, 3);

    return [
      "🏆 Abhi's Top Projects",
      "",
      ...projects.map(
        (project, index) => `${index + 1}. ${getProjectName(project)}`,
      ),
    ].join("\n");
  }

  // ============================================================
  // ALL PROJECTS
  // ============================================================

  if (
    includesAny(q, [
      "show all projects",
      "list projects",
      "all projects",
      "projects",
      "portfolio projects",
    ])
  ) {
    return [
      "🚀 Abhi's Projects",
      "",
      ...PROJECTS.map(
        (project, index) => `${index + 1}. ${getProjectName(project)}`,
      ),
    ].join("\n");
  }

  // ============================================================
  // SPECIFIC PROJECT
  // ============================================================

  const project = PROJECTS.find((item) => {
    const title = getProjectName(item).toLowerCase();
    const slug = item.slug?.toLowerCase() || "";

    return (
      q.includes(title) ||
      title.includes(q) ||
      (slug && q.includes(slug)) ||
      (slug && slug.includes(q))
    );
  });

  if (project) {
    const tech = getProjectTech(project);

    return [
      `🚀 ${getProjectName(project)}`,
      "",
      getProjectDescription(project),
      "",
      tech.length ? `🛠 Technologies: ${tech.join(", ")}` : "",
      "",
      `🌐 Live Demo: ${getProjectLiveUrl(project)}`,
      `🐙 GitHub: ${getProjectGithubUrl(project)}`,
    ]
      .filter(Boolean)
      .join("\n");
  }

  // ============================================================
  // EDUCATION - BTECH
  // ============================================================

  if (
    includesAny(q, [
      "btech",
      "b.tech",
      "college",
      "degree",
      "current education",
      "current study",
    ])
  ) {
    const current = education.current;

    return [
      "🎓 Current Education",
      "",
      `Degree: ${current.degree}`,
      `College: ${current.college}`,
      `Location: ${current.location}`,
      `Duration: ${current.duration}`,
      `Status: ${current.status}`,
      `CGPA: ${current.grade}`,
      `Semester: ${current.semester}`,
    ].join("\n");
  }

  // ============================================================
  // HIGHER SECONDARY
  // ============================================================

  if (
    includesAny(q, [
      "plus 2",
      "+2",
      "plus2",
      "higher secondary",
      "higher-secondary",
      "12th",
      "12th class",
    ])
  ) {
    const data = education.higher_secondary;

    return [
      "📚 Higher Secondary Education",
      "",
      `Degree: ${data.degree}`,
      `Institution: ${data.institution}`,
      `Location: ${data.location}`,
      `Stream: ${data.stream}`,
      `Duration: ${data.duration}`,
      `Percentage: ${data.percentage}`,
    ].join("\n");
  }

  // ============================================================
  // SECONDARY
  // ============================================================

  if (
    includesAny(q, [
      "10th",
      "10th class",
      "secondary",
      "school",
      "matriculation",
    ])
  ) {
    const data = education.secondary;

    return [
      "🏫 Secondary Education",
      "",
      `Degree: ${data.degree}`,
      `School: ${data.institution}`,
      `Location: ${data.location}`,
      `Duration: ${data.duration}`,
      `Percentage: ${data.percentage}`,
    ].join("\n");
  }

  // ============================================================
  // ALL EDUCATION
  // ============================================================

  if (
    includesAny(q, [
      "education",
      "educational background",
      "academic background",
      "studies",
    ])
  ) {
    return [
      "🎓 Abhi's Education",
      "",
      `1. ${education.current.degree}`,
      `   ${education.current.college}`,
      `   ${education.current.duration}`,
      `   ${education.current.grade}`,
      "",
      `2. ${education.higher_secondary.degree}`,
      `   ${education.higher_secondary.institution}`,
      `   ${education.higher_secondary.percentage}`,
      "",
      `3. ${education.secondary.degree}`,
      `   ${education.secondary.institution}`,
      `   ${education.secondary.percentage}`,
    ].join("\n");
  }

  // ============================================================
  // SKILLS / TECH STACK
  // ============================================================

  if (
    includesAny(q, [
      "skills",
      "skill",
      "tech stack",
      "technologies",
      "technology",
      "stack",
      "what can abhi do",
      "what technologies",
    ])
  ) {
    return [
      "⚡ Abhi's Tech Stack",
      "",
      `Frontend: ${skills.frontend.join(", ")}`,
      "",
      `Backend: ${skills.backend.join(", ")}`,
      "",
      `Database: ${skills.database.join(", ")}`,
      "",
      `Tools: ${skills.tools.join(", ")}`,
    ].join("\n");
  }

  // ============================================================
  // FRONTEND
  // ============================================================

  if (includesAny(q, ["frontend", "front end", "frontend skills"])) {
    return `🎨 Frontend: ${skills.frontend.join(", ")}`;
  }

  // ============================================================
  // BACKEND
  // ============================================================

  if (includesAny(q, ["backend", "back end", "backend skills"])) {
    return `🛠 Backend: ${skills.backend.join(", ")}`;
  }

  // ============================================================
  // DATABASE
  // ============================================================

  if (includesAny(q, ["database", "databases", "db"])) {
    return `🗄 Database: ${skills.database.join(", ")}`;
  }

  // ============================================================
  // ROLE
  // ============================================================

  if (
    includesAny(q, [
      "role",
      "job role",
      "profession",
      "what does abinash do",
      "what does abhi do",
    ])
  ) {
    return `Abhi is a ${assistantProfile.role}.`;
  }

  // ============================================================
  // INTERESTS
  // ============================================================

  if (
    includesAny(q, [
      "interests",
      "interest",
      "passion",
      "likes",
      "ai",
      "open source",
    ])
  ) {
    return [
      "💡 Abhi's Interests",
      "",
      ...assistantProfile.interests.map((interest) => `• ${interest}`),
    ].join("\n");
  }

  // ============================================================
  // LOCATION
  // ============================================================

  if (
    includesAny(q, [
      "where is abhi",
      "where does abhi live",
      "location",
      "where is abinash",
    ])
  ) {
    return `📍 Abhi is from ${assistantProfile.location.city}, ${assistantProfile.location.state}, ${assistantProfile.location.country}.`;
  }

  // ============================================================
  // GENERIC CONTACT
  // ============================================================

  if (includesAny(q, ["contact", "connect", "reach", "hire"])) {
    return [
      "📬 Contact Abhi",
      "",
      `📧 ${contact.email}`,
      `📱 ${contact.phone}`,
      `🐙 ${contact.github}`,
      `💼 ${contact.linkedin}`,
    ].join("\n");
  }

  // ============================================================
  // DEFAULT
  // ============================================================

  return [
    "I'm Aster, Abhi's portfolio assistant.",
    "",
    "I can help you with:",
    "• Projects",
    "• Skills & tech stack",
    "• Education",
    "• About Abhi",
    "• Contact details",
    "• GitHub & LinkedIn",
    "",
    "Try asking: “Show me Abhi's projects.”",
  ].join("\n");
}
