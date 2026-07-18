import React from 'react';
import StatusBadge from './StatusBadge';

interface Invoice {
  id: string;
  client: string;
  amount: string | number;
  dueDate: string;
  status: string;
  lastFollowUp?: string;
}

interface InvoiceTableProps {
  invoices: Invoice[];
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({ invoices }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/5">
            <th className="text-left py-4 px-6 text-[10px] font-mono text-slate-500 uppercase tracking-widest">Invoice</th>
            <th className="text-left py-4 px-6 text-[10px] font-mono text-slate-500 uppercase tracking-widest">Client</th>
            <th className="text-left py-4 px-6 text-[10px] font-mono text-slate-500 uppercase tracking-widest">Amount</th>
            <th className="text-left py-4 px-6 text-[10px] font-mono text-slate-500 uppercase tracking-widest">Due</th>
            <th className="text-left py-4 px-6 text-[10px] font-mono text-slate-500 uppercase tracking-widest">Status</th>
            <th className="text-left py-4 px-6 text-[10px] font-mono text-slate-500 uppercase tracking-widest">Follow-up</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr 
              key={invoice.id} 
              className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group cursor-pointer"
            >
              <td className="py-4 px-6 text-sm font-mono font-bold text-white group-hover:text-[#00FF88] transition-colors">
                {invoice.id}
              </td>
              <td className="py-4 px-6 text-sm text-slate-300">
                {invoice.client}
              </td>
              <td className="py-4 px-6 text-sm font-mono font-bold text-white">
                {invoice.amount}
              </td>
              <td className="py-4 px-6 text-sm font-mono text-slate-400">
                {invoice.dueDate}
              </td>
              <td className="py-4 px-6">
                <StatusBadge status={invoice.status} />
              </td>
              <td className="py-4 px-6 text-sm text-slate-500 font-mono italic">
                {invoice.lastFollowUp || '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;
