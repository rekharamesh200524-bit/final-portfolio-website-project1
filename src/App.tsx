import { useEffect, useState } from 'react';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { defaultPortfolioData } from './types';
import type { PortfolioData } from './types';
import { Download, ExternalLink, X } from 'lucide-react';

const App = () => {
  const [data, setData] = useState<PortfolioData>(defaultPortfolioData);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null);
  const [sharedData, setSharedData] = useState<PortfolioData | null>(null);

  // Load initial data
  useEffect(() => {
    // Check if URL has a base64 encoded data hash (Shareable Link)
    const hash = window.location.hash;
    if (hash && hash.startsWith('#data=')) {
      try {
        const base64 = hash.replace('#data=', '');
        const decodedString = decodeURIComponent(atob(base64));
        const parsedData = JSON.parse(decodedString);
        setSharedData(parsedData);
        return;
      } catch (err) {
        console.error('Failed to parse shared data', err);
      }
    }

    // Otherwise load from localStorage
    const saved = localStorage.getItem('portfolio-draft');
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (err) {
        console.error('Failed to parse local storage data', err);
      }
    }
  }, []);

  // Save to localStorage when data changes (debounce could be added, but keeping it simple)
  useEffect(() => {
    if (!sharedData) {
      localStorage.setItem('portfolio-draft', JSON.stringify(data));
    }
  }, [data, sharedData]);

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Serialize and encode
      const jsonString = JSON.stringify(data);
      const base64 = btoa(encodeURIComponent(jsonString));
      
      const url = `${window.location.origin}/#data=${base64}`;
      setPublishedUrl(url);
    } catch (error) {
      console.error('Failed to publish', error);
      alert('Failed to publish portfolio.');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleDownloadHtml = () => {
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name} - Portfolio</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body style="background-color: #f9fafb; color: #111827;">
  <div id="root">
    <!-- Notice: Downloaded HTML contains basic structure. For full React components and animations, host the built app! -->
    <div style="font-family: sans-serif; padding: 2rem; max-width: 800px; margin: 0 auto;">
      <h1 style="font-size: 3rem; margin-bottom: 0.5rem; color: ${data.primaryColor};">${data.name}</h1>
      <h2 style="font-size: 1.5rem; color: #666; margin-bottom: 0.5rem;">${data.title} ${data.company ? `@ ${data.company}` : ''}</h2>
      ${data.location ? `<p style="color: #888; margin-bottom: 2rem;">📍 ${data.location}</p>` : ''}
      <p style="margin-bottom: 2rem; line-height: 1.6;">${data.bio}</p>
      
      <h3 style="font-size: 1.25rem; margin-bottom: 1rem;">Skills</h3>
      <ul style="margin-bottom: 2rem;">
        ${data.skills.map(s => `<li style="margin-bottom: 0.5rem;"><strong>${s.name}</strong> - ${s.level}%</li>`).join('')}
      </ul>

      <h3 style="font-size: 1.25rem; margin-bottom: 1rem;">Projects</h3>
      <ul>
        ${data.projects.map(p => `
          <li style="margin-bottom: 1.5rem;">
            <h4 style="font-size: 1.1rem; margin-bottom: 0.25rem;"><a href="${p.link}" style="color: ${data.primaryColor};">${p.title}</a></h4>
            <p>${p.description}</p>
          </li>
        `).join('')}
      </ul>
    </div>
  </div>
</body>
</html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.name.replace(/\s+/g, '-').toLowerCase()}-portfolio.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // If viewing a shared link, render full screen preview
  if (sharedData) {
    return (
      <div className="h-screen w-full relative">
        <div className="absolute top-4 left-4 z-50">
           <a href="/" className="bg-white/80 backdrop-blur text-sm px-4 py-2 rounded-full shadow border hover:bg-white transition-colors">
              Create your own portfolio
           </a>
        </div>
        <Preview data={sharedData} />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Editor 
        data={data} 
        onChange={setData} 
        onPublish={handlePublish}
        isPublishing={isPublishing} 
      />
      <div className="flex-1 relative flex flex-col">
        {/* Top bar over preview */}
        <div className="bg-white border-b border-gray-200 h-14 flex items-center justify-between px-6 shadow-sm z-10">
          <div className="text-sm font-medium text-gray-500">Live Preview</div>
          <button 
            onClick={handleDownloadHtml}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md"
          >
            <Download size={16} />
            <span>Download HTML</span>
          </button>
        </div>
        
        {/* The Preview Area */}
        <div className="flex-1 overflow-y-auto">
          <Preview data={data} />
        </div>

        {/* Publish Modal/Toast */}
        {publishedUrl && (
          <div className="absolute bottom-6 right-6 bg-white rounded-lg shadow-xl border border-gray-200 p-6 w-96 animate-in slide-in-from-bottom-5 z-50">
            <button 
              onClick={() => setPublishedUrl(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Published Successfully!</h3>
            <p className="text-sm text-gray-600 mb-4">Your portfolio is now live via a serverless shareable link. No database required!</p>
            <div className="bg-gray-50 border border-gray-200 rounded p-3 mb-4 overflow-hidden relative group">
              <input 
                type="text" 
                readOnly 
                value={publishedUrl} 
                className="w-full bg-transparent text-sm font-mono outline-none cursor-text truncate"
                onClick={(e) => (e.target as HTMLInputElement).select()}
              />
              <div className="absolute inset-y-0 right-0 bg-gradient-to-l from-gray-50 to-transparent w-8 group-hover:from-gray-100 transition-colors"></div>
            </div>
            <a 
              href={publishedUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors font-medium"
            >
              <ExternalLink size={18} />
              View Portfolio
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
