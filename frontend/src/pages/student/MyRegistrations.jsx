import React, { useEffect, useState } from 'react';
import { Download, FileText } from 'lucide-react';
import api from '../../api/axios';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const MyRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(null);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const res = await api.get('/registrations/my');
      setRegistrations(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadCertificate = async (regId) => {
    try {
      setDownloading(regId);
      // Fetch certificates array to match the regId to get the cert_id
      const certRes = await api.get('/certificates/my');
      const certificates = certRes.data.data;
      const cert = certificates.find(c => c.reg_id === regId);
      
      if (!cert) {
         alert('Certificate data not generated yet.');
         setDownloading(null);
         return;
      }

      // Fetch specific cert details for rendering
      const detailRes = await api.get(`/certificates/${cert.cert_id}/download`);
      const data = detailRes.data.data;

      // Create a temporary hidden DOM element to render the certificate into
      const certElement = document.createElement('div');
      certElement.style.position = 'absolute';
      certElement.style.left = '-9999px';
      certElement.style.top = '-9999px';
      certElement.style.width = '1000px';
      certElement.style.height = '700px';
      certElement.style.background = '#0A0F1E'; // Matches dark theme
      certElement.style.color = '#F9FAFB';
      certElement.style.fontFamily = 'Helvetica, sans-serif';
      certElement.style.padding = '40px';
      certElement.style.boxSizing = 'border-box';
      
      certElement.innerHTML = `
         <div style="border: 4px solid #F59E0B; height: 100%; width: 100%; padding: 40px; box-sizing: border-box; text-align: center; position: relative;">
            <div style="font-size: 24px; color: #3B82F6; font-weight: bold; letter-spacing: 2px; margin-bottom: 20px;">
               THE INSTITUTE OF TECHNOLOGY
            </div>
            
            <div style="font-size: 16px; color: #6B7280; margin-bottom: 60px;">
               This is to certify that
            </div>
            
            <div style="font-size: 48px; font-weight: bold; color: #F59E0B; margin-bottom: 20px; font-style: italic;">
               ${data.student_name}
            </div>
            
            <div style="font-size: 18px; color: #F9FAFB; margin-bottom: 60px;">
               of Department ${data.department}
            </div>
            
            <div style="font-size: 16px; color: #6B7280; margin-bottom: 20px;">
               has successfully participated in the event
            </div>
            
            <div style="font-size: 28px; font-weight: bold; color: #3B82F6; margin-bottom: 40px;">
               ${data.event_title}
            </div>
            
            <div style="font-size: 16px; color: #F9FAFB; margin-top: auto;">
               Held on <strong>${new Date(data.event_date).toLocaleDateString()}</strong> at <strong>${data.venue}</strong>
            </div>

            <div style="position: absolute; bottom: 40px; left: 40px; text-align: left; font-size: 12px; color: #6B7280;">
               Certificate ID: CERT-${data.cert_id}<br/>
               Issued: ${new Date(data.issue_date).toLocaleString()}
            </div>
         </div>
      `;
      document.body.appendChild(certElement);

      const canvas = await html2canvas(certElement, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF('landscape', 'px', [1000, 700]);
      pdf.addImage(imgData, 'PNG', 0, 0, 1000, 700);
      pdf.save(`Certificate-${data.student_name.replace(' ', '_')}-${data.event_title.replace(/\s+/g, '_')}.pdf`);

      document.body.removeChild(certElement);
      
    } catch (err) {
      console.error(err);
      alert('Failed to generate PDF');
    } finally {
      setDownloading(null);
    }
  };

  if (loading) return <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-blue"></div></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Registrations</h1>
        <p className="text-text-muted mt-1">Track your event attendances and download certificates.</p>
      </div>

      <div className="glass-panel rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-glass-bg border-b border-glass-border">
                <th className="py-4 px-6 font-semibold text-text-muted">Event Title</th>
                <th className="py-4 px-6 font-semibold text-text-muted">Date</th>
                <th className="py-4 px-6 font-semibold text-text-muted">Status</th>
                <th className="py-4 px-6 font-semibold text-text-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border">
              {registrations.length === 0 ? (
                <tr>
                   <td colSpan="4" className="py-8 text-center text-text-muted">You have no registrations yet.</td>
                </tr>
              ) : (
                 registrations.map((reg) => {
                    const isPresent = reg.participation_status === 'Present';
                    
                    return (
                       <tr key={reg.reg_id} className="hover:bg-glass-bg/50 transition-colors">
                          <td className="py-4 px-6 font-medium">{reg.title}</td>
                          <td className="py-4 px-6 text-text-muted">{new Date(reg.date).toLocaleDateString()}</td>
                          <td className="py-4 px-6">
                             <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                                reg.participation_status === 'Present' 
                                   ? 'bg-success/10 text-success border-success/20'
                                   : reg.participation_status === 'Absent'
                                   ? 'bg-danger/10 text-danger border-danger/20'
                                   : 'bg-accent-blue/10 text-accent-blue border-accent-blue/20'
                             }`}>
                                {reg.participation_status}
                             </span>
                          </td>
                          <td className="py-4 px-6 text-right">
                             {isPresent ? (
                                <button
                                   onClick={() => downloadCertificate(reg.reg_id)}
                                   disabled={downloading === reg.reg_id}
                                   className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-gold to-yellow-600 hover:from-yellow-600 hover:to-accent-gold text-white text-sm font-medium rounded-lg shadow-lg shadow-accent-gold/20 transition-all cursor-pointer"
                                >
                                   {downloading === reg.reg_id ? <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span> : <Download size={16} />}
                                   Download Certificate
                                </button>
                             ) : (
                                <span className="inline-flex items-center gap-2 px-4 py-2 text-text-muted text-sm border border-glass-border rounded-lg bg-glass-bg cursor-not-allowed">
                                   <FileText size={16} /> Locked
                                </span>
                             )}
                          </td>
                       </tr>
                    );
                 })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyRegistrations;
