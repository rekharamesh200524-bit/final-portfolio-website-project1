import { useEffect, useState } from 'react';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { defaultPortfolioData } from './types';
import type { PortfolioData } from './types';
import { Download, ExternalLink, X, Rocket, Check, Eye, Edit3, AlertCircle, Info } from 'lucide-react';

const App = () => {
  const [data, setData] = useState<PortfolioData>(defaultPortfolioData);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null);
  const [deployedVercelUrl, setDeployedVercelUrl] = useState<string | null>(null);
  const [sharedData, setSharedData] = useState<PortfolioData | null>(null);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [alert, setAlert] = useState<{ title: string; message: string; type: 'error' | 'info' | 'success' } | null>(null);

  // Load initial data
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#data=')) {
      try {
        const base64 = hash.replace('#data=', '');
        const decodedString = decodeURIComponent(atob(base64));
        const parsedData = JSON.parse(decodedString);
        // Ensure new fields exist in shared data too
        setSharedData({ ...defaultPortfolioData, ...parsedData });
        return;
      } catch (err) {
        console.error('Failed to parse shared data', err);
      }
    }

    const saved = localStorage.getItem('portfolio-draft');
    if (saved) {
      try {
        const parsedSaved = JSON.parse(saved);
        // CRITICAL: Merge with defaultPortfolioData to ensure new fields (experience, education) are present
        setData({
          ...defaultPortfolioData,
          ...parsedSaved,
          experience: parsedSaved.experience || defaultPortfolioData.experience,
          education: parsedSaved.education || defaultPortfolioData.education,
        });
      } catch (err) {
        console.error('Failed to parse local storage data', err);
      }
    }
  }, []);

  useEffect(() => {
    if (!sharedData) {
      localStorage.setItem('portfolio-draft', JSON.stringify(data));
    }
  }, [data, sharedData]);

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const jsonString = JSON.stringify(data);
      const base64 = btoa(encodeURIComponent(jsonString));
      const url = `${window.location.origin}/#data=${base64}`;
      setPublishedUrl(url);
    } catch (error) {
      setAlert({ title: 'Publishing Failed', message: 'There was an error generating your shareable link.', type: 'error' });
    } finally {
      setIsPublishing(false);
    }
  };

  const handleDeployToVercel = async () => {
    if (!data.vercelToken || !data.vercelProjectName) {
      setAlert({ 
        title: 'Vercel Info Required', 
        message: 'Please scroll down to the "Vercel Deployment" section in settings and enter your Access Token and Project Name.', 
        type: 'info' 
      });
      return;
    }

    setIsDeploying(true);
    try {
      const response = await fetch('/api/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data,
          token: data.vercelToken,
          projectName: data.vercelProjectName
        })
      });

      const result = await response.json();
      if (response.ok) {
        setDeployedVercelUrl(result.url);
      } else {
        setAlert({ title: 'Deployment Failed', message: result.error || 'Vercel rejected the deployment request.', type: 'error' });
      }
    } catch (error) {
      setAlert({ title: 'Connection Error', message: 'Could not connect to the deployment service. Check your internet connection.', type: 'error' });
    } finally {
      setIsDeploying(false);
    }
  };

  const handleDownloadHtml = () => {
    // Basic logic for download
    const htmlContent = `<!DOCTYPE html><html><head><script src="https://cdn.tailwindcss.com"></script></head><body><div class="p-20"><h1 class="text-4xl font-bold">${data.name}</h1><p>${data.bio}</p></div></body></html>`;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.name.replace(/\s+/g, '-').toLowerCase()}-portfolio.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (sharedData) {
    return (
      <div className="h-screen w-full relative">
        <div className="absolute top-4 left-4 z-50">
           <a href="/" className="bg-white/80 backdrop-blur text-xs md:text-sm px-4 py-2 rounded-full shadow border hover:bg-white transition-colors">
              Create your own portfolio with Folika
           </a>
        </div>
        <Preview data={sharedData} />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden bg-gray-100 relative">
      {/* Sidebar / Editor */}
      <div className={`w-full lg:w-96 h-screen flex flex-col bg-white border-r border-gray-200 overflow-hidden ${activeTab === 'edit' ? 'flex' : 'hidden lg:flex'}`}>
        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xl italic shadow-lg shadow-blue-200">F</div>
            <h1 className="text-xl font-black text-gray-900 tracking-tight">Folika</h1>
          </div>
          <div className="flex gap-2">
            <button onClick={handlePublish} disabled={isPublishing} className="bg-blue-600 hover:bg-blue-700 text-white px-3 md:px-4 py-2 rounded-lg font-bold text-xs md:text-sm transition-all disabled:opacity-50 shadow-md active:scale-95">
              {isPublishing ? '...' : 'Publish'}
            </button>
            <button onClick={handleDeployToVercel} disabled={isDeploying} className="bg-black hover:bg-gray-800 text-white p-2 rounded-lg transition-all disabled:opacity-50 shadow-md active:scale-95">
              {isDeploying ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Rocket size={20} />}
            </button>
          </div>
        </div>
        <Editor data={data} onChange={setData} onPublish={handlePublish} isPublishing={isPublishing} />
      </div>

      {/* Preview Area */}
      <div className={`flex-1 relative flex flex-col h-full ${activeTab === 'preview' ? 'flex' : 'hidden lg:flex'}`}>
        <div className="bg-white border-b border-gray-200 h-14 flex items-center justify-between px-6 shadow-sm z-10 shrink-0">
          <div className="text-sm font-medium text-gray-500">Live Preview</div>
          <button onClick={handleDownloadHtml} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md">
            <Download size={16} /> <span className="hidden sm:inline">Download HTML</span>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto"><Preview data={data} /></div>
      </div>

      {/* Alert Modals */}
      {alert && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[200] p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 flex flex-col items-center text-center">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                alert.type === 'error' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'
              }`}>
                {alert.type === 'error' ? <AlertCircle size={32} /> : <Info size={32} />}
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">{alert.title}</h3>
              <p className="text-gray-500 leading-relaxed">{alert.message}</p>
              <button onClick={() => setAlert(null)} className="mt-8 w-full py-4 bg-gray-900 hover:bg-black text-white rounded-2xl font-bold transition-all active:scale-95 shadow-xl shadow-gray-200">Got it</button>
            </div>
          </div>
        </div>
      )}

      {/* Published URL Modal */}
      {publishedUrl && (
        <div className="fixed inset-0 lg:inset-auto bg-black/60 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none flex items-center justify-center lg:block z-[200] p-4">
          <div className="bg-white rounded-[32px] lg:rounded-3xl shadow-2xl border border-gray-100 p-8 lg:p-6 w-full max-w-sm lg:absolute lg:bottom-20 lg:right-6 animate-in slide-in-from-bottom-5">
            <button onClick={() => setPublishedUrl(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={20} /></button>
            <h3 className="text-xl font-black text-gray-900 mb-2 text-center lg:text-left">Public Link</h3>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 mb-6 overflow-hidden relative group">
              <input type="text" readOnly value={publishedUrl} className="w-full bg-transparent text-sm font-mono outline-none cursor-text truncate text-center lg:text-left" onClick={(e) => (e.target as HTMLInputElement).select()} />
            </div>
            <a href={publishedUrl} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-4 lg:py-3 rounded-2xl lg:rounded-xl transition-all font-bold shadow-lg shadow-blue-100">
              <ExternalLink size={18} /> Open Site
            </a>
          </div>
        </div>
      )}

      {/* Vercel Deployed Modal */}
      {deployedVercelUrl && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[200] p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[40px] shadow-2xl p-8 lg:p-10 w-full max-w-md animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-green-50 text-green-500 rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-3">
              <Check size={40} />
            </div>
            <h3 className="text-3xl font-black text-gray-900 text-center mb-3">Live on Vercel!</h3>
            <p className="text-center text-gray-500 mb-10 text-lg leading-relaxed">Your portfolio has been successfully deployed to your personal domain.</p>
            <div className="space-y-4">
              <a href={`https://${deployedVercelUrl}`} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-3 bg-black text-white py-5 rounded-[24px] font-black text-lg hover:bg-gray-900 transition-all shadow-2xl shadow-black/20 active:scale-95">
                <ExternalLink size={20} /> Visit Live Site
              </a>
              <button onClick={() => setDeployedVercelUrl(null)} className="w-full py-4 text-gray-400 font-bold hover:text-gray-600 transition-colors">Done</button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Tab Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center justify-around z-[100] shadow-lg">
        <button onClick={() => setActiveTab('edit')} className={`flex flex-col items-center gap-1 ${activeTab === 'edit' ? 'text-blue-600' : 'text-gray-400'}`}><Edit3 size={20} /><span className="text-[10px] font-bold">Edit</span></button>
        <button onClick={() => setActiveTab('preview')} className={`flex flex-col items-center gap-1 ${activeTab === 'preview' ? 'text-blue-600' : 'text-gray-400'}`}><Eye size={20} /><span className="text-[10px] font-bold">Preview</span></button>
      </div>
    </div>
  );
};

export default App;
