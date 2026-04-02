import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const PageWrapper = () => {
  return (
    <div className="flex bg-bg-primary text-text-primary min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col relative w-full h-screen overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-auto p-4 md:p-8 w-full z-0 relative">
             <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PageWrapper;
