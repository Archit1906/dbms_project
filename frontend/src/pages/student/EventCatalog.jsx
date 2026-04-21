import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import EventCard from '../../components/EventCard';
import SkeletonCard from '../../components/SkeletonCard';
import { Calendar, Award, CheckCircle, Percent, Search, Heart } from 'lucide-react';

const EventCatalog = () => {
  const [events, setEvents] = useState([]);
  const [metrics, setMetrics] = useState({ registered: 0, certificates: 0, attended: 0, attendanceRate: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); // 'all' or 'personalized'
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [eventsRes, regsRes, certsRes] = await Promise.all([
        api.get('/events'),
        api.get('/registrations/my'),
        api.get('/certificates/my')
      ]);
      setEvents(eventsRes.data.data);
      
      const regs = regsRes.data.data;
      const certs = certsRes.data.data;
      const attended = regs.filter(r => r.status === 'Present').length;
      
      setMetrics({
         registered: regs.length,
         certificates: certs.length,
         attended: attended,
         attendanceRate: regs.length > 0 ? Math.round((attended / regs.length) * 100) : 0
      });
    } catch (err) {
      setError('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (eventId, isWaitlist) => {
    try {
      const res = await api.post('/registrations', { event_id: eventId });
      if (res.data.success) {
         alert(res.data.message || 'Successfully registered!');
      }
    } catch (err) {
       alert(err.response?.data?.message || 'Failed to register');
    }
  };

  // Generic mocked personalized feed filter for demonstration (e.g., matching a category)
  // In a real scenario, this would use user department metadata matched to event categories
  const displayedEvents = events.filter(e => {
     if (searchTerm && !e.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
     if (activeTab === 'personalized' && e.category !== 'Workshop') return false; 
     return true;
  });

  return (
    <div className="space-y-8 animate-fade-in w-full pb-12">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent-blue via-purple-500 to-pink-500">
          Event Dashboard
        </h1>
        <p className="text-text-muted mt-2 text-sm tracking-wide">Discover and register for the latest college events happening around campus.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         <div className="glass-panel p-5 rounded-xl border border-glass-border flex items-center justify-between">
            <div className="flex gap-4 items-center">
               <div className="p-3 bg-purple-500/20 rounded-xl text-purple-400">
                  <Calendar size={24} />
               </div>
               <div>
                  <p className="text-text-muted text-xs font-bold uppercase tracking-wider mb-1">Registered Events</p>
                  <p className="text-3xl font-bold text-white">{metrics.registered.toString().padStart(2, '0')}</p>
                  <p className="text-xs text-text-muted mt-1">Upcoming</p>
               </div>
            </div>
         </div>
         
         <div className="glass-panel p-5 rounded-xl border border-glass-border flex items-center justify-between">
            <div className="flex gap-4 items-center">
               <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
                  <Award size={24} />
               </div>
               <div>
                  <p className="text-text-muted text-xs font-bold uppercase tracking-wider mb-1">Certificates Earned</p>
                  <p className="text-3xl font-bold text-white">{metrics.certificates.toString().padStart(2, '0')}</p>
                  <p className="text-xs text-text-muted mt-1">Till Now</p>
               </div>
            </div>
         </div>

         <div className="glass-panel p-5 rounded-xl border border-glass-border flex items-center justify-between">
            <div className="flex gap-4 items-center">
               <div className="p-3 bg-[#f59e0b]/20 rounded-xl text-[#f59e0b]">
                  <CheckCircle size={24} />
               </div>
               <div>
                  <p className="text-text-muted text-xs font-bold uppercase tracking-wider mb-1">Events Attended</p>
                  <p className="text-3xl font-bold text-white">{metrics.attended.toString().padStart(2, '0')}</p>
                  <p className="text-xs text-text-muted mt-1">This Semester</p>
               </div>
            </div>
         </div>

         <div className="glass-panel p-5 rounded-xl border border-glass-border flex items-center justify-between">
            <div className="flex gap-4 items-center">
               <div className="p-3 bg-green-500/20 rounded-xl text-green-400">
                  <Percent size={24} />
               </div>
               <div>
                  <p className="text-text-muted text-xs font-bold uppercase tracking-wider mb-1">Attendance</p>
                  <p className="text-3xl font-bold text-white">{metrics.attendanceRate}%</p>
                  <p className="text-xs text-text-muted mt-1">Great going!</p>
               </div>
            </div>
         </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-bg-secondary/50 rounded-xl p-3 border border-glass-border gap-4">
          <div className="relative w-full sm:w-1/3">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
             <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search events..." className="w-full bg-bg-primary border border-glass-border rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-accent-blue" />
          </div>
          <div className="flex flex-wrap gap-3 w-full sm:w-auto">
             <select className="bg-bg-primary border border-glass-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none flex-1 sm:flex-none">
                <option>All Categories</option>
             </select>
             <select className="bg-bg-primary border border-glass-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none flex-1 sm:flex-none">
                <option>All Dates</option>
             </select>
             <select className="bg-bg-primary border border-glass-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none flex-1 sm:flex-none">
                <option>Event Type</option>
             </select>
             <select className="bg-bg-primary border border-glass-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none flex-1 sm:flex-none">
                <option>Sort By: Latest</option>
             </select>
          </div>
      </div>

      <div className="flex space-x-6 border-b border-glass-border">
        <button 
          onClick={() => setActiveTab('all')}
          className={`pb-3 font-medium text-sm transition-all border-b-2 ${activeTab === 'all' ? 'border-accent-blue text-accent-blue drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'border-transparent text-text-muted hover:text-white'}`}
        >
          All Events
        </button>
        <button 
          onClick={() => setActiveTab('personalized')}
          className={`pb-3 font-medium text-sm transition-all border-b-2 ${activeTab === 'personalized' ? 'border-accent-blue text-accent-blue drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'border-transparent text-text-muted hover:text-white'}`}
        >
          Personalized Feed
        </button>
      </div>

      {error && <div className="p-4 bg-danger/10 text-danger rounded-lg border border-danger/20">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
           Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
        ) : (
           displayedEvents.length > 0 ? (
             displayedEvents.map((event) => (
               <EventCard key={event.event_id} event={event} onRegister={handleRegister} />
             ))
           ) : (
             <div className="col-span-full py-12 text-center text-text-muted glass-panel rounded-xl">
                No events found matching your criteria.
             </div>
           )
        )}
      </div>
    </div>
  );
};

export default EventCatalog;
