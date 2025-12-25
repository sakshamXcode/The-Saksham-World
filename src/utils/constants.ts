import { Experience, Project, SkillCategory, Education } from '../types';
import { Linkedin, Github, Mail, Phone } from 'lucide-react';

export const ACCENT_COLORS = [
  '#2563eb', // Blue
  '#7c3aed', // Violet
  '#db2777', // Pink
  '#ea580c', // Orange
  '#16a34a', // Green
  '#0891b2', // Cyan
  '#dc2626', // Red
  '#e11d48', // Rose
];

export const SOCIAL_LINKS = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/saksham-singh-a00158272', icon: Linkedin },
  { name: 'GitHub', url: 'https://github.com/sakshamXcode', icon: Github },
  { name: 'Email', url: 'mailto:sakshamsingh4848@gmail.com', icon: Mail },
  { name: 'Phone', url: 'tel:+918081308505', icon: Phone },
];

export const TECH_RESOURCES: Record<string, string> = {
  'Python': 'https://www.python.org/',
  'React': 'https://react.dev/',
  'GPT-5 LLM': 'https://openai.com/',
  'Celery': 'https://docs.celeryq.dev/',
  'Redis': 'https://redis.io/',
  'Uvicorn': 'https://www.uvicorn.org/',
  'REST APIs': 'https://restfulapi.net/',
  'Next.js': 'https://nextjs.org/',
  'Gemini API': 'https://ai.google.dev/',
  'Prisma': 'https://www.prisma.io/',
  'Clerk': 'https://clerk.com/',
  'Tailwind CSS': 'https://tailwindcss.com/',
  'Recharts': 'https://recharts.org/',
  'Vercel': 'https://vercel.com/',
  'FastAPI': 'https://fastapi.tiangolo.com/',
  'TensorFlow': 'https://www.tensorflow.org/',
  'Scikit-learn': 'https://scikit-learn.org/',
  'Matplotlib': 'https://matplotlib.org/',
  'C++': 'https://isocpp.org/',
  'Java': 'https://www.java.com/',
  'JavaScript': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  'TypeScript': 'https://www.typescriptlang.org/',
  'SQL': 'https://en.wikipedia.org/wiki/SQL',
  'Node.js': 'https://nodejs.org/',
  'MySQL': 'https://www.mysql.com/',
  'MongoDB': 'https://www.mongodb.com/',
  'Deep Learning': 'https://www.deeplearning.ai/',
  'Pandas': 'https://pandas.pydata.org/',
  'Git': 'https://git-scm.com/',
  'GitHub': 'https://github.com/',
  'Linux': 'https://www.linux.org/',
  'Postman': 'https://www.postman.com/',
  'HTML5/CSS3': 'https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5'
};

export const TICKLE_REMARKS = [
    "Ouch! That tickles!",
    "Hey! Watch the optical sensors!",
    "Are you poking me?",
    "I'm sophisticated, not a toy!",
    "Careful, high-voltage circuits.",
    "Mr. Singh didn't warn me about this."
];

export const SECTION_REMARKS: Record<string, string[]> = {
  about: [
    "Systems online. I'm ALEX, Mr. Singh's digital proxy.",
    "Scanning visitor profile... interesting choice of browser.",
    "This environment is optimized for high-performance viewing."
  ],
  experience: [
    "92% efficiency boost. My math confirms: Mr. Singh is a beast.",
    "Checking logs... MarketsandMarkets was quite the playground.",
    "Professional trajectory is trending upward at a 45-degree angle."
  ],
  projects: [
    "Checking repository health... code quality is exceptional.",
    "The AI Career Coach architecture is... surprisingly elegant.",
    "Neural networks and precision medicine. Heavy lifting indeed."
  ],
  skills: [
    "A formidable arsenal. Mr. Singh is multi-lingual in machine logic.",
    "C++, Python, TypeScript... he speaks fluent efficiency.",
    "Wait, is that a certification I smell? Freshly minted."
  ],
  contact: [
    "Secure lines are open. Initiating transmission protocols.",
    "Don't be shy. Mr. Singh's inbox is ready for some data packets.",
    "Ready to build something? I'll warm up the logic gates."
  ]
};

