import React, { useState, useEffect, useMemo } from 'react';
import { X, ChevronRight, ChevronLeft, MessageSquare, RotateCcw } from 'lucide-react';
import { TOUR_STEPS } from '../../utils/constants';
import RobotAvatar from '../features/RobotAvatar';

interface TourOverlayProps {
  onClose: () => void;
  onOpenChat: () => void;
  onUpdateRemark: (remark: string | null) => void;
}

const BOASTFUL_REMARKS = [
    "Mr. Singh is an engineering wizard.",
    "His code is poetry.",
    "92% reduction? Logical genius.",
    "Data prediction is light work for him.",
    "He's the architect of these systems."
];

const TourOverlay: React.FC<TourOverlayProps> = ({ onClose, onOpenChat, onUpdateRemark }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentBoast = useMemo(() => {
    return BOASTFUL_REMARKS[Math.floor(Math.random() * BOASTFUL_REMARKS.length)];
  }, [currentStep]);

  useEffect(() => {
    if (!isFinished) {
        const step = TOUR_STEPS[currentStep];
        const element = document.getElementById(step.id);
        if (element) {
            const offset = window.innerWidth < 640 ? 120 : 180;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - offset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
        onUpdateRemark(currentBoast);
    }
  }, [currentStep, isFinished, onUpdateRemark, currentBoast]);

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
        setCurrentStep(prev => prev + 1);
    } else {
        setIsFinished(true);
        onUpdateRemark(null);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
        setCurrentStep(prev => prev - 1);
    }
  };

  const handleRestart = () => {
      setIsFinished(false);
      setCurrentStep(0);
  };

  // Fixed mobile placement to top to avoid floating in front of central content or bottom buttons
  const cardBaseStyles = "fixed z-[180] animate-fade-in sm:left-10 sm:top-32 left-1/2 top-24 -translate-x-1/2 sm:translate-x-0 w-[92%] sm:w-[360px]";

  if (isFinished) {
      return (
        <div className={cardBaseStyles}>
            <div className="bg-surface/95 backdrop-blur-[40px] border border-white/10 p-8 rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.4)] flex flex-col items-center text-center">
                <div className="w-14 h-14 mb-4"><RobotAvatar mode="dance" /></div>
                <h3 className="text-sm font-black text-textMain mb-2 uppercase tracking-widest">Protocol Success</h3>
                <p className="text-textMuted text-[11px] mb-8 leading-relaxed">Overview complete. ALEX is ready for direct context interaction.</p>
                <div className="flex flex-col gap-3 w-full">
                    <button onClick={() => { onClose(); onOpenChat(); }} className="flex items-center justify-center gap-3 px-6 py-5 rounded-2xl bg-primary text-primary-foreground hover:bg-accent transition-all text-[10px] font-black uppercase tracking-widest shadow-xl">
                        <MessageSquare className="w-4 h-4" /> Ask ALEX
                    </button>
                    <button onClick={handleRestart} className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl border border-white/10 hover:bg-white/5 transition-colors text-[10px] font-black uppercase tracking-widest">
                        <RotateCcw className="w-4 h-4" /> Restart
                    </button>
                </div>
            </div>
        </div>
      );
  }

  const step = TOUR_STEPS[currentStep];

  return (
    <div className={cardBaseStyles}>
        <div className="bg-surface/95 backdrop-blur-[40px] border border-white/10 rounded-[3rem] shadow-[0_60px_120px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="h-1.5 bg-white/5 w-full">
                <div className="h-full bg-accent transition-all duration-700 shadow-[0_0_15px_rgba(59,130,246,0.5)]" style={{ width: `${((currentStep + 1) / TOUR_STEPS.length) * 100}%` }}></div>
            </div>
            
            <div className="p-7 sm:p-9">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-surface/80 rounded-2xl p-1.5 border border-white/5 shadow-inner">
                            <RobotAvatar mode="static" className="text-accent" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-widest text-accent">STEP-0{currentStep + 1}</span>
                            <span className="text-[8px] text-textMuted uppercase font-mono tracking-tighter">ALEX_GUIDE</span>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-textMuted transition-all active:scale-75"><X className="w-5 h-5" /></button>
                </div>

                <h3 className="text-base font-black text-textMain mb-3 tracking-tight uppercase leading-tight">{step.title}</h3>
                <p className="text-textMuted text-[12px] leading-relaxed mb-8 font-medium opacity-90">{step.msg}</p>

                <div className="flex justify-between items-center pt-6 border-t border-white/5">
                    <button onClick={handlePrev} disabled={currentStep === 0} className="p-4 rounded-2xl bg-surface border border-white/10 text-textMuted hover:text-textMain disabled:opacity-10 transition-all active:scale-90">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={handleNext} className="flex items-center gap-3 px-7 py-4 bg-primary text-primary-foreground rounded-2xl hover:bg-accent transition-all active:scale-95 text-[11px] font-black uppercase tracking-widest shadow-lg">
                        {currentStep === TOUR_STEPS.length - 1 ? 'Finish' : 'Next Node'} <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default TourOverlay;