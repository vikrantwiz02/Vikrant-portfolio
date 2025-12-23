import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const useAudio = () => {
  const playSound = useCallback((type: 'hover' | 'click' | 'type') => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      const now = ctx.currentTime;
      
      if (type === 'hover') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
        gain.gain.setValueAtTime(0.02, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'click') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === 'type') {
         osc.type = 'triangle';
         osc.frequency.setValueAtTime(600, now);
         gain.gain.setValueAtTime(0.01, now);
         gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
         osc.start(now);
         osc.stop(now + 0.03);
      }
    } catch (e) {
      // Audio context might be blocked
    }
  }, []);
  
  return playSound;
};

/* --- 1. System Boot Sequence (Modified) --- */
export const BootSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const play = useAudio();
  
  useEffect(() => {
    const bootLines = [
      "INITIALIZING NEURAL KERNEL...",
      "LOADING ASSETS [||||||||||] 100%",
      "BYPASSING SECURITY PROTOCOLS...",
      "ESTABLISHING UPLINK...",
      "SYSTEM READY."
    ];
    
    let delay = 0;
    bootLines.forEach((line, index) => {
      delay += Math.random() * 500 + 300;
      setTimeout(() => {
        setLines(prev => [...prev, line]);
        play('type');
        if (index === bootLines.length - 1) {
          setTimeout(onComplete, 800);
        }
      }, delay);
    });
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[99999] bg-black flex items-center justify-center font-mono text-cyan-500 p-8">
       <div className="w-full max-w-lg">
          {lines.map((line, i) => (
            <div key={i} className="mb-2 border-l-2 border-cyan-500 pl-2 animate-pulse">
               <span className="text-white opacity-50 text-xs mr-2">
                 {new Date().toLocaleTimeString()} ::
               </span>
               {line}
            </div>
          ))}
          <div className="h-4 w-3 bg-cyan-500 animate-pulse mt-4 inline-block" />
       </div>
    </div>
  );
};

/* --- 2. Sonar Pulse System --- */
export const SonarPulse: React.FC = () => {
    const [ripples, setRipples] = useState<{x: number, y: number, id: number}[]>([]);
    
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const id = Date.now();
            setRipples(prev => [...prev, { x: e.clientX, y: e.clientY, id }]);
            setTimeout(() => {
                setRipples(prev => prev.filter(r => r.id !== id));
            }, 1000);
        };
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9990] overflow-hidden">
            {ripples.map(r => (
                <div 
                    key={r.id}
                    className="absolute border border-cyan-400 rounded-full animate-ping opacity-0"
                    style={{
                        left: r.x,
                        top: r.y,
                        width: '20px',
                        height: '20px',
                        transform: 'translate(-50%, -50%)',
                        animationDuration: '1s'
                    }}
                />
            ))}
        </div>
    );
};

/* --- 3. Command Terminal (Ctrl+K) --- */
// Helper for autocorrect (Levenshtein Distance)
const levenshtein = (a: string, b: string): number => {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
      }
    }
  }
  return matrix[b.length][a.length];
};

