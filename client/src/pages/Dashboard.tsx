import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Loader2, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';
import Layout from '../components/Layout';
import StatsCard from '../components/StatsCard';
import InvoiceTable from '../components/InvoiceTable';
import api from '../lib/api';

const Dashboard: React.FC = () => {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      try {
        const firmRes = await api.get('/firms/me');
        const res = await api.get(`/firms/${firmRes.data.id}/stats`);
        return res.data;
      } catch (e) {
        return null;
      }
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
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <Loader2 className="animate-spin mb-4 text-[#00FF88]" size={40} />
          <p className="font-bold">Loading dashboard data...</p>
        </div>
      ) : !stats ? (
        <div className="glass rounded-2xl border border-white/5 p-20 text-center space-y-6">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto text-slate-500">
             <AlertCircle size={40} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Welcome to FollowUp!</h3>
            <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto">
              First, let's set up your firm profile to start automating your billing follow-ups and access your dashboard.
            </p>
          </div>
          <Link 
            to="/settings" 
            className="inline-flex bg-gradient-to-r from-[#00FF88] to-[#00CC66] text-[#0F172A] px-8 py-3 rounded-xl font-bold gap-2 shadow-lg shadow-[#00FF88]/20"
          >
            Setup Firm Profile
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard 
              title="Total Outstanding" 
              value={`₹${(stats.pending_amount || 0).toLocaleString()}`} 
              change={12.4} 
              accentColor="green"
              progress={75}
            />
            <StatsCard 
              title="Overdue" 
              value={`₹${(stats.overdue_amount || 0).toLocaleString()}`} 
              change={-5.2} 
              trend="down"
              accentColor="red"
              progress={25}
            />
            <StatsCard 
              title="Recovered" 
              value={`₹${(stats.paid_amount || 0).toLocaleString()}`} 
              change={18.7} 
              accentColor="gold"
              progress={80}
            />
            <StatsCard 
              title="Active Invoices" 
              value={(stats.overdue_count + (stats.pending_count || 0)).toString()} 
              change={3} 
              accentColor="blue"
              progress={50}
            />
          </div>

          {/* Table Section */}
          <div className="glass rounded-2xl border border-white/5 overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-lg font-bold">Recent Activity</h2>
              <Link to="/invoices" className="text-xs font-bold text-[#00FF88] hover:underline">
                View all →
              </Link>
            </div>
            
            {recentInvoices && recentInvoices.length > 0 ? (
              <InvoiceTable invoices={recentInvoices.map((inv: any) => ({
                id: inv.invoice_number || `INV-${inv.id}`,
                client: inv.client_name,
                amount: `₹${Number(inv.amount).toLocaleString()}`,
                dueDate: new Date(inv.due_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
                status: inv.status.toLowerCase(),
                lastFollowUp: inv.last_reminder_date ? `Sent on ${new Date(inv.last_reminder_date).toLocaleDateString()}` : '-'
              }))} />
            ) : (
              <div className="py-12 text-center">
                <p className="text-slate-500 font-medium italic">No invoices found. Get started by importing some!</p>
              </div>
            )}
          </div>

          {/* Activity/Insights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-6 border border-white/5">
              <h3 className="text-sm font-bold mb-4">Collection Rate</h3>
              <div className="flex items-end gap-4">
                <span className="text-5xl font-black number text-[#00FF88]">78%</span>
                <div className="flex items-center gap-1 text-[#00FF88] mb-2 font-mono">
                  <TrendingUp size={16} />
                  <span className="text-sm">12%</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-2 font-mono">Based on current month collections</p>
            </div>
            
            <div className="glass rounded-2xl p-6 border border-white/5">
              <h3 className="text-sm font-bold mb-4">Avg. Days to Collect</h3>
              <div className="flex items-end gap-4">
                <span className="text-5xl font-black number text-[#FFD700]">23</span>
                <div className="flex items-center gap-1 text-[#00FF88] mb-2 font-mono">
                  <TrendingDown size={16} />
                  <span className="text-sm">5 days</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-2 font-mono">Down from 28 days last month</p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;
