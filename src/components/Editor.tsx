import React from 'react';
import type { PortfolioData, ThemeType } from '../types';
import { Plus, Trash2 } from 'lucide-react';

interface EditorProps {
  data: PortfolioData;
  onChange: (data: PortfolioData) => void;
  onPublish: () => void;
  isPublishing: boolean;
}

export const Editor: React.FC<EditorProps> = ({ data, onChange, onPublish, isPublishing }) => {
  const updateField = (field: keyof PortfolioData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const updateSocial = (field: keyof PortfolioData['socialLinks'], value: string) => {
    onChange({ ...data, socialLinks: { ...data.socialLinks, [field]: value } });
  };

  const addSkill = () => {
    const newSkill = { id: Date.now().toString(), name: 'New Skill', level: 50 };
    onChange({ ...data, skills: [...data.skills, newSkill] });
  };

  const updateSkill = (id: string, field: 'name' | 'level', value: string | number) => {
    const updatedSkills = data.skills.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    );
    onChange({ ...data, skills: updatedSkills });
  };

  const removeSkill = (id: string) => {
    onChange({ ...data, skills: data.skills.filter(s => s.id !== id) });
  };

  const addProject = () => {
    const newProject = { 
      id: Date.now().toString(), 
      title: 'New Project', 
      description: 'Project description goes here.',
      link: '#'
    };
    onChange({ ...data, projects: [...data.projects, newProject] });
  };

  const updateProject = (id: string, field: keyof typeof data.projects[0], value: string) => {
    const updatedProjects = data.projects.map(proj => 
      proj.id === id ? { ...proj, [field]: value } : proj
    );
    onChange({ ...data, projects: updatedProjects });
  };

  const removeProject = (id: string) => {
    onChange({ ...data, projects: data.projects.filter(p => p.id !== id) });
  };

  return (
    <div className="bg-white border-r border-gray-200 h-screen overflow-y-auto w-[400px] flex-shrink-0 flex flex-col">
      <div className="p-6 border-b border-gray-200 bg-gray-50 flex justify-between items-center sticky top-0 z-10">
        <h2 className="text-xl font-bold text-gray-800">Portfolio Editor</h2>
        <button 
          onClick={onPublish}
          disabled={isPublishing}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {isPublishing ? 'Publishing...' : 'Publish'}
        </button>
      </div>

      <div className="p-6 space-y-8 flex-1">
        {/* Theme & Color */}
        <section className="space-y-4">
          <div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Theme</h3>
            <div className="grid grid-cols-3 gap-2">
              {(['minimal', 'creative', 'professional'] as ThemeType[]).map((theme) => (
                <button
                  key={theme}
                  onClick={() => updateField('theme', theme)}
                  className={`p-2 border rounded-md text-sm capitalize transition-colors ${
                    data.theme === theme 
                      ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium' 
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Primary Accent Color</label>
            <div className="flex items-center gap-2">
              <input 
                type="color" 
                value={data.primaryColor} 
                onChange={(e) => updateField('primaryColor', e.target.value)}
                className="w-10 h-10 rounded cursor-pointer border-0 p-0"
              />
              <span className="text-sm font-mono text-gray-500 uppercase">{data.primaryColor}</span>
            </div>
          </div>
        </section>

        {/* Basic Info */}
        <section className="space-y-4">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Personal Info</h3>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
            <input 
              type="text" 
              value={data.name} 
              onChange={(e) => updateField('name', e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
            <input 
              type="text" 
              value={data.title} 
              onChange={(e) => updateField('title', e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              value={data.email} 
              onChange={(e) => updateField('email', e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Bio</label>
            <textarea 
              value={data.bio} 
              onChange={(e) => updateField('bio', e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
              <input 
                type="text" 
                value={data.location || ''} 
                onChange={(e) => updateField('location', e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="e.g. New York, NY"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Company</label>
              <input 
                type="text" 
                value={data.company || ''} 
                onChange={(e) => updateField('company', e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="e.g. Acme Corp"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Resume Link</label>
            <input 
              type="url" 
              value={data.resumeLink || ''} 
              onChange={(e) => updateField('resumeLink', e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="https://link-to-your-resume.pdf"
            />
          </div>
        </section>

        {/* Social Links */}
        <section className="space-y-4">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Social Links</h3>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">GitHub URL</label>
            <input 
              type="url" 
              value={data.socialLinks.github || ''} 
              onChange={(e) => updateSocial('github', e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">LinkedIn URL</label>
            <input 
              type="url" 
              value={data.socialLinks.linkedin || ''} 
              onChange={(e) => updateSocial('linkedin', e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </section>

        {/* Skills */}
        <section className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Skills</h3>
            <button onClick={addSkill} className="text-blue-600 hover:bg-blue-50 p-1 rounded transition-colors">
              <Plus size={18} />
            </button>
          </div>
          {data.skills.map(skill => (
            <div key={skill.id} className="p-3 bg-gray-50 border border-gray-200 rounded-md space-y-3">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={skill.name} 
                  onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                  className="flex-1 border border-gray-300 rounded p-1.5 text-sm outline-none focus:border-blue-500"
                  placeholder="Skill name"
                />
                <button onClick={() => removeSkill(skill.id)} className="text-red-500 hover:bg-red-50 p-1.5 rounded">
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <input 
                  type="range" 
                  min="1" 
                  max="100" 
                  value={skill.level} 
                  onChange={(e) => updateSkill(skill.id, 'level', parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="text-xs font-medium text-gray-600 w-8">{skill.level}%</span>
              </div>
            </div>
          ))}
        </section>

        {/* Projects */}
        <section className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Projects</h3>
            <button onClick={addProject} className="text-blue-600 hover:bg-blue-50 p-1 rounded transition-colors">
              <Plus size={18} />
            </button>
          </div>
          {data.projects.map((project, index) => (
            <div key={project.id} className="p-3 bg-gray-50 border border-gray-200 rounded-md space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-500">Project {index + 1}</span>
                <button onClick={() => removeProject(project.id)} className="text-red-500 hover:bg-red-50 p-1 rounded">
                  <Trash2 size={16} />
                </button>
              </div>
              <input 
                type="text" 
                value={project.title} 
                onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                className="w-full border border-gray-300 rounded p-1.5 text-sm outline-none focus:border-blue-500"
                placeholder="Project title"
              />
              <textarea 
                value={project.description} 
                onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                className="w-full border border-gray-300 rounded p-1.5 text-sm outline-none focus:border-blue-500 resize-none"
                placeholder="Description"
                rows={2}
              />
              <input 
                type="url" 
                value={project.link} 
                onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                className="w-full border border-gray-300 rounded p-1.5 text-sm outline-none focus:border-blue-500"
                placeholder="Project URL"
              />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};
