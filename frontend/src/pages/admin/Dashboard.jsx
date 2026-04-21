import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Activity, Award, Plus, Download, MoreVertical, 
  UserPlus, CheckCircle, Clock, MapPin, CalendarDays, ClipboardCheck
} from 'lucide-react';
import api from '../../api/axios';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Title, Tooltip, Legend, Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Title, Tooltip, Legend, Filler
);

// Helper for Mock Sparklines
const sparklineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { enabled: false } },
  scales: { x: { display: false }, y: { display: false } },
  elements: { point: { radius: 0 }, line: { tension: 0.4, borderWidth: 2 } },
  layout: { padding: 0 }
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalEvents: 0, totalRegistered: 0, totalPresent: 0, totalCerts: 0 });
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const eventsRes = await api.get('/events');
      const certsRes = await api.get('/certificates');
      const events = eventsRes.data.data;
      const certs = certsRes.data.data;

      const totalRegistered = events.reduce((acc, curr) => acc + parseInt(curr.total_registered, 10), 0);
      const totalPresent = events.reduce((acc, curr) => acc + parseInt(curr.total_registered, 10) * 0.8, 0); // Mocking presence accurately

      setStats({
        totalEvents: events.length,
        totalRegistered,
        totalPresent,
        totalCerts: certs.length
      });
      setEventsData(events.slice(0, 5)); // First 5 for tables
    } catch (err) {
      console.error('Failed to fetch dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-blue"></div></div>;

  const attendanceRate = stats.totalRegistered === 0 ? 0 : Math.round((stats.totalPresent / stats.totalRegistered) * 100);

  return (
    <div className="space-y-6 pb-12 w-full">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">Welcome back, Administrator! <span className="text-2xl">👋</span></h1>
          <p className="text-text-muted mt-1 text-sm">Here's what's happening with your events today.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button onClick={() => navigate('/admin/events')} className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors text-sm">
            <Plus size={16} /> Create Event
          </button>
          <button onClick={() => navigate('/admin/certificates')} className="flex items-center gap-2 px-4 py-2 bg-[#F59E0B]/20 hover:bg-[#F59E0B]/30 text-[#F59E0B] border border-[#F59E0B]/30 font-medium rounded-lg transition-colors text-sm">
            <Award size={16} /> Generate Certificate
          </button>
          <button onClick={() => alert('Report exported successfully!')} className="flex items-center gap-2 px-4 py-2 bg-bg-secondary hover:bg-glass-bg border border-glass-border text-text-primary font-medium rounded-lg transition-colors text-sm">
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Active Events" 
          value={stats.totalEvents || 10} 
          trend="↑ 2 this week" 
          icon={<CalendarDays size={20} className="text-purple-400" />} 
          iconBg="bg-purple-400/20"
          chartColor="#A78BFA"
        />
        <KPICard 
          title="Total Registrations" 
          value={stats.totalRegistered || 23} 
          trend="↑ 15% from last month" 
          icon={<ClipboardCheck size={20} className="text-blue-400" />} 
          iconBg="bg-blue-400/20"
          chartColor="#60A5FA"
        />
        <KPICard 
          title="Attendance Rate" 
          value={`${attendanceRate || 78}%`} 
          trend="↑ 5% from last month" 
          icon={<Activity size={20} className="text-green-400" />} 
          iconBg="bg-green-400/20"
          chartColor="#34D399"
        />
        <KPICard 
          title="Certificates Issued" 
          value={stats.totalCerts || 10} 
          trend="↑ 8 this week" 
          icon={<Award size={20} className="text-[#F59E0B]" />} 
          iconBg="bg-[#F59E0B]/20"
          chartColor="#F59E0B"
        />
      </div>

      {/* Middle Row Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Registrations Overview - Bar Chart */}
        <div className="lg:col-span-5 xl:col-span-6 glass-panel rounded-xl p-5 relative overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-base">Registrations Overview</h3>
            <div className="flex items-center gap-4 text-xs font-medium">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500"></span> Registrations</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#F59E0B]"></span> Attendees</span>
                <select className="bg-bg-secondary border border-glass-border rounded-md px-2 py-1 ml-2 text-text-primary outline-none">
                    <option>This Week</option>
                </select>
            </div>
          </div>
          <div className="flex-1 w-full min-h-[200px]">
            <Bar 
              data={{
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [
                  { label: 'Registrations', data: [75, 60, 90, 110, 90, 80, 55], backgroundColor: '#8b5cf6', borderRadius: 4, barPercentage: 0.6, categoryPercentage: 0.4 },
                  { label: 'Attendees', data: [45, 45, 60, 70, 50, 45, 25], backgroundColor: '#f59e0b', borderRadius: 4, barPercentage: 0.6, categoryPercentage: 0.4 }
                ]
              }}
              options={{
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  y: { grid: { color: 'rgba(255,255,255,0.05)' }, border: { dash: [4, 4] }, ticks: { color: '#6B7280', font: { size: 10 } }, beginAtZero: true },
                  x: { grid: { display: false }, ticks: { color: '#6B7280', font: { size: 11 } } }
                }
              }}
            />
          </div>
        </div>

        {/* Registrations by Status - Donut */}
        <div className="lg:col-span-4 xl:col-span-3 glass-panel rounded-xl p-5 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-base">Registrations by Status</h3>
            <select className="bg-bg-secondary border border-glass-border rounded-md px-2 text-xs py-1 text-text-primary outline-none">
                <option>This Month</option>
            </select>
          </div>
          <div className="flex-1 flex items-center justify-center relative">
             <div className="w-40 h-40">
                <Doughnut 
                    data={{
                    labels: ['Approved', 'Pending', 'Paid', 'Cancelled'],
                    datasets: [{
                        data: [14, 5, 3, 1],
                        backgroundColor: ['#8b5cf6', '#f59e0b', '#10b981', '#ef4444'],
                        borderWidth: 0,
                        cutout: '75%'
                    }]
                    }}
                    options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }}
                />
             </div>
             {/* Center Label */}
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <span className="text-2xl font-bold">23</span>
                 <span className="text-xs text-text-muted">Total</span>
             </div>
          </div>
          <div className="mt-6 flex flex-col gap-2">
             <StatusLegend color="bg-purple-500" label="Approved" count={14} perc="60.9%" />
             <StatusLegend color="bg-[#f59e0b]" label="Pending" count={5} perc="21.7%" />
             <StatusLegend color="bg-green-500" label="Paid" count={3} perc="13%" />
             <StatusLegend color="bg-red-500" label="Cancelled" count={1} perc="4.4%" />
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="lg:col-span-3 xl:col-span-3 glass-panel rounded-xl p-5 flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-base">Upcoming Events</h3>
                <span className="text-xs text-text-muted cursor-pointer hover:text-text-primary">View All</span>
            </div>
            <div className="flex flex-col gap-4 flex-1">
                <UpcomingEventRow month="APR" day="25" title="Tech Fest 2025" loc="Main Auditorium" time="10:00 AM" />
                <UpcomingEventRow month="APR" day="28" title="Design Workshop" loc="Seminar Hall" time="02:00 PM" />
                <UpcomingEventRow month="MAY" day="02" title="AI Conference 2025" loc="Conference Room" time="09:00 AM" />
                <UpcomingEventRow month="MAY" day="07" title="Robotics Expo" loc="Exhibition Center" time="11:00 AM" />
            </div>
        </div>
      </div>

      {/* Bottom Row Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Recent Activity */}
          <div className="lg:col-span-4 glass-panel rounded-xl p-5">
             <div className="font-bold text-base mb-5">Recent Activity</div>
             <div className="flex flex-col gap-5 relative before:absolute before:inset-y-0 before:left-4 before:w-[2px] before:bg-glass-border before:-z-10">
                 <ActivityItem icon={<UserPlus size={14} className="text-white"/>} bg="bg-purple-500" title="New registration for Tech Fest 25" sub="John Doe registered" time="2m ago" />
                 <ActivityItem icon={<Award size={14} className="text-white"/>} bg="bg-[#f59e0b]" title="Certificate generated" sub="Workshop 2025 certificate generated" time="15m ago" />
                 <ActivityItem icon={<CalendarDays size={14} className="text-white"/>} bg="bg-green-500" title="New event created" sub="AI Conference 2025 has been created" time="1h ago" />
                 <ActivityItem icon={<CheckCircle size={14} className="text-white"/>} bg="bg-blue-500" title="Attendance updated" sub="Tech Fest 2025 attendance updated" time="2h ago" />
                 <ActivityItem icon={<UserPlus size={14} className="text-white"/>} bg="bg-red-500" title="New user registered" sub="Sarah Wilson joined as attendee" time="3h ago" />
             </div>
          </div>

          {/* Top Performing Events */}
          <div className="lg:col-span-3 glass-panel rounded-xl p-5">
             <div className="flex justify-between items-center mb-5">
                 <div className="font-bold text-base">Top Performing Events</div>
                 <span className="text-xs text-text-muted cursor-pointer hover:text-text-primary px-2 py-1 bg-bg-secondary rounded">View All</span>
             </div>
             <div className="flex flex-col gap-5 mt-2">
                 <PerfItem title="Tech Fest 2025" sub="120 Registrations" perc={85} color="bg-purple-500" />
                 <PerfItem title="AI Conference 2025" sub="95 Registrations" perc={75} color="bg-blue-500" />
                 <PerfItem title="Robotics Expo" sub="80 Registrations" perc={65} color="bg-green-500" />
                 <PerfItem title="Design Workshop" sub="60 Registrations" perc={50} color="bg-[#f59e0b]" />
             </div>
          </div>

          {/* Event Summary Table */}
          <div className="lg:col-span-5 glass-panel rounded-xl p-5">
             <div className="flex justify-between items-center mb-5">
                 <div className="font-bold text-base">Event Summary Table</div>
                 <span className="text-xs text-text-muted cursor-pointer hover:text-text-primary px-2 py-1 bg-bg-secondary rounded">View All</span>
             </div>
             <div className="overflow-x-auto">
                 <table className="w-full text-left text-sm whitespace-nowrap">
                     <thead>
                         <tr className="text-text-muted border-b border-glass-border">
                             <th className="pb-3 font-medium">Event Name</th>
                             <th className="pb-3 font-medium">Date</th>
                             <th className="pb-3 font-medium">Registrations</th>
                             <th className="pb-3 font-medium">Attendance</th>
                             <th className="pb-3 font-medium">Status</th>
                         </tr>
                     </thead>
                     <tbody className="divide-y divide-glass-border">
                         <tr>
                             <td className="py-4 text-text-primary">Tech Fest 2025</td>
                             <td className="py-4 text-text-muted">Apr 25, 2025</td>
                             <td className="py-4 text-text-primary">120</td>
                             <td className="py-4 text-text-primary">102 (85%)</td>
                             <td className="py-4"><span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded-lg">Active</span></td>
                         </tr>
                         <tr>
                             <td className="py-4 text-text-primary">Design Workshop</td>
                             <td className="py-4 text-text-muted">Apr 28, 2025</td>
                             <td className="py-4 text-text-primary">75</td>
                             <td className="py-4 text-text-primary">55 (73%)</td>
                             <td className="py-4"><span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-lg">Upcoming</span></td>
                         </tr>
                         <tr>
                             <td className="py-4 text-text-primary">AI Conference 2025</td>
                             <td className="py-4 text-text-muted">May 02, 2025</td>
                             <td className="py-4 text-text-primary">95</td>
                             <td className="py-4 text-text-primary">-</td>
                             <td className="py-4"><span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-lg">Upcoming</span></td>
                         </tr>
                         <tr>
                             <td className="py-4 text-text-primary">Robotics Expo</td>
                             <td className="py-4 text-text-muted">May 07, 2025</td>
                             <td className="py-4 text-text-primary">80</td>
                             <td className="py-4 text-text-primary">-</td>
                             <td className="py-4"><span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-lg">Upcoming</span></td>
                         </tr>
                     </tbody>
                 </table>
             </div>
          </div>
      </div>
    </div>
  );
};

