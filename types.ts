import { LucideIcon } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'frontend' | 'backend' | 'ai' | 'tools';
  icon: LucideIcon;
}

export interface Achievement {
  id: string;
  title: string;
  date: string;
  icon: LucideIcon;
  color: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  type: 'work' | 'education';
}

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  priceRange: string;
  budgetOptions: string[];
}

export interface SectionProps {
  id: string;
  className?: string;
}