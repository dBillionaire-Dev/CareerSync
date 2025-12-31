import { Outlet } from 'react-router-dom';
import { DashboardSidebar } from './DashboardSidebar';
import { useSidebarCollapsed } from '@/hooks/use-sidebar-collapsed';

export const DashboardLayout = () => {
  const { collapsed } = useSidebarCollapsed();

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <main className={`min-h-screen transition-all duration-300 ${collapsed ? 'md:ml-16' : 'md:ml-64'}`}>
        <Outlet />
      </main>
    </div>
  );
};
