import React from 'react';
import { DecryptionText, NeuralNode } from './NeuralCore';
import { ACHIEVEMENTS } from '../constants';

export const AchievementsSection = ({ active }: { active: boolean }) => (
  <section className="py-24 relative z-10 flex flex-col items-center">
    <div className="mb-12 flex flex-col items-center">
       <NeuralNode active={active} />
       <h2 className={`mt-6 text-3xl font-bold tracking-widest uppercase transition-all duration-700 ${active ? 'text-cyan-400 tracking-[0.2em] drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]' : 'text-slate-600'}`}>
         <DecryptionText text="ACHIEVEMENTS" />
       </h2>
    </div>
    
    <div className="flex flex-wrap justify-center gap-12 px-6">
      {ACHIEVEMENTS.map((ach, idx) => (
        <div 
          key={ach.id}
          className="relative group perspective-1000 transition-all duration-700 ease-out hover:scale-105"
        >
          <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl group-hover:bg-cyan-400/30 transition-all duration-500" />
          <div className="w-32 h-32 relative rounded-full border border-white/10 bg-black/50 backdrop-blur-md flex flex-col items-center justify-center transition-transform duration-300">
            <div className={`absolute inset-0 rounded-full border-t border-l border-${ach.color.split('-')[1]}-500/50 animate-spin-slow`} />
            <ach.icon 
              className={`${ach.color} mb-2 transition-all duration-500 ${active ? 'animate-pulse drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'drop-shadow-sm'}`} 
              size={32} 
            />
            <span className="text-[10px] uppercase tracking-widest text-slate-400 text-center px-2">
              {ach.title}
            </span>
          </div>
        </div>
      ))}
    </div>
  </section>
);