import React, { useState } from 'react';
import { Search, Download, Edit2, Trash2 } from 'lucide-react';

const Attendees = () => {
  const [attendees] = useState([
    { id: 1, name: 'John Doe', email: 'john@gmail.com', phone: '+1 234 567 8901', status: 'Attended' },
    { id: 2, name: 'Sarah Wilson', email: 'sarah@gmail.com', phone: '+1 234 567 8902', status: 'Attended' },
    { id: 3, name: 'Michael Brown', email: 'michael@gmail.com', phone: '+1 234 567 8903', status: 'Attended' },
    { id: 4, name: 'Emily Davis', email: 'emily@gmail.com', phone: '+1 234 567 8904', status: 'No Show' },
    { id: 5, name: 'David Lee', email: 'david@gmail.com', phone: '+1 234 567 8905', status: 'Registered' },
  ]);

  return (
    <div className="space-y-6 pb-12 w-full animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Attendees List</h1>
          <p className="text-sm text-text-muted mt-1">View and manage event attendees.</p>
        </div>
      </div>

      <div className="glass-panel rounded-xl p-5 flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
            <input 
              type="text" 
              placeholder="Search attendees..." 
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
             <button className="flex items-center gap-2 px-4 py-2 bg-bg-secondary border border-glass-border hover:bg-glass-bg text-text-primary font-medium rounded-lg transition-colors text-sm">
                <Download size={16} /> Export
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="text-text-muted border-b border-glass-border bg-bg-secondary/50">
                <th className="font-medium p-4 rounded-tl-lg">Attendee Name</th>
                <th className="font-medium p-4">Email</th>
                <th className="font-medium p-4">Phone</th>
                <th className="font-medium p-4">Status</th>
                <th className="font-medium p-4 rounded-tr-lg">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border">
              {attendees.map((a) => (
                <tr key={a.id} className="hover:bg-glass-bg transition-colors">
                  <td className="p-4">
                     <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-bg-secondary overflow-hidden shrink-0 border border-glass-border">
                            <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${a.name}&backgroundColor=1F2937&textColor=F9FAFB`} alt="Avatar" className="w-full h-full object-cover" />
                         </div>
                         <span className="font-medium text-text-primary">{a.name}</span>
                     </div>
                  </td>
                  <td className="p-4 text-text-muted">{a.email}</td>
                  <td className="p-4 text-text-muted">{a.phone}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 text-xs rounded-lg font-medium 
                      ${a.status === 'Attended' ? 'text-green-400' : a.status === 'Registered' ? 'text-[#f59e0b]' : 'text-red-400'}`}
                    >
                      {a.status}
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

        <div className="flex justify-between items-center mt-6 text-sm text-text-muted">
           <span>Showing 1 to 5 of 980 attendees</span>
           <div className="flex gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded border border-glass-border hover:bg-glass-bg">&lt;</button>
              <button className="w-8 h-8 flex items-center justify-center rounded bg-purple-600 text-white border border-purple-500">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-glass-border hover:bg-glass-bg">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-glass-border hover:bg-glass-bg">3</button>
              <div className="w-8 h-8 flex items-center justify-center text-text-muted">...</div>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-glass-border hover:bg-glass-bg">196</button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-glass-border hover:bg-glass-bg">&gt;</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Attendees;
