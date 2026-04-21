import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import api from '../../api/axios';

const GenerateCertModal = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  
  const [selectedEventId, setSelectedEventId] = useState('');
  const [selectedRegId, setSelectedRegId] = useState('');

  useEffect(() => {
    if (isOpen) {
       fetchRegistrations();
       setSelectedEventId('');
       setSelectedRegId('');
       setError(null);
    }
  }, [isOpen]);

  const fetchRegistrations = async () => {
    try {
       const res = await api.get('/registrations/all');
       // Only show attendees who are marked 'Present' and don't already have certificates
       // For UI simplicity, just show Present. API will throw error if certificate exists
       setRegistrations(res.data.data.filter(r => r.status === 'Present'));
    } catch (err) {
       console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.post('/certificates/generate', { reg_id: selectedRegId });
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to generate certificate');
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  const uniqueEvents = [...new Map(registrations.map(r => [r.event_id, { id: r.event_id, title: r.event_name }])).values()];
  const attendeesForEvent = registrations.filter(r => r.event_id === parseInt(selectedEventId));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-bg-primary border border-glass-border rounded-xl w-full max-w-md shadow-2xl flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-glass-border">
          <h2 className="text-xl font-bold text-text-primary">Generate Certificate</h2>
          <button onClick={onClose} className="text-text-muted hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          {error && <div className="mb-4 p-3 bg-red-500/20 text-red-400 rounded-lg text-sm">{error}</div>}
          <form id="cert-form" onSubmit={handleSubmit} className="space-y-4">
             <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Select Event</label>
                <select required value={selectedEventId} onChange={e => {setSelectedEventId(e.target.value); setSelectedRegId('');}} className="w-full bg-bg-secondary border border-glass-border rounded-lg px-4 py-2 text-text-primary outline-none focus:border-purple-500 transition-colors">
                    <option value="">-- Choose Event --</option>
                    {uniqueEvents.map(ev => <option key={ev.id} value={ev.id}>{ev.title}</option>)}
                </select>
             </div>
             
             <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Select Attendee</label>
                <select required value={selectedRegId} onChange={e => setSelectedRegId(e.target.value)} disabled={!selectedEventId} className="w-full bg-bg-secondary border border-glass-border rounded-lg px-4 py-2 text-text-primary outline-none focus:border-purple-500 transition-colors disabled:opacity-50">
                    <option value="">-- Choose Attendee --</option>
                    {attendeesForEvent.map(a => <option key={a.reg_id} value={a.reg_id}>{a.attendee_name} ({a.email})</option>)}
                </select>
             </div>
          </form>
        </div>

        <div className="p-6 border-t border-glass-border bg-bg-secondary/50 flex justify-end gap-3 rounded-b-xl">
          <button onClick={onClose} disabled={loading} className="px-5 py-2 text-text-muted hover:text-white transition-colors text-sm font-medium">Cancel</button>
          <button type="submit" form="cert-form" disabled={loading} className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm font-medium">
             {loading ? 'Generating...' : 'Generate Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateCertModal;
