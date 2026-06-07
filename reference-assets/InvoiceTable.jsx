import React from 'react';
import StatusBadge from './StatusBadge';

const InvoiceTable = ({ invoices }) => {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-100 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="py-4 px-6 text-[10px] font-black text-[#1A2B4C] uppercase tracking-widest">Invoice #</th>
              <th className="py-4 px-6 text-[10px] font-black text-[#1A2B4C] uppercase tracking-widest">Client</th>
              <th className="py-4 px-6 text-[10px] font-black text-[#1A2B4C] uppercase tracking-widest">Amount</th>
              <th className="py-4 px-6 text-[10px] font-black text-[#1A2B4C] uppercase tracking-widest">Due Date</th>
              <th className="py-4 px-6 text-[10px] font-black text-[#1A2B4C] uppercase tracking-widest">Status</th>
              <th className="py-4 px-6 text-[10px] font-black text-[#1A2B4C] uppercase tracking-widest">Next Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="py-4 px-6 text-sm font-bold text-[#1A2B4C]">{invoice.id}</td>
                <td className="py-4 px-6 text-sm text-[#4A5568]">{invoice.client}</td>
                <td className="py-4 px-6 text-sm text-[#1A2B4C] font-extrabold">{invoice.amount}</td>
                <td className="py-4 px-6 text-sm text-[#4A5568]">{invoice.dueDate}</td>
                <td className="py-4 px-6">
                  <StatusBadge status={invoice.status} />
                </td>
                <td className="py-4 px-6 text-sm text-[#4A5568] font-medium">
                  {invoice.lastFollowUp || 'No follow-up sent'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceTable;
