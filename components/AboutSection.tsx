import React from 'react';
import { DecryptionText, NeuralNode } from './NeuralCore';

export const AboutSection = ({ active }: { active: boolean }) => (
  <section className="min-h-[60vh] flex items-center justify-center py-20 relative z-10 section-gradient">
    {/* Decorative background glow */}
    {active && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />}
    
    <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 items-center px-6">
      <div className="text-right">
        <h2 className={`text-4xl font-bold mb-4 transition-all duration-700 neon-underline inline-block ${active ? 'text-white text-glow-strong' : 'text-slate-300'}`}>
          <DecryptionText text="ABOUT ME" />
        </h2>
        <p className="text-slate-400 leading-relaxed mb-4 mt-6">
          I am a Full Stack Developer currently engineering the Fusion ERP System. My expertise lies in modernizing legacy architectures, 
          optimizing database performance, and building resilient microservices.
        </p>
        <p className="text-slate-500 text-sm italic border-l-2 border-cyan-500/30 pl-4">
          "Building elegant solutions that transform challenges into opportunities."
        </p>
      </div>

      <div className="flex justify-center md:h-full items-center">
        <div className="relative">
          <NeuralNode active={active} />
          {active && <div className="absolute inset-0 w-8 h-8 -translate-x-2 -translate-y-2 rounded-full border border-cyan-500/20 animate-ping-slow" />}
        </div>
      </div>

      <div className="transition-all duration-500">
         <div className={`p-6 border rounded-lg backdrop-blur-sm transition-all duration-500 holo-shimmer relative overflow-hidden ${active ? 'border-cyan-500/40 bg-cyan-950/20 shadow-[0_0_30px_rgba(34,211,238,0.1)]' : 'border-slate-800 bg-slate-900/10'}`}>
            <p className="font-mono text-cyan-300 text-sm mb-3">// CORE FOCUS</p>
            <div className="space-y-3 text-slate-300 text-sm">
              <div className="flex items-center gap-3 group">
                 <span className="text-cyan-500 group-hover:text-cyan-300 transition-colors">›</span> 
                 <span className="group-hover:text-cyan-200 transition-colors">Enterprise Systems</span>
              </div>
              <div className="flex items-center gap-3 group">
                 <span className="text-cyan-500 group-hover:text-cyan-300 transition-colors">›</span> 
                 <span className="group-hover:text-cyan-200 transition-colors">AI & Data Integration</span>
              </div>
              <div className="flex items-center gap-3 group">
                 <span className="text-cyan-500 group-hover:text-cyan-300 transition-colors">›</span> 
                 <span className="group-hover:text-cyan-200 transition-colors">Full Stack Engineering</span>
              </div>
            </div>
            {/* Accent corner decoration */}
            <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-cyan-500/30" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-cyan-500/30" />
         </div>
      </div>
    </div>
  </section>
);