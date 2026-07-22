'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Client {
  name: string;
  traffic: number;
  percentage: number;
  color: string;
}

const topClients: Client[] = [
    { name: 'E-Commerce Platform', traffic: 2450, percentage: 42, color: '#3b82f6' },
    { name: 'Mobile App', traffic: 1890, percentage: 32, color: '#8b5cf6' },
    { name: 'Web Portal', traffic: 980, percentage: 17, color: '#10b981' },
    { name: 'Analytics Service', traffic: 450, percentage: 8, color: '#f59e0b' },
    { name: 'Partner API', traffic: 230, percentage: 4, color: '#ef4444' }
];

export function TopClients() {
    return (
        <div className="space-y-4">
            <div>
                <h3 className="text-lg font-bold text-white">Top Clients by Traffic</h3>
                <p className="text-sm text-neutral-400 mt-1">Message volume distribution across integrations</p>
            </div>

            <div className="space-y-4">
                {topClients.map((client, index) => (
                    <motion.div
                        key={client.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-white">{client.name}</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-semibold text-neutral-300">{client.traffic.toLocaleString()}</p>
                                    <p className="text-xs text-neutral-500 w-8 text-right">{client.percentage}%</p>
                                </div>
                            </div>
                            <div className="w-full h-2 rounded-full bg-neutral-700/50 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${client.percentage}%` }}
                                    transition={{ duration: 0.6, delay: index * 0.05 + 0.2, ease: 'easeOut' }}
                                    className="h-full rounded-full transition-all duration-300"
                                    style={{ backgroundColor: client.color }}
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Chart visualization */}
            <div className="mt-6 pt-4 border-t border-neutral-700">
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart
                        data={topClients}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 200, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis type="number" stroke="#9ca3af" />
                        <YAxis dataKey="name" type="category" stroke="#9ca3af" width={190} tick={{ fontSize: 12 }} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1f2937',
                                border: '1px solid #374151',
                                borderRadius: '8px'
                            }}
                            labelStyle={{ color: '#f3f4f6' }}
                            formatter={(value) => `${value.toLocaleString()} messages`}
                        />
                        <Bar dataKey="traffic" radius={[0, 8, 8, 0]} isAnimationActive>
                            {topClients.map((client, index) => (
                                <Cell key={`cell-${index}`} fill={client.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
