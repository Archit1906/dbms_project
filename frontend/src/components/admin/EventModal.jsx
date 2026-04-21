import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import api from '../../api/axios';

const EventModal = ({ isOpen, onClose, event, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    venue: '',
    max_participants: '',
    category: 'Workshop'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || '',
        description: event.description || '',
        date: event.date ? new Date(event.date).toISOString().slice(0, 16) : '',
        venue: event.venue || '',
        max_participants: event.max_participants || '',
        category: event.category || 'Workshop'
      });
    } else {
      setFormData({
        title: '',
        description: '',
        date: '',
        venue: '',
        max_participants: '',
        category: 'Workshop'
      });
    }
  }, [event]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload = {
        ...formData,
        max_participants: parseInt(formData.max_participants, 10),
        date: new Date(formData.date).toISOString().slice(0, 19).replace('T', ' ')
      };

      if (event) {
        await api.put(`/events/${event.event_id}`, payload);
      } else {
        await api.post('/events', payload);
      }
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({...prev, [e.target.name]: e.target.value}));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-bg-primary border border-glass-border rounded-xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 border-b border-glass-border">
          <h2 className="text-xl font-bold text-text-primary">{event ? 'Edit Event' : 'Create New Event'}</h2>
          <button onClick={onClose} className="text-text-muted hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          {error && <div className="mb-4 p-3 bg-red-500/20 text-red-400 rounded-lg text-sm">{error}</div>}
          <form id="event-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Event Title</label>
              <input required name="title" value={formData.title} onChange={handleChange} className="w-full bg-bg-secondary border border-glass-border rounded-lg px-4 py-2 text-text-primary outline-none focus:border-purple-500 transition-colors" placeholder="e.g. AI Conference 2025" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Date & Time</label>
                  <input required type="datetime-local" name="date" value={formData.date} onChange={handleChange} className="w-full bg-bg-secondary border border-glass-border rounded-lg px-4 py-2 text-text-primary outline-none focus:border-purple-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Category</label>
                  <select required name="category" value={formData.category} onChange={handleChange} className="w-full bg-bg-secondary border border-glass-border rounded-lg px-4 py-2 text-text-primary outline-none focus:border-purple-500 transition-colors">
                      <option value="Workshop">Workshop</option>
                      <option value="Seminar">Seminar</option>
                      <option value="Hackathon">Hackathon</option>
                      <option value="Cultural">Cultural</option>
                      <option value="Sports">Sports</option>
                      <option value="Other">Other</option>
                  </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Venue</label>
                  <input required name="venue" value={formData.venue} onChange={handleChange} className="w-full bg-bg-secondary border border-glass-border rounded-lg px-4 py-2 text-text-primary outline-none focus:border-purple-500 transition-colors" placeholder="e.g. Main Auditorium" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Max Participants</label>
                  <input required type="number" min="1" name="max_participants" value={formData.max_participants} onChange={handleChange} className="w-full bg-bg-secondary border border-glass-border rounded-lg px-4 py-2 text-text-primary outline-none focus:border-purple-500 transition-colors" placeholder="e.g. 100" />
                </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Description</label>
              <textarea required name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full bg-bg-secondary border border-glass-border rounded-lg px-4 py-2 text-text-primary outline-none focus:border-purple-500 transition-colors" placeholder="Brief event description..."></textarea>
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-glass-border bg-bg-secondary/50 flex justify-end gap-3 rounded-b-xl">
          <button onClick={onClose} disabled={loading} className="px-5 py-2 text-text-muted hover:text-white transition-colors text-sm font-medium">Cancel</button>
          <button type="submit" form="event-form" disabled={loading} className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm font-medium flex items-center gap-2">
             {loading && <div className="animate-spin h-4 w-4 border-2 border-white/20 border-t-white rounded-full" />}
             {event ? 'Save Changes' : 'Create Event'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
