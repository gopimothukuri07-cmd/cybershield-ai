import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import AnalyticsCharts from '../components/AnalyticsCharts';
import { wsService } from '../services/socket';
import { authService } from '../services/auth';
import { API_URL } from '../config';
import type { ThreatEvent } from '../components/Dashboard';

const Statistics: React.FC = () => {
  const [events, setEvents] = useState<ThreatEvent[]>([]);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    wsService.connect();
    const unsub = wsService.subscribe((data: ThreatEvent) => {
      setEvents((prev) => [data, ...prev].slice(0, 200));
    });

    const fetchStats = async () => {
      try {
        const token = authService.getToken();
        const res = await fetch(`${API_URL}/api/analytics/statistics`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) setStats(await res.json());
      } catch (e) {
        console.error(e);
      }
    };
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => {
      unsub();
      clearInterval(interval);
    };
  }, []);

  const statCards = [
    {
      label: 'Total Threats Logged',
      value: stats?.total_threats ?? 0,
      color: 'text-cyber-blue',
      border: 'border-cyber-blue/20',
    },
    {
      label: 'Critical Attacks',
      value: stats?.critical_threats ?? 0,
      color: 'text-red-400',
      border: 'border-red-500/20',
    },
    {
      label: 'System Mitigation Rate',
      value: `${stats?.system_health ?? 100}%`,
      color: (stats?.system_health ?? 100) > 90 ? 'text-cyber-green' : 'text-orange-400',
      border: 'border-cyber-green/20',
    },
    {
      label: 'AI Threat Index',
      value: stats?.threat_level ?? 'Low',
      color: stats?.threat_level === 'Critical' ? 'text-red-400' : 'text-cyber-blue',
      border: 'border-cyber-blue/20',
    },
  ];

  return (
    <div className="min-h-screen bg-[#020408] text-white">
      <Navbar />
      <main className="pt-16 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-2xl font-black tracking-widest text-cyber-blue font-mono">
              THREAT STATISTICS
            </h1>
            <p className="text-gray-500 text-sm font-mono mt-1">
              Real-time analytics and threat intelligence aggregates
            </p>
          </div>

          {/* Stats Cards Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {statCards.map((card) => (
              <div
                key={card.label}
                className={`backdrop-blur-xl bg-black/60 border ${card.border} rounded-xl p-5 shadow-xl`}
              >
                <p className="text-[10px] font-mono text-gray-400 tracking-wider uppercase mb-2">
                  {card.label}
                </p>
                <p className={`text-3xl font-bold font-mono ${card.color}`}>{card.value}</p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="backdrop-blur-xl bg-black/60 border border-white/10 rounded-xl p-6 shadow-xl">
            <h2 className="text-xs font-mono tracking-widest text-cyber-blue mb-6 border-b border-white/10 pb-3">
              THREAT ANALYTICS CHARTS
            </h2>
            <AnalyticsCharts events={events} />
          </div>

          {/* Protocol breakdown table */}
          <div className="mt-6 backdrop-blur-xl bg-black/60 border border-white/10 rounded-xl p-6 shadow-xl">
            <h2 className="text-xs font-mono tracking-widest text-cyber-blue mb-4 border-b border-white/10 pb-3">
              TOP NETWORK ATTACK VECTORS
            </h2>
            <div className="space-y-2">
              {['HTTP', 'UDP', 'TCP', 'ICMP', 'DNS'].map((proto) => {
                const count = events.filter((e) => e.protocol === proto).length;
                const pct = events.length ? Math.round((count / events.length) * 100) : 0;
                return (
                  <div key={proto} className="flex items-center gap-4">
                    <span className="text-xs font-mono text-gray-400 w-16">{proto}</span>
                    <div className="flex-1 bg-white/5 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-cyber-blue rounded-full transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-cyber-blue w-10 text-right">
                      {pct}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Statistics;
