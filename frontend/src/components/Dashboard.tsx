import React, { useEffect, useState } from 'react';
import GlobeMap from './GlobeMap';
import LiveFeed from './LiveFeed';
import AnalyticsCharts from './AnalyticsCharts';
import { wsService } from '../services/socket';
import { authService } from '../services/auth';

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

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

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
    <div className="flex h-full w-full">
      {/* Main 3D Globe View - Takes up most of the screen */}
      <div className="flex-grow relative h-full">
        <GlobeMap events={events} />
        
        {/* Overlay Stats */}
        <div className="absolute top-4 left-4 grid grid-cols-2 gap-4">
           <div className="glass-panel p-4 w-48">
             <div className="text-xs text-gray-400">Total Threats Handled</div>
             <div className="text-3xl font-mono text-cyber-blue">{stats?.total_threats || 0}</div>
           </div>
           <div className="glass-panel p-4 w-48">
             <div className="text-xs text-gray-400">Critical Threats</div>
             <div className="text-3xl font-mono text-cyber-red">{stats?.critical_threats || 0}</div>
           </div>
           <div className="glass-panel p-4 w-48">
             <div className="text-xs text-gray-400">Sys Health</div>
             <div className={`text-3xl font-mono ${stats?.system_health > 90 ? 'text-cyber-green' : 'text-orange-500'}`}>
               {stats?.system_health || 100}%
             </div>
           </div>
           <div className="glass-panel p-4 w-48">
             <div className="text-xs text-gray-400">AI Threat Level</div>
             <div className={`text-3xl font-mono ${stats?.threat_level === 'Critical' ? 'text-cyber-red animate-pulse' : 'text-cyber-blue'}`}>
               {stats?.threat_level || 'Low'}
             </div>
           </div>
        </div>
      </div>

      {/* Right Sidebar - Live Feed */}
      <div className="w-96 glass-panel border-l border-white/10 h-full overflow-hidden flex flex-col">
        <div className="p-4 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-lg font-bold text-cyber-blue">Live Attack Feed</h2>
          <span className="text-xs bg-cyber-blue/20 text-cyber-blue px-2 py-1 rounded">
            {events.length} Active
          </span>
        </div>
        <div className="flex-grow overflow-auto p-2">
          <LiveFeed events={events} />
          <AnalyticsCharts events={events} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
