import React from 'react';
import { EXPERIENCE, TECH_RESOURCES } from '../../utils/constants';
import { Briefcase, Calendar, ExternalLink } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-32 bg-surface border-t border-border overflow-x-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20">
        
        {/* Header */}
        <ScrollReveal direction="left">
          <div className="mb-24">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6">
               <div>
                  <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-border bg-surface/80 backdrop-blur-md shadow-xl transition-all duration-300 cursor-default mb-8">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-500 shadow-[0_0_12px_rgba(234,179,8,0.9)]"></span>
                      </span>
                      <span className="text-[11px] font-black font-mono text-secondary tracking-[0.3em] uppercase">Status: Production_Active</span>
                  </div>
                  
                  <span className="text-secondary text-xs font-mono uppercase tracking-[0.4em] block mb-2">Track Record</span>
                  <h2 className="text-5xl md:text-7xl font-black text-textMain tracking-tighter">Experience</h2>
               </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="relative border-l border-border/50 ml-4 md:ml-0 md:pl-0 space-y-24">
          {EXPERIENCE.map((exp, index) => (
            <div key={exp.id} className="relative pl-10 md:pl-0 group">
              <ScrollReveal delay={index * 100} direction="right">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0">
                    {/* Date Column (Desktop) */}
                    <div className="hidden md:block md:col-span-3 text-right pr-16 pt-2 relative">
                         <p className="text-xs font-black font-mono text-textMuted group-hover:text-textMain transition-colors uppercase tracking-[0.2em]">{exp.duration}</p>
                         <div className="absolute top-3 -right-[7px] w-3.5 h-3.5 rounded-full bg-background border-2 border-border group-hover:border-accent group-hover:scale-125 transition-all z-10 shadow-sm"></div>
                    </div>

                    {/* Content Column */}
                    <div className="md:col-span-9 md:pl-16 md:border-l md:border-border/50">
                        <div className="md:hidden flex items-center text-[11px] text-textMuted font-black font-mono mb-6 uppercase tracking-[0.3em]">
                          <Calendar className="w-4 h-4 mr-2 text-accent" />
                          {exp.duration}
                        </div>

                        <div className="md:hidden absolute -left-[6px] top-2 w-3 h-3 rounded-full bg-background border-2 border-border z-10"></div>

                        <div className="bg-background/40 backdrop-blur-xl border border-border p-8 sm:p-12 rounded-[3rem] hover:border-accent/30 hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] transition-all duration-700 transform hover:-translate-y-3 group">
                            <h3 className="text-2xl sm:text-4xl font-black text-textMain tracking-tight mb-2">
                              {exp.role}
                            </h3>
                            <div className="flex items-center gap-3 mb-10">
                              <Briefcase className="w-5 h-5 text-accent" />
                              <p className="text-lg sm:text-2xl text-secondary font-bold">{exp.company}</p>
                            </div>

                            <ul className="space-y-6 mb-12">
                              {exp.points.map((point, i) => (
                                  <li key={i} className="text-secondary flex items-start leading-relaxed text-sm sm:text-lg">
                                  <span className="mr-5 mt-3 w-2 h-2 bg-accent rounded-full flex-shrink-0 opacity-50 shadow-[0_0_8px_var(--accent-color)]"></span>
                                  <span>{point}</span>
                                  </li>
                              ))}
                            </ul>

                            <div className="flex flex-wrap gap-3 pt-8 border-t border-border/50">
                              {exp.tech.map((t) => (
                                  <a 
                                    key={t}
                                    href={TECH_RESOURCES[t] || '#'}
                                    target="_blank"
                                    rel="noreferrer" 
                                    className="group/tag px-5 py-2 text-[10px] font-black rounded-xl bg-surface text-secondary border border-border uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all duration-500 cursor-pointer flex items-center gap-2"
                                  >
                                    {t}
                                    {TECH_RESOURCES[t] && <ExternalLink className="w-3 h-3 opacity-0 group-hover/tag:opacity-100 transition-opacity" />}
                                  </a>
                              ))}
                            </div>
                        </div>
                    </div>
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;