export const CommandTerminal: React.FC<{ isOpen: boolean, onClose: () => void, onNavigate: (id: string) => void, onThemeChange: (h: number) => void }> = ({ isOpen, onClose, onNavigate, onThemeChange }) => {
    const [input, setInput] = useState('');
    const [hint, setHint] = useState('');
    const [statusMsg, setStatusMsg] = useState(''); 
    const inputRef = useRef<HTMLInputElement>(null);
    const play = useAudio();

    const COMMANDS = [
      'hero', 'about', 'experience', 'skills', 'projects', 'achievements', 'contact',
      'goto', 'theme cyan', 'theme green', 'theme red', 'theme purple', 'exit'
    ];

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
            setInput('');
            setHint('');
            setStatusMsg('');
        }
    }, [isOpen]);

    // Hint Logic
    useEffect(() => {
        if (!input) {
            setHint('');
            return;
        }
        const lowerInput = input.toLowerCase();
        const match = COMMANDS.find(c => c.startsWith(lowerInput));
        if (match) {
            setHint(match);
        } else {
            setHint('');
        }
    }, [input]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            if (hint) {
                setInput(hint);
            }
        } else if (e.key === 'Enter') {
            play('click');
            let cmd = input.toLowerCase().trim();
            const sections = ['hero', 'about', 'experience', 'skills', 'projects', 'achievements', 'contact'];
            
            // Autocorrect Logic
            if (!COMMANDS.includes(cmd) && !cmd.startsWith('goto') && !cmd.startsWith('theme')) {
                 let bestMatch = '';
                 let minDist = 3; // Tolerance threshold
                 
                 for (const section of sections) {
                     const dist = levenshtein(cmd, section);
                     if (dist < minDist) {
                         minDist = dist;
                         bestMatch = section;
                     }
                 }
                 
                 if (bestMatch) {
                     // Notify user of correction
                     setStatusMsg(`Autocorrecting: "${cmd}" -> "${bestMatch}"`);
                     cmd = bestMatch; // Use corrected command
                     // Clear message after brief delay
                     setTimeout(() => setStatusMsg(''), 1500);
                 }
            }

            // Execution Logic
            if (sections.includes(cmd)) {
                onNavigate(cmd);
                onClose();
            } else if (cmd.startsWith('goto ')) {
                const target = cmd.replace('goto ', '').trim();
                // Check fuzzy match for goto target
                let bestTarget = target;
                if (!sections.includes(target)) {
                    let minTargetDist = 3;
                    for (const section of sections) {
                         const dist = levenshtein(target, section);
                         if (dist < minTargetDist) {
                             minTargetDist = dist;
                             bestTarget = section;
                         }
                    }
                }
                
                if (sections.includes(bestTarget)) {
                    onNavigate(bestTarget);
                    onClose();
                }
            } else if (cmd === 'theme red') {
                onThemeChange(180);
                onClose();
            } else if (cmd === 'theme green') {
                onThemeChange(-60);
                onClose();
            } else if (cmd === 'theme purple') {
                onThemeChange(90);
                onClose();
            } else if (cmd === 'theme cyan') {
                onThemeChange(0);
                onClose();
            } else if (cmd === 'exit') {
                onClose();
            }
            
            if(!statusMsg) setInput('');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-charcoal border border-cyan-500/50 rounded-lg p-6 shadow-[0_0_50px_rgba(34,211,238,0.2)]">
                <div className="flex justify-between items-center mb-4">
                    <div className="text-cyan-500 font-mono text-xs">NEURAL_COMMAND_INTERFACE v1.2</div>
                    {statusMsg && <div className="text-orange-400 font-mono text-xs animate-pulse">{statusMsg}</div>}
                </div>
                
                <div className="flex items-center gap-2 font-mono text-xl text-white relative">
                    <span className="text-cyan-400 whitespace-nowrap">root@neural-flow:~#</span>
                    
                    <div className="relative flex-1">
                        {/* Ghost Text Overlay */}
                        <div className="absolute inset-0 pointer-events-none flex items-center text-xl">
                            {/* Invisible span to push ghost text to correct position */}
                            <span className="opacity-0 whitespace-pre">{input}</span>
                            {/* Visible ghost text */}
                            <span className="text-slate-600 opacity-50">{input && hint ? hint.slice(input.length) : ''}</span>
                        </div>
                        
                        <input 
                            ref={inputRef}
                            type="text" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full bg-transparent border-none outline-none text-white placeholder-slate-800 relative z-10"
                            placeholder="Type command..."
                            spellCheck={false}
                            autoComplete="off"
                        />
                    </div>
                </div>
                <div className="mt-4 flex justify-between text-xs text-slate-500 font-mono">
                    <span>COMMANDS: [section], theme [color], exit</span>
                    <span>[TAB] to autocomplete</span>
                </div>
            </div>
        </div>
    );
};

