import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { 
  NeuralThread, CyberCursor, BinaryRain, FloatingRunes, 
  SystemLogger, SonarPulse, IdleScreen, ScrollProgress, CommandTerminal, Constellation
} from './components/NeuralCore';
import { 
  HeroSection, 
  AboutSection, 
  ExperienceSection,
  EducationSection,
  SkillsSection, 
  ProjectsSection, 
  AchievementsSection, 
  ServicesSection,
  ContactSection 
} from './components/Sections';

// --- VISUAL COMPONENTS ---

const HUDOverlay = ({ activeSection, coordRef }: { activeSection: string, coordRef: React.RefObject<HTMLDivElement> }) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  
  useEffect(() => {
    const t = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] px-4 pb-4 pt-16 md:px-8 md:pb-8 md:pt-16 flex flex-col justify-between overflow-hidden">
      {/* CRT Scanline Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(5,5,5,0.85)_100%)]" />

      {/* Top Bar */}
      <div className="flex justify-between items-start relative z-10">
        <div className="border-t-2 border-l-2 border-cyan-500/40 w-8 h-8 md:w-16 md:h-16 rounded-tl-lg shadow-[0_0_5px_rgba(34,211,238,0.1)]" />
        <div className="flex flex-col items-end">
            <div className="border-t-2 border-r-2 border-cyan-500/30 w-8 h-8 md:w-16 md:h-16 rounded-tr-lg" />
            <div className="font-mono text-[9px] text-cyan-400 mt-[-20px] mr-2 hidden md:block">{time}</div>
        </div>
      </div>
      
      {/* Center Reticle (Very Subtle) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] border border-cyan-500/5 rounded-[3rem] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border border-cyan-500/20 opacity-50" />
    </div>
  );
};

const SideNav = ({ activeSection, scrollTo }: { activeSection: string, scrollTo: (id: string) => void }) => {
  const sections = useMemo(() => [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ], []);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[90] hidden lg:flex flex-col gap-6">
      {sections.map((section) => (
        <button 
          key={section.id}
          onClick={() => scrollTo(section.id)}
          className="group flex items-center justify-end gap-4 relative"
        >
          {/* Label (Visible on hover or active) */}
          <span className={`
            text-[11px] font-mono tracking-widest transition-all duration-300 absolute right-8 whitespace-nowrap
            ${activeSection === section.id 
              ? 'opacity-100 text-cyan-300 translate-x-0 drop-shadow-[0_0_8px_rgba(34,211,238,0.9)]' 
              : 'opacity-0 pointer-events-none translate-x-2'
            }
          `}>
            {section.label}
          </span>

          {/* Indicator Node */}
          <div className={`
            w-3 h-3 rotate-45 border transition-all duration-300 relative
            ${activeSection === section.id 
              ? 'bg-cyan-400 border-cyan-400 shadow-[0_0_16px_#22d3ee,0_0_32px_rgba(34,211,238,0.6),0_0_48px_rgba(34,211,238,0.3)] scale-125' 
              : 'border-slate-700 bg-obsidian'
            }
          `}>
            {activeSection === section.id && (
              <div className="absolute inset-[-4px] border border-cyan-400/40 rounded-sm animate-ping opacity-75" />
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

/* Mobile Navigation Component */
const MobileMenu = ({ activeSection, scrollTo }: { activeSection: string, scrollTo: (id: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const sections = useMemo(() => [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ], []);

  const handleNavClick = (id: string) => {
    scrollTo(id);
    setIsOpen(false);
  };

  return (
    <div className="lg:hidden">
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-[150] p-2.5 rounded-full bg-obsidian/90 border border-cyan-500/40 text-cyan-400 backdrop-blur-md shadow-[0_0_15px_rgba(34,211,238,0.3)]"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[138]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-obsidian border-l border-cyan-500/20 z-[139] flex flex-col shadow-[-8px_0_40px_rgba(0,0,0,0.6)] transition-transform duration-400 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-slate-800/60 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full shadow-[0_0_6px_#22d3ee]" />
            <span className="text-xs font-mono text-slate-400 tracking-widest uppercase">Navigation</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col flex-1 px-4 py-6 gap-1 overflow-y-auto">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleNavClick(section.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded text-left transition-all duration-200 group ${
                activeSection === section.id
                  ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border-l-2 border-transparent'
              }`}
            >
              <span className={`w-1 h-1 rounded-full transition-colors ${activeSection === section.id ? 'bg-cyan-400' : 'bg-slate-600 group-hover:bg-slate-400'}`} />
              <span className="text-xs font-mono tracking-widest uppercase">{section.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer CTA */}
        <div className="px-4 py-5 border-t border-slate-800/60 shrink-0">
          <button
            onClick={() => handleNavClick('services')}
            className="w-full py-2.5 bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-black text-xs font-semibold font-mono tracking-widest uppercase rounded border border-cyan-500/30 hover:border-cyan-500 transition-all duration-300"
          >
            Services &amp; Pricing
          </button>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isScrolling, setIsScrolling] = useState(false);
  const [bootComplete, setBootComplete] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  
  // Use a ref for direct DOM manipulation to avoid re-renders on every scroll event
  const coordRef = useRef<HTMLDivElement>(null);
  
  // 1. Unified Scroll Logic (Optimized)
  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>;
    const sectionIds = ['hero', 'about', 'experience', 'education', 'skills', 'projects', 'achievements', 'services', 'contact'];
    let ticking = false;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Direct DOM update for high performance
      if (coordRef.current) {
        coordRef.current.innerText = `COORD: ${currentScrollY.toFixed(0)}`;
      }

      // Neural Thread Progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = currentScrollY / totalHeight;
      setScrollProgress(Math.min(Math.max(progress, 0), 1));

      // Active Section Scanner
      const viewportCenter = currentScrollY + (window.innerHeight / 2);
      
      let closestId = activeSection;
      let minDistance = Infinity;

      sectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          const elementCenter = el.offsetTop + (el.offsetHeight / 2);
          const distance = Math.abs(viewportCenter - elementCenter);
          if (distance < minDistance) {
            minDistance = distance;
            closestId = id;
          }
        }
      });

      if (closestId !== activeSection) {
        setActiveSection(closestId);
      }
      
      ticking = false;
    };

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);

      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call to set state
    updateScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [activeSection]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Keyboard Shortcuts (J/K Navigation & Command Terminal)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            setTerminalOpen(prev => !prev);
        }
        
        if (terminalOpen) return;

        const sections = ['hero', 'about', 'experience', 'education', 'skills', 'projects', 'achievements', 'services', 'contact'];
        const currentIndex = sections.indexOf(activeSection);
        
        if (e.key === 'j') {
             const next = sections[currentIndex + 1];
             if (next) scrollToSection(next);
        } else if (e.key === 'k') {
             const prev = sections[currentIndex - 1];
             if (prev) scrollToSection(prev);
        }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeSection, terminalOpen]);

  // Dynamic Title - SEO optimized
  useEffect(() => {
    const seoTitle = 'Vikrant Kumar | Full Stack Developer & Software Engineer | IIIT Jabalpur | React, Next.js, Node.js, Python, AWS';
    document.title = seoTitle;
    const handleVisibilityChange = () => {
        if (document.hidden) {
            document.title = "Come back! | Vikrant Kumar – Full Stack Developer";
        } else {
            document.title = seoTitle;
        }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const changeTheme = (hue: number) => {
      document.body.style.filter = `hue-rotate(${hue}deg)`;
  };

  return (
    <div className="relative min-h-screen bg-obsidian text-white selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      <ScrollProgress />
      <SonarPulse />
      <IdleScreen />
      <CommandTerminal 
        isOpen={terminalOpen} 
        onClose={() => setTerminalOpen(false)} 
        onNavigate={scrollToSection} 
        onThemeChange={changeTheme}
      />

      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] animate-pulse" />
        <BinaryRain />
        <Constellation />
        <FloatingRunes />
        
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-obsidian to-obsidian animate-gradient-breathe opacity-50" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
      </div>

      <HUDOverlay activeSection={activeSection} coordRef={coordRef} />
      <NeuralThread scrollProgress={scrollProgress} />
      <SideNav activeSection={activeSection} scrollTo={scrollToSection} />
      <MobileMenu activeSection={activeSection} scrollTo={scrollToSection} />
      <SystemLogger />

      <main className="relative z-10 w-full max-w-7xl mx-auto flex flex-col pt-16">
        <section id="hero" aria-label="Introduction">
          <HeroSection isScrolling={isScrolling} />
        </section>

        <section id="about" aria-label="About Vikrant Kumar">
          <AboutSection active={activeSection === 'about'} />
        </section>

        <section id="experience" aria-label="Work Experience">
          <ExperienceSection active={activeSection === 'experience'} />
        </section>

        <section id="education" aria-label="Education">
          <EducationSection active={activeSection === 'education'} />
        </section>

        <section id="skills" aria-label="Technical Skills">
          <SkillsSection active={activeSection === 'skills'} />
        </section>

        <section id="projects" aria-label="Projects">
          <ProjectsSection active={activeSection === 'projects'} />
        </section>

        <section id="achievements" aria-label="Achievements & Certifications">
          <AchievementsSection active={activeSection === 'achievements'} />
        </section>

        <section id="services" aria-label="Web Development Services">
          <ServicesSection active={activeSection === 'services'} />
        </section>

        <section id="contact" aria-label="Contact Vikrant Kumar">
          <ContactSection active={activeSection === 'contact'} />
        </section>
      </main>
\
      <footer className="fixed bottom-0 left-0 w-full border-t border-cyan-500/10 bg-obsidian/90 backdrop-blur-md py-2 px-6 flex justify-between items-center text-[10px] md:text-xs font-mono text-slate-500 z-[110]">
        <div>
          SYS.STATUS: <span className="text-cyan-500 animate-pulse text-glow">OPTIMAL</span>
        </div>
        <div className="text-slate-600">
           CMD: CTRL+K TO ACCESS TERMINAL
        </div>
        <div>
          ID: <span className="text-cyan-600">vikrantwiz02</span>
        </div>
      </footer>

      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-[120] bg-obsidian/80 backdrop-blur-xl border-b border-slate-800/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <button onClick={() => scrollToSection('hero')} className="flex items-center gap-2 cursor-pointer">
            <div className="w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_6px_#22d3ee]" />
            <span className="text-white font-bold text-sm md:text-base tracking-tight">Vikrant Kumar</span>
            <span className="text-slate-500 text-xs font-mono hidden md:inline">/ Full Stack Developer</span>
          </button>
          <div className="flex items-center gap-4 md:gap-6">
            <button onClick={() => scrollToSection('projects')} className="text-slate-400 hover:text-white text-xs md:text-sm transition-colors cursor-pointer hidden md:block">Projects</button>
            <button onClick={() => scrollToSection('contact')} className="text-slate-400 hover:text-white text-xs md:text-sm transition-colors cursor-pointer hidden md:block">Contact</button>
            <button 
              onClick={() => scrollToSection('services')}
              className="hidden sm:block px-4 py-1.5 bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-black text-xs md:text-sm font-semibold rounded border border-cyan-500/30 hover:border-cyan-500 transition-all duration-300 cursor-pointer whitespace-nowrap"
            >
              Services &amp; Pricing
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default App;