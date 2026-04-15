export type Skill = {
  name: string;
  icon: string;
  color: string;
  description: string;
};

export type ProjectImage = string | { src: string; type: 'web' | 'mobile' };

export type Project = {
  name: string;
  logo: string;
  alt: string;
  role: string;
  description: string;
  repoUrl: string;
  technologies: string[];
  images: ProjectImage[];
};

export type EducationItem = {
  school: string;
  logo: string;
  logoAlt: string;
  status: 'Completed' | 'Current';
  degree: string;
  years: string;
  highlights: string[];
};

export type ContactLink = {
  href: string;
  label: string;
  kind: 'email' | 'github' | 'linkedin';
};

export const skills: Skill[] = [
  { name: 'MySQL', icon: '/mysql.svg', color: '#0051ff', description: 'Relational Database' },
  { name: 'MongoDB', icon: '/devicons/mongodb-original.svg', color: '#25ff29bb', description: 'NoSQL Goat' },
  { name: 'Rust', icon: '/Rust.png', color: '#dea584', description: 'C++ doppelganger' },
  { name: 'JavaScript', icon: '/devicons/javascript-original.svg', color: '#b8ac54af', description: 'Web Scripting' },
  { name: 'TypeScript', icon: '/devicons/typescript-original.svg', color: '#3178C6', description: 'JavaScript Plus' },
  { name: 'Node.js', icon: '/devicons/nodejs-original.svg', color: '#37dc31b5', description: 'JavaScript Runtime' },
  { name: 'Express', icon: '/devicons/express-original.svg', color: '#ffffff', description: 'Node.js Framework' },
  { name: 'PHP', icon: '/devicons/php-original.svg', color: '#3843debb', description: 'Old but Gold' },
  { name: 'Laravel', icon: '/Laravel.svg', color: '#FF2D20', description: 'PHP Framework' },
  { name: 'Docker', icon: '/devicons/docker-original.svg', color: '#0091ff', description: 'Containerization' },
  { name: 'GitHub', icon: '/github-white-icon.svg', color: '#ffffffa3', description: 'Version Control' },
  { name: 'Linux', icon: '/devicons/linux-original.svg', color: '#968b0d', description: 'Operating System' },
];

export const skillIconMap = Object.fromEntries(
  skills.map((skill) => [skill.name.toLowerCase(), skill.icon]),
) as Record<string, string>;

export const educationItems: EducationItem[] = [
  {
    school: 'Bugallon Integrated School',
    logo: '/BIS_Logo.png',
    logoAlt: 'High School logo',
    status: 'Completed',
    degree: 'Junior & Senior High School',
    years: '2016 - 2022',
    highlights: ['Honor Student, 2016-2022'],
  },
  {
    school: 'University of Pangasinan',
    logo: '/UPANG_Logo.png',
    logoAlt: 'University logo',
    status: 'Current',
    degree: 'Bachelor of Science in Information Technology',
    years: '2024 - 2027',
    highlights: ['Backend Development', 'Computer Forensics & Data Recovery', 'Ethical Hacking'],
  },
];

export const aboutSections = [
  {
    title: 'Who am I:',
    body: 'A 22 years old 3rd year BSIT student at the University of Pangasinan who likes messing around with technology.',
  },
  {
    title: 'What I do:',
    body: 'Build secure, scalable backend systems with Node.js, Express, MongoDB, Laravel, MySQL, and RESTful APIs. I also perform Data Recovery and Computer Forensics as well as run my homelab for threat analysis and detection.',
  },
  {
    title: "What I'm currently learning:",
    body: 'CI/CD Pipelines, Postgres, and Redis.',
  },
  {
    title: 'My goal:',
    body: 'Climb my way up as a Cybersecurity expert and Backend Engineer as well as work with law enforcements and security agencies in combating cyber threats.',
  },
] as const;

export const featuredProjects: Project[] = [
  {
    name: 'RoomFinder',
    logo: '/roomfinder/roomfinder_logo.png',
    alt: 'RoomFinder Screenshot',
    role: 'Backend Developer',
    description: 'A mobile and web platform for room booking and management system for University of Pangasinan.',
    repoUrl: 'https://github.com/Sucrit/RoomFinder_API',
    technologies: ['JavaScript', 'PHP', 'MySQL'],
    images: [
      { src: '/roomfinder/mobile1.png', type: 'mobile' },
      { src: '/roomfinder/mobile2.png', type: 'mobile' },
      '/roomfinder/ss1.png',
      '/roomfinder/ss2.png',
      '/roomfinder/ss3.png',
    ],
  },
  {
    name: 'EvacuDesk',
    logo: '/evacudesk/evacudesk_logo.png',
    alt: 'EvacuDesk Screenshot',
    role: 'Backend Developer',
    description: 'An evacuation center management system designed for CDRRMO in Dagupan, Philippines.',
    repoUrl: 'https://github.com/endevium/EvacuDesk/tree/backend/UpdatedAPI2',
    technologies: ['Node.js', 'Express', 'MongoDB'],
    images: [
      '/evacudesk/adl.png',
      '/evacudesk/evacudesk.png',
      '/evacudesk/web1.png',
      '/evacudesk/ss2.png',
      '/evacudesk/ss3.png',
    ],
  },
];

export const contactLinks: ContactLink[] = [
  {
    href: 'https://mail.google.com/mail/?view=cm&to=oliver9284928@gmail.com',
    label: 'Compose Email',
    kind: 'email',
  },
  {
    href: 'https://github.com/Sucrit',
    label: 'GitHub',
    kind: 'github',
  },
  {
    href: 'https://ph.linkedin.com/in/oliver-ondoy-3206052a1',
    label: 'LinkedIn',
    kind: 'linkedin',
  },
];

export const heroIntro =
  "I'm a 3rd-year BSIT student specialized in cybersecurity and backend development using Node.js, Express and MongoDB and also have experience with PHP and MySQL.";

export const loadingPhrases = [
  'Gathering the stars...',
  'Building pixels...',
  'Summoning the moon...',
  'Building the lighthouse...',
  'Constructing the horizon...',
  'Planting the trees...',
  'Brewing your coffee...',
] as const;

export const preloadAssets = [
  '/png1.png',
  '/BIS_Logo.png',
  '/UPANG_Logo.png',
  '/mysql.svg',
  '/Rust.png',
  '/Laravel.svg',
  '/github-white-icon.svg',
  '/Flag_of_the_Philippines.svg',
  '/roomfinder/roomfinder_logo.png',
  '/evacudesk/evacudesk_logo.png',
  '/roomfinder/mobile1.png',
  '/roomfinder/mobile2.png',
  '/roomfinder/ss1.png',
  '/roomfinder/ss2.png',
  '/roomfinder/ss3.png',
  '/evacudesk/adl.png',
  '/evacudesk/evacudesk.png',
  '/evacudesk/web1.png',
  '/evacudesk/ss2.png',
  '/evacudesk/ss3.png',
  '/devicons/mongodb-original.svg',
  '/devicons/javascript-original.svg',
  '/devicons/typescript-original.svg',
  '/devicons/nodejs-original.svg',
  '/devicons/express-original.svg',
  '/devicons/php-original.svg',
  '/devicons/docker-original.svg',
  '/devicons/linux-original.svg',
] as const;
