import React from 'react';

const StatusBadge = ({ status }) => {
  const styles = {
    Paid: 'bg-[#48C78E]/10 text-[#48C78E] border-[#48C78E]/20',
    Overdue: 'bg-[#E53E3E]/10 text-[#E53E3E] border-[#E53E3E]/20',
    Sent: 'bg-[#1A2B4C]/10 text-[#1A2B4C] border-[#1A2B4C]/20',
    Pending: 'bg-[#4A5568]/10 text-[#4A5568] border-[#4A5568]/20',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${styles[status] || styles.Pending}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
