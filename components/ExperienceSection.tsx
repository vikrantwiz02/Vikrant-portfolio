import React from 'react';
import { Briefcase, GraduationCap } from 'lucide-react';
import { DecryptionText, HoloCard, NeuralNode } from './NeuralCore';
import { EXPERIENCES } from '../constants';

export const ExperienceSection = ({ active }: { active: boolean }) => (
  <section className="min-h-screen flex flex-col items-center justify-center py-20 relative z-10">
    <div className="flex flex-col items-center mb-16">
      <NeuralNode active={active} />
      <h2 className={`mt-6 text-3xl font-bold tracking-widest uppercase transition-all duration-700 ${active ? 'text-cyan-400 tracking-[0.2em] drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]' : 'text-slate-600'}`}>
         <DecryptionText text="EXECUTION LOG" />
      </h2>
    </div>

    <div className="w-full max-w-5xl px-4">
      {EXPERIENCES.map((exp, idx) => {
        const isLeft = idx % 2 === 0;
        return (
          <div key={exp.id} className="relative grid grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 items-center mb-12 last:mb-0">
            <div className={`text-right ${isLeft ? 'block' : 'hidden md:block md:invisible'}`}>
              <HoloCard className="inline-block w-full">
                 <div className="p-6 text-left">
                    <div className="flex items-center gap-3 mb-2 text-cyan-400">
                        {exp.type === 'work' ? <Briefcase size={18} /> : <GraduationCap size={18} />}
                        <span className="font-mono text-xs uppercase tracking-wider">{exp.period}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                    <div className="text-sm font-mono text-cyan-500/80 mb-4">{exp.company}</div>
                    <ul className="space-y-2">
                        {exp.description.map((item, i) => (
                        <li key={i} className="text-slate-400 text-sm flex items-start gap-2">
                            <span className="text-cyan-500 mt-1">›</span>
                            {item}
                        </li>
                        ))}
                    </ul>
                 </div>
              </HoloCard>
            </div>

            <div className="flex justify-center relative h-full">
               <div className="w-px h-full bg-slate-800 absolute top-0 left-1/2 -translate-x-1/2 -z-10" />
               <div className={`w-3 h-3 rounded-full border border-cyan-500 bg-obsidian z-10 mt-6 transition-all duration-500 ${active ? 'scale-125 shadow-[0_0_10px_#22d3ee]' : 'scale-100 opacity-50'}`} />
            </div>

            <div className={`text-left ${!isLeft ? 'block' : 'hidden md:block md:invisible'}`}>
               <HoloCard className="inline-block w-full">
                 <div className="p-6">
                    <div className="flex items-center gap-3 mb-2 text-cyan-400">
                        {exp.type === 'work' ? <Briefcase size={18} /> : <GraduationCap size={18} />}
                        <span className="font-mono text-xs uppercase tracking-wider">{exp.period}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                    <div className="text-sm font-mono text-cyan-500/80 mb-4">{exp.company}</div>
                    <ul className="space-y-2">
                        {exp.description.map((item, i) => (
                        <li key={i} className="text-slate-400 text-sm flex items-start gap-2">
                            <span className="text-cyan-500 mt-1">›</span>
                            {item}
                        </li>
                        ))}
                    </ul>
                 </div>
              </HoloCard>
            </div>
          </div>
        );
      })}
    </div>
  </section>
);