export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { data, token, projectName } = req.body;

  if (!token || !projectName || !data) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const primaryColor = data.primaryColor || '#3b82f6';
    
    // --- Theme Logic ---
    let themeHtml = '';
    
    if (data.theme === 'creative') {
      themeHtml = `
        <div class="min-h-screen bg-[#0f172a] text-slate-200 font-sans p-6 md:p-12 relative overflow-hidden">
          <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px]" style="background-color: ${primaryColor}33"></div>
          <div class="max-w-5xl mx-auto relative z-10">
            <header class="py-20 border-b border-slate-800 mb-16">
              <h1 class="text-6xl md:text-8xl font-black tracking-tighter mb-4" style="background-image: linear-gradient(to right, ${primaryColor}, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                ${data.name}
              </h1>
              <p class="text-2xl font-medium text-slate-400">${data.title} ${data.company ? `@ ${data.company}` : ''}</p>
            </header>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div class="md:col-span-1">
                <h2 class="text-xl font-bold mb-6" style="color: ${primaryColor}">About Me</h2>
                <p class="text-lg leading-relaxed text-slate-300 bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm">${data.bio}</p>
              </div>
              <div class="md:col-span-2 space-y-8">
                <h2 class="text-3xl font-black mb-8">Featured Projects</h2>
                <div class="grid grid-cols-1 gap-6">
                  ${data.projects.map((p: any) => `
                    <a href="${p.link}" class="block p-8 rounded-3xl bg-slate-800/30 border border-slate-700 hover:bg-slate-800/50 transition-all">
                      <h3 class="text-2xl font-bold mb-2">${p.title}</h3>
                      <p class="text-slate-400">${p.description}</p>
                    </a>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (data.theme === 'professional') {
      themeHtml = `
        <div class="min-h-screen bg-white text-slate-900 font-sans">
          <header class="border-b border-slate-100 py-24 bg-slate-50">
            <div class="max-w-4xl mx-auto px-6">
              <h1 class="text-5xl font-extrabold mb-4">${data.name}</h1>
              <p class="text-xl text-slate-600 mb-6">${data.title} at <span style="color: ${primaryColor}">${data.company}</span></p>
              <div class="flex gap-4">
                ${data.email ? `<a href="mailto:${data.email}" class="px-6 py-2 rounded-lg text-white font-medium" style="background-color: ${primaryColor}">Contact Me</a>` : ''}
              </div>
            </div>
          </header>
          <main class="max-w-4xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-4 gap-16">
            <div class="md:col-span-1">
              <h2 class="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Skills</h2>
              <div class="flex flex-wrap gap-2">
                ${data.skills.map((s: any) => `<span class="px-3 py-1 bg-slate-100 rounded text-sm font-medium">${s.name}</span>`).join('')}
              </div>
            </div>
            <div class="md:col-span-3 space-y-16">
              <section>
                <h2 class="text-2xl font-bold mb-6">Biography</h2>
                <p class="text-lg text-slate-600 leading-relaxed">${data.bio}</p>
              </section>
              <section>
                <h2 class="text-2xl font-bold mb-8">Selected Projects</h2>
                <div class="space-y-12">
                  ${data.projects.map((p: any) => `
                    <div class="group">
                      <h3 class="text-xl font-bold group-hover:underline" style="color: ${primaryColor}">${p.title}</h3>
                      <p class="text-slate-600 mt-2">${p.description}</p>
                    </div>
                  `).join('')}
                </div>
              </section>
            </div>
          </main>
        </div>
      `;
    } else {
      // Minimal Theme
      themeHtml = `
        <div class="min-h-screen bg-[#fcfcfc] text-neutral-900 font-serif p-12 md:p-24">
          <div class="max-w-3xl mx-auto">
            <header class="mb-24">
              <h1 class="text-6xl font-light mb-4">${data.name}</h1>
              <p class="text-xl text-neutral-500 italic">${data.title}</p>
            </header>
            <section class="mb-24">
              <p class="text-2xl leading-relaxed font-light">${data.bio}</p>
            </section>
            <section>
              <h2 class="text-xs uppercase tracking-[0.3em] font-bold text-neutral-400 mb-12">Work Selection</h2>
              <div class="space-y-16">
                ${data.projects.map((p: any) => `
                  <div>
                    <h3 class="text-xl font-medium mb-2"><a href="${p.link}" class="hover:underline">${p.title}</a></h3>
                    <p class="text-neutral-500 leading-relaxed">${p.description}</p>
                  </div>
                `).join('')}
              </div>
            </section>
          </div>
        </div>
      `;
    }

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name} - Portfolio</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body style="margin: 0;">
  ${themeHtml}
</body>
</html>`;

    // --- Vercel API Call ---
    const response = await fetch('https://api.vercel.com/v13/deployments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: projectName,
        files: [{ file: 'index.html', data: htmlContent }],
        projectSettings: { framework: null },
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: result.error?.message || 'Deployment failed' });
    }

    return res.status(200).json({ url: result.url });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
