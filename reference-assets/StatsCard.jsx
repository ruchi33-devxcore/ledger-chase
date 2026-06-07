import React from 'react';

const StatsCard = ({ title, value, change, icon: Icon, color = 'navy' }) => {
  const colorStyles = {
    navy: 'bg-[#1A2B4C]/5 text-[#1A2B4C]',
    emerald: 'bg-[#48C78E]/5 text-[#48C78E]',
    red: 'bg-[#E53E3E]/5 text-[#E53E3E]',
    slate: 'bg-[#4A5568]/5 text-[#4A5568]',
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2.5 rounded-lg ${colorStyles[color]}`}>
          {Icon && <Icon size={20} strokeWidth={2.5} />}
        </div>
        {change !== undefined && (
          <span className={`text-xs font-bold px-2 py-1 rounded-md ${change >= 0 ? 'bg-emerald-50 text-[#48C78E]' : 'bg-red-50 text-[#E53E3E]'}`}>
            {change >= 0 ? '+' : ''}{change}%
          </span>
        )}
      </div>
      <div>
        <p className="text-[#4A5568] text-xs font-bold uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-extrabold text-[#1A2B4C] mt-1">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
