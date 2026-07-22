'use client';

import { useState } from 'react';
import { Radio, CheckCircle, AlertCircle, Power, Gauge, Zap } from 'lucide-react';
import { StatCard } from '@/components/StatCard';

const protocols = [
  {
    id: 'smpp',
    name: 'SMPP',
    description: 'Short Message Peer-to-Peer Protocol',
    status: 'healthy',
    connections: 12,
    messages: 1200000,
    latency: 45,
    uptime: 99.98,
  },
  {
    id: 'http',
    name: 'HTTP API',
    description: 'RESTful HTTP API Gateway',
    status: 'healthy',
    connections: 248,
    messages: 1450000,
    latency: 120,
    uptime: 99.99,
  },
  {
    id: 'webhook',
    name: 'Webhook',
    description: 'Event-based webhook delivery',
    status: 'healthy',
    connections: 89,
    messages: 147562,
    latency: 280,
    uptime: 99.95,
  },
  {
    id: 'sqs',
    name: 'AWS SQS',
    description: 'Amazon Simple Queue Service',
    status: 'healthy',
    connections: 4,
    messages: 0,
    latency: 200,
    uptime: 100.0,
  },
  {
    id: 'kafka',
    name: 'Kafka',
    description: 'Apache Kafka Integration',
    status: 'warning',
    connections: 2,
    messages: 0,
    latency: 450,
    uptime: 98.5,
  },
  {
    id: 'grpc',
    name: 'gRPC',
    description: 'High-performance RPC protocol',
    status: 'healthy',
    connections: 5,
    messages: 50245,
    latency: 25,
    uptime: 99.97,
  },
];

export default function ProtocolsPage() {
  const statusColors = {
    healthy: 'bg-success/10 text-success border-success/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    error: 'bg-error/10 text-error border-error/20',
  };

  const statusIcons = {
    healthy: <CheckCircle className="h-5 w-5" />,
    warning: <AlertCircle className="h-5 w-5" />,
    error: <AlertCircle className="h-5 w-5" />,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-heading font-bold text-3xl text-neutral-100">Protocols & Integrations</h1>
          <p className="text-neutral-400 text-sm mt-1">Monitor the status and performance of all messaging protocols</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-neutral-300 transition-smooth">
          <Power className="h-4 w-4" />
          Settings
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Protocols" value="6" subtitle="running" icon={<Radio className="h-5 w-5" />} color="brand" />
        <StatCard title="Total Connections" value="360" subtitle="active" icon={<Zap className="h-5 w-5" />} />
        <StatCard title="Avg Latency" value="187ms" subtitle="across all" icon={<Gauge className="h-5 w-5" />} />
        <StatCard title="System Health" value="99.9%" subtitle="uptime" icon={<CheckCircle className="h-5 w-5" />} color="success" />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {protocols.map((protocol) => (
          <div
            key={protocol.id}
            className={`rounded-xl border-2 p-6 transition-all hover:shadow-lg hover:shadow-brand/10 ${statusColors[protocol.status]}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="mt-1">{statusIcons[protocol.status]}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{protocol.name}</h3>
                  <p className="text-sm opacity-75">{protocol.description}</p>
                </div>
              </div>
              <button className="p-2 rounded-lg bg-current/10 hover:bg-current/20 transition-smooth">
                <Power className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-current/20">
              <div>
                <p className="text-xs opacity-75 mb-1">Connections</p>
                <p className="font-semibold text-lg">{protocol.connections}</p>
              </div>
              <div>
                <p className="text-xs opacity-75 mb-1">Messages</p>
                <p className="font-semibold text-lg">{protocol.messages.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs opacity-75 mb-1">Latency</p>
                <p className="font-semibold text-lg">{protocol.latency}ms</p>
              </div>
              <div>
                <p className="text-xs opacity-75 mb-1">Uptime</p>
                <p className="font-semibold text-lg">{protocol.uptime}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
