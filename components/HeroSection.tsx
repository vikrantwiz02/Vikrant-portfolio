import React, { useState, useEffect } from 'react';
import { ChevronDown, Download } from 'lucide-react';
import { GlitchText, MagneticWrapper, ScrambleLink, WireframeTesseract } from './NeuralCore';
import { PROFILE_IMAGE } from '../constants';

const FloatingData = () => {
  const dataPoints = [
    { text: '0x4F2A', top: '10%', left: '10%' },
    { text: 'REACT_V19', top: '20%', left: '80%' },
    { text: 'SYS_RDY', top: '80%', left: '15%' },
    { text: 'AWS_CLOUD', top: '70%', left: '85%' },
    { text: '0010110', top: '40%', left: '5%' },
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

export const HeroSection = ({ isScrolling }: { isScrolling: boolean }) => {
  const [text, setText] = useState('');
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

      <div className="relative w-32 h-32 md:w-40 md:h-40 mb-10 z-20 group cursor-default mt-16 md:mt-0">
          {/* Outer Rotating Ring */}
          <div className="absolute inset-[-10px] rounded-full border-2 border-cyan-500/20 border-t-transparent animate-spin-slow" />
          
          {/* Counter-Rotating Ring */}
          <div className="absolute inset-[-4px] rounded-full border border-cyan-400/10 border-b-transparent animate-[spin_8s_linear_infinite_reverse]" />
          
          {/* Main Image Container */}
          <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-cyan-500/50 bg-black/80 backdrop-blur-sm shadow-[0_0_30px_rgba(34,211,238,0.2)] group-hover:shadow-[0_0_50px_rgba(34,211,238,0.5)] transition-shadow duration-500">
             
             {/* Scanline Overlay */}
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent z-10 animate-scan opacity-50 pointer-events-none" style={{ backgroundSize: '100% 3px' }} />
             
             {/* The Image */}
             <img 
               src={PROFILE_IMAGE} 
               alt="Operator Identity" 
               className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-out scale-105 group-hover:scale-100"
             />
             
             {/* Glitch Overlay Effect on Hover */}
             <div className="absolute inset-0 bg-cyan-500/20 opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-300" />
          </div>

          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-black border border-cyan-500/30 text-[8px] font-mono text-cyan-400 rounded-sm">
            ID: AUTHENTICATED
          </div>
      </div>

      <div className="mb-8 relative">
        <div className={`absolute inset-0 bg-cyan-500 blur-[80px] opacity-20 rounded-full transition-opacity duration-300 ${!isScrolling ? 'animate-pulse-fast' : ''}`}></div>
        <div className="relative z-10 font-sans">
          <h1 className={`text-6xl md:text-8xl font-bold tracking-tighter text-white transition-all duration-300 ${!isScrolling ? 'animate-pulse-fast' : ''}`}>
             <GlitchText text="VIKRANT" /> <span className="text-cyan-400">KUMAR</span>
          </h1>
        </div>
      </div>
      
      <div className="text-slate-400 font-mono text-lg md:text-xl max-w-2xl mb-8 relative z-10 h-8">
        <span className="text-cyan-500">&lt;Role&gt;</span> {text}
        <span className="animate-pulse">_</span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 mb-12 z-20">
        <MagneticWrapper>
            <ScrambleLink 
              href="https://github.com/vikrantwiz02" 
              text="GITHUB"
              className="block p-3 rounded-full border border-slate-700 bg-slate-900/50 text-slate-400 hover:text-white hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]"
            />
        </MagneticWrapper>

        <MagneticWrapper>
            <ScrambleLink 
              href="https://www.linkedin.com/in/vikrantwiz02" 
              text="LINKEDIN"
              className="block p-3 rounded-full border border-slate-700 bg-slate-900/50 text-slate-400 hover:text-white hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]"
            />
        </MagneticWrapper>
        
        <MagneticWrapper>
            <a
            href="#"
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-cyan-500/50 bg-cyan-950/30 text-cyan-400 font-mono text-sm tracking-wider hover:bg-cyan-500/20 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-300"
            >
            <Download size={18} />
            <span>DOWNLOAD_Resume</span>
            </a>
        </MagneticWrapper>
      </div>

      <p className="text-slate-500 max-w-md mx-auto mb-12 text-sm md:text-base leading-relaxed">
        Building scalable systems at IIIT Jabalpur. <br/>
        <span className="text-cyan-500/80">Problem Solver • Full-Stack Architect • Tech Innovator</span>
      </p>

      <div className="animate-bounce mt-4 text-cyan-500/50">
        <ChevronDown size={32} />
      </div>
    </section>
  );
};