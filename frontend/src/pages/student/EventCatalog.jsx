import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import EventCard from '../../components/EventCard';
import SkeletonCard from '../../components/SkeletonCard';

const EventCatalog = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); // 'all' or 'personalized'

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await api.get('/events');
      setEvents(res.data.data);
    } catch (err) {
      setError('Failed to fetch events');
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
  const displayedEvents = activeTab === 'all' 
     ? events 
     : events.filter(e => e.category === 'Technical' || e.category === 'Cultural');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-accent-gold">
          Event Dashboard
        </h1>
        <p className="text-text-muted mt-2 text-lg">Discover and register for the latest college events happening around campus.</p>
      </div>

      <div className="flex space-x-4 border-b border-glass-border">
        <button 
          onClick={() => setActiveTab('all')}
          className={`pb-3 px-4 font-medium text-sm transition-all border-b-2 ${activeTab === 'all' ? 'border-accent-blue text-accent-blue' : 'border-transparent text-text-muted hover:text-white'}`}
        >
          All Events
        </button>
        <button 
          onClick={() => setActiveTab('personalized')}
          className={`pb-3 px-4 font-medium text-sm transition-all border-b-2 ${activeTab === 'personalized' ? 'border-accent-gold text-accent-gold' : 'border-transparent text-text-muted hover:text-white'}`}
        >
          Personalized Feed
        </button>
      </div>

      {error && <div className="p-4 bg-danger/10 text-danger rounded-lg border border-danger/20">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {loading ? (
           Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
        ) : (
           displayedEvents.length > 0 ? (
             displayedEvents.map((event) => (
               <EventCard key={event.event_id} event={event} onRegister={handleRegister} />
             ))
           ) : (
             <div className="col-span-full py-12 text-center text-text-muted glass-panel rounded-xl">
                No events found for this category.
             </div>
           )
        )}
      </div>
    </div>
  );
};

export default EventCatalog;
