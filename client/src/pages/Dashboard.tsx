import React from 'react';
import Layout from '../components/Layout';
import StatsCard from '../components/StatsCard';
import InvoiceTable from '../components/InvoiceTable';
import { Clock, CheckCircle, Search, Plus, Filter, Loader2, IndianRupee, FileText, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { useQuery } from '@tanstack/react-query';

const Dashboard: React.FC = () => {
  const api = useApi();

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const res = await api.get('/firms/stats');
      return res.data;
    },
    retry: false
  });

  const { data: recentInvoices, isLoading: invoicesLoading } = useQuery({
    queryKey: ['recent-invoices'],
    queryFn: async () => {
      try {
        const firmRes = await api.get('/firms/me');
        const res = await api.get(`/invoices/${firmRes.data.id}`);
        return res.data.slice(0, 5); 
      } catch (e) {
        return [];
      }
    },
    retry: false
  });

  const isLoading = statsLoading || invoicesLoading;

  return (
    <Layout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-black text-[#1A2B4C]">Dashboard</h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Overview of your collections</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Search invoices..." className="bg-slate-50 border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm outline-none focus:border-[#48C78E] transition-all w-64" />
          </div>
          <Link to="/import" className="bg-[#1A2B4C] text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-[#1A2B4C]/90 transition-all shadow-lg shadow-[#1A2B4C]/20">
            <Plus size={18} /> Import Invoices
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <Loader2 className="animate-spin mb-4" size={40} />
          <p className="font-bold">Loading dashboard data...</p>
        </div>
      ) : !stats ? (
        <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-20 text-center space-y-6">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
             <AlertCircle size={40} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#1A2B4C]">Welcome to FollowUp!</h3>
            <p className="text-sm text-slate-500 mt-2">First, let's set up your firm profile to start automating your billing follow-ups.</p>
          </div>
          <Link to="/settings" className="inline-flex bg-[#48C78E] text-white px-8 py-3 rounded-xl font-bold gap-2 shadow-lg shadow-[#48C78E]/20">
            Setup Firm Profile
          </Link>
        </div>
      ) : (
        <div className="space-y-10">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard title="Outstanding" value={`₹${(stats.pending_amount || 0).toLocaleString()}`} change={12} color="navy" icon={FileText} />
            <StatsCard title="Overdue" value={`₹${(stats.overdue_amount || 0).toLocaleString()}`} change={-5} color="red" icon={Clock} />
            <StatsCard title="Collected" value={`₹${(stats.paid_amount || 0).toLocaleString()}`} change={18} color="emerald" icon={CheckCircle} />
            <StatsCard title="Overdue Count" value={stats.overdue_count.toString()} change={2} color="slate" icon={IndianRupee} />
          </div>

          {/* Table Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-[#1A2B4C]">Recent Activity</h3>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-[#4A5568] bg-white hover:bg-slate-50 transition-all">
                  <Filter size={14} /> Filter
                </button>
                <Link to="/invoices" className="text-xs font-bold text-[#48C78E] hover:underline">View all invoices</Link>
              </div>
            </div>
            
            {recentInvoices && recentInvoices.length > 0 ? (
              <InvoiceTable invoices={recentInvoices.map((inv: any) => ({
                id: inv.invoice_number || `INV-${inv.id}`,
                client: inv.client_name,
                amount: `₹${Number(inv.amount).toLocaleString()}`,
                dueDate: new Date(inv.due_date).toLocaleDateString(),
                status: inv.status.charAt(0).toUpperCase() + inv.status.slice(1),
                lastFollowUp: inv.last_reminder_date ? `Sent on ${new Date(inv.last_reminder_date).toLocaleDateString()}` : '-'
              }))} />
            ) : (
              <div className="bg-white rounded-2xl border-2 border-dashed border-slate-100 py-12 text-center">
                <p className="text-slate-400 font-medium italic">No invoices found. Get started by importing some!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;
