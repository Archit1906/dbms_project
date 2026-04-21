import React, { useState } from 'react';
import { Check, UserPlus, Award, CalendarDays, AlertTriangle } from 'lucide-react';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('All');

  const notificationsList = [
    { id: 1, icon: <UserPlus size={16} className="text-purple-400" />, iconBg: 'bg-purple-500/10 border-purple-500/20', title: 'New registration for Tech Fest 2025', desc: 'John Doe has registered for the event.', time: '2m ago', unread: true },
    { id: 2, icon: <Award size={16} className="text-[#f59e0b]" />, iconBg: 'bg-[#f59e0b]/10 border-[#f59e0b]/20', title: 'Certificate generated', desc: 'Certificate for Workshop 2025 has been generated.', time: '15m ago', unread: true },
    { id: 3, icon: <CalendarDays size={16} className="text-[#f59e0b]" />, iconBg: 'bg-[#f59e0b]/10 border-[#f59e0b]/20', title: 'Event reminder', desc: 'AI Conference 2025 is starting tomorrow.', time: '1h ago', unread: false, important: true },
    { id: 4, icon: <AlertTriangle size={16} className="text-red-400" />, iconBg: 'bg-red-500/10 border-red-500/20', title: 'Low attendance alert', desc: 'Attendance for Design Workshop is below 50%.', time: '2h ago', unread: false, important: true },
    { id: 5, icon: <UserPlus size={16} className="text-blue-400" />, iconBg: 'bg-blue-500/10 border-blue-500/20', title: 'New user registered', desc: 'Sarah Wilson has joined as an attendee.', time: '4h ago', unread: false },
  ];

  const filteredList = notificationsList.filter(n => {
      if(activeTab === 'Unread') return n.unread;
      if(activeTab === 'Important') return n.important;
      return true;
  });

  return (
    <div className="space-y-6 pb-12 w-full animate-fade-in max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-sm text-text-muted mt-1">View all system notifications and alerts.</p>
        </div>
      </div>

      <div className="glass-panel rounded-xl flex flex-col overflow-hidden">
         {/* Top Tab Bar Navigation inside the panel */}
         <div className="flex justify-between items-center px-6 py-4 border-b border-glass-border bg-bg-secondary/30">
            <div className="flex gap-2">
                {['All', 'Unread', 'Important'].map(tab => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                            activeTab === tab 
                            ? 'bg-glass-bg text-purple-400 border border-glass-border' 
                            : 'text-text-muted hover:text-text-primary'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <button className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium">
                <Check size={16} /> Mark all as read
            </button>
         </div>

         {/* Notifications Feed */}
         <div className="flex flex-col divide-y divide-glass-border">
             {filteredList.length === 0 && (
                 <div className="p-8 text-center text-text-muted">No notifications in this view.</div>
             )}
             {filteredList.map(notif => (
                 <div key={notif.id} className={`p-5 flex gap-4 transition-colors hover:bg-glass-bg relative ${notif.unread ? 'bg-purple-900/10' : ''}`}>
                     {/* Left Unread Indicator Bar */}
                     {notif.unread && (
                         <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500 rounded-r-full"></div>
                     )}
                     
                     <div className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 ${notif.iconBg}`}>
                         {notif.icon}
                     </div>
                     
                     <div className="flex-1 flex flex-col justify-center">
                         <div className="flex justify-between items-start">
                             <h4 className={`text-sm ${notif.unread ? 'font-bold text-text-primary' : 'font-medium text-text-muted'}`}>
                                 {notif.title}
                             </h4>
                             <span className="text-xs text-text-muted whitespace-nowrap ml-4">{notif.time}</span>
                         </div>
                         <p className="text-sm text-text-muted mt-1">{notif.desc}</p>
                     </div>
                 </div>
             ))}
         </div>
      </div>
    </div>
  );
};

export default Notifications;