/* --- 4. Idle Screen --- */
export const IdleScreen: React.FC = () => {
    const [idle, setIdle] = useState(false);
    
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        const resetTimer = () => {
            setIdle(false);
            clearTimeout(timer);
            timer = setTimeout(() => setIdle(true), 20000); // 20s idle
        };
        
        window.addEventListener('mousemove', resetTimer);
        window.addEventListener('keydown', resetTimer);
        window.addEventListener('scroll', resetTimer);
        
        timer = setTimeout(() => setIdle(true), 20000);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('mousemove', resetTimer);
            window.removeEventListener('keydown', resetTimer);
            window.removeEventListener('scroll', resetTimer);
        };
    }, []);

    if (!idle) return null;

    return (
        <div className="fixed inset-0 z-[11000] bg-black flex flex-col items-center justify-center pointer-events-none">
            <div className="text-cyan-500 font-mono text-4xl animate-pulse tracking-widest">SYSTEM STANDBY</div>
            <div className="text-cyan-900 font-mono text-sm mt-4">Awaiting Input...</div>
        </div>
    );
};

/* --- 5. Wireframe Tesseract --- */
export const WireframeTesseract: React.FC = () => {
    return (
        <div className="scene-3d opacity-60 hover:opacity-100 transition-opacity duration-500">
            <div className="cube">
                <div className="cube-face face-front"></div>
                <div className="cube-face face-back"></div>
                <div className="cube-face face-right"></div>
                <div className="cube-face face-left"></div>
                <div className="cube-face face-top"></div>
                <div className="cube-face face-bottom"></div>
            </div>
        </div>
    );
};

/* --- 6. Scramble Link --- */
export const ScrambleLink: React.FC<{ href: string, text: string, className?: string }> = ({ href, text, className }) => {
    const [displayText, setDisplayText] = useState(text);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>";
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const play = useAudio();

    const handleEnter = () => {
        play('hover');
        let iteration = 0;
        if (intervalRef.current) clearInterval(intervalRef.current);
        
        intervalRef.current = setInterval(() => {
            setDisplayText(text.split("").map((letter, index) => {
                if (index < iteration) return text[index];
                return chars[Math.floor(Math.random() * chars.length)];
            }).join(""));
            
            if (iteration >= text.length) {
                if (intervalRef.current) clearInterval(intervalRef.current);
            }
            iteration += 1 / 3;
        }, 30);
    };

    const handleLeave = () => {
        setDisplayText(text);
        if (intervalRef.current) clearInterval(intervalRef.current);
    };

    return (
        <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            className={`font-mono transition-colors ${className}`}
        >
            {displayText}
        </a>
    );
};

/* --- 7. Constellation Network (Optimized) --- */
export const Constellation: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Debounce resize to avoid thrashing
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        // Reduced points for performance
        const points: {x: number, y: number, vx: number, vy: number}[] = [];
        const pointCount = window.innerWidth < 768 ? 15 : 30; // Fewer points on mobile
        
        for (let i = 0; i < pointCount; i++) {
            points.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.4, // Slower movement
                vy: (Math.random() - 0.5) * 0.4
            });
        }

        let mouse = { x: 0, y: 0 };
        const handleMove = (e: MouseEvent) => { mouse = { x: e.clientX, y: e.clientY }; };
        window.addEventListener('mousemove', handleMove);

        let animationFrameId: number;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(34, 211, 238, 0.4)';
            ctx.strokeStyle = 'rgba(34, 211, 238, 0.1)';

            points.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
                ctx.fill();

                // Connect to mouse
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            });
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[1] opacity-30" />;
};

/* --- 8. Hex Skill Node --- */
export const HexNode: React.FC<{ level: number, label: string, icon: React.ElementType }> = ({ level, label, icon: Icon }) => {
    return (
        <div className="flex flex-col items-center gap-2 group cursor-none">
            <div className="relative w-24 h-24 flex items-center justify-center">
                {/* Hexagon Shape */}
                <div className="absolute inset-0 bg-slate-800 hex-node transform scale-90 group-hover:scale-100 transition-transform duration-300" />
                <div 
                    className="absolute inset-0 bg-cyan-900/50 hex-node transform scale-0 group-hover:scale-100 transition-transform duration-500 origin-center" 
                />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center">
                     <Icon className="text-cyan-400 mb-1 group-hover:text-white transition-colors" size={24} />
                     <span className="text-[10px] font-mono text-cyan-200">{level}%</span>
                </div>
                
                {/* Active Border */}
                <div className="absolute inset-0 border-2 border-cyan-500/30 hex-node pointer-events-none group-hover:border-cyan-400 transition-colors" />
            </div>
            <span className="text-xs font-mono text-slate-400 group-hover:text-cyan-400 transition-colors tracking-widest uppercase">{label.split('/')[0]}</span>
        </div>
    );
};

