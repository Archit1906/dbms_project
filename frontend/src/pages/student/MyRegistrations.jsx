import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, XCircle } from 'lucide-react';
import api from '../../api/axios';

const MyRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming'); // upcoming, past, cancelled

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

  const handleCancelRegistration = async (regId) => {
     if(!window.confirm("Are you sure you want to cancel your registration?")) return;
     try {
        await api.patch(`/registrations/${regId}/status`, { status: 'Cancelled' });
        fetchRegistrations();
     } catch (err) {
        alert("Failed to cancel registration.");
     }
  };

  const getFilteredRegistrations = () => {
      const now = new Date();
      return registrations.filter(reg => {
          if (activeTab === 'cancelled') return reg.status === 'Cancelled';
          
          const isPast = new Date(reg.date) < now;
          if (activeTab === 'upcoming') return !isPast && reg.status !== 'Cancelled';
          if (activeTab === 'past') return isPast && reg.status !== 'Cancelled';
          return true;
      });
  };

  const displayedRegs = getFilteredRegistrations();

  if (loading) return <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div></div>;

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 ml-1">My Registrations</h1>
      </div>

      <div className="flex space-x-6 border-b border-glass-border">
         {['upcoming', 'past', 'cancelled'].map(tab => (
            <button 
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`pb-3 font-medium text-sm transition-all border-b-2 capitalize ${activeTab === tab ? 'border-purple-500 text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]' : 'border-transparent text-text-muted hover:text-white'}`}
            >
               {tab}
            </button>
         ))}
      </div>

      <div className="flex flex-col gap-4">
         {displayedRegs.length === 0 ? (
            <div className="glass-panel p-8 rounded-xl text-center text-text-muted">
               No {activeTab} registrations found.
            </div>
         ) : (
            displayedRegs.map(reg => (
               <div key={reg.reg_id} className="glass-panel p-4 rounded-xl border border-glass-border flex flex-col md:flex-row gap-6 items-start md:items-center group hover:bg-glass-bg transition-colors">
                  <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden shrink-0 border border-glass-border">
                     <img 
                        src={`https://source.unsplash.com/600x400/?${reg.title?.includes('Workshop') ? 'technology' : 'event'}`}
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop'; }}
                        alt="Event Thumbnail"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                     />
                  </div>
                  
                  <div className="flex-1">
                     <h3 className="text-xl font-bold text-white mb-2">{reg.title}</h3>
                     <div className="flex flex-col gap-1.5 text-sm">
                        <div className="flex items-center text-slate-300">
                           <Calendar size={14} className="text-text-muted mr-2" />
                           {new Date(reg.date).toLocaleDateString()} • {new Date(reg.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div className="flex items-center text-slate-300">
                           <MapPin size={14} className="text-text-muted mr-2" />
                           {reg.venue}
                        </div>
                     </div>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
                     <span className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full border ${
                         activeTab === 'upcoming' 
                            ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                            : activeTab === 'cancelled'
                            ? 'bg-red-500/10 text-red-400 border-red-500/20'
                            : 'bg-green-500/10 text-green-400 border-green-500/20'
                     }`}>
                        {activeTab}
                     </span>
                     
                     {activeTab === 'upcoming' && (
                        <div className="mt-4 border-t border-glass-border pt-4 w-full md:text-right">
                           <div className="text-xs text-text-muted mb-2 text-left md:text-right">Can't make it?<br/>Cancel your registration before the deadline.</div>
                           <button onClick={() => handleCancelRegistration(reg.reg_id)} className="flex items-center text-red-400 hover:text-red-300 transition-colors text-sm font-medium">
                              <XCircle size={16} className="mr-1.5" /> Cancel Registration
                           </button>
                        </div>
                     )}
                  </div>
               </div>
            ))
         )}
      </div>
    </div>
  );
};

export default MyRegistrations;
