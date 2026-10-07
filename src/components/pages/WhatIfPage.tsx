import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import { RiskBadge } from '../common/RiskBadge';
import {
  GitFork,
  Zap,
  CloudRain,
  Droplets,
  Thermometer,
  Sparkles
} from 'lucide-react';

export const WhatIfPage: React.FC = () => {
  const {
    availableWater,
    setAvailableWater,
    rainCondition,
    setRainCondition,
    setConstraints,
    allocationsResult,
    t
  } = useFarm();

  // Local scenario inputs
  const [scenarioWater, setScenarioWater] = useState<number>(1000);
  const [scenarioRain, setScenarioRain] = useState<'none' | 'light' | 'heavy'>('heavy');
  const [scenarioTemp, setScenarioTemp] = useState<number>(36);
  const [scenarioPower, setScenarioPower] = useState<'restricted' | 'full'>('restricted');

  // Recalculate handler
  const handleRecalculate = () => {
    setAvailableWater(scenarioWater);
    setRainCondition(scenarioRain);

    if (scenarioPower === 'restricted') {
      setConstraints((prev) => ({
        ...prev,
        electricityAvailableHours: [{ start: '07:00 AM', end: '09:00 AM' }]
      }));
    } else {
      setConstraints((prev) => ({
        ...prev,
        electricityAvailableHours: [
          { start: '07:00 AM', end: '09:00 AM' },
          { start: '06:00 PM', end: '10:00 PM' }
        ]
      }));
    }
  };

  const isPowerRestricted = scenarioPower === 'restricted';

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            {t('navWhatIf')}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif mt-1">
            {t('whatIfTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            {t('whatIfSub')}
          </p>
        </div>

        <button
          onClick={() => {
            setScenarioWater(1000);
            setScenarioRain('heavy');
            setScenarioPower('restricted');
            handleRecalculate();
          }}
          className="px-4 py-2.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-300 font-bold text-xs hover:bg-amber-100 transition-colors flex items-center gap-1.5 shadow-2xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>{t('Load Hackathon Demo Scenario')}</span>
        </button>
      </div>

      {/* Main Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Sandbox Form (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-5">
          <div className="pb-3 border-b border-stone-100 flex items-center justify-between">
            <h3 className="text-base font-bold text-stone-900 font-serif">
              Simulated Field Variables
            </h3>
            <span className="text-xs text-stone-500">Live Parameters</span>
          </div>

          {/* 1. Available Water */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-stone-800">
              <span className="flex items-center gap-1 text-sky-800">
                <Droplets className="w-3.5 h-3.5 text-sky-600" />
                Available Reservoir Water
              </span>
              <span className="font-mono text-sky-900">{scenarioWater} L</span>
            </div>
            <input
              type="range"
              min="500"
              max="4000"
              step="100"
              value={scenarioWater}
              onChange={(e) => setScenarioWater(Number(e.target.value))}
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
            />
            <div className="flex justify-between text-[10px] text-stone-400 font-mono">
              <span>500 L (Extreme)</span>
              <span>1,000 L</span>
              <span>4,000 L</span>
            </div>
          </div>

          {/* 2. Rainfall Forecast */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-800 flex items-center gap-1">
              <CloudRain className="w-3.5 h-3.5 text-sky-600" />
              Incoming Rain Forecast
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['none', 'light', 'heavy'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setScenarioRain(r)}
                  className={`py-2 px-2.5 rounded-xl text-xs font-semibold border capitalize transition-all ${
                    scenarioRain === r
                      ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {r === 'none' ? 'No Rain' : `${r} Rain`}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Electricity Schedule Constraint */}
          <div className="space-y-2 bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200">
            <div className="flex items-center justify-between text-xs font-bold text-amber-950">
              <span className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                Grid Power Window
              </span>
              <span className="text-[10px] uppercase font-bold text-amber-800">
                {scenarioPower === 'restricted' ? 'Severe Cut' : 'Full Power'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => setScenarioPower('restricted')}
                className={`py-2 px-2 rounded-xl text-xs font-semibold border text-left transition-all ${
                  scenarioPower === 'restricted'
                    ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                    : 'bg-white border-amber-200 text-stone-800 hover:bg-amber-100/50'
                }`}
              >
                <span className="block font-bold">7 AM – 9 AM Only</span>
                <span className="text-[10px] block opacity-80">Evening cut off</span>
              </button>

              <button
                onClick={() => setScenarioPower('full')}
                className={`py-2 px-2 rounded-xl text-xs font-semibold border text-left transition-all ${
                  scenarioPower === 'full'
                    ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                    : 'bg-white border-amber-200 text-stone-800 hover:bg-amber-100/50'
                }`}
              >
                <span className="block font-bold">Standard Grid</span>
                <span className="text-[10px] block opacity-80">Includes 6-10 PM</span>
              </button>
            </div>
          </div>

          {/* 4. Temperature Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-stone-800">
              <span className="flex items-center gap-1 text-rose-700">
                <Thermometer className="w-3.5 h-3.5 text-rose-600" />
                Canopy Temperature
              </span>
              <span className="font-mono text-rose-800">{scenarioTemp}°C</span>
            </div>
            <input
              type="range"
              min="24"
              max="42"
              value={scenarioTemp}
              onChange={(e) => setScenarioTemp(Number(e.target.value))}
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
            />
          </div>

          {/* Big RECALCULATE DECISION Button */}
          <button
            onClick={handleRecalculate}
            className="w-full py-3.5 px-4 rounded-2xl bg-emerald-800 text-white font-extrabold text-sm hover:bg-emerald-700 shadow-md shadow-emerald-900/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
          >
            <GitFork className="w-4 h-4" />
            <span>RECALCULATE DECISION</span>
          </button>
        </div>

        {/* Right: Dynamic Contingency Plan Output (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Output Verdict Banner */}
          <div className="bg-stone-900 text-white rounded-3xl p-6 border border-stone-800 shadow-lg space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                <h4 className="text-sm font-bold uppercase tracking-wider text-amber-300">
                  Synthesized Contingency Verdict
                </h4>
              </div>
              <span className="text-xs text-stone-400 font-mono">
                Budget: {availableWater} L • Rain: {rainCondition}
              </span>
            </div>

            {isPowerRestricted && (
              <div className="bg-amber-950/40 border border-amber-600/50 rounded-2xl p-4 text-xs text-amber-200 leading-relaxed">
                <span className="font-bold text-amber-300 block text-sm mb-1">
                  ⚠️ "Do not follow the original evening irrigation plan."
                </span>
                Ideal evening irrigation window (6:30 PM) is unavailable due to power restrictions. AgriTrust adapted schedule: Shift critical Tomato irrigation to <strong>7:00 AM morning slot</strong> before solar peak.
              </div>
            )}

            <div className="grid grid-cols-3 gap-3 text-center text-xs pt-2">
              <div className="bg-stone-800/80 p-3 rounded-xl border border-stone-700">
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Tomato Plan</span>
                <span className="text-sm font-extrabold text-emerald-400 font-mono">
                  {allocationsResult.allocations.find(a => a.fieldId === 'field-a')?.allocatedWaterLiters} L @ 7:00 AM
                </span>
              </div>
              <div className="bg-stone-800/80 p-3 rounded-xl border border-stone-700">
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Chilli Plan</span>
                <span className="text-sm font-extrabold text-amber-400 font-mono">
                  {rainCondition === 'heavy' ? 'Delay' : 'Deficit 350 L'}
                </span>
              </div>
              <div className="bg-stone-800/80 p-3 rounded-xl border border-stone-700">
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Groundnut Plan</span>
                <span className="text-sm font-extrabold text-sky-400 font-mono">
                  {rainCondition === 'heavy' ? 'Skip' : '100 L'}
                </span>
              </div>
            </div>
          </div>

          {/* New Adapted Field Actions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
              Updated Field Action Matrix
            </h4>

            {allocationsResult.allocations.map((alloc) => (
              <div
                key={alloc.fieldId}
                className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900 text-sm">
                      {alloc.cropName} ({alloc.fieldName})
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-semibold">
                      Priority #{alloc.priority}
                    </span>
                  </div>
                  <RiskBadge level={alloc.riskIfDeficit} size="sm" />
                </div>

                <div className="flex items-center justify-between text-xs text-stone-600">
                  <span>
                    New Allocation:{' '}
                    <strong className="text-sky-700 font-bold">{alloc.allocatedWaterLiters} L</strong> (Ideal: {alloc.idealWaterLiters} L)
                  </span>
                  <span className="font-mono text-stone-800 font-bold">
                    Time: {alloc.recommendedTime}
                  </span>
                </div>

                <p className="text-xs text-stone-700 leading-snug">
                  {alloc.actionNote}
                </p>

                {alloc.alternativeAction && (
                  <div className="pt-2 border-t border-stone-100 text-[11px] text-amber-900 font-medium">
                    <span className="font-bold">Contingency: </span>
                    {alloc.alternativeAction}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
