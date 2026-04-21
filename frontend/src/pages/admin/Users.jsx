import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2 } from 'lucide-react';

const Users = () => {
  const [users] = useState([
    { id: 1, name: 'Administrator', email: 'admin@colvevents.com', role: 'Super Admin', lastLogin: 'Apr 25, 2025', status: 'Active' },
    { id: 2, name: 'John Smith', email: 'john@colvevents.com', role: 'Event Manager', lastLogin: 'Apr 25, 2025', status: 'Active' },
    { id: 3, name: 'Emily Johnson', email: 'emily@colvevents.com', role: 'Organizer', lastLogin: 'Apr 24, 2025', status: 'Offline' },
    { id: 4, name: 'Michael Brown', email: 'michael@colvevents.com', role: 'Support', lastLogin: 'Apr 23, 2025', status: 'Active' },
    { id: 5, name: 'Sarah Wilson', email: 'sarah@colvevents.com', role: 'Editor', lastLogin: 'Apr 22, 2025', status: 'Offline' },
  ]);

  return (
    <div className="space-y-6 pb-12 w-full animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Users Management</h1>
          <p className="text-sm text-text-muted mt-1">Manage admin users, organizers and their permissions.</p>
        </div>
        <button 
          onClick={() => console.log('Add User clicked')}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors text-sm"
        >
          <Plus size={16} /> Add User
        </button>
      </div>

      <div className="glass-panel rounded-xl p-5 flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
            <input 
              type="text" 
              placeholder="Search users..." 
              className="pl-9 pr-4 py-2 bg-bg-secondary border border-glass-border rounded-lg text-sm focus:outline-none focus:border-purple-500 transition-colors text-text-primary w-full sm:w-64"
            />
          </div>
          <div className="flex gap-3">
             <select className="bg-bg-secondary border border-glass-border px-3 py-2 text-sm rounded-lg text-text-primary outline-none">
                 <option>All Roles</option>
             </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="text-text-muted border-b border-glass-border bg-bg-secondary/50">
                <th className="font-medium p-4 rounded-tl-lg">User Name</th>
                <th className="font-medium p-4">Email</th>
                <th className="font-medium p-4">Role</th>
                <th className="font-medium p-4">Last Login</th>
                <th className="font-medium p-4">Status</th>
                <th className="font-medium p-4 rounded-tr-lg">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-glass-bg transition-colors">
                  <td className="p-4">
                     <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-bg-secondary overflow-hidden shrink-0 border border-glass-border">
                            <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${u.name}&backgroundColor=1F2937&textColor=F9FAFB`} alt="Avatar" className="w-full h-full object-cover" />
                         </div>
                         <span className="font-medium text-text-primary">{u.name}</span>
                     </div>
                  </td>
                  <td className="p-4 text-text-muted">{u.email}</td>
                  <td className="p-4 text-text-primary font-medium">{u.role}</td>
                  <td className="p-4 text-text-muted">{u.lastLogin}</td>
                  <td className="p-4">
                    <span className={`px-0 py-1 text-xs font-medium flex items-center gap-2
                      ${u.status === 'Active' ? 'text-green-400' : 'text-red-400'}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${u.status === 'Active' ? 'bg-green-400' : 'bg-red-400'}`}></span>
                      {u.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                       <button className="text-text-muted hover:text-purple-400 transition-colors" title="Edit"><Edit2 size={16} /></button>
                       <button className="text-text-muted hover:text-danger transition-colors" title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
