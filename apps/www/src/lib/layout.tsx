'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { authService } from './auth';
import { 
  MessageCircle, BarChart3, Users, Settings, LogOut, Menu, Sparkles,
  Bell, Search, ChevronDown, TrendingUp, Activity, Radio, Zap, Cloud,
  Database, GitBranch, Gauge, AlertCircle, CheckCircle, Clock
} from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<any>;
  badge?: string;
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { href: '/traffic', label: 'Traffic', icon: TrendingUp },
  { href: '/messages', label: 'Messages', icon: MessageCircle },
  { href: '/campaigns', label: 'Campaigns', icon: Zap },
  { href: '/routing', label: 'Routing', icon: GitBranch },
  { href: '/protocols', label: 'Protocols', icon: Radio },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/billing', label: 'Billing', icon: Cloud },
  { href: '/settings', label: 'Settings', icon: Settings },
];

interface RecentActivity {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'success' | 'warning' | 'info' | 'alert';
}

const recentActivities: RecentActivity[] = [
  { id: '1', title: 'Campaign Launched', description: 'Spring Sale Campaign started', time: '2 min ago', type: 'success' },
  { id: '2', title: 'High Message Volume', description: '250K+ messages in last hour', time: '15 min ago', type: 'warning' },
  { id: '3', title: 'API Integration', description: 'New webhook configured', time: '1 hour ago', type: 'info' },
  { id: '4', title: 'Delivery Alert', description: 'SMPP connection recovered', time: '3 hours ago', type: 'alert' },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadUser = async () => {
      const userData = await authService.verifyToken();
      setUser(userData);
    };
    
    if (authService.isAuthenticated()) {
      loadUser();
    }
  }, []);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-50 lg:hidden bg-black/50"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-y-0 left-0 w-64 bg-neutral-800 shadow-2xl">
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="p-4 border-b border-neutral-700 flex items-center justify-between">
                <Link href="/dashboard" className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-brand flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-heading font-semibold text-neutral-100">MsgSync</span>
                </Link>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 text-neutral-400 hover:text-neutral-200"
                >
                  <span className="sr-only">Close sidebar</span>
                  ✕
                </button>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all ${pathname === item.href
                          ? 'bg-brand text-white'
                          : 'text-neutral-300 hover:bg-neutral-700 hover:text-neutral-100'
                        }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </div>
                      {item.badge && <span className="text-xs bg-warning/20 text-warning px-2 py-1 rounded">{item.badge}</span>}
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile User Area */}
              <div className="p-4 border-t border-neutral-700">
                {user ? (
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-brand flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-semibold text-sm">
                        {user.name?.charAt(0) || user.email?.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-100 truncate">
                        {user.name || user.email}
                      </p>
                      <p className="text-xs text-neutral-400 truncate">
                        {user.role}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="p-2 text-neutral-400 hover:text-neutral-200 transition-smooth"
                    >
                      <LogOut className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-brand text-white font-medium hover:bg-brand-dark transition-smooth"
                    onClick={() => setSidebarOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col h-full bg-neutral-800 border-r border-neutral-700">
          {/* Logo */}
          <div className="p-6 border-b border-neutral-700">
            <Link href="/dashboard" className="flex items-center gap-2 group">
              <div className="h-9 w-9 rounded-lg bg-brand flex items-center justify-center group-hover:bg-brand-light transition-smooth">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="font-heading font-semibold text-lg text-neutral-100">MsgSync</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all ${pathname === item.href
                      ? 'bg-brand text-white shadow-lg shadow-brand/20'
                      : 'text-neutral-300 hover:bg-neutral-700 hover:text-neutral-100'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </div>
                  {item.badge && <span className="text-xs bg-warning/20 text-warning px-2 py-1 rounded">{item.badge}</span>}
                </Link>
              );
            })}
          </nav>

          {/* User Area */}
          <div className="p-4 border-t border-neutral-700">
            {user ? (
              <div className="flex items-center gap-3 px-2 py-2">
                <div className="h-10 w-10 rounded-full bg-brand flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold text-sm">
                    {user.name?.charAt(0) || user.email?.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-100 truncate">
                    {user.name || user.email}
                  </p>
                  <p className="text-xs text-neutral-400 truncate">
                    {user.role}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-neutral-400 hover:text-neutral-200 transition-smooth flex-shrink-0"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-brand text-white font-medium hover:bg-brand-dark transition-smooth"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64 flex flex-col lg:flex-row flex-1">
        <div className="flex-1 flex flex-col">
          {/* Mobile Header */}
          <div className="sticky top-0 z-40 bg-neutral-800 border-b border-neutral-700 px-4 py-3 lg:hidden">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 text-neutral-400 hover:text-neutral-200 transition-smooth"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open sidebar</span>
              </button>
              <h2 className="font-heading font-semibold text-neutral-100">MsgSync</h2>
              <div className="w-6"></div>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="sticky top-0 z-30 hidden lg:flex bg-neutral-800/95 border-b border-neutral-700 px-8 py-4 backdrop-blur-md">
            <div className="flex-1 flex items-center gap-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-neutral-100 placeholder-neutral-400 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-smooth"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-neutral-400 hover:text-neutral-200 transition-smooth hover:bg-neutral-700 rounded-lg">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-error rounded-full"></span>
              </button>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-neutral-300 hover:bg-neutral-700 transition-smooth">
                <span className="text-sm font-medium">Workspace</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Page Content */}
          <main className="flex-1 p-4 lg:p-8 overflow-auto">
            {children}
          </main>
        </div>

        {/* Activity Panel (Desktop Only) */}
        <div className="hidden 2xl:flex flex-col w-80 bg-neutral-800 border-l border-neutral-700 overflow-hidden">
          {/* Activity Header */}
          <div className="px-6 py-4 border-b border-neutral-700">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-brand" />
              <h3 className="font-heading font-semibold text-neutral-100">Activity</h3>
            </div>
          </div>

          {/* Activity List */}
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-2 p-4">
              {recentActivities.map((activity) => {
                const iconMap = {
                  success: <CheckCircle className="h-4 w-4 text-success" />,
                  warning: <AlertCircle className="h-4 w-4 text-warning" />,
                  info: <Radio className="h-4 w-4 text-brand" />,
                  alert: <Clock className="h-4 w-4 text-error" />,
                };
                return (
                  <div key={activity.id} className="p-3 rounded-lg bg-neutral-700/50 hover:bg-neutral-700 transition-smooth cursor-pointer group">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {iconMap[activity.type]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-neutral-100 group-hover:text-brand transition-smooth">
                          {activity.title}
                        </p>
                        <p className="text-xs text-neutral-400 truncate">
                          {activity.description}
                        </p>
                        <p className="text-xs text-neutral-500 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* System Status */}
          <div className="px-6 py-4 border-t border-neutral-700 bg-neutral-900/50">
            <p className="text-xs font-semibold text-neutral-400 uppercase mb-3">System Status</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-400">API Gateway</span>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 bg-success rounded-full"></div>
                  <span className="text-neutral-400">Healthy</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-400">Database</span>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 bg-success rounded-full"></div>
                  <span className="text-neutral-400">Healthy</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-400">Redis</span>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 bg-success rounded-full"></div>
                  <span className="text-neutral-400">Healthy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}n
