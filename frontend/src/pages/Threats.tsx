import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { wsService } from '../services/socket';
import type { ThreatEvent } from '../components/Dashboard';

const SEVERITY_BADGE: Record<string, string> = {
  Critical: 'bg-red-500/20 text-red-400 border border-red-500/40',
  High: 'bg-orange-500/20 text-orange-400 border border-orange-500/40',
  Medium: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40',
  Low: 'bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/30',
};

const Threats: React.FC = () => {
  const [events, setEvents] = useState<ThreatEvent[]>([]);
  const [filter, setFilter] = useState<string>('All');

  useEffect(() => {
    wsService.connect();
    const unsub = wsService.subscribe((data: ThreatEvent) => {
      setEvents((prev) => [{ ...data, timestamp: new Date().toLocaleTimeString() }, ...prev].slice(0, 500));
    });
    return () => unsub();
  }, []);

  const severityFilters = ['All', 'Critical', 'High', 'Medium', 'Low'];

  const filtered =
    filter === 'All' ? events : events.filter((e) => e.severity === filter);

  return (
    <div className="min-h-screen bg-[#020408] text-white">
      <Navbar />
      <main className="pt-16 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black tracking-widest text-cyber-blue font-mono">
                LIVE THREAT FEED
              </h1>
              <p className="text-gray-500 text-sm font-mono mt-1">
                Real-time DDoS attack event stream — {events.length} events logged
              </p>
            </div>

            {/* Severity Filter */}
            <div className="flex gap-2">
              {severityFilters.map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`px-3 py-1.5 text-[10px] font-mono tracking-widest rounded border transition-all ${
                    filter === s
                      ? 'bg-cyber-blue/20 text-cyber-blue border-cyber-blue/40'
                      : 'text-gray-400 border-white/10 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Table Header */}
          <div className="backdrop-blur-xl bg-black/60 border border-white/10 rounded-xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-7 text-[10px] font-mono tracking-widest text-gray-500 bg-black/40 px-4 py-3 border-b border-white/10">
              <span>TIME</span>
              <span>SEVERITY</span>
              <span>ATTACK TYPE</span>
              <span>PROTOCOL</span>
              <span>SOURCE</span>
              <span>DESTINATION</span>
              <span className="text-right">PACKET RATE</span>
            </div>

            <div className="overflow-y-auto max-h-[calc(100vh-280px)]">
              {filtered.length === 0 ? (
                <p className="text-gray-600 text-xs font-mono text-center py-16">
                  No events yet — awaiting live data stream...
                </p>
              ) : (
                filtered.map((evt, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-7 items-center px-4 py-2.5 border-b border-white/5 hover:bg-white/3 transition-colors text-xs font-mono"
                  >
                    <span className="text-gray-500 text-[10px]">
                      {(evt as any).timestamp || new Date().toLocaleTimeString()}
                    </span>
                    <span>
                      <span
                        className={`px-2 py-0.5 rounded text-[9px] font-bold tracking-wider ${
                          SEVERITY_BADGE[evt.severity] || SEVERITY_BADGE.Low
                        }`}
                      >
                        {evt.severity}
                      </span>
                    </span>
                    <span className="text-white">{evt.attack_type}</span>
                    <span className="text-cyber-blue">{evt.protocol}</span>
                    <span className="text-gray-300">
                      {evt.source_country} ({evt.source_ip})
                    </span>
                    <span className="text-gray-300">
                      {evt.target_country} ({evt.destination_ip})
                    </span>
                    <span className="text-right text-cyber-green">
                      {(evt.packet_rate / 1000).toFixed(0)}k pps
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Threats;
