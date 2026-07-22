'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Database, Radio, Zap, Cloud, GitBranch, Lock } from 'lucide-react';

interface SystemService {
  name: string;
  status: 'healthy' | 'degraded' | 'down';
  latency: string;
  uptime: string;
  icon: React.ComponentType<any>;
}

const services: SystemService[] = [
  {
    name: 'SMPP Gateway',
    status: 'healthy',
    latency: '12ms',
    uptime: '99.9%',
    icon: Radio,
  },
  {
    name: 'Database Pool',
    status: 'healthy',
    latency: '8ms',
    uptime: '99.98%',
    icon: Database,
  },
  {
    name: 'Redis Cache',
    status: 'healthy',
    latency: '2ms',
    uptime: '99.95%',
    icon: Zap,
  },
  {
    name: 'API Gateway',
    status: 'healthy',
    latency: '15ms',
    uptime: '99.92%',
    icon: Cloud,
  },
  {
    name: 'Message Queue',
    status: 'healthy',
    latency: '5ms',
    uptime: '99.99%',
    icon: GitBranch,
  },
  {
    name: 'SSL/TLS',
    status: 'healthy',
    latency: '1ms',
    uptime: '100%',
    icon: Lock,
  },
];

const statusConfig = {
  healthy: {
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    text: 'text-emerald-400',
    dot: 'bg-emerald-500',
  },
  degraded: {
    bg: 'bg-amber-500/10 border-amber-500/20',
    text: 'text-amber-400',
    dot: 'bg-amber-500',
  },
  down: {
    bg: 'bg-red-500/10 border-red-500/20',
    text: 'text-red-400',
    dot: 'bg-red-500',
  },
};

export function SystemStatus() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-bold text-white">System Status</h3>
        <p className="text-sm text-neutral-400 mt-1">Real-time service health monitoring</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {services.map((service, index) => {
          const Icon = service.icon;
          const config = statusConfig[service.status];
          return (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className={`rounded-lg border backdrop-blur-sm p-4 transition-all duration-300 hover:shadow-lg ${config.bg}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="flex-shrink-0 p-2 rounded-md bg-neutral-700/50">
                      <Icon className="h-4 w-4 text-neutral-300" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-white truncate">{service.name}</p>
                      <p className="text-xs text-neutral-400">Latency: {service.latency}</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1.5 ml-2 flex-shrink-0`}>
                    <div className={`h-2 w-2 rounded-full ${config.dot} animate-pulse`} />
                    <span className={`text-xs font-semibold ${config.text}`}>
                      {service.status === 'healthy' ? 'OK' : service.status === 'degraded' ? 'WARN' : 'DOWN'}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-700/50">
                  <p className="text-xs text-neutral-500">Uptime: <span className="text-neutral-300 font-semibold">{service.uptime}</span></p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