/* --- 9. Scroll Progress Line --- */
export const ScrollProgress: React.FC = () => {
    const { scrollYProgress } = useTransform(useMotionValue(0), [0, 1], [0, 1]) as any; // Using simplified hook access in App
    const scaleX = useSpring(useMotionValue(0), { stiffness: 100, damping: 30, restDelta: 0.001 });

    useEffect(() => {
        const handleScroll = () => {
             const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
             scaleX.set(window.scrollY / scrollMax);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scaleX]);

    return (
        <motion.div 
            className="fixed top-0 left-0 right-0 h-1 bg-cyan-400 origin-left z-[99999] shadow-[0_0_10px_#22d3ee]"
            style={{ scaleX }}
        />
    );
};

/* --- EXISTING COMPONENTS RETAINED --- */

export const DecryptionText: React.FC<{ text: string, className?: string }> = ({ text, className = '' }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
  
  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(text.split("").map((letter, index) => {
        if (index < iteration) return text[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(""));
      
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <span className={`font-mono ${className}`}>{displayText}</span>;
};

export const MagneticWrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const play = useAudio();

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.2, y: y * 0.2 });
  };

  const handleMouseEnter = () => play('hover');

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const HoloCard: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className = '', onClick }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  return (
    <div style={{ perspective: 1000 }} className={className} onClick={onClick}>
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
        onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            x.set(e.clientX - rect.left - rect.width / 2);
            y.set(e.clientY - rect.top - rect.height / 2);
        }}
        onMouseLeave={() => {
            x.set(0);
            y.set(0);
        }}
      >
        <ExpanseWindow className="h-full">
           {children}
        </ExpanseWindow>
      </motion.div>
    </div>
  );
};

export const BinaryRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Debounce resize
    const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Increase spacing to reduce draw calls
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(1);
    let animationFrameId: number;

    // Throttled draw loop (30fps is fine for background rain)
    let lastDrawTime = 0;
    const animate = (timestamp: number) => {
      if (timestamp - lastDrawTime > 40) { // ~25 FPS
        ctx.fillStyle = 'rgba(5, 5, 5, 0.1)'; // Stronger fade trace
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0F0'; 
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          const text = Math.random() > 0.5 ? '1' : '0';
          ctx.fillStyle = `rgba(34, 211, 238, ${Math.random() * 0.5})`; 
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);

          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
        lastDrawTime = timestamp;
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);

    return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-10 pointer-events-none" />;
};

export const SystemLogger: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  
  useEffect(() => {
    const addLog = (msg: string) => {
        setLogs(prev => [msg, ...prev].slice(0, 5));
    };

    const handleClick = () => addLog(`CLICK_EVENT detected at ${new Date().toLocaleTimeString()}`);
    // Debounce scroll log to save render cycles
    let scrollTimeout: ReturnType<typeof setTimeout>;
    const handleScroll = () => { 
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if(Math.random() > 0.8) addLog(`SCROLL_Y: ${window.scrollY.toFixed(0)}`);
        }, 500);
    };
    
    window.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
        window.removeEventListener('click', handleClick);
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed bottom-12 right-6 w-48 font-mono text-[9px] text-cyan-900 pointer-events-none z-50 hidden md:block">
       <div className="border-b border-cyan-900/30 mb-1">SYS_LOG_STREAM</div>
       {logs.map((log, i) => (
           <div key={i} className="opacity-70 truncate"> {`> ${log}`} </div>
       ))}
    </div>
  );
};

export const FloatingRunes: React.FC = () => {
  // Use CSS Animation instead of JS for smoother infinite float
  return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {Array.from({length: 6}).map((_, i) => (
            <div
               key={i}
               className="absolute text-cyan-900/20 text-4xl font-mono animate-float"
               style={{
                   left: `${Math.random() * 100}vw`,
                   top: `${Math.random() * 100}vh`,
                   animationDelay: `${Math.random() * 5}s`,
                   animationDuration: `${10 + Math.random() * 10}s`
               }}
            >
               {['∆', '∑', '∏', 'Ω', '◊', '∫'][i]}
            </div>
        ))}
      </div>
  );
}

