import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { FileText, Clock, CheckCircle, AlertCircle, Upload, Loader2, IndianRupee } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const ClientPortal: React.FC = () => {
  const { invoice_id } = useParams<{ invoice_id: string }>();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const { data: invoice, isLoading, error } = useQuery({
    queryKey: ['portal-invoice', invoice_id],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/portal/${invoice_id}`);
      return res.data;
    },
    enabled: !!invoice_id
  });

  const payMutation = useMutation({
    mutationFn: async () => {
      await axios.post(`${API_URL}/portal/${invoice_id}/pay`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portal-invoice', invoice_id] });
    }
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !invoice_id) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', file.name);

    try {
      await axios.post(`${API_URL}/portal/${invoice_id}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setUploadSuccess(true);
      queryClient.invalidateQueries({ queryKey: ['portal-invoice', invoice_id] });
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (err) {
      console.error('Upload failed', err);
      alert('Failed to upload document.');
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-[#1A2B4C]" size={48} />
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-4">
          <AlertCircle size={64} className="text-red-500 mx-auto" />
          <h2 className="text-2xl font-bold text-[#1A2B4C]">Invoice Not Found</h2>
          <p className="text-slate-500">The invoice link you followed may be invalid or expired.</p>
        </div>
      </div>
    );
  }

  const isPaid = invoice.status === 'paid';

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-[#1A2B4C]">{invoice.firm_name}</h1>
            <p className="text-slate-500 mt-1">{invoice.firm_address}</p>
          </div>
          <div className="bg-white px-6 py-4 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Status</span>
            <div className="flex items-center gap-2">
              {isPaid ? (
                <><CheckCircle className="text-emerald-500" size={20} /> <span className="font-bold text-emerald-600">PAID</span></>
              ) : (
                <><Clock className="text-amber-500" size={20} /> <span className="font-bold text-amber-600 uppercase">{invoice.status}</span></>
              )}
            </div>
          </div>
        </div>

        {/* Invoice Main Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          <div className="bg-[#1A2B4C] p-8 text-white flex justify-between items-center">
            <div>
              <span className="text-white/60 text-xs font-bold uppercase tracking-widest">Invoice Number</span>
              <h2 className="text-2xl font-bold">{invoice.invoice_number}</h2>
            </div>
            <div className="text-right">
              <span className="text-white/60 text-xs font-bold uppercase tracking-widest">Amount Due</span>
              <div className="text-4xl font-black flex items-center justify-end gap-1">
                <IndianRupee size={32} />
                {Number(invoice.amount).toLocaleString()}
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Billed To</span>
                <p className="font-bold text-[#1A2B4C] text-lg">{invoice.client_name}</p>
                <p className="text-slate-500">{invoice.client_email}</p>
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Due Date</span>
                <p className="font-bold text-[#1A2B4C] text-lg">{new Date(invoice.due_date).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
              </div>
            </div>

            {!isPaid && (
              <div className="pt-8 border-top border-slate-100 flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => payMutation.mutate()}
                  disabled={payMutation.isPending}
                  className="flex-1 bg-[#48C78E] text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-[#48C78E]/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  {payMutation.isPending ? <Loader2 className="animate-spin" /> : <><CheckCircle size={24} /> Mark as Paid</>}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Document Section */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-[#1A2B4C]">Requested Documents</h3>
            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="bg-[#1A2B4C] text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-[#1A2B4C]/90 transition-all disabled:opacity-50"
            >
              {isUploading ? <Loader2 className="animate-spin" size={16} /> : <><Upload size={16} /> Upload Document</>}
            </button>
            <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
          </div>

          {uploadSuccess && (
            <div className="bg-emerald-50 text-emerald-600 p-4 rounded-xl font-bold flex items-center gap-2">
              <CheckCircle size={20} /> Document uploaded successfully!
            </div>
          )}

          <div className="space-y-3">
            {invoice.documents && invoice.documents.length > 0 ? (
              invoice.documents.map((doc: any) => (
                <div key={doc.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded-lg text-indigo-500">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#1A2B4C]">{doc.name}</p>
                      <p className="text-[10px] text-slate-400">{new Date(doc.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded">Received</span>
                </div>
              ))
            ) : (
              <p className="text-slate-400 text-sm italic py-4 text-center">No documents uploaded yet.</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-slate-400 text-xs">
            Powered by <strong>FollowUp</strong> — Smart Billing Automation for Accounting Firms
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientPortal;