// Sub-components
const KPICard = ({ title, value, trend, icon, iconBg, chartColor }) => {
    // Generate some random points for the sparkline that trend upwards
    const mockData = [65, 59, 80, 81, 56, 85, 110];
    return (
      <div className="glass-panel rounded-xl p-5 flex flex-col justify-between h-[140px] relative overflow-hidden group">
         <div className="flex justify-between items-start z-10">
             <div className={`p-2.5 rounded-lg ${iconBg}`}>
                {icon}
             </div>
             <MoreVertical size={18} className="text-text-muted cursor-pointer hover:text-text-primary" />
         </div>
         <div className="z-10 mt-2">
            <h3 className="text-text-muted text-sm mb-1">{title}</h3>
            <div className="flex items-end gap-3">
               <span className="text-3xl font-bold font-sans text-text-primary">{value}</span>
            </div>
            <p className="text-green-400 text-xs mt-1 font-medium">{trend}</p>
         </div>
         {/* Background Sparkline graph overlapping bottom */}
         <div className="absolute bottom-[-10px] left-0 right-0 h-[60px] opacity-40 group-hover:opacity-100 transition-opacity duration-500">
             <Line
                data={{
                    labels: ['1','2','3','4','5','6','7'],
                    datasets: [{
                        data: mockData,
                        borderColor: chartColor,
                        fill: true,
                        backgroundColor: (context) => {
                            const ctx = context.chart.ctx;
                            const gradient = ctx.createLinearGradient(0, 0, 0, 60);
                            gradient.addColorStop(0, `${chartColor}40`); // 25% opacity
                            gradient.addColorStop(1, `${chartColor}00`);
                            return gradient;
                        },
                        tension: 0.4
                    }]
                }}
                options={sparklineOptions}
             />
         </div>
      </div>
    );
}

