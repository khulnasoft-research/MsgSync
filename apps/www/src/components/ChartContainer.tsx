'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ChartContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  tabs?: string[];
  onTabChange?: (tab: string) => void;
  delay?: number;
}

export function ChartContainer({
    title,
    subtitle,
    children,
    tabs,
    onTabChange,
    delay = 0
}: ChartContainerProps) {
    const [activeTab, setActiveTab] = useState(tabs?.[0] || '');

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        onTabChange?.(tab);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay }}
            className="h-full"
        >
            <div className="h-full rounded-2xl border border-neutral-700 bg-gradient-to-br from-neutral-800/40 to-neutral-800/20 backdrop-blur-sm p-6 hover:border-neutral-600 transition-all hover:shadow-lg hover:shadow-neutral-900/50">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-white">{title}</h3>
                        {subtitle && <p className="text-sm text-neutral-400 mt-2 font-medium">{subtitle}</p>}
                    </div>
                </div>

                {tabs && tabs.length > 0 && (
                    <div className="flex gap-1 mb-6 p-1 bg-neutral-700/30 rounded-lg w-fit">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => handleTabChange(tab)}
                                className={`px-3 py-1.5 text-sm font-semibold transition-all rounded-md ${
                                    activeTab === tab
                                        ? 'text-white bg-neutral-600/80 shadow-md'
                                        : 'text-neutral-400 hover:text-neutral-300 hover:bg-neutral-700/30'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                )}

                <div className="w-full h-full">
                    {children}
                </div>
            </div>
        </motion.div>
    );
}
