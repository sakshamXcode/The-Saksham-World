import React, { useState, useEffect } from 'react';
import { X, Send, ArrowRight, Sparkles, CheckCircle, AlertCircle, Mail } from 'lucide-react';
import emailjs from '@emailjs/browser';
import RobotAvatar from '../features/RobotAvatar';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(0); // 0: Name, 1: Message + Email, 2: Sent
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Load saved user identity on mount
  useEffect(() => {
      if (isOpen) {
          const savedName = localStorage.getItem('alex_visitor_name');
          const savedEmail = localStorage.getItem('alex_visitor_email');
          
          if (savedName) {
              setName(savedName);
              if (savedEmail) setEmail(savedEmail);
              setStep(1); // Auto-skip intro if we know them
          } else {
              setStep(0);
          }
      }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNext = (e: React.FormEvent) => {
      e.preventDefault();
      if (name.trim()) {
          localStorage.setItem('alex_visitor_name', name);
          setStep(1);
      }
  };

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    if (email.trim()) {
        if (!validateEmail(email)) {
            setErrorMsg("Provide a valid email please");
            return;
        }
        localStorage.setItem('alex_visitor_email', email);
    }
    
    setIsSending(true);
    setErrorMsg(null);

    // --- EMAILJS CONFIGURATION ---
    // Please set these variables in your .env file
    const YOUR_SERVICE_ID = (import.meta as any).env?.VITE_EMAILJS_SERVICE_ID; 
    const YOUR_TEMPLATE_ID = (import.meta as any).env?.VITE_EMAILJS_TEMPLATE_ID; 
    const YOUR_PUBLIC_KEY = (import.meta as any).env?.VITE_EMAILJS_PUBLIC_KEY;
    
    const replyToEmail = email.trim() || 'sakshamsingh4848@gmail.com';
    const userEmailLabel = email.trim() || 'Not Provided';

    try {
        if (!YOUR_SERVICE_ID) {
            console.warn("⚠️ EmailJS Keys missing. Check your .env configuration.");
            throw new Error("Email service not configured.");
        }
        
        await emailjs.send(
            YOUR_SERVICE_ID,
            YOUR_TEMPLATE_ID,
            {
                from_name: name,
                to_name: "Saksham Singh", 
                message: feedback,
                user_email: userEmailLabel,
                reply_to: replyToEmail 
            },
            YOUR_PUBLIC_KEY
        );
        
        setIsSending(false);
        setStep(2);
        setTimeout(() => {
            handleClose();
        }, 3500);

    } catch (err: any) {
        console.error("Email Error:", err);
        setIsSending(false);
        setErrorMsg("System Offline: Unable to deliver mail. Please try again later.");
    }
  };

  const handleClose = () => {
      onClose();
      // Reset logic: clear feedback/errors but keep name in state (and localStorage)
      setTimeout(() => {
          setFeedback('');
          setErrorMsg(null);
          // If the user hasn't entered a name yet, reset step to 0
          if (!localStorage.getItem('alex_visitor_name')) {
             setStep(0);
             setName('');
          }
      }, 500);
  };

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-6">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-fade-in" onClick={handleClose}></div>
        
        {/* Modal Card */}
        <div className="relative w-full max-w-lg bg-surface border-4 border-accent/20 rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.3)] p-8 sm:p-10 animate-float-up overflow-hidden">
            
            {/* Close Button */}
            <button 
                onClick={handleClose} 
                className="absolute top-6 right-6 p-2 bg-background border-2 border-border rounded-full text-textMuted hover:text-accent hover:border-accent transition-all z-20 hover:rotate-90 active:scale-75"
            >
                <X className="w-5 h-5" />
            </button>

            {/* Header Content */}
            <div className="flex flex-col items-center text-center mb-6">
                 {/* Dynamic Robot Avatar based on step */}
                <div className="w-24 h-24 mb-4 relative">
                     <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full animate-pulse-slow"></div>
                     <RobotAvatar 
                        mode={step === 2 ? 'dance' : step === 1 ? 'talking' : 'idle'} 
                        className="relative z-10 text-accent"
                     />
                </div>
                
                {step === 0 && (
                    <>
                        <h3 className="text-2xl font-black text-textMain tracking-tight mb-2 flex items-center gap-2 justify-center">
                            Hello there! <Sparkles className="w-5 h-5 text-yellow-400 fill-yellow-400 animate-spin-slow" />
                        </h3>
                        <p className="text-sm text-secondary font-medium max-w-xs">
                            I'm Alex, your digital postman! Before you give your valuable feedback, what should I call you?
                        </p>
                    </>
                )}

                {step === 1 && (
                    <>
                        <h3 className="text-2xl font-black text-textMain tracking-tight mb-2">
                            Hey {name}!
                        </h3>
                        <p className="text-sm text-secondary font-medium">
                            I'm ready to deliver your message to Mr. Singh.
                        </p>
                    </>
                )}
            </div>

            {/* Form Steps */}
            <div className="relative z-10">
                {step === 0 && (
                     <form onSubmit={handleNext} className="animate-fade-in flex flex-col gap-6">
                         <div className="relative group">
                            <input 
                                type="text" 
                                autoFocus
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Type your name..."
                                className="w-full text-center bg-background border-2 border-border border-dashed focus:border-solid focus:border-accent rounded-2xl text-xl font-bold text-textMain outline-none py-4 px-6 transition-all placeholder:text-textMuted/40 shadow-inner"
                            />
                         </div>
                         <button 
                            type="submit"
                            disabled={!name.trim()}
                            className="w-full py-4 bg-accent text-white font-black rounded-2xl hover:bg-accent/90 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent/20 flex items-center justify-center gap-2"
                        >
                            Continue <ArrowRight className="w-5 h-5" />
                        </button>
                     </form>
                )}

                {step === 1 && (
                    <form onSubmit={handleSubmit} className="animate-fade-in flex flex-col gap-4">
                        <div className="relative">
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email (Optional - for replies)"
                                className="w-full bg-background border-2 border-border focus:border-accent rounded-xl px-4 py-3 pl-10 text-sm font-medium text-textMain outline-none transition-all placeholder:text-textMuted/60"
                            />
                            <Mail className="w-4 h-4 text-textMuted absolute left-3 top-3.5" />
                        </div>

                        <textarea 
                            autoFocus
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Type your message here..."
                            className="w-full h-32 bg-background border-2 border-border focus:border-accent rounded-2xl p-5 text-base font-medium text-textMain outline-none transition-all resize-none placeholder:text-textMuted/40 shadow-inner"
                        />
                        
                        {errorMsg && (
                            <div className="flex items-center gap-2 text-red-500 text-xs font-bold animate-pulse justify-center">
                                <AlertCircle className="w-4 h-4" /> {errorMsg}
                            </div>
                        )}

                        <div className="flex gap-3 mt-2">
                            {/* Option to go back and change name is still useful, but minimal */}
                            <button 
                                type="button" 
                                onClick={() => setStep(0)} 
                                className="px-4 py-4 rounded-2xl border-2 border-border text-textMuted font-bold hover:bg-background hover:text-textMain transition-all active:scale-95"
                                title="Change Name"
                            >
                                <ArrowRight className="w-4 h-4 rotate-180" />
                            </button>
                            <button 
                                type="submit" 
                                disabled={isSending || !feedback.trim()}
                                className="flex-1 py-4 bg-accent text-white font-black rounded-2xl hover:bg-accent/90 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent/20 flex items-center justify-center gap-2"
                            >
                                {isSending ? (
                                    <span className="animate-pulse">Dispatching...</span>
                                ) : (
                                    <>
                                        Deliver Mail <Send className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                )}

                {step === 2 && (
                    <div className="py-6 flex flex-col items-center text-center animate-fade-in">
                        <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4 animate-bounce">
                            <CheckCircle className="w-8 h-8" />
                        </div>
                        <h4 className="text-2xl font-black text-textMain mb-2">Message Delivered!</h4>
                        <p className="text-secondary font-medium">
                            I've dropped it right in Mr. Singh's inbox.
                        </p>
                    </div>
                )}
            </div>
            
            {/* Decorative Blobs */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-accent opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500 opacity-5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
        </div>
    </div>
  );
};

export default FeedbackModal;