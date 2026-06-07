import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { User, Bell, CreditCard, Shield, Globe, Mail, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const Settings: React.FC = () => {
  const api = useApi();
  const queryClient = useQueryClient();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: firm, isLoading } = useQuery({
    queryKey: ['firm-me'],
    queryFn: async () => {
      try {
        const res = await api.get('/firms/me');
        return res.data;
      } catch (e) {
        return null;
      }
    }
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    website: ''
  });

  useEffect(() => {
    if (firm) {
      setFormData({
        name: firm.name || '',
        email: firm.email || '',
        phone: firm.phone || '',
        address: firm.address || '',
        website: firm.website || ''
      });
    }
  }, [firm]);

  const mutation = useMutation({
    mutationFn: (data: typeof formData) => {
      if (firm) {
        // We don't have an update endpoint yet, let's assume we use POST for now or add PATCH
        return api.post('/firms', data); 
      } else {
        return api.post('/firms', data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['firm-me'] });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    },
    onError: (err: any) => {
      setError(err.response?.data?.error || "Failed to save settings.");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-[#48C78E]" size={40} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h2 className="text-2xl font-black text-[#1A2B4C]">Firm Settings</h2>
          <p className="text-[#4A5568] mt-1 font-medium">Manage your firm's profile, billing, and automation preferences.</p>
        </div>

        {success && (
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center gap-3 text-emerald-600 font-bold">
            <CheckCircle size={20} /> Settings saved successfully!
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-center gap-3 text-red-600 font-bold">
            <AlertCircle size={20} /> {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Navigation */}
          <div className="space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-[#1A2B4C] shadow-sm">
              <User size={18} /> Profile
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-500 hover:bg-slate-100 rounded-lg text-sm font-bold transition-all text-left">
              <Bell size={18} /> Notifications
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-500 hover:bg-slate-100 rounded-lg text-sm font-bold transition-all text-left">
              <CreditCard size={18} /> Subscription
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-500 hover:bg-slate-100 rounded-lg text-sm font-bold transition-all text-left">
              <Shield size={18} /> Security
            </button>
          </div>

          {/* Content */}
          <div className="md:col-span-3 space-y-6">
            {/* Profile Section */}
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="font-bold text-[#1A2B4C] border-b border-slate-100 pb-4">Firm Profile</h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#1A2B4C] uppercase tracking-widest">Firm Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="Acme Accounting Firm" 
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-[#48C78E] outline-none text-sm font-medium" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#1A2B4C] uppercase tracking-widest">Contact Email</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    placeholder="admin@acme.com" 
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-[#48C78E] outline-none text-sm font-medium" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#1A2B4C] uppercase tracking-widest">Phone</label>
                  <input 
                    type="text" 
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    placeholder="+91 9876543210" 
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-[#48C78E] outline-none text-sm font-medium" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#1A2B4C] uppercase tracking-widest">Website</label>
                  <input 
                    type="text" 
                    value={formData.website}
                    onChange={e => setFormData({...formData, website: e.target.value})}
                    placeholder="https://acme.com" 
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-[#48C78E] outline-none text-sm font-medium" 
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-[#1A2B4C] uppercase tracking-widest">Address</label>
                  <textarea 
                    rows={3} 
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                    placeholder="123 Business Way..."
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-[#48C78E] outline-none text-sm font-medium" 
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button 
                  type="submit"
                  disabled={mutation.isPending}
                  className="bg-[#48C78E] text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-[#48C78E]/90 transition-all shadow-lg shadow-[#48C78E]/20 disabled:opacity-50"
                >
                  {mutation.isPending ? <Loader2 className="animate-spin" size={18} /> : (firm ? 'Update Profile' : 'Create Profile')}
                </button>
              </div>
            </form>

            {/* Preferences */}
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="font-bold text-[#1A2B4C] border-b border-slate-100 pb-4">Automation Preferences</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg opacity-50 cursor-not-allowed">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-md text-[#48C78E] border border-slate-200">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#1A2B4C]">Auto-send Reminders</p>
                      <p className="text-xs text-slate-500">Automatically send follow-up emails on schedule. (Coming Soon)</p>
                    </div>
                  </div>
                  <div className="relative inline-block w-10 h-6">
                    <div className="w-10 h-6 bg-slate-300 rounded-full"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
