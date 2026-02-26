import React from 'react';
import { DecryptionText, NeuralNode } from './NeuralCore';
import { ACHIEVEMENTS } from '../constants';

export const AchievementsSection = ({ active }: { active: boolean }) => (
  <section className="py-24 relative z-10 flex flex-col items-center section-gradient">
    {active && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />}
    
    <div className="mb-14 flex flex-col items-center">
       <NeuralNode active={active} />
       <h2 className={`mt-6 text-3xl font-bold tracking-widest uppercase transition-all duration-700 ${active ? 'text-cyan-400 tracking-[0.2em] text-glow-strong' : 'text-slate-600'}`}>
         <DecryptionText text="ACHIEVEMENTS" />
       </h2>
       <div className={`mt-3 w-20 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent transition-opacity duration-700 ${active ? 'opacity-100' : 'opacity-0'}`} />
    </div>
    
    <div className="flex flex-wrap justify-center gap-14 px-6">
      {ACHIEVEMENTS.map((ach, idx) => (
        <div 
          key={ach.id}
          className={`relative group perspective-1000 transition-all duration-700 ease-out hover:scale-110 ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: `${idx * 200}ms` }}
        >
          {/* Outer glow ring */}
          <div className="absolute inset-[-8px] bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 rounded-full blur-lg group-hover:blur-xl group-hover:opacity-100 opacity-50 transition-all duration-500" />
          
          <div className="w-36 h-36 relative rounded-full border border-white/10 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center transition-all duration-300 group-hover:border-cyan-500/40 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]">
            <div className={`absolute inset-0 rounded-full border-t border-l border-cyan-500/30 animate-spin-slow`} />
            <div className="absolute inset-[3px] rounded-full border border-dashed border-white/5 animate-[spin_25s_linear_infinite_reverse]" />
            <ach.icon 
              className={`${ach.color} mb-2 transition-all duration-500 ${active ? 'animate-pulse drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]' : 'drop-shadow-sm'}`} 
              size={32} 
            />
            <span className="text-[10px] uppercase tracking-widest text-slate-400 text-center px-2 group-hover:text-cyan-300 transition-colors">
              {ach.title}
            </span>
            <span className="text-[8px] text-cyan-600 font-mono mt-1">{ach.date}</span>
          </div>
        </div>
      ))}
    </div>
  </section>
);