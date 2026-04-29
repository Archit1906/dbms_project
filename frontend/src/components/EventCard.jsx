import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event, onRegister }) => {
  const navigate = useNavigate();
  // Hardcode current registered for visual parity, or use total_registered
  const currentRegistered = event.total_registered || 0;
  
  const percentageFull = Math.min((currentRegistered / event.max_participants) * 100, 100) || 0;
  const isFull = currentRegistered >= event.max_participants;

  // Fake days left based on dates
  const daysLeft = Math.max(1, Math.floor((new Date(event.date) - new Date()) / (1000 * 60 * 60 * 24)));

  const handleCardClick = (e) => {
     // Prevent navigation if clicking on register button or heart
     navigate(`/events/${event.event_id}`);
  };

  const handleRegisterClick = (e) => {
     e.stopPropagation();
     onRegister(event.event_id, isFull);
  };

  return (
    <motion.div 
      whileHover={{ y: -5, boxShadow: '0 10px 40px -10px rgba(59, 130, 246, 0.3)' }}
      onClick={handleCardClick}
      className="glass-panel flex flex-col justify-between rounded-2xl overflow-hidden border border-glass-border/50 transition-all cursor-pointer h-full group"
    >
      <div className="relative h-48 w-full overflow-hidden">
         {/* Background Image - Mocked based on category */}
         <img 
            src={`https://source.unsplash.com/600x400/?${event.category === 'Technical' ? 'technology,ai' : event.category === 'Cultural' ? 'music,art' : 'event'}`} 
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop'; }}
            alt={event.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-90 text-white font-medium"></div>
         
         <div className="absolute top-3 left-3">
             <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-purple-600/80 backdrop-blur-sm px-2.5 py-1 rounded">
               {event.category}
             </span>
         </div>
         
         <div className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors">
            <Heart size={20} />
         </div>

         <div className="absolute bottom-3 right-3">
             <span className="text-[10px] font-bold uppercase tracking-wider text-accent-blue bg-accent-blue/10 backdrop-blur-sm border border-accent-blue/30 px-2.5 py-1 rounded-full">
               {daysLeft} Days Left
             </span>
         </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{event.title}</h3>
        <p className="text-xs text-text-muted mb-4 line-clamp-2 min-h-[32px]">{event.description}</p>
        
        <div className="flex flex-col gap-2 mt-auto">
           <div className="flex items-center text-xs text-slate-300">
             <Calendar size={14} className="text-text-muted mr-2" />
             {new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} • {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
           </div>
           <div className="flex items-center text-xs text-slate-300">
             <MapPin size={14} className="text-text-muted mr-2" />
             {event.venue}
           </div>
        </div>

        <div className="mt-5 pt-3 border-t border-glass-border">
          <div className="flex justify-between text-xs mb-2">
             <span className="text-text-muted flex items-center">
               <Users size={12} className="mr-1"/> Capacity
             </span>
             <span className="text-white font-medium">
               {currentRegistered} <span className="text-slate-500">/ {event.max_participants}</span>
             </span>
          </div>
          
          <div className="h-1 w-full bg-bg-secondary rounded-full overflow-hidden mb-4 relative">
             <div 
               className={`absolute top-0 left-0 h-full ${isFull ? 'bg-accent-gold' : 'bg-accent-blue'}`}
               style={{ width: `${percentageFull}%` }}
             />
          </div>

          <button
            onClick={handleRegisterClick}
            className={`w-full py-2 rounded font-medium transition-all text-sm ${
              isFull 
                ? 'bg-glass-bg border border-glass-border hover:bg-white/10 text-text-primary' 
                : 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(147,51,234,0.3)]'
            }`}
          >
            {isFull ? 'Join Waitlist' : 'Register Now'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
