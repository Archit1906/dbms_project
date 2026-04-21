import React, { useState, useEffect } from 'react';
import { Search, Download, Edit2, Trash2 } from 'lucide-react';
import api from '../../api/axios';
import { exportToCSV } from '../../utils/exportCsv';

const Attendees = () => {
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAttendees();
  }, []);

  const fetchAttendees = async () => {
    try {
      const res = await api.get('/registrations/all');
      // For attendees, we just show everyone who is tied to a registration
      setAttendees(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    exportToCSV(attendees, 'attendees.csv');
  };

  const filteredAttendees = attendees.filter(a => {
    const matchesSearch = a.attendee_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          a.event_name.toLowerCase().includes(searchTerm.toLowerCase());
    // Since attendees page focuses on users and events, we map the filter this way
    // For specific event filtering, we can add a dropdown, but keeping it simple for now as requested.
    return matchesSearch && a.status === 'Present'; // Only show those who attended
  });

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
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search attendees..." 
              className="pl-9 pr-4 py-2 bg-bg-secondary border border-glass-border rounded-lg text-sm focus:outline-none focus:border-purple-500 transition-colors text-text-primary w-full sm:w-64"
            />
          </div>
          <div className="flex gap-3">
             <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-bg-secondary border border-glass-border hover:bg-glass-bg text-text-primary font-medium rounded-lg transition-colors text-sm">
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
                <th className="font-medium p-4">Event Name</th>
                <th className="font-medium p-4">Status</th>
                <th className="font-medium p-4 rounded-tr-lg">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border">
              {filteredAttendees.map((a) => (
                <tr key={a.reg_id} className="hover:bg-glass-bg transition-colors">
                  <td className="p-4">
                     <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-bg-secondary overflow-hidden shrink-0 border border-glass-border">
                            <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${a.attendee_name}&backgroundColor=1F2937&textColor=F9FAFB`} alt="Avatar" className="w-full h-full object-cover" />
                         </div>
                         <span className="font-medium text-text-primary">{a.attendee_name}</span>
                     </div>
                  </td>
                  <td className="p-4 text-text-muted">{a.email}</td>
                  <td className="p-4 text-text-muted">{a.event_name}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 text-xs rounded-lg font-medium text-green-400 bg-green-500/10 border border-green-500/20">
                      Attended
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
              {filteredAttendees.length === 0 && (
                <tr>
                   <td colSpan="5" className="text-center py-8 text-text-muted">No attendees found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-6 text-sm text-text-muted">
           <span>Showing {filteredAttendees.length} attendees</span>
        </div>
      </div>
    </div>
  );
};

export default Attendees;
