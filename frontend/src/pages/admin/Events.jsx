import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

const Events = () => {
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

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event? This will cascade delete registrations and certificates.')) return;
    try {
      const res = await api.delete(`/events/${id}`);
      if (res.data.success) {
        setEvents(events.filter(e => e.event_id !== id));
      }
    } catch (err) {
      alert('Failed to delete event');
    }
  };

  if (loading) return <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-blue"></div></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Manage Events</h1>
          <p className="text-text-muted mt-1">Create, view, and organize college events.</p>
        </div>
        <button className="bg-accent-blue hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-[0_4px_14px_rgba(59,130,246,0.39)]">
          <Plus size={18} /> Create Event
        </button>
      </div>

      <div className="glass-panel rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-glass-bg border-b border-glass-border">
                <th className="py-4 px-6 font-semibold text-text-muted">Event Title</th>
                <th className="py-4 px-6 font-semibold text-text-muted">Date</th>
                <th className="py-4 px-6 font-semibold text-text-muted">Capacity</th>
                <th className="py-4 px-6 font-semibold text-text-muted">Status</th>
                <th className="py-4 px-6 font-semibold text-text-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border">
              {events.map((event) => {
                const isFull = event.total_registered >= event.max_capacity;
                return (
                  <tr key={event.event_id} className="hover:bg-glass-bg/50 transition-colors">
                    <td className="py-4 px-6 font-medium">{event.title}</td>
                    <td className="py-4 px-6 text-text-muted">{new Date(event.date).toLocaleDateString()}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                         <div className="w-full bg-glass-bg rounded-full h-2 max-w-[100px]">
                           <div className={`h-2 rounded-full ${isFull ? 'bg-danger' : 'bg-accent-blue'}`} style={{ width: `${Math.min(100, (event.total_registered / event.max_capacity) * 100)}%` }}></div>
                         </div>
                         <span className="text-xs text-text-muted w-10 text-right">{event.total_registered}/{event.max_capacity}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                          isFull 
                             ? 'bg-danger/10 text-danger border-danger/20'
                             : 'bg-success/10 text-success border-success/20'
                       }`}>
                          {isFull ? 'Full' : 'Open'}
                       </span>
                    </td>
                    <td className="py-4 px-6">
                       <div className="flex items-center justify-end gap-3">
                         <Link to={`/admin/events/${event.event_id}/participants`} className="text-accent-gold hover:text-yellow-400 p-2 rounded-lg hover:bg-glass-bg transition-colors" title="Manage Participants">
                           <Users size={18} />
                         </Link>
                         <button className="text-text-muted hover:text-white p-2 rounded-lg hover:bg-glass-bg transition-colors" title="Edit">
                           <Edit2 size={18} />
                         </button>
                         <button onClick={() => handleDelete(event.event_id)} className="text-text-muted hover:text-danger p-2 rounded-lg hover:bg-danger/10 transition-colors" title="Delete">
                           <Trash2 size={18} />
                         </button>
                       </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Events;
