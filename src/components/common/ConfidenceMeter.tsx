import React from 'react';

interface ConfidenceMeterProps {
  score: number; // 0 - 100
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  labelPrefix?: string;
}

export const ConfidenceMeter: React.FC<ConfidenceMeterProps> = ({
  score,
  size = 'md',
  showLabel = true,
  labelPrefix = 'Confidence'
}) => {
  const getColor = (val: number) => {
    if (val >= 85) return 'text-emerald-600 bg-emerald-500 border-emerald-300';
    if (val >= 70) return 'text-teal-600 bg-teal-500 border-teal-300';
    if (val >= 50) return 'text-amber-600 bg-amber-500 border-amber-300';
    return 'text-rose-600 bg-rose-500 border-rose-300';
  };

  const getTrackColor = (val: number) => {
    if (val >= 85) return 'bg-emerald-100';
    if (val >= 70) return 'bg-teal-100';
    if (val >= 50) return 'bg-amber-100';
    return 'bg-rose-100';
  };

  const heightClass = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3.5'
  }[size];

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex items-center justify-between text-xs sm:text-sm font-medium mb-1.5">
          <span className="text-stone-600">{labelPrefix}</span>
          <span className={`font-semibold ${getColor(score).split(' ')[0]}`}>
            {score}%
          </span>
        </div>
      )}
      <div className={`w-full rounded-full overflow-hidden ${getTrackColor(score)} ${heightClass}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${getColor(score).split(' ')[1]}`}
          style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
        />
      </div>
    </div>
  );
};
