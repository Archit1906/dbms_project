import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2 } from 'lucide-react';

const Speakers = () => {
  const [speakers] = useState([
    { id: 1, name: 'Charles Williams', event: 'Tech Fest 2025', title: 'CEO, Tech Corp', email: 'charles@gmail.com', status: 'Confirmed' },
    { id: 2, name: 'Leslie Alexander', event: 'Design Workshop', title: 'Creative Director', email: 'leslie@gmail.com', status: 'Confirmed' },
    { id: 3, name: 'Courtney Henry', event: 'AI Conference 2025', title: 'AI Researcher', email: 'courtney@gmail.com', status: 'Pending' },
    { id: 4, name: 'Darlene Robertson', event: 'Robotics Expo', title: 'Robotics Engineer', email: 'darlene@gmail.com', status: 'Confirmed' },
    { id: 5, name: 'Robert Johnson', event: 'Marketing Summit', title: 'Marketing Head', email: 'robert@gmail.com', status: 'Confirmed' },
  ]);

  return (
    <div className="space-y-6 pb-12 w-full animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Speakers List</h1>
          <p className="text-sm text-text-muted mt-1">Manage all event speakers and their details.</p>
        </div>
        <button 
          onClick={() => console.log('Add Speaker clicked')}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors text-sm"
        >
          <Plus size={16} /> Add Speaker
        </button>
      </div>

      <div className="glass-panel rounded-xl p-5 flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
            <input 
              type="text" 
              placeholder="Search speakers..." 
              className="pl-9 pr-4 py-2 bg-bg-secondary border border-glass-border rounded-lg text-sm focus:outline-none focus:border-purple-500 transition-colors text-text-primary w-full sm:w-64"
            />
          </div>
          <div className="flex gap-3">
             <select className="bg-bg-secondary border border-glass-border px-3 py-2 text-sm rounded-lg text-text-primary outline-none">
                 <option>All Events</option>
             </select>
             <select className="bg-bg-secondary border border-glass-border px-3 py-2 text-sm rounded-lg text-text-primary outline-none">
                 <option>All Status</option>
             </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="text-text-muted border-b border-glass-border bg-bg-secondary/50">
                <th className="font-medium p-4 rounded-tl-lg">Speaker</th>
                <th className="font-medium p-4">Event</th>
                <th className="font-medium p-4">Title / Position</th>
                <th className="font-medium p-4">Email</th>
                <th className="font-medium p-4">Status</th>
                <th className="font-medium p-4 rounded-tr-lg">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border">
              {speakers.map((s) => (
                <tr key={s.id} className="hover:bg-glass-bg transition-colors">
                  <td className="p-4">
                     <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-bg-secondary overflow-hidden shrink-0 border border-glass-border">
                            <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${s.name}&backgroundColor=1F2937&textColor=F9FAFB`} alt="Avatar" className="w-full h-full object-cover" />
                         </div>
                         <span className="font-medium text-text-primary">{s.name}</span>
                     </div>
                  </td>
                  <td className="p-4 text-text-muted">{s.event}</td>
                  <td className="p-4 text-text-muted">{s.title}</td>
                  <td className="p-4 text-text-muted">{s.email}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 text-xs rounded-lg font-medium 
                      ${s.status === 'Confirmed' ? 'text-green-400' : 'text-[#f59e0b]'}`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                       <button className="text-text-muted hover:text-purple-400 transition-colors" title="Edit"><Edit2 size={16} /></button>
                       <button className="text-text-muted hover:text-danger transition-colors" title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Speakers;
