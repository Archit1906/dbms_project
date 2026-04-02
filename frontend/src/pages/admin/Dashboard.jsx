import React, { useEffect, useState } from 'react';
import { Users, Calendar, CheckCircle, Award, Activity } from 'lucide-react';
import api from '../../api/axios';

const Dashboard = () => {
  const [stats, setStats] = useState({ totalEvents: 0, totalRegistered: 0, totalPresent: 0, totalCerts: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // In a real application, a dedicated KPI endpoint would be used.
      // Here we aggregate from existing endpoints to satisfy the requirements quickly.
      const eventsRes = await api.get('/events');
      const certsRes = await api.get('/certificates');
      
      const events = eventsRes.data.data;
      const certs = certsRes.data.data;

      const totalRegistered = events.reduce((acc, curr) => acc + parseInt(curr.total_registered, 10), 0);
      const totalPresent = events.reduce((acc, curr) => acc + parseInt(curr.total_present, 10), 0);

      setStats({
        totalEvents: events.length,
        totalRegistered,
        totalPresent,
        totalCerts: certs.length
      });
    } catch (err) {
      console.error('Failed to fetch dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-blue"></div></div>;

  const attendanceRate = stats.totalRegistered === 0 ? 0 : Math.round((stats.totalPresent / stats.totalRegistered) * 100);

  const kpis = [
    { label: 'Active Events', value: stats.totalEvents, icon: Calendar, color: 'text-accent-blue', bg: 'bg-accent-blue/10 border-accent-blue/20' },
    { label: 'Total Registrations', value: stats.totalRegistered, icon: Users, color: 'text-accent-gold', bg: 'bg-accent-gold/10 border-accent-gold/20' },
    { label: 'Attendance Rate', value: `${attendanceRate}%`, icon: Activity, color: 'text-success', bg: 'bg-success/10 border-success/20' },
    { label: 'Certificates Issued', value: stats.totalCerts, icon: Award, color: 'text-purple-400', bg: 'bg-purple-400/10 border-purple-400/20' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-text-muted mt-1">Platform overview and key performance indicators.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="glass-panel rounded-xl p-6 hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg border ${kpi.bg}`}>
                  <Icon size={24} className={kpi.color} />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold">{kpi.value}</h3>
                <p className="text-text-muted text-sm mt-1">{kpi.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="glass-panel rounded-xl p-6 mt-8">
        <div className="flex justify-between items-center mb-6">
           <h2 className="text-lg font-bold">Platform Activity Analytics</h2>
        </div>
        <div className="h-64 flex items-center justify-center border-2 border-dashed border-glass-border rounded-lg text-text-muted">
           <p className="flex items-center gap-2"><Activity size={18} /> Detailed charts placeholder</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
