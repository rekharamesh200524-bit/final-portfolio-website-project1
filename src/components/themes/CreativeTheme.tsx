import React from 'react';
import type { PortfolioData } from '../../types';
import { motion } from 'framer-motion';

export const CreativeTheme: React.FC<{ data: PortfolioData }> = ({ data }) => {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${data.primaryColor}, #3b82f6)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  const bgGradientStyle = {
    background: `linear-gradient(to right, ${data.primaryColor}, #3b82f6)`
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans p-6 md:p-12 overflow-hidden relative selection:text-white" style={{ '--tw-selection-backgroundColor': data.primaryColor } as any}>
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px]" style={{ backgroundColor: `${data.primaryColor}33` }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] bg-blue-600/20" />

      <div className="max-w-5xl mx-auto relative z-10">
        <header className="py-20 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-800 pb-12">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4" style={gradientStyle}>{data.name}</h1>
            <p className="text-2xl md:text-3xl font-medium text-slate-400">
              {data.title} {data.company && <span className="text-slate-500 text-xl block mt-2">@ {data.company}</span>}
            </p>
            {data.location && <p className="text-slate-500 mt-2 flex items-center gap-2">📍 {data.location}</p>}
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }} className="flex flex-wrap gap-6">
            {data.email && <a href={`mailto:${data.email}`} className="text-slate-400 transition-colors hover:text-white">Email</a>}
            {data.resumeLink && <a href={data.resumeLink} target="_blank" rel="noreferrer" className="text-slate-400 transition-colors hover:text-white">Resume</a>}
            {data.socialLinks.github && <a href={data.socialLinks.github} target="_blank" rel="noreferrer" className="text-slate-400 transition-colors hover:text-white">GitHub</a>}
            {data.socialLinks.linkedin && <a href={data.socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 transition-colors hover:text-white">LinkedIn</a>}
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16 pb-20">
          <div className="md:col-span-1 space-y-12">
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
              <h2 className="text-xl font-bold mb-6 uppercase tracking-widest text-slate-500 text-sm">About</h2>
              <p className="text-lg leading-relaxed text-slate-300 bg-slate-800/40 p-6 rounded-3xl border border-slate-700/50 backdrop-blur-sm italic">
                "{data.bio}"
              </p>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
              <h2 className="text-xl font-bold mb-6 uppercase tracking-widest text-slate-500 text-sm">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map(s => (
                  <span key={s.id} className="px-4 py-2 bg-slate-800 rounded-full text-sm font-medium border border-slate-700 hover:border-slate-500 transition-colors">
                    {s.name}
                  </span>
                ))}
              </div>
            </motion.section>

            {data.education && data.education.length > 0 && (
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
                <h2 className="text-xl font-bold mb-6 uppercase tracking-widest text-slate-500 text-sm">Education</h2>
                <div className="space-y-4">
                  {data.education.map(edu => (
                    <div key={edu.id} className="border-l-2 border-slate-800 pl-4 py-1">
                      <h4 className="font-bold text-slate-200">{edu.degree}</h4>
                      <p className="text-sm text-slate-400">{edu.school}</p>
                      <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-tighter">{edu.year}</p>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          <div className="md:col-span-2 space-y-16">
            {data.experience && data.experience.length > 0 && (
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}>
                <h2 className="text-4xl font-black mb-10 tracking-tight" style={gradientStyle}>Experience</h2>
                <div className="space-y-6">
                  {data.experience.map(exp => (
                    <div key={exp.id} className="p-8 bg-slate-800/20 border border-slate-800 rounded-[32px] hover:bg-slate-800/40 transition-all">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold">{exp.role}</h3>
                          <p className="text-slate-400 font-medium" style={{ color: data.primaryColor }}>{exp.company}</p>
                        </div>
                        <span className="text-sm font-black text-slate-500 uppercase mt-2 md:mt-0">{exp.duration}</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }}>
              <h2 className="text-4xl font-black mb-10 tracking-tight" style={gradientStyle}>Projects</h2>
              <div className="grid grid-cols-1 gap-6">
                {data.projects.map(p => (
                  <a key={p.id} href={p.link} className="group p-8 bg-slate-800/20 border border-slate-800 rounded-[32px] hover:border-slate-600 transition-all relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                      <span style={{ color: data.primaryColor }}>→</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{p.title}</h3>
                    <p className="text-slate-400">{p.description}</p>
                  </a>
                ))}
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
};
