import React, { useState, useEffect } from 'react';
import { X, Download, Maximize2, Minimize2, FileText, Loader2 } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[12000] overflow-hidden">
      <div 
        className="fixed inset-0 bg-black/95 backdrop-blur-md transition-opacity" 
        onClick={onClose} 
      />
      
      {/* Modal Content */}
      <div className={`fixed transition-all duration-500 ease-out ${
        isFullscreen 
          ? 'inset-1 md:inset-2' 
          : 'inset-2 md:inset-4 lg:inset-6 xl:inset-10'
      }`}>
        <div className="relative w-full h-full flex flex-col rounded-xl border border-cyan-500/30 bg-slate-950 shadow-[0_0_80px_rgba(34,211,238,0.15)] overflow-hidden">

          <div className="flex items-center justify-between px-4 py-3 bg-slate-900/80 border-b border-cyan-500/20">
            <div className="flex items-center gap-3">
              {/* Terminal dots */}
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 cursor-pointer transition-colors" onClick={onClose} />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              
              <div className="hidden sm:flex items-center gap-2 ml-2">
                <FileText size={14} className="text-cyan-400" />
                <span className="font-mono text-xs text-cyan-300 tracking-wider">
                  RESUME_VIEWER.exe
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 rounded-lg border border-slate-700 bg-slate-800/50 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300"
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>

              <a
                href="/Vikrant__Resume.pdf"
                download="Vikrant_Kumar_Resume.pdf"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan-500/50 bg-cyan-950/30 text-cyan-400 font-mono text-xs tracking-wider hover:bg-cyan-500/20 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-300"
              >
                <Download size={14} />
                <span className="hidden sm:inline">DOWNLOAD</span>
              </a>

              <button
                onClick={onClose}
                className="p-2 rounded-lg border border-slate-700 bg-slate-800/50 text-slate-400 hover:text-red-400 hover:border-red-500/50 transition-all duration-300"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="relative flex-1 bg-slate-900/50">
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 z-10">
                <div className="relative">
                  <div className="w-16 h-16 border-2 border-cyan-500/20 rounded-full" />
                  <div className="absolute inset-0 w-16 h-16 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                  <Loader2 className="absolute inset-0 m-auto w-6 h-6 text-cyan-400 animate-pulse" />
                </div>
                <p className="mt-4 font-mono text-sm text-cyan-400 animate-pulse">
                  LOADING_RESUME...
                </p>
                <div className="mt-2 font-mono text-xs text-slate-500">
                  [DECRYPTING DATA STREAM]
                </div>
              </div>
            )}

            <div className="absolute inset-0 pointer-events-none z-20 opacity-[0.03]">
              <div className="w-full h-full" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34, 211, 238, 0.1) 2px, rgba(34, 211, 238, 0.1) 4px)',
              }} />
            </div>

            <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-cyan-500/30 pointer-events-none" />
            <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-cyan-500/30 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-cyan-500/30 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-cyan-500/30 pointer-events-none" />

            {/* PDF Iframe */}
            <iframe
              src="/Vikrant__Resume.pdf#toolbar=0&navpanes=0"
              className="w-full h-full"
              title="Resume"
              onLoad={() => setIsLoading(false)}
            />
          </div>

          {/* Footer Status Bar */}
          <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 border-t border-cyan-500/20 font-mono text-[10px] text-slate-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                SECURE_CONNECTION
              </span>
              <span className="hidden sm:inline text-cyan-500/50">|</span>
              <span className="hidden sm:inline">PDF_RENDERER_v2.0</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-cyan-400">VIKRANT_KUMAR</span>
              <span className="text-slate-600">•</span>
              <span>FULL_STACK_DEVELOPER</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
