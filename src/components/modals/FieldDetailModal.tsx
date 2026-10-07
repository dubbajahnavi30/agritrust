import React from 'react';
import { useFarm } from '../../context/FarmContext';
import { RiskBadge } from '../common/RiskBadge';
import {
  X,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine
} from 'recharts';

export const FieldDetailModal: React.FC = () => {
  const { selectedFieldId, setSelectedFieldId, fields, allocationsResult, setActivePage, t } = useFarm();

  if (!selectedFieldId) return null;

  const field = fields.find((f) => f.id === selectedFieldId);
  if (!field) return null;

  const allocation = allocationsResult.allocations.find((a) => a.fieldId === field.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-stone-200 bg-stone-50 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-stone-500 uppercase">
                Zone {field.id.split('-')[1].toUpperCase()}
              </span>
              <RiskBadge level={field.stressRisk} size="sm" />
              <span className="text-xs px-2 py-0.5 rounded-full bg-stone-200 text-stone-700 font-semibold">
                {t('Priority')} #{field.priorityRank}
              </span>
            </div>
            <h3 className="text-2xl font-bold font-serif text-stone-900">
              {t(field.cropName)} — {t(field.name)}
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              {field.cropVariety} • {field.areaHectares} ha • {t(field.stage)} {t('Stage')}
            </p>
          </div>
          <button
            onClick={() => setSelectedFieldId(null)}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Key Metric Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-stone-50 rounded-2xl p-3.5 border border-stone-200">
              <span className="text-[11px] font-semibold text-stone-500 block uppercase">
                Soil Moisture
              </span>
              <span className={`text-xl font-extrabold ${field.soilMoisture < 30 ? 'text-amber-600' : 'text-emerald-700'}`}>
                {field.soilMoisture}%
              </span>
              <span className="text-[10px] text-stone-400 block mt-0.5">
                Target: &gt;{field.soilMoistureOptimalMin}%
              </span>
            </div>

            <div className="bg-stone-50 rounded-2xl p-3.5 border border-stone-200">
              <span className="text-[11px] font-semibold text-stone-500 block uppercase">
                Allocated Water
              </span>
              <span className="text-xl font-extrabold text-sky-700">
                {allocation ? allocation.allocatedWaterLiters : field.waterRequiredLiters} L
              </span>
              <span className="text-[10px] text-stone-400 block mt-0.5">
                Ideal: {field.waterRequiredLiters} L
              </span>
            </div>

            <div className="bg-stone-50 rounded-2xl p-3.5 border border-stone-200">
              <span className="text-[11px] font-semibold text-stone-500 block uppercase">
                Health Score
              </span>
              <span className="text-xl font-extrabold text-emerald-700">
                {field.healthScore}/100
              </span>
              <span className="text-[10px] text-stone-400 block mt-0.5">
                Stress: {field.stressRisk}
              </span>
            </div>

            <div className="bg-stone-50 rounded-2xl p-3.5 border border-stone-200">
              <span className="text-[11px] font-semibold text-stone-500 block uppercase">
                Run Duration
              </span>
              <span className="text-xl font-extrabold text-stone-800">
                {allocation ? `${allocation.irrigationDurationMinutes} min` : '20 min'}
              </span>
              <span className="text-[10px] text-stone-400 block mt-0.5">
                At 25 L/min drip
              </span>
            </div>
          </div>

          {/* Moisture 24h Trend Chart */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                  24-Hour Soil Moisture Depletion Trend
                </h4>
                <p className="text-[11px] text-stone-500">
                  Continuous sensor readings against critical flowering threshold (35%)
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="inline-block w-3 h-0.5 bg-sky-500" />
                <span className="text-stone-600">Moisture (%)</span>
                <span className="inline-block w-3 h-0.5 bg-rose-500 border-dashed" />
                <span className="text-stone-600">Threshold</span>
              </div>
            </div>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={field.moistureHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="moistureGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0284c7" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#78716c" fontSize={11} tickLine={false} />
                  <YAxis domain={[15, 60]} stroke="#78716c" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1c1917', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  />
                  <ReferenceLine y={field.soilMoistureOptimalMin} stroke="#ef4444" strokeDasharray="3 3" />
                  <Area
                    type="monotone"
                    dataKey="moisture"
                    stroke="#0284c7"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#moistureGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Action & Contingency Notice */}
          {allocation && (
            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                  <h4 className="text-sm font-bold text-emerald-950">
                    Recommended Action: {allocation.action} ({allocation.allocatedWaterLiters} L)
                  </h4>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-200 text-emerald-900">
                  {allocation.recommendedTime}
                </span>
              </div>
              <p className="text-xs text-emerald-900 leading-relaxed">
                {allocation.actionNote}
              </p>
              {allocation.alternativeAction && (
                <div className="pt-2 border-t border-emerald-200/80 text-xs text-emerald-800">
                  <span className="font-bold">Contingency Alternative: </span>
                  {allocation.alternativeAction}
                </div>
              )}
            </div>
          )}

          {/* Sensor Telemetry List */}
          <div>
            <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-2.5">
              Zone Sensors ({field.sensors.length} Active Probes)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {field.sensors.map((s) => (
                <div
                  key={s.id}
                  className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                    s.status === 'Anomaly'
                      ? 'bg-rose-50 border-rose-300'
                      : s.status === 'Warning'
                      ? 'bg-amber-50 border-amber-300'
                      : 'bg-stone-50 border-stone-200'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="font-semibold text-stone-900 block">{s.name}</span>
                    <span className="text-[11px] text-stone-500">
                      Reading: {s.currentValue} {s.unit} • Status: {s.status}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-stone-800 block">{s.confidence}% Conf</span>
                    <span className="text-[10px] text-stone-400">Updated {s.lastUpdated}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 flex justify-end gap-2">
          <button
            onClick={() => {
              setSelectedFieldId(null);
              setActivePage('simulator');
            }}
            className="px-4 py-2 rounded-xl bg-sky-700 text-white text-xs font-semibold hover:bg-sky-600 transition-colors flex items-center gap-1.5"
          >
            <span>{t('Simulate Water')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setSelectedFieldId(null)}
            className="px-4 py-2 rounded-xl bg-stone-200 text-stone-800 text-xs font-medium hover:bg-stone-300 transition-colors"
          >
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  );
};
