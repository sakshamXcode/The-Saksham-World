import React, { useState } from 'react';
import { SOCIAL_LINKS } from '../../utils/constants';
import ScrollReveal from '../ui/ScrollReveal';
import { Mail, ArrowUp, Copy, Check, Radio } from 'lucide-react';

interface ContactProps {
    onOpenFeedback: () => void;
}

const Contact: React.FC<ContactProps> = ({ onOpenFeedback }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
      navigator.clipboard.writeText('sakshamsingh4848@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="bg-surface border-t border-border pt-32 pb-16 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
            
            <div className="max-w-2xl">
              <div className="flex gap-3 mb-10 dark:hidden opacity-60">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
              </div>

              <h2 className="text-5xl md:text-7xl font-black text-textMain mb-10 tracking-tighter leading-[0.9]">Let's build something extraordinary.</h2>
              <p className="text-secondary text-xl md:text-2xl leading-relaxed mb-14 font-medium">
                Currently exploring high-impact AI opportunities. If you're looking for an engineer to architect neural systems or full-stack agents, let's connect.
              </p>
              
              <div className="flex flex-col gap-8">
                  {/* Primary CTA - Opens Modal */}
                  <div>
                    <button 
                        onClick={onOpenFeedback}
                        className="inline-flex items-center gap-5 px-10 py-6 bg-primary text-primary-foreground font-black rounded-[2rem] hover:bg-accent transition-all transform hover:scale-[1.02] active:scale-95 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] uppercase tracking-widest text-sm group"
                    >
                        <Radio className="w-6 h-6 animate-pulse" />
                        <span>Initialize Transmission</span>
                    </button>
                    <p className="text-[10px] text-textMuted font-mono mt-3 uppercase tracking-wider pl-4">
                        *Secure channel via ALEX AI
                    </p>
                  </div>

                  {/* Manual Override - The Quirky Email Copy */}
                  <div className="p-6 rounded-[2rem] border border-dashed border-border bg-surface/50 max-w-md hover:border-accent/40 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                        <p className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">Manual Override Protocol</p>
                      </div>
                      <p className="text-sm text-textMuted mb-4 leading-relaxed">
                          Prefer standard SMTP packets? You can bypass the AI and ping the mainframe directly:
                      </p>
                      <button 
                        onClick={handleCopyEmail}
                        className="flex items-center justify-between w-full p-4 bg-background border border-border rounded-xl group hover:border-accent transition-all active:scale-95"
                      >
                          <span className="font-mono text-sm font-bold text-textMain">sakshamsingh4848@gmail.com</span>
                          {copied ? (
                              <div className="flex items-center gap-2 text-green-500 text-xs font-black uppercase tracking-wider">
                                  <Check className="w-4 h-4" /> Copied
                              </div>
                          ) : (
                              <div className="flex items-center gap-2 text-textMuted group-hover:text-accent text-xs font-black uppercase tracking-wider transition-colors">
                                  <Copy className="w-4 h-4" /> Copy
                              </div>
                          )}
                      </button>
                  </div>
              </div>
            </div>

            <div className="w-full md:w-auto pt-10">
               <h3 className="text-xs font-black uppercase text-accent tracking-[0.4em] mb-10">Direct Socials</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6">
                  {SOCIAL_LINKS.map(link => (
                      <a 
                          key={link.name} 
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="group flex items-center gap-6 text-textMuted hover:text-textMain transition-all"
                      >
                          <span className="p-4 bg-background border border-border rounded-2xl group-hover:border-accent/40 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all">
                              <link.icon className="w-6 h-6" />
                          </span>
                          <span className="text-xl font-black tracking-tight">{link.name}</span>
                      </a>
                  ))}
               </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="border-t border-border pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
            <span className="text-textMain font-black text-lg tracking-tight uppercase">Saksham Singh<span className="text-accent">.</span></span>
            <span className="hidden md:inline text-border">/</span>
            <span className="text-textMuted text-sm font-bold uppercase tracking-widest">Full Stack AI Engineer</span>
          </div>
          
          <div className="flex items-center gap-8">
             <p className="text-[10px] text-textMuted font-black uppercase tracking-[0.5em]">
                © {new Date().getFullYear()} CORE_VERSION_74
             </p>
             <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="p-5 bg-background border border-border rounded-full text-textMain hover:bg-primary hover:text-primary-foreground transition-all shadow-xl active:scale-75 group"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
              </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;