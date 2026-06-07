import React from 'react';
import { CreditCard, Download, Upload, CheckCircle, AlertCircle, Phone, Mail } from 'lucide-react';

const ClientPortal = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Public Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-[#1A2B4C] p-2 rounded-lg text-white">
               <span className="text-xl font-black">F</span>
            </div>
            <span className="text-xl font-black text-[#1A2B4C] tracking-tight italic">FollowUp Client Secure Portal</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
            <CheckCircle size={14} className="text-[#48C78E]" /> Verified Secure
          </div>
        </div>

        {/* Invoice Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          {/* Status Bar */}
          <div className="bg-[#E53E3E] px-8 py-3 text-white text-center text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2">
            <AlertCircle size={14} /> This invoice is overdue by 5 days
          </div>

          <div className="p-10 space-y-10">
            {/* Firm and Client Info */}
            <div className="flex flex-col md:flex-row justify-between gap-10">
              <div className="space-y-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">From</p>
                <div>
                  <h3 className="text-xl font-black text-[#1A2B4C]">Acme Accounting Firm</h3>
                  <p className="text-sm text-slate-500 font-medium mt-1 leading-relaxed">
                    123 Business Way, Suite 500<br />
                    New York, NY 10004
                  </p>
                </div>
                <div className="flex gap-4">
                   <a href="mailto:billing@acme.com" className="p-2 bg-slate-50 rounded-full text-[#1A2B4C] hover:bg-slate-100 transition-all"><Mail size={16} /></a>
                   <a href="tel:123" className="p-2 bg-slate-50 rounded-full text-[#1A2B4C] hover:bg-slate-100 transition-all"><Phone size={16} /></a>
                </div>
              </div>

              <div className="space-y-4 md:text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">To</p>
                <div>
                  <h3 className="text-xl font-black text-[#1A2B4C]">Acme Global Industries</h3>
                  <p className="text-sm text-slate-500 font-medium mt-1 leading-relaxed">
                    Account ID: C-99823<br />
                    billing@global.com
                  </p>
                </div>
              </div>
            </div>

            {/* Amount Section */}
            <div className="bg-[#F8FAFC] rounded-2xl p-10 border border-slate-100 flex flex-col items-center justify-center space-y-2">
               <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Balance Due</p>
               <h2 className="text-5xl font-black text-[#1A2B4C]">$1,200.00</h2>
               <p className="text-sm font-bold text-[#E53E3E] bg-red-50 px-3 py-1 rounded-full mt-2">Due Date: Nov 25, 2023</p>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="bg-[#48C78E] text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-[#48C78E]/90 transition-all shadow-xl shadow-[#48C78E]/20 active:scale-95">
                <CreditCard size={24} /> Mark as Paid
              </button>
              <button className="bg-white border-2 border-slate-100 text-[#1A2B4C] py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-slate-50 transition-all active:scale-95">
                <Download size={24} /> Download PDF
              </button>
            </div>

            {/* Document Upload */}
            <div className="pt-6 border-t border-slate-100 space-y-6">
              <div>
                <h4 className="text-lg font-black text-[#1A2B4C]">Supporting Documents</h4>
                <p className="text-sm text-slate-500 font-medium">Upload proof of payment or requested tax documents here.</p>
              </div>

              <div className="border-4 border-dashed border-slate-100 rounded-3xl p-12 text-center group hover:border-[#48C78E]/30 transition-all cursor-pointer">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#48C78E]/10 transition-all">
                  <Upload size={32} className="text-slate-400 group-hover:text-[#48C78E] transition-all" />
                </div>
                <p className="text-[#1A2B4C] font-bold">Drag files here or <span className="text-[#48C78E] underline">browse</span></p>
                <p className="text-xs text-slate-400 font-bold mt-2 uppercase tracking-widest">Max 20MB per file</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#1A2B4C] p-6 text-center">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
               Protected by <span className="text-white font-black italic">FollowUp</span> Automation <CheckCircle size={10} className="text-[#48C78E]" />
            </p>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center text-slate-400 text-xs font-medium">
          Having trouble? <a href="#" className="text-[#1A2B4C] font-bold hover:underline">Contact Acme Accounting support</a>
        </p>
      </div>
    </div>
  );
};

export default ClientPortal;
