import React from 'react';
import type { PortfolioData } from '../../types';
import { motion } from 'framer-motion';
import { Mail, ArrowUpRight, Code, Sparkles, Briefcase, GraduationCap, Globe, ExternalLink } from 'lucide-react';

export const BentoTheme: React.FC<{ data: PortfolioData }> = ({ data }) => {
  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4 auto-rows-[minmax(180px,auto)]">
        
        {/* Profile Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="md:col-span-4 lg:col-span-6 bg-white border border-slate-200 rounded-[2.5rem] p-10 flex flex-col justify-center relative overflow-hidden group shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700" style={{ backgroundColor: `${data.primaryColor}08` }} />
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4 relative z-10">{data.name}</h1>
          <p className="text-xl md:text-2xl font-medium text-slate-500 relative z-10" style={{ color: data.primaryColor }}>{data.title}</p>
        </motion.div>

        {/* Bio Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-2 lg:col-span-3 bg-white border border-slate-200 rounded-[2.5rem] p-8 flex flex-col justify-center shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500"
        >
          <Sparkles className="mb-4 text-slate-300" size={24} />
          <p className="text-lg leading-relaxed text-slate-600 italic">"{data.bio}"</p>
        </motion.div>

        {/* Social Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-2 lg:col-span-3 bg-black text-white rounded-[2.5rem] p-8 flex flex-col justify-between shadow-xl shadow-black/10 group overflow-hidden"
        >
          <div className="flex justify-between items-start">
            <span className="text-sm font-bold uppercase tracking-widest text-slate-500">Connect</span>
            <div className="p-2 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
              <Mail size={18} />
            </div>
          </div>
          <div className="flex gap-4">
            {data.socialLinks.github && (
              <a href={data.socialLinks.github} className="p-3 bg-white/10 rounded-2xl hover:bg-white/20 transition-all hover:scale-110"><Globe size={24} /></a>
            )}
            {data.socialLinks.linkedin && (
              <a href={data.socialLinks.linkedin} className="p-3 bg-white/10 rounded-2xl hover:bg-white/20 transition-all hover:scale-110"><ExternalLink size={24} /></a>
            )}
          </div>
        </motion.div>

        {/* Skills Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="md:col-span-4 lg:col-span-4 bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-8">
            <Code size={20} className="text-slate-400" />
            <h2 className="font-black text-lg uppercase tracking-wider">Expertise</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.skills.map(s => (
              <span key={s.id} className="px-5 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-600 hover:border-slate-300 transition-colors">
                {s.name}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Projects Card (Dynamic Span) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="md:col-span-4 lg:col-span-8 bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm overflow-hidden group"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-black text-2xl tracking-tight">Recent Works</h2>
            <div className="text-sm font-bold text-slate-400 group-hover:text-slate-900 transition-colors flex items-center gap-1">
              Scroll <ArrowUpRight size={14} />
            </div>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar scroll-smooth">
            {data.projects.map(p => (
              <a key={p.id} href={p.link} className="min-w-[280px] md:min-w-[340px] p-6 bg-slate-50 border border-slate-100 rounded-3xl hover:border-slate-300 transition-all group/item">
                <div className="flex justify-between mb-4">
                   <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold" style={{ backgroundColor: data.primaryColor }}>{p.title.charAt(0)}</div>
                   <ArrowUpRight size={20} className="text-slate-300 group-hover/item:text-slate-900 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all" />
                </div>
                <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                <p className="text-sm text-slate-500 line-clamp-2">{p.description}</p>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Experience & Education */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="md:col-span-4 lg:col-span-6 bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-10 text-slate-400">
            <Briefcase size={20} />
            <h2 className="font-black text-lg uppercase tracking-wider">Experience</h2>
          </div>
          <div className="space-y-10">
            {data.experience.map(exp => (
              <div key={exp.id} className="relative pl-6 border-l-2 border-slate-100">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-4 border-white bg-slate-200" style={{ backgroundColor: data.primaryColor }} />
                <h3 className="font-bold text-lg leading-none mb-1">{exp.role}</h3>
                <p className="text-sm font-bold mb-2" style={{ color: data.primaryColor }}>{exp.company}</p>
                <p className="text-sm text-slate-500">{exp.duration}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="md:col-span-4 lg:col-span-6 bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-10 text-slate-400">
            <GraduationCap size={20} />
            <h2 className="font-black text-lg uppercase tracking-wider">Education</h2>
          </div>
          <div className="space-y-8">
            {data.education.map(edu => (
              <div key={edu.id}>
                <h3 className="font-bold text-lg mb-1">{edu.degree}</h3>
                <p className="text-slate-500 mb-2">{edu.school}</p>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-1 rounded-md">{edu.year}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};
