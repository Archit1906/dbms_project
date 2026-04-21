import React, { useState } from 'react';
import { Search, Download, MoreVertical } from 'lucide-react';

const Registrations = () => {
  const [registrations] = useState([
    { id: '#3251', name: 'John Doe', event: 'Tech Fest 2025', email: 'john@gmail.com', date: 'Apr 20, 2025', status: 'Approved' },
    { id: '#3250', name: 'Sarah Wilson', event: 'Design Workshop', email: 'sarah@gmail.com', date: 'Apr 20, 2025', status: 'Pending' },
    { id: '#3249', name: 'Michael Brown', event: 'AI Conference 2025', email: 'michael@gmail.com', date: 'Apr 18, 2025', status: 'Approved' },
    { id: '#3248', name: 'Emily Davis', event: 'Robotics Expo', email: 'emily@gmail.com', date: 'Apr 16, 2025', status: 'Cancelled' },
    { id: '#3247', name: 'David Lee', event: 'Tech Fest 2025', email: 'david@gmail.com', date: 'Apr 15, 2025', status: 'Approved' },
  ]);

  return (
    <div className="space-y-6 pb-12 w-full animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Registrations List</h1>
          <p className="text-sm text-text-muted mt-1">View and manage all event registrations.</p>
        </div>
      </div>

      <div className="glass-panel rounded-xl p-5 flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
            <input 
              type="text" 
              placeholder="Search registration..." 
              className="pl-9 pr-4 py-2 bg-bg-secondary border border-glass-border rounded-lg text-sm focus:outline-none focus:border-purple-500 transition-colors text-text-primary w-full sm:w-64"
            />
          </div>
          <div className="flex gap-3">
             <select className="bg-bg-secondary border border-glass-border px-3 py-2 text-sm rounded-lg text-text-primary outline-none">
                 <option>All Status</option>
             </select>
             <button className="flex items-center gap-2 px-4 py-2 bg-bg-secondary border border-glass-border hover:bg-glass-bg text-text-primary font-medium rounded-lg transition-colors text-sm">
                <Download size={16} /> Export
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="text-text-muted border-b border-glass-border bg-bg-secondary/50">
                <th className="font-medium p-4 rounded-tl-lg">ID</th>
                <th className="font-medium p-4">Attendee Name</th>
                <th className="font-medium p-4">Event Name</th>
                <th className="font-medium p-4">Email</th>
                <th className="font-medium p-4">Date</th>
                <th className="font-medium p-4">Status</th>
                <th className="font-medium p-4 text-center rounded-tr-lg">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border">
              {registrations.map((reg) => (
                <tr key={reg.id} className="hover:bg-glass-bg transition-colors">
                  <td className="p-4 font-medium text-text-muted">{reg.id}</td>
                  <td className="p-4 text-text-primary font-medium">{reg.name}</td>
                  <td className="p-4 text-text-primary">{reg.event}</td>
                  <td className="p-4 text-text-muted">{reg.email}</td>
                  <td className="p-4 text-text-muted">{reg.date}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 text-xs rounded-lg font-medium 
                      ${reg.status === 'Approved' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                        reg.status === 'Pending' ? 'bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/20' : 
                        'bg-red-500/10 text-red-400 border border-red-500/20'}`}
                    >
                      {reg.status}
                    </span>
                  </td>
                  <td className="p-4 text-center flex justify-center">
                    <button className="text-text-muted hover:text-text-primary p-1 rounded hover:bg-bg-secondary transition-colors" title="More">
                        <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex justify-between items-center mt-6 text-sm text-text-muted">
           <span>Showing 1 to 5 of 1,250 registrations</span>
           <div className="flex gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded border border-glass-border hover:bg-glass-bg">&lt;</button>
              <button className="w-8 h-8 flex items-center justify-center rounded bg-purple-600 text-white border border-purple-500">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-glass-border hover:bg-glass-bg">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-glass-border hover:bg-glass-bg">3</button>
              <div className="w-8 h-8 flex items-center justify-center text-text-muted">...</div>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-glass-border hover:bg-glass-bg">250</button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-glass-border hover:bg-glass-bg">&gt;</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Registrations;
