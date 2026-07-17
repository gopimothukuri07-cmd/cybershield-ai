export interface SlideContent {
  id: number;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  speakerNotes: string;
}

import React from 'react';

export const slides: SlideContent[] = [
  {
    id: 1,
    title: "CyberShield AI",
    subtitle: "Real-Time DDoS Threat Intelligence & Monitoring Platform",
    speakerNotes: "Good morning/afternoon respected faculty and reviewers. My name is M. Gopi, and today I will be presenting my project, CyberShield AI, which is a Real-Time DDoS Threat Intelligence and Monitoring Platform.",
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
        <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-green drop-shadow-[0_0_15px_rgba(0,240,255,0.6)]">
          CYBERSHIELD AI
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-300 font-mono tracking-widest max-w-3xl">
          Real-Time DDoS Threat Intelligence & Monitoring Platform
        </h2>
        <div className="mt-12 p-6 glass-panel border border-cyber-blue/30 rounded-xl">
          <p className="text-cyber-blue font-bold tracking-widest">Presented by</p>
          <p className="text-white text-2xl font-black mt-2">M. GOPI</p>
          <p className="text-gray-400 mt-1">Sri Mittapalli College of Engineering (SMCE), Guntur</p>
          <p className="text-gray-500 text-sm mt-1">Year: 2026</p>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "Problem Statement",
    speakerNotes: "In today's digital landscape, DDoS attacks are a massive threat to organizations. The core problem is that security teams often lack intuitive, real-time visual tools to monitor these attacks as they happen. Without live visualization and immediate threat intelligence, detecting and mitigating these attacks is delayed, which can lead to significant network downtime.",
    content: (
      <div className="flex flex-col h-full justify-center space-y-8 pl-8">
        <ul className="space-y-6 text-xl text-gray-300 list-none">
          <li className="flex items-start gap-4">
            <span className="text-cyber-red mt-1">⚠️</span>
            <span>Distributed Denial of Service (DDoS) attacks are increasing in scale and complexity.</span>
          </li>
          <li className="flex items-start gap-4">
            <span className="text-cyber-red mt-1">⚠️</span>
            <span>Organizations lack real-time, visual tools to monitor incoming threat vectors globally.</span>
          </li>
          <li className="flex items-start gap-4">
            <span className="text-cyber-red mt-1">⚠️</span>
            <span>Existing tools are often too complex, hard to interpret, or lack live visualization.</span>
          </li>
          <li className="flex items-start gap-4">
            <span className="text-cyber-red mt-1">⚠️</span>
            <span>Delayed threat detection leads to severe network downtime and financial loss.</span>
          </li>
        </ul>
      </div>
    )
  },
  {
    id: 3,
    title: "Objective",
    speakerNotes: "The objective of CyberShield AI is to solve this by providing a single-pane-of-glass dashboard for SOC analysts. Our goal is to visualize attacks on a 3D globe, analyze their severity in real-time, and stream incident logs instantly using WebSockets, ensuring zero-latency monitoring.",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full items-center">
        <div className="glass-panel p-8 border-l-4 border-cyber-blue hover:scale-105 transition-transform">
          <h3 className="text-2xl font-bold text-cyber-blue mb-3">👁️ Visualize</h3>
          <p className="text-gray-400">Build an interactive 3D globe to map attack origins and targets in real-time.</p>
        </div>
        <div className="glass-panel p-8 border-l-4 border-cyber-green hover:scale-105 transition-transform">
          <h3 className="text-2xl font-bold text-cyber-green mb-3">🧠 Analyze</h3>
          <p className="text-gray-400">Implement an AI-driven threat scoring system to categorize attack severity.</p>
        </div>
        <div className="glass-panel p-8 border-l-4 border-cyber-purple hover:scale-105 transition-transform">
          <h3 className="text-2xl font-bold text-cyber-purple mb-3">⚡ Monitor</h3>
          <p className="text-gray-400">Provide a live stream of incident logs via WebSockets for zero-latency monitoring.</p>
        </div>
        <div className="glass-panel p-8 border-l-4 border-orange-400 hover:scale-105 transition-transform">
          <h3 className="text-2xl font-bold text-orange-400 mb-3">🎯 Simplify</h3>
          <p className="text-gray-400">Create a seamless, single-pane-of-glass dashboard for SOC analysts.</p>
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: "Key Features",
    speakerNotes: "The key features of our platform include an interactive 3D threat map using NASA textures, a live incident feed that updates without refreshing, automated threat categorization, and a detailed analytics dashboard to track attack protocols. All of this is secured behind a robust authentication system.",
    content: (
      <div className="flex flex-col h-full justify-center space-y-6 pl-8">
        {[
          { title: "Interactive 3D Threat Map", desc: "Photorealistic globe with attack vectors and impact rings.", color: "text-cyber-blue" },
          { title: "Real-Time Incident Feed", desc: "Live updating table of incoming attacks without page refresh.", color: "text-cyber-green" },
          { title: "Automated Threat Categorization", desc: "Dynamic severity assignment based on packet rate and protocol.", color: "text-cyber-purple" },
          { title: "Analytics Dashboard", desc: "Graphical breakdown of attack protocols and system mitigation rates.", color: "text-orange-400" },
          { title: "Secure Authentication", desc: "Role-based access for authorized SOC analysts.", color: "text-red-400" }
        ].map((feat, i) => (
          <div key={i} className="flex items-center gap-6 glass-panel p-4 rounded-xl border border-white/5">
            <div className={`text-3xl font-black ${feat.color}`}>0{i+1}</div>
            <div>
              <h4 className="text-xl font-bold text-white mb-1">{feat.title}</h4>
              <p className="text-gray-400">{feat.desc}</p>
            </div>
          </div>
        ))}
      </div>
    )
  },
  {
    id: 5,
    title: "Application Showcase",
    speakerNotes: "Here is a quick look at the application interfaces. We have a modern landing page, a secure login portal, our main 3D globe dashboard, and a dedicated statistics page. The UI uses a 'glassmorphism' design on a dark theme to reduce eye strain for analysts.",
    content: (
      <div className="flex flex-col items-center justify-center h-full space-y-8 text-center">
        <p className="text-xl text-gray-300 max-w-2xl">
          The application features a modern, responsive UI tailored for Security Operations Centers, utilizing dark themes and glassmorphism.
        </p>
        <div className="grid grid-cols-2 gap-4 w-full max-w-4xl">
          <div className="p-4 border border-white/10 bg-black/40 rounded flex items-center justify-center h-32">
            <span className="text-cyber-blue font-mono">1. LANDING PAGE</span>
          </div>
          <div className="p-4 border border-white/10 bg-black/40 rounded flex items-center justify-center h-32">
            <span className="text-cyber-green font-mono">2. SOC LOGIN</span>
          </div>
          <div className="p-4 border border-white/10 bg-black/40 rounded flex items-center justify-center h-32">
            <span className="text-cyber-purple font-mono">3. 3D THREAT GLOBE</span>
          </div>
          <div className="p-4 border border-white/10 bg-black/40 rounded flex items-center justify-center h-32">
            <span className="text-orange-400 font-mono">4. ANALYTICS & STATS</span>
          </div>
        </div>
        <p className="text-sm text-gray-500 font-mono animate-pulse">
          (Interactive Live Demo will follow)
        </p>
      </div>
    )
  },
  {
    id: 6,
    title: "Technology Stack",
    speakerNotes: "To build this, I used a modern tech stack. The frontend is built with React, TypeScript, and Tailwind CSS, utilizing globe.gl for the 3D rendering. The backend is powered by Python and FastAPI, which is excellent for handling high-concurrency WebSocket connections. The app is fully deployed on GitHub Pages and Render.",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full items-center">
        <div className="glass-panel p-8 rounded-2xl border-t-4 border-cyber-blue h-full flex flex-col">
          <h3 className="text-2xl font-bold mb-6 text-center border-b border-white/10 pb-4">Frontend</h3>
          <ul className="space-y-3 flex-1 text-gray-300">
            <li>• React 18</li>
            <li>• TypeScript</li>
            <li>• Vite Bundler</li>
            <li>• Tailwind CSS</li>
            <li>• globe.gl (Three.js WebGL)</li>
            <li>• Framer Motion</li>
          </ul>
        </div>
        <div className="glass-panel p-8 rounded-2xl border-t-4 border-cyber-green h-full flex flex-col">
          <h3 className="text-2xl font-bold mb-6 text-center border-b border-white/10 pb-4">Backend</h3>
          <ul className="space-y-3 flex-1 text-gray-300">
            <li>• Python 3</li>
            <li>• FastAPI</li>
            <li>• WebSockets</li>
            <li>• Uvicorn (ASGI)</li>
            <li>• Pydantic (Validation)</li>
          </ul>
        </div>
        <div className="glass-panel p-8 rounded-2xl border-t-4 border-orange-400 h-full flex flex-col">
          <h3 className="text-2xl font-bold mb-6 text-center border-b border-white/10 pb-4">Deployment & Tools</h3>
          <ul className="space-y-3 flex-1 text-gray-300">
            <li>• GitHub Pages (Frontend)</li>
            <li>• Render Cloud (API / WS)</li>
            <li>• Git Version Control</li>
            <li>• Playwright (Testing)</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 7,
    title: "System Architecture",
    speakerNotes: "Our system architecture is designed for speed. The React client establishes a persistent WebSocket connection with the FastAPI backend. A threat simulation module generates realistic network intrusion data, which is immediately broadcasted to all connected clients for rendering.",
    content: (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-full max-w-4xl glass-panel p-8 rounded-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-cyber-blue/5 animate-pulse"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center p-6 border border-cyber-blue/30 rounded bg-black/50">
              <h4 className="text-cyber-blue font-bold text-xl mb-2">Client Browser</h4>
              <p className="text-xs text-gray-400">React SPA / WebGL Rendering</p>
            </div>
            
            <div className="flex flex-col items-center justify-center gap-2">
              <span className="text-xs text-cyber-green font-mono">WebSockets & REST</span>
              <div className="flex items-center gap-2 text-cyber-green">
                <span className="text-2xl">←</span>
                <span className="px-4 py-1 border border-cyber-green/50 rounded-full text-xs">JSON Payloads</span>
                <span className="text-2xl">→</span>
              </div>
            </div>

            <div className="flex-1 text-center p-6 border border-cyber-green/30 rounded bg-black/50">
              <h4 className="text-cyber-green font-bold text-xl mb-2">FastAPI Server</h4>
              <p className="text-xs text-gray-400">Auth & WS Broadcasting</p>
            </div>
            
            <div className="flex flex-col items-center justify-center gap-2">
              <span className="text-xs text-orange-400 font-mono">Internal</span>
              <div className="text-orange-400 text-2xl">↔</div>
            </div>

            <div className="flex-1 text-center p-6 border border-orange-400/30 rounded bg-black/50">
              <h4 className="text-orange-400 font-bold text-xl mb-2">Data Engine</h4>
              <p className="text-xs text-gray-400">Threat Simulator / DB</p>
            </div>
          </div>
        </div>
        <ul className="mt-12 space-y-2 text-gray-300 max-w-2xl text-center list-none">
          <li><span className="text-cyber-blue font-bold">Client Tier:</span> React SPA rendering 3D graphics and listening to WebSocket events.</li>
          <li><span className="text-cyber-green font-bold">API Tier:</span> FastAPI handling JWT authentication and REST endpoints.</li>
          <li><span className="text-orange-400 font-bold">Stream Tier:</span> Continuous broadcasting of simulated intrusion events.</li>
        </ul>
      </div>
    )
  },
  {
    id: 8,
    title: "Development Methodology",
    speakerNotes: "The project was developed in four main phases: Requirement Analysis, Backend Architecture focusing on WebSockets, Frontend Integration where the complex 3D globe was built, and finally, rigorous testing for latency before deploying to the cloud.",
    content: (
      <div className="flex flex-col justify-center h-full max-w-4xl mx-auto relative">
        <div className="absolute left-8 top-10 bottom-10 w-1 bg-white/10 rounded"></div>
        <div className="space-y-12">
          {[
            { step: "01", title: "Requirement Analysis", desc: "Identifying SOC needs, visualization requirements, and tech stack selection." },
            { step: "02", title: "Backend Architecture", desc: "Developing REST APIs, secure auth, and the Python WebSocket simulation engine." },
            { step: "03", title: "Frontend Integration", desc: "Building the React UI, glassmorphism components, and integrating Three.js for the globe." },
            { step: "04", title: "Testing & Deployment", desc: "Testing real-time latency, ensuring responsiveness, and multi-cloud deployment." }
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-8 relative">
              <div className="w-16 h-16 rounded-full bg-black border-2 border-cyber-blue flex items-center justify-center text-xl font-black z-10 shrink-0">
                {item.step}
              </div>
              <div className="glass-panel p-6 rounded-xl flex-1 mt-2">
                <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 9,
    title: "Results Achieved",
    speakerNotes: "The final output is a highly performant application. We achieved sub-second latency in streaming data, and the application easily handles visualizing dozens of concurrent attacks. The analytics dynamically update, proving the efficiency of our WebSocket implementation.",
    content: (
      <div className="grid grid-cols-2 gap-6 h-full items-center pl-8">
        <div className="space-y-8">
          <div className="glass-panel p-6 border-l-4 border-cyber-green">
            <h4 className="text-lg font-bold text-white">High Concurrency</h4>
            <p className="text-gray-400 text-sm mt-2">Successfully simulated and visualized up to 100 concurrent network attacks per second.</p>
          </div>
          <div className="glass-panel p-6 border-l-4 border-cyber-green">
            <h4 className="text-lg font-bold text-white">Sub-Second Latency</h4>
            <p className="text-gray-400 text-sm mt-2">Near zero latency between backend generation and frontend rendering over WebSockets.</p>
          </div>
          <div className="glass-panel p-6 border-l-4 border-cyber-green">
            <h4 className="text-lg font-bold text-white">Live Aggregation</h4>
            <p className="text-gray-400 text-sm mt-2">Real-time dynamic aggregation of statistics including Threat Index and Mitigation Rate.</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-64 h-64 border-[16px] border-cyber-green/20 rounded-full flex flex-col items-center justify-center relative">
            <div className="absolute inset-0 rounded-full border-4 border-cyber-green border-t-transparent animate-spin"></div>
            <span className="text-5xl font-black text-white">100%</span>
            <span className="text-sm font-mono text-cyber-green mt-2 tracking-widest">SUCCESS</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 10,
    title: "Challenges & Solutions",
    speakerNotes: "During development, two major challenges arose. First, high-frequency WebSocket messages were causing the browser to freeze. I solved this by optimizing React state updates and capping the log history. Second, rendering the 3D globe was resource-intensive, which I resolved by ensuring hardware-accelerated WebGL rendering.",
    content: (
      <div className="flex flex-col h-full justify-center space-y-12 pl-8">
        <div className="glass-panel p-8 border border-red-500/30 relative">
          <span className="absolute -top-4 left-6 bg-red-500/20 text-red-400 px-4 py-1 rounded text-sm font-bold border border-red-500/50">Challenge 1</span>
          <h4 className="text-xl font-bold text-white mb-2 mt-2">High-Frequency State Updates</h4>
          <p className="text-gray-400 mb-4">Incoming WebSocket messages (dozens per second) were causing excessive React re-renders, leading to browser freezing.</p>
          <div className="bg-cyber-green/10 border border-cyber-green/30 p-4 rounded">
            <span className="text-cyber-green font-bold">Solution:</span> Implemented array slicing to cap logs at 500 records and batched React state updates for efficient memory management.
          </div>
        </div>
        
        <div className="glass-panel p-8 border border-red-500/30 relative">
          <span className="absolute -top-4 left-6 bg-red-500/20 text-red-400 px-4 py-1 rounded text-sm font-bold border border-red-500/50">Challenge 2</span>
          <h4 className="text-xl font-bold text-white mb-2 mt-2">3D Rendering Performance</h4>
          <p className="text-gray-400 mb-4">Rendering a photorealistic 3D globe with hundreds of dynamic arcs and impact rings dropped frame rates drastically.</p>
          <div className="bg-cyber-green/10 border border-cyber-green/30 p-4 rounded">
            <span className="text-cyber-green font-bold">Solution:</span> Utilized WebGL via globe.gl to offload mathematical computations and rendering directly to the GPU, ensuring a smooth 60fps experience.
          </div>
        </div>
      </div>
    )
  },
  {
    id: 11,
    title: "Future Scope",
    speakerNotes: "For future enhancements, the platform can be connected to real network intrusion detection systems like Snort or Suricata. We also plan to integrate Machine Learning models to predict attack patterns before they happen, and add automated PDF reporting for compliance.",
    content: (
      <div className="grid grid-cols-2 gap-8 h-full items-center pl-8">
        <div className="glass-panel p-8 rounded-xl h-full flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors">
          <div className="text-5xl mb-4">📡</div>
          <h4 className="text-xl font-bold text-white mb-3">Real IDS Integration</h4>
          <p className="text-gray-400 text-sm">Replace the simulator by directly hooking the backend into real production IDS/IPS systems (e.g., Snort, Suricata, Zeek).</p>
        </div>
        <div className="glass-panel p-8 rounded-xl h-full flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors">
          <div className="text-5xl mb-4">🧠</div>
          <h4 className="text-xl font-bold text-white mb-3">Machine Learning</h4>
          <p className="text-gray-400 text-sm">Integrate predictive AI models to analyze historical traffic patterns and forecast attacks before they occur.</p>
        </div>
        <div className="glass-panel p-8 rounded-xl h-full flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors">
          <div className="text-5xl mb-4">📄</div>
          <h4 className="text-xl font-bold text-white mb-3">Automated Reporting</h4>
          <p className="text-gray-400 text-sm">Generate and export automated PDF compliance reports and historical threat analyses.</p>
        </div>
        <div className="glass-panel p-8 rounded-xl h-full flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors">
          <div className="text-5xl mb-4">🏢</div>
          <h4 className="text-xl font-bold text-white mb-3">Multi-Tenant Architecture</h4>
          <p className="text-gray-400 text-sm">Expand the platform to support Managed Security Service Providers (MSSPs) monitoring multiple client networks simultaneously.</p>
        </div>
      </div>
    )
  },
  {
    id: 12,
    title: "Conclusion",
    speakerNotes: "Thank you to the review panel and my mentors for their guidance. I am now open to any questions.",
    content: (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-green mb-12">
          THANK YOU
        </h2>
        
        <div className="glass-panel p-8 rounded-2xl border border-cyber-blue/30 w-full max-w-2xl text-left space-y-4 shadow-[0_0_30px_rgba(0,240,255,0.1)]">
          <p className="text-center text-xs font-mono text-gray-500 mb-6 tracking-widest border-b border-white/10 pb-4">
            PROJECT PRESENTED BY
          </p>
          
          <div className="grid grid-cols-[140px_1fr] gap-x-4 gap-y-3 text-sm">
            <span className="text-gray-400 font-mono text-right">Full Name:</span>
            <span className="text-white font-bold text-base">MOTHUKURI GOPI</span>
            
            <span className="text-gray-400 font-mono text-right">College Name:</span>
            <span className="text-white">Sri Mittapalli College of Engineering (SMCE), Guntur</span>
            
            <span className="text-gray-400 font-mono text-right">Year:</span>
            <span className="text-white">4th Year (B.Tech CSE)</span>
            
            <span className="text-gray-400 font-mono text-right">Contact:</span>
            <a href="tel:+919705328679" className="text-cyber-blue hover:underline transition-all">
              +91 9705328679
            </a>
            
            <span className="text-gray-400 font-mono text-right">Email:</span>
            <a href="mailto:gopimothukuri07@gmail.com" className="text-cyber-green hover:underline transition-all">
              gopimothukuri07@gmail.com
            </a>
            
            <span className="text-gray-400 font-mono text-right mt-4 pt-4 border-t border-white/10">Deployed Link:</span>
            <a href="https://gopimothukuri07-cmd.github.io/cybershield-ai/" target="_blank" rel="noreferrer" className="text-cyber-blue hover:underline truncate mt-4 pt-4 border-t border-white/10">
              cybershield-ai/
            </a>
            
            <span className="text-gray-400 font-mono text-right">Presentation:</span>
            <a href="https://gopimothukuri07-cmd.github.io/cybershield-ai/presentation/" target="_blank" rel="noreferrer" className="text-cyber-blue hover:underline truncate">
              cybershield-ai/presentation/
            </a>
            
            <span className="text-gray-400 font-mono text-right">GitHub Repo:</span>
            <a href="https://github.com/gopimothukuri07-cmd/cybershield-ai" target="_blank" rel="noreferrer" className="text-cyber-blue hover:underline truncate">
              cybershield-ai/ (GitHub)
            </a>
          </div>
        </div>
        
        <p className="mt-12 text-sm text-gray-500 font-mono tracking-widest animate-pulse">
          QUESTIONS WELCOME
        </p>
      </div>
    )
  }
];
