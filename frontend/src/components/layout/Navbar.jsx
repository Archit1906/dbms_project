import React from 'react';
import { Bell, Search, LogOut } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-20 border-b border-glass-border glass z-10 sticky top-0 px-8 flex justify-between items-center w-full">
      <div className="flex items-center gap-4">
          {/* Replaced 'Admin Portal' title as the new design places the title in the page header */}
          <div className="text-xl font-bold hidden md:block">
              {user?.role === 'Admin' ? 'Admin Portal' : 'Student Portal'}
          </div>
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-accent-blue/10 text-accent-blue border border-accent-blue/20">
             {user?.role}
          </span>
      </div>

      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="relative hidden md:flex items-center">
            <Search className="absolute left-3 text-text-muted" size={18} />
            <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 bg-bg-secondary border border-glass-border rounded-full text-sm focus:outline-none focus:border-accent-blue transition-colors text-text-primary w-64 placeholder:text-text-muted/60"
            />
        </div>

        {/* Notifications */}
        <button className="text-text-muted hover:text-text-primary transition-colors cursor-pointer relative">
          <Bell size={22} />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-danger border-2 border-bg-primary"></span>
        </button>
        
        {/* Profile Element stacked */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-bg-secondary border border-glass-border flex items-center justify-center overflow-hidden shrink-0">
             <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || 'Admin'}&backgroundColor=111827&textColor=F9FAFB`} alt="Avatar" className="h-full w-full object-cover" />
          </div>
          <div className="hidden md:flex flex-col items-start leading-tight">
              <span className="text-sm font-bold text-text-primary">{user?.name || 'Administrator'}</span>
              <span className="text-xs text-text-muted mt-0.5">{user?.role === 'Admin' ? 'Super Admin' : 'Student'}</span>
          </div>
          <button 
             onClick={handleLogout}
             className="ml-3 bg-transparent text-text-muted hover:text-danger cursor-pointer p-1 rounded hover:bg-glass-bg transition-colors"
             title="Logout"
          >
             <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
