import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import { RiskBadge } from '../common/RiskBadge';
import { decisionFactorsTomato } from '../../data/mockData';
import {
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const DecisionExplanationPage: React.FC = () => {
  const {
    fields,
    weather,
    availableWater,
    tomatoAnomalyActive,
    recommendations
  } = useFarm();

  const [selectedFieldId, setSelectedFieldId] = useState<string>('field-a');

  const selectedField = fields.find((f) => f.id === selectedFieldId) || fields[0];
  const rec = recommendations.find((r) => r.fieldId === selectedFieldId) || recommendations[0];

  const factors = decisionFactorsTomato;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Explainable Decision Intelligence
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif mt-1">
            Why Did AgriTrust Make This Decision?
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Transparent breakdown of evidence, factor weights, and deterministic decision rules.
          </p>
        </div>

        {/* Field Selector Tabs */}
        <div className="flex bg-stone-100 p-1 rounded-2xl border border-stone-200">
          {fields.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFieldId(f.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedFieldId === f.id
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {f.cropName}
            </button>
          ))}
        </div>
      </div>

      {/* Target Decision Summary Card */}
      <div className="bg-linear-to-r from-emerald-900 via-teal-900 to-stone-900 text-white rounded-3xl p-6 sm:p-7 border border-emerald-800/80 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-800/50">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold font-mono text-emerald-300 uppercase">
                Recommendation Verdict
              </span>
              <RiskBadge level={rec.riskIfSkipped} size="sm" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-white">
              {rec.cropName} ({selectedField.name}): {rec.action}
            </h2>
            <p className="text-xs text-stone-300 mt-0.5">
              Assigned: {rec.estimatedWaterLiters} L • Best Window: {rec.bestTime}
            </p>
          </div>

          <div className="bg-stone-950/60 px-5 py-3 rounded-2xl border border-emerald-800/60 text-center min-w-[140px]">
            <span className="text-[10px] text-stone-400 uppercase font-semibold block">
              Confidence Score
            </span>
            <span className="text-2xl font-extrabold text-emerald-400 font-mono">
              {rec.confidence}%
            </span>
            <span className="text-[10px] text-stone-400 block mt-0.5">
              {tomatoAnomalyActive && selectedFieldId === 'field-a' ? 'Penalized by Anomaly' : 'Cross-Validated'}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-stone-300">
          <div>
            <span className="text-stone-400 font-semibold">Immediate Risk if Skipped: </span>
            <span className="font-bold text-rose-300">
              {rec.riskIfSkipped} (Flower abortion & yield penalty)
            </span>
          </div>
          <div>
            <span className="text-stone-400 font-semibold">Water Constraint: </span>
            <span className="font-bold text-sky-300">
              {availableWater.toLocaleString()} L available
            </span>
          </div>
        </div>
      </div>

      {/* Decision Factors Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Weighted Factor Sliders / Impact Visuals (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h3 className="text-base font-bold text-stone-900 font-serif">
                Decision Factors & Attribution Weights
              </h3>
              <p className="text-xs text-stone-500">
                How each environmental variable influenced the final recommendation
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
              Multi-Criteria Model
            </span>
          </div>

          <div className="space-y-4">
            {factors.map((factor, idx) => (
              <div
                key={idx}
                className="bg-stone-50 rounded-2xl p-4 border border-stone-100 space-y-2 hover:border-emerald-200 transition-colors"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900 text-sm">
                      {factor.name}
                    </span>
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        factor.impact === 'HIGH'
                          ? 'bg-rose-100 text-rose-800'
                          : factor.impact === 'MEDIUM'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      Impact: {factor.impact}
                    </span>
                  </div>
                  <span className="font-mono font-bold text-stone-700">
                    {factor.score}% severity • weight {Math.round(factor.weight * 100)}%
                  </span>
                </div>

                {/* Progress bar visual */}
                <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      factor.score >= 75
                        ? 'bg-rose-500'
                        : factor.score >= 50
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${factor.score}%` }}
                  />
                </div>

                <p className="text-xs text-stone-600 leading-snug">
                  {factor.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Step-by-Step Decision Logic (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-6">
          <div className="pb-3 border-b border-stone-100">
            <h3 className="text-base font-bold text-stone-900 font-serif flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Step-by-Step Decision Logic</span>
            </h3>
            <p className="text-xs text-stone-500">
              Linear sequence followed by the deterministic decision engine
            </p>
          </div>

          <div className="space-y-3 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-stone-200">
            <div className="relative flex items-start gap-3 pl-2">
              <div className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                1
              </div>
              <div className="text-xs text-stone-700 leading-snug">
                <span className="font-bold text-stone-900 block">Moisture Deficit Check</span>
                Soil moisture ({selectedField.soilMoisture}%) is below optimal range ({selectedField.soilMoistureOptimalMin}%).
              </div>
            </div>

            <div className="relative flex items-start gap-3 pl-2">
              <div className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                2
              </div>
              <div className="text-xs text-stone-700 leading-snug">
                <span className="font-bold text-stone-900 block">Crop Vulnerability Evaluation</span>
                {selectedField.cropName} is in {selectedField.stage} stage with high economic loss potential.
              </div>
            </div>

            <div className="relative flex items-start gap-3 pl-2">
              <div className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                3
              </div>
              <div className="text-xs text-stone-700 leading-snug">
                <span className="font-bold text-stone-900 block">Rainfall Discount</span>
                Rain probability is {weather.rainProbabilityPercent}% ({weather.expectedRainfallMm} mm), not enough to recharge the root zone.
              </div>
            </div>

            <div className="relative flex items-start gap-3 pl-2">
              <div className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                4
              </div>
              <div className="text-xs text-stone-700 leading-snug">
                <span className="font-bold text-stone-900 block">Evapotranspiration Pressure</span>
                Temperature is {weather.temperatureC}°C, elevating moisture loss to {weather.evapotranspirationMmDay} mm/day.
              </div>
            </div>

            <div className="relative flex items-start gap-3 pl-2">
              <div className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                5
              </div>
              <div className="text-xs text-stone-700 leading-snug">
                <span className="font-bold text-stone-900 block">Resource Allocation Solved</span>
                Available water is {availableWater} L; water is allocated first to Field A to protect highest-loss asset.
              </div>
            </div>

            <div className="relative flex items-start gap-3 pl-2">
              <div className="w-4 h-4 rounded-full bg-emerald-800 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                6
              </div>
              <div className="text-xs text-emerald-950 font-bold leading-snug bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 w-full">
                <span>Final Synthesis: </span>
                Irrigate {rec.estimatedWaterLiters} L at {rec.bestTime}.
              </div>
            </div>
          </div>

          {/* Transparent Trust Guarantee */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-xs text-stone-600 space-y-1.5">
            <span className="font-bold text-stone-900 block flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Auditable AI Guarantee</span>
            </span>
            <p className="leading-relaxed">
              No black-box neural networks make irreversible water decisions. Every recommendation traces directly back to observable soil sensors and peer-reviewed agronomic crop curves.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
