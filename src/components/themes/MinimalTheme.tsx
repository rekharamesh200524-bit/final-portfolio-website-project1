import React from 'react';
import type { PortfolioData } from '../../types';
import { motion } from 'framer-motion';

export const MinimalTheme: React.FC<{ data: PortfolioData }> = ({ data }) => {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans p-8 md:p-16 lg:p-24 selection:bg-gray-200">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto"
      >
        <header className="mb-20">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4" style={{ color: data.primaryColor }}>{data.name}</h1>
          <p className="text-xl text-gray-500 font-light mb-2">
            {data.title} {data.company && <span className="font-medium text-gray-700">@ {data.company}</span>}
          </p>
          {data.location && <p className="text-gray-400 mb-8">{data.location}</p>}
          <div className="flex gap-4 flex-wrap">
            {data.email && (
              <a href={`mailto:${data.email}`} className="text-sm border-b pb-1 transition-colors" style={{ borderColor: `${data.primaryColor}40` }} onMouseOver={(e) => e.currentTarget.style.borderColor = data.primaryColor} onMouseOut={(e) => e.currentTarget.style.borderColor = `${data.primaryColor}40`}>Email</a>
            )}
            {data.resumeLink && (
              <a href={data.resumeLink} target="_blank" rel="noreferrer" className="text-sm border-b pb-1 transition-colors" style={{ borderColor: `${data.primaryColor}40` }} onMouseOver={(e) => e.currentTarget.style.borderColor = data.primaryColor} onMouseOut={(e) => e.currentTarget.style.borderColor = `${data.primaryColor}40`}>Resume</a>
            )}
            {data.socialLinks.github && (
              <a href={data.socialLinks.github} target="_blank" rel="noreferrer" className="text-sm border-b pb-1 transition-colors" style={{ borderColor: `${data.primaryColor}40` }} onMouseOver={(e) => e.currentTarget.style.borderColor = data.primaryColor} onMouseOut={(e) => e.currentTarget.style.borderColor = `${data.primaryColor}40`}>GitHub</a>
            )}
            {data.socialLinks.linkedin && (
              <a href={data.socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-sm border-b pb-1 transition-colors" style={{ borderColor: `${data.primaryColor}40` }} onMouseOver={(e) => e.currentTarget.style.borderColor = data.primaryColor} onMouseOut={(e) => e.currentTarget.style.borderColor = `${data.primaryColor}40`}>LinkedIn</a>
            )}
          </div>
        </header>

        <section className="mb-20">
          <h2 className="text-sm uppercase tracking-widest text-gray-400 mb-6">About</h2>
          <p className="text-lg leading-relaxed text-gray-700">{data.bio}</p>
        </section>

        <section className="mb-20">
          <h2 className="text-sm uppercase tracking-widest text-gray-400 mb-6">Skills</h2>
          <div className="flex flex-wrap gap-4">
            {data.skills.map((skill) => (
              <span key={skill.id} className="text-md px-4 py-1.5 rounded-full" style={{ backgroundColor: `${data.primaryColor}15`, color: data.primaryColor }}>
                {skill.name}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm uppercase tracking-widest text-gray-400 mb-6">Selected Works</h2>
          <div className="space-y-12">
            {data.projects.map((project) => (
              <div key={project.id} className="group">
                <a href={project.link} target="_blank" rel="noreferrer" className="block">
                  <h3 className="text-2xl font-light mb-2 transition-colors" style={{ color: 'inherit' }} onMouseOver={(e) => e.currentTarget.style.color = data.primaryColor} onMouseOut={(e) => e.currentTarget.style.color = 'inherit'}>{project.title}</h3>
                  <p className="text-gray-600">{project.description}</p>
                </a>
              </div>
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  );
};
