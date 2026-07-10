import React, { useEffect, useState } from 'react';
import GlobeMap from './GlobeMap';
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
  timestamp?: string;
}

const SEVERITY_COLOR: Record<string, string> = {
  Critical: 'text-red-400 border-red-500/40 bg-red-500/10',
  High: 'text-orange-400 border-orange-500/40 bg-orange-500/10',
  Medium: 'text-yellow-400 border-yellow-500/40 bg-yellow-500/10',
  Low: 'text-cyber-blue border-cyber-blue/40 bg-cyber-blue/10',
};

const Dashboard: React.FC = () => {
  const [events, setEvents] = useState<ThreatEvent[]>([]);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    wsService.connect();
    const unsubscribe = wsService.subscribe((data: ThreatEvent) => {
      setEvents((prev) => [data, ...prev].slice(0, 100));
    });

    const fetchStats = async () => {
      try {
        const token = authService.getToken();
        const res = await fetch(`${API_URL}/api/analytics/statistics`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) setStats(await res.json());
      } catch (e) {
        console.error('Stats fetch error', e);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const recentEvents = events.slice(0, 6);

  return (
    <div className="relative w-full h-full bg-[#020408] overflow-hidden">
      {/* === Full-screen 3D Earth Globe === */}
      <div className="absolute inset-0 w-full h-full z-0">
        <GlobeMap events={events} />
      </div>

      {/* === LEFT FLOATING PANEL: System Status === */}
      <div className="absolute left-4 top-16 bottom-4 z-10 w-64 flex flex-col gap-3 pointer-events-none">
        {/* Stats */}
        <div className="pointer-events-auto backdrop-blur-xl bg-black/70 border border-white/10 rounded-xl p-4 shadow-2xl">
          <p className="text-[10px] font-mono text-cyber-blue tracking-widest mb-3 border-b border-white/10 pb-2">
            SYSTEM STATUS
          </p>
          <div className="space-y-3">
            {[
              {
                label: 'Total Threats',
                value: stats?.total_threats ?? 0,
                color: 'text-cyber-blue',
              },
              {
                label: 'Critical',
                value: stats?.critical_threats ?? 0,
                color: 'text-red-400',
              },
              {
                label: 'Mitigation',
                value: `${stats?.system_health ?? 100}%`,
                color:
                  (stats?.system_health ?? 100) > 90
                    ? 'text-cyber-green'
                    : 'text-orange-400',
              },
              {
                label: 'Threat Level',
                value: stats?.threat_level ?? 'Low',
                color:
                  stats?.threat_level === 'Critical'
                    ? 'text-red-400 animate-pulse'
                    : 'text-cyber-blue',
              },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center">
                <span className="text-[11px] text-gray-400 font-mono">{item.label}</span>
                <span className={`text-sm font-bold font-mono ${item.color}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Attack Types Legend */}
        <div className="pointer-events-auto backdrop-blur-xl bg-black/70 border border-white/10 rounded-xl p-4 shadow-2xl">
          <p className="text-[10px] font-mono text-cyber-blue tracking-widest mb-3 border-b border-white/10 pb-2">
            ATTACK TYPES
          </p>
          {[
            { label: 'Critical / High', color: '#ff003c' },
            { label: 'Medium', color: '#b026ff' },
            { label: 'Target Rings', color: '#ff003c', ring: true },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 mb-2">
              <div
                className={`w-8 h-0.5 ${item.ring ? 'rounded-full border border-dashed' : ''}`}
                style={{
                  backgroundColor: item.ring ? 'transparent' : item.color,
                  borderColor: item.ring ? item.color : undefined,
                }}
              />
              <span className="text-[11px] text-gray-400 font-mono">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* === RIGHT FLOATING PANEL: Live Incident Feed === */}
      <div className="absolute right-4 top-16 bottom-4 z-10 w-80 flex flex-col gap-3 pointer-events-none">
        <div className="pointer-events-auto backdrop-blur-xl bg-black/70 border border-white/10 rounded-xl shadow-2xl flex flex-col h-full overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/40">
            <div>
              <p className="text-[10px] font-mono text-cyber-blue tracking-widest">
                LIVE INCIDENT FEED
              </p>
              <p className="text-[9px] text-gray-500 font-mono mt-0.5">
                REAL-TIME THREAT VECTORS
              </p>
            </div>
            <span className="text-[10px] font-mono bg-cyber-blue/15 text-cyber-blue border border-cyber-blue/20 px-2 py-0.5 rounded">
              {events.length} LOGS
            </span>
          </div>

          {/* Scrollable events */}
          <div className="flex-grow overflow-y-auto p-3 space-y-2">
            {recentEvents.length === 0 ? (
              <p className="text-gray-600 text-xs font-mono text-center mt-8">
                Awaiting threat data...
              </p>
            ) : (
              events.slice(0, 30).map((evt, i) => (
                <div
                  key={i}
                  className={`rounded-lg border p-3 text-xs font-mono ${
                    SEVERITY_COLOR[evt.severity] || SEVERITY_COLOR.Low
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold">{evt.attack_type}</span>
                    <span className="text-[9px] text-gray-500">
                      {new Date().toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="text-gray-400 space-y-0.5">
                    <p>
                      <span className="text-gray-500">SRC</span>{' '}
                      {evt.source_country} ({evt.source_ip})
                    </p>
                    <p>
                      <span className="text-gray-500">DST</span>{' '}
                      {evt.target_country} ({evt.destination_ip})
                    </p>
                    <p>
                      <span className="text-gray-500">Protocol:</span>{' '}
                      {evt.protocol} | {(evt.packet_rate / 1000).toFixed(0)}k pps
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
