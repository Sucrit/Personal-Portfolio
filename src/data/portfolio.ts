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
  desktopPreviewMode?: 'fill' | 'framed';
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
  { name: 'MySQL', icon: '/assets/icons/devicons/mysql.svg', color: '#0051ff', description: 'Relational Database' },
  { name: 'PostgreSQL', icon: '/assets/icons/devicons/postgresql.svg', color: '#336791', description: 'Relational Database' },
  { name: 'MongoDB', icon: '/assets/icons/devicons/mongodb-original.svg', color: '#25ff29bb', description: 'NoSQL Goat' },
  { name: 'Mongoose', icon: '/assets/icons/devicons/mongoose.svg', color: '#e63d3d', description: 'MongoDB ODM' },
  { name: 'Rust', icon: '/assets/icons/devicons/rust.png', color: '#dea584', description: 'C++ doppelganger' },
  { name: 'JavaScript', icon: '/assets/icons/devicons/javascript-original.svg', color: '#b8ac54af', description: 'Web Scripting' },
  { name: 'TypeScript', icon: '/assets/icons/devicons/typescript-original.svg', color: '#3178C6', description: 'JavaScript Plus' },
  { name: 'Node.js', icon: '/assets/icons/devicons/nodejs-original.svg', color: '#37dc31b5', description: 'JavaScript Runtime' },
  { name: 'Express', icon: '/assets/icons/devicons/express-original.svg', color: '#ffffffa1', description: 'Node.js Framework' },
  { name: 'Prisma', icon: '/assets/icons/devicons/prisma.svg', color: '#5a67d8', description: 'Database ORM' },
  { name: 'PHP', icon: '/assets/icons/devicons/php-original.svg', color: '#3843debb', description: 'Old but Gold' },
  { name: 'Laravel', icon: '/assets/icons/devicons/laravel.svg', color: '#FF2D20', description: 'PHP Framework' },
  { name: 'Docker', icon: '/assets/icons/devicons/docker-original.svg', color: '#0091ff', description: 'Containerization' },
  { name: 'GitHub', icon: '/assets/icons/brand/github-white.svg', color: '#ffffffa3', description: 'Version Control' },
  { name: 'Linux', icon: '/assets/icons/devicons/linux-original.svg', color: '#968b0d', description: 'Distros & Server' },
];

export const skillIconMap = Object.fromEntries(
  skills.map((skill) => [skill.name.toLowerCase(), skill.icon]),
) as Record<string, string>;

Object.assign(skillIconMap, {
  express: '/assets/icons/devicons/express-original.svg',
  react: '/assets/icons/devicons/react.svg',
  vite: '/assets/icons/devicons/vite.svg',
  postgresql: '/assets/icons/devicons/postgresql.svg',
  prisma: '/assets/icons/devicons/prisma.svg',
  clerk: '/assets/icons/devicons/clerk.svg',
  solidity: '/assets/icons/devicons/solidity.svg',
  ethereum: '/assets/icons/devicons/ethereum.svg',
  ganache: '/assets/icons/devicons/ganache.svg',
  eth: '/assets/icons/devicons/ethereum.svg',
  ethers: '/assets/icons/devicons/ethers.svg',
  'tanstack query': '/assets/icons/devicons/tanstack.png',
});

export const educationItems: EducationItem[] = [
  {
    school: 'Bugallon Integrated School',
    logo: '/assets/education/bis-logo.png',
    logoAlt: 'High School logo',
    status: 'Completed',
    degree: 'Junior & Senior High School',
    years: '2016 - 2022',
    highlights: ['Honor Student, 2016-2022'],
  },
  {
    school: 'University of Pangasinan',
    logo: '/assets/education/upang-logo.png',
    logoAlt: 'University logo',
    status: 'Current',
    degree: 'Bachelor of Science in Information Technology',
    years: '2024 - 2027',
    highlights: ['Backend Development', 'Computer Forensics', 'Ethical Hacking'],
  },
];

export const aboutSections = [
  {
    title: 'Who am I:',
    body: 'A [[22 years old]] [[3rd year BSIT student]] at the [[University of Pangasinan]] who likes messing around with technology.',
  },
  {
    title: 'What I do:',
    body: 'Build [[secure, scalable backend]] systems with [[Node.js]], [[Express]], [[MongoDB]], [[Laravel]], [[MySQL]], and [[RESTful APIs]]. I also perform [[Data Recovery]] and [[Computer Forensics]] as well as run my [[homelab]] for [[threat analysis and detection]].',
  },
  {
    title: "What I'm currently learning:",
    body: '[[CI/CD Pipelines]], and [[Redis]].',
  },
  {
    title: 'My goal:',
    body: 'Climb my way up as a [[Cybersecurity expert]] and [[Backend Engineer]] as well as work with law enforcements and security agencies in combating cyber threats.',
  },
] as const;

