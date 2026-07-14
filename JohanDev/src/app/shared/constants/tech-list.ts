export interface TechItem {
  name: string;
  icon: string;
  color: string;
}

export const TECH_MASTER_LIST: TechItem[] = [
  { name: 'Angular', icon: 'fab fa-angular', color: '#dd0031' },
  { name: 'React', icon: 'fab fa-react', color: '#61dafb' },
  { name: 'Vue', icon: 'fab fa-vuejs', color: '#42b883' },
  { name: 'Node.js', icon: 'fab fa-node-js', color: '#339933' },
  { name: 'TypeScript', icon: 'fas fa-code', color: '#3178c6' },
  { name: 'JavaScript', icon: 'fab fa-js', color: '#f7df1e' },
  { name: 'PHP', icon: 'fab fa-php', color: '#777bb4' },
  { name: 'Laravel', icon: 'fab fa-laravel', color: '#ff2d20' },
  { name: 'Python', icon: 'fab fa-python', color: '#3776ab' },
  { name: 'Django', icon: 'fas fa-leaf', color: '#092e20' },
  { name: 'C#', icon: 'fas fa-hashtag', color: '#239120' },
  { name: '.NET Core', icon: 'fas fa-cube', color: '#512bd4' },
  { name: 'MySQL', icon: 'fas fa-database', color: '#4479a1' },
  { name: 'PostgreSQL', icon: 'fas fa-database', color: '#4169e1' },
  { name: 'MongoDB', icon: 'fas fa-leaf', color: '#47a248' },
  { name: 'Figma', icon: 'fab fa-figma', color: '#f24e1e' },
  { name: 'Docker', icon: 'fab fa-docker', color: '#2496ed' },
  { name: 'AWS', icon: 'fab fa-aws', color: '#ff9900' },
  { name: 'Android / Java', icon: 'fab fa-android', color: '#3ddc84' },
  { name: 'Flutter', icon: 'fas fa-mobile-screen-button', color: '#02569b' },
  { name: 'Firebase', icon: 'fas fa-fire', color: '#ffca28' },
  { name: 'Git / GitHub', icon: 'fab fa-github', color: '#ffffff' }
];

export function getTechIcon(techName: string): string {
  const match = TECH_MASTER_LIST.find(t => t.name.toLowerCase() === techName.toLowerCase());
  return match ? match.icon : 'fas fa-microchip';
}

export function getTechColor(techName: string): string {
  const match = TECH_MASTER_LIST.find(t => t.name.toLowerCase() === techName.toLowerCase());
  return match ? match.color : 'rgba(255,255,255,0.6)';
}
