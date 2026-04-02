import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, X, Search } from 'lucide-react';
import api from '../../api/axios';

const Participants = () => {
  const { id } = useParams();
  const [participants, setParticipants] = useState([]);
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [resParts, resEvent] = await Promise.all([
         api.get(`/registrations/event/${id}`),
         api.get(`/events/${id}`)
      ]);
      setParticipants(resParts.data.data);
      setEventDetails(resEvent.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleAttendance = async (regId, newStatus) => {
     try {
        const res = await api.patch(`/registrations/${regId}/status`, { participation_status: newStatus });
        if (res.data.success) {
           setParticipants(participants.map(p => 
              p.reg_id === regId ? { ...p, participation_status: newStatus } : p
           ));
        }
     } catch (err) {
        alert(err.response?.data?.message || 'Failed to update attendance');
     }
  };

  const filtered = participants.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.email.toLowerCase().includes(searchTerm.toLowerCase()));

  if (loading) return <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-blue"></div></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
         <Link to="/admin/events" className="p-2 border border-glass-border rounded-lg bg-glass-bg hover:bg-glass-border/50 text-text-muted hover:text-white transition-colors">
            <ArrowLeft size={20} />
         </Link>
        <div>
          <h1 className="text-2xl font-bold">Participants: {eventDetails?.title}</h1>
          <p className="text-text-muted mt-1">Manage attendance for this event.</p>
        </div>
      </div>

      <div className="glass-panel rounded-xl overflow-hidden p-6 flex flex-col md:flex-row justify-between items-center gap-4">
         <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <input 
               type="text" 
               placeholder="Search by name or email..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full bg-glass-bg border border-glass-border rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent-blue/50 text-text-primary placeholder:text-text-muted"
            />
         </div>
         <div className="text-sm font-medium">
             Total: {filtered.length} Participants
         </div>
      </div>

      <div className="glass-panel rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-glass-bg border-b border-glass-border">
                <th className="py-4 px-6 font-semibold text-text-muted">Student Name</th>
                <th className="py-4 px-6 font-semibold text-text-muted">Department</th>
                <th className="py-4 px-6 font-semibold text-text-muted">Status</th>
                <th className="py-4 px-6 font-semibold text-text-muted text-right">Attendance Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border">
              {filtered.map((p) => {
                 const isPresent = p.participation_status === 'Present';
                 const isAbsent = p.participation_status === 'Absent';
                 return (
                  <tr key={p.reg_id} className="hover:bg-glass-bg/50 transition-colors">
                    <td className="py-4 px-6">
                       <div className="font-medium">{p.name}</div>
                       <div className="text-text-muted text-sm">{p.email}</div>
                    </td>
                    <td className="py-4 px-6 text-text-muted">{p.department} (Yr {p.year})</td>
                    <td className="py-4 px-6">
                       <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                          isPresent 
                             ? 'bg-success/10 text-success border-success/20'
                             : isAbsent
                             ? 'bg-danger/10 text-danger border-danger/20'
                             : 'bg-accent-blue/10 text-accent-blue border-accent-blue/20'
                       }`}>
                          {p.participation_status}
                       </span>
                    </td>
                    <td className="py-4 px-6">
                       <div className="flex items-center justify-end gap-2">
                         <button 
                            onClick={() => toggleAttendance(p.reg_id, 'Present')}
                            className={`p-2 rounded-lg border transition-colors ${
                               isPresent ? 'bg-success border-success text-white' : 'bg-glass-bg border-glass-border text-text-muted hover:text-success hover:border-success/30'
                            }`}
                            title="Mark Present"
                         >
                            <Check size={18} />
                         </button>
                         <button 
                            onClick={() => toggleAttendance(p.reg_id, 'Absent')}
                            className={`p-2 rounded-lg border transition-colors ${
                               isAbsent ? 'bg-danger border-danger text-white' : 'bg-glass-bg border-glass-border text-text-muted hover:text-danger hover:border-danger/30'
                            }`}
                            title="Mark Absent"
                         >
                            <X size={18} />
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

export default Participants;
