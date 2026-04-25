import React from 'react';
import { PortfolioData } from '../../types';
import { motion } from 'framer-motion';

export const ProfessionalTheme: React.FC<{ data: PortfolioData }> = ({ data }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="text-white py-20 px-8 shadow-lg" style={{ backgroundColor: data.primaryColor }}>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">{data.name}</h1>
            <p className="text-xl font-medium opacity-90">
              {data.title} {data.company && <span>at {data.company}</span>}
            </p>
            {data.location && <p className="text-sm opacity-80 mt-2">{data.location}</p>}
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-2 text-sm opacity-90"
          >
            {data.email && <a href={`mailto:${data.email}`} className="hover:opacity-100 transition-opacity">{data.email}</a>}
            {data.resumeLink && <a href={data.resumeLink} target="_blank" rel="noreferrer" className="hover:opacity-100 transition-opacity">View Resume</a>}
            {data.socialLinks.linkedin && <a href={data.socialLinks.linkedin} target="_blank" rel="noreferrer" className="hover:opacity-100 transition-opacity">LinkedIn Profile</a>}
            {data.socialLinks.github && <a href={data.socialLinks.github} target="_blank" rel="noreferrer" className="hover:opacity-100 transition-opacity">GitHub Profile</a>}
          </motion.div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-16 px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-16">
          <motion.section 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 inline-block" style={{ borderColor: data.primaryColor }}>Professional Summary</h2>
            <p className="text-slate-700 leading-relaxed text-lg">{data.bio}</p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-8 pb-2 border-b-2 inline-block" style={{ borderColor: data.primaryColor }}>Key Projects</h2>
            <div className="space-y-8">
              {data.projects.map((project) => (
                <div key={project.id} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    <a href={project.link} target="_blank" rel="noreferrer" className="transition-colors" onMouseOver={(e) => e.currentTarget.style.color = data.primaryColor} onMouseOut={(e) => e.currentTarget.style.color = ''}>
                      {project.title}
                    </a>
                  </h3>
                  <p className="text-slate-600">{project.description}</p>
                </div>
              ))}
            </div>
          </motion.section>
        </div>

        <motion.div 
          className="md:col-span-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold mb-6 pb-2 border-b-2" style={{ borderColor: data.primaryColor }}>Core Competencies</h2>
            <ul className="space-y-4">
              {data.skills.map((skill) => (
                <li key={skill.id} className="flex justify-between items-center border-b border-slate-100 pb-2 last:border-0">
                  <span className="font-medium text-slate-700">{skill.name}</span>
                  <span className="text-sm font-semibold px-2 py-1 rounded" style={{ color: data.primaryColor, backgroundColor: `${data.primaryColor}1A` }}>{skill.level}/100</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </main>
    </div>
  );
};