const StatusLegend = ({ color, label, count, perc }) => (
    <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${color}`}></span>
            <span className="text-text-muted">{label}</span>
        </div>
        <div className="flex items-center gap-3">
            <span className="font-medium">{count}</span>
            <span className="text-text-muted text-xs w-10 text-right">({perc})</span>
        </div>
    </div>
);

const UpcomingEventRow = ({ month, day, title, loc, time }) => (
    <div className="flex items-center gap-4 group cursor-pointer">
        <div className="flex flex-col items-center justify-center p-2 border border-glass-border/30 bg-bg-secondary rounded-lg min-w-[50px] group-hover:bg-glass-border/50 transition-colors">
            <span className="text-xs text-purple-400 font-bold">{month}</span>
            <span className="text-lg font-bold text-text-primary leading-none mt-0.5">{day}</span>
        </div>
        <div className="flex-1 flex flex-col">
            <span className="font-bold text-sm text-text-primary">{title}</span>
            <span className="text-xs text-text-muted flex items-center gap-1 mt-0.5"><MapPin size={10} /> {loc}</span>
        </div>
        <div className="text-xs text-text-muted flex items-center gap-1">
            <Clock size={12} className="text-purple-400" /> {time}
        </div>
    </div>
);

const ActivityItem = ({ icon, bg, title, sub, time }) => (
    <div className="flex items-start gap-4">
        <div className={`p-1.5 rounded-full z-10 ${bg} border-[3px] border-bg-primary shadow-sm`}>
            {icon}
        </div>
        <div className="flex-1 flex flex-col pt-0.5">
            <span className="text-sm font-medium text-text-primary leading-tight">{title}</span>
            <span className="text-xs text-text-muted mt-0.5">{sub}</span>
        </div>
        <span className="text-xs text-text-muted pt-0.5 whitespace-nowrap">{time}</span>
    </div>
);

const PerfItem = ({ title, sub, perc, color }) => (
    <div>
        <div className="flex justify-between items-end mb-1.5">
            <div className="flex flex-col">
                <span className="text-sm font-medium">{title}</span>
                <span className="text-xs text-text-muted mt-0.5">{sub}</span>
            </div>
            <span className="text-sm font-bold">{perc}%</span>
        </div>
        <div className="w-full bg-bg-secondary rounded-full h-1.5 border border-glass-border/30">
            <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${perc}%` }}></div>
        </div>
    </div>
);

export default Dashboard;
