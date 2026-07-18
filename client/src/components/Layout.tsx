import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Clock, Settings, LogOut, Search, Plus } from 'lucide-react';
import { UserButton, useClerk, useUser } from '@clerk/clerk-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { signOut } = useClerk();
  const { user } = useUser();
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: FileText, label: 'Invoices', path: '/invoices' },
    { icon: FileText, label: 'Import', path: '/import' },
    { icon: Clock, label: 'Schedules', path: '/schedules' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const currentPage = menuItems.find(i => i.path === location.pathname)?.label || 'FollowUp';

  return (
    <div className="flex min-h-screen bg-[#0F172A] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1E293B] border-r border-white/5 flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00FF88] to-[#00CC66] flex items-center justify-center text-[#0F172A] font-black text-lg">
              F
            </div>
            <div>
              <span className="text-lg font-black tracking-tight">
                Follow<span className="text-[#00FF88]">Up</span>
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] live-dot"></span>
                <span className="text-[10px] text-[#00FF88]/60 font-mono uppercase tracking-widest">Live</span>
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-[#00FF88]/10 border border-[#00FF88]/20 text-[#00FF88] font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 font-medium'
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-300 cursor-pointer transition-all rounded-xl hover:bg-white/5">
            <UserButton />
            <div className="text-sm">
              <span className="font-medium">{user?.firstName || 'User'}</span>
              <span className="block text-xs text-slate-600 truncate max-w-[120px]">
                {user?.primaryEmailAddress?.emailAddress}
              </span>
            </div>
          </div>
          <div
            onClick={() => signOut()}
            className="flex items-center gap-3 px-4 py-2 mt-2 text-slate-500 hover:text-white cursor-pointer transition-all text-xs"
          >
            <LogOut size={14} /> <span>Sign Out</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 glass sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-black">{currentPage}</h1>
            <p className="text-xs text-slate-500 font-mono mt-0.5">Last updated: 2 mins ago</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search invoices..." 
                className="w-72 bg-[#1E293B] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none focus:border-[#00FF88]/50 transition-all font-mono"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            </div>
            
            <Link 
              to="/import"
              className="bg-gradient-to-r from-[#00FF88] to-[#00CC66] text-[#0F172A] px-6 py-2.5 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-[#00FF88]/25 transition-all flex items-center gap-2"
            >
              <Plus size={16} />
              New Invoice
            </Link>
          </div>
        </header>

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
