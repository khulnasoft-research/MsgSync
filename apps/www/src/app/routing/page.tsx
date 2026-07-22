'use client';

import { useState } from 'react';
import { GitBranch, Plus, Edit, Trash2, ArrowRight, Radio } from 'lucide-react';
import { StatCard } from '@/components/StatCard';

const routingRules = [
    {
        id: '1',
        name: 'Primary SMS Route',
        priority: 1,
        sourceProtocol: 'SMPP',
        destination: 'Twilio Gateway',
        status: 'active',
        messages: 1250000
    },
    {
        id: '2',
        name: 'Backup SMS Route',
        priority: 2,
        sourceProtocol: 'SMPP',
        destination: 'AWS SNS',
        status: 'standby',
        messages: 0
    },
    {
        id: '3',
        name: 'HTTP API Route',
        priority: 1,
        sourceProtocol: 'HTTP API',
        destination: 'Internal Queue',
        status: 'active',
        messages: 1450000
    },
    {
        id: '4',
        name: 'Premium Route',
        priority: 0,
        sourceProtocol: 'Webhook',
        destination: 'Premium Gateway',
        status: 'active',
        messages: 147562
    }
];

export default function RoutingPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="font-heading font-bold text-3xl text-neutral-100">Message Routing</h1>
                    <p className="text-neutral-400 text-sm mt-1">Configure how messages are routed through different protocols and gateways</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand hover:bg-brand-dark text-white transition-smooth">
                    <Plus className="h-4 w-4" />
          New Route
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Active Routes" value="4" subtitle="running" icon={<GitBranch className="h-5 w-5" />} color="brand" />
                <StatCard title="Total Messages Routed" value="2.84M" subtitle="through all routes" icon={<ArrowRight className="h-5 w-5" />} />
                <StatCard title="Success Rate" value="99.98%" subtitle="delivery accuracy" icon={<Radio className="h-5 w-5" />} color="success" />
                <StatCard title="Avg Latency" value="234ms" subtitle="routing overhead" icon={<GitBranch className="h-5 w-5" />} />
            </div>

            <div className="rounded-xl border border-neutral-700 bg-neutral-800/50 backdrop-blur-sm overflow-hidden">
                <div className="p-6 border-b border-neutral-700">
                    <h2 className="text-lg font-semibold text-neutral-100">Routing Rules</h2>
                </div>

                <div className="divide-y divide-neutral-700">
                    {routingRules.map((rule) => (
                        <div key={rule.id} className="p-6 hover:bg-neutral-700/30 transition-smooth">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-semibold text-neutral-100">{rule.name}</h3>
                                        <span
                                            className={`text-xs px-3 py-1 rounded-full font-medium ${
                                                rule.status === 'active'
                                                    ? 'bg-success/10 text-success'
                                                    : 'bg-warning/10 text-warning'
                                            }`}
                                        >
                                            {rule.status}
                                        </span>
                                        {rule.priority === 0 && (
                                            <span className="text-xs px-3 py-1 rounded-full bg-brand/10 text-brand font-medium">
                        Premium
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-neutral-400">
                                        <span className="flex items-center gap-2">
                                            <Radio className="h-4 w-4" />
                                            {rule.sourceProtocol}
                                        </span>
                                        <ArrowRight className="h-4 w-4" />
                                        <span>{rule.destination}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-700 rounded-lg transition-smooth">
                                        <Edit className="h-4 w-4" />
                                    </button>
                                    <button className="p-2 text-neutral-400 hover:text-error hover:bg-neutral-700 rounded-lg transition-smooth">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-neutral-700">
                                <p className="text-xs text-neutral-400">
                                    {rule.messages.toLocaleString()} messages routed • Priority: {rule.priority}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
