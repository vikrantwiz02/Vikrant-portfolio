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
      // 'Core Coursework: DBMS, Operating Systems, Computer Networks, AI.'
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
    id: '1',
    title: 'ORSI Conference',
    description: 'Official platform for the ORSI Conference 2026. Facilitates organizational event management.',
    tags: ['React', 'Web Design', 'Organization'],
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000&auto=format&fit=crop',
    link: 'https://orsiconference.org/'
  },
    {
    id: '2',
    title: 'IIITDMJ Website',
    description: 'Unofficial website for IIITDMJ with content and media management without any code modification',
    tags: ['React', 'Next.js', 'Web Design', 'Organization'],
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000&auto=format&fit=crop',
    link: 'https://iiitdmj-ten.vercel.app/'
  },
  {
    id: '3',
    title: 'Fusion ERP System',
    description: 'Enterprise ERP serving 3000+ users.',
    tags: ['React', 'Django', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    link: 'http://fusion.iiitdmj.ac.in/'
  },
  {
    id: '4',
    title: 'Saviour',
    description: 'Emergency response platform with user to user support as well as employee support system.',
    tags: ['React', 'Node.js', 'Firebase'],
    image: 'https://images.unsplash.com/photo-1599930113854-d6d7fd521f10?q=80&w=1000&auto=format&fit=crop',
    link: 'https://saviour-ten.vercel.app/'
  },
  {
    id: '5',
    title: 'HydroTech',
    description: 'AI-Powered Groundwater Analytics solution using Python and React. Provides predictive insights for water resource management.',
    tags: ['Python', 'React', 'MongoDB'],
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
    title: 'Portfolio Website',
    subtitle: 'Personal & Professional Sites',
    description: 'Custom portfolio websites designed to showcase your skills, projects, and personal brand with modern animations and responsive design.',
    icon: Users,
    features: ['Responsive Design', 'Custom Animations', 'Contact Integration', 'SEO Optimization'],
    priceRange: '₹2,000 - ₹3,000',
    budgetOptions: ['Fixed Price (₹2,000 - ₹3,000)']
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Store',
    subtitle: 'Online Shopping & Payments',
    description: 'Full-featured online stores with secure payment gateways (Razorpay/Stripe), inventory management, and admin dashboard.',
    icon: ShoppingCart,
    features: ['Payment Integration', 'Admin Dashboard', 'Product Analytics', 'User Accounts'],
    priceRange: '₹7,000 - ₹25,000+',
    budgetOptions: ['Micro (₹7,000)', 'Standard (₹15,000)', 'Enterprise (₹25,000+)']
  },
  {
    id: 'webapp',
    title: 'Custom Web App',
    subtitle: 'SaaS, Dashboards & Platforms',
    description: 'Full-stack web applications — SaaS platforms, management systems, admin dashboards — built with scalable architecture.',
    icon: Monitor,
    features: ['Full-Stack Logic', 'Database Design', 'API Integration', 'Auth Systems'],
    priceRange: '₹7,000 - ₹25,000+',
    budgetOptions: ['Micro (₹7,000)', 'Standard (₹15,000)', 'Enterprise (₹25,000+)']
  },
  {
    id: 'landing',
    title: 'Landing Page',
    subtitle: 'High-Conversion Marketing Pages',
    description: 'Fast, high-converting landing pages for marketing campaigns, product launches, and lead generation.',
    icon: Rocket,
    features: ['A/B Testing Ready', 'Fast Loading', 'Lead Capture', 'Modern UI'],
    priceRange: '₹5,000 - ₹20,000+',
    budgetOptions: ['Micro (₹5,000)', 'Standard (₹10,000)', 'Enterprise (₹20,000+)']
  }
];