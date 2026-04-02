import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar, ClipboardList, Award, Home, BarChart2 } from 'lucide-react';
import useAuthStore from '../../store/authStore';

const Sidebar = () => {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'Admin';

  const menuItems = isAdmin
    ? [
        { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Analytics', path: '/admin/analytics', icon: BarChart2 },
        { name: 'Manage Events', path: '/admin/events', icon: Calendar },
        { name: 'Certificates Log', path: '/admin/certificates', icon: Award },
      ]
    : [
        { name: 'Event Catalog', path: '/events/catalog', icon: Home },
        { name: 'My Registrations', path: '/student/registrations', icon: ClipboardList },
        { name: 'My Certificates', path: '/student/certificates', icon: Award },
      ];

  return (
    <aside className="w-16 md:w-64 border-r border-glass-border glass hidden sm:flex flex-col h-screen sticky top-0 z-20 transition-all duration-300">
      <div className="h-16 flex items-center justify-center md:justify-start md:px-6 border-b border-glass-border">
        <div className="h-8 w-8 rounded bg-gradient-to-br from-accent-gold to-accent-blue flex items-center justify-center text-white font-bold text-lg leading-none shadow-[0_0_15px_rgba(245,158,11,0.5)]">
          C
        </div>
        <span className="ml-3 font-bold text-lg tracking-wide hidden md:block">ColvEvents</span>
      </div>

      <nav className="flex-1 py-6 px-3 flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 border-l-4 ${
                  isActive
                    ? 'bg-glass-bg border-accent-gold text-accent-gold shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]'
                    : 'border-transparent text-text-muted hover:bg-glass-bg hover:text-text-primary'
                }`
              }
            >
              <Icon size={20} className="shrink-0" />
              <span className="hidden md:block whitespace-nowrap">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
