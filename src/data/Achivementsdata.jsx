const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function AwardIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <circle cx="12" cy="8" r="6" />
      <path d="M8.5 13.5 7 22l5-3 5 3-1.5-8.5" />
    </svg>
  );
}

function CloudIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.4-1.5A4.5 4.5 0 0 0 6.5 19h11z" />
    </svg>
  );
}

function CodeIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="m8 8-4 4 4 4" />
      <path d="m16 8 4 4-4 4" />
      <path d="m13 6-2 12" />
    </svg>
  );
}

function LayersIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M12 3 2 8l10 5 10-5-10-5z" />
      <path d="m2 14 10 5 10-5" />
      <path d="m2 11 10 5 10-5" />
    </svg>
  );
}

export function ShieldCheckIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M12 2 4 5v6c0 5 3.4 8.4 8 11 4.6-2.6 8-6 8-11V5l-8-3z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function CalendarIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <rect x="3" y="4.5" width="18" height="16" rx="0" />
      <path d="M3 9.5h18" />
      <path d="M8 2.5v4M16 2.5v4" />
    </svg>
  );
}

export function ArrowUpRightIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

export function ChevronDownIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function BarChartIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M12 20V10" />
      <path d="M18 20V4" />
      <path d="M6 20v-4" />
    </svg>
  );
}

export const achievements = [
  {
    icon: CodeIcon,
    title: "HTML & CSS",
    issuer: "Coursera",
    date: "2023",
    credentialId: "QPPE391TVE82",
    description:
      "Started my web development journey by learning HTML structure, CSS styling, layouts, responsive design, and the fundamentals of building modern web pages.",
    skills: ["HTML", "CSS", "Flexbox", "Responsive Design"],
    link: "https://www.coursera.org/account/accomplishments/records/QPPE391TVE82",
    leftPercent: "58%",
    rotation: 1.5,
  },
  {
    icon: LayersIcon,
    title: "JavaScript",
    issuer: "Namste Javascript",
    date: "2023",
    credentialId: "182FDB6EEDBD768D176968BF84B",
    description:
      "Moved into JavaScript to make websites interactive and learned programming fundamentals, ES6+, functions, arrays, objects, and asynchronous concepts.",
    skills: ["JavaScript", "ES6+", "Arrays", "Async"],
    link: "https://namastedev.com/routabinash3775/certificates/namaste-javascript",
    leftPercent: "8%",
    rotation: -1.5,
  },
  {
    icon: AwardIcon,
    title: "React",
    issuer: "HackerRank",
    date: "2025",
    credentialId: "ae40316006f5",
    description:
      "Started building modern user interfaces with React and learned component-based development, reusable UI, state management, and dynamic web applications.",
    skills: ["React", "JavaScript", "Components", "State"],
    link: "https://www.hackerrank.com/certificates/ae40316006f5",
    leftPercent: "62%",
    rotation: 1.5,
  },
  {
    icon: CloudIcon,
    title: "Backend Development",
    issuer: "IBM",
    date: "2025",
    credentialId: "S59410TBAR9Z",
    description:
      "Expanded into backend development by learning Node.js, Express, MongoDB, REST APIs, and building complete full-stack applications.",
    skills: ["Node.js", "Express", "MongoDB", "REST API"],
    link: "https://www.coursera.org/account/accomplishments/verify/S59410TBAR9Z",
    leftPercent: "12%",
    rotation: -2,
  },
  {
    icon: CodeIcon,
    title: "Java",
    issuer: "HackerRank",
    date: "2026",
    credentialId: "e105fe6beb1c",
    description:
      "Started learning Java to strengthen my programming fundamentals, object-oriented programming, arrays, strings, and problem-solving skills.",
    skills: ["Java", "OOP", "Arrays", "Strings"],
    link: "https://www.hackerrank.com/certificates/e105fe6beb1c",
    leftPercent: "56%",
    rotation: 2,
  },
];

export const stats = [
  { value: 12, suffix: "+", label: "Certificates Verified", icon: AwardIcon },
  { value: 4, suffix: "", label: "Core Specializations", icon: LayersIcon },
  { value: 500, suffix: "+", label: "Hours Documented", icon: CodeIcon },
];