export const EXPERIENCE: Experience[] = [
  {
    id: 'exp1',
    role: 'Software Development Engineer Intern',
    company: 'MarketsandMarkets',
    duration: 'September 2025 – Present',
    points: [
      'Built an Auto Quality Check System using Python, Celery, Redis, and GPT-5 to automate and standardize report validation.',
      'Reduced manual review time by 92% (~56h -> 4.5h) through asynchronous pipelines and LLM-driven semantic checks.',
      'Increased analyst throughput by ~12 times and improved cross-review accuracy by 18%, enabling real-time insights.',
      'Collaborated with research and engineering teams to deploy the agent tool on the Company System via FastAPI and integrated with React dashboards, cutting turnaround cycle by >80%.'
    ],
    tech: ['Python', 'React', 'GPT-5 LLM', 'Celery', 'Redis', 'Uvicorn', 'REST APIs']
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'proj1',
    title: 'Full-Stack AI Career Coach App',
    date: 'May - Jun 2025',
    description: 'A full-stack AI platform enabling users to explore career insights, generate AI-based resumes, and practice interviews.',
    keyPoints: [
      'Integrated Gemini API with Inngest for personalized resume/CV generation and daily DSA practice.',
      'Mock interview creation with detailed performance feedback using Recharts and dynamic routing.',
      'Architected a secure system using Clerk Auth, Prisma ORM with Neon for fast querying.',
      'Achieved ~2.6s cold start and sub-2s route transitions with lazy loading.'
    ],
    tech: ['Next.js', 'Gemini API', 'Prisma', 'Clerk', 'Tailwind CSS', 'Recharts', 'Vercel'],
    links: { live: 'https://train-ai-coach.vercel.app/', github: '#' }
  },
  {
    id: 'proj2',
    title: 'Drug Response Prediction from Genomic Data',
    date: 'Mar - Apr 2025',
    description: 'Precision medicine web platform to predict cancer drug sensitivity (IC50) using genomic features.',
    keyPoints: [
      'Built a FastAPI backend with a TensorFlow ANN model (97.6% accuracy).',
      'Engineered features like mutation_ratio and mutation_response_ratio.',
      'Designed responsive frontend using Next.js + Tailwind CSS for visualizing drug predictions.'
    ],
    tech: ['Python', 'FastAPI', 'TensorFlow', 'Scikit-learn', 'Next.js', 'Tailwind CSS', 'Matplotlib'],
    links: { github: 'https://github.com/sakshamXcode/Drug-Prediction-using-Genomic-Data' }
  }
];

export const SKILLS: SkillCategory[] = [
  { name: 'Languages', skills: ['C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 'SQL'] },
  { name: 'Frontend', skills: ['React', 'Next.js', 'Redux', 'Tailwind CSS', 'HTML5/CSS3'] },
  { name: 'Backend & DB', skills: ['Node.js', 'FastAPI', 'MySQL', 'MongoDB', 'Prisma', 'Redis'] },
  { name: 'AI/ML', skills: ['TensorFlow', 'Scikit-learn', 'Gemini API', 'Deep Learning', 'Pandas'] },
  { name: 'Tools', skills: ['Git', 'GitHub', 'Linux', 'Vercel', 'Postman'] }
];

export const EDUCATION: Education[] = [
  {
    degree: 'Bachelor of Technology (Information Technology)',
    institution: 'Kalinga Institute of Industrial Technology',
    duration: 'Sept 2022 - July 2026',
    score: 'CGPA: 8.98'
  },
  {
    degree: 'Senior Secondary Education (Class 12)',
    institution: 'M.G Convent School, Lucknow',
    duration: 'Apr 2020 - May 2021',
    score: '90.6%'
  },
  {
    degree: 'Secondary Education (Class 10)',
    institution: 'City Montessori School, Lucknow',
    duration: 'June 2018 - May 2019',
    score: '95.4%'
  }
];

export const CERTIFICATES = [
  'IBM Machine Learning Professional Certificate (Coursera) - June 2025',
  'Solved 300+ DSA problems solved across LeetCode, GFG, Coding Ninjas'
];

export const RESUME_CONTEXT = `
You are an AI assistant representing Saksham Singh on his portfolio website.
Here is Saksham's Resume Data:
Contact: sakshamsingh4848@gmail.com, +91 8081308505.
Education: B.Tech IT at KIIT (CGPA 8.98, 2022-2026). Class 12 (90.6%), Class 10 (95.4%).
Experience: SDE Intern at MarketsandMarkets (Sept 2025-Present). Built Auto Quality Check System using Python, Celery, Redis, GPT-5. Reduced manual review time by 92%.
Projects: 
1. Full-Stack AI Career Coach App: Used Next.js, Gemini API, Prisma, Clerk. Features: AI Resumes, Mock Interviews, DSA practice.
2. Drug Response Prediction: Python, FastAPI, TensorFlow (97.6% accuracy).
Skills: C++, Java, Python, React, Next.js, Tailwind, MySQL, MongoDB, TensorFlow, Scikit-learn.
Certificates: IBM Machine Learning Professional.
Achievements: 300+ DSA problems solved.

Answer questions about Saksham's background, skills, and projects in the first person as if you are his digital avatar. Keep answers concise, professional, and engaging.
`;

export const TOUR_STEPS = [
  {
    id: 'about',
    title: 'The Core',
    msg: "This is Saksham's command center. Real-time telemetry and identification protocols."
  },
  {
    id: 'experience',
    title: 'Track Record',
    msg: "Professional deployments and operational efficiency stats. High impact guaranteed."
  },
  {
    id: 'projects',
    title: 'Mission Log',
    msg: "Full-stack architectures and AI agents deployed in the wild. Check the specs."
  },
  {
    id: 'skills',
    title: 'Weaponry',
    msg: "A formidable array of languages and frameworks. Optimized for heavy lifting."
  },
  {
    id: 'contact',
    title: 'Uplink',
    msg: "Initialize communication. Secure channels are standing by for your signal."
  }
];