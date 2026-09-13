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
  summary: string;
  url?: string;
}

export interface OrganizationItem {
  role: string;
  organization: string;
  timeframe?: string;
  summary: string;
}

export interface SupportingDocumentItem {
  label: string;
  url: string;
}

export const experience: ExperienceItem[] = [
  {
    role: 'Web Developer',
    company: 'Trout Global Company',
    timeframe: 'May–October 2025',
    summary:
      'Contributed to an Angular website for a higher education institution, from requirement analysis and team prototyping through API integration, Kanban-based delivery, client revisions, and maintenance.',
  },
  {
    role: 'Junior Front-End Developer',
    company: 'Trout Global Company',
    timeframe: 'April–October 2023',
    summary:
      'Translated UI/UX designs into responsive company-profile interfaces and supported employee login, registration, activity timestamps, testing, and maintenance.',
  },
  {
    role: 'Front-End Developer Intern',
    company: 'Trout Global Company',
    // Add the verified internship dates here when available.
    timeframe: '',
    summary:
      'Developed a Smart Table with document upload and REST API submission, presented ML processing results, and collaborated on API and account-flow integration.',
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
    summary: 'Switch and router configuration, IPv4/IPv6 addressing, and basic connectivity troubleshooting.',
    url: '',
  },
  {
    title: 'Junior Cybersecurity Analyst Career Path',
    issuer: 'Cisco Networking Academy',
    issued: 'February 2026',
    summary: 'Foundational skills for identifying, analyzing, and responding to security threats and incidents.',
    url: '',
  },
  {
    title: 'EnglishScore Core English — CEFR B2',
    issuer: 'British Council',
    issued: 'February 2026',
    summary: 'Upper-intermediate English proficiency measured at CEFR B2.',
    url: '',
  },
];

export const organizations: OrganizationItem[] = [
  {
    role: 'Research & Development Division Coordinator',
    organization: 'Informatics Engineering Student Association',
    // Add the verified coordination period here when available.
    timeframe: '',
    summary: 'Planned technical training for members, including database and Python programming sessions.',
  },
  {
    role: 'Event Committee Chair',
    organization: 'PYGAME EXPLORATION 2024',
    timeframe: '2024',
    summary: 'Led cross-division planning, weekly coordination, role assignment, and execution oversight.',
  },
  {
    role: 'Event Division Coordinator',
    organization: 'Engineering Informatics Event (EIE) 2024',
    timeframe: '2024',
    summary: 'Planned the concept, timeline, delegation, and technical and operational coordination.',
  },
];

export const supportingDocuments: SupportingDocumentItem[] = [
  {
    label: 'Academic transcript',
    url: 'https://drive.google.com/file/d/15xhzlSTqdI1LOodRSWXS_Uts1ccrHUBn/view?usp=drive_link',
  },
  {
    label: 'Organizational certificates',
    url: 'https://drive.google.com/file/d/1-tXeTsWGXHV1oJlz3lqIGVxRFGFQ4KoD/view?usp=drive_link',
  },
  {
    label: 'Skills certificates',
    url: 'https://drive.google.com/file/d/12KuFgMYwRM7WlYHZAB0VGSydHABCrsNN/view?usp=drive_link',
  },
];

export const skillGroups = [
  {
    label: 'Core',
    skills: ['Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS / SCSS', 'Responsive design'],
  },
  {
    label: 'Integration & workflow',
    skills: ['REST APIs', 'Swagger', 'Postman', 'Git', 'GitHub', 'GitLab'],
  },
  {
    label: 'Academic foundations',
    skills: ['PHP / MySQL', 'Python / NLP', 'Pandas', 'Scikit-learn', 'NLTK / Sastrawi', 'Java / Android Studio / SQLite'],
  },
] as const;
