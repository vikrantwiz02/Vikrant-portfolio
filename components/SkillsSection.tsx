import React from 'react';
import { DecryptionText, HexNode, NeuralNode } from './NeuralCore';
import { SKILLS } from '../constants';

const SkillBar = ({ skill, active, delay }: { skill: typeof SKILLS[0], active: boolean, delay: number }) => (
  <div 
    className={`group transition-all duration-700 ease-out ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center gap-3">
        <skill.icon size={16} className="text-cyan-400 group-hover:text-cyan-300 transition-colors" />
        <span className="text-sm font-mono text-slate-300 group-hover:text-white transition-colors">{skill.name}</span>
      </div>
      <span className="text-xs font-mono text-cyan-500">{skill.level}%</span>
    </div>
    <div className="h-1.5 bg-slate-800/80 rounded-full overflow-hidden relative">
      <div 
        className="h-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-300 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(34,211,238,0.4)] relative"
        style={{ width: active ? `${skill.level}%` : '0%', transitionDelay: `${delay + 200}ms` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      </div>
    </div>
  </div>
);

export const SkillsSection = ({ active }: { active: boolean }) => (
  <section className="min-h-[80vh] flex flex-col items-center justify-center py-20 relative z-10 section-gradient">
    {active && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />}
    
    <div className="flex flex-col items-center mb-14">
      <NeuralNode active={active} />
      <h2 className={`mt-6 text-3xl font-bold tracking-widest uppercase transition-all duration-700 ${active ? 'text-cyan-400 tracking-[0.2em] text-glow-strong' : 'text-slate-600'}`}>
         <DecryptionText text="TECHNICAL MODULES" />
      </h2>
      <div className={`mt-3 w-20 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent transition-opacity duration-700 ${active ? 'opacity-100' : 'opacity-0'}`} />
    </div>

    {/* Hex Nodes */}
    <div className="flex flex-wrap justify-center gap-12 max-w-5xl w-full px-6 mb-16">
      {SKILLS.map((skill, idx) => (
         <HexNode key={idx} level={skill.level} label={skill.name} icon={skill.icon} />
      ))}
    </div>

    {/* Progress Bars */}
    <div className="w-full max-w-2xl px-6 space-y-5">
      {SKILLS.map((skill, idx) => (
        <SkillBar key={idx} skill={skill} active={active} delay={idx * 100} />
      ))}
    </div>
  </section>
);