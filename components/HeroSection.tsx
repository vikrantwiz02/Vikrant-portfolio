import React, { useState, useEffect } from 'react';
import { ChevronDown, Eye, Sparkles } from 'lucide-react';
import { GlitchText, MagneticWrapper, ScrambleLink, WireframeTesseract } from './NeuralCore';
import { PROFILE_IMAGE } from '../constants';
import { ResumeModal } from './ResumeModal';

const FloatingData = () => {
  const dataPoints = [
    { text: '0x4F2A', top: '10%', left: '10%' },
    { text: 'REACT_V19', top: '20%', left: '80%' },
    { text: 'SYS_RDY', top: '80%', left: '15%' },
    { text: 'AWS_CLOUD', top: '70%', left: '85%' },
    { text: '0010110', top: '40%', left: '5%' },
    { text: 'NEURAL_NET', top: '55%', left: '92%' },
    { text: 'TCP/IP', top: '30%', left: '3%' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-20">
      {dataPoints.map((point, idx) => (
        <div
          key={idx}
          className="absolute font-mono text-[10px] text-cyan-500/50 animate-float"
          style={{ top: point.top, left: point.left, animationDelay: `${idx * 2}s` }}
        >
          {point.text}
        </div>
      ))}
    </div>
  );
};

/* Orbiting particles around the profile image */
const OrbitingParticles = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    {/* Particle 1 */}
    <div className="absolute animate-orbit" style={{ animationDuration: '6s' }}>
      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]" />
    </div>
    {/* Particle 2 */}
    <div className="absolute animate-orbit-reverse" style={{ animationDuration: '10s' }}>
      <div className="w-1 h-1 bg-purple-400 rounded-full shadow-[0_0_8px_#a855f7]" />
    </div>
    {/* Particle 3 */}
    <div className="absolute animate-orbit" style={{ animationDuration: '14s', animationDelay: '2s' }}>
      <div className="w-1 h-1 bg-cyan-300 rounded-full shadow-[0_0_6px_#67e8f9]" />
    </div>
  </div>
);

export const HeroSection = ({ isScrolling }: { isScrolling: boolean }) => {
  const [text, setText] = useState('');
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const fullText = "Full Stack Developer";
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative text-center z-10 px-4 overflow-hidden">
      <FloatingData />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-30 pointer-events-none">
          <WireframeTesseract />
      </div>

      <div className="relative w-36 h-36 md:w-44 md:h-44 mb-12 z-20 group cursor-default mt-16 md:mt-0">
          {/* Outer Glow Ring */}
          <div className="absolute inset-[-20px] rounded-full bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-xl animate-gradient-shift opacity-60" />
          
          {/* Outer Rotating Ring */}
          <div className="absolute inset-[-12px] rounded-full border-2 border-cyan-500/20 border-t-cyan-400/60 animate-spin-slow" />
          
          {/* Counter-Rotating Ring */}
          <div className="absolute inset-[-6px] rounded-full border border-purple-400/15 border-b-purple-400/40 animate-[spin_8s_linear_infinite_reverse]" />
          
          {/* Dashed Decorative Ring */}
          <div className="absolute inset-[-18px] rounded-full border border-dashed border-cyan-500/10 animate-[spin_20s_linear_infinite]" />
          
          {/* Orbiting Particles */}
          <OrbitingParticles />
          
          {/* Main Image Container */}
          <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-cyan-500/50 bg-black/80 backdrop-blur-sm shadow-[0_0_40px_rgba(34,211,238,0.3)] group-hover:shadow-[0_0_60px_rgba(34,211,238,0.5),0_0_100px_rgba(168,85,247,0.2)] transition-shadow duration-500">
             
             {/* The Image */}
             <img 
               src={PROFILE_IMAGE} 
               alt="Operator Identity" 
               className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-out scale-105 group-hover:scale-100"
             />
             
             {/* Glitch Overlay Effect on Hover */}
             <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-300" />
          </div>

          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/90 border border-cyan-500/40 text-[8px] font-mono text-cyan-400 rounded-sm shadow-[0_0_10px_rgba(34,211,238,0.2)]">
            ID: AUTHENTICATED
          </div>
      </div>

      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/10 to-cyan-500/20 blur-[100px] opacity-30 rounded-full animate-gradient-shift"></div>
        <div className="relative z-10 font-sans">
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white animate-text-glow">
             <GlitchText text="VIKRANT" /> <span className="gradient-text-cyan">KUMAR</span>
          </h1>
        </div>
        {/* Decorative accent line */}
        <div className="mt-4 mx-auto w-32 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_#22d3ee] opacity-60" />
      </div>
      
      <div className="text-slate-400 font-mono text-lg md:text-xl max-w-2xl mb-10 relative z-10 h-8">
        <span className="text-cyan-500">&lt;Role&gt;</span> {text}
        <span className="animate-pulse text-cyan-400">_</span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 mb-14 z-20">
        <MagneticWrapper>
            <ScrambleLink 
              href="https://github.com/vikrantwiz02" 
              text="GITHUB"
              className="block px-5 py-3 rounded-full border border-slate-700 bg-slate-900/50 text-slate-400 hover:text-white hover:border-cyan-500 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300"
            />
        </MagneticWrapper>

        <MagneticWrapper>
            <ScrambleLink 
              href="https://www.linkedin.com/in/vikrantwiz02" 
              text="LINKEDIN"
              className="block px-5 py-3 rounded-full border border-slate-700 bg-slate-900/50 text-slate-400 hover:text-white hover:border-cyan-500 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300"
            />
        </MagneticWrapper>
        
        <MagneticWrapper>
            <button
            onClick={() => setIsResumeOpen(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-cyan-500/50 bg-gradient-to-r from-cyan-950/40 to-purple-950/20 text-cyan-400 font-mono text-sm tracking-wider hover:from-cyan-500/20 hover:to-purple-500/10 hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] transition-all duration-300 group"
            >
            <Eye size={18} className="group-hover:animate-pulse" />
            <span>VIEW_RESUME</span>
            </button>
        </MagneticWrapper>
      </div>

      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      <p className="text-slate-500 max-w-md mx-auto mb-14 text-sm md:text-base leading-relaxed">
        Building scalable systems at IIIT Jabalpur. <br/>
        <span className="text-glow text-cyan-400/90 font-medium">Problem Solver • Full-Stack Architect • Tech Innovator</span>
      </p>

      <div className="animate-bounce mt-2 text-cyan-500/60">
        <ChevronDown size={28} strokeWidth={1.5} />
      </div>
    </section>
  );
};