import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheckIcon, GlobeAltIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-cyber-darker text-white overflow-hidden relative font-sans">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-cyber-blue/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-cyber-purple/20 rounded-full blur-[100px]" />
      </div>

      <nav className="w-full p-6 flex justify-between items-center z-10 glass-panel border-b border-white/10">
        <div className="text-2xl font-bold tracking-widest text-cyber-blue drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]">
          CYBERSHIELD AI
        </div>
        <div>
          <Link to="/login" className="px-6 py-2 border border-cyber-blue text-cyber-blue rounded hover:bg-cyber-blue hover:text-black transition-all">
            SOC Login
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-6 pt-24 pb-12 flex flex-col items-center text-center z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            Real-Time <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-green">DDoS Threat</span><br />
            Intelligence Center
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Enterprise-grade monitoring, visualization, and AI-driven analytics for Security Operations Centers. Monitor global attack vectors in real-time.
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link to="/signup" className="px-8 py-4 bg-cyber-blue text-black font-bold rounded shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] transition-all">
              Initialize Clearance
            </Link>
            <a href="#features" className="px-8 py-4 border border-white/20 rounded hover:bg-white/5 transition-all">
              System Capabilities
            </a>
          </div>
        </motion.div>

        <motion.div 
          id="features"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 w-full max-w-5xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="glass-panel p-8 flex flex-col items-center text-center">
            <GlobeAltIcon className="w-16 h-16 text-cyber-blue mb-4" />
            <h3 className="text-xl font-bold mb-2">Live Global Mapping</h3>
            <p className="text-gray-400 text-sm">Interactive 3D visualization of source and destination attack vectors worldwide.</p>
          </div>
          <div className="glass-panel p-8 flex flex-col items-center text-center">
            <ShieldCheckIcon className="w-16 h-16 text-cyber-green mb-4" />
            <h3 className="text-xl font-bold mb-2">AI Analytics</h3>
            <p className="text-gray-400 text-sm">Real-time risk scoring, threat categorization, and anomaly detection algorithms.</p>
          </div>
          <div className="glass-panel p-8 flex flex-col items-center text-center">
            <ChartBarIcon className="w-16 h-16 text-cyber-purple mb-4" />
            <h3 className="text-xl font-bold mb-2">Deep Reporting</h3>
            <p className="text-gray-400 text-sm">Generate comprehensive CSV reports and analyze protocol distribution trends.</p>
          </div>
        </motion.div>
      </main>
      
      <footer className="absolute bottom-4 w-full text-center text-xs text-gray-600">
        CyberShield AI © 2026. For Educational & Monitoring Purposes Only.
      </footer>
    </div>
  );
};

export default Landing;
