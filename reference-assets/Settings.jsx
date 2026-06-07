import React from 'react';
import { User, Bell, CreditCard, Shield, Globe, Mail } from 'lucide-react';

const Settings = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-black text-[#1A2B4C]">Firm Settings</h2>
        <p className="text-[#4A5568] mt-1 font-medium">Manage your firm's profile, billing, and automation preferences.</p>
      </div>

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
          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="font-bold text-[#1A2B4C] border-b border-slate-100 pb-4">Firm Profile</h3>
            
            <div class="grid grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-[10px] font-black text-[#1A2B4C] uppercase tracking-widest">Firm Name</label>
                <input type="text" defaultValue="Acme Accounting Firm" class="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-[#48C78E] outline-none text-sm font-medium" />
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-black text-[#1A2B4C] uppercase tracking-widest">Contact Email</label>
                <input type="email" defaultValue="admin@acme-accounting.com" class="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-[#48C78E] outline-none text-sm font-medium" />
              </div>
              <div class="col-span-2 space-y-2">
                <label class="text-[10px] font-black text-[#1A2B4C] uppercase tracking-widest">Address</label>
                <textarea rows="3" class="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-[#48C78E] outline-none text-sm font-medium">123 Business Way, Suite 500
Financial District
New York, NY 10004</textarea>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button className="bg-[#48C78E] text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-[#48C78E]/90 transition-all shadow-lg shadow-[#48C78E]/20">
                Save Changes
              </button>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="font-bold text-[#1A2B4C] border-b border-slate-100 pb-4">Automation Preferences</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-md text-[#48C78E] border border-slate-200">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1A2B4C]">Auto-send Reminders</p>
                    <p className="text-xs text-slate-500">Automatically send follow-up emails on schedule.</p>
                  </div>
                </div>
                <div className="relative inline-block w-10 h-6">
                  <div className="w-10 h-6 bg-[#48C78E] rounded-full"></div>
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-md text-[#1A2B4C] border border-slate-200">
                    <Globe size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1A2B4C]">Client Portal</p>
                    <p className="text-xs text-slate-500">Enable public payment pages for clients.</p>
                  </div>
                </div>
                <div className="relative inline-block w-10 h-6">
                  <div className="w-10 h-6 bg-[#48C78E] rounded-full"></div>
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
