export const SKILL_CATEGORIES = [
  "Frontend",
  "Backend",
  "Database",
  "DevOps & Tools",
  "Networking",
  "Other",
]

export const SKILL_CATALOG = [
  // Frontend
  { id: "react", name: "React", icon: "SiReact", pack: "si", color: "#61DAFB", category: "Frontend" },
  { id: "javascript", name: "JavaScript", icon: "SiJavascript", pack: "si", color: "#F7DF1E", category: "Frontend" },
  { id: "typescript", name: "TypeScript", icon: "SiTypescript", pack: "si", color: "#3178C6", category: "Frontend" },
  { id: "html5", name: "HTML5", icon: "SiHtml5", pack: "si", color: "#E34F26", category: "Frontend" },
  { id: "css3", name: "CSS3", icon: "SiCss", pack: "si", color: "#1572B6", category: "Frontend" },
  { id: "tailwindcss", name: "Tailwind CSS", icon: "SiTailwindcss", pack: "si", color: "#06B6D4", category: "Frontend" },
  { id: "bootstrap", name: "Bootstrap", icon: "SiBootstrap", pack: "si", color: "#7952B3", category: "Frontend" },
  { id: "vuejs", name: "Vue.js", icon: "SiVuedotjs", pack: "si", color: "#4FC08D", category: "Frontend" },
  { id: "nextjs", name: "Next.js", icon: "SiNextdotjs", pack: "si", color: "#FFFFFF", category: "Frontend" },
  { id: "vite", name: "Vite", icon: "SiVite", pack: "si", color: "#646CFF", category: "Frontend" },

  // Backend
  { id: "nodejs", name: "Node.js", icon: "SiNodedotjs", pack: "si", color: "#339933", category: "Backend" },
  { id: "express", name: "Express.js", icon: "SiExpress", pack: "si", color: "#FFFFFF", category: "Backend" },
  { id: "python", name: "Python", icon: "SiPython", pack: "si", color: "#3776AB", category: "Backend" },
  { id: "php", name: "PHP", icon: "SiPhp", pack: "si", color: "#777BB4", category: "Backend" },
  { id: "laravel", name: "Laravel", icon: "SiLaravel", pack: "si", color: "#FF2D20", category: "Backend" },
  { id: "java", name: "Java", icon: "FaJava", pack: "fa", color: "#007396", category: "Backend" },
  { id: "csharp", name: "C#", icon: "SiSharp", pack: "si", color: "#512BD4", category: "Backend" },
  { id: "dotnet", name: ".NET", icon: "SiDotnet", pack: "si", color: "#512BD4", category: "Backend" },
  { id: "cplusplus", name: "C++", icon: "SiCplusplus", pack: "si", color: "#00599C", category: "Backend" },
  { id: "go", name: "Go", icon: "SiGo", pack: "si", color: "#00ADD8", category: "Backend" },

  // Database
  { id: "mysql", name: "MySQL", icon: "SiMysql", pack: "si", color: "#4479A1", category: "Database" },
  { id: "postgresql", name: "PostgreSQL", icon: "SiPostgresql", pack: "si", color: "#4169E1", category: "Database" },
  { id: "mongodb", name: "MongoDB", icon: "SiMongodb", pack: "si", color: "#47A248", category: "Database" },
  { id: "redis", name: "Redis", icon: "SiRedis", pack: "si", color: "#DC382D", category: "Database" },
  { id: "firebase", name: "Firebase", icon: "SiFirebase", pack: "si", color: "#FFCA28", category: "Database" },
  { id: "supabase", name: "Supabase", icon: "SiSupabase", pack: "si", color: "#3FCF8E", category: "Database" },
  { id: "phpmyadmin", name: "phpMyAdmin", icon: "SiPhpmyadmin", pack: "si", color: "#F29111", category: "Database" },

  // DevOps & Tools
  { id: "git", name: "Git", icon: "SiGit", pack: "si", color: "#F05032", category: "DevOps & Tools" },
  { id: "github", name: "GitHub", icon: "SiGithub", pack: "si", color: "#FFFFFF", category: "DevOps & Tools" },
  { id: "gitlab", name: "GitLab", icon: "SiGitlab", pack: "si", color: "#FC6D26", category: "DevOps & Tools" },
  { id: "docker", name: "Docker", icon: "SiDocker", pack: "si", color: "#2496ED", category: "DevOps & Tools" },
  { id: "linux", name: "Linux", icon: "SiLinux", pack: "si", color: "#FCC624", category: "DevOps & Tools" },
  { id: "npm", name: "npm", icon: "SiNpm", pack: "si", color: "#CB3837", category: "DevOps & Tools" },
  { id: "postman", name: "Postman", icon: "SiPostman", pack: "si", color: "#FF6C37", category: "DevOps & Tools" },
  { id: "figma", name: "Figma", icon: "SiFigma", pack: "si", color: "#F24E1E", category: "DevOps & Tools" },
  { id: "wampserver", name: "WAMP Server", icon: "SiApache", pack: "si", color: "#DC283A", category: "DevOps & Tools" },
  { id: "xampp", name: "XAMPP", icon: "SiXampp", pack: "si", color: "#FB7A24", category: "DevOps & Tools" },
  { id: "apache", name: "Apache", icon: "SiApache", pack: "si", color: "#D22128", category: "DevOps & Tools" },

  // Networking
  { id: "cisco", name: "Cisco", icon: "SiCisco", pack: "si", color: "#1BA0D7", category: "Networking" },
  { id: "wireshark", name: "Wireshark", icon: "SiWireshark", pack: "si", color: "#1679A7", category: "Networking" },
  { id: "openvpn", name: "OpenVPN", icon: "SiOpenvpn", pack: "si", color: "#EA7E20", category: "Networking" },

  // Other
  { id: "graphql", name: "GraphQL", icon: "SiGraphql", pack: "si", color: "#E10098", category: "Other" },
  { id: "kubernetes", name: "Kubernetes", icon: "SiKubernetes", pack: "si", color: "#326CE5", category: "Other" },
  { id: "aws", name: "AWS", icon: "FaAws", pack: "fa", color: "#FF9900", category: "Other" },
]

