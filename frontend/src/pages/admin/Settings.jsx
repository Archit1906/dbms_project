import React, { useState } from 'react';
import { Settings as SettingsIcon, Mail, Bell, Shield, Database, LayoutTemplate } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('General');

  const tabs = [
    { name: 'General', icon: SettingsIcon },
    { name: 'Email Settings', icon: Mail },
    { name: 'Notifications', icon: Bell },
    { name: 'Security', icon: Shield },
    { name: 'Backup', icon: Database },
    { name: 'Integrations', icon: LayoutTemplate },
  ];

  return (
    <div className="space-y-6 pb-12 w-full animate-fade-in flex flex-col h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-sm text-text-muted mt-1">Manage your portal settings and preferences.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 flex-1">
          {/* Layout Sidebar */}
          <div className="w-full md:w-64 glass-panel rounded-xl p-4 flex flex-col gap-1 shrink-0">
              {tabs.map(tab => (
                 <button 
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name)}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border-l-2
                      ${activeTab === tab.name 
                          ? 'bg-glass-bg border-purple-500 text-purple-400' 
                          : 'border-transparent text-text-muted hover:text-text-primary hover:bg-bg-secondary'}`}
                 >
                    <tab.icon size={18} /> {tab.name}
                 </button>
              ))}
          </div>

          {/* Settings Content Area */}
          <div className="flex-1 glass-panel rounded-xl p-6 lg:p-8">
             {activeTab === 'General' && (
                <div className="max-w-2xl">
                    <h2 className="text-lg font-bold mb-6 pb-4 border-b border-glass-border">General Settings</h2>
                    
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-text-muted">Portal Name</label>
                                <input type="text" defaultValue="ColvEvents" className="bg-bg-secondary border border-glass-border rounded-lg px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-purple-500 transition-colors w-full" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-text-muted">Portal Email</label>
                                <input type="email" defaultValue="admin@colvevents.com" className="bg-bg-secondary border border-glass-border rounded-lg px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-purple-500 transition-colors w-full" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-text-muted">Time Zone</label>
                            <select className="bg-bg-secondary border border-glass-border rounded-lg px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-purple-500 transition-colors w-full">
                                <option>(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
                                <option>(GMT) Greenwich Mean Time</option>
                                <option>(GMT-05:00) Eastern Time</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-text-muted">Date Format</label>
                                <select className="bg-bg-secondary border border-glass-border rounded-lg px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-purple-500 transition-colors w-full">
                                    <option>DD/MM/YYYY</option>
                                    <option>MM/DD/YYYY</option>
                                    <option>YYYY-MM-DD</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-text-muted">Currency</label>
                                <select className="bg-bg-secondary border border-glass-border rounded-lg px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-purple-500 transition-colors w-full">
                                    <option>USD ($)</option>
                                    <option>EUR (€)</option>
                                    <option>INR (₹)</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="pt-6">
                            <button className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors text-sm">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
             )}
             {activeTab !== 'General' && (
                 <div className="flex flex-col items-center justify-center h-64 text-text-muted">
                    <p>Settings panel for "{activeTab}" represents future functionality.</p>
                 </div>
             )}
          </div>
      </div>
    </div>
  );
};

export default Settings;
