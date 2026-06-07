import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Clock, CheckCircle, Settings, LogOut } from 'lucide-react';
import { UserButton, useClerk } from '@clerk/clerk-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { signOut } = useClerk();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: FileText, label: 'Invoices', path: '/invoices' },
    { icon: FileText, label: 'Import', path: '/import' },
    { icon: Clock, label: 'Schedules', path: '/schedules' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1A2B4C] text-white flex flex-col sticky top-0 h-screen">
        <div className="p-8">
          <div className="flex items-center gap-2 mb-8">
            <span className="bg-[#48C78E] p-1.5 rounded-lg text-white">
              <LayoutDashboard size={20} />
            </span>
            <span className="text-xl font-black tracking-tight">FollowUp</span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive 
                    ? 'bg-[#48C78E]/10 border-l-4 border-[#48C78E] text-[#48C78E] font-bold' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white font-medium'
                }`}
              >
                <item.icon size={18} /> {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div 
            onClick={() => signOut()}
            className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white cursor-pointer transition-all"
          >
            <LogOut size={18} /> <span>Sign Out</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white border-b border-slate-200 h-20 flex items-center justify-between px-10 sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-black text-[#1A2B4C]">
              {menuItems.find(i => i.path === location.pathname)?.label || 'FollowUp'}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>

        <main className="p-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
