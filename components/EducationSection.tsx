import React from 'react';
import { GraduationCap } from 'lucide-react';
import { DecryptionText, HoloCard, NeuralNode } from './NeuralCore';
import { EDUCATION } from '../constants';

export const EducationSection = ({ active }: { active: boolean }) => (
  <section className="min-h-[50vh] flex flex-col items-center justify-center py-20 relative z-10">
    <div className="flex flex-col items-center mb-16">
      <NeuralNode active={active} />
      <h2 className={`mt-6 text-3xl font-bold tracking-widest uppercase transition-all duration-700 ${active ? 'text-cyan-400 tracking-[0.2em] drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]' : 'text-slate-600'}`}>
         <DecryptionText text="ACADEMIC DATA" />
      </h2>
    </div>

    <div className="w-full max-w-4xl px-4">
      {EDUCATION.map((edu, idx) => (
        <div key={edu.id} className="relative flex justify-center items-center">
          
          <div className={`w-full max-w-2xl transition-all duration-700 ${active ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`}>
            <HoloCard className="inline-block w-full">
                <div className="p-8 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                    <div className="p-4 bg-cyan-950/30 rounded-xl border border-cyan-500/20 shrink-0">
                        <GraduationCap size={32} className="text-cyan-400" />
                    </div>

                    <div className="flex-1">
                        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-2">
                            <h3 className="text-xl font-bold text-white">{edu.role}</h3>
                            <span className="font-mono text-xs text-cyan-400 border border-cyan-500/30 px-2 py-1 rounded bg-cyan-950/20 mt-2 md:mt-0">
                                {edu.period}
                            </span>
                        </div>
                        
                        <div className="text-sm font-mono text-cyan-500/80 mb-4">{edu.company}</div>
                        
                        <div className="grid gap-2">
                            {edu.description.map((item, i) => (
                                <div key={i} className="text-slate-400 text-sm flex items-center md:items-start justify-center md:justify-start gap-2">
                                    <span className="text-cyan-500 mt-1 hidden md:block">›</span>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </HoloCard>
          </div>

        </div>
      ))}
    </div>
  </section>
);