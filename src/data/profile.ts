export interface ProfileLinks {
  github: string;
  linkedin?: string;
}

export interface Profile {
  name: string;
  initials: string;
  role: string;
  positioning: string;
  location: string;
  email: string;
  bio: string;
  links: ProfileLinks;
  photo?: string;
  cvPath?: string;
  phone?: string;
}

export const profile: Profile = {
  name: 'Salsabilla Edlanda Putri',
  initials: 'SEP',
  role: 'Front-End Developer',
  positioning:
    'Front-End Developer focused on Angular, TypeScript, and API-driven web applications.',
  location: 'Semarang, Central Java, Indonesia',
  email: 'psalsabilla10@gmail.com',
  bio: 'I turn product requirements and API responses into responsive, maintainable interfaces. My work spans professional web applications, academic systems, and careful collaboration from prototype through delivery.',
  links: {
    github: 'https://github.com/cacaarchivee',
    // Add the verified LinkedIn URL here. The link appears automatically once filled.
    linkedin: '',
  },
  // Add an approved image path such as /images/profile.webp when available.
  photo: '',
  // Add /documents/salsabilla-edlanda-putri-cv.pdf only after the public PDF is reviewed.
  cvPath: '',
  // Add a public phone number only after the owner confirms publication.
  phone: '',
};
