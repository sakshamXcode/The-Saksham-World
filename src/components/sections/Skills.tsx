import React from 'react';
import { SKILLS, EDUCATION, CERTIFICATES, TECH_RESOURCES } from '../../utils/constants';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import ScrollReveal from '../ui/ScrollReveal';

const coreCompetencyData = [
    { subject: 'Frontend', A: 90, fullMark: 100 },
    { subject: 'Backend', A: 85, fullMark: 100 },
    { subject: 'AI/ML', A: 80, fullMark: 100 },
    { subject: 'DSA', A: 95, fullMark: 100 },
    { subject: 'Database', A: 75, fullMark: 100 },
    { subject: 'DevOps', A: 60, fullMark: 100 },
];

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-32 bg-background border-t border-border">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
            {/* Skills & Stats */}
            <div>
                <ScrollReveal>
                  <div className="mb-12">
                      <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-border bg-surface/80 backdrop-blur-md shadow-xl hover:scale-105 transition-transform duration-300 cursor-default mb-8">
                          <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.9)]"></span>
                          </span>
                          <span className="text-xs font-black font-mono text-secondary tracking-[0.2em] uppercase">System: Initialized</span>
                      </div>
                      <span className="text-secondary text-xs font-mono uppercase tracking-[0.4em]">Arsenal</span>
                      <h2 className="text-5xl font-black text-textMain mt-3 tracking-tighter">Technical Stack</h2>
                  </div>
                </ScrollReveal>
                
                <ScrollReveal delay={200}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
                      {SKILLS.map((category) => (
                          <div key={category.name} className="p-8 rounded-[2.5rem] border border-border hover:border-accent/30 hover:shadow-2xl transition-all duration-500 bg-surface/30 group">
                              <h3 className="text-accent font-black text-[11px] mb-5 uppercase tracking-[0.2em]">{category.name}</h3>
                              <div className="flex flex-wrap gap-3">
                                  {category.skills.map(skill => (
                                      <a 
                                        key={skill}
                                        href={TECH_RESOURCES[skill] || '#'}
                                        target="_blank"
                                        rel="noreferrer" 
                                        className="text-xs font-bold text-secondary bg-background px-3 py-1.5 rounded-xl border border-border group-hover:text-textMain hover:border-accent hover:text-accent transition-colors cursor-pointer"
                                      >
                                          {skill}
                                      </a>
                                  ))}
                              </div>
                          </div>
                      ))}
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={400}>
                  <div className="p-10 rounded-[3rem] border border-border h-[400px] relative bg-surface/50 shadow-inner group overflow-hidden">
                      <h3 className="text-secondary text-[11px] font-black uppercase tracking-[0.3em] absolute top-10 left-10">Competency Radar</h3>
                      <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                         <div className="w-full h-full bg-[radial-gradient(circle_at_center,var(--accent-color)_0%,transparent_70%)]"></div>
                      </div>
                      <ResponsiveContainer width="100%" height="100%">
                          <RadarChart cx="50%" cy="55%" outerRadius="75%" data={coreCompetencyData}>
                              <PolarGrid stroke="var(--border-color)" strokeDasharray="3 3" />
                              <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-muted)', fontSize: 12, fontWeight: 900, letterSpacing: '0.1em' }} />
                              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                              <Radar
                                  name="Saksham"
                                  dataKey="A"
                                  stroke="var(--accent-color)"
                                  strokeWidth={3}
                                  fill="var(--accent-color)"
                                  fillOpacity={0.1}
                              />
                              <Tooltip 
                                  contentStyle={{ 
                                      backgroundColor: 'var(--bg-color)', 
                                      borderColor: 'var(--accent-color)', 
                                      color: 'var(--text-main)',
                                      borderRadius: '20px',
                                      fontSize: '12px',
                                      fontWeight: 'bold',
                                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                                      borderWidth: '2px'
                                  }}
                                  itemStyle={{ color: 'var(--accent-color)' }}
                              />
                          </RadarChart>
                      </ResponsiveContainer>
                  </div>
                </ScrollReveal>
            </div>

            {/* Education & Certs */}
            <div className="space-y-16 lg:space-y-24">
                 <ScrollReveal delay={200}>
                   <div>
                      <div className="mb-12">
                           <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-border bg-surface/80 backdrop-blur-md shadow-xl hover:scale-105 transition-transform duration-300 cursor-default mb-8">
                              <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500 shadow-[0_0_12px_rgba(20,184,166,0.9)]"></span>
                              </span>
                              <span className="text-xs font-black font-mono text-secondary tracking-[0.2em] uppercase">Auth: Certified</span>
                          </div>
                          <span className="text-secondary text-xs font-mono uppercase tracking-[0.4em]">Foundation</span>
                          <h2 className="text-5xl font-black text-textMain mt-3 tracking-tighter">Education</h2>
                      </div>
                      
                      <div className="space-y-8">
                          {EDUCATION.map((edu, idx) => (
                              <div key={idx} className="p-10 rounded-[2.5rem] border border-border bg-surface/30 hover:border-accent/40 transition-all duration-500 shadow-sm hover:shadow-xl">
                                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                                      <h3 className="text-xl sm:text-2xl font-black text-textMain tracking-tight leading-tight">{edu.degree}</h3>
                                      <span className="text-accent font-mono font-black text-xs border border-accent/20 px-4 py-1.5 rounded-full bg-accent/5">{edu.score}</span>
                                  </div>
                                  <p className="text-secondary text-base sm:text-lg font-bold">{edu.institution}</p>
                                  <p className="text-xs text-textMuted mt-6 font-mono font-bold tracking-widest uppercase">{edu.duration}</p>
                              </div>
                          ))}
                      </div>
                   </div>
                 </ScrollReveal>

                 <ScrollReveal delay={400}>
                   <div>
                      <h3 className="text-2xl font-black text-textMain mb-10 flex items-center gap-4">
                          Certifications
                          <div className="h-px flex-1 bg-border/50"></div>
                      </h3>
                       <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {CERTIFICATES.map((cert, idx) => (
                              <li key={idx} className="flex items-center gap-4 p-6 rounded-[1.5rem] border border-border bg-surface/30 hover:bg-surface transition-all duration-300 hover:scale-[1.02]">
                                  <div className="w-2 h-2 bg-accent rounded-full shadow-[0_0_8px_var(--accent-color)]"></div>
                                  <p className="text-secondary text-sm font-bold leading-relaxed">{cert}</p>
                              </li>
                          ))}
                       </ul>
                   </div>
                 </ScrollReveal>
            </div>
        </div>

      </div>
    </section>
  );
};
export default Skills;