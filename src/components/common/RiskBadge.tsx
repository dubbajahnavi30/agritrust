import React from 'react';
import { RiskLevel } from '../../types';
import { AlertTriangle, ShieldCheck, AlertCircle, ShieldAlert } from 'lucide-react';

interface RiskBadgeProps {
  level: RiskLevel;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level, size = 'md', showIcon = true }) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs sm:text-sm px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm sm:text-base px-3.5 py-1.5 gap-2 font-semibold'
  };

  const config = {
    CRITICAL: {
      bg: 'bg-rose-50 text-rose-700 border-rose-200 ring-rose-500/20',
      dot: 'bg-rose-500',
      icon: ShieldAlert,
      label: 'CRITICAL RISK'
    },
    HIGH: {
      bg: 'bg-amber-50 text-amber-800 border-amber-200 ring-amber-500/20',
      dot: 'bg-amber-500',
      icon: AlertTriangle,
      label: 'HIGH RISK'
    },
    MEDIUM: {
      bg: 'bg-yellow-50 text-yellow-800 border-yellow-200 ring-yellow-500/20',
      dot: 'bg-yellow-500',
      icon: AlertCircle,
      label: 'MEDIUM RISK'
    },
    LOW: {
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-200 ring-emerald-500/20',
      dot: 'bg-emerald-500',
      icon: ShieldCheck,
      label: 'LOW RISK'
    }
  }[level];

  const IconComponent = config.icon;

  return (
    <span
      className={`inline-flex items-center rounded-full border shadow-xs transition-all ${config.bg} ${sizeClasses[size]}`}
    >
      {showIcon && <IconComponent className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />}
      <span>{config.label}</span>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} animate-pulse`} />
    </span>
  );
};
