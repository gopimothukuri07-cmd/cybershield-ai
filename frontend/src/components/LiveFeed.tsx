import React from 'react';
import type { ThreatEvent } from './Dashboard';
import { ShieldCheckIcon } from '@heroicons/react/24/solid';

interface LiveFeedProps {
  events: ThreatEvent[];
}

const LiveFeed: React.FC<LiveFeedProps> = ({ events }) => {
  return (
    <div className="flex flex-col gap-2">
      {events.map((event, index) => (
        <div 
          key={index} 
          className="bg-black/40 border border-white/5 rounded p-3 flex flex-col gap-1 text-sm animate-pulse-once"
          style={{ animation: 'fadeIn 0.5s ease-out' }}
        >
          <div className="flex justify-between items-center">
            <span className={`font-bold ${event.severity === 'Critical' ? 'text-cyber-red' : event.severity === 'High' ? 'text-orange-500' : 'text-cyber-blue'}`}>
              {event.attack_type}
            </span>
            <span className="text-xs text-gray-500 font-mono">
              {new Date().toLocaleTimeString()}
            </span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <div className="flex items-center gap-1 text-gray-300">
              <span className="text-xs text-gray-500">SRC</span> {event.source_country} ({event.source_ip})
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1 text-gray-300">
              <span className="text-xs text-gray-500">DST</span> {event.target_country} ({event.destination_ip})
            </div>
          </div>
        </div>
      ))}
      
      {events.length === 0 && (
        <div className="flex flex-col items-center justify-center h-40 text-gray-500">
          <ShieldCheckIcon className="w-8 h-8 text-cyber-green mb-2 opacity-50" />
          <p>No recent threats detected</p>
        </div>
      )}
    </div>
  );
};

export default LiveFeed;
