import React, { useState } from 'react';
import { Calendar, Award, AlertTriangle, CheckSquare, Clock } from 'lucide-react';

const Notifications = () => {
   const [activeTab, setActiveTab] = useState('unread');
   
   const notifications = [
      { id: 1, type: 'success', title: 'Registration Successful', desc: 'You have successfully registered for AI & Machine Learning Workshop.', time: '2m ago', read: false },
      { id: 2, type: 'reminder', title: 'Event Reminder', desc: 'Cybersecurity Seminar is starting tomorrow at 11:00 AM.', time: '1h ago', read: false },
      { id: 3, type: 'certificate', title: 'Certificate Available', desc: 'Your certificate for Web3 & Blockchain Basics is now available.', time: '3h ago', read: false },
      { id: 4, type: 'alert', title: 'Venue Changed', desc: 'The venue for Tech Symposium 2026 has been changed to Main Auditorium.', time: '1d ago', read: true },
      { id: 5, type: 'closing', title: 'Registration Closing Soon', desc: 'Registrations for UI/UX Design Masterclass closes in 1 day.', time: '1d ago', read: true },
   ];

   const getIcon = (type) => {
      switch(type) {
         case 'success': return <div className="p-3 bg-[#f59e0b]/20 text-[#f59e0b] rounded-lg"><CheckSquare size={20} /></div>;
         case 'reminder': return <div className="p-3 bg-blue-500/20 text-blue-400 rounded-lg"><Calendar size={20} /></div>;
         case 'certificate': return <div className="p-3 bg-green-500/20 text-green-400 rounded-lg"><Award size={20} /></div>;
         case 'alert': return <div className="p-3 bg-red-500/20 text-red-400 rounded-lg"><AlertTriangle size={20} /></div>;
         case 'closing': return <div className="p-3 bg-purple-500/20 text-purple-400 rounded-lg"><Clock size={20} /></div>;
         default: return <div className="p-3 bg-gray-500/20 text-gray-400 rounded-lg"><Calendar size={20} /></div>;
      }
   };

   return (
      <div className="space-y-6 pb-12 animate-fade-in max-w-4xl mx-auto w-full">
         <div className="flex justify-between items-end border-b border-glass-border pb-4 w-full mt-4">
            <h1 className="text-3xl font-bold text-white">Notifications</h1>
            <button className="text-sm font-medium text-accent-blue hover:text-blue-400 transition-colors">Mark all as read</button>
         </div>

         <div className="flex space-x-6 border-b border-glass-border w-full">
            {['all', 'unread', 'important'].map(tab => (
               <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 font-medium text-sm transition-all border-b-2 capitalize px-2 ${activeTab === tab ? 'border-accent-blue text-accent-blue drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'border-transparent text-text-muted hover:text-white'}`}
               >
                  {tab}
               </button>
            ))}
         </div>

         <div className="flex flex-col gap-3 w-full">
            {notifications.filter(n => activeTab === 'all' ? true : activeTab === 'unread' ? !n.read : n.type === 'alert').map(n => (
               <div key={n.id} className={`glass-panel p-4 rounded-xl border border-glass-border flex gap-5 items-start hover:bg-glass-bg transition-colors ${!n.read ? 'bg-white/[0.02]' : ''}`}>
                  <div className="shrink-0 mt-1">
                     {getIcon(n.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                     <h3 className={`text-base font-bold ${!n.read ? 'text-white' : 'text-slate-300'}`}>{n.title}</h3>
                     <p className="text-sm text-text-muted mt-1 leading-relaxed">{n.desc}</p>
                  </div>
                  <div className="text-xs text-text-muted shrink-0 whitespace-nowrap mt-1">
                     {n.time}
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default Notifications;
