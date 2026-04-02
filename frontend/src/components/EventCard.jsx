import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users } from 'lucide-react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Note: should use env variable later

const EventCard = ({ event, onRegister }) => {
  const [currentRegistered, setCurrentRegistered] = useState(event.total_registered || 0);

  useEffect(() => {
    // Listen for live updates
    const handleRegistrationUpdate = (data) => {
      if (data.event_id === event.event_id) {
        setCurrentRegistered(data.current_registered);
      }
    };

    socket.on('registration_updated', handleRegistrationUpdate);

    return () => {
      socket.off('registration_updated', handleRegistrationUpdate);
    };
  }, [event.event_id]);

  const percentageFull = Math.min((currentRegistered / event.max_participants) * 100, 100) || 0;
  const isFull = currentRegistered >= event.max_participants;

  return (
    <motion.div 
      whileHover={{ y: -5, boxShadow: '0 10px 40px -10px rgba(59, 130, 246, 0.3)' }}
      className="glass-panel flex flex-col justify-between rounded-xl p-6 border-t border-glass-border/50 transition-all h-full"
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent-blue bg-accent-blue/10 px-3 py-1 rounded-full">
            {event.category}
          </span>
          {isFull && (
            <span className="text-xs font-bold uppercase tracking-wider text-accent-gold bg-accent-gold/10 px-3 py-1 rounded-full animate-pulse">
              Waitlist
            </span>
          )}
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{event.title}</h3>
        <p className="text-sm text-text-muted mb-4 line-clamp-2">{event.description}</p>
        
        <div className="flex items-center text-sm text-slate-300 mb-2">
          <Calendar size={16} className="text-accent-blue mr-2" />
          {new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        <div className="flex items-center text-sm text-slate-300">
          <MapPin size={16} className="text-accent-gold mr-2" />
          {event.venue}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-700/50">
        <div className="flex justify-between text-sm mb-2">
           <span className="text-text-muted flex items-center">
             <Users size={14} className="mr-1"/> Capacity
           </span>
           <span className="text-white font-medium">
             {currentRegistered} <span className="text-slate-500">/ {event.max_participants}</span>
           </span>
        </div>
        
        {/* Progress bar */}
        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden mb-4">
           <motion.div 
             initial={{ width: 0 }}
             animate={{ width: `${percentageFull}%` }}
             className={`h-full ${isFull ? 'bg-accent-gold' : 'bg-accent-blue'}`}
             transition={{ duration: 0.5 }}
           />
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onRegister(event.event_id, isFull)}
          className={`w-full py-2.5 rounded-lg font-medium transition-all shadow-lg ${
            isFull 
              ? 'bg-gradient-to-r from-accent-gold/80 to-accent-gold hover:from-accent-gold hover:to-accent-gold/90 text-slate-900 shadow-accent-gold/20' 
              : 'bg-gradient-to-r from-accent-blue to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white shadow-blue-500/20'
          }`}
        >
          {isFull ? 'Join Waitlist' : 'Register Now'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default EventCard;
