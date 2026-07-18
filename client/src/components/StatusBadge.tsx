import React from 'react';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const s = status.toLowerCase();
  
  const styles: Record<string, string> = {
    paid: 'bg-[#00FF88]/10 text-[#00FF88] border-[#00FF88]/20',
    overdue: 'bg-[#FF6B6B]/10 text-[#FF6B6B] border-[#FF6B6B]/20',
    sent: 'bg-[#4488FF]/10 text-[#4488FF] border-[#4488FF]/20',
    pending: 'bg-white/5 text-slate-400 border-white/10',
  };

  return (
    <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full border font-mono uppercase tracking-wider ${styles[s] || styles.pending}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
