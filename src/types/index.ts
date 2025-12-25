export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  points: string[];
  tech: string[];
}

export interface Project {
  id: string;
  title: string;
  date: string;
  description: string;
  keyPoints: string[];
  tech: string[];
  links: {
    live?: string;
    github?: string;
  };
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface Education {
  degree: string;
  institution: string;
  duration: string;
  score: string;
  details?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}