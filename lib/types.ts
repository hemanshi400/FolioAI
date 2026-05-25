export type Theme = 'minimal' | 'dark';

export interface User {
  id: string;
  clerkId: string;
  email: string;
  name: string;
  username: string;
  bio?: string;
  headline?: string;
  profileImage?: string;
  resumeUrl?: string;
  theme: Theme;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  userId: string;
  title: string;
  description: string;
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Skill {
  id: string;
  userId: string;
  name: string;
  level: string;
  order: number;
  createdAt: Date;
}

export interface Education {
  id: string;
  userId: string;
  school: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  order: number;
  createdAt: Date;
}

export interface Experience {
  id: string;
  userId: string;
  company: string;
  position: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  order: number;
  createdAt: Date;
}

export interface Portfolio {
  user: User;
  projects: Project[];
  skills: Skill[];
  education: Education[];
  experience: Experience[];
}
