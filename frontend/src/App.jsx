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
import EventDetails from './pages/student/EventDetails';
import MyRegistrations from './pages/student/MyRegistrations';
import CertificateVault from './pages/student/CertificateVault';
import Favorites from './pages/student/Favorites';
import StudentNotifications from './pages/student/Notifications';
import Profile from './pages/student/Profile';
import StudentSettings from './pages/student/Settings';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import EventsAdmin from './pages/admin/Events';
import Participants from './pages/admin/Participants';
import Certificates from './pages/admin/Certificates';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import Registrations from './pages/admin/Registrations';
import Speakers from './pages/admin/Speakers';
import Attendees from './pages/admin/Attendees';
import Schedule from './pages/admin/Schedule';
import Users from './pages/admin/Users';
import Settings from './pages/admin/Settings';
import Notifications from './pages/admin/Notifications';

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
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/student/registrations" element={<MyRegistrations />} />
            <Route path="/student/certificates" element={<CertificateVault />} />
            <Route path="/student/favorites" element={<Favorites />} />
            <Route path="/student/notifications" element={<StudentNotifications />} />
            <Route path="/student/profile" element={<Profile />} />
            <Route path="/student/settings" element={<StudentSettings />} />

            {/* Admin specific */}
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/events" element={<EventsAdmin />} />
            <Route path="/admin/events/:id/participants" element={<Participants />} />
            <Route path="/admin/certificates" element={<Certificates />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="/admin/registrations" element={<Registrations />} />
            <Route path="/admin/speakers" element={<Speakers />} />
            <Route path="/admin/attendees" element={<Attendees />} />
            <Route path="/admin/schedule" element={<Schedule />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/settings" element={<Settings />} />
            <Route path="/admin/notifications" element={<Notifications />} />
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

// FORCE HMR
