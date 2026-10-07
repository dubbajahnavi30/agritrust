import React from 'react';
import { useFarm } from '../../context/FarmContext';
import { RiskBadge } from './RiskBadge';
import { Droplets, Sparkles, AlertTriangle, ArrowRight } from 'lucide-react';

interface FieldVisualizerProps {
  interactive?: boolean;
  compact?: boolean;
}

export const FieldVisualizer: React.FC<FieldVisualizerProps> = ({
  interactive = true,
  compact = false
}) => {
  const { fields, setSelectedFieldId, setActivePage, tomatoAnomalyActive, t } = useFarm();

  const handleFieldClick = (fieldId: string) => {
    if (!interactive) return;
    setSelectedFieldId(fieldId);
    setActivePage('fields');
  };

  return (
    <div className="w-full bg-linear-to-b from-emerald-950 via-stone-900 to-stone-950 rounded-3xl p-5 sm:p-7 border border-emerald-900/60 shadow-2xl relative overflow-hidden">
      {/* Ambient background glow and grid lines */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.15),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#064e3b15_1px,transparent_1px),linear-gradient(to_bottom,#064e3b15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Header bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-emerald-800/40">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
          <div>
            <h3 className="text-white text-base sm:text-lg font-bold tracking-tight flex items-center gap-2">
              <span>{t('Green Valley Zone Map')}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium">
                {t('Live Sensor Telemetry')}
              </span>
            </h3>
            <p className="text-stone-400 text-xs">
              4.2 Hectares Total • Drip Irrigation Grid #1
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {tomatoAnomalyActive && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold animate-pulse">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{t('Fault Injection Active')}</span>
            </div>
          )}
          <span className="text-xs text-stone-400 hidden sm:inline-flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Click zone for diagnostics
          </span>
        </div>
      </div>

      {/* Field Zones Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10 ${compact ? 'py-1' : 'py-3'}`}>
        {fields.map((field) => {
          const isTomato = field.id === 'field-a';
          const isChilli = field.id === 'field-b';

          const cropTheme = isTomato
            ? {
                border: 'hover:border-rose-400/80 border-rose-900/40 bg-linear-to-b from-stone-900/90 to-rose-950/30',
                accentText: 'text-rose-400',
                tag: 'High Economic Risk',
                waterColor: 'from-amber-500 to-rose-500'
              }
            : isChilli
            ? {
                border: 'hover:border-amber-400/80 border-amber-900/40 bg-linear-to-b from-stone-900/90 to-amber-950/30',
                accentText: 'text-amber-400',
                tag: 'Moderate Resilience',
                waterColor: 'from-emerald-500 to-amber-500'
              }
            : {
                border: 'hover:border-emerald-400/80 border-emerald-900/40 bg-linear-to-b from-stone-900/90 to-emerald-950/30',
                accentText: 'text-emerald-400',
                tag: 'Drought Buffer Zone',
                waterColor: 'from-emerald-400 to-teal-500'
              };

          return (
            <div
              key={field.id}
              onClick={() => handleFieldClick(field.id)}
              className={`group relative rounded-2xl p-5 border transition-all duration-300 cursor-pointer backdrop-blur-md ${
                cropTheme.border
              } hover:scale-[1.02] hover:shadow-xl`}
            >
              {/* Top Row: Field Label & Priority */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono text-stone-400">ZONE {field.id.split('-')[1].toUpperCase()}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-800 text-stone-300 font-medium">
                      {t('Priority')} #{field.priorityRank}
                    </span>
                  </div>
                  <h4 className="text-white text-lg font-bold group-hover:text-emerald-300 transition-colors">
                    {t(field.cropName)}
                  </h4>
                  <p className="text-xs text-stone-400">{t(field.stage)} {t('Stage')}</p>
                </div>
                <RiskBadge level={field.stressRisk} size="sm" />
              </div>

              {/* Moisture gauge card */}
              <div className="my-3 bg-stone-950/60 rounded-xl p-3 border border-stone-800/80">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-stone-400 flex items-center gap-1">
                    <Droplets className="w-3.5 h-3.5 text-sky-400" />
                    {t('soilMoisture')}
                  </span>
                  <span className={`font-mono font-bold text-sm ${
                    field.soilMoisture < 30 ? 'text-amber-400' : 'text-emerald-400'
                  }`}>
                    {field.soilMoisture}%
                  </span>
                </div>
                {/* Visual bar */}
                <div className="h-2 w-full bg-stone-800 rounded-full overflow-hidden relative">
                  <div
                    className={`h-full rounded-full bg-linear-to-r ${cropTheme.waterColor} transition-all duration-700`}
                    style={{ width: `${Math.min(100, field.soilMoisture)}%` }}
                  />
                  {/* Threshold mark */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white/70"
                    style={{ left: `${field.soilMoistureOptimalMin}%` }}
                    title={`Target: ${field.soilMoistureOptimalMin}%`}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-stone-500 mt-1">
                  <span>Current: {field.soilMoisture}%</span>
                  <span>Target: &gt;{field.soilMoistureOptimalMin}%</span>
                </div>
              </div>

              {/* Water Requirement & Quick stats */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-stone-800/60 text-stone-300">
                <div>
                  <span className="text-[10px] text-stone-500 block">Water Need</span>
                  <span className="font-semibold text-white">{field.waterRequiredLiters} L</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 block">Health Index</span>
                  <span className="font-semibold text-white">{field.healthScore}/100</span>
                </div>
              </div>

              {/* Bottom footer button prompt */}
              <div className="mt-3 pt-2 flex items-center justify-between text-[11px] text-emerald-400 group-hover:text-emerald-300">
                <span>View sensor breakdown</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Soil layer footer cross-section hint */}
      <div className="relative z-10 mt-4 pt-3 border-t border-stone-800/60 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-rose-500" />
            <span>Field A: 550 L needed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-amber-500" />
            <span>Field B: 350 L needed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500" />
            <span>Field C: 100 L needed</span>
          </div>
        </div>
        <div className="text-stone-400 font-mono text-[11px]">
          Total Irrigation Deficit: 1,000 L / 4.2 ha
        </div>
      </div>
    </div>
  );
};
