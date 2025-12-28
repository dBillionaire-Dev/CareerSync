import { NavLink as RouterNavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  BarChart3,
  Clock,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
  Rocket,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Overview', end: true },
  { to: '/dashboard/jobs', icon: Briefcase, label: 'Jobs' },
  { to: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/dashboard/timeline', icon: Clock, label: 'Timeline' },
];

const bottomItems = [
  { to: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

export const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any local state/storage
    localStorage.removeItem('jobtracker-user');
    localStorage.removeItem('jobtracker-token');
    // Redirect to landing page
    navigate('/');
  };

  return (
    <>
      {/* Mobile toggle button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setCollapsed(!collapsed)}
      >
        <Menu size={20} />
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-screen bg-gradient-to-b from-sidebar to-black text-sidebar-foreground z-40',
          'flex flex-col transition-all duration-300 ease-in-out',
          'border-r border-sidebar-border',
          collapsed ? 'w-16' : 'w-64',
          'max-md:translate-x-[-100%]',
          !collapsed && 'max-md:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <div className={cn('flex items-center gap-3', collapsed && 'justify-center w-full')}>
            {collapsed ? (
              <button
                onClick={() => setCollapsed(false)}
                className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-glow hover:scale-105 transition-transform"
              >
                <Rocket size={20} className="text-sidebar-primary-foreground" />
              </button>
            ) : (
              <RouterNavLink
                to="/"
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-glow">
                  <Rocket size={20} className="text-sidebar-primary-foreground" />
                </div>
                <span className="font-bold text-lg tracking-tight">CareerSync</span>
              </RouterNavLink>
            )}
          </div>
          {!collapsed && (
            <div className="flex items-center gap-1">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCollapsed(true)}
                className="text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
              >
                <ChevronLeft size={18} />
              </Button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-2 space-y-1">
          {navItems.map((item) => {
            const isActive = item.end
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to);

            return (
              <RouterNavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                  'text-sidebar-foreground/70 hover:text-sidebar-foreground',
                  'hover:bg-sidebar-accent',
                  collapsed && 'justify-center px-2',
                  isActive && 'bg-sidebar-accent text-sidebar-foreground font-medium'
                )}
              >
                <item.icon size={20} className={cn(isActive && 'text-sidebar-primary')} />
                {!collapsed && <span>{item.label}</span>}
              </RouterNavLink>
            );
          })}
        </nav>

        {/* Bottom nav */}
        <div className="py-4 px-2 border-t border-sidebar-border space-y-1">
          {bottomItems.map((item) => (
            <RouterNavLink
              key={item.to}
              to={item.to}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                'text-sidebar-foreground/70 hover:text-sidebar-foreground',
                'hover:bg-sidebar-accent',
                collapsed && 'justify-center px-2'
              )}
            >
              <item.icon size={20} />
              {!collapsed && <span>{item.label}</span>}
            </RouterNavLink>
          ))}
          
          <button
            onClick={handleLogout}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 w-full',
              'text-destructive/70 hover:text-destructive',
              'hover:bg-destructive/10',
              collapsed && 'justify-center px-2'
            )}
          >
            <LogOut size={20} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}
    </>
  );
};
