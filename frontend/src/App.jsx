import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/authStore';
import api from './api/axios';

// Layouts
import PageWrapper from './components/layout/PageWrapper';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Protected Routes Shell
import ProtectedRoute from './routes/ProtectedRoute';

// Student Pages
import EventCatalog from './pages/student/EventCatalog';
import MyRegistrations from './pages/student/MyRegistrations';
import CertificateVault from './pages/student/CertificateVault';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import EventsAdmin from './pages/admin/Events';
import Participants from './pages/admin/Participants';
import Certificates from './pages/admin/Certificates';
import AdminAnalytics from './pages/admin/AdminAnalytics';

const App = () => {
  const { isAuthenticated, setUser, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (isAuthenticated) {
          const res = await api.get('/auth/me');
          setUser(res.data.data);
        }
      } catch (err) {
        logout();
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [isAuthenticated, setUser, logout]);

  if (loading) return <div className="h-screen w-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-gold"></div></div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />

        {/* Protected Routes encapsulated in Layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<PageWrapper />}>
            {/* Common / Redirect */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
            
            {/* Default role based dash via Wrapper logic, but separate routes */}
            <Route path="/dashboard" element={<DashboardRouter />} />
            
            {/* Student specific */}
            <Route path="/events/catalog" element={<EventCatalog />} />
            <Route path="/student/registrations" element={<MyRegistrations />} />
            <Route path="/student/certificates" element={<CertificateVault />} />

            {/* Admin specific */}
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/events" element={<EventsAdmin />} />
            <Route path="/admin/events/:id/participants" element={<Participants />} />
            <Route path="/admin/certificates" element={<Certificates />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

// Simple router to redirect to proper default page based on role
const DashboardRouter = () => {
  const { user } = useAuthStore();
  if (user?.role === 'Admin') return <Navigate to="/admin/dashboard" />;
  return <Navigate to="/events/catalog" />;
};

export default App;
