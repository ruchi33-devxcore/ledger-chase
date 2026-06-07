import React from 'react';
import Layout from '../components/Layout';
import InvoiceTable from '../components/InvoiceTable';
import { Search, Plus, Filter, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { useQuery } from '@tanstack/react-query';

const InvoiceList: React.FC = () => {
  const api = useApi();
  
  // For MVP, we use firm_id = 1 (or we should fetch the actual firm)
  // Let's assume firm_id is 1 for now, but ideally we get it from the user's profile
  const { data: invoices, isLoading, error } = useQuery({
    queryKey: ['invoices'],
    queryFn: async () => {
      // First get current firm
      const firmRes = await api.get('/firms/me');
      const firm = firmRes.data;
      if (!firm) return [];
      
      const res = await api.get(`/invoices/${firm.id}`);
      return res.data;
    }
  });

  return (
    <Layout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-black text-[#1A2B4C]">All Invoices</h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Manage and track your collections</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Search invoices..." className="bg-slate-50 border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm outline-none focus:border-[#48C78E] transition-all w-64" />
          </div>
          <Link to="/import" className="bg-[#1A2B4C] text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-[#1A2B4C]/90 transition-all shadow-lg shadow-[#1A2B4C]/20">
            <Plus size={18} /> New Invoice
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-[#4A5568] bg-white hover:bg-slate-50 transition-all">
              <Filter size={14} /> Filter
            </button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Loader2 className="animate-spin mb-4" size={40} />
            <p className="font-bold">Loading your invoices...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-100 rounded-2xl p-8 text-center">
            <p className="text-red-600 font-bold">Failed to load invoices. Please try again.</p>
          </div>
        ) : invoices && invoices.length > 0 ? (
          <InvoiceTable invoices={invoices.map((inv: any) => ({
            id: inv.invoice_number || `INV-${inv.id}`,
            client: inv.client_name,
            amount: `₹${Number(inv.amount).toLocaleString()}`,
            dueDate: new Date(inv.due_date).toLocaleDateString(),
            status: inv.status.charAt(0).toUpperCase() + inv.status.slice(1),
            lastFollowUp: inv.last_reminder_date ? `Sent on ${new Date(inv.last_reminder_date).toLocaleDateString()}` : '-'
          }))} />
        ) : (
          <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-20 text-center space-y-6">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
               <Plus size={40} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#1A2B4C]">No Invoices Found</h3>
              <p className="text-sm text-slate-500 mt-2">Start by importing your invoices from CSV or adding them manually.</p>
            </div>
            <Link to="/import" className="inline-flex bg-[#48C78E] text-white px-8 py-3 rounded-xl font-bold gap-2 shadow-lg shadow-[#48C78E]/20">
              Import Invoices
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default InvoiceList;
