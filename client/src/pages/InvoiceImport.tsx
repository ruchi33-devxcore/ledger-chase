import React, { useState, useRef } from 'react';
import Layout from '../components/Layout';
import { Upload, FileSpreadsheet, Keyboard, Info, CheckCircle, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { useNavigate } from 'react-router-dom';

const InvoiceImport: React.FC = () => {
  const api = useApi();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Manual form state
  const [manualForm, setManualForm] = useState({
    client_name: '',
    amount: '',
    due_date: '',
    invoice_number: ''
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      // For MVP, we assume firm_id is 1 or we fetch it
      const firmRes = await api.get('/firms/me');
      const firm = firmRes.data;
      if (!firm) {
        setError("Please set up your firm in Settings first.");
        return;
      }
      
      formData.append('firm_id', firm.id.toString());
      
      await api.post('/invoices/import', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setSuccess(true);
      setTimeout(() => navigate('/invoices'), 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to upload CSV. Please check the file format.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const firmRes = await api.get('/firms/me');
      const firm = firmRes.data;
      if (!firm) {
        setError("Please set up your firm in Settings first.");
        return;
      }

      await api.post('/invoices', {
        ...manualForm,
        firm_id: firm.id,
        amount: parseFloat(manualForm.amount),
        status: 'pending'
      });

      setSuccess(true);
      setTimeout(() => navigate('/invoices'), 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to add invoice.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-[#1A2B4C]">Import Invoices</h2>
          <p className="text-[#4A5568] font-medium">Add invoices to your dashboard to start the automated follow-up process.</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-center gap-3 text-red-600 font-bold animate-shake">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center gap-3 text-emerald-600 font-bold">
            <CheckCircle size={20} />
            Invoices imported successfully! Redirecting...
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Bulk Upload */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`bg-white rounded-2xl border-2 border-dashed ${isUploading ? 'border-[#48C78E] bg-emerald-50' : 'border-slate-200'} p-10 text-center space-y-6 hover:border-[#48C78E] transition-all cursor-pointer group relative`}
          >
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileChange}
              accept=".csv"
            />
            
            {isUploading ? (
              <div className="space-y-4">
                <Loader2 className="animate-spin text-[#48C78E] mx-auto" size={48} />
                <p className="font-bold text-[#48C78E]">Processing CSV...</p>
              </div>
            ) : (
              <>
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
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4">Supports .CSV only</p>
                </div>
              </>
            )}
          </div>

          {/* Manual Entry */}
          <form onSubmit={handleManualSubmit} className="bg-white rounded-2xl border border-slate-200 p-10 space-y-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#1A2B4C]/5 rounded-xl text-[#1A2B4C]">
                <Keyboard size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#1A2B4C]">Manual Entry</h3>
            </div>
            
            <div className="space-y-4 pt-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#1A2B4C] uppercase tracking-widest">Client Name</label>
                <input 
                  type="text" 
                  required
                  value={manualForm.client_name}
                  onChange={e => setManualForm({...manualForm, client_name: e.target.value})}
                  placeholder="Acme Corp" 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-[#48C78E] text-sm" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#1A2B4C] uppercase tracking-widest">Invoice Number</label>
                <input 
                  type="text" 
                  required
                  value={manualForm.invoice_number}
                  onChange={e => setManualForm({...manualForm, invoice_number: e.target.value})}
                  placeholder="INV-001" 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-[#48C78E] text-sm" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#1A2B4C] uppercase tracking-widest">Amount</label>
                  <input 
                    type="number" 
                    required
                    value={manualForm.amount}
                    onChange={e => setManualForm({...manualForm, amount: e.target.value})}
                    placeholder="0.00" 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-[#48C78E] text-sm" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#1A2B4C] uppercase tracking-widest">Due Date</label>
                  <input 
                    type="date" 
                    required
                    value={manualForm.due_date}
                    onChange={e => setManualForm({...manualForm, due_date: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-[#48C78E] text-sm" 
                  />
                </div>
              </div>
              <button 
                disabled={isSubmitting}
                className="w-full bg-[#1A2B4C] text-white py-3 rounded-xl font-bold hover:bg-[#1A2B4C]/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <>Add Invoice <ArrowRight size={18} /></>}
              </button>
            </div>
          </form>
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
    </Layout>
  );
};

export default InvoiceImport;
