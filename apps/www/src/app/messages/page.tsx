'use client';

import { useState } from 'react';
import { Search, Filter, MoreVertical, Send, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { MessageSquare } from 'lucide-react';

const messagesData = [
    {
        id: '1',
        sender: 'Campaign: Spring Sale',
        recipient: '+1 (555) 123-4567',
        content: 'Hello! Check out our spring collection now.',
        status: 'delivered',
        time: '2 min ago',
        protocol: 'SMPP'
    },
    {
        id: '2',
        sender: 'Alert: System',
        recipient: '+1 (555) 234-5678',
        content: 'Your verification code is: 482956',
        status: 'delivered',
        time: '5 min ago',
        protocol: 'HTTP API'
    },
    {
        id: '3',
        sender: 'Notification: Order',
        recipient: '+1 (555) 345-6789',
        content: 'Your order #12345 has been shipped.',
        status: 'pending',
        time: '8 min ago',
        protocol: 'Webhook'
    },
    {
        id: '4',
        sender: 'Alert: System',
        recipient: '+1 (555) 456-7890',
        content: 'Authentication failed. Please try again.',
        status: 'failed',
        time: '12 min ago',
        protocol: 'SMPP'
    },
    {
        id: '5',
        sender: 'Campaign: Newsletter',
        recipient: '+1 (555) 567-8901',
        content: 'This month\'s newsletter is now available.',
        status: 'delivered',
        time: '15 min ago',
        protocol: 'HTTP API'
    }
];

export default function MessagesPage() {
    const [search, setSearch] = useState('');

    const statusIcons = {
        delivered: <CheckCircle className="h-4 w-4 text-success" />,
        pending: <Clock className="h-4 w-4 text-warning" />,
        failed: <AlertCircle className="h-4 w-4 text-error" />
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="font-heading font-bold text-3xl text-neutral-100">Messages</h1>
                    <p className="text-neutral-400 text-sm mt-1">View and manage all messages sent through your account</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand hover:bg-brand-dark text-white transition-smooth">
                    <Send className="h-4 w-4" />
          Send Message
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Total Sent" value="2.8M" subtitle="all time" icon={<MessageSquare className="h-5 w-5" />} />
                <StatCard title="Delivered" value="2.75M" subtitle="98.2% success" icon={<CheckCircle className="h-5 w-5" />} color="success" />
                <StatCard title="Pending" value="1,245" subtitle="being processed" icon={<Clock className="h-5 w-5" />} color="warning" />
                <StatCard title="Failed" value="47" subtitle="retry available" icon={<AlertCircle className="h-5 w-5" />} color="error" />
            </div>

            <div className="rounded-xl border border-neutral-700 bg-neutral-800/50 backdrop-blur-sm overflow-hidden">
                <div className="p-6 border-b border-neutral-700">
                    <div className="flex gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                            <input
                                type="text"
                                placeholder="Search messages..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-neutral-100 placeholder-neutral-400 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-neutral-300">
                            <Filter className="h-4 w-4" />
              Filter
                        </button>
                    </div>
                </div>

                <div className="divide-y divide-neutral-700">
                    {messagesData.map((message) => (
                        <div key={message.id} className="p-4 hover:bg-neutral-700/50 transition-smooth cursor-pointer">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-medium text-neutral-100 truncate">{message.sender}</h3>
                                        <span className="text-xs px-2 py-1 rounded bg-neutral-700 text-neutral-300">{message.protocol}</span>
                                        <div className="flex-shrink-0">{statusIcons[message.status as keyof typeof statusIcons]}</div>
                                    </div>
                                    <p className="text-sm text-neutral-400 mb-1">{message.recipient}</p>
                                    <p className="text-sm text-neutral-400 truncate">{message.content}</p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <p className="text-xs text-neutral-400 mb-3">{message.time}</p>
                                    <button className="p-2 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-700 rounded-lg transition-smooth">
                                        <MoreVertical className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
