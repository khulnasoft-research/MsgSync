'use client';

import { useState } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Calendar, Filter } from 'lucide-react';
import { ChartContainer } from '@/components/ChartContainer';
import { StatCard } from '@/components/StatCard';

const trafficData = [
  { time: '00:00', requests: 120, latency: 45, errors: 2 },
  { time: '04:00', requests: 200, latency: 52, errors: 5 },
  { time: '08:00', requests: 1200, latency: 48, errors: 8 },
  { time: '12:00', requests: 2500, latency: 65, errors: 15 },
  { time: '16:00', requests: 2800, latency: 70, errors: 18 },
  { time: '20:00', requests: 1900, latency: 55, errors: 12 },
  { time: '24:00', requests: 500, latency: 40, errors: 3 },
];

export default function TrafficPage() {
  const [timeRange, setTimeRange] = useState('24h');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-heading font-bold text-3xl text-neutral-100">Traffic Analytics</h1>
          <p className="text-neutral-400 text-sm mt-1">Monitor real-time traffic and performance metrics</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-neutral-300 transition-smooth">
          <Filter className="h-4 w-4" />
          Filter
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Requests"
          value="9,220"
          subtitle="in the last 24 hours"
          icon={<TrendingUp className="h-5 w-5" />}
          change={23}
          trend="up"
          color="brand"
        />
        <StatCard
          title="Avg Latency"
          value="54ms"
          subtitle="response time"
          icon={<Calendar className="h-4 w-4" />}
          change={-5}
          trend="down"
          color="success"
        />
        <StatCard
          title="Error Rate"
          value="0.18%"
          subtitle="failed requests"
          icon={<TrendingUp className="h-5 w-5" />}
          change={-2}
          trend="down"
          color="success"
        />
        <StatCard
          title="Peak Traffic"
          value="2,800"
          subtitle="requests/min"
          icon={<TrendingUp className="h-5 w-5" />}
          color="brand"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Request Volume" subtitle="Requests per hour">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={trafficData}>
              <defs>
                <linearGradient id="colorReqs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="requests" stroke="#2563eb" fill="url(#colorReqs)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Response Latency" subtitle="Average milliseconds">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="latency" stroke="#a855f7" strokeWidth={2} dot={{ fill: '#a855f7' }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <ChartContainer title="Error Distribution" subtitle="Error rates by endpoint">
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={trafficData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="time" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }} />
            <Legend />
            <Area type="monotone" dataKey="errors" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
