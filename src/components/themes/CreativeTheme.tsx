import React from 'react';
import { PortfolioData } from '../../types';
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
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4" style={gradientStyle}>
              {data.name}
            </h1>
            <p className="text-2xl md:text-3xl font-medium text-slate-400">
              {data.title} {data.company && <span className="text-slate-500 text-xl block mt-2">@ {data.company}</span>}
            </p>
            {data.location && <p className="text-slate-500 mt-2 flex items-center gap-2">📍 {data.location}</p>}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-wrap gap-6"
          >
            {data.email && <a href={`mailto:${data.email}`} className="text-slate-400 transition-colors hover:text-white" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = data.primaryColor} onMouseOut={(e) => e.currentTarget.style.color = ''}>Email</a>}
            {data.resumeLink && <a href={data.resumeLink} target="_blank" rel="noreferrer" className="text-slate-400 transition-colors hover:text-white" onMouseOver={(e) => e.currentTarget.style.color = data.primaryColor} onMouseOut={(e) => e.currentTarget.style.color = ''}>Resume</a>}
            {data.socialLinks.github && <a href={data.socialLinks.github} target="_blank" rel="noreferrer" className="text-slate-400 transition-colors hover:text-white" onMouseOver={(e) => e.currentTarget.style.color = data.primaryColor} onMouseOut={(e) => e.currentTarget.style.color = ''}>GitHub</a>}
            {data.socialLinks.linkedin && <a href={data.socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 transition-colors hover:text-white" onMouseOver={(e) => e.currentTarget.style.color = data.primaryColor} onMouseOut={(e) => e.currentTarget.style.color = ''}>LinkedIn</a>}
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
          <motion.div 
            className="md:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-xl font-bold mb-6" style={{ color: data.primaryColor }}>About Me</h2>
            <p className="text-lg leading-relaxed text-slate-300 bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
              {data.bio}
            </p>

            <h2 className="text-xl font-bold mt-12 mb-6 text-blue-400">Superpowers</h2>
            <div className="flex flex-col gap-4 bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
              {data.skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-slate-500">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <motion.div 
                      className="h-2 rounded-full"
                      style={bgGradientStyle}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.8 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="md:col-span-2 space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-3xl font-black mb-8" style={gradientStyle}>Featured Projects</h2>
            <div className="grid grid-cols-1 gap-8">
              {data.projects.map((project, index) => (
                <motion.a 
                  href={project.link} 
                  target="_blank" 
                  rel="noreferrer"
                  key={project.id} 
                  className="group block relative p-8 rounded-3xl bg-slate-800/30 border border-slate-700 hover:bg-slate-800/80 transition-all duration-300 overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(to right, transparent, ${data.primaryColor}, transparent)` }} />
                  <h3 className="text-2xl font-bold mb-3 transition-colors flex items-center justify-between" onMouseOver={(e) => e.currentTarget.style.color = data.primaryColor} onMouseOut={(e) => e.currentTarget.style.color = ''}>
                    {project.title}
                    <span className="opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all">→</span>
                  </h3>
                  <p className="text-slate-400 text-lg">{project.description}</p>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
