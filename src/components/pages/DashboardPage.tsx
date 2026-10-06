import React from 'react';
import { useFarm } from '../../context/FarmContext';
import { StatCard } from '../common/StatCard';
import { RiskBadge } from '../common/RiskBadge';
import { FieldVisualizer } from '../common/FieldVisualizer';
import {
  Droplets,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Clock,
  ArrowRight,
  Sliders,
  HelpCircle,
  Info,
  Zap,
  Sprout
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const {
    availableWater,
    highRiskCount,
    irrigationNeededCount,
    avgConfidence,
    fields,
    recommendations,
    allocationsResult,
    setActivePage,
    setSelectedFieldId,
    tomatoAnomalyActive,
    isTechnicalView,
    openCropModalForField,
    t
  } = useFarm();

  const tomatoField = fields.find((f) => f.id === 'field-a') || fields[0];
  const tomatoRec = recommendations.find((r) => r.fieldId === 'field-a') || recommendations[0];
  const tomatoAlloc = allocationsResult.allocations.find((a) => a.fieldId === 'field-a');

  return (
    <div className="space-y-8 pb-10">
      {/* Top Banner / Welcome Bar */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Farm Status: Active Monitoring
            </span>
            <span className="text-xs text-stone-400">• Zone 4 / Field Grid 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
            {t('goodMorning')}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            {t('greenValleyFarm')} • {t('demoFarm')} • 4.2 ha across 3 production zones
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => openCropModalForField('field-a')}
            className="px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-300 hover:bg-emerald-100 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <Sprout className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t('changeCropBtn')}</span>
          </button>
          <button
            onClick={() => setActivePage('simulator')}
            className="px-4 py-2.5 rounded-xl bg-sky-50 text-sky-800 border border-sky-200 hover:bg-sky-100 font-semibold text-xs transition-colors flex items-center gap-2"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Simulate Water</span>
          </button>
          <button
            onClick={() => setActivePage('explanation')}
            className="px-4 py-2.5 rounded-xl bg-emerald-800 text-white hover:bg-emerald-700 font-bold text-xs transition-all flex items-center gap-2 shadow-xs"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Explain Decisions</span>
          </button>
        </div>
      </div>

      {/* Large Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Water Available"
          value={`${availableWater.toLocaleString()} L`}
          subtitle={availableWater < 1200 ? 'Severe Deficit Warning' : 'Reservoir Capacity: 2,500 L'}
          icon={Droplets}
          variant="blue"
          badge={availableWater < 1200 ? 'Rationing Active' : 'Optimal Reserve'}
          onClick={() => setActivePage('simulator')}
        />

        <StatCard
          title="High-Risk Fields"
          value={highRiskCount}
          subtitle="Tomato (Flowering phase)"
          icon={AlertTriangle}
          variant={highRiskCount > 0 ? 'amber' : 'emerald'}
          badge={highRiskCount > 0 ? 'Immediate Action Needed' : 'Normal'}
          onClick={() => setActivePage('fields')}
        />

        <StatCard
          title="Irrigation Needed"
          value={`${irrigationNeededCount} fields`}
          subtitle="Tomato (550 L), Chilli (350 L)"
          icon={CheckCircle2}
          variant="emerald"
          badge="2 Active Decisions"
          onClick={() => setActivePage('recommendations')}
        />

        <StatCard
          title={isTechnicalView ? 'Bayesian Confidence' : 'Average Confidence'}
          value={`${avgConfidence}%`}
          subtitle={tomatoAnomalyActive ? 'Cross-validation active' : 'Multi-sensor verified'}
          icon={TrendingUp}
          variant="stone"
          badge={tomatoAnomalyActive ? 'Anomaly Penalized' : 'High Trust'}
          onClick={() => setActivePage('sensors')}
        />
      </div>

      {/* MOST IMPORTANT COMPONENT: TODAY'S FARM DECISION */}
      <div className="bg-linear-to-br from-emerald-900 via-stone-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 border border-emerald-800/80 shadow-xl relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-emerald-800/50">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-400 text-stone-950 text-[11px] font-extrabold uppercase tracking-wider">
                TODAY'S HIGHEST-PRIORITY DECISION
              </span>
              <RiskBadge level={tomatoField.stressRisk} size="sm" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-white tracking-tight">
              FIELD A: {tomatoField.cropName.toUpperCase()} — {tomatoRec.action}
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-xl">
              Target Zone: North Slope • {tomatoField.stage} Stage • Soil: {tomatoField.soilType}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 bg-stone-950/50 p-4 rounded-2xl border border-emerald-800/60">
            <div className="text-center px-3 border-r border-stone-800">
              <span className="text-[10px] text-stone-400 uppercase font-semibold block">Duration</span>
              <span className="text-lg font-extrabold text-emerald-400 font-mono">
                {tomatoAlloc ? `${tomatoAlloc.irrigationDurationMinutes} min` : '18–22 min'}
              </span>
            </div>
            <div className="text-center px-3 border-r border-stone-800">
              <span className="text-[10px] text-stone-400 uppercase font-semibold block">Water Dose</span>
              <span className="text-lg font-extrabold text-sky-400 font-mono">
                {tomatoAlloc ? `${tomatoAlloc.allocatedWaterLiters} L` : '550 L'}
              </span>
            </div>
            <div className="text-center px-3 border-r border-stone-800">
              <span className="text-[10px] text-stone-400 uppercase font-semibold block">Best Window</span>
              <span className="text-lg font-extrabold text-amber-300 font-mono">
                {tomatoAlloc ? tomatoAlloc.recommendedTime : '6:30 PM'}
              </span>
            </div>
            <div className="text-center px-3">
              <span className="text-[10px] text-stone-400 uppercase font-semibold block">Confidence</span>
              <span className="text-lg font-extrabold text-emerald-300 font-mono">
                {tomatoRec.confidence}%
              </span>
            </div>
          </div>
        </div>

        {/* Evidence Chips & Explanation */}
        <div className="relative z-10 pt-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              WHY THIS ACTION? (EVIDENCE CHIPS)
            </span>
            <span className="text-xs text-stone-400">
              {isTechnicalView ? '• Weighted Multi-Criteria Formulation' : '• No black-box AI'}
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {tomatoRec.evidenceChips.map((chip, idx) => (
              <div
                key={idx}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-2 ${
                  chip.isWarning
                    ? 'bg-amber-500/20 text-amber-200 border-amber-500/40'
                    : 'bg-stone-900/80 text-stone-200 border-stone-700'
                }`}
              >
                <span className="text-stone-400">{chip.label}:</span>
                <span className="font-bold">{chip.value}</span>
              </div>
            ))}
            <div className="px-3 py-1.5 rounded-xl text-xs font-medium bg-stone-900/80 text-stone-200 border border-stone-700 flex items-center gap-2">
              <span className="text-stone-400">Water Availability:</span>
              <span className="font-bold text-sky-300">
                {availableWater < 1200 ? 'Limited (Deficit)' : 'Sufficient'}
              </span>
            </div>
          </div>

          {/* Transparent reasoning statement */}
          <div className="bg-stone-950/60 rounded-2xl p-4 border border-emerald-900/60 flex items-start gap-3">
            <Info className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-stone-200 leading-relaxed">
              <span className="font-semibold text-white">Transparent Reasoning: </span>
              {tomatoRec.reason}
            </div>
          </div>

          {/* Contingency / Alternative action if constrained */}
          {tomatoAlloc?.alternativeAction && (
            <div className="bg-amber-950/30 rounded-2xl p-3.5 border border-amber-700/40 flex items-start gap-2.5 text-xs text-amber-200">
              <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-300">Constraint Contingency: </span>
                {tomatoAlloc.alternativeAction}
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Risk if skipped: </span>
              <span className="font-bold text-rose-400">HIGH (Flower abortion in ~18 hours)</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setSelectedFieldId('field-a');
                  setActivePage('fields');
                }}
                className="text-xs text-emerald-300 hover:text-white font-semibold flex items-center gap-1"
              >
                <span>Inspect Field A History</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* VISUAL FLOW: WATER → RISK → PRIORITY → ACTION */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-100">
          <div>
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-widest block">
              Core Differentiator
            </span>
            <h3 className="text-xl font-bold font-serif text-stone-900">
              Visual Decision Flow: Water → Risk → Priority → Action
            </h3>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-stone-100 text-stone-600 font-medium">
            Dynamic Recalculation Active
          </span>
        </div>

        {/* 5-Step Process Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
          {/* Step 1: Available Water */}
          <div className="bg-sky-50/70 rounded-2xl p-4 border border-sky-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800">Step 1</span>
              <Droplets className="w-4 h-4 text-sky-600" />
            </div>
            <h4 className="text-xs font-bold text-sky-950 uppercase">Available Water</h4>
            <div className="text-2xl font-extrabold text-sky-900 font-mono">
              {availableWater.toLocaleString()} L
            </div>
            <p className="text-[11px] text-sky-800">
              Farm reservoir storage constraint limit.
            </p>
          </div>

          {/* Step 2: Risk Analysis */}
          <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">Step 2</span>
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            </div>
            <h4 className="text-xs font-bold text-amber-950 uppercase">Crop Risk Analysis</h4>
            <div className="text-xs font-semibold text-amber-900 space-y-1">
              <div>• Tomato: High (Flower drop)</div>
              <div>• Chilli: Medium</div>
              <div>• Groundnut: Low</div>
            </div>
            <p className="text-[11px] text-amber-800">
              Evaluates biophysical yield loss.
            </p>
          </div>

          {/* Step 3: Field Priority */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-600">Step 3</span>
              <TrendingUp className="w-4 h-4 text-stone-600" />
            </div>
            <h4 className="text-xs font-bold text-stone-900 uppercase">Field Priority</h4>
            <div className="text-xs font-bold text-stone-800 space-y-1">
              <div className="text-rose-600">#1 Tomato (Flowering)</div>
              <div className="text-amber-600">#2 Chilli (Vegetative)</div>
              <div className="text-emerald-700">#3 Groundnut (Buffer)</div>
            </div>
            <p className="text-[11px] text-stone-500">
              Prioritizes highest expected yield loss.
            </p>
          </div>

          {/* Step 4: Water Allocation */}
          <div className="bg-teal-50/70 rounded-2xl p-4 border border-teal-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800">Step 4</span>
              <Sliders className="w-4 h-4 text-teal-600" />
            </div>
            <h4 className="text-xs font-bold text-teal-950 uppercase">Water Allocation</h4>
            <div className="text-xs font-bold font-mono text-teal-900 space-y-1">
              <div>Tomato: {allocationsResult.allocations.find(a => a.fieldId === 'field-a')?.allocatedWaterLiters} L</div>
              <div>Chilli: {allocationsResult.allocations.find(a => a.fieldId === 'field-b')?.allocatedWaterLiters} L</div>
              <div>Groundnut: {allocationsResult.allocations.find(a => a.fieldId === 'field-c')?.allocatedWaterLiters} L</div>
            </div>
            <p className="text-[11px] text-teal-800">
              Optimized under {availableWater} L budget.
            </p>
          </div>

          {/* Step 5: Recommended Action */}
          <div className="bg-emerald-50/80 rounded-2xl p-4 border border-emerald-300 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">Step 5</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <h4 className="text-xs font-bold text-emerald-950 uppercase">Recommended Action</h4>
            <div className="text-xs font-bold text-emerald-900 leading-snug">
              Irrigate Field A at 6:30 PM (or 7 AM grid window).
            </div>
            <p className="text-[11px] text-emerald-800">
              Zero water wasted, 100% crops guarded.
            </p>
          </div>
        </div>

        {/* Priority Rankings Table Preview */}
        <div className="mt-4 pt-4 border-t border-stone-100">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
              Field Priority Summary & Allocation Status
            </h4>
            <button
              onClick={() => setActivePage('simulator')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>Adjust in Simulator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {allocationsResult.allocations.map((alloc) => (
              <div
                  key={alloc.fieldId}
                  onClick={() => {
                    setSelectedFieldId(alloc.fieldId);
                    setActivePage('fields');
                  }}
                  className="p-4 rounded-2xl bg-stone-50 border border-stone-200 hover:border-emerald-300 hover:bg-white transition-all cursor-pointer space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-stone-500">
                      PRIORITY #{alloc.priority}
                    </span>
                    <RiskBadge level={alloc.riskIfDeficit} size="sm" />
                  </div>
                  <div>
                    <h5 className="text-base font-bold text-stone-900">
                      {alloc.cropName} ({alloc.fieldName})
                    </h5>
                    <span className="text-xs text-stone-500">
                      Fulfillment: {alloc.fulfillmentPercent}% ({alloc.allocatedWaterLiters} / {alloc.idealWaterLiters} L)
                    </span>
                  </div>
                  <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        alloc.fulfillmentPercent >= 100 ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${alloc.fulfillmentPercent}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-stone-600 leading-tight">
                    {alloc.actionNote}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Farm Zone Visualizer Embed */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold font-serif text-stone-900">
            Live Field Zone Telemetry
          </h3>
          <span className="text-xs text-stone-500">Click any zone for deep-dive</span>
        </div>
        <FieldVisualizer interactive={true} compact={true} />
      </div>
    </div>
  );
};
