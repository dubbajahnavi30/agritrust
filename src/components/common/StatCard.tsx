import React from 'react';
import { LucideIcon } from 'lucide-react';
import { useFarm } from '../../context/FarmContext';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  badge?: string;
  variant?: 'emerald' | 'blue' | 'amber' | 'stone';
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  badge,
  variant = 'emerald',
  onClick
}) => {
  const { t } = useFarm();
  const variantStyles = {
    emerald: {
      border: 'border-emerald-200/80 hover:border-emerald-300',
      iconBg: 'bg-emerald-50 text-emerald-700',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    blue: {
      border: 'border-sky-200/80 hover:border-sky-300',
      iconBg: 'bg-sky-50 text-sky-700',
      badgeBg: 'bg-sky-50 text-sky-700 border-sky-200'
    },
    amber: {
      border: 'border-amber-200/80 hover:border-amber-300',
      iconBg: 'bg-amber-50 text-amber-700',
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    stone: {
      border: 'border-stone-200 hover:border-stone-300',
      iconBg: 'bg-stone-100 text-stone-700',
      badgeBg: 'bg-stone-100 text-stone-700 border-stone-200'
    }
  }[variant];

  return (
    <div
      onClick={onClick}
      className={`relative bg-white rounded-2xl p-5 border shadow-xs transition-all duration-300 hover:shadow-md ${
        variantStyles.border
      } ${onClick ? 'cursor-pointer hover:-translate-y-0.5' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            {t(title)}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              {value}
            </span>
          </div>
          {subtitle && (
            <p className="text-xs text-stone-500 font-medium pt-0.5">{t(subtitle)}</p>
          )}
        </div>
        <div className={`p-3 rounded-xl border border-transparent ${variantStyles.iconBg}`}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      </div>
      {badge && (
        <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between">
          <span className={`text-xs px-2 py-0.5 rounded-md border font-medium ${variantStyles.badgeBg}`}>
            {t(badge)}
          </span>
        </div>
      )}
    </div>
  );
};
