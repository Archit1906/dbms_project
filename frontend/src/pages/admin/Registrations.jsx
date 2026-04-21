import React, { useState, useEffect } from 'react';
import { Search, Download, MoreVertical, Check, X, UserCheck } from 'lucide-react';
import api from '../../api/axios';
import { exportToCSV } from '../../utils/exportCsv';

const Registrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [menuOpen, setMenuOpen] = useState(null);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const res = await api.get('/registrations/all');
      setRegistrations(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    exportToCSV(registrations, 'registrations.csv');
  };

  const updateStatus = async (reg_id, status) => {
    try {
      await api.patch(`/registrations/${reg_id}/status`, { status });
      fetchRegistrations(); // Refresh list to get updated data
      setMenuOpen(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status');
    }
  };

  const filteredRegistrations = registrations.filter(r => {
    const matchesSearch = r.attendee_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.event_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-12 w-full animate-fade-in relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Registrations List</h1>
          <p className="text-sm text-text-muted mt-1">View and manage all event registrations.</p>
        </div>
      </div>

      <div className="glass-panel rounded-xl p-5 flex flex-col min-h-[500px]">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search registration..." 
              className="pl-9 pr-4 py-2 bg-bg-secondary border border-glass-border rounded-lg text-sm focus:outline-none focus:border-purple-500 transition-colors text-text-primary w-full sm:w-64"
            />
          </div>
          <div className="flex gap-3">
             <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-bg-secondary border border-glass-border px-3 py-2 text-sm rounded-lg text-text-primary outline-none"
             >
                 <option value="All">All Status</option>
                 <option value="Registered">Registered</option>
                 <option value="Present">Present</option>
                 <option value="Cancelled">Cancelled</option>
                 <option value="Waitlist">Waitlist</option>
             </select>
             <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-bg-secondary border border-glass-border hover:bg-glass-bg text-text-primary font-medium rounded-lg transition-colors text-sm">
                <Download size={16} /> Export
             </button>
          </div>
        </div>

        <div className="overflow-x-auto flex-1">
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
              {filteredRegistrations.map((reg) => (
                <tr key={reg.reg_id} className="hover:bg-glass-bg transition-colors">
                  <td className="p-4 font-medium text-text-muted">#{reg.reg_id}</td>
                  <td className="p-4 text-text-primary font-medium">{reg.attendee_name}</td>
                  <td className="p-4 text-text-primary">{reg.event_name}</td>
                  <td className="p-4 text-text-muted">{reg.email}</td>
                  <td className="p-4 text-text-muted">{new Date(reg.registration_date).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 text-xs rounded-lg font-medium 
                      ${reg.status === 'Present' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                        reg.status === 'Registered' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
                        reg.status === 'Waitlist' ? 'bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/20' : 
                        'bg-red-500/10 text-red-400 border border-red-500/20'}`}
                    >
                      {reg.status}
                    </span>
                  </td>
                  <td className="p-4 text-center flex justify-center relative">
                    <button onClick={() => setMenuOpen(menuOpen === reg.reg_id ? null : reg.reg_id)} className="text-text-muted hover:text-text-primary p-1 rounded hover:bg-bg-secondary transition-colors" title="More">
                        <MoreVertical size={16} />
                    </button>
                    {menuOpen === reg.reg_id && (
                        <div className="absolute right-8 top-8 z-10 w-40 bg-bg-secondary border border-glass-border rounded-lg shadow-xl overflow-hidden py-1">
                            <button onClick={() => updateStatus(reg.reg_id, 'Present')} className="w-full text-left px-4 py-2 text-xs hover:bg-glass-bg text-green-400 flex items-center gap-2"><UserCheck size={14} /> Mark Present</button>
                            <button onClick={() => updateStatus(reg.reg_id, 'Registered')} className="w-full text-left px-4 py-2 text-xs hover:bg-glass-bg text-blue-400 flex items-center gap-2"><Check size={14} /> Mark Registered</button>
                            <button onClick={() => updateStatus(reg.reg_id, 'Cancelled')} className="w-full text-left px-4 py-2 text-xs hover:bg-glass-bg text-red-400 flex items-center gap-2"><X size={14} /> Cancel</button>
                        </div>
                    )}
                  </td>
                </tr>
              ))}
              {filteredRegistrations.length === 0 && (
                <tr>
                   <td colSpan="7" className="text-center py-8 text-text-muted">No registrations found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="flex justify-between items-center mt-6 text-sm text-text-muted">
           <span>Showing {filteredRegistrations.length} registrations</span>
        </div>
      </div>
    </div>
  );
};

export default Registrations;
