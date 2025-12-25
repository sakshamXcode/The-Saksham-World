import React, { useState, useEffect } from 'react';
import { Wifi, Cpu, Terminal, ShieldCheck, Zap, Server } from 'lucide-react';

interface BootSequenceProps {
  onComplete: () => void;
  isAssetLoaded: boolean;
}

const BOOT_LOGS = [
    "Stealing pixels from the void...",
    "Calibrating the 'Cool Factor'...",
    "Generating 8K aesthetics...",
    "Indexing Mr. Singh's brain...",
    "Optimizing sarcasm module...",
    "Enabling Light & Dark Matrix...",
    "Polishing the UI chrome...",
    "All Systems Green. Let's roll."
];

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete, isAssetLoaded }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentStep < BOOT_LOGS.length) {
      // FAST BOOT: 0.3s to 0.6s per message
      const delay = Math.random() * 300 + 300; 
      const timeout = setTimeout(() => {
        setMessages(prev => [...prev, BOOT_LOGS[currentStep]]);
        setCurrentStep(prev => prev + 1);
        setProgress((prev) => Math.min(95, prev + (100 / BOOT_LOGS.length)));
      }, delay); 
      return () => clearTimeout(timeout);
    }
  }, [currentStep]);

  useEffect(() => {
    if (currentStep >= BOOT_LOGS.length && isAssetLoaded) {
        setProgress(100);
        const timer = setTimeout(onComplete, 500); // Shorter completion delay
        return () => clearTimeout(timer);
    }
  }, [currentStep, isAssetLoaded, onComplete]);

  return (
    <div className="fixed inset-0 bg-background z-[200] flex flex-col items-center justify-center font-mono p-4 overflow-hidden select-none">
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--accent-color)_0%,transparent_100%)] opacity-5 blur-[100px] animate-pulse-slow pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10 flex flex-col items-center">
        
        {/* Icon Header */}
        <div className="mb-12 relative">
            <div className="absolute inset-0 bg-accent blur-xl opacity-20 animate-pulse"></div>
            <div className="relative w-20 h-20 bg-surface border border-border rounded-3xl flex items-center justify-center shadow-2xl">
                <Cpu className="w-10 h-10 text-accent animate-spin-slow" />
            </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full mb-8 space-y-2">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-textMuted">
                <span>Alex_OS_Boot</span>
                <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1 w-full bg-border rounded-full overflow-hidden">
                <div 
                    className="h-full bg-accent transition-all duration-200 ease-linear shadow-[0_0_10px_var(--accent-color)]" 
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>

        {/* Logs */}
        <div className="w-full h-32 flex flex-col items-center justify-start space-y-2 overflow-hidden mask-image-b-0">
             {messages.slice(-4).map((msg, idx) => (
                 <div key={idx} className="animate-float-up flex items-center gap-3">
                     <span className={`w-1.5 h-1.5 rounded-full ${idx === messages.slice(-4).length - 1 ? 'bg-accent animate-pulse' : 'bg-border'}`}></span>
                     <span className={`text-xs font-bold tracking-wide ${idx === messages.slice(-4).length - 1 ? 'text-textMain' : 'text-textMuted/50'}`}>
                        {msg}
                     </span>
                 </div>
             ))}
             {currentStep >= BOOT_LOGS.length && !isAssetLoaded && (
                 <div className="animate-pulse text-xs font-black text-accent mt-2 tracking-widest uppercase">
                     Syncing Assets...
                 </div>
             )}
        </div>

        {/* Footer */}
        <div className="absolute -bottom-32 flex gap-8 text-border opacity-50">
            <Server className="w-4 h-4" />
            <Wifi className="w-4 h-4" />
            <ShieldCheck className="w-4 h-4" />
        </div>

      </div>
    </div>
  );
};

export default BootSequence;