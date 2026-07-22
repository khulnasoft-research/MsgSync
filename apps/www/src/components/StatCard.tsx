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
  brand: 'bg-brand/10 text-brand border-brand/20',
  success: 'bg-success/10 text-success border-success/20',
  warning: 'bg-warning/10 text-warning border-warning/20',
  error: 'bg-error/10 text-error border-error/20',
  info: 'bg-brand/10 text-brand border-brand/20',
};

const trendColors = {
  up: 'text-success',
  down: 'text-error',
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="group h-full"
    >
      <div className="h-full rounded-xl border border-neutral-700 bg-neutral-800/50 backdrop-blur-sm p-6 hover:border-neutral-600 hover:bg-neutral-800/80 transition-all hover:shadow-lg hover:shadow-brand/10 cursor-pointer">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-neutral-400 mb-2">{title}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-neutral-100">{value}</p>
              {change !== undefined && (
                <div className={`flex items-center gap-1 text-sm font-semibold ${trendColors[trend]}`}>
                  {trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  <span>{Math.abs(change)}%</span>
                </div>
              )}
            </div>
            {subtitle && <p className="text-xs text-neutral-500 mt-2">{subtitle}</p>}
          </div>
          <div className={`flex items-center justify-center h-12 w-12 rounded-lg ${colorMap[color]}`}>
            {icon}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