const catalogById = new Map(SKILL_CATALOG.map((skill) => [skill.id, skill]))

export const getSkillById = (skillId) => catalogById.get(skillId)

export const getSkillsByCategory = (category) =>
  SKILL_CATALOG.filter((skill) => skill.category === category)

const NAME_ALIASES = {
  react: ["react", "react.js", "reactjs"],
  javascript: ["javascript", "js", "java script"],
  typescript: ["typescript", "ts"],
  html5: ["html", "html5"],
  css3: ["css", "css3"],
  nodejs: ["node", "nodejs", "node.js"],
  python: ["python"],
  php: ["php"],
  mysql: ["mysql"],
  mongodb: ["mongo", "mongodb"],
  git: ["git"],
  wampserver: ["wamp", "wampserver", "wamp server"],
  xampp: ["xampp"],
  cisco: ["cisco"],
  java: ["java"],
  laravel: ["laravel"],
  tailwindcss: ["tailwind", "tailwind css", "tailwindcss"],
  bootstrap: ["bootstrap"],
  vuejs: ["vue", "vue.js", "vuejs"],
  nextjs: ["next", "next.js", "nextjs"],
  docker: ["docker"],
  linux: ["linux"],
  postgresql: ["postgres", "postgresql"],
  express: ["express", "express.js"],
  csharp: ["c#", "csharp", "c sharp"],
  dotnet: [".net", "dotnet", "dot net"],
  cplusplus: ["c++", "cplusplus"],
}

export const findCatalogIdByName = (name = "") => {
  const normalized = name.toLowerCase().trim().replace(/\s+/g, " ")

  const direct = SKILL_CATALOG.find(
    (skill) =>
      skill.id === normalized ||
      skill.name.toLowerCase() === normalized
  )
  if (direct) return direct.id

  for (const [id, aliases] of Object.entries(NAME_ALIASES)) {
    if (aliases.some((alias) => normalized.includes(alias) || alias.includes(normalized))) {
      return id
    }
  }

  return null
}

export const migrateSkills = (skills) => {
  if (!Array.isArray(skills) || skills.length === 0) return []

  if (typeof skills[0] === "string") {
    return [...new Set(skills.filter((id) => catalogById.has(id)))]
  }

  const migrated = skills
    .map((skill) => {
      if (typeof skill === "string") return skill
      if (skill.skillId && catalogById.has(skill.skillId)) return skill.skillId
      return findCatalogIdByName(skill.name)
    })
    .filter(Boolean)

  return [...new Set(migrated)]
}

export const resolveSelectedSkills = (skills = []) =>
  migrateSkills(skills)
    .map((skillId) => getSkillById(skillId))
    .filter(Boolean)
