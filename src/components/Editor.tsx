import React from 'react';
import type { PortfolioData, ThemeType, Experience, Education } from '../types';
import { Plus, Trash2, Briefcase, GraduationCap } from 'lucide-react';

interface EditorProps {
  data: PortfolioData;
  onChange: (data: PortfolioData) => void;
  onPublish: () => void;
  isPublishing: boolean;
}

export const Editor: React.FC<EditorProps> = ({ data, onChange }) => {
  const updateField = (field: keyof PortfolioData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const updateSocial = (field: keyof PortfolioData['socialLinks'], value: string) => {
    onChange({ ...data, socialLinks: { ...data.socialLinks, [field]: value } });
  };

  const addItem = (field: 'skills' | 'projects' | 'experience' | 'education') => {
    let newItem: any;
    if (field === 'skills') newItem = { id: Date.now().toString(), name: 'New Skill', level: 50 };
    if (field === 'projects') newItem = { id: Date.now().toString(), title: 'New Project', description: 'Description', link: '#' };
    if (field === 'experience') newItem = { id: Date.now().toString(), company: 'Company', role: 'Role', duration: '2020 - 2022', description: 'Work details' };
    if (field === 'education') newItem = { id: Date.now().toString(), school: 'University', degree: 'Degree', year: '2016 - 2020' };
    
    onChange({ ...data, [field]: [...data[field], newItem] });
  };

  const removeItem = (field: 'skills' | 'projects' | 'experience' | 'education', id: string) => {
    onChange({ ...data, [field]: (data[field] as any[]).filter(item => item.id !== id) });
  };

  const updateItem = (field: 'skills' | 'projects' | 'experience' | 'education', id: string, subfield: string, value: any) => {
    const updated = (data[field] as any[]).map(item => 
      item.id === id ? { ...item, [subfield]: value } : item
    );
    onChange({ ...data, [field]: updated });
  };

  return (
    <div className="flex-1 overflow-y-auto pb-32"> {/* Added pb-32 for mobile scrolling safety */}
      <div className="p-6 space-y-10">
        {/* Theme & Color */}
        <section className="space-y-4">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.1em]">Look & Feel</h3>
          <div className="grid grid-cols-3 gap-2">
            {(['minimal', 'creative', 'professional'] as ThemeType[]).map((theme) => (
              <button
                key={theme}
                onClick={() => updateField('theme', theme)}
                className={`p-2 border rounded-xl text-sm capitalize transition-all ${
                  data.theme === theme 
                    ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold shadow-sm' 
                    : 'border-gray-200 hover:border-gray-300 text-gray-500'
                }`}
              >
                {theme}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
            <input type="color" value={data.primaryColor} onChange={(e) => updateField('primaryColor', e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0 overflow-hidden" />
            <div className="flex-1">
              <label className="block text-[10px] font-bold text-gray-400 uppercase">Accent Color</label>
              <span className="text-sm font-mono text-gray-600 uppercase">{data.primaryColor}</span>
            </div>
          </div>
        </section>

        {/* Basic Info */}
        <section className="space-y-4">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.1em]">Personal Details</h3>
          <div className="space-y-3">
            <input type="text" placeholder="Full Name" value={data.name} onChange={(e) => updateField('name', e.target.value)} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
            <input type="text" placeholder="Job Title" value={data.title} onChange={(e) => updateField('title', e.target.value)} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
            <textarea placeholder="Tell your story..." value={data.bio} onChange={(e) => updateField('bio', e.target.value)} rows={3} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none" />
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.1em] flex items-center gap-2">
              <Briefcase size={16} /> Experience
            </h3>
            <button onClick={() => addItem('experience')} className="text-blue-600 hover:bg-blue-50 p-1 rounded-lg transition-colors"><Plus size={20} /></button>
          </div>
          {data.experience?.map((exp) => (
            <div key={exp.id} className="p-4 bg-gray-50 border border-gray-100 rounded-2xl space-y-3 relative group">
              <button onClick={() => removeItem('experience', exp.id)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
              <input type="text" placeholder="Company" value={exp.company} onChange={(e) => updateItem('experience', exp.id, 'company', e.target.value)} className="w-full bg-transparent font-bold text-sm outline-none border-b border-transparent focus:border-blue-200" />
              <input type="text" placeholder="Role" value={exp.role} onChange={(e) => updateItem('experience', exp.id, 'role', e.target.value)} className="w-full bg-transparent text-sm outline-none border-b border-transparent focus:border-blue-200" />
              <input type="text" placeholder="Duration (e.g. 2021 - Present)" value={exp.duration} onChange={(e) => updateItem('experience', exp.id, 'duration', e.target.value)} className="w-full bg-transparent text-xs text-gray-400 outline-none" />
            </div>
          ))}
        </section>

        {/* EDUCATION SECTION */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.1em] flex items-center gap-2">
              <GraduationCap size={16} /> Education
            </h3>
            <button onClick={() => addItem('education')} className="text-blue-600 hover:bg-blue-50 p-1 rounded-lg transition-colors"><Plus size={20} /></button>
          </div>
          {data.education?.map((edu) => (
            <div key={edu.id} className="p-4 bg-gray-50 border border-gray-100 rounded-2xl space-y-2 relative group">
              <button onClick={() => removeItem('education', edu.id)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
              <input type="text" placeholder="School/University" value={edu.school} onChange={(e) => updateItem('education', edu.id, 'school', e.target.value)} className="w-full bg-transparent font-bold text-sm outline-none border-b border-transparent focus:border-blue-200" />
              <input type="text" placeholder="Degree" value={edu.degree} onChange={(e) => updateItem('education', edu.id, 'degree', e.target.value)} className="w-full bg-transparent text-sm outline-none border-b border-transparent focus:border-blue-200" />
              <input type="text" placeholder="Year" value={edu.year} onChange={(e) => updateItem('education', edu.id, 'year', e.target.value)} className="w-full bg-transparent text-xs text-gray-400 outline-none" />
            </div>
          ))}
        </section>

        {/* PROJECTS SECTION */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.1em]">Featured Projects</h3>
            <button onClick={() => addItem('projects')} className="text-blue-600 hover:bg-blue-50 p-1 rounded-lg transition-colors"><Plus size={20} /></button>
          </div>
          {data.projects.map((project) => (
            <div key={project.id} className="p-4 bg-gray-50 border border-gray-100 rounded-2xl space-y-3 relative group">
              <button onClick={() => removeItem('projects', project.id)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
              <input type="text" placeholder="Project Title" value={project.title} onChange={(e) => updateItem('projects', project.id, 'title', e.target.value)} className="w-full bg-transparent font-bold text-sm outline-none border-b border-transparent focus:border-blue-200" />
              <textarea placeholder="Describe your work..." value={project.description} onChange={(e) => updateItem('projects', project.id, 'description', e.target.value)} rows={2} className="w-full bg-transparent text-sm outline-none resize-none border-b border-transparent focus:border-blue-200" />
              <input type="url" placeholder="Project Link" value={project.link} onChange={(e) => updateItem('projects', project.id, 'link', e.target.value)} className="w-full bg-transparent text-xs text-blue-500 outline-none underline" />
            </div>
          ))}
        </section>

        {/* SKILLS SECTION */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.1em]">Skills</h3>
            <button onClick={() => addItem('skills')} className="text-blue-600 hover:bg-blue-50 p-1 rounded-lg transition-colors"><Plus size={20} /></button>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {data.skills.map(skill => (
              <div key={skill.id} className="p-4 bg-gray-50 border border-gray-100 rounded-2xl space-y-3 relative group">
                <button onClick={() => removeItem('skills', skill.id)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                <input type="text" value={skill.name} onChange={(e) => updateItem('skills', skill.id, 'name', e.target.value)} className="w-full bg-transparent font-bold text-sm outline-none" />
                <div className="flex items-center gap-4">
                  <input type="range" min="1" max="100" value={skill.level} onChange={(e) => updateItem('skills', skill.id, 'level', parseInt(e.target.value))} className="flex-1 accent-blue-600" />
                  <span className="text-xs font-bold text-gray-400 w-8">{skill.level}%</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* VERCEL DEPLOYMENT SECTION */}
        <section className="bg-black p-6 rounded-[32px] text-white space-y-6 shadow-2xl shadow-black/10">
          <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2 text-gray-400">
            <Rocket size={18} /> Vercel Cloud
          </h3>
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-gray-500">Vercel Project Name</label>
              <input type="text" value={data.vercelProjectName || ''} onChange={(e) => updateField('vercelProjectName', e.target.value.toLowerCase().replace(/\s+/g, '-'))} className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="my-portfolio-site" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-gray-500">Access Token</label>
              <input type="password" value={data.vercelToken || ''} onChange={(e) => updateField('vercelToken', e.target.value)} className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Paste token here" />
            </div>
          </div>
        </section>

        {/* Social Links */}
        <section className="space-y-4">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.1em]">Social Profiles</h3>
          <div className="space-y-3">
            <input type="url" placeholder="GitHub URL" value={data.socialLinks.github || ''} onChange={(e) => updateSocial('github', e.target.value)} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
            <input type="url" placeholder="LinkedIn URL" value={data.socialLinks.linkedin || ''} onChange={(e) => updateSocial('linkedin', e.target.value)} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
          </div>
        </section>
      </div>
    </div>
  );
};
