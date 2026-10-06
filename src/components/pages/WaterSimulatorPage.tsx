import React from 'react';
import { useFarm } from '../../context/FarmContext';
import { RiskBadge } from '../common/RiskBadge';
import {
  Droplets,
  CloudRain,
  Sliders,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  SunMedium,
  BarChart3
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell
} from 'recharts';

export const WaterSimulatorPage: React.FC = () => {
  const {
    availableWater,
    setAvailableWater,
    rainCondition,
    setRainCondition,
    allocationsResult,
    fields,
    isTechnicalView
  } = useFarm();

  const fieldBarData = allocationsResult.allocations.map((a) => ({
    name: a.cropName,
    Allocated: a.allocatedWaterLiters,
    Ideal: a.idealWaterLiters,
    Fulfillment: a.fulfillmentPercent
  }));

  return (
    <div className="space-y-8 pb-12">
      {/* Page Title & Mission Statement */}
      <div className="bg-linear-to-r from-sky-950 via-teal-950 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 border border-sky-800/60 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Signature Feature • Real-Time Optimization</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
              Where Should Every Litre Go?
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-xl">
              See how AgriTrust dynamically reallocates limited water according to crop-loss risk and incoming weather shocks.
            </p>
          </div>

          <div className="bg-stone-950/60 p-4 rounded-2xl border border-sky-800/50 text-center min-w-[160px]">
            <span className="text-[10px] text-stone-400 uppercase font-semibold block">
              Budget Status
            </span>
            <span className="text-2xl font-extrabold text-sky-400 font-mono">
              {availableWater.toLocaleString()} L
            </span>
            <span className="text-[11px] text-stone-300 block mt-0.5">
              {allocationsResult.deficit > 0 ? `Deficit: -${allocationsResult.deficit} L` : 'Deficit: 0 L (Full)'}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Controls Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Sliders & Toggles (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2 font-serif">
              <Sliders className="w-4 h-4 text-emerald-700" />
              <span>Scenario Controls</span>
            </h3>
            <button
              onClick={() => {
                setAvailableWater(2000);
                setRainCondition('none');
              }}
              className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1 font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* 1. AVAILABLE WATER SLIDER */}
          <div className="space-y-3 bg-sky-50/60 p-4 rounded-2xl border border-sky-200/80">
            <div className="flex items-center justify-between">
              <label htmlFor="water-slider" className="text-xs font-bold text-sky-950 uppercase tracking-wider flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-sky-600" />
                <span>Available Water (Liters)</span>
              </label>
              <span className="text-xl font-extrabold text-sky-900 font-mono bg-white px-2.5 py-0.5 rounded-lg border border-sky-200 shadow-2xs">
                {availableWater.toLocaleString()} L
              </span>
            </div>

            <input
              id="water-slider"
              type="range"
              min="500"
              max="5000"
              step="100"
              value={availableWater}
              onChange={(e) => setAvailableWater(Number(e.target.value))}
              className="w-full h-2.5 bg-sky-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
            />

            <div className="flex justify-between text-[11px] font-mono text-stone-500">
              <span>500 L (Severe Drought)</span>
              <span className="text-stone-800 font-bold">2,000 L (Default)</span>
              <span>5,000 L (Abundant)</span>
            </div>

            {/* Quick Preset Buttons */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              <button
                onClick={() => setAvailableWater(1000)}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all ${
                  availableWater === 1000
                    ? 'bg-sky-600 text-white border-sky-600'
                    : 'bg-white border-sky-200 text-sky-900 hover:bg-sky-100'
                }`}
              >
                1,000 L (Drought)
              </button>
              <button
                onClick={() => setAvailableWater(2000)}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all ${
                  availableWater === 2000
                    ? 'bg-sky-600 text-white border-sky-600'
                    : 'bg-white border-sky-200 text-sky-900 hover:bg-sky-100'
                }`}
              >
                2,000 L (Normal)
              </button>
              <button
                onClick={() => setAvailableWater(3500)}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all ${
                  availableWater === 3500
                    ? 'bg-sky-600 text-white border-sky-600'
                    : 'bg-white border-sky-200 text-sky-900 hover:bg-sky-100'
                }`}
              >
                3,500 L (Surplus)
              </button>
            </div>
          </div>

          {/* 2. RAIN TOMORROW TOGGLE */}
          <div className="space-y-3 bg-stone-50 p-4 rounded-2xl border border-stone-200">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                <CloudRain className="w-4 h-4 text-emerald-700" />
                <span>Forecast: Rain Tomorrow</span>
              </label>
              <span className="text-xs font-semibold text-stone-600 capitalize">
                {rainCondition === 'none' ? 'Clear Sky' : `${rainCondition} Rain`}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setRainCondition('none')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all flex flex-col items-center gap-1 ${
                  rainCondition === 'none'
                    ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                    : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <SunMedium className="w-4 h-4" />
                <span>No Rain</span>
              </button>

              <button
                onClick={() => setRainCondition('light')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all flex flex-col items-center gap-1 ${
                  rainCondition === 'light'
                    ? 'bg-sky-700 text-white border-sky-700 shadow-xs'
                    : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <CloudRain className="w-4 h-4" />
                <span>Light Rain</span>
              </button>

              <button
                onClick={() => setRainCondition('heavy')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all flex flex-col items-center gap-1 ${
                  rainCondition === 'heavy'
                    ? 'bg-indigo-800 text-white border-indigo-800 shadow-xs'
                    : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <CloudRain className="w-4 h-4 text-indigo-300" />
                <span>Heavy Rain</span>
              </button>
            </div>

            <p className="text-[11px] text-stone-500 leading-normal">
              {rainCondition === 'heavy'
                ? '🌧️ 85% rain arriving (28 mm). System delays chilli & skips groundnut to harvest free precipitation.'
                : rainCondition === 'light'
                ? '🌦️ 50% rain arriving (6 mm). System trims allocations by ~30%.'
                : '☀️ 18% low rain probability. Standard risk-optimized allocation applies.'}
            </p>
          </div>

          {/* Principle Explanation Callout */}
          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0" />
              <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                Optimization Principle
              </h4>
            </div>
            <p className="text-xs text-emerald-900 leading-relaxed">
              "Water is prioritized toward fields where insufficient irrigation creates the highest expected crop stress."
            </p>
            {isTechnicalView && (
              <p className="text-[10px] text-emerald-800 font-mono pt-1 border-t border-emerald-200">
                Formula: Maximize ∑ (YieldValue_i × LossRisk_i × Alloc_i / Ideal_i) subject to ∑ Alloc_i ≤ Water_Avail
              </p>
            )}
          </div>
        </div>

        {/* Right: Dynamic Reallocation Results (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Reallocation Bar Chart */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <div>
                <h3 className="text-base font-bold text-stone-900 font-serif flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-sky-600" />
                  <span>Dynamic Water Allocation Breakdown</span>
                </h3>
                <p className="text-xs text-stone-500">
                  Ideal Water Requirement vs Current Allocated Liters
                </p>
              </div>
              <div className="text-right text-xs">
                <span className="font-bold text-stone-800 block">
                  Total Need: {fields.reduce((s, f) => s + f.waterRequiredLiters, 0)} L
                </span>
                <span className="text-emerald-700 font-semibold">
                  Delivered: {allocationsResult.totalAllocated} L
                </span>
              </div>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fieldBarData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                  <XAxis dataKey="name" stroke="#78716c" fontSize={12} tickLine={false} />
                  <YAxis stroke="#78716c" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1c1917', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="Ideal" fill="#cbd5e1" radius={[6, 6, 0, 0]} name="Ideal Requirement (L)" />
                  <Bar dataKey="Allocated" fill="#0284c7" radius={[6, 6, 0, 0]} name="AgriTrust Allocated (L)">
                    {fieldBarData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.Fulfillment === 100
                            ? '#059669'
                            : entry.Fulfillment > 0
                            ? '#d97706'
                            : '#94a3b8'
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Field Priority Cards under Current Simulation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
              Field Reallocation Verdicts Under Selected Conditions
            </h4>

            {allocationsResult.allocations.map((alloc) => {
              const field = fields.find((f) => f.id === alloc.fieldId);
              const isFull = alloc.fulfillmentPercent >= 100;
              const isZero = alloc.allocatedWaterLiters === 0;

              return (
                <div
                  key={alloc.fieldId}
                  className={`p-4 rounded-2xl border transition-all ${
                    isZero
                      ? 'bg-stone-50 border-stone-200 opacity-90'
                      : isFull
                      ? 'bg-emerald-50/60 border-emerald-200'
                      : 'bg-amber-50/60 border-amber-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-stone-900 text-white text-xs font-bold flex items-center justify-center font-mono">
                        #{alloc.priority}
                      </span>
                      <div>
                        <h5 className="text-sm font-bold text-stone-900">
                          {alloc.cropName} ({alloc.fieldName})
                        </h5>
                        <span className="text-[11px] text-stone-500">
                          Stage: {field?.stage} • Need: {alloc.idealWaterLiters} L
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase ${
                          alloc.action === 'IRRIGATE'
                            ? 'bg-emerald-200 text-emerald-900'
                            : alloc.action === 'DEFICIT_IRRIGATE'
                            ? 'bg-amber-200 text-amber-900'
                            : alloc.action === 'DELAY'
                            ? 'bg-sky-200 text-sky-900'
                            : 'bg-stone-200 text-stone-800'
                        }`}
                      >
                        {alloc.action.replace('_', ' ')}
                      </span>
                      <RiskBadge level={alloc.riskIfDeficit} size="sm" />
                    </div>
                  </div>

                  {/* Quantity & Progress */}
                  <div className="flex items-center justify-between text-xs font-semibold mb-1">
                    <span className="text-stone-700">
                      Assigned: <span className="text-sky-700 font-extrabold">{alloc.allocatedWaterLiters} L</span> ({alloc.fulfillmentPercent}% of ideal)
                    </span>
                    <span className="text-stone-500 font-mono">
                      Run time: {alloc.irrigationDurationMinutes} mins @ 25 L/min
                    </span>
                  </div>

                  <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isFull ? 'bg-emerald-600' : isZero ? 'bg-stone-400' : 'bg-amber-500'
                      }`}
                      style={{ width: `${alloc.fulfillmentPercent}%` }}
                    />
                  </div>

                  {/* Reasoning Note */}
                  <p className="text-xs text-stone-700 leading-snug">
                    <span className="font-bold text-stone-900">Reason: </span>
                    {alloc.actionNote}
                  </p>

                  {alloc.alternativeAction && (
                    <div className="mt-2 pt-2 border-t border-stone-200/80 text-[11px] text-amber-900">
                      <span className="font-bold">Contingency: </span>
                      {alloc.alternativeAction}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
