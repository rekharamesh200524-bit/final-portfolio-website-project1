export type ThemeType = 'minimal' | 'creative' | 'professional';

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-100
}

export interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
  imageUrl?: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  bio: string;
  email: string;
  location?: string;
  company?: string;
  resumeLink?: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  skills: Skill[];
  projects: Project[];
  theme: ThemeType;
  primaryColor: string;
}

export const defaultPortfolioData: PortfolioData = {
  name: 'Jane Doe',
  title: 'Full Stack Developer',
  bio: 'Passionate about building beautiful and functional web applications.',
  email: 'jane@example.com',
  location: 'San Francisco, CA',
  company: 'Tech Innovators Inc.',
  resumeLink: 'https://example.com/resume.pdf',
  socialLinks: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
  skills: [
    { id: '1', name: 'React', level: 90 },
    { id: '2', name: 'TypeScript', level: 85 },
    { id: '3', name: 'Node.js', level: 80 },
  ],
  projects: [
    {
      id: '1',
      title: 'E-commerce Platform',
      description: 'A full-stack e-commerce solution with real-time inventory.',
      link: 'https://example.com/ecommerce',
    },
    {
      id: '2',
      title: 'Weather App',
      description: 'A beautiful weather app built with React and Framer Motion.',
      link: 'https://example.com/weather',
    }
  ],
  theme: 'creative',
  primaryColor: '#8b5cf6'
};
