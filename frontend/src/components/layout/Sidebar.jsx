import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, BarChart2, CalendarDays, ClipboardCheck, 
  Mic, Users, Award, Clock, UserCog, Settings, Bell, Home, ClipboardList
} from 'lucide-react';
import useAuthStore from '../../store/authStore';

const Sidebar = () => {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'Admin';

  const adminMenu = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart2 },
    { name: 'Events', path: '/admin/events', icon: CalendarDays },
    { name: 'Registrations', path: '/admin/registrations', icon: ClipboardCheck },
    { name: 'Speakers', path: '/admin/speakers', icon: Mic },
    { name: 'Attendees', path: '/admin/attendees', icon: Users },
    { name: 'Certificates', path: '/admin/certificates', icon: Award },
    { name: 'Schedule', path: '/admin/schedule', icon: Clock },
    { name: 'Users', path: '/admin/users', icon: UserCog },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
    { name: 'Notifications', path: '/admin/notifications', icon: Bell },
  ];

  const studentMenu = [
    { name: 'Event Catalog', path: '/events/catalog', icon: Home },
    { name: 'My Registrations', path: '/student/registrations', icon: ClipboardList },
    { name: 'My Certificates', path: '/student/certificates', icon: Award },
  ];

  const menuItems = isAdmin ? adminMenu : studentMenu;

  return (
    <aside className="w-16 md:w-[260px] border-r border-glass-border glass hidden sm:flex flex-col h-screen sticky top-0 z-20 transition-all duration-300">
      <div className="h-20 flex items-center justify-center md:justify-start md:px-6 border-b border-glass-border">
        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-600 to-accent-gold flex items-center justify-center text-white font-bold text-xl leading-none shadow-[0_0_15px_rgba(245,158,11,0.4)]">
          C
        </div>
        <span className="ml-4 font-bold text-xl tracking-wide hidden md:block text-white">ColvEvents</span>
      </div>

      <nav className="flex-1 py-6 px-4 flex flex-col gap-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 border-l-4 ${
                  isActive && !item.path.startsWith('#')
                    ? 'bg-gradient-to-r from-accent-gold/20 to-transparent border-accent-gold text-accent-gold shadow-[inset_0_0_10px_rgba(245,158,11,0.05)]'
                    : 'border-transparent text-text-muted hover:bg-glass-bg hover:text-text-primary'
                }`
              }
            >
              <Icon size={20} className="shrink-0" />
              <span className="hidden md:block whitespace-nowrap font-medium text-sm">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