export const featuredProjects: Project[] = [
  // {
  //   name: 'SignSight',
  //   logo: '/assets/icons/brand/github-white.svg',
  //   alt: 'SignSight Preview',
  //   role: 'Mobile, ML, and Backend Developer',
  //   description:
  //     'A mobile-first sign recognition platform for real-time camera-based translation, dataset capture, and iterative model improvement.',
  //   repoUrl: 'https://github.com/Sucrit/SignSight',
  //   technologies: ['React Native', 'Expo', 'FastAPI', 'Python'],
  //   images: ['/assets/projects/shared/preview-placeholder.svg'],
  // },
  {
    name: 'Credence',
    logo: '/assets/projects/credence/credence-logo.svg',
    alt: 'Credence Preview',
    role: 'Full Stack Developer',
    description:
      'This platform aims to digitalize student credential issuance, ownership and verification. ',
    repoUrl: 'https://github.com/Sucrit/SACVS',
    technologies: ['React', 'TypeScript', 'Express', 'Prisma', 'PostgreSQL', 'Clerk', 'Solidity', 'ETH', 'Ethers', 'Ganache', 'TanStack Query', 'Vitest', 'Tailwind CSS', 'Truffle', 'Framer Motion'],
    desktopPreviewMode: 'framed',
    images: [
      '/assets/projects/credence/Screenshot_20260416_083457.png',
      '/assets/projects/credence/Screenshot_20260416_083427.png',
      '/assets/projects/credence/Screenshot_20260416_083610.png',
      '/assets/projects/credence/Screenshot_20260416_083800.png',
      '/assets/projects/credence/Screenshot_20260416_083820.png',
      '/assets/projects/credence/Screenshot_20260416_083835.png',
      '/assets/projects/credence/Screenshot_20260416_083847.png',
      '/assets/projects/credence/Screenshot_20260416_083903.png',
      '/assets/projects/credence/Screenshot_20260416_083925.png',
      '/assets/projects/credence/Screenshot_20260416_084023.png',
      '/assets/projects/credence/Screenshot_20260416_084157.png',
      '/assets/projects/credence/Screenshot_20260416_084207.png',
    ],
  },
  {
    name: 'EvacuDesk',
    logo: '/assets/projects/evacudesk/evacudesk_logo.png',
    alt: 'EvacuDesk Screenshot',
    role: 'Backend Developer',
    description: 'An evacuation center management system designed for CDRRMO in Dagupan, Philippines.',
    repoUrl: 'https://github.com/endevium/EvacuDesk/tree/backend/UpdatedAPI2',
    technologies: ['Node.js', 'Express', 'MongoDB', 'Mongoose'],
    images: [
      '/assets/projects/evacudesk/adl.png',
      '/assets/projects/evacudesk/evacudesk.png',
      '/assets/projects/evacudesk/web1.png',
      '/assets/projects/evacudesk/ss2.png',
      '/assets/projects/evacudesk/ss3.png',
    ],
  },
  {
    name: 'RoomFinder',
    logo: '/assets/projects/roomfinder/roomfinder_logo.png',
    alt: 'RoomFinder Screenshot',
    role: 'Backend Developer',
    description: 'A mobile and web platform for room booking and management system for University of Pangasinan.',
    repoUrl: 'https://github.com/Sucrit/RoomFinder_API',
    technologies: ['JavaScript', 'PHP', 'MySQL'],
    images: [
      { src: '/assets/projects/roomfinder/mobile1.png', type: 'mobile' },
      { src: '/assets/projects/roomfinder/mobile2.png', type: 'mobile' },
      '/assets/projects/roomfinder/ss1.png',
      '/assets/projects/roomfinder/ss2.png',
      '/assets/projects/roomfinder/ss3.png',
    ],
  }
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
  '/assets/profile/wave.png',
  '/assets/education/bis-logo.png',
  '/assets/education/upang-logo.png',
  '/assets/skills/mysql.svg',
  '/assets/skills/rust.png',
  '/assets/skills/laravel.svg',
  '/assets/icons/brand/github-white.svg',
  '/assets/flags/philippines.svg',
  '/assets/projects/roomfinder/roomfinder_logo.png',
  '/assets/projects/evacudesk/evacudesk_logo.png',
  '/assets/projects/shared/preview-placeholder.svg',
  '/assets/projects/credence/admin-overview.png',
  '/assets/projects/credence/inst-analytics.png',
  '/assets/projects/credence/inst-issuance.png',
  '/assets/projects/credence/inst-overview.png',
  '/assets/projects/credence/inst-receipt-verification-portal.png',
  '/assets/projects/credence/inst-report-generation.png',
  '/assets/projects/credence/inst-student-cred-details.png',
  '/assets/projects/credence/inst-student-management.png',
  '/assets/projects/credence/student-credentials.png',
  '/assets/projects/roomfinder/mobile1.png',
  '/assets/projects/roomfinder/mobile2.png',
  '/assets/projects/roomfinder/ss1.png',
  '/assets/projects/roomfinder/ss2.png',
  '/assets/projects/roomfinder/ss3.png',
  '/assets/projects/evacudesk/adl.png',
  '/assets/projects/evacudesk/evacudesk.png',
  '/assets/projects/evacudesk/web1.png',
  '/assets/projects/evacudesk/ss2.png',
  '/assets/projects/evacudesk/ss3.png',
  '/assets/icons/devicons/mongodb-original.svg',
  '/assets/icons/devicons/javascript-original.svg',
  '/assets/icons/devicons/typescript-original.svg',
  '/assets/icons/devicons/nodejs-original.svg',
  '/assets/icons/devicons/php-original.svg',
  '/assets/icons/devicons/docker-original.svg',
  '/assets/icons/devicons/linux-original.svg',
] as const;
