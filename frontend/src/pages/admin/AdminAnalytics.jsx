import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import api from '../../api/axios';
import SkeletonCard from '../../components/SkeletonCard';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminAnalytics = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get('/admin/reports/department-stats');
      setStats(res.data.data);
    } catch (err) {
      setError('Failed to load analytics.');
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: stats.map(s => s.department),
    datasets: [
      {
        label: 'Total Participants',
        data: stats.map(s => s.total_participants),
        backgroundColor: 'rgba(59, 130, 246, 0.8)', // accent-blue
      },
      {
        label: 'Total Attendances',
        data: stats.map(s => s.total_attendances),
        backgroundColor: 'rgba(245, 158, 11, 0.8)', // accent-gold
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top', labels: { color: '#F9FAFB' } },
      title: { display: false }
    },
    scales: {
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: '#6B7280' }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#6B7280' }
      }
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-accent-gold">
          Department Analytics
        </h1>
        <p className="text-text-muted mt-2 text-lg">Visual overview of participation and attendance across departments.</p>
      </div>

      {error && <div className="p-4 bg-danger/10 text-danger rounded-lg border border-danger/20">{error}</div>}

      <div className="glass-panel p-8 rounded-xl h-[500px] flex items-center justify-center">
        {loading ? (
             <SkeletonCard />
        ) : (
           stats.length > 0 ? (
             <Bar data={chartData} options={chartOptions} />
           ) : (
             <div className="text-text-muted">No data available yet.</div>
           )
        )}
      </div>
    </div>
  );
};

export default AdminAnalytics;
