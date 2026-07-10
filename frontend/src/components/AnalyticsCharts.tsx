import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import type { ThreatEvent } from './Dashboard';

interface AnalyticsChartsProps {
  events: ThreatEvent[];
}

const COLORS = ['#00f0ff', '#b026ff', '#00ff66', '#ff003c'];

const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ events }) => {
  // Aggregate protocol data for Pie Chart
  const protocolCounts = events.reduce((acc, curr) => {
    acc[curr.protocol] = (acc[curr.protocol] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const pieData = Object.keys(protocolCounts).map(key => ({
    name: key, value: protocolCounts[key]
  }));

  // Aggregate packet rate over time for Line Chart (using index as time mock)
  const lineData = [...events].reverse().map((e, i) => ({
    time: i,
    packets: e.packet_rate,
    severity: e.severity
  }));

  return (
    <div className="flex flex-col gap-4 w-full mt-4">
      <div className="glass-panel p-4 h-64">
        <h3 className="text-sm text-gray-400 mb-2">Protocol Distribution</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {pieData.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#0a0a0f', borderColor: '#ffffff20' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="glass-panel p-4 h-64">
        <h3 className="text-sm text-gray-400 mb-2">Packet Rate Trend</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis dataKey="time" hide />
            <YAxis stroke="#ffffff50" fontSize={10} tickFormatter={(val) => `${(val/1000).toFixed(0)}k`} />
            <Tooltip contentStyle={{ backgroundColor: '#0a0a0f', borderColor: '#ffffff20' }} />
            <Line type="monotone" dataKey="packets" stroke="#00f0ff" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
