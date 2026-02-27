import React, { useState, useEffect } from 'react';
import { X, Download, Maximize2, Minimize2, FileText, Loader2, ExternalLink } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.dispatchEvent(new CustomEvent('modal-open'));
    } else {
      document.body.style.overflow = 'unset';
      window.dispatchEvent(new CustomEvent('modal-close'));
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[15000] overflow-hidden">
      <div 
        className="fixed inset-0 bg-black/95 backdrop-blur-md transition-opacity" 
        onClick={onClose} 
      />
      
      {/* Modal Content */}
      <div className={`fixed transition-all duration-500 ease-out ${
        isFullscreen 
          ? 'inset-x-1 top-14 bottom-10 md:inset-x-2' 
          : 'inset-x-2 top-16 bottom-10 md:inset-x-6 md:top-20 md:bottom-10 lg:inset-x-10'
      }`}>
        <div className="relative w-full h-full flex flex-col rounded-xl border border-cyan-500/30 bg-slate-950 shadow-[0_0_80px_rgba(34,211,238,0.15)] overflow-hidden">

          <div className="flex items-center justify-between px-3 md:px-4 py-3 bg-slate-900/80 border-b border-cyan-500/20">
            {/* Left: traffic lights (desktop only) + title */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Mobile close button — only on mobile, no traffic lights */}
              <button
                onClick={onClose}
                className="md:hidden p-1.5 rounded border border-red-500/50 bg-red-950/30 text-red-400 hover:bg-red-500/20 transition-all duration-300"
              >
                <X size={14} />
              </button>

              {/* Desktop traffic lights — red dot is the only close button */}
              <div className="hidden md:flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 cursor-pointer transition-colors" onClick={onClose} title="Close" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>

              <div className="flex items-center gap-2 md:ml-2">
                <FileText size={14} className="text-cyan-400" />
                <span className="font-mono text-[10px] md:text-xs text-cyan-300 tracking-wider">
                  RESUME<span className="hidden sm:inline">_VIEWER.exe</span>
                </span>
              </div>
            </div>

            {/* Right: fullscreen + download only (no close button here) */}
            <div className="flex items-center gap-1 md:gap-2">
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="hidden md:flex p-2 rounded-lg border border-slate-700 bg-slate-800/50 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300"
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>

              <a
                href="/Vikrant-Resume.pdf"
                download="Vikrant_Kumar_Resume.pdf"
                className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 rounded-lg border border-cyan-500/50 bg-cyan-950/30 text-cyan-400 font-mono text-[10px] md:text-xs tracking-wider hover:bg-cyan-500/20 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-300"
              >
                <Download size={14} />
                <span>DOWNLOAD</span>
              </a>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="relative flex-1 bg-slate-900/50 overflow-auto">
            {isLoading && !isMobile && (
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

            {isMobile ? (
              <div className="w-full h-full flex flex-col">
                <iframe
                  src={`https://docs.google.com/viewer?url=${encodeURIComponent(window.location.origin + '/Vikrant-Resume.pdf')}&embedded=true`}
                  className="w-full h-full border-0"
                  title="Resume"
                  onLoad={() => setIsLoading(false)}
                />

                <div className="absolute bottom-16 left-0 right-0 flex justify-center pointer-events-none">
                  <a
                    href="/Vikrant-Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan-500/50 bg-slate-950/90 text-cyan-400 font-mono text-xs tracking-wider hover:bg-cyan-500/20 transition-all duration-300 opacity-0 hover:opacity-100 focus:opacity-100"
                  >
                    <ExternalLink size={14} />
                    <span>OPEN_IN_NEW_TAB</span>
                  </a>
                </div>
              </div>
            ) : (
              <iframe
                src="/Vikrant-Resume.pdf#toolbar=0&navpanes=0"
                className="w-full h-full"
                title="Resume"
                onLoad={() => setIsLoading(false)}
              />
            )}
          </div>

          {/* Footer Status Bar */}
          <div className="flex items-center justify-between px-3 md:px-4 py-2 bg-slate-900/80 border-t border-cyan-500/20 font-mono text-[8px] md:text-[10px] text-slate-500">
            <div className="flex items-center gap-2 md:gap-4">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="hidden xs:inline">SECURE</span>
              </span>
              <span className="hidden md:inline text-cyan-500/50">|</span>
              <span className="hidden md:inline">PDF_RENDERER_v2.0</span>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <span className="text-cyan-400">VIKRANT</span>
              <span className="text-slate-600">•</span>
              <span className="hidden sm:inline">FULL_STACK_</span>DEV
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
