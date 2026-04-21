import React from 'react';

const Favorites = () => {
   return (
      <div className="space-y-6 pb-12 animate-fade-in max-w-4xl mx-auto w-full">
         <div className="flex justify-between items-end border-b border-glass-border pb-4 w-full mt-4">
            <h1 className="text-3xl font-bold text-white">Favorites</h1>
         </div>
         <div className="glass-panel p-8 rounded-xl text-center text-text-muted border border-glass-border">
            You haven't added any events to your favorites yet.
         </div>
      </div>
   );
};

export default Favorites;
