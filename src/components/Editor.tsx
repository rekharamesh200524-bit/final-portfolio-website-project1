import React from 'react';
import type { PortfolioData, ThemeType, Experience, Education, Skill, Project } from '../types';
import { Plus, Trash2, Briefcase, GraduationCap, Rocket } from 'lucide-react';

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
    if (field === 'skills') {
      const newItem: Skill = { id: Date.now().toString(), name: 'New Skill', level: 50 };
      onChange({ ...data, skills: [...data.skills, newItem] });
    } else if (field === 'projects') {
      const newItem: Project = { id: Date.now().toString(), title: 'New Project', description: 'Description', link: '#' };
      onChange({ ...data, projects: [...data.projects, newItem] });
    } else if (field === 'experience') {
      const newItem: Experience = { id: Date.now().toString(), company: 'Company', role: 'Role', duration: '2020 - 2022', description: 'Work details' };
      onChange({ ...data, experience: [...data.experience, newItem] });
    } else if (field === 'education') {
      const newItem: Education = { id: Date.now().toString(), school: 'University', degree: 'Degree', year: '2016 - 2020' };
      onChange({ ...data, education: [...data.education, newItem] });
    }
  };

  const removeItem = (field: 'skills' | 'projects' | 'experience' | 'education', id: string) => {
    if (field === 'skills') onChange({ ...data, skills: data.skills.filter(i => i.id !== id) });
    else if (field === 'projects') onChange({ ...data, projects: data.projects.filter(i => i.id !== id) });
    else if (field === 'experience') onChange({ ...data, experience: data.experience.filter(i => i.id !== id) });
    else if (field === 'education') onChange({ ...data, education: data.education.filter(i => i.id !== id) });
  };

  return (
    <div className="flex-1 overflow-y-auto pb-40"> {/* Even more padding for safety */}
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

        {/* Experience Section */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.1em] flex items-center gap-2">
              <Briefcase size={16} /> Experience
            </h3>
            <button onClick={() => addItem('experience')} className="text-blue-600 hover:bg-blue-50 p-1 rounded-lg transition-colors"><Plus size={20} /></button>
          </div>
          {data.experience.map((exp) => (
            <div key={exp.id} className="p-4 bg-gray-50 border border-gray-100 rounded-2xl space-y-3 relative">
              <button onClick={() => removeItem('experience', exp.id)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500"><Trash2 size={16} /></button>
              <input type="text" placeholder="Company" value={exp.company} onChange={(e) => {
                const updated = data.experience.map(i => i.id === exp.id ? { ...i, company: e.target.value } : i);
                updateField('experience', updated);
              }} className="w-full bg-transparent font-bold text-sm outline-none border-b border-transparent focus:border-blue-200" />
              <input type="text" placeholder="Role" value={exp.role} onChange={(e) => {
                const updated = data.experience.map(i => i.id === exp.id ? { ...i, role: e.target.value } : i);
                updateField('experience', updated);
              }} className="w-full bg-transparent text-sm outline-none border-b border-transparent focus:border-blue-200" />
              <input type="text" placeholder="Duration" value={exp.duration} onChange={(e) => {
                const updated = data.experience.map(i => i.id === exp.id ? { ...i, duration: e.target.value } : i);
                updateField('experience', updated);
              }} className="w-full bg-transparent text-xs text-gray-400 outline-none" />
              <textarea placeholder="Description" value={exp.description} onChange={(e) => {
                const updated = data.experience.map(i => i.id === exp.id ? { ...i, description: e.target.value } : i);
                updateField('experience', updated);
              }} className="w-full bg-transparent text-sm outline-none resize-none" />
            </div>
          ))}
        </section>

        {/* Education Section */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.1em] flex items-center gap-2">
              <GraduationCap size={16} /> Education
            </h3>
            <button onClick={() => addItem('education')} className="text-blue-600 hover:bg-blue-50 p-1 rounded-lg transition-colors"><Plus size={20} /></button>
          </div>
          {data.education.map((edu) => (
            <div key={edu.id} className="p-4 bg-gray-50 border border-gray-100 rounded-2xl space-y-2 relative">
              <button onClick={() => removeItem('education', edu.id)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500"><Trash2 size={16} /></button>
              <input type="text" placeholder="School" value={edu.school} onChange={(e) => {
                const updated = data.education.map(i => i.id === edu.id ? { ...i, school: e.target.value } : i);
                updateField('education', updated);
              }} className="w-full bg-transparent font-bold text-sm outline-none border-b border-transparent focus:border-blue-200" />
              <input type="text" placeholder="Degree" value={edu.degree} onChange={(e) => {
                const updated = data.education.map(i => i.id === edu.id ? { ...i, degree: e.target.value } : i);
                updateField('education', updated);
              }} className="w-full bg-transparent text-sm outline-none border-b border-transparent focus:border-blue-200" />
              <input type="text" placeholder="Year" value={edu.year} onChange={(e) => {
                const updated = data.education.map(i => i.id === edu.id ? { ...i, year: e.target.value } : i);
                updateField('education', updated);
              }} className="w-full bg-transparent text-xs text-gray-400 outline-none" />
            </div>
          ))}
        </section>

        {/* Projects Section */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.1em]">Projects</h3>
            <button onClick={() => addItem('projects')} className="text-blue-600 hover:bg-blue-50 p-1 rounded-lg transition-colors"><Plus size={20} /></button>
          </div>
          {data.projects.map((project) => (
            <div key={project.id} className="p-4 bg-gray-50 border border-gray-100 rounded-2xl space-y-3 relative">
              <button onClick={() => removeItem('projects', project.id)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500"><Trash2 size={16} /></button>
              <input type="text" placeholder="Title" value={project.title} onChange={(e) => {
                const updated = data.projects.map(i => i.id === project.id ? { ...i, title: e.target.value } : i);
                updateField('projects', updated);
              }} className="w-full bg-transparent font-bold text-sm outline-none" />
              <textarea placeholder="Description" value={project.description} onChange={(e) => {
                const updated = data.projects.map(i => i.id === project.id ? { ...i, description: e.target.value } : i);
                updateField('projects', updated);
              }} className="w-full bg-transparent text-sm outline-none resize-none" />
              <input type="url" placeholder="Link" value={project.link} onChange={(e) => {
                const updated = data.projects.map(i => i.id === project.id ? { ...i, link: e.target.value } : i);
                updateField('projects', updated);
              }} className="w-full bg-transparent text-xs text-blue-500 outline-none" />
            </div>
          ))}
        </section>

        {/* Skills Section */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.1em]">Skills</h3>
            <button onClick={() => addItem('skills')} className="text-blue-600 hover:bg-blue-50 p-1 rounded-lg transition-colors"><Plus size={20} /></button>
          </div>
          <div className="space-y-3">
            {data.skills.map(skill => (
              <div key={skill.id} className="p-4 bg-gray-50 border border-gray-100 rounded-2xl space-y-3 relative">
                <button onClick={() => removeItem('skills', skill.id)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500"><Trash2 size={16} /></button>
                <input type="text" value={skill.name} onChange={(e) => {
                  const updated = data.skills.map(i => i.id === skill.id ? { ...i, name: e.target.value } : i);
                  updateField('skills', updated);
                }} className="w-full bg-transparent font-bold text-sm outline-none" />
                <div className="flex items-center gap-4">
                  <input type="range" min="1" max="100" value={skill.level} onChange={(e) => {
                    const updated = data.skills.map(i => i.id === skill.id ? { ...i, level: parseInt(e.target.value) } : i);
                    updateField('skills', updated);
                  }} className="flex-1 accent-blue-600" />
                  <span className="text-xs font-bold text-gray-400 w-8">{skill.level}%</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Vercel Cloud */}
        <section className="bg-black p-6 rounded-[32px] text-white space-y-6">
          <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2 text-gray-400">
            <Rocket size={18} /> Vercel Cloud
          </h3>
          <div className="space-y-4">
            <input type="text" value={data.vercelProjectName || ''} onChange={(e) => updateField('vercelProjectName', e.target.value)} className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Project Name" />
            <input type="password" value={data.vercelToken || ''} onChange={(e) => updateField('vercelToken', e.target.value)} className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Access Token" />
          </div>
        </section>

        {/* Socials */}
        <section className="space-y-4">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.1em]">Socials</h3>
          <div className="space-y-3">
            <input type="url" placeholder="GitHub" value={data.socialLinks.github || ''} onChange={(e) => updateSocial('github', e.target.value)} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            <input type="url" placeholder="LinkedIn" value={data.socialLinks.linkedin || ''} onChange={(e) => updateSocial('linkedin', e.target.value)} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
        </section>
      </div>
    </div>
  );
};
