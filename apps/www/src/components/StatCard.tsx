'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: number;
  icon: React.ReactNode;
  trend?: 'up' | 'down';
  color?: 'brand' | 'success' | 'warning' | 'error' | 'info';
  delay?: number;
}

const colorMap = {
  brand: {
    container: 'bg-gradient-to-br from-blue-500/10 to-blue-600/5 hover:from-blue-500/15 hover:to-blue-600/10 border-blue-500/20 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10',
    icon: 'bg-blue-500/20 text-blue-400 group-hover:bg-blue-500/30 group-hover:scale-110',
  },
  success: {
    container: 'bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 hover:from-emerald-500/15 hover:to-emerald-600/10 border-emerald-500/20 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/10',
    icon: 'bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/30 group-hover:scale-110',
  },
  warning: {
    container: 'bg-gradient-to-br from-amber-500/10 to-amber-600/5 hover:from-amber-500/15 hover:to-amber-600/10 border-amber-500/20 hover:border-amber-500/40 hover:shadow-lg hover:shadow-amber-500/10',
    icon: 'bg-amber-500/20 text-amber-400 group-hover:bg-amber-500/30 group-hover:scale-110',
  },
  error: {
    container: 'bg-gradient-to-br from-red-500/10 to-red-600/5 hover:from-red-500/15 hover:to-red-600/10 border-red-500/20 hover:border-red-500/40 hover:shadow-lg hover:shadow-red-500/10',
    icon: 'bg-red-500/20 text-red-400 group-hover:bg-red-500/30 group-hover:scale-110',
  },
  info: {
    container: 'bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 hover:from-cyan-500/15 hover:to-cyan-600/10 border-cyan-500/20 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10',
    icon: 'bg-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/30 group-hover:scale-110',
  },
};

const trendColors = {
  up: 'text-emerald-400',
  down: 'text-red-400',
};

export function StatCard({
  title,
  value,
  subtitle,
  change,
  icon,
  trend = 'up',
  color = 'brand',
  delay = 0,
}: StatCardProps) {
  const styles = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="group h-full"
    >
      <div className={`h-full rounded-2xl border backdrop-blur-sm p-6 transition-all duration-300 cursor-pointer ${styles.container}`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">{title}</p>
            <div className="flex items-baseline gap-2 mb-3">
              <p className="text-4xl font-bold text-white break-words">{value}</p>
              {change !== undefined && (
                <div className={`flex items-center gap-0.5 text-xs font-semibold whitespace-nowrap ${trendColors[trend]}`}>
                  {trend === 'up' ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                  <span>{Math.abs(change)}%</span>
                </div>
              )}
            </div>
            {subtitle && <p className="text-xs text-neutral-400 font-medium">{subtitle}</p>}
          </div>
          <div className={`flex items-center justify-center h-14 w-14 rounded-xl flex-shrink-0 transition-all duration-300 ${styles.icon}`}>
            {icon}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
