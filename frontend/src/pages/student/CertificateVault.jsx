import React, { useEffect, useState } from 'react';
import { DownloadCloud, Award } from 'lucide-react';
import api from '../../api/axios';
import SkeletonCard from '../../components/SkeletonCard';

const CertificateVault = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-accent-gold">
          Certificate Vault
        </h1>
        <p className="text-text-muted mt-2 text-lg">View and download certificates from completed events.</p>
      </div>

      {error && <div className="p-4 bg-danger/10 text-danger rounded-lg border border-danger/20">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
             Array(3).fill(0).map((_, i) => <SkeletonCard key={i} />)
        ) : (
           certificates.length > 0 ? (
             certificates.map((cert) => (
               <div key={cert.cert_id} className="glass-panel rounded-xl p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform">
                  <div className="flex justify-between items-start mb-4">
                     <span className="text-accent-gold bg-accent-gold/10 p-3 rounded-full">
                        <Award size={24} />
                     </span>
                     <span className="text-xs text-text-muted">
                        Issue Date: {new Date(cert.issue_date).toLocaleDateString()}
                     </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{cert.event_title}</h3>
                  <div className="text-sm text-text-muted mb-6">
                     <p>Verification Hash:</p>
                     <p className="font-mono text-xs truncate bg-black/20 p-2 rounded mt-1">{cert.unique_verification_hash}</p>
                  </div>
                  <button 
                     onClick={() => handleDownload(cert.cert_id, cert.event_title)}
                     className="w-full flex justify-center items-center gap-2 py-2.5 rounded-lg font-medium bg-accent-blue/10 text-accent-blue border border-accent-blue/20 hover:bg-accent-blue hover:text-white transition-all"
                  >
                     <DownloadCloud size={18} /> Download PDF
                  </button>
               </div>
             ))
           ) : (
             <div className="col-span-full py-12 text-center text-text-muted glass-panel rounded-xl">
                No certificates earned yet. Attend events and get marked present!
             </div>
           )
        )}
      </div>
    </div>
  );
};

export default CertificateVault;
