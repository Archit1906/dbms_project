import React, { useState, useEffect } from 'react';
import { Search, Plus, Download, Mail } from 'lucide-react';
import api from '../../api/axios';
import GenerateCertModal from '../../components/admin/GenerateCertModal';

const Certificates = () => {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const res = await api.get('/certificates');
      setCerts(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (cert_id, student_name) => {
    try {
      const response = await api.get(`/certificates/${cert_id}/download`, {
        responseType: 'blob' // Important for PDF
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Certificate_${student_name.replace(/\s+/g, '_')}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert('Failed to download certificate. ' + (err.response?.data?.message || ''));
    }
  };

  const filteredCerts = certs.filter(c => 
    c.student_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.event_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12 w-full animate-fade-in flex flex-col h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Certificates Management</h1>
          <p className="text-sm text-text-muted mt-1">Generate and manage event certificates.</p>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
          {/* Left Table Section */}
          <div className="flex-1 glass-panel rounded-xl p-5 flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Search certificates..." 
                  className="pl-9 pr-4 py-2 bg-bg-secondary border border-glass-border rounded-lg text-sm focus:outline-none focus:border-purple-500 transition-colors text-text-primary w-full sm:w-64"
                />
              </div>
              <div className="flex gap-3 items-center">
                 <select className="bg-bg-secondary border border-glass-border px-3 py-2 text-sm rounded-lg text-text-primary outline-none">
                     <option>All Events</option>
                 </select>
                 <select className="bg-bg-secondary border border-glass-border px-3 py-2 text-sm rounded-lg text-text-primary outline-none">
                     <option>All Status</option>
                 </select>
                 <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors text-sm">
                    <Plus size={16} /> Generate Certificate
                 </button>
              </div>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead>
                  <tr className="text-text-muted border-b border-glass-border bg-bg-secondary/50">
                    <th className="font-medium p-4 rounded-tl-lg">Certificate ID</th>
                    <th className="font-medium p-4">Attendee</th>
                    <th className="font-medium p-4">Event</th>
                    <th className="font-medium p-4">Date Generated</th>
                    <th className="font-medium p-4">Status</th>
                    <th className="font-medium p-4 rounded-tr-lg">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-glass-border">
                  {filteredCerts.map((c) => (
                    <tr key={c.cert_id} className="hover:bg-glass-bg transition-colors">
                      <td className="p-4 text-text-primary">#{c.cert_id}</td>
                      <td className="p-4 text-text-muted font-medium">{c.student_name}</td>
                      <td className="p-4 text-text-muted">{c.event_title}</td>
                      <td className="p-4 text-text-muted">{new Date(c.issue_date).toLocaleDateString()}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 text-xs rounded-lg font-medium border bg-green-500/10 text-green-400 border-green-500/20">
                          Generated
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                           <button onClick={() => handleDownload(c.cert_id, c.student_name)} className="text-text-muted hover:text-purple-400 transition-colors" title="Download"><Download size={16} /></button>
                           <button onClick={() => alert('Email dispatched (Mock)')} className="text-text-muted hover:text-purple-400 transition-colors" title="Email"><Mail size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredCerts.length === 0 && (
                      <tr><td colSpan="6" className="text-center py-6 text-text-muted">No certificates found</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-6 text-sm text-text-muted">
               <span>Showing {filteredCerts.length} certificates</span>
            </div>
          </div>

          {/* Right Preview Section */}
          <div className="w-full xl:w-80 glass-panel rounded-xl p-5 flex flex-col items-center shrink-0">
             <h3 className="font-bold text-base mb-6 w-full text-left">Certificate Preview</h3>
             <div className="w-[280px] h-[360px] bg-white rounded-lg p-2 flex flex-col items-center justify-center shadow-lg relative border-4 border-[#1e1b4b] overflow-hidden">
                {/* Certificate Background Elements (simulated) */}
                <div className="absolute inset-0 border-2 border-accent-gold m-2 rounded-sm opacity-50 z-0"></div>
                <div className="absolute top-0 right-0 w-16 h-16 bg-purple-600 rounded-bl-full opacity-20 z-0"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-[#f59e0b] rounded-tr-full opacity-20 z-0"></div>
                
                {/* Content */}
                <div className="z-10 text-center flex flex-col items-center">
                    <div className="w-8 h-8 rounded bg-gradient-to-br from-purple-600 to-[#f59e0b] flex items-center justify-center text-white font-bold text-xs shadow-md mb-2">
                        C
                    </div>
                    <div className="text-black font-serif text-[10px] tracking-wider uppercase opacity-70">ColvEvents</div>
                    
                    <h2 className="text-[#1e1b4b] font-serif text-lg font-bold mt-4 mb-1">Certificate of Participation</h2>
                    <p className="text-gray-500 text-[9px] mb-3">This is to certify that</p>
                    
                    <h1 className="text-black font-serif text-2xl font-bold italic mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-[#f59e0b]">John Doe</h1>
                    
                    <p className="text-gray-500 text-[9px] mb-1">has successfully participated in</p>
                    <h3 className="text-black font-bold text-sm">Tech Fest 2025</h3>
                </div>

                <div className="absolute bottom-4 w-full px-6 flex justify-between items-center z-10">
                    <div className="border-t border-gray-300 w-16 text-center pt-1">
                        <span className="text-gray-500 text-[6px] uppercase tracking-wider block">Date</span>
                    </div>
                    <div className="border-t border-gray-300 w-16 text-center pt-1">
                        <span className="text-gray-500 text-[6px] uppercase tracking-wider block">Signature</span>
                    </div>
                </div>
             </div>
          </div>
      </div>
      <GenerateCertModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={fetchCertificates} />
    </div>
  );
};

export default Certificates;
