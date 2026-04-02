import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const ProtectedRoute = () => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Once user is fully fetched, we allow Outlet to render
  if (!user) {
     return <div className="h-screen w-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-gold"></div></div>;
  }

  return <Outlet />;
};

export default ProtectedRoute;
