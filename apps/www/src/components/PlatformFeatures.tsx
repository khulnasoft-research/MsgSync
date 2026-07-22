'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Radio, Zap, MessageSquare, Phone, Mail, Wifi } from 'lucide-react';

interface Platform {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: 'blue' | 'purple' | 'emerald' | 'amber' | 'rose' | 'cyan';
  status: 'active' | 'inactive';
}

const platforms: Platform[] = [
    {
        id: 'smpp',
        name: 'SMPP Protocol',
        description: 'Short Message Peer-to-Peer protocol',
        icon: Radio,
        color: 'blue',
        status: 'active'
    },
    {
        id: 'http',
        name: 'HTTP API',
        description: 'RESTful HTTP-based messaging',
        icon: Zap,
        color: 'purple',
        status: 'active'
    },
    {
        id: 'sms',
        name: 'SMS Gateway',
        description: 'Global SMS delivery network',
        icon: MessageSquare,
        color: 'emerald',
        status: 'active'
    },
    {
        id: 'voice',
        name: 'Voice Calls',
        description: 'Voice and OTP delivery',
        icon: Phone,
        color: 'amber',
        status: 'active'
    },
    {
        id: 'email',
        name: 'Email Integration',
        description: 'Transactional email support',
        icon: Mail,
        color: 'rose',
        status: 'inactive'
    },
    {
        id: 'webhook',
        name: 'Webhooks',
        description: 'Real-time event notifications',
        icon: Wifi,
        color: 'cyan',
        status: 'active'
    }
];

const colorMap = {
    blue: 'from-blue-500/10 to-blue-600/5 border-blue-500/20 hover:border-blue-500/40',
    purple: 'from-purple-500/10 to-purple-600/5 border-purple-500/20 hover:border-purple-500/40',
    emerald: 'from-emerald-500/10 to-emerald-600/5 border-emerald-500/20 hover:border-emerald-500/40',
    amber: 'from-amber-500/10 to-amber-600/5 border-amber-500/20 hover:border-amber-500/40',
    rose: 'from-rose-500/10 to-rose-600/5 border-rose-500/20 hover:border-rose-500/40',
    cyan: 'from-cyan-500/10 to-cyan-600/5 border-cyan-500/20 hover:border-cyan-500/40'
};

const iconColorMap = {
    blue: 'text-blue-400',
    purple: 'text-purple-400',
    emerald: 'text-emerald-400',
    amber: 'text-amber-400',
    rose: 'text-rose-400',
    cyan: 'text-cyan-400'
};

export function PlatformFeatures() {
    return (
        <div className="space-y-4">
            <div>
                <h3 className="text-lg font-bold text-white mb-2">Supported Platforms</h3>
                <p className="text-sm text-neutral-400">Multi-protocol messaging infrastructure</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {platforms.map((platform, index) => {
                    const Icon = platform.icon;
                    return (
                        <motion.div
                            key={platform.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="group"
                        >
                            <div className={`rounded-xl border backdrop-blur-sm p-5 bg-gradient-to-br ${colorMap[platform.color]} transition-all duration-300 hover:shadow-lg hover:shadow-${platform.color}-500/10 cursor-pointer`}>
                                <div className="flex items-start justify-between mb-3">
                                    <div className={`h-11 w-11 rounded-lg bg-gradient-to-br from-${platform.color}-500/20 to-${platform.color}-600/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className={`h-5 w-5 ${iconColorMap[platform.color]}`} />
                                    </div>
                                    <div className={`h-2 w-2 rounded-full ${platform.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-500'}`} />
                                </div>
                                <h4 className="font-semibold text-white mb-1">{platform.name}</h4>
                                <p className="text-xs text-neutral-400 line-clamp-2">{platform.description}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
