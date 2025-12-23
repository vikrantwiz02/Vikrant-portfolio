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
    <div className="fixed inset-0 pointer-events-none z-[100] p-4 md:p-8 flex flex-col justify-between overflow-hidden">
      {/* CRT Scanline Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />
      {/* Scanning Laser */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-500/30 opacity-50 shadow-[0_0_10px_#22d3ee] animate-scan" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(5,5,5,0.8)_100%)]" />

      {/* Top Bar */}
      <div className="flex justify-between items-start relative z-10">
        <div className="border-t-2 border-l-2 border-cyan-500/30 w-8 h-8 md:w-16 md:h-16 rounded-tl-lg" />
        <div className="bg-cyan-900/10 px-4 py-1 rounded-full border border-cyan-500/20 backdrop-blur-md flex items-center gap-2">
          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
          <span className="text-cyan-400 font-mono text-[10px] md:text-xs tracking-[0.2em] transition-all duration-300">{activeSection.toUpperCase()}</span>
        </div>
        <div className="flex flex-col items-end">
            <div className="border-t-2 border-r-2 border-cyan-500/30 w-8 h-8 md:w-16 md:h-16 rounded-tr-lg" />
            <div className="font-mono text-[9px] text-cyan-400 mt-[-20px] mr-2 hidden md:block">{time}</div>
        </div>
      </div>
      
      {/* Center Reticle (Very Subtle) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] border border-cyan-500/5 rounded-[3rem] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border border-cyan-500/20 opacity-50" />
      
      {/* Bottom Bar */}
      <div className="flex justify-between items-end relative z-10">
        <div className="border-b-2 border-l-2 border-cyan-500/30 w-8 h-8 md:w-16 md:h-16 rounded-bl-lg" />
        <div className="font-mono text-[9px] md:text-[10px] text-cyan-500/40 text-right">
            <div ref={coordRef}>COORD: 0</div>
            SYS_INTEGRITY: 100% <br/>
            LATENCY: 12ms
        </div>
        <div className="border-b-2 border-r-2 border-cyan-500/30 w-8 h-8 md:w-16 md:h-16 rounded-br-lg" />
      </div>
    </div>
  );
};

const SideNav = ({ activeSection, scrollTo }: { activeSection: string, scrollTo: (id: string) => void }) => {
  const sections = useMemo(() => [
    { id: 'hero', label: 'SYSTEM_ROOT' },
    { id: 'about', label: 'IDENTITY' },
    { id: 'experience', label: 'EXEC_LOG' },
    { id: 'education', label: 'ACADEMIA' },
    { id: 'skills', label: 'MODULES' },
    { id: 'projects', label: 'DEPLOYMENTS' },
    { id: 'achievements', label: 'AWARDS' },
    { id: 'services', label: 'UPGRADES' },
    { id: 'contact', label: 'LINK' },
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
            text-[10px] font-mono tracking-widest transition-all duration-300 absolute right-8
            ${activeSection === section.id 
              ? 'opacity-100 text-cyan-400 translate-x-0' 
              : 'opacity-0 translate-x-4 text-slate-500 group-hover:opacity-100 group-hover:translate-x-0'
            }
          `}>
            {section.label}
          </span>

          {/* Indicator Node */}
          <div className={`
            w-3 h-3 rotate-45 border transition-all duration-300 relative
            ${activeSection === section.id 
              ? 'bg-cyan-500 border-cyan-500 shadow-[0_0_10px_#22d3ee] scale-110' 
              : 'border-slate-700 bg-obsidian group-hover:border-cyan-500/50'
            }
          `}>
            {activeSection === section.id && (
              <div className="absolute inset-0 border border-cyan-400 rounded-full animate-ping opacity-75" />
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
    { id: 'hero', label: 'SYSTEM_ROOT' },
    { id: 'about', label: 'IDENTITY' },
    { id: 'experience', label: 'EXEC_LOG' },
    { id: 'education', label: 'ACADEMIA' },
    { id: 'skills', label: 'MODULES' },
    { id: 'projects', label: 'DEPLOYMENTS' },
    { id: 'achievements', label: 'AWARDS' },
    { id: 'services', label: 'UPGRADES' },
    { id: 'contact', label: 'LINK' },
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
        className="fixed top-6 right-6 z-[120] p-3 rounded-full bg-obsidian/80 border border-cyan-500/30 text-cyan-400 backdrop-blur-md shadow-[0_0_15px_rgba(34,211,238,0.2)]"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      <div className={`fixed inset-0 bg-obsidian/95 backdrop-blur-xl z-[110] transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
           {sections.map((section) => (
             <button
               key={section.id}
               onClick={() => handleNavClick(section.id)}
               className={`text-xl font-mono tracking-widest uppercase transition-all duration-300 ${activeSection === section.id ? 'text-cyan-400 scale-110 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]' : 'text-slate-500'}`}
             >
               {section.label}
             </button>
           ))}
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

  // Dynamic Title
  useEffect(() => {
    const originalTitle = document.title;
    const handleVisibilityChange = () => {
        if (document.hidden) {
            document.title = "SIGNAL LOST... | Reconnecting";
        } else {
            document.title = originalTitle;
        }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const changeTheme = (hue: number) => {
      document.body.style.filter = `hue-rotate(${hue}deg)`;
  };

  if (!bootComplete) {
    return <BootSequence onComplete={() => setBootComplete(true)} />;
  }

  return (
    <div className="relative min-h-screen bg-obsidian text-white selection:bg-cyan-500/30 selection:text-cyan-200 cursor-none overflow-x-hidden">
      <CyberCursor />
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

      <main className="relative z-10 w-full max-w-7xl mx-auto flex flex-col">
        <div id="hero">
          <HeroSection isScrolling={isScrolling} />
        </div>

        <div id="about">
          <AboutSection active={activeSection === 'about'} />
        </div>

        <div id="experience">
          <ExperienceSection active={activeSection === 'experience'} />
        </div>

        <div id="education">
          <EducationSection active={activeSection === 'education'} />
        </div>

        <div id="skills">
          <SkillsSection active={activeSection === 'skills'} />
        </div>

        <div id="projects">
          <ProjectsSection active={activeSection === 'projects'} />
        </div>

        <div id="achievements">
          <AchievementsSection active={activeSection === 'achievements'} />
        </div>

        <div id="services">
          <ServicesSection active={activeSection === 'services'} />
        </div>

        <div id="contact">
          <ContactSection active={activeSection === 'contact'} />
        </div>
      </main>
\
      <footer className="fixed bottom-0 left-0 w-full border-t border-white/5 bg-obsidian/80 backdrop-blur-md py-2 px-6 flex justify-between items-center text-[10px] md:text-xs font-mono text-slate-500 z-[110]">
        <div>
          SYS.STATUS: <span className="text-cyan-500 animate-pulse">OPTIMAL</span>
        </div>
        <div>
           CMD: CTRL+K TO ACCESS TERMINAL
        </div>
        <div>
          ID: UNIFIED_NEURAL_FLOW_V1.0
        </div>
      </footer>
    </div>
  );
};

export default App;