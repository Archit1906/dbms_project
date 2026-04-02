import React from 'react';
import { motion } from 'framer-motion';

const SkeletonCard = () => {
  return (
    <motion.div 
      className="glass-panel rounded-xl p-6 overflow-hidden relative min-h-[220px] flex flex-col justify-between"
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
    >
      <div>
        <div className="h-6 bg-slate-700/50 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-slate-700/50 rounded w-full mb-2"></div>
        <div className="h-4 bg-slate-700/50 rounded w-5/6"></div>
      </div>
      <div className="mt-6 flex justify-between items-center">
        <div className="h-4 bg-slate-700/50 rounded w-1/3"></div>
        <div className="h-8 bg-slate-700/50 rounded-full w-24"></div>
      </div>
    </motion.div>
  );
};

export default SkeletonCard;
