export type Skill = {
  name: string;
  icon: string;
  color: string;
  description: string;
};

export type ProjectImage = string | { src: string; type: 'web' | 'mobile' };

export type ProjectChallenge = {
  problem: string;
  solution: string;
};

export type ProjectDetail = {
  overview: string;
  features: string[];
  architecture: string;
  architectureImg?: string;
  security: string;
  challenges: ProjectChallenge[];
};

export type Project = {
  name: string;
  logo: string;
  alt: string;
  role: string;
  duration: string;
  description: string;
  repoUrl: string;
  technologies: string[];
  images: ProjectImage[];
  desktopPreviewMode?: 'fill' | 'framed';
  detail?: ProjectDetail;
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
  { name: 'Prisma', icon: '/assets/icons/devicons/prisma.svg', color: '#5a67d8', description: 'Database ORM' },
  { name: 'MongoDB', icon: '/assets/icons/devicons/mongodb-original.svg', color: '#25ff29bb', description: 'NoSQL Goat' },
  { name: 'Mongoose', icon: '/assets/icons/devicons/mongoose.svg', color: '#e63d3d', description: 'MongoDB ODM' },
  { name: 'JavaScript', icon: '/assets/icons/devicons/javascript-original.svg', color: '#b8ac54af', description: 'Web Scripting' },
  { name: 'TypeScript', icon: '/assets/icons/devicons/typescript-original.svg', color: '#3178C6', description: 'JavaScript Plus' },
  { name: 'Rust', icon: '/assets/icons/devicons/rust.png', color: '#dea584', description: 'C++ doppelganger' },
  { name: 'Node.js', icon: '/assets/icons/devicons/nodejs-original.svg', color: '#37dc31b5', description: 'JavaScript Runtime' },
  { name: 'Express', icon: '/assets/icons/devicons/express-original.svg', color: '#ffffffa1', description: 'Node.js Framework' },
  { name: 'PHP', icon: '/assets/icons/devicons/php-original.svg', color: '#3843debb', description: 'Old but Gold' },
  { name: 'Laravel', icon: '/assets/icons/devicons/laravel.svg', color: '#FF2D20', description: 'PHP Framework' },
  { name: 'Docker', icon: '/assets/icons/devicons/docker-original.svg', color: '#0091ff', description: 'Containerization' },
  { name: 'GitHub', icon: '/assets/icons/brand/github-white.svg', color: '#ffffffa3', description: 'Version Control' },
  { name: 'Linux', icon: '/assets/icons/devicons/linux-original.svg', color: '#968b0d', description: 'Linux Distros' },
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
  'ethers.js': '/assets/icons/devicons/ethers.svg',
  'tanstack query': '/assets/icons/devicons/tanstack.png',
  vitest: '/assets/icons/devicons/vitest.svg',
  'tailwind css': '/assets/icons/devicons/tailwind.svg',
  truffle: '/assets/icons/devicons/truffle.svg',
  'framer motion': '/assets/icons/devicons/framer-motion.svg',
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
    body: 'Build [[secure, scalable backend]] systems with [[RESTful APIs]]. I also perform [[Data Recovery]] and [[Computer Forensics]] as well as run my [[homelab]] for [[threat analysis and detection]].',
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
    duration: '~2 months',
    description:
      'This platform aims to digitalize student credential issuance, ownership and verification. ',
    repoUrl: 'https://github.com/Sucrit/SACVS',
    technologies: ['TypeScript', 'Node.js', 'Express','React', 'PostgreSQL', 'Tailwind CSS', 'Prisma', 'Clerk', 'Solidity', 'ETH', 'Ethers.js', 'TanStack Query', 'Vitest', 'Truffle', 'Framer Motion'],
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
    detail: {
      overview:
        'Credence is a platform that digitalizes the entire lifecycle of student academic credentials — from issuance by institutions to ownership by students and verification by third parties. Each credential is anchored on an Ethereum blockchain via Solidity smart contracts, making them tamper-proof and independently verifiable without contacting the issuing institution.',
      features: [
        'Blockchain-anchored credential issuance with Solidity smart contracts',
        'Role-based dashboards for Admin, Institution, and Student users',
        'On-chain verification portal for third-party credential checks',
        'Institutional analytics with report generation',
        'Student credential management with ownership transfer',
      ],
      architecture:
        'The frontend is a React SPA built with Vite and styled using Tailwind CSS. It communicates with a Node.js/Express REST API that handles business logic and persists data through Prisma ORM to a PostgreSQL database. Credential hashes are written to an Ethereum blockchain (Ganache) via Truffle-compiled Solidity contracts, and the frontend interacts with the chain through Ethers.js. Authentication and session management are handled externally by Clerk.',
      architectureImg: '/assets/projects/credence/Credence_Architecture_Diagram.png',
      security:
        'Authentication is delegated to Clerk, which provides secure session tokens, MFA support, and OAuth flows without storing raw credentials in the application. All API endpoints enforce role-based access control — admin, institution, and student roles each have distinct permission boundaries. Credential integrity is guaranteed by the blockchain layer: once a credential hash is committed on-chain, it becomes immutable and independently verifiable. The API further validates all inputs server-side to prevent injection attacks.',
      challenges: [
        {
          problem: 'Synchronizing on-chain transaction confirmations with the database so the UI reflects real credential status without stale data.',
          solution: 'Implemented a polling mechanism with TanStack Query that watches transaction receipts and invalidates relevant query caches once the block is mined, ensuring the dashboard updates in near real-time.',
        },
        {
          problem: 'Managing complex role-based access across three distinct user types with overlapping data views.',
          solution: 'Designed a middleware layer in the Express API that derives permissions from Clerk session claims, enforcing access at the route level before any controller logic executes.',
        },
        {
          problem: 'Handling smart contract deployment and migration across development environments consistently.',
          solution: 'Used Truffle migration scripts with environment-specific configs and a CI-friendly seed step that deploys contracts to a fresh Ganache instance before running Vitest integration tests.',
        },
      ],
    },
  },
  {
    name: 'EvacuDesk',
    logo: '/assets/projects/evacudesk/evacudesk_logo.png',
    alt: 'EvacuDesk Screenshot',
    role: 'Backend Developer',
    duration: '~1 month',
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
    detail: {
      overview:
        'EvacuDesk is a management system built for the City Disaster Risk Reduction and Management Office (CDRRMO) of Dagupan, Philippines. It digitalizes the tracking of evacuation centers, evacuee registration, resource allocation, and incident reporting during disaster response operations.',
      features: [
        'Real-time evacuee registration and headcount tracking',
        'Evacuation center capacity monitoring and status dashboards',
        'Resource inventory management and allocation logging',
        'Incident report generation for CDRRMO operations',
      ],
      architecture:
        'The backend is a RESTful API built with Node.js and Express, using Mongoose as the ODM layer over a MongoDB database. The API is structured around resource-based routes for evacuation centers, evacuees, and inventory items. The frontend (built by a separate team member) consumes these endpoints to render dashboards and management forms.',
      security:
        'API routes are protected by token-based authentication, ensuring only authorized CDRRMO personnel can access and modify records. Input validation is enforced at the Mongoose schema level with additional Express middleware for request sanitization. MongoDB connection strings and secrets are managed through environment variables, never committed to source control.',
      challenges: [
        {
          problem: 'Designing a data model flexible enough to handle varying evacuation center layouts and capacities across different barangays.',
          solution: 'Created a schema with dynamic capacity fields and nested sub-documents for each zone within a center, allowing per-zone headcounts while maintaining a single center record.',
        },
        {
          problem: 'Ensuring data consistency when multiple operators register evacuees simultaneously during peak disaster response.',
          solution: 'Leveraged MongoDB atomic update operators ($inc, $push) at the database level to prevent race conditions on headcount and capacity fields.',
        },
      ],
    },
  },
  {
    name: 'RoomFinder',
    logo: '/assets/projects/roomfinder/roomfinder_logo.png',
    alt: 'RoomFinder Screenshot',
    role: 'Backend Developer',
    duration: '~1+ months',
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
    detail: {
      overview:
        'RoomFinder is a cross-platform room booking and management system built for the University of Pangasinan. It enables students and staff to discover available rooms, submit booking requests, and manage reservations through both a web dashboard and a mobile application.',
      features: [
        'Room availability search with filtering by building, floor, and time slot',
        'Booking request submission and approval workflow',
        'Admin dashboard for room management and schedule oversight',
        'Mobile companion app for on-the-go booking',
      ],
      architecture:
        'The backend is a PHP REST API serving JSON responses to both the web frontend and the mobile app. Data is persisted in a MySQL relational database with normalized tables for rooms, schedules, bookings, and users. The mobile app is built with JavaScript and consumes the same API endpoints as the web client.',
      security:
        'User authentication is handled through PHP sessions with hashed passwords stored in MySQL. The API validates session tokens on every request and enforces role-based permissions — students can only create and view their own bookings, while admins have full CRUD access. All SQL queries use prepared statements to prevent SQL injection, and input is sanitized before processing.',
      challenges: [
        {
          problem: 'Preventing double-bookings when two users request the same room and time slot simultaneously.',
          solution: 'Implemented database-level unique constraints on the room-timeslot combination and wrapped the booking creation in a MySQL transaction with a SELECT ... FOR UPDATE lock.',
        },
        {
          problem: 'Keeping the mobile app and web dashboard in sync with the same API without duplicating business logic.',
          solution: 'Designed the PHP API as a strictly stateless JSON service so both clients consume identical endpoints, with all validation and business rules centralized server-side.',
        },
      ],
    },
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
