'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { authService } from '@/lib/auth';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, 
  PieChart, Pie, Cell, Tooltip, Legend, Area, AreaChart 
} from 'recharts';
import { 
  Users, MessageSquare, Target, DollarSign, TrendingUp, Calendar,
  Zap, Radio, GitBranch, Gauge, AlertCircle, CheckCircle, MessageSquareText,
  BarChart3, Wifi, RefreshCw
} from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { ChartContainer } from '@/components/ChartContainer';

interface DashboardStats {
  totalMessages: number;
  monthlyMessages: number;
  deliveryRate: number;
  totalCampaigns: number;
  activeCampaigns: number;
  totalContacts: number;
  activeClients: number;
  totalRevenue: number;
  accountBalance: number;
  protocolConnections: number;
  systemHealth: number;
  messageTrends: Array<{ time: string; messages: number; delivered: number; failed: number }>;
  campaignPerformance: Array<{ name: string; sent: number; delivered: number }>;
  protocolDistribution: Array<{ name: string; value: number }>;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [trafficTab, setTrafficTab] = useState('Daily');

  // Mock data for demonstration
  const mockStats: DashboardStats = {
    totalMessages: 2847562,
    monthlyMessages: 450000,
    deliveryRate: 98.7,
    totalCampaigns: 24,
    activeCampaigns: 5,
    totalContacts: 156832,
    activeClients: 42,
    totalRevenue: 48750,
    accountBalance: 12340,
    protocolConnections: 8,
    systemHealth: 99.8,
    messageTrends: [
      { time: '12:00', messages: 1200, delivered: 1180, failed: 20 },
      { time: '13:00', messages: 1500, delivered: 1485, failed: 15 },
      { time: '14:00', messages: 1800, delivered: 1782, failed: 18 },
      { time: '15:00', messages: 2100, delivered: 2073, failed: 27 },
      { time: '16:00', messages: 1900, delivered: 1881, failed: 19 },
      { time: '17:00', messages: 2300, delivered: 2267, failed: 33 },
      { time: '18:00', messages: 2000, delivered: 1980, failed: 20 },
    ],
    campaignPerformance: [
      { name: 'Spring Sale', sent: 50000, delivered: 49250 },
      { name: 'Newsletter', sent: 35000, delivered: 34650 },
      { name: 'Alert', sent: 120000, delivered: 118800 },
    ],
    protocolDistribution: [
      { name: 'SMPP', value: 45 },
      { name: 'HTTP API', value: 30 },
      { name: 'Webhook', value: 15 },
      { name: 'Other', value: 10 },
    ],
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
          setStats(mockStats);
          setLoading(false);
        }, 500);
      } catch (error) {
        setError('Failed to load dashboard statistics');
        console.error('Dashboard error:', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-2 border-neutral-700 border-t-brand mx-auto mb-4"></div>
          <p className="text-neutral-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-error/10 border border-error/30 rounded-lg p-6">
        <div className="flex gap-3">
          <AlertCircle className="h-5 w-5 text-error flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-error font-semibold">Error</p>
            <p className="text-error/80 text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-400">No statistics available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-heading font-bold text-3xl text-neutral-100">Dashboard</h1>
          <p className="text-neutral-400 text-sm mt-1">Welcome back! Here&apos;s your messaging platform overview.</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-neutral-300 transition-smooth disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          title="Total Messages"
          value={stats.totalMessages.toLocaleString()}
          subtitle={`+${stats.monthlyMessages.toLocaleString()} this month`}
          icon={<MessageSquare className="h-5 w-5" />}
          change={12}
          trend="up"
          color="brand"
          delay={0.05}
        />
        <StatCard
          title="Delivery Rate"
          value={`${stats.deliveryRate}%`}
          subtitle="24-hour average"
          icon={<CheckCircle className="h-5 w-5" />}
          change={2.3}
          trend="up"
          color="success"
          delay={0.1}
        />
        <StatCard
          title="Active Campaigns"
          value={stats.activeCampaigns}
          subtitle={`of ${stats.totalCampaigns} total`}
          icon={<Zap className="h-5 w-5" />}
          change={1}
          trend="up"
          color="warning"
          delay={0.15}
        />
        <StatCard
          title="Active Clients"
          value={stats.activeClients}
          subtitle="connected integrations"
          icon={<Users className="h-5 w-5" />}
          change={5}
          trend="up"
          color="brand"
          delay={0.2}
        />
        <StatCard
          title="Account Balance"
          value={`$${stats.accountBalance.toLocaleString()}`}
          subtitle="Available credits"
          icon={<DollarSign className="h-5 w-5" />}
          color="success"
          delay={0.25}
        />
        <StatCard
          title="System Health"
          value={`${stats.systemHealth}%`}
          subtitle="All systems operational"
          icon={<Gauge className="h-5 w-5" />}
          color="success"
          delay={0.3}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message Volume Trends */}
        <div className="lg:col-span-2">
          <ChartContainer
            title="Message Volume Trends"
            subtitle="Messages sent, delivered, and failed over time"
            tabs={['Daily', 'Weekly', 'Monthly']}
            onTabChange={setTrafficTab}
            delay={0.35}
          >
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={stats.messageTrends}>
                <defs>
                  <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorDelivered" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#f3f4f6' }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="messages"
                  stroke="#2563eb"
                  fillOpacity={1}
                  fill="url(#colorMessages)"
                  strokeWidth={2}
                  name="Sent"
                />
                <Area
                  type="monotone"
                  dataKey="delivered"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorDelivered)"
                  strokeWidth={2}
                  name="Delivered"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* Protocol Distribution */}
        <ChartContainer
          title="Protocol Distribution"
          subtitle="Message volume by protocol"
          delay={0.4}
        >
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.protocolDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                <Cell fill="#2563eb" />
                <Cell fill="#a855f7" />
                <Cell fill="#10b981" />
                <Cell fill="#f59e0b" />
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#f3f4f6' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Campaign Performance */}
      <ChartContainer
        title="Campaign Performance"
        subtitle="Messages sent vs. delivered for active campaigns"
        delay={0.45}
      >
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={stats.campaignPerformance}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#f3f4f6' }}
            />
            <Legend />
            <Bar dataKey="sent" fill="#2563eb" radius={[8, 8, 0, 0]} name="Sent" />
            <Bar dataKey="delivered" fill="#10b981" radius={[8, 8, 0, 0]} name="Delivered" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
            <BarChart data={stats.campaignPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sent" fill="#3ECF8E" name="Sent" />
              <Bar dataKey="delivered" fill="#3ECF8E" opacity={0.5} name="Delivered" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-heading font-semibold text-lg mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="h-10 w-10 rounded-lg bg-brand/10 flex items-center justify-center">
      </ChartContainer>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="flex items-center gap-4 p-5 rounded-lg bg-neutral-800/50 border border-neutral-700 hover:border-brand/50 hover:bg-neutral-800 transition-all group">
          <div className="h-12 w-12 rounded-lg bg-brand/10 flex items-center justify-center group-hover:bg-brand/20">
            <MessageSquareText className="h-5 w-5 text-brand" />
          </div>
          <div className="text-left">
            <h3 className="font-medium text-sm text-neutral-100">Send Message</h3>
            <p className="text-xs text-neutral-400">Create a new message</p>
          </div>
        </button>
        <button className="flex items-center gap-4 p-5 rounded-lg bg-neutral-800/50 border border-neutral-700 hover:border-accent/50 hover:bg-neutral-800 transition-all group">
          <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20">
            <Zap className="h-5 w-5 text-accent" />
          </div>
          <div className="text-left">
            <h3 className="font-medium text-sm text-neutral-100">New Campaign</h3>
            <p className="text-xs text-neutral-400">Start a marketing campaign</p>
          </div>
        </button>
        <button className="flex items-center gap-4 p-5 rounded-lg bg-neutral-800/50 border border-neutral-700 hover:border-success/50 hover:bg-neutral-800 transition-all group">
          <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center group-hover:bg-success/20">
            <Users className="h-5 w-5 text-success" />
          </div>
          <div className="text-left">
            <h3 className="font-medium text-sm text-neutral-100">Add Contact</h3>
            <p className="text-xs text-neutral-400">Import new contacts</p>
          </div>
        </button>
      </div>
    </div>
  );
}
