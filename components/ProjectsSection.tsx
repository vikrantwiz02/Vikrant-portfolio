import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Maximize2, X, AlertTriangle, Monitor } from 'lucide-react';
import { DecryptionText, HoloCard, NeuralNode } from './NeuralCore';
import { PROJECTS } from '../constants';
import { Project } from '../types';

const useInView = (options?: IntersectionObserverInit) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, { rootMargin: '200px', ...options });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, isInView };
};

const LivePreviewModal = ({ project, onClose }: { project: Project | null, onClose: () => void }) => {
    if (!project) return null;

    return (
        <div className="fixed inset-0 z-[15000] flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-md animate-particle">
             <div className="w-full h-full max-w-7xl bg-charcoal border border-cyan-500/50 rounded-xl overflow-hidden flex flex-col relative shadow-[0_0_50px_rgba(34,211,238,0.2)]">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-cyan-500/30 bg-black/50">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="font-mono text-cyan-400 tracking-wider">LIVE_UPLINK :: {project.title.toUpperCase()}</span>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 relative bg-white">
                     <iframe 
                        src={project.link} 
                        title={project.title}
                        className="w-full h-full border-0" 
                        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                     />

                     <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-900 -z-10 bg-slate-100">
                        <AlertTriangle size={48} className="text-orange-500 mb-4" />
                        <h3 className="font-bold text-xl">Connecting to Remote Host...</h3>
                        <p className="text-sm mt-2 max-w-md text-center text-slate-500">
                           If the interface remains blank, the target server ({new URL(project.link).hostname}) refused the connection (X-Frame-Options: DENY).
                        </p>
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="mt-4 px-4 py-2 bg-slate-900 text-white rounded text-sm hover:bg-slate-700">
                           Open in New Tab
                        </a>
                     </div>
                </div>
             </div>
        </div>
    );
};

const ProjectCard = ({ project, index, activeSection, onExpand }: { key?: string, project: Project, index: number, activeSection: boolean, onExpand: (p: Project) => void }) => {
    const { ref, isInView } = useInView();
    const [loadIframe, setLoadIframe] = useState(false);

    useEffect(() => {
      if (!isInView) return;
      const delay = setTimeout(() => setLoadIframe(true), index * 800);
      return () => clearTimeout(delay);
    }, [isInView, index]);

    return (
        <div 
          ref={ref}
          className={`transform transition-all duration-700 ease-out ${
            activeSection 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-20'
          }`}
          style={{ transitionDelay: `${index * 150}ms`, contentVisibility: 'auto' }}
        >
          <HoloCard className="h-[500px]">
            <div className="h-full flex flex-col group relative">
                <div className="h-64 w-full relative overflow-hidden bg-slate-900 border-b border-cyan-500/20 group-hover:border-cyan-400/50 transition-colors">
                     <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-slate-900 -z-0 pointer-events-none">
                        <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                        <span className="text-[10px] text-slate-500 font-mono">
                            INITIALIZING DESKTOP ENV...
                        </span>
                     </div>

                     {loadIframe && (
                       <div className="absolute inset-0 w-[400%] h-[400%] origin-top-left scale-[0.25] z-10" style={{ willChange: 'transform' }}>
                          <iframe 
                              src={project.link} 
                              title={project.title}
                              className="w-full h-full border-0 bg-white" 
                              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                              loading="lazy"
                          />
                       </div>
                     )}

                     <div className="absolute top-2 right-2 z-20 flex gap-2">
                        <div className="flex items-center gap-1 bg-black/60 backdrop-blur border border-cyan-500/30 px-2 py-1 rounded text-cyan-400">
                             <Monitor size={10} />
                             <span className="text-[9px] font-mono tracking-wider">DESKTOP_VIEW</span>
                        </div>
                     </div>

                     <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-10 z-20" />
                </div>

                <div className="p-6 flex-1 flex flex-col relative z-20 bg-charcoal">
                    <div className="flex gap-2 mb-4 flex-wrap">
                        {project.tags.map((tag) => (
                        <span 
                            key={tag} 
                            className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-sm bg-slate-800 text-cyan-300 border border-slate-700"
                        >
                            {tag}
                        </span>
                        ))}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                        {project.title}
                    </h3>
                    
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1 transition-opacity duration-500 ease-out">
                        {project.description}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
                         <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-[10px] font-mono text-slate-500">SYSTEM: ONLINE</span>
                         </div>

                         <a 
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-mono text-slate-300 hover:text-cyan-400 transition-colors group/btn"
                        >
                            <span>Visit</span>
                            <ExternalLink size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>
          </HoloCard>
        </div>
    );
};

export const ProjectsSection = ({ active }: { active: boolean }) => {
  const [expandedProject, setExpandedProject] = useState<Project | null>(null);

  return (
      <section className="min-h-screen flex flex-col items-center py-24 relative z-10 section-gradient">
        <LivePreviewModal project={expandedProject} onClose={() => setExpandedProject(null)} />
        {active && <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />}

        <div className="flex items-center gap-4 mb-16">
          <div className={`h-[1px] w-12 bg-gradient-to-r from-transparent to-cyan-500/50 transition-all duration-700 ${active ? 'w-20' : 'w-12'}`}></div>
          <NeuralNode active={active} />
          <h2 className={`text-3xl font-bold text-white transition-all duration-700 ${active ? 'text-glow-strong' : 'text-slate-400'}`}>
            <DecryptionText text="KEY DEPLOYMENTS" />
          </h2>
          <div className={`h-[1px] w-12 bg-gradient-to-l from-transparent to-cyan-500/50 transition-all duration-700 ${active ? 'w-20' : 'w-12'}`}></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl w-full px-6">
          {PROJECTS.map((project, idx) => (
            <ProjectCard 
                key={project.id} 
                project={project} 
                index={idx} 
                activeSection={active}
                onExpand={setExpandedProject}
            />
          ))}
        </div>
      </section>
  );
};