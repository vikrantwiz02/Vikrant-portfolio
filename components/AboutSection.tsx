import React from 'react';
import { DecryptionText, NeuralNode } from './NeuralCore';

export const AboutSection = ({ active }: { active: boolean }) => (
  <section className="min-h-[60vh] flex items-center justify-center py-20 relative z-10">
    <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 items-center px-6">
      <div className="text-right">
        <h2 className={`text-4xl font-bold mb-4 text-white transition-all duration-700 ${active ? 'text-cyan-50 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]' : ''}`}>
          <DecryptionText text="ABOUT ME" />
        </h2>
        <p className="text-slate-400 leading-relaxed mb-4">
          I am a Full Stack Developer currently engineering the Fusion ERP System. My expertise lies in modernizing legacy architectures, 
          optimizing database performance, and building resilient microservices.
        </p>
        <p className="text-slate-500 text-sm italic">
          "Building elegant solutions that transform challenges into opportunities."
        </p>
      </div>

      <div className="flex justify-center md:h-full items-center">
        <NeuralNode active={active} />
      </div>

      <div className="transition-all duration-500">
         <div className={`p-6 border rounded-lg backdrop-blur-sm transition-colors duration-500 ${active ? 'border-cyan-500/40 bg-cyan-950/20' : 'border-slate-800 bg-slate-900/10'}`}>
            <p className="font-mono text-cyan-300 text-sm mb-2">// CORE FOCUS</p>
            <div className="space-y-2 text-slate-300 text-sm">
              <div className="flex items-center gap-2">
                 <span className="text-cyan-500">›</span> Enterprise Systems
              </div>
              <div className="flex items-center gap-2">
                 <span className="text-cyan-500">›</span> AI & Data Integration
              </div>
              <div className="flex items-center gap-2">
                 <span className="text-cyan-500">›</span> Full Stack Engineering
              </div>
            </div>
         </div>
      </div>
    </div>
  </section>
);