export const NeuralThread: React.FC<{ scrollProgress: number }> = ({ scrollProgress }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 flex justify-center">
      <div className="w-0.5 h-full bg-slate-800/30 relative">
        <div 
          className="absolute top-0 w-full bg-gradient-to-b from-orange-500 via-orange-400 to-transparent shadow-[0_0_15px_rgba(249,115,22,0.6)] transition-all duration-100 ease-out animate-glow-line-orange"
          style={{ height: `${scrollProgress * 100}%` }}
        />
      </div>
    </div>
  );
};

export const NeuralNode: React.FC<{ active: boolean }> = ({ active }) => {
  return (
    <div className={`
      relative z-10 w-4 h-4 rounded-full border-2 
      transition-all duration-700 ease-in-out
      ${active ? 'border-cyan-400 bg-obsidian shadow-[0_0_20px_rgba(34,211,238,0.8)] scale-125' : 'border-slate-700 bg-obsidian scale-100'}
    `}>
      {active && (
        <div className="absolute inset-0 rounded-full animate-ping bg-cyan-500/30" />
      )}
    </div>
  );
};

export const ExpanseWindow: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({ children, className = '', style }) => {
  return (
    <div 
      className={`
        group relative overflow-hidden rounded-xl 
        bg-charcoal/40 backdrop-blur-md 
        border border-white/5 
        transition-all duration-500 ease-out
        hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:scale-[1.02]
        ${className}
      `}
      style={style}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/0 group-hover:border-cyan-500/50 group-hover:w-4 group-hover:h-4 transition-all duration-500" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500/0 group-hover:border-cyan-500/50 group-hover:w-4 group-hover:h-4 transition-all duration-500" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500/0 group-hover:border-cyan-500/50 group-hover:w-4 group-hover:h-4 transition-all duration-500" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/0 group-hover:border-cyan-500/50 group-hover:w-4 group-hover:h-4 transition-all duration-500" />
      {children}
    </div>
  );
};

export const CyberCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Throttled mouse move for cursor performance
    let animationFrameId: number;
    const updatePosition = (e: MouseEvent) => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
          setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', updateHoverState);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', updateHoverState);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div 
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ transform: `translate(${position.x - 4}px, ${position.y - 4}px)` }}
      />
      <div 
        className={`fixed top-0 left-0 border border-cyan-500/50 rounded-full pointer-events-none z-[9999] transition-all duration-300 ease-out mix-blend-difference ${isHovering ? 'w-12 h-12 bg-cyan-500/20' : 'w-8 h-8'}`}
        style={{ 
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`
        }}
      />
      <div 
        className={`fixed top-0 left-0 w-[1px] h-4 bg-cyan-400 pointer-events-none z-[9999] transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
        style={{ transform: `translate(${position.x}px, ${position.y - 20}px) translate(-50%, 0)` }}
      />
       <div 
        className={`fixed top-0 left-0 w-[1px] h-4 bg-cyan-400 pointer-events-none z-[9999] transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
        style={{ transform: `translate(${position.x}px, ${position.y + 6}px) translate(-50%, 0)` }}
      />
       <div 
        className={`fixed top-0 left-0 w-4 h-[1px] bg-cyan-400 pointer-events-none z-[9999] transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
        style={{ transform: `translate(${position.x - 20}px, ${position.y}px) translate(0, -50%)` }}
      />
       <div 
        className={`fixed top-0 left-0 w-4 h-[1px] bg-cyan-400 pointer-events-none z-[9999] transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
        style={{ transform: `translate(${position.x + 6}px, ${position.y}px) translate(0, -50%)` }}
      />
    </>
  );
};

export const GlitchText: React.FC<{ text: string, className?: string }> = ({ text, className = '' }) => {
  return (
    <span className={`glitch-text inline-block relative ${className}`} data-text={text}>
      {text}
    </span>
  );
};