import { 
  Layout, Server, Cloud, Cpu, Smartphone, Database, 
  Terminal, Github, Users, ShoppingCart, Monitor, Rocket 
} from 'lucide-react';
import { Achievement, Experience, Project, Service, Skill } from './types';


export const PROFILE_IMAGE = "vikrant.jpg";

export const EXPERIENCES: Experience[] = [
  {
    id: '1',
    role: 'Full Stack Developer',
    company: 'Fusion ERP System (IIIT Jabalpur)',
    period: 'Aug 2025 - Present',
    type: 'work',
    description: []
  }
];

export const EDUCATION: Experience[] = [
  {
    id: '1',
    role: 'B.Tech in Computer Science',
    company: 'IIIT Jabalpur',
    period: '2023 - 2027',
    type: 'education',
    description: [
      'Core Coursework: DBMS, Operating Systems, Computer Networks, AI.'
    ]
  }
];

export const SKILLS: Skill[] = [
  { name: 'React / Next.js', level: 98, category: 'frontend', icon: Layout },
  { name: 'Node / Python', level: 92, category: 'backend', icon: Server },
  { name: 'AWS / Docker', level: 85, category: 'tools', icon: Cloud },
  { name: 'System Design', level: 88, category: 'ai', icon: Cpu },
  { name: 'Mobile Dev', level: 75, category: 'frontend', icon: Smartphone },
  { name: 'Database', level: 90, category: 'backend', icon: Database },
];

export const PROJECTS: Project[] = [
  {
    id: '4',
    title: 'ORSI Conference',
    description: 'Official digital platform for the ORSI State Chapter. Facilitates organizational event management, delegate registration, and research dissemination for medical professionals.',
    tags: ['React', 'Web Design', 'Organization'],
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000&auto=format&fit=crop',
    link: 'https://orsiconference.org/'
  },
  {
    id: '1',
    title: 'Fusion ERP System',
    description: 'Enterprise ERP serving 6000+ users. Optimized performance by 35% and architected scalable microservices infrastructure using React and Django.',
    tags: ['React', 'Django', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    link: 'http://fusion.iiitdmj.ac.in/'
  },
  {
    id: '2',
    title: 'Saviour 2.0',
    description: 'Advanced emergency response platform with real-time tracking, AI-powered resource allocation, and 99% prediction accuracy for disaster management.',
    tags: ['React', 'Node.js', 'Firebase', 'AI'],
    image: 'https://images.unsplash.com/photo-1599930113854-d6d7fd521f10?q=80&w=1000&auto=format&fit=crop',
    link: 'https://saviour-ten.vercel.app/'
  },
  {
    id: '3',
    title: 'HydroTech',
    description: 'AI-Powered Groundwater Analytics solution using Python and React. Provides predictive insights for water resource management.',
    tags: ['Python', 'React', 'MongoDB', 'AI'],
    image: 'https://images.unsplash.com/photo-1581093458791-9f302e6d8359?q=80&w=1000&auto=format&fit=crop',
    link: 'https://hydro-tech-mu.vercel.app/'
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  { id: '1', title: 'AWS Cloud Practitioner', date: '2024', icon: Cloud, color: 'text-orange-400' },
  { id: '2', title: 'Google IT Support Pro', date: '2024', icon: Terminal, color: 'text-blue-400' },
  { id: '3', title: 'Open Source Contributor', date: 'Active', icon: Github, color: 'text-purple-400' },
];

export const SERVICES: Service[] = [
  {
    id: 'portfolio',
    title: 'Identity Core',
    subtitle: 'Portfolio & Personal Brand',
    description: 'High-impact personal websites designed to showcase your skills and identity with immersive animations.',
    icon: Users,
    features: ['Responsive Design', 'Custom Animations', 'Contact Integration', 'SEO Optimization'],
    priceRange: '₹2,000 - ₹3,000',
    budgetOptions: ['Fixed Price (₹2,000 - ₹3,000)']
  },
  {
    id: 'ecommerce',
    title: 'Commerce Grid',
    subtitle: 'E-commerce Solutions',
    description: 'Robust online stores with secure payment gateways, inventory management, and high-conversion layouts.',
    icon: ShoppingCart,
    features: ['Payment Integration', 'Admin Dashboard', 'Product Analytics', 'User Accounts'],
    priceRange: '₹7,000 - ₹25,000+',
    budgetOptions: ['Micro (₹7,000)', 'Standard (₹15,000)', 'Enterprise (₹25,000+)']
  },
  {
    id: 'webapp',
    title: 'Neural Network',
    subtitle: 'Custom Web Applications',
    description: 'Complex SaaS platforms and management systems built with scalable architecture and microservices.',
    icon: Monitor,
    features: ['Full-Stack Logic', 'Database Design', 'API Integration', 'Auth Systems'],
    priceRange: '₹7,000 - ₹25,000+',
    budgetOptions: ['Micro (₹7,000)', 'Standard (₹15,000)', 'Enterprise (₹25,000+)']
  },
  {
    id: 'landing',
    title: 'Signal Beacon',
    subtitle: 'Landing Pages',
    description: 'High-conversion landing pages optimized for marketing campaigns and product launches.',
    icon: Rocket,
    features: ['A/B Testing Ready', 'Fast Loading', 'Lead Capture', 'Modern UI'],
    priceRange: '₹5,000 - ₹20,000+',
    budgetOptions: ['Micro (₹5,000)', 'Standard (₹10,000)', 'Enterprise (₹20,000+)']
  }
];