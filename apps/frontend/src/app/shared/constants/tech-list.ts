export interface TechItem {
  name: string;
  icon: string;
  color: string;
}

export const TECH_MASTER_LIST: TechItem[] = [

  // Frontend
  { name: 'HTML5', icon: 'fab fa-html5', color: '#e34f26' },
  { name: 'CSS3', icon: 'fab fa-css3-alt', color: '#1572b6' },
  { name: 'Sass', icon: 'fab fa-sass', color: '#cc6699' },
  { name: 'Tailwind CSS', icon: 'fas fa-wind', color: '#06b6d4' },
  { name: 'Bootstrap', icon: 'fab fa-bootstrap', color: '#7952b3' },
  { name: 'Material UI', icon: 'fas fa-palette', color: '#007fff' },
  { name: 'Angular', icon: 'fab fa-angular', color: '#dd0031' },
  { name: 'React', icon: 'fab fa-react', color: '#61dafb' },
  { name: 'Vue.js', icon: 'fab fa-vuejs', color: '#42b883' },
  { name: 'Nuxt.js', icon: 'fas fa-layer-group', color: '#00dc82' },
  { name: 'Next.js', icon: 'fas fa-forward', color: 'currentColor' },
  { name: 'Svelte', icon: 'fas fa-fire', color: '#ff3e00' },
  { name: 'Astro', icon: 'fas fa-star', color: '#ff5d01' },
  { name: 'Vite', icon: 'fas fa-bolt', color: '#646cff' },
  { name: 'Webpack', icon: 'fas fa-cube', color: '#8dd6f9' },

  // Lenguajes
  { name: 'JavaScript', icon: 'fab fa-js', color: '#f7df1e' },
  { name: 'TypeScript', icon: 'fas fa-code', color: '#3178c6' },
  { name: 'Python', icon: 'fab fa-python', color: '#3776ab' },
  { name: 'Java', icon: 'fab fa-java', color: '#f89820' },
  { name: 'C#', icon: 'fas fa-hashtag', color: '#239120' },
  { name: 'C++', icon: 'fas fa-code', color: '#00599c' },
  { name: 'C', icon: 'fas fa-code', color: '#a8b9cc' },
  { name: 'PHP', icon: 'fab fa-php', color: '#777bb4' },
  { name: 'Go', icon: 'fas fa-code', color: '#00add8' },
  { name: 'Rust', icon: 'fas fa-gear', color: '#ce422b' },
  { name: 'Kotlin', icon: 'fas fa-mobile-alt', color: '#7f52ff' },
  { name: 'Swift', icon: 'fab fa-apple', color: '#fa7343' },
  { name: 'Dart', icon: 'fas fa-code', color: '#0175c2' },

  // Backend
  { name: 'Node.js', icon: 'fab fa-node-js', color: '#339933' },
  { name: 'Express', icon: 'fas fa-server', color: 'currentColor' },
  { name: 'Express.js', icon: 'fas fa-server', color: 'currentColor' },
  { name: 'NestJS', icon: 'fas fa-project-diagram', color: '#e0234e' },
  { name: 'Laravel', icon: 'fab fa-laravel', color: '#ff2d20' },
  { name: 'Django', icon: 'fas fa-leaf', color: '#092e20' },
  { name: 'FastAPI', icon: 'fas fa-bolt', color: '#009688' },
  { name: '.NET', icon: 'fas fa-cube', color: '#512bd4' },
  { name: 'ASP.NET Core', icon: 'fas fa-cube', color: '#512bd4' },
  { name: 'Spring Boot', icon: 'fas fa-leaf', color: '#6db33f' },

  // Bases de datos
  { name: 'MySQL', icon: 'fas fa-database', color: '#4479a1' },
  { name: 'PostgreSQL', icon: 'fas fa-database', color: '#4169e1' },
  { name: 'MariaDB', icon: 'fas fa-database', color: '#003545' },
  { name: 'MongoDB', icon: 'fas fa-leaf', color: '#47a248' },
  { name: 'SQLite', icon: 'fas fa-database', color: '#003b57' },
  { name: 'SQL Server', icon: 'fas fa-database', color: '#cc2927' },
  { name: 'Redis', icon: 'fas fa-memory', color: '#dc382d' },
  { name: 'Firebase', icon: 'fas fa-fire', color: '#ffca28' },
  { name: 'Supabase', icon: 'fas fa-database', color: '#3ecf8e' },

  // ORM
  { name: 'Prisma', icon: 'fas fa-gem', color: '#2d3748' },
  { name: 'TypeORM', icon: 'fas fa-project-diagram', color: '#fe0902' },
  { name: 'Entity Framework', icon: 'fas fa-table', color: '#512bd4' },
  { name: 'Sequelize', icon: 'fas fa-network-wired', color: '#52b0e7' },

  // Mobile
  { name: 'Android', icon: 'fab fa-android', color: '#3ddc84' },
  { name: 'React Native', icon: 'fab fa-react', color: '#61dafb' },
  { name: 'Expo', icon: 'fas fa-mobile-screen-button', color: 'currentColor' },
  { name: 'Flutter', icon: 'fas fa-mobile-screen-button', color: '#02569b' },
  { name: 'Ionic', icon: 'fas fa-mobile-alt', color: '#3880ff' },

  // Cloud / DevOps
  { name: 'Docker', icon: 'fab fa-docker', color: '#2496ed' },
  { name: 'Kubernetes', icon: 'fas fa-dharmachakra', color: '#326ce5' },
  { name: 'AWS', icon: 'fab fa-aws', color: '#ff9900' },
  { name: 'Azure', icon: 'fab fa-microsoft', color: '#0078d4' },
  { name: 'Google Cloud', icon: 'fab fa-google', color: '#4285f4' },
  { name: 'Vercel', icon: 'fas fa-caret-up', color: 'currentColor' },
  { name: 'Netlify', icon: 'fas fa-globe', color: '#00c7b7' },
  { name: 'Railway', icon: 'fas fa-train', color: '#7b3ff2' },
  { name: 'GitHub Actions', icon: 'fab fa-github', color: '#2088ff' },
  { name: 'Nginx', icon: 'fas fa-server', color: '#009639' },

  // Testing
  { name: 'Jest', icon: 'fas fa-vial', color: '#c21325' },
  { name: 'Vitest', icon: 'fas fa-vial', color: '#6e9f18' },
  { name: 'Cypress', icon: 'fas fa-check-circle', color: '#69d3a7' },
  { name: 'Playwright', icon: 'fas fa-mouse-pointer', color: '#45ba63' },
  { name: 'Postman', icon: 'fas fa-paper-plane', color: '#ff6c37' },
  { name: 'Swagger', icon: 'fas fa-book', color: '#85ea2d' },

  // IA / Ciencia de datos
  { name: 'TensorFlow', icon: 'fas fa-brain', color: '#ff6f00' },
  { name: 'PyTorch', icon: 'fas fa-fire', color: '#ee4c2c' },
  { name: 'OpenCV', icon: 'fas fa-eye', color: '#5c3ee8' },
  { name: 'Pandas', icon: 'fas fa-table', color: '#150458' },
  { name: 'NumPy', icon: 'fas fa-square-root-alt', color: '#013243' },
  { name: 'Scikit-learn', icon: 'fas fa-chart-line', color: '#f7931e' },

  // Diseño
  { name: 'Figma', icon: 'fab fa-figma', color: '#f24e1e' },
  { name: 'Adobe XD', icon: 'fas fa-pen-ruler', color: '#ff61f6' },
  { name: 'Photoshop', icon: 'fas fa-image', color: '#31a8ff' },

  // Herramientas
  { name: 'Git', icon: 'fab fa-git-alt', color: '#f05032' },
  { name: 'GitHub', icon: 'fab fa-github', color: 'currentColor' },
  { name: 'GitLab', icon: 'fab fa-gitlab', color: '#fc6d26' },
  { name: 'Linux', icon: 'fab fa-linux', color: '#fcc624' },
  { name: 'Bash', icon: 'fas fa-terminal', color: '#4eaa25' },
  { name: 'VS Code', icon: 'fas fa-code', color: '#007acc' },

  // Redes & Seguridad
  { name: 'Network Troubleshooting', icon: 'fas fa-network-wired', color: '#00bceb' },
  { name: 'Documentation', icon: 'fas fa-book', color: '#f59e0b' },
  { name: 'Endpoint Devices', icon: 'fas fa-desktop', color: '#6366f1' },
  { name: 'Help Desk', icon: 'fas fa-headset', color: '#10b981' },
  { name: 'Support', icon: 'fas fa-users-gear', color: '#06b6d4' },
  { name: 'User Support', icon: 'fas fa-user-shield', color: '#3b82f6' },
  { name: 'Cisco', icon: 'fas fa-network-wired', color: '#1ba0d7' },
  { name: 'Redes', icon: 'fas fa-network-wired', color: '#00bceb' },
  { name: 'Seguridad', icon: 'fas fa-shield-alt', color: '#10b981' },
  { name: 'Cybersecurity', icon: 'fas fa-shield-halved', color: '#10b981' },

  // IBM Web Development Competencies
  { name: 'HTML', icon: 'fab fa-html5', color: '#e34f26' },
  { name: 'CSS', icon: 'fab fa-css3-alt', color: '#1572b6' },
  { name: 'IBM', icon: 'fab fa-ibm', color: '#052fad' },
  { name: 'IBM SkillsBuild', icon: 'fab fa-ibm', color: '#052fad' },
  { name: 'Web Development', icon: 'fas fa-globe', color: '#2563eb' },
  { name: 'Web Applications', icon: 'fas fa-window-maximize', color: '#3b82f6' },
  { name: 'Interactive Web Pages', icon: 'fas fa-laptop-code', color: '#14b8a6' },
  { name: 'Client-side programming', icon: 'fas fa-code', color: '#3b82f6' },
  { name: 'API Development', icon: 'fas fa-network-wired', color: '#0284c7' },
  { name: 'REST API', icon: 'fas fa-server', color: '#0ea5e9' },
  { name: 'Attention To Detail', icon: 'fas fa-eye', color: '#3b82f6' },
  { name: 'Critical Thinking', icon: 'fas fa-brain', color: '#8b5cf6' },
  { name: 'Problem Solving', icon: 'fas fa-puzzle-piece', color: '#f59e0b' },
  { name: 'Analytical Thinking', icon: 'fas fa-chart-pie', color: '#6366f1' },
  { name: 'Communication', icon: 'fas fa-comments', color: '#ec4899' },
  { name: 'Career Management', icon: 'fas fa-briefcase', color: '#10b981' },
  { name: 'Research', icon: 'fas fa-magnifying-glass', color: '#06b6d4' },
  { name: 'Learning Agility', icon: 'fas fa-graduation-cap', color: '#eab308' },
  { name: 'Requirement Analysis', icon: 'fas fa-list-check', color: '#64748b' },

  // IoT Competencies
  { name: 'IoT', icon: 'fas fa-microchip', color: '#00bceb' },
  { name: 'Internet Of Things', icon: 'fas fa-wifi', color: '#00bceb' },
  { name: 'Digital Transformation', icon: 'fas fa-network-wired', color: '#6366f1' },
  { name: 'Networking', icon: 'fas fa-network-wired', color: '#00bceb' },
  { name: 'AI/ML', icon: 'fas fa-brain', color: '#ff6f00' }

];

export function getTechIcon(techName: string): string {
  const match = TECH_MASTER_LIST.find(t => t.name.toLowerCase() === techName.toLowerCase());
  return match ? match.icon : 'fas fa-microchip';
}

export function getTechColor(techName: string): string {
  const match = TECH_MASTER_LIST.find(t => t.name.toLowerCase() === techName.toLowerCase());
  return match ? match.color : 'currentColor';
}
