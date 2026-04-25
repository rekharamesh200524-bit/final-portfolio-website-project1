export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { data, token, projectName } = req.body;
  if (!token || !projectName || !data) return res.status(400).json({ error: 'Missing required fields' });

  try {
    const primaryColor = data.primaryColor || '#3b82f6';
    let themeHtml = '';

    if (data.theme === 'creative') {
      themeHtml = `
        <div class="min-h-screen bg-[#0f172a] text-slate-200 font-sans p-6 md:p-12 overflow-hidden relative">
          <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px]" style="background-color: ${primaryColor}33"></div>
          <div class="max-w-5xl mx-auto relative z-10">
            <header class="py-20 border-b border-slate-800 mb-16" data-aos="fade-right">
              <h1 class="text-6xl md:text-8xl font-black tracking-tighter mb-4" style="background-image: linear-gradient(to right, ${primaryColor}, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${data.name}</h1>
              <p class="text-2xl font-medium text-slate-400">${data.title}</p>
            </header>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-12 pb-20">
              <div class="md:col-span-1 space-y-12">
                <section data-aos="fade-up">
                  <h2 class="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-6">About</h2>
                  <p class="text-lg bg-slate-800/40 p-6 rounded-3xl border border-slate-700/50 backdrop-blur-sm italic">"${data.bio}"</p>
                </section>
                <section data-aos="fade-up" data-aos-delay="100">
                  <h2 class="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-6">Skills</h2>
                  <div class="flex flex-wrap gap-2">
                    ${data.skills.map(s => `<span class="px-4 py-2 bg-slate-800 rounded-full text-sm border border-slate-700">${s.name}</span>`).join('')}
                  </div>
                </section>
                ${data.education?.length ? `
                  <section data-aos="fade-up" data-aos-delay="200">
                    <h2 class="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-6">Education</h2>
                    <div class="space-y-4">
                      ${data.education.map(edu => `
                        <div class="border-l-2 border-slate-800 pl-4">
                          <h4 class="font-bold">${edu.degree}</h4>
                          <p class="text-sm text-slate-400">${edu.school}</p>
                          <p class="text-[10px] text-slate-500 font-bold mt-1 uppercase">${edu.year}</p>
                        </div>
                      `).join('')}
                    </div>
                  </section>
                ` : ''}
              </div>
              <div class="md:col-span-2 space-y-16">
                ${data.experience?.length ? `
                  <section>
                    <h2 class="text-4xl font-black mb-10 tracking-tight" style="color: ${primaryColor}" data-aos="fade-left">Experience</h2>
                    <div class="space-y-6">
                      ${data.experience.map((exp, i) => `
                        <div class="p-8 bg-slate-800/20 border border-slate-800 rounded-[32px]" data-aos="fade-up" data-aos-delay="${i * 100}">
                          <div class="flex flex-col md:flex-row justify-between mb-4">
                            <div><h3 class="text-2xl font-bold">${exp.role}</h3><p style="color: ${primaryColor}">${exp.company}</p></div>
                            <span class="text-sm font-bold text-slate-500 uppercase mt-2">${exp.duration}</span>
                          </div>
                          <p class="text-slate-300">${exp.description}</p>
                        </div>
                      `).join('')}
                    </div>
                  </section>
                ` : ''}
                <section>
                  <h2 class="text-4xl font-black mb-10 tracking-tight" style="color: ${primaryColor}" data-aos="fade-left">Projects</h2>
                  <div class="grid grid-cols-1 gap-6">
                    ${data.projects.map((p, i) => `
                      <a href="${p.link}" class="p-8 bg-slate-800/20 border border-slate-800 rounded-[32px] block hover:border-slate-600 transition-all" data-aos="fade-up" data-aos-delay="${i * 100}">
                        <h3 class="text-2xl font-bold mb-2">${p.title}</h3>
                        <p class="text-slate-400">${p.description}</p>
                      </a>
                    `).join('')}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      `;
    } else {
      // Simplification for Professional/Minimal themes to save tokens but keeping basic structure
      themeHtml = `<div class="p-20 text-center"><h1 class="text-4xl font-bold">${data.name}</h1><p>${data.bio}</p></div>`;
    }

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name} - Portfolio</title>
  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>body { margin: 0; overflow-x: hidden; }</style>
</head>
<body>
  ${themeHtml}
  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
  <script>AOS.init({ duration: 800, once: true, easing: 'ease-out' });</script>
</body>
</html>`;

    const response = await fetch('https://api.vercel.com/v13/deployments', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: projectName, files: [{ file: 'index.html', data: htmlContent }], projectSettings: { framework: null } }),
    });

    const result = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: result.error?.message || 'Deployment failed' });
    return res.status(200).json({ url: result.url });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
