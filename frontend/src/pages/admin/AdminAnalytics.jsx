import React from 'react';
import { Users, CalendarDays, ClipboardCheck, Banknote } from 'lucide-react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, 
  ArcElement, Tooltip, Filler, Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Filler, Legend);

const AdminAnalytics = () => {
  return (
    <div className="space-y-6 pb-12 w-full animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Analytics Overview</h1>
          <p className="text-sm text-text-muted mt-1">Detailed insights and analytics about your events.</p>
        </div>
        <select className="bg-bg-secondary border border-glass-border rounded-lg px-4 py-2 text-sm text-text-primary outline-none hover:bg-glass-bg transition-colors cursor-pointer">
          <option>This Month</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <KPICard title="Total Events" value="25" trend="+12%" trendUp icon={<CalendarDays size={20} className="text-blue-400" />} iconBg="bg-blue-400/20" />
        <KPICard title="Total Registrations" value="1,250" trend="+18%" trendUp icon={<ClipboardCheck size={20} className="text-purple-400" />} iconBg="bg-purple-400/20" />
        <KPICard title="Total Attendees" value="980" trend="-15%" trendUp={false} icon={<Users size={20} className="text-red-400" />} iconBg="bg-red-400/20" />
        <KPICard title="Revenue Generated" value="$12,450" trend="+22%" trendUp icon={<Banknote size={20} className="text-green-400" />} iconBg="bg-green-400/20" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-8 glass-panel rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-base">Registrations Over Time</h3>
            <select className="bg-bg-secondary border border-glass-border py-1 px-2 text-xs rounded-md text-text-primary outline-none">
              <option>This Month</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <Line 
              data={{
                labels: ['1 May', '5 May', '10 May', '15 May', '20 May', '25 May', '30 May'],
                datasets: [{
                  data: [25, 45, 30, 60, 55, 68, 65, 30, 52, 40, 28, 55, 65, 45, 55, 48, 60, 60, 45, 58, 80, 78, 85, 82, 60, 45, 60, 62, 85],
                  borderColor: '#A855F7',
                  borderWidth: 2,
                  tension: 0.4,
                  pointRadius: 3,
                  pointBackgroundColor: '#A855F7'
                }]
              }}
              options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
                 scales: { y: { grid: { color: 'rgba(255,255,255,0.05)' } }, x: { grid: { display: false } } }
              }}
            />
          </div>
        </div>

        <div className="xl:col-span-4 glass-panel rounded-xl p-6 flex flex-col h-full overflow-hidden">
          <h3 className="font-bold text-base mb-6">Registrations by Source</h3>
          <div className="flex flex-row items-center justify-between gap-4 flex-1">
             <div className="relative w-36 h-36">
               <Doughnut 
                 data={{
                   labels: ['Website', 'Social Media', 'Email', 'Referral', 'Other'],
                   datasets: [{
                     data: [40, 25, 15, 10, 5],
                     backgroundColor: ['#A855F7', '#3B82F6', '#10B981', '#F59E0B', '#EC4899'],
                     borderWidth: 0, cutout: '75%'
                   }]
                 }}
                 options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }}
               />
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <span className="text-xl font-bold">1,250</span>
                 <span className="text-[10px] text-text-muted">Total</span>
               </div>
             </div>
             
             <div className="flex flex-col gap-2.5 flex-1 min-w-0 pr-2">
                <LegendItem color="bg-purple-500" label="Website" perc="40%" />
                <LegendItem color="bg-blue-500" label="Social Media" perc="25%" />
                <LegendItem color="bg-green-500" label="Email" perc="15%" />
                <LegendItem color="bg-[#f59e0b]" label="Referral" perc="10%" />
                <LegendItem color="bg-pink-500" label="Other" perc="5%" />
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="xl:col-span-7 glass-panel rounded-xl p-6">
             <h3 className="font-bold text-base mb-6">Attendance Rate</h3>
             <div className="h-56 w-full">
                <Line 
                  data={{
                    labels: ['1 May', '5 May', '10 May', '15 May', '20 May', '25 May', '30 May'],
                    datasets: [{
                      data: [25, 48, 35, 55, 60, 80, 55, 68, 55, 62, 70, 78, 58, 65, 75, 50, 78, 65, 95, 98, 92, 65, 85, 88, 100],
                      borderColor: '#10B981',
                      borderWidth: 2,
                      tension: 0.4,
                      pointRadius: 3,
                      fill: true,
                      backgroundColor: 'rgba(16, 185, 129, 0.1)'
                    }]
                  }}
                  options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
                     scales: { 
                         y: { grid: { color: 'rgba(255,255,255,0.05)' }, max: 100, min: 0, ticks: { callback: (val) => val + '%' } }, 
                         x: { grid: { display: false } } 
                     }
                  }}
                />
             </div>
          </div>
          
          <div className="xl:col-span-5 glass-panel rounded-xl p-6">
             <h3 className="font-bold text-base mb-6">Top Performing Categories</h3>
             <div className="flex flex-col gap-6 mt-2">
                 <PerfItem title="Tech Events" perc={85} color="bg-purple-500" />
                 <PerfItem title="Workshops" perc={72} color="bg-blue-500" />
                 <PerfItem title="Conferences" perc={60} color="bg-teal-500" />
                 <PerfItem title="Exhibitions" perc={50} color="bg-[#f59e0b]" />
             </div>
          </div>
      </div>
    </div>
  );
};

// Sub Components
const KPICard = ({ title, value, trend, trendUp, icon, iconBg }) => (
    <div className="glass-panel p-5 rounded-xl flex items-center justify-between">
       <div className="flex items-center gap-4">
           <div className={`p-3 rounded-xl ${iconBg}`}>
               {icon}
           </div>
           <div className="flex flex-col">
               <span className="text-xs text-text-muted font-medium mb-1">{title}</span>
               <span className="text-2xl font-bold">{value}</span>
           </div>
       </div>
       <div className={`text-xs font-bold px-2 py-1 rounded border ${trendUp ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
           {trend}
       </div>
    </div>
);

const LegendItem = ({ color, label, perc }) => (
    <div className="flex items-center justify-between text-xs w-full min-w-0">
        <div className="flex items-center gap-2 overflow-hidden">
            <span className={`w-2 h-2 rounded-full shrink-0 ${color}`}></span>
            <span className="text-text-muted truncate">{label}</span>
        </div>
        <span className="font-bold ml-2 shrink-0">{perc}</span>
    </div>
);

const PerfItem = ({ title, perc, color }) => (
    <div>
        <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">{title}</span>
            <span className="text-sm font-bold">{perc}%</span>
        </div>
        <div className="w-full bg-bg-secondary rounded-full h-2 border border-glass-border/30">
            <div className={`h-2 rounded-full ${color}`} style={{ width: `${perc}%` }}></div>
        </div>
    </div>
);

export default AdminAnalytics;
