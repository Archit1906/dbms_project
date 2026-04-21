import React from 'react';
import useAuthStore from '../../store/authStore';
import { User, Lock, Edit3, Shield, HelpCircle, ChevronRight, GraduationCap } from 'lucide-react';

const Profile = () => {
   const { user } = useAuthStore();

   const menuItems = [
      { id: 'personal', title: 'Personal Information', icon: User, extra: null },
      { id: 'password', title: 'Change Password', icon: Lock, extra: null },
      { id: 'interests', title: 'Interests', icon: GraduationCap, extra: <span className="text-[10px] uppercase tracking-wider font-bold bg-white/5 border border-white/10 text-white px-2 py-1 rounded">AI/ML</span> },
      { id: 'privacy', title: 'Privacy Settings', icon: Shield, extra: null },
      { id: 'help', title: 'Help & Support', icon: HelpCircle, extra: null },
   ];

   return (
      <div className="space-y-6 pb-12 animate-fade-in max-w-4xl mx-auto w-full">
         <div className="flex justify-between items-end border-b border-glass-border pb-4 w-full mt-4">
            <h1 className="text-3xl font-bold text-white">Profile</h1>
         </div>

         <div className="w-full flex flex-col gap-6">
            <div className="glass-panel border border-glass-border rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
               <div className="flex items-center gap-5">
                  <div className="h-20 w-20 rounded-full border border-glass-border overflow-hidden shrink-0 bg-bg-secondary p-1">
                     <img 
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || 'Student'}&backgroundColor=111827&textColor=F9FAFB`} 
                        alt="Profile Avatar" 
                        className="w-full h-full object-cover rounded-full"
                     />
                  </div>
                  <div>
                     <h2 className="text-xl font-bold text-white">{user?.name || 'Alice Smith'}</h2>
                     <p className="text-text-muted mt-1 leading-tight">
                        {user?.department || 'CS Engineering'}<br/>
                        <span className="text-sm">3rd Year</span>
                     </p>
                  </div>
               </div>
               
               <button className="flex items-center justify-center gap-2 px-5 py-2 glass-panel hover:bg-glass-bg border border-glass-border rounded-lg text-sm text-white font-medium transition-colors w-full md:w-auto">
                  <Edit3 size={16} /> Edit Profile
               </button>
            </div>

            <div className="glass-panel border border-glass-border rounded-xl overflow-hidden divide-y divide-glass-border w-full">
               {menuItems.map(item => (
                  <button key={item.id} className="w-full flex items-center justify-between p-5 hover:bg-white/[0.02] transition-colors group">
                     <div className="flex items-center gap-4 text-slate-300 group-hover:text-white transition-colors">
                        <item.icon size={20} className="text-text-muted" />
                        <span className="font-medium text-sm">{item.title}</span>
                     </div>
                     <div className="flex items-center gap-3">
                        {item.extra}
                        <ChevronRight size={18} className="text-text-muted group-hover:text-white transition-colors" />
                     </div>
                  </button>
               ))}
            </div>
         </div>
         
      </div>
   );
};

export default Profile;
