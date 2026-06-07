import React from 'react';
import { Upload, FileSpreadsheet, Keyboard, Info, CheckCircle, ArrowRight } from 'lucide-react';

const InvoiceImport = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-[#1A2B4C]">Import Invoices</h2>
        <p className="text-[#4A5568] font-medium">Add invoices to your dashboard to start the automated follow-up process.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bulk Upload */}
        <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-10 text-center space-y-6 hover:border-[#48C78E] transition-all cursor-pointer group">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
            <FileSpreadsheet size={40} className="text-[#48C78E]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#1A2B4C]">Bulk CSV Import</h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Upload your spreadsheet exported from Tally, Zoho, or any other accounting software.
            </p>
          </div>
          <div className="pt-4">
            <button className="bg-[#48C78E] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 mx-auto shadow-lg shadow-[#48C78E]/20">
              <Upload size={18} /> Select File
            </button>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4">Supports .CSV, .XLSX</p>
          </div>
        </div>

        {/* Manual Entry */}
        <div className="bg-white rounded-2xl border border-slate-200 p-10 space-y-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#1A2B4C]/5 rounded-xl text-[#1A2B4C]">
              <Keyboard size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#1A2B4C]">Manual Entry</h3>
          </div>
          
          <div className="space-y-4 pt-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-[#1A2B4C] uppercase tracking-widest">Client Name</label>
              <input type="text" placeholder="Search or add client..." className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-[#48C78E] text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#1A2B4C] uppercase tracking-widest">Amount</label>
                <input type="text" placeholder="0.00" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-[#48C78E] text-sm" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#1A2B4C] uppercase tracking-widest">Due Date</label>
                <input type="date" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-[#48C78E] text-sm" />
              </div>
            </div>
            <button className="w-full bg-[#1A2B4C] text-white py-3 rounded-xl font-bold hover:bg-[#1A2B4C]/90 transition-all flex items-center justify-center gap-2">
              Add Invoice <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Guide/Info */}
      <div className="bg-[#1A2B4C] rounded-2xl p-8 text-white flex flex-col md:flex-row items-center gap-8 shadow-2xl shadow-[#1A2B4C]/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10 scale-150 rotate-12">
            <Info size={120} />
        </div>
        <div className="shrink-0">
          <div className="w-16 h-16 border-4 border-[#48C78E] rounded-full flex items-center justify-center">
            <CheckCircle size={32} className="text-[#48C78E]" />
          </div>
        </div>
        <div className="space-y-2 relative z-10">
          <h4 className="text-xl font-bold italic text-[#48C78E]">Smart Schedule Integration</h4>
          <p className="text-slate-300 text-sm max-w-xl">
            Importing an invoice automatically triggers your default follow-up sequence. Clients will receive their first reminder exactly according to your schedule settings.
          </p>
        </div>
        <button className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap border border-white/20">
          Learn more
        </button>
      </div>
    </div>
  );
};

export default InvoiceImport;
