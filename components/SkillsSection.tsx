import React from 'react';
import { DecryptionText, HexNode, NeuralNode } from './NeuralCore';
import { SKILLS } from '../constants';

export const SkillsSection = ({ active }: { active: boolean }) => (
  <section className="min-h-[80vh] flex flex-col items-center justify-center py-20 relative z-10">
    <div className="flex flex-col items-center mb-12">
      <NeuralNode active={active} />
      <h2 className={`mt-6 text-3xl font-bold tracking-widest uppercase transition-all duration-700 ${active ? 'text-cyan-400 tracking-[0.2em] drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]' : 'text-slate-600'}`}>
         <DecryptionText text="TECHNICAL MODULES" />
      </h2>
    </div>

    <div className="flex flex-wrap justify-center gap-12 max-w-5xl w-full px-6">
      {SKILLS.map((skill, idx) => (
         <HexNode key={idx} level={skill.level} label={skill.name} icon={skill.icon} />
      ))}
    </div>
  </section>
);