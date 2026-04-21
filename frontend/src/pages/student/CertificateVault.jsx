import React, { useEffect, useState } from 'react';
import { Download, Share2, Search } from 'lucide-react';
import api from '../../api/axios';
import SkeletonCard from '../../components/SkeletonCard';

const CertificateVault = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const res = await api.get('/certificates/my');
      setCertificates(res.data.data);
    } catch (err) {
      setError('Failed to fetch certificates');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (certId, title) => {
    try {
      const res = await api.get(`/certificates/${certId}/download`, {
        responseType: 'blob', // Important for PDF download
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Certificate_${title.replace(/\s+/g, '_')}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      alert('Failed to download certificate.');
    }
  };

  const filteredCertificates = certificates.filter(c => 
     c.event_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      <div className="flex flex-col mb-4">
        <h1 className="text-3xl font-bold text-white ml-1">My Certificates</h1>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-glass-border pb-6">
         <div className="relative w-full sm:w-1/2 md:w-1/3">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
             <input 
                type="text" 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search certificates..." 
                className="w-full bg-bg-primary border border-glass-border rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors" 
             />
         </div>
         <select className="bg-bg-primary border border-glass-border rounded-lg px-4 py-2 text-sm text-text-primary focus:outline-none font-medium text-white transition-colors">
             <option>Sort: Latest</option>
         </select>
      </div>

      {error && <div className="p-4 bg-danger/10 text-danger rounded-lg border border-danger/20">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
             Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
        ) : (
           filteredCertificates.length > 0 ? (
             filteredCertificates.map((cert) => (
               <div key={cert.cert_id} className="glass-panel rounded-xl p-5 border border-glass-border flex flex-col sm:flex-row gap-5 items-center group transition-colors hover:bg-glass-bg">
                  
                  {/* Miniature abstract cert preview */}
                  <div className="w-full sm:w-32 h-24 rounded bg-white relative shrink-0 shadow-lg border border-gray-200 overflow-hidden flex flex-col justify-center items-center">
                     <div className="absolute inset-0 border-[3px] border-[#1e1b4b] m-1 rounded-sm opacity-20 hover:opacity-40 transition-opacity"></div>
                     <div className="w-5 h-5 rounded bg-gradient-to-br from-purple-600 to-[#f59e0b] shadow-md flex items-center justify-center text-white text-[8px] font-bold mb-1">C</div>
                     <div className="text-[6px] text-[#1e1b4b] font-bold text-center leading-tight">
                        ColvEvents<br/>Certificate
                     </div>
                  </div>

                  <div className="flex-1 w-full">
                     <h3 className="text-lg font-bold text-white leading-tight mb-1">{cert.event_title}</h3>
                     <p className="text-xs text-text-muted mb-4">
                        Issued on {new Date(cert.issue_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                     </p>
                     
                     <div className="flex items-center gap-3 w-full">
                        <button 
                           onClick={() => handleDownload(cert.cert_id, cert.event_title)}
                           className="flex-1 flex justify-center items-center gap-1.5 py-1.5 rounded bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white font-medium text-xs transition-all shadow-[0_0_15px_rgba(126,34,206,0.3)]"
                        >
                           <Download size={14} /> Download
                        </button>
                        <button className="p-1.5 rounded border border-glass-border text-text-muted hover:text-white hover:bg-glass-border transition-colors">
                           <Share2 size={16} />
                        </button>
                     </div>
                  </div>
               </div>
             ))
           ) : (
             <div className="col-span-full py-12 text-center text-text-muted glass-panel rounded-xl">
                No certificates found. Ensure you are marked as 'Present' by admins to earn one.
             </div>
           )
        )}
      </div>
    </div>
  );
};

export default CertificateVault;
