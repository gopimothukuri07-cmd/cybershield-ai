import React, { useEffect, useState } from 'react';
import GlobeMap from './GlobeMap';
import LiveFeed from './LiveFeed';
import AnalyticsCharts from './AnalyticsCharts';
import { wsService } from '../services/socket';
import { authService } from '../services/auth';
import { API_URL } from '../config';

export interface ThreatEvent {
  source_country: string;
  target_country: string;
  source_ip: string;
  destination_ip: string;
  protocol: string;
  attack_type: string;
  severity: string;
  confidence: number;
  packet_rate: number;
}

const Dashboard: React.FC = () => {
  const [events, setEvents] = useState<ThreatEvent[]>([]);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    wsService.connect();
    const unsubscribe = wsService.subscribe((data: ThreatEvent) => {
      setEvents(prev => [data, ...prev].slice(0, 50));
    });

    // Fetch initial stats
    const fetchStats = async () => {
      try {
        const token = authService.getToken();
        const response = await fetch(`${API_URL}/api/analytics/statistics`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (e) {
        console.error("Error fetching stats", e);
      }
    };
    
    fetchStats();
    const interval = setInterval(fetchStats, 5000); // Poll every 5s

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#020204]">
      {/* Immersive Full Screen 3D Globe - Serves as the Background canvas */}
      <div className="absolute inset-0 w-full h-full z-0">
        <GlobeMap events={events} />
      </div>

      {/* FLOAT PANELS - Glassmorphism command center overlays */}
      <div className="absolute inset-0 z-10 pointer-events-none flex justify-between p-6 h-full select-none">
        
        {/* LEFT OVERLAY: System Metrics & Attack Analytics */}
        <div className="w-80 pointer-events-auto flex flex-col gap-4 h-full overflow-y-auto pr-1">
          {/* Main Title Banner */}
          <div className="backdrop-blur-xl bg-black/60 border border-white/10 rounded-xl p-4 shadow-2xl shadow-black/80">
            <h2 className="text-sm font-mono tracking-widest text-cyber-blue font-bold">SYSTEM INTEGRITY STATUS</h2>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-gray-400">Threat Mitigation Engine</span>
              <span className="text-xs text-cyber-green font-mono flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse"></span> ACTIVE
              </span>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="backdrop-blur-xl bg-black/60 border border-white/10 rounded-xl p-3 shadow-2xl shadow-black/80">
              <div className="text-[10px] font-mono text-gray-400 uppercase">Total Logged</div>
              <div className="text-xl font-bold font-mono text-cyber-blue mt-1">
                {stats?.total_threats || 0}
              </div>
            </div>
            <div className="backdrop-blur-xl bg-black/60 border border-white/10 rounded-xl p-3 shadow-2xl shadow-black/80 border-red-500/20">
              <div className="text-[10px] font-mono text-gray-400 uppercase">Critical Attacks</div>
              <div className="text-xl font-bold font-mono text-cyber-red mt-1">
                {stats?.critical_threats || 0}
              </div>
            </div>
            <div className="backdrop-blur-xl bg-black/60 border border-white/10 rounded-xl p-3 shadow-2xl shadow-black/80">
              <div className="text-[10px] font-mono text-gray-400 uppercase">Mitigation Rate</div>
              <div className={`text-xl font-bold font-mono mt-1 ${stats?.system_health > 90 ? 'text-cyber-green' : 'text-orange-500'}`}>
                {stats?.system_health || 100}%
              </div>
            </div>
            <div className="backdrop-blur-xl bg-black/60 border border-white/10 rounded-xl p-3 shadow-2xl shadow-black/80">
              <div className="text-[10px] font-mono text-gray-400 uppercase">Threat Index</div>
              <div className={`text-xl font-bold font-mono mt-1 ${stats?.threat_level === 'Critical' ? 'text-cyber-red animate-pulse' : 'text-cyber-blue'}`}>
                {stats?.threat_level || 'Low'}
              </div>
            </div>
          </div>

          {/* Charts Overlay */}
          <div className="backdrop-blur-xl bg-black/60 border border-white/10 rounded-xl p-4 shadow-2xl shadow-black/80 flex-grow max-h-[460px]">
            <h3 className="text-xs font-mono tracking-wider text-gray-300 font-bold border-b border-white/5 pb-2">THREAT ANALYTICS</h3>
            <div className="h-full overflow-y-auto pb-6">
              <AnalyticsCharts events={events} />
            </div>
          </div>
        </div>

        {/* RIGHT OVERLAY: Real-Time Incident Stream */}
        <div className="w-[420px] pointer-events-auto flex flex-col gap-4 h-full">
          <div className="backdrop-blur-xl bg-black/60 border border-white/10 rounded-xl shadow-2xl shadow-black/80 flex flex-col h-full overflow-hidden">
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/30">
              <div className="flex flex-col">
                <h2 className="text-sm font-mono tracking-widest text-cyber-blue font-bold">INCIDENT FEED</h2>
                <span className="text-[10px] text-gray-500 font-mono">MITIGATING REAL-TIME THREAT VECTORS</span>
              </div>
              <span className="text-xs bg-cyber-blue/15 text-cyber-blue border border-cyber-blue/20 px-2 py-0.5 rounded font-mono">
                {events.length} LOGS
              </span>
            </div>
            
            {/* Scrollable incidents feed */}
            <div className="flex-grow overflow-y-auto p-4 flex flex-col gap-3">
              <LiveFeed events={events} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
