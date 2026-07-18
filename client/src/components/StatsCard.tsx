import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down';
  accentColor: 'green' | 'blue' | 'gold' | 'red' | 'default';
  progress: number;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  change, 
  trend = 'up',
  accentColor,
  progress 
}) => {
  const accentStyles = {
    green: {
      glow: 'glow-green',
      text: 'text-[#00FF88]',
      gradient: 'from-[#00FF88] to-[#00CC66]'
    },
    blue: {
      glow: 'glow-blue',
      text: 'text-[#4488FF]',
      gradient: 'from-[#4488FF] to-[#00CCFF]'
    },
    gold: {
      glow: 'glow-gold',
      text: 'text-[#FFD700]',
      gradient: 'from-[#FFD700] to-[#FFAA00]'
    },
    red: {
      glow: 'glow-blue', // Reusing blue glow or could define glow-red
      text: 'text-[#FF6B6B]',
      gradient: 'from-[#FF6B6B] to-[#FF4444]'
    },
    default: {
      glow: '',
      text: 'text-slate-400',
      gradient: 'from-slate-400 to-slate-600'
    }
  };

  const style = accentStyles[accentColor];

  return (
    <div className={`glass rounded-2xl p-6 border border-white/5 card-glow transition-all ${style.glow}`}>
      <div className="flex items-center justify-between mb-4">
        <span className={`text-[10px] font-mono ${style.text} font-bold uppercase tracking-widest`}>
          {title}
        </span>
        {change !== undefined && (
          <div className="flex items-center gap-1">
            {trend === 'up' ? (
              <ArrowUpRight size={12} className={change >= 0 ? 'text-[#00FF88]' : 'text-[#FF6B6B]'} />
            ) : (
              <ArrowDownRight size={12} className={change < 0 ? 'text-[#00FF88]' : 'text-[#FF6B6B]'} />
            )}
            <span className={`text-xs font-mono ${change >= 0 ? 'text-[#00FF88]' : 'text-[#FF6B6B]'}`}>
              {change >= 0 ? '+' : ''}{change}%
            </span>
          </div>
        )}
      </div>
      
      <p className="text-3xl font-black number text-white">{value}</p>
      
      <div className="mt-3 h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${style.gradient} rounded-full transition-all duration-500`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default StatsCard;
