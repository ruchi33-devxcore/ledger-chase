import React from 'react';
import StatsCard from './StatsCard';
import InvoiceTable from './InvoiceTable';
import { LayoutDashboard, FileText, Clock, CheckCircle, Settings, LogOut, Plus, Search, Filter } from 'lucide-react';

const Dashboard = () => {
  const invoices = [
    { id: 'INV-2401', client: 'Acme Corp', amount: '$1,200.00', dueDate: 'Nov 25, 2023', status: 'Overdue', lastFollowUp: 'Urgent reminder sent' },
    { id: 'INV-2402', client: 'Global Industries', amount: '$4,500.00', dueDate: 'Nov 28, 2023', status: 'Sent', lastFollowUp: 'Friendly reminder sent' },
    { id: 'INV-2403', client: 'TechStart Inc', amount: '$850.00', dueDate: 'Dec 05, 2023', status: 'Pending', lastFollowUp: '-' },
    { id: 'INV-2404', client: 'Hilltop Partners', amount: '$2,100.00', dueDate: 'Nov 15, 2023', status: 'Paid', lastFollowUp: 'Paid on Nov 20' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1A2B4C] text-white flex flex-col">
        <div className="p-8">
          <div className="flex items-center gap-2 mb-8">
            <span className="bg-[#48C78E] p-1.5 rounded-lg text-white">
              <LayoutDashboard size={20} />
            </span>
            <span className="text-xl font-black tracking-tight">FollowUp</span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-[#48C78E]/10 border-l-4 border-[#48C78E] text-[#48C78E] font-bold transition-all">
            <LayoutDashboard size={18} /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-white/5 hover:text-white font-medium transition-all">
            <FileText size={18} /> Invoices
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-white/5 hover:text-white font-medium transition-all">
            <Clock size={18} /> Schedules
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-white/5 hover:text-white font-medium transition-all">
            <Settings size={18} /> Settings
          </a>
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white cursor-pointer transition-all">
            <LogOut size={18} /> <span>Sign Out</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        <header className="bg-white border-b border-slate-200 h-20 flex items-center justify-between px-10 sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-black text-[#1A2B4C]">Dashboard</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Acme Accounting Firm</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="Search invoices..." className="bg-slate-50 border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm outline-none focus:border-[#48C78E] transition-all w-64" />
            </div>
            <button className="bg-[#1A2B4C] text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-[#1A2B4C]/90 transition-all shadow-lg shadow-[#1A2B4C]/20">
              <Plus size={18} /> Create Invoice
            </button>
          </div>
        </header>

        <main className="p-10 space-y-10">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard title="Outstanding" value="$12,450" change={+12} color="navy" icon={FileText} />
            <StatsCard title="Overdue" value="$3,200" change={-5} color="red" icon={Clock} />
            <StatsCard title="Recovered" value="$8,900" change={+18} color="emerald" icon={CheckCircle} />
            <StatsCard title="Daily Avg." value="4.8" change={+2} color="slate" icon={LayoutDashboard} />
          </div>

          {/* Table Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-[#1A2B4C]">Recent Activity</h3>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-[#4A5568] bg-white hover:bg-slate-50 transition-all">
                  <Filter size={14} /> Filter
                </button>
                <button className="text-xs font-bold text-[#48C78E] hover:underline">View all invoices</button>
              </div>
            </div>
            <InvoiceTable invoices={invoices} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
