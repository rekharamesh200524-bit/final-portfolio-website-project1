import React from 'react';
import type { PortfolioData } from '../../types';
import { motion } from 'framer-motion';
import { Mail, MapPin, ExternalLink, Briefcase, GraduationCap, Globe } from 'lucide-react';

export const ModernSidebarTheme: React.FC<{ data: PortfolioData }> = ({ data }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Fixed Sidebar */}
      <aside className="w-full md:w-80 lg:w-96 md:h-screen md:sticky md:top-0 bg-white border-r border-slate-200 p-8 flex flex-col justify-between z-10">
        <div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 rounded-2xl mb-8 flex items-center justify-center text-white text-4xl font-black shadow-xl rotate-3" style={{ backgroundColor: data.primaryColor }}>
              {data.name.charAt(0)}
            </div>
            <h1 className="text-3xl font-black text-slate-900 leading-tight mb-2">{data.name}</h1>
            <p className="text-lg font-medium mb-6" style={{ color: data.primaryColor }}>{data.title}</p>
            <p className="text-slate-500 leading-relaxed mb-8">{data.bio}</p>
          </motion.div>

          <div className="space-y-4">
            {data.location && (
              <div className="flex items-center gap-3 text-slate-400">
                <MapPin size={18} />
                <span className="text-sm">{data.location}</span>
              </div>
            )}
            {data.email && (
              <a href={`mailto:${data.email}`} className="flex items-center gap-3 text-slate-400 hover:text-slate-900 transition-colors">
                <Mail size={18} />
                <span className="text-sm">{data.email}</span>
              </a>
            )}
          </div>
        </div>

        <div className="mt-12 md:mt-0 pt-8 border-t border-slate-100 flex gap-4">
          {data.socialLinks.github && (
            <a href={data.socialLinks.github} target="_blank" rel="noreferrer" className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all">
              <Globe size={20} />
            </a>
          )}
          {data.socialLinks.linkedin && (
            <a href={data.socialLinks.linkedin} target="_blank" rel="noreferrer" className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all">
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 md:p-16 lg:p-24 space-y-24">
        {/* Experience Section */}
        {data.experience.length > 0 && (
          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-12 flex items-center gap-3">
              <Briefcase size={16} /> Experience
            </h2>
            <div className="space-y-12">
              {data.experience.map((exp, idx) => (
                <motion.div 
                  key={exp.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative pl-8 border-l border-slate-200"
                >
                  <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-slate-300" style={{ backgroundColor: data.primaryColor }} />
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                    <h3 className="text-xl font-bold text-slate-900">{exp.role}</h3>
                    <span className="text-sm font-bold text-slate-400">{exp.duration}</span>
                  </div>
                  <p className="font-bold mb-4" style={{ color: data.primaryColor }}>{exp.company}</p>
                  <p className="text-slate-500 leading-relaxed max-w-2xl">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Grid */}
        <section>
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-12">Projects</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {data.projects.map((project, idx) => (
              <motion.a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-8 bg-white border border-slate-200 rounded-[32px] hover:border-slate-900 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-black text-slate-900 leading-tight">{project.title}</h3>
                    <ExternalLink size={20} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
                  </div>
                  <p className="text-slate-500 mb-8">{project.description}</p>
                </div>
                <div className="text-sm font-bold flex items-center gap-2" style={{ color: data.primaryColor }}>
                  View Project <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* Skills & Education */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-12">Skills</h2>
            <div className="space-y-6">
              {data.skills.map((skill) => (
                <div key={skill.id} className="space-y-2">
                  <div className="flex justify-between text-sm font-bold text-slate-700">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: data.primaryColor }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {data.education.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-12 flex items-center gap-3">
                <GraduationCap size={16} /> Education
              </h2>
              <div className="space-y-8">
                {data.education.map((edu) => (
                  <div key={edu.id} className="border-l-2 pl-6" style={{ borderColor: `${data.primaryColor}33` }}>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{edu.degree}</h3>
                    <p className="text-slate-500 mb-2">{edu.school}</p>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-wider">{edu.year}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};
