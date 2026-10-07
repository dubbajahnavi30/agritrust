import React from 'react';
import { useFarm } from '../../context/FarmContext';
import { RiskBadge } from '../common/RiskBadge';
import {
  ArrowRight,
  CheckCircle2,
  Sliders,
  Sprout
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ReferenceLine
} from 'recharts';

export const FieldIntelligencePage: React.FC = () => {
  const { fields, setSelectedFieldId, allocationsResult, recommendations, setActivePage, openCropModalForField, t } = useFarm();

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            {t('multiZoneTelemetry')}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif mt-1">
            {t('fieldIntelTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            {t('fieldIntelSub')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActivePage('simulator')}
            className="px-4 py-2.5 rounded-xl bg-emerald-800 text-white font-semibold text-xs hover:bg-emerald-700 transition-colors flex items-center gap-2"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{t('openSimulatorBtn')}</span>
          </button>
        </div>
      </div>

      {/* 3 Main Field Intelligence Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {fields.map((field) => {
          const alloc = allocationsResult.allocations.find((a) => a.fieldId === field.id);
          const rec = recommendations.find((r) => r.fieldId === field.id);

          return (
            <div
              key={field.id}
              className="bg-white rounded-3xl border border-stone-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden hover:border-emerald-300 group"
            >
              {/* Card Top Banner */}
              <div className="p-6 border-b border-stone-100 bg-stone-50/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-stone-500">
                    ZONE {field.id.split('-')[1].toUpperCase()}
                  </span>
                  <RiskBadge level={field.stressRisk} size="sm" />
                </div>

                <h3 className="text-xl font-bold font-serif text-stone-900 group-hover:text-emerald-800 transition-colors">
                  {t(field.name)}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-bold text-stone-700">{t(field.cropName)}</span>
                  <span className="text-xs text-stone-400">•</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800 font-medium">
                    {t(field.stage)} {t('Stage')}
                  </span>
                </div>
              </div>

              {/* Card Key Metrics Grid */}
              <div className="p-6 space-y-5 flex-1">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-stone-50 rounded-2xl p-3 border border-stone-100">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">
                      {t('soilMoisture')}
                    </span>
                    <span
                      className={`text-2xl font-extrabold ${
                        field.soilMoisture < 30 ? 'text-amber-600' : 'text-emerald-700'
                      }`}
                    >
                      {field.soilMoisture}%
                    </span>
                    <span className="text-[10px] text-stone-400 block">
                      {t('Target')}: &gt;{field.soilMoistureOptimalMin}%
                    </span>
                  </div>

                  <div className="bg-stone-50 rounded-2xl p-3 border border-stone-100">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">
                      {t('Priority')} #{field.priorityRank}
                    </span>
                    <span className="text-2xl font-extrabold text-stone-900">
                      #{field.priorityRank}
                    </span>
                    <span className="text-[10px] text-stone-400 block">
                      {t(field.economicSensitivity)} {t('Risk')}
                    </span>
                  </div>

                  <div className="bg-stone-50 rounded-2xl p-3 border border-stone-100">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">
                      {t('Water Required')}
                    </span>
                    <span className="text-2xl font-extrabold text-sky-700">
                      {field.waterRequiredLiters} L
                    </span>
                    <span className="text-[10px] text-stone-400 block">
                      {t('Allocated Water')}: {alloc ? alloc.allocatedWaterLiters : field.waterRequiredLiters} L
                    </span>
                  </div>

                  <div className="bg-stone-50 rounded-2xl p-3 border border-stone-100">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">
                      Health Score
                    </span>
                    <span className="text-2xl font-extrabold text-emerald-700">
                      {field.healthScore}/100
                    </span>
                    <span className="text-[10px] text-stone-400 block">
                      Stress: {field.stressRisk}
                    </span>
                  </div>
                </div>

                {/* 24h Mini Moisture History Chart */}
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5 font-medium">
                    <span>Moisture Depletion Trend</span>
                    <span className="text-[10px] text-stone-400">Critical: {field.soilMoistureOptimalMin}%</span>
                  </div>
                  <div className="h-28 w-full bg-stone-50 rounded-xl p-2 border border-stone-100">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={field.moistureHistory} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                        <defs>
                          <linearGradient id={`grad-${field.id}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="time" stroke="#a8a29e" fontSize={9} tickLine={false} />
                        <YAxis domain={[15, 60]} stroke="#a8a29e" fontSize={9} tickLine={false} />
                        <ReferenceLine y={field.soilMoistureOptimalMin} stroke="#ef4444" strokeDasharray="2 2" />
                        <Area
                          type="monotone"
                          dataKey="moisture"
                          stroke="#0284c7"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill={`url(#grad-${field.id})`}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Recommendation Snippet */}
                {rec && (
                  <div className="bg-emerald-50/70 rounded-2xl p-3.5 border border-emerald-200/80 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-emerald-950 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        {rec.action}
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-800">
                        {rec.confidence}% Conf
                      </span>
                    </div>
                    <p className="text-[11px] text-emerald-900 leading-tight">
                      {rec.reason}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="p-4 border-t border-stone-100 bg-stone-50/50 flex items-center gap-2">
                <button
                  onClick={() => openCropModalForField(field.id)}
                  className="px-3.5 py-2.5 rounded-xl bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 text-emerald-900 font-bold text-xs transition-all flex items-center gap-1.5 shrink-0"
                  title="Change this field's crop or growth stage"
                >
                  <Sprout className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{t('changeCropBtn')}</span>
                </button>
                <button
                  onClick={() => setSelectedFieldId(field.id)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-white border border-stone-300 hover:border-emerald-500 hover:bg-emerald-50 text-stone-800 hover:text-emerald-900 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>Deep Diagnostics</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Agronomic Parameter Comparison Table */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
        <h3 className="text-lg font-bold font-serif text-stone-900">
          Field Soil & Agronomic Profile Comparison
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-stone-50 text-stone-500 uppercase tracking-wider font-semibold border-b border-stone-200">
              <tr>
                <th className="py-3 px-4">Field</th>
                <th className="py-3 px-4">Crop & Stage</th>
                <th className="py-3 px-4">Soil Type</th>
                <th className="py-3 px-4">Current / Optimal</th>
                <th className="py-3 px-4">Sensitivity</th>
                <th className="py-3 px-4">Drought Buffer</th>
                <th className="py-3 px-4">Last Irrigated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {fields.map((f) => (
                <tr key={f.id} className="hover:bg-stone-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-stone-900">{f.name}</td>
                  <td className="py-3.5 px-4">
                    {f.cropName} ({f.stage})
                  </td>
                  <td className="py-3.5 px-4">{f.soilType}</td>
                  <td className="py-3.5 px-4">
                    <span className={f.soilMoisture < 30 ? 'text-amber-600 font-bold' : 'text-emerald-700 font-bold'}>
                      {f.soilMoisture}%
                    </span>{' '}
                    / {f.soilMoistureOptimalMin}%–{f.soilMoistureOptimalMax}%
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        f.economicSensitivity === 'High'
                          ? 'bg-rose-100 text-rose-800'
                          : f.economicSensitivity === 'Medium'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {f.economicSensitivity} Loss Risk
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    {f.id === 'field-a' ? 'Low (~12 hrs buffer)' : f.id === 'field-b' ? 'Medium (~36 hrs)' : 'High (48+ hrs)'}
                  </td>
                  <td className="py-3.5 px-4 text-stone-500">{f.lastIrrigated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
