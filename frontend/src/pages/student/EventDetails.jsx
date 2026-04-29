import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Share2, Calendar, MapPin, Users, Clock, Building, CheckCircle2 } from 'lucide-react';
import api from '../../api/axios';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const res = await api.get('/events');
        const found = res.data.data.find(e => e.event_id === parseInt(id));
        if (found) {
           setEvent(found);
        } else {
           setError('Event not found.');
        }
      } catch (err) {
        setError('Failed to fetch event.');
      } finally {
        setLoading(false);
      }
    };
    fetchEventDetails();
  }, [id]);

  const handleRegister = async () => {
    try {
      const res = await api.post('/registrations', { event_id: event.event_id });
      if (res.data.success) {
         alert(res.data.message || 'Successfully registered!');
      }
    } catch (err) {
       alert(err.response?.data?.message || 'Failed to register');
    }
  };

  if (loading) {
     return <div className="flex h-64 items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div></div>;
  }

  if (error || !event) {
     return <div className="p-8 text-center text-red-500 glass-panel">{error || 'Event not found'}</div>;
  }

  const isFull = event.total_registered >= event.max_participants;
  const closeDate = new Date(event.date);
  closeDate.setDate(closeDate.getDate() - 1); // Mocking registration close date

  return (
    <div className="w-full pb-12 animate-fade-in">
       <button onClick={() => navigate(-1)} className="flex items-center text-text-muted hover:text-white transition-colors mb-6">
          <ChevronLeft size={20} className="mr-1"/> Back to Events
       </button>

       {/* Top Header Section */}
       <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 border-b border-glass-border pb-6">
          <div className="flex-1">
             <div className="flex items-center gap-4 mb-2">
                <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">{event.title}</h1>
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent-blue bg-accent-blue/10 border border-accent-blue/20 px-3 py-1 rounded-full hidden sm:block">
                  {event.category}
                </span>
             </div>
             <p className="text-text-muted text-lg">{event.description}</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
             <button className="flex items-center justify-center gap-2 px-5 py-2.5 glass-panel rounded-lg hover:bg-glass-bg transition-colors flex-1 md:flex-none">
                <Share2 size={18}/> Share
             </button>
             <button onClick={handleRegister} className="flex items-center justify-center gap-2 px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors font-medium shadow-[0_0_20px_rgba(147,51,234,0.3)] flex-1 md:flex-none">
                {isFull ? 'Join Waitlist' : 'Register Now'}
             </button>
          </div>
       </div>

       {/* Main Grid container */}
       <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column (Metadata) */}
          <div className="w-full lg:w-[320px] shrink-0 space-y-6">
             <div className="glass-panel rounded-xl p-6 flex flex-col gap-6">
                
                <div className="flex items-start gap-4">
                   <div className="p-2.5 bg-bg-secondary rounded-lg text-text-muted shrink-0">
                      <Calendar size={20} />
                   </div>
                   <div>
                      <p className="text-xs text-text-muted uppercase tracking-wider font-bold mb-1">Date & Time</p>
                      <p className="text-sm text-white">{new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', weekday: 'long' })}</p>
                      <p className="text-sm text-text-muted">{new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                   </div>
                </div>

                <div className="flex items-start gap-4">
                   <div className="p-2.5 bg-bg-secondary rounded-lg text-text-muted shrink-0">
                      <MapPin size={20} />
                   </div>
                   <div>
                      <p className="text-xs text-text-muted uppercase tracking-wider font-bold mb-1">Location</p>
                      <p className="text-sm text-white">{event.venue}</p>
                   </div>
                </div>

                <div className="flex items-start gap-4">
                   <div className="p-2.5 bg-bg-secondary rounded-lg text-text-muted shrink-0">
                      <Users size={20} />
                   </div>
                   <div>
                      <p className="text-xs text-text-muted uppercase tracking-wider font-bold mb-1">Capacity</p>
                      <p className="text-sm text-white">{event.total_registered || 0} / {event.max_participants} Registered</p>
                   </div>
                </div>

                <div className="flex items-start gap-4">
                   <div className="p-2.5 bg-bg-secondary rounded-lg text-text-muted shrink-0">
                      <Clock size={20} />
                   </div>
                   <div>
                      <p className="text-xs text-text-muted uppercase tracking-wider font-bold mb-1">Registration Closes</p>
                      <p className="text-sm text-white">{closeDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}, 11:59 PM</p>
                   </div>
                </div>

                <div className="flex items-start gap-4">
                   <div className="p-2.5 bg-bg-secondary rounded-lg text-text-muted shrink-0">
                      <Building size={20} />
                   </div>
                   <div>
                      <p className="text-xs text-text-muted uppercase tracking-wider font-bold mb-1">Organized By</p>
                      <p className="text-sm text-white">College Committee</p>
                   </div>
                </div>

             </div>
          </div>

          {/* Right Column (Image & Description) */}
          <div className="flex-1 min-w-0">
             <div className="w-full h-[300px] lg:h-[400px] rounded-xl overflow-hidden mb-8 border border-glass-border relative">
                <img 
                   src={`https://source.unsplash.com/1200x600/?${event.category === 'Technical' ? 'technology,ai' : event.category === 'Cultural' ? 'music,art' : 'event'}`} 
                   onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop'; }}
                   alt={event.title} 
                   className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/20 to-transparent"></div>
             </div>

             <div className="flex flex-col xl:flex-row gap-8">
                {/* Description Column */}
                <div className="flex-1">
                   <h2 className="text-xl font-bold text-white mb-4">About the Event</h2>
                   <p className="text-text-muted leading-relaxed mb-6">
                      {event.description}
                      <br /><br />
                      This special session is organized to provide deep insights and practical knowledge. Perfect for beginners and intermediate attendees looking to enhance their skills and connect with like-minded peers in an interactive environment.
                   </p>

                   <h3 className="text-lg font-bold text-white mb-4">You will learn:</h3>
                   <ul className="space-y-3">
                      {['Core theoretical concepts methodologies', 'Practical applications in real-world scenarios', 'Best practices and potential pitfalls', 'Networking and professional development'].map((item, idx) => (
                         <li key={idx} className="flex items-start gap-3">
                            <CheckCircle2 size={18} className="text-purple-500 mt-0.5 shrink-0" />
                            <span className="text-text-muted">{item}</span>
                         </li>
                      ))}
                   </ul>
                </div>

                {/* Info panels Column */}
                <div className="w-full xl:w-[280px] shrink-0 space-y-6">
                   <div className="glass-panel p-6 rounded-xl border border-glass-border">
                      <h3 className="text-base font-bold text-white mb-3 tracking-wide">Requirements</h3>
                      <p className="text-sm text-text-muted leading-relaxed">
                         Bring your laptop (fully charged), notepad, and be prepared to participate actively in the session.
                      </p>
                   </div>
                   
                   <div className="glass-panel p-6 rounded-xl border border-glass-border">
                      <h3 className="text-base font-bold text-white mb-3 tracking-wide">Event Schedule</h3>
                      <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-glass-border before:to-transparent">
                          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                              <div className="flex items-center justify-center w-5 h-5 rounded-full border border-purple-500 bg-bg-primary text-purple-500 z-10 font-bold shrink-0"></div>
                              <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-2.5rem)] ml-4 md:ml-0 p-3 rounded-lg border border-glass-border glass-panel">
                                 <p className="text-xs text-text-muted font-bold">10:00 AM</p>
                                 <p className="text-sm text-white">Opening Keynote</p>
                              </div>
                          </div>
                          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                              <div className="flex items-center justify-center w-5 h-5 rounded-full border border-glass-border bg-bg-secondary text-text-muted z-10 font-bold shrink-0"></div>
                              <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-2.5rem)] ml-4 md:ml-0 p-3 rounded-lg border border-glass-border glass-panel">
                                 <p className="text-xs text-text-muted font-bold">11:30 AM</p>
                                 <p className="text-sm text-white">Main Session</p>
                              </div>
                          </div>
                      </div>
                   </div>
                </div>

             </div>
          </div>

       </div>
    </div>
  );
};

export default EventDetails;
