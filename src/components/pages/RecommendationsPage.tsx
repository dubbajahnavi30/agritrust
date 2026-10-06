import React from 'react';
import { useFarm } from '../../context/FarmContext';
import { RiskBadge } from '../common/RiskBadge';
import {
  AlertTriangle,
  Clock,
  CheckCircle2,
  Zap,
  Sliders
} from 'lucide-react';

export const RecommendationsPage: React.FC = () => {
  const { recommendations, fields, setActivePage } = useFarm();

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Action Priority Queue
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif mt-1">
            Prioritized Farmer Recommendations
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Ranked by expected crop yield loss. Every action includes a risk-tested contingency alternative.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActivePage('simulator')}
            className="px-4 py-2.5 rounded-xl bg-sky-50 text-sky-800 border border-sky-200 hover:bg-sky-100 font-semibold text-xs transition-colors flex items-center gap-2"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Simulate What-If Water</span>
          </button>
        </div>
      </div>

      {/* Recommendations List */}
      <div className="space-y-5">
        {recommendations.map((rec) => {
          const field = fields.find((f) => f.id === rec.fieldId);

          const urgencyTheme = {
            URGENT: {
              card: 'border-rose-300 bg-linear-to-r from-rose-50/50 via-white to-white',
              badge: 'bg-rose-100 text-rose-800 border-rose-300',
              icon: AlertTriangle,
              accent: 'text-rose-700'
            },
            MEDIUM: {
              card: 'border-amber-300 bg-linear-to-r from-amber-50/40 via-white to-white',
              badge: 'bg-amber-100 text-amber-800 border-amber-300',
              icon: Clock,
              accent: 'text-amber-700'
            },
            LOW: {
              card: 'border-emerald-300 bg-linear-to-r from-emerald-50/40 via-white to-white',
              badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
              icon: CheckCircle2,
              accent: 'text-emerald-700'
            }
          }[rec.urgency];

          const UrgencyIcon = urgencyTheme.icon;

          return (
            <div
              key={rec.id}
              className={`rounded-3xl p-6 border shadow-xs hover:shadow-md transition-all space-y-4 ${urgencyTheme.card}`}
            >
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase border flex items-center gap-1.5 ${urgencyTheme.badge}`}>
                    <UrgencyIcon className="w-3.5 h-3.5" />
                    <span>{rec.urgency} PRIORITY</span>
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-stone-900">
                      {rec.cropName} — {rec.fieldName}
                    </h3>
                    <span className="text-xs text-stone-500">
                      Stage: {field?.stage} • Soil Moisture: {field?.soilMoisture}%
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <RiskBadge level={rec.riskIfSkipped} size="sm" />
                  <div className="text-right">
                    <span className="text-xs font-bold text-stone-900 block font-mono">
                      {rec.confidence}% Confidence
                    </span>
                    <span className="text-[10px] text-stone-400">Multi-factor score</span>
                  </div>
                </div>
              </div>

              {/* Action Banner */}
              <div className="bg-white rounded-2xl p-4 border border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                    Recommended Action
                  </span>
                  <div className="text-base font-extrabold text-stone-900">
                    {rec.action}
                  </div>
                  <p className="text-xs text-stone-600">
                    {rec.reason}
                  </p>
                </div>

                <div className="flex items-center gap-4 bg-stone-50 px-4 py-3 rounded-xl border border-stone-100 shrink-0">
                  <div className="text-center">
                    <span className="text-[10px] text-stone-400 uppercase font-semibold block">Water</span>
                    <span className="text-sm font-extrabold text-sky-700 font-mono">
                      {rec.estimatedWaterLiters} L
                    </span>
                  </div>
                  <div className="text-center border-l border-stone-200 pl-4">
                    <span className="text-[10px] text-stone-400 uppercase font-semibold block">Run Time</span>
                    <span className="text-sm font-extrabold text-stone-800 font-mono">
                      {rec.durationMinutes} min
                    </span>
                  </div>
                  <div className="text-center border-l border-stone-200 pl-4">
                    <span className="text-[10px] text-stone-400 uppercase font-semibold block">Timing</span>
                    <span className="text-sm font-extrabold text-amber-700 font-mono">
                      {rec.bestTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Evidence chips row */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-stone-500 mr-1">Signals:</span>
                {rec.evidenceChips.map((chip, idx) => (
                  <span
                    key={idx}
                    className={`text-xs px-2.5 py-1 rounded-lg border font-medium ${
                      chip.isWarning
                        ? 'bg-amber-50 text-amber-900 border-amber-200 font-bold'
                        : 'bg-stone-100 text-stone-700 border-stone-200'
                    }`}
                  >
                    {chip.label}: {chip.value}
                  </span>
                ))}
              </div>

              {/* CONTINGENCY / ALTERNATIVE ACTION */}
              <div className="bg-amber-50/80 rounded-2xl p-3.5 border border-amber-200 flex items-start gap-2.5 text-xs">
                <Zap className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-amber-950">
                  <span className="font-bold">Alternative Action if Farmer Cannot Follow: </span>
                  {rec.alternativeAction}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
