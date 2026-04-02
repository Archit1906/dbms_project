import React from 'react';
import { Bell, User, LogOut } from 'lucide-react';
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
    <header className="h-16 border-b border-glass-border glass z-10 sticky top-0 px-6 flex justify-between items-center w-full">
      <div className="flex items-center gap-4">
          <div className="text-xl font-bold hidden md:block">
              {user?.role === 'Admin' ? 'Admin Portal' : 'Student Portal'}
          </div>
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-accent-blue/10 text-accent-blue border border-accent-blue/20">
             {user?.role}
          </span>
      </div>

      <div className="flex items-center gap-6">
        <button className="text-text-muted hover:text-text-primary transition-colors cursor-pointer relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-danger"></span>
        </button>
        
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-glass-bg border border-glass-border flex items-center justify-center overflow-hidden">
            <User size={16} className="text-text-muted" />
          </div>
          <span className="text-sm font-medium hidden md:block">{user?.name}</span>
          <button 
             onClick={handleLogout}
             className="ml-2 bg-transparent text-text-muted hover:text-danger cursor-pointer transition-colors"
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
