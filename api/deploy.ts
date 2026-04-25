export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { data, token, projectName } = req.body;

  if (!token || !projectName || !data) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // 1. Create a basic index.html for the deployment
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
  <div style="font-family: sans-serif; padding: 2rem; max-width: 800px; margin: 0 auto;">
    <h1 style="font-size: 3rem; margin-bottom: 0.5rem; color: ${data.primaryColor};">${data.name}</h1>
    <h2 style="font-size: 1.5rem; color: #666; margin-bottom: 0.5rem;">${data.title} ${data.company ? `@ ${data.company}` : ''}</h2>
    ${data.location ? `<p style="color: #888; margin-bottom: 2rem;">📍 ${data.location}</p>` : ''}
    <p style="margin-bottom: 2rem; line-height: 1.6;">${data.bio}</p>
    <h3 style="font-size: 1.25rem; margin-bottom: 1rem;">Skills</h3>
    <ul style="margin-bottom: 2rem;">
      ${data.skills.map((s: any) => `<li style="margin-bottom: 0.5rem;"><strong>${s.name}</strong> - ${s.level}%</li>`).join('')}
    </ul>
    <h3 style="font-size: 1.25rem; margin-bottom: 1rem;">Projects</h3>
    <ul>
      ${data.projects.map((p: any) => `
        <li style="margin-bottom: 1.5rem;">
          <h4 style="font-size: 1.1rem; margin-bottom: 0.25rem;"><a href="${p.link}" style="color: ${data.primaryColor};">${p.title}</a></h4>
          <p>${p.description}</p>
        </li>
      `).join('')}
    </ul>
  </div>
</body>
</html>`;

    // 2. Call Vercel API to create deployment
    // We use the 'files' array to upload the HTML directly
    const response = await fetch('https://api.vercel.com/v13/deployments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: projectName,
        files: [
          {
            file: 'index.html',
            data: htmlContent,
          },
        ],
        projectSettings: {
          framework: null,
        },
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: result.error?.message || 'Deployment failed' });
    }

    return res.status(200).json({ url: result.url });
  } catch (err: any) {
    console.error('Deployment error:', err);
    return res.status(500).json({ error: err.message });
  }
}
