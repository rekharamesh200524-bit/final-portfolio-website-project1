export type ThemeType = 'minimal' | 'creative' | 'professional' | 'modern-sidebar' | 'bento';

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

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  year: string;
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
  experience: Experience[];
  education: Education[];
  theme: ThemeType;
  primaryColor: string;
  vercelToken?: string;
  vercelProjectName?: string;
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
  experience: [
    {
      id: '1',
      company: 'Tech Innovators Inc.',
      role: 'Senior Developer',
      duration: '2021 - Present',
      description: 'Leading the frontend team to build modern SaaS solutions.'
    }
  ],
  education: [
    {
      id: '1',
      school: 'University of Technology',
      degree: 'B.S. in Computer Science',
      year: '2017 - 2021'
    }
  ],
  theme: 'creative',
  primaryColor: '#8b5cf6',
  vercelToken: '',
  vercelProjectName: 'my-awesome-portfolio'
};
