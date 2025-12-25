import React from 'react';
import { PROJECTS, TECH_RESOURCES } from '../../utils/constants';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-32 bg-background overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20">
        
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
             <div>
                 <h2 className="text-5xl md:text-7xl font-black text-textMain mt-3 tracking-tighter">Selected Works</h2>
             </div>
             <p className="text-textMuted text-base max-w-lg text-right hidden md:block border-l-4 border-border pl-8 py-2">
               A curation of full-stack AI orchestrations and neural engineering benchmarks.
             </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {PROJECTS.map((project, index) => {
            const hasLive = !!project.links.live;
            const hasGithub = !!project.links.github;
            
            let linkUrl = '#';
            let Icon = ArrowUpRight;
            
            if (hasLive) {
                linkUrl = project.links.live!;
                Icon = ArrowUpRight;
            } else if (hasGithub) {
                linkUrl = project.links.github!;
                Icon = Github;
            }

            const direction = index % 2 === 0 ? 'left' : 'right';

            return (
                <ScrollReveal key={project.id} delay={index * 150} direction={direction}>
                  <div className="group flex flex-col h-full bg-surface border border-border rounded-[3rem] overflow-hidden hover:border-accent/40 hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4">
                  
                    <div className="p-10 sm:p-14 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-12">
                            <div>
                                <h3 className="text-3xl sm:text-4xl font-black text-textMain mb-4 tracking-tight group-hover:text-accent transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-xs font-black text-secondary font-mono bg-background inline-block px-4 py-1.5 rounded-full border border-border uppercase tracking-widest">
                                    {project.date}
                                </p>
                            </div>
                            
                            {(hasLive || hasGithub) && (
                                <a 
                                    href={linkUrl}
                                    target="_blank"
                                    rel="noreferrer" 
                                    className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary text-primary-foreground hover:bg-accent transition-all transform hover:rotate-12 shadow-2xl shrink-0"
                                    aria-label="View Project"
                                >
                                    <Icon className="w-7 h-7" />
                                </a>
                            )}
                        </div>
                        
                        <p className="text-secondary mb-12 leading-relaxed text-base sm:text-lg font-medium flex-grow">
                            {project.description}
                        </p>

                        <div className="space-y-4 mb-12 bg-background/50 p-6 sm:p-8 rounded-[2rem] border border-border">
                            {project.keyPoints.slice(0, 3).map((point, i) => (
                                <div key={i} className="flex items-start text-xs sm:text-sm text-textMuted leading-relaxed">
                                    <span className="mr-4 mt-2 w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 opacity-60"></span>
                                    {point}
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-3 pt-10 border-t border-border mt-auto">
                            {project.tech.map((t) => (
                                <a
                                  key={t}
                                  href={TECH_RESOURCES[t] || '#'}
                                  target="_blank"
                                  rel="noreferrer" 
                                  className="group/tag text-[10px] font-black text-textMain bg-background px-4 py-2 rounded-xl border border-border shadow-sm uppercase tracking-widest hover:border-accent hover:text-accent transition-colors flex items-center gap-2"
                                >
                                {t}
                                {TECH_RESOURCES[t] && <ExternalLink className="w-3 h-3 opacity-0 group-hover/tag:opacity-100 transition-opacity" />}
                                </a>
                            ))}
                        </div>
                    </div>
                  </div>
                </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;