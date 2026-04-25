# Portify - Dynamic Portfolio Builder

**Portify** is a premium, serverless-ready full-stack application that allows users to create, preview, and instantly deploy professional portfolios. 

## 🌟 Key Features

### 1. Direct Vercel Deployment (One-Click)
Unlike traditional builders, Portify integrates directly with the **Vercel API**. Users can provide their Vercel Access Token and a project name to have their portfolio instantly deployed to a real domain on their own Vercel account.

### 2. Premium Theme Engine
Portify comes with three distinct, professionally designed themes:
- **Creative**: A bold, dark-mode design with glassmorphism effects and vibrant gradients.
- **Professional**: A clean, corporate aesthetic focused on readability and authority.
- **Minimal**: A sophisticated, typography-first design for a refined personal brand.

### 3. Serverless Shareable Links
The app uses a unique **URL-Hash Architecture**. When a user "Publishes," their entire portfolio data is serialized, Base64-encoded, and attached to the URL hash. This allows for:
- **Zero Database Maintenance**: Portfolios can be shared without any persistent database storage.
- **Instant Previews**: Any browser can render the shared portfolio immediately.

### 4. Animation & Interactivity
- **Main App**: Uses **Framer Motion** for high-end micro-animations and transitions.
- **Deployed Sites**: Automatically integrates **AOS (Animate On Scroll)** to ensure that even standalone HTML deployments feel alive and interactive.

## 🛠️ Technology Stack

- **Frontend**: React (Vite), TypeScript.
- **Styling**: Tailwind CSS v4 (Modern CSS-first approach).
- **Animations**: Framer Motion & AOS.
- **Icons**: Lucide-React.
- **Deployment**: Vercel Serverless Functions (Node.js).

## 📂 Project Architecture

```text
/
├── api/             # Vercel Serverless Functions
│   └── deploy.ts    # Logic for automated Vercel API deployments
├── src/
│   ├── components/  # React Components (Editor, Preview, Themes)
│   ├── types.ts     # Central TypeScript schema for portfolio data
│   ├── App.tsx      # Main application logic and state management
│   └── index.css    # Tailwind v4 configuration and global styles
├── public/          # Static assets
└── index.html       # Application entry point
```

## 🚀 How to Use (For Users)

1. **Customize**: Enter your name, bio, skills, and projects in the Editor.
2. **Theme**: Select your preferred theme and accent color.
3. **Publish (Internal)**: Click "Publish" to get a shareable URL that works via hash.
4. **Deploy (Professional)**: 
   - Scroll to the Vercel Deployment section.
   - Enter your Vercel Access Token and a Project Name.
   - Click the **Rocket icon** 🚀 to go live on your own domain.

## 👨‍💻 Developer Deployment

To host your own version of Portify:
1. Push the code to a GitHub repository.
2. Connect the repository to Vercel.
3. Vercel will automatically detect the Vite settings and the `/api` route.
4. No environment variables are required!

---
*Created with ❤️ by rekharamesh200524*
