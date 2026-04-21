import React, { useState } from 'react';
import { Search, Plus, Download, Mail } from 'lucide-react';

const Certificates = () => {
  const [certs] = useState([
    { id: 'CERT-2025-001', name: 'John Doe', event: 'Tech Fest 2025', date: 'Apr 25, 2025', status: 'Generated' },
    { id: 'CERT-2025-002', name: 'Sarah Wilson', event: 'Design Workshop', date: 'Apr 25, 2025', status: 'Generated' },
    { id: 'CERT-2025-003', name: 'Michael Brown', event: 'AI Conference 2025', date: 'Apr 23, 2025', status: 'Pending' },
    { id: 'CERT-2025-004', name: 'Emily Davis', event: 'Robotics Expo', date: 'Apr 22, 2025', status: 'Generated' },
    { id: 'CERT-2025-005', name: 'David Lee', event: 'Tech Fest 2025', date: 'Apr 21, 2025', status: 'Generated' },
  ]);

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
                 <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors text-sm">
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
                  {certs.map((c) => (
                    <tr key={c.id} className="hover:bg-glass-bg transition-colors">
                      <td className="p-4 text-text-primary">{c.id}</td>
                      <td className="p-4 text-text-muted font-medium">{c.name}</td>
                      <td className="p-4 text-text-muted">{c.event}</td>
                      <td className="p-4 text-text-muted">{c.date}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 text-xs rounded-lg font-medium border
                          ${c.status === 'Generated' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20'}`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                           <button className="text-text-muted hover:text-purple-400 transition-colors" title="Download"><Download size={16} /></button>
                           <button className="text-text-muted hover:text-purple-400 transition-colors" title="Email"><Mail size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-6 text-sm text-text-muted">
               <span>Showing 1 to 5 of 10 certificates</span>
               <div className="flex gap-1">
                  <button className="w-8 h-8 flex items-center justify-center rounded border border-glass-border hover:bg-glass-bg">&lt;</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded bg-purple-600 text-white border border-purple-500">1</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded border border-glass-border hover:bg-glass-bg">2</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded border border-glass-border hover:bg-glass-bg">&gt;</button>
               </div>
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
    </div>
  );
};

export default Certificates;
