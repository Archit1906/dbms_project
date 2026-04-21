import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2 } from 'lucide-react';

const Schedule = () => {
  const [sessions] = useState([
    { id: 1, title: 'Opening Keynote', event: 'Tech Fest 2025', speaker: 'Charles Williams', datetime: 'Apr 25, 2025 10:00 AM', venue: 'Main Auditorium' },
    { id: 2, title: 'UI/UX Design Trends', event: 'Design Workshop', speaker: 'Leslie Alexander', datetime: 'Apr 28, 2025 02:00 PM', venue: 'Seminar Hall' },
    { id: 3, title: 'AI in Future', event: 'AI Conference 2025', speaker: 'Courtney Henry', datetime: 'May 02, 2025 09:00 AM', venue: 'Conference Room' },
    { id: 4, title: 'Robotics Innovation', event: 'Robotics Expo', speaker: 'Darlene Robertson', datetime: 'May 07, 2025 11:00 AM', venue: 'Exhibition Center' },
    { id: 5, title: 'Marketing Strategies', event: 'Marketing Summit', speaker: 'Robert Johnson', datetime: 'May 15, 2025 03:00 PM', venue: 'Main Auditorium' },
  ]);

  return (
    <div className="space-y-6 pb-12 w-full animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Event Schedules</h1>
          <p className="text-sm text-text-muted mt-1">Manage event schedules and sessions.</p>
        </div>
        <button 
          onClick={() => console.log('Add Session clicked')}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors text-sm"
        >
          <Plus size={16} /> Add Session
        </button>
      </div>

      <div className="glass-panel rounded-xl p-5 flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
            <input 
              type="text" 
              placeholder="Search session..." 
              className="pl-9 pr-4 py-2 bg-bg-secondary border border-glass-border rounded-lg text-sm focus:outline-none focus:border-purple-500 transition-colors text-text-primary w-full sm:w-64"
            />
          </div>
          <div className="flex gap-3">
             <select className="bg-bg-secondary border border-glass-border px-3 py-2 text-sm rounded-lg text-text-primary outline-none text-text-muted">
                 <option>All Events</option>
             </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="text-text-muted border-b border-glass-border bg-bg-secondary/50">
                <th className="font-medium p-4 rounded-tl-lg">Session Title</th>
                <th className="font-medium p-4">Event</th>
                <th className="font-medium p-4">Speaker</th>
                <th className="font-medium p-4">Date & Time</th>
                <th className="font-medium p-4">Venue</th>
                <th className="font-medium p-4 rounded-tr-lg text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border">
              {sessions.map((s) => (
                <tr key={s.id} className="hover:bg-glass-bg transition-colors">
                  <td className="p-4 font-medium text-text-primary">{s.title}</td>
                  <td className="p-4 text-text-muted">{s.event}</td>
                  <td className="p-4 text-text-muted">{s.speaker}</td>
                  <td className="p-4 text-text-muted">{s.datetime}</td>
                  <td className="p-4 text-text-muted">{s.venue}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-3">
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

export default Schedule;
