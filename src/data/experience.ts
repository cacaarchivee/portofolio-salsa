export interface ExperienceItem {
  role: string;
  company: string;
  timeframe?: string;
  summary: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  timeframe: string;
  detail: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  issued: string;
  url?: string;
}

export const experience: ExperienceItem[] = [
  {
    role: 'Web Developer',
    company: 'Trout Global Company',
    timeframe: 'May–October 2025',
    summary:
      'Contributed to an Angular website for a higher education institution, from requirement analysis and prototyping through API integration, testing, delivery revisions, and maintenance.',
  },
  {
    role: 'Junior Front-End Developer',
    company: 'Trout Global Company',
    timeframe: 'April–October 2023',
    summary:
      'Built and maintained responsive company-profile interfaces and supported employee login, registration, activity timestamps, testing, and troubleshooting.',
  },
  {
    role: 'Front-End Developer Intern',
    company: 'Trout Global Company',
    // Add the verified internship dates here when available.
    timeframe: '',
    summary:
      'Developed the front-end table used to inspect medical document processing results and collaborated with the back-end team on API mapping, testing, and debugging.',
  },
];

export const education: EducationItem[] = [
  {
    degree: 'Bachelor of Informatics Engineering',
    institution: 'Universitas Stikubank Semarang',
    timeframe: 'September 2022–May 2026',
    detail: 'GPA 3.82/4.00',
  },
];

export const certifications: CertificationItem[] = [
  {
    title: 'CCNA: Introduction to Networks',
    issuer: 'Cisco Networking Academy',
    issued: 'March 2026',
    url: '',
  },
  {
    title: 'Junior Cybersecurity Analyst Career Path',
    issuer: 'Cisco Networking Academy',
    issued: 'February 2026',
    url: '',
  },
  {
    title: 'EnglishScore Core English — CEFR B2',
    issuer: 'British Council',
    issued: 'February 2026',
    url: '',
  },
];

export const organizations = [
  'Research & Development Division Coordinator',
  'Event Committee Chair, PYGAME EXPLORATION 2024',
  'Event Division Coordinator, EIE 2024',
] as const;

export const skillGroups = [
  {
    label: 'Core',
    skills: ['Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS / SCSS', 'Responsive design'],
  },
  {
    label: 'Integration & workflow',
    skills: ['REST APIs', 'Swagger', 'Postman', 'Git'],
  },
  {
    label: 'Academic foundations',
    skills: ['PHP', 'MySQL', 'Python / NLP', 'Java', 'SQLite'],
  },
] as const;
