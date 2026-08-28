export const profile = {
  name: 'Audace Rabarison',
  title: 'Software Engineer',
  experienceYears: '5',
  email: 'audacerabarison@gmail.com',
  phone: '+261 34 76 509 18',
  address: 'Antananarivo, Madagascar',
}

export const experiences = [
  {
    company: 'Astek Madagascar',
    period: 'Juin 2024 — Déc. 2025',
    role: {
      fr: 'Software Engineer',
      en: 'Software Engineer',
    },
    description: {
      fr: "Conception et développement de nouveaux modules pour les applications de Conduent, correction d'anomalies, amélioration des performances et gestion du cycle de déploiement CI/CD.",
      en: "Design and development of new modules for Conduent applications, bug fixing, performance improvements and management of the CI/CD deployment pipeline.",
    },
    tech: ['C#', '.NET', '.NET Framework', 'Entity Framework', 'Vue.js', 'Oracle', 'PL/SQL', 'Azure DevOps', 'Git'],
  },
  {
    company: 'RAPP Mauritius',
    period: 'Nov. 2021 — Mai 2024',
    role: {
      fr: 'Front-End Developer',
      en: 'Front-End Developer',
    },
    description: {
      fr: "Conception et développement de composants front-end, mise en œuvre de tests (smoke tests, tests unitaires) et création de guides d'utilisation des composants.",
      en: "Design and development of front-end components, implementation of tests (smoke tests, unit tests) and creation of component usage guides.",
    },
    tech: ['HTML', 'CSS', 'React', 'Azure DevOps', 'Git'],
  },
  {
    company: 'BICI Madagascar',
    period: 'Avril 2021 — Présent',
    role: {
      fr: 'Software Engineer',
      en: 'Software Engineer',
    },
    description: {
      fr: "Responsable des métiers et logiques des applications d'entreprise, conception d'APIs REST, développement front-end (gestion du personnel/paie/pointage, facturations et commandes) et encadrement technique d'équipes.",
      en: "Responsible for business logic in enterprise applications, REST API design, front-end development (HR/payroll/attendance management, invoicing and orders) and technical team mentoring.",
    },
    tech: ['C#', '.NET', 'Oracle', 'PL/SQL', 'SQL Server', 'Docker', 'Angular', 'TypeScript', 'Git'],
  },
]

export const educations = [
  {
    degree: {
      fr: "Master of Science BIHAR (Big Data Intelligence for Human Augmented Reality)",
      en: "Master of Science BIHAR (Big Data Intelligence for Human Augmented Reality)",
    },
    school: {
      fr: 'École Supérieure des Technologies Industrielles Avancées (ESTIA) — Bidart, France',
      en: 'École Supérieure des Technologies Industrielles Avancées (ESTIA) — Bidart, France',
    },
    period: '2021 — 2022',
  },
  {
    degree: {
      fr: "Licence en Informatique (option Développement d'application)",
      en: "Bachelor's degree in Computer Science (Application Development)",
    },
    school: {
      fr: 'IT University — Antananarivo, Madagascar',
      en: 'IT University — Antananarivo, Madagascar',
    },
    period: '2017 — 2021',
  },
]

export const skills = [
  {
    categoryKey: 'Backend',
    category: 'Backend',
    items: [
      { name: 'C#', proficiency: 90 },
      { name: '.NET', proficiency: 90 },
      { name: '.NET Framework', proficiency: 85 },
      { name: '.NET Core', proficiency: 85 },
      { name: 'Entity Framework', proficiency: 85 },
      { name: 'APIs RESTful', proficiency: 90 },
    ],
  },
  {
    categoryKey: 'Frontend',
    category: 'Frontend',
    items: [
      { name: 'HTML', proficiency: 95 },
      { name: 'CSS', proficiency: 90 },
      { name: 'JavaScript', proficiency: 90 },
      { name: 'TypeScript', proficiency: 80 },
      { name: 'React', proficiency: 85 },
      { name: 'Angular', proficiency: 75 },
      { name: 'Vue.js', proficiency: 70 },
    ],
  },
  {
    categoryKey: 'Base de données',
    category: 'Base de données',
    items: [
      { name: 'Oracle', proficiency: 85 },
      { name: 'PL/SQL', proficiency: 80 },
      { name: 'SQL Server', proficiency: 75 },
    ],
  },
  {
    categoryKey: 'Design',
    category: 'Design',
    items: [
      { name: 'Figma', proficiency: 70 },
    ],
  },
  {
    categoryKey: 'Outils & Autres',
    category: 'Outils & Autres',
    items: [
      { name: 'Git', proficiency: 85 },
      { name: 'Azure DevOps', proficiency: 80 },
      { name: 'Docker', proficiency: 70 },
    ],
  },
]

export const languages = {
  fr: 'Français',
  en: 'English',
}
