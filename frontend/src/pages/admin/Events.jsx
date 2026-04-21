import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Filter } from 'lucide-react';
import api from '../../api/axios';

const EventsAdmin = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await api.get('/events');
      setEvents(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const mockEvents = [
    { event_id: 1, title: 'Tech Fest 2025', date: 'Apr 25, 2025', category: 'Technology', registrations: 120, attendance: '102 (85%)', status: 'Active' },
    { event_id: 2, title: 'Design Workshop', date: 'Apr 28, 2025', category: 'Design', registrations: 75, attendance: '55 (73%)', status: 'Upcoming' },
    { event_id: 3, title: 'AI Conference 2025', date: 'May 02, 2025', category: 'Conference', registrations: 95, attendance: '-', status: 'Upcoming' },
    { event_id: 4, title: 'Robotics Expo', date: 'May 07, 2025', category: 'Exhibition', registrations: 80, attendance: '-', status: 'Upcoming' },
    { event_id: 5, title: 'Marketing Summit', date: 'May 15, 2025', category: 'Conference', registrations: 60, attendance: '-', status: 'Draft' },
  ];

  return (
    <div className="space-y-6 pb-12 w-full animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Events Management</h1>
          <p className="text-sm text-text-muted mt-1">Create, manage and organize your events.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors text-sm">
          <Plus size={16} /> Create Event
        </button>
      </div>

      <div className="glass-panel rounded-xl p-5 flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
            <input 
              type="text" 
              placeholder="Search event..." 
              className="pl-9 pr-4 py-2 bg-bg-secondary border border-glass-border rounded-lg text-sm focus:outline-none focus:border-purple-500 transition-colors text-text-primary w-full sm:w-64"
            />
          </div>
          <div className="flex gap-3">
             <select className="bg-bg-secondary border border-glass-border px-3 py-2 text-sm rounded-lg text-text-primary outline-none">
                 <option>All Status</option>
             </select>
             <select className="bg-bg-secondary border border-glass-border px-3 py-2 text-sm rounded-lg text-text-primary outline-none">
                 <option>All Categories</option>
             </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="text-text-muted border-b border-glass-border bg-bg-secondary/50">
                <th className="font-medium p-4 rounded-tl-lg">Event Name</th>
                <th className="font-medium p-4">Date</th>
                <th className="font-medium p-4">Category</th>
                <th className="font-medium p-4">Registrations</th>
                <th className="font-medium p-4">Attendance</th>
                <th className="font-medium p-4">Status</th>
                <th className="font-medium p-4 rounded-tr-lg">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border">
              {mockEvents.map((ev) => (
                <tr key={ev.event_id} className="hover:bg-glass-bg transition-colors">
                  <div className="p-4 flex items-center gap-3">
                     <div className={`w-8 h-8 rounded shrink-0 flex items-center justify-center text-white font-bold
                         ${ev.category === 'Technology' ? 'bg-purple-500' : ev.category === 'Design' ? 'bg-pink-500' : ev.category === 'Exhibition' ? 'bg-[#f59e0b]' : 'bg-green-500'}
                     `}>
                        {ev.title.charAt(0)}
                     </div>
                     <span className="font-medium text-text-primary">{ev.title}</span>
                  </div>
                  <td className="p-4 text-text-muted">{ev.date}</td>
                  <td className="p-4 text-text-muted">{ev.category}</td>
                  <td className="p-4 text-text-primary">{ev.registrations}</td>
                  <td className="p-4 text-text-primary">{ev.attendance}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 text-xs rounded-lg font-medium 
                      ${ev.status === 'Active' ? 'bg-green-500/20 text-green-400' : 
                        ev.status === 'Upcoming' ? 'bg-blue-500/20 text-blue-400' : 
                        'bg-gray-500/20 text-gray-400'}`}
                    >
                      {ev.status}
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
           <span>Showing 1 to 5 of 5 events</span>
           <div className="flex gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded border border-glass-border hover:bg-glass-bg">&lt;</button>
              <button className="w-8 h-8 flex items-center justify-center rounded bg-purple-600 text-white border border-purple-500">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-glass-border hover:bg-glass-bg">&gt;</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default EventsAdmin;
