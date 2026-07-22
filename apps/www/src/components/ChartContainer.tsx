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
  delay = 0,
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
      <div className="h-full rounded-xl border border-neutral-700 bg-neutral-800/50 backdrop-blur-sm p-6 hover:border-neutral-600 transition-all">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-neutral-100">{title}</h3>
            {subtitle && <p className="text-sm text-neutral-400 mt-1">{subtitle}</p>}
          </div>
        </div>

        {tabs && tabs.length > 0 && (
          <div className="flex gap-2 mb-6 border-b border-neutral-700">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-4 py-2 text-sm font-medium transition-all border-b-2 -mb-px ${
                  activeTab === tab
                    ? 'text-brand border-brand'
                    : 'text-neutral-400 border-transparent hover:text-neutral-300'
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
