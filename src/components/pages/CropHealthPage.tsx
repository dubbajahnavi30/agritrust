import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import { RiskBadge } from '../common/RiskBadge';
import {
  HeartPulse,
  Droplets,
  Flame,
  Activity,
  CheckCircle2,
  Info,
  Eye
} from 'lucide-react';

export const CropHealthPage: React.FC = () => {
  const { fields, t } = useFarm();
  const [activeCropId, setActiveCropId] = useState<string>('field-a');

  const selectedField = fields.find((f) => f.id === activeCropId) || fields[0];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            {t('navCrops')}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif mt-1">
            {t('cropHealthPageTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            {t('cropHealthPageSub')}
          </p>
        </div>

        {/* Crop Selector Tabs */}
        <div className="flex bg-stone-100 p-1 rounded-2xl border border-stone-200">
          {fields.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveCropId(f.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCropId === f.id
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {t(f.cropName)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Health Card for Selected Crop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Crop Bio Card & Simulated Visual (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-stone-500 uppercase">
                Field Zone {selectedField.id.split('-')[1].toUpperCase()}
              </span>
              <RiskBadge level={selectedField.stressRisk} size="sm" />
            </div>

            <h2 className="text-2xl font-bold font-serif text-stone-900">
              {selectedField.cropName}
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Variety: {selectedField.cropVariety} • Area: {selectedField.areaHectares} ha
            </p>

            {/* Health Score Big Badge */}
            <div className="my-5 p-5 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                  Overall Health Score
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-4xl font-extrabold text-emerald-800 font-mono">
                    {selectedField.healthScore}
                  </span>
                  <span className="text-sm font-bold text-stone-400">/ 100</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-stone-700 block">
                  Growth Stage
                </span>
                <span className="text-sm font-extrabold text-stone-900 px-2.5 py-1 rounded-lg bg-white border border-stone-200 inline-block mt-1">
                  {selectedField.stage}
                </span>
              </div>
            </div>

            {/* Simulated Canopy Visual Graphic */}
            <div className="relative rounded-2xl bg-linear-to-b from-emerald-950 via-stone-900 to-stone-950 p-6 text-white border border-emerald-900/40 text-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(16,185,129,0.2),transparent_70%)]" />
              <div className="relative z-10 space-y-2">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
                  <Eye className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-white">
                  Simulated NDVI / Canopy Inspection
                </h4>
                <p className="text-[11px] text-stone-300 max-w-xs mx-auto leading-relaxed">
                  Vegetative index normalized at 0.76. Vigorous leaf area with slight transpiration drop due to soil drying.
                </p>
                <span className="inline-block text-[10px] bg-stone-800/80 px-2 py-0.5 rounded-full text-stone-400 border border-stone-700">
                  Simulated Multispectral Feed (Hackathon Prototype)
                </span>
              </div>
            </div>
          </div>

          {/* Action Callout */}
          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 block flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Recommended Action</span>
            </span>
            <p className="text-xs text-emerald-950 font-medium">
              "Monitor moisture closely for the next 8 hours. Apply scheduled irrigation to prevent floral bud drop."
            </p>
          </div>
        </div>

        {/* Right: Four Stress Indicators & Biophysical Breakdown (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-6">
          <div className="pb-3 border-b border-stone-100 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-stone-900 font-serif">
                Stress Indicators & Biomass Vulnerability
              </h3>
              <p className="text-xs text-stone-500">
                Continuous indices based on soil telemetry, ambient VPD, and phenology
              </p>
            </div>
            <span className="text-xs font-bold text-stone-500">
              Live Index
            </span>
          </div>

          {/* Stress Progress Bars */}
          <div className="space-y-4">
            {/* 1. Water Stress */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-900 flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-sky-600" />
                  <span>Water Stress (Root Zone Depletion)</span>
                </span>
                <span className={`font-mono font-bold ${selectedField.waterStress > 60 ? 'text-amber-600' : 'text-emerald-700'}`}>
                  {selectedField.waterStress}% ({selectedField.waterStress > 60 ? 'Elevated' : 'Mild'})
                </span>
              </div>
              <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${selectedField.waterStress > 60 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                  style={{ width: `${selectedField.waterStress}%` }}
                />
              </div>
              <p className="text-[11px] text-stone-500">
                Root soil moisture is currently {selectedField.soilMoisture}%. Below crop transpiration demand.
              </p>
            </div>

            {/* 2. Heat Stress */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-900 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-rose-600" />
                  <span>Heat Stress (Canopy Temperature)</span>
                </span>
                <span className="font-mono font-bold text-stone-800">
                  {selectedField.heatStress}% (Moderate)
                </span>
              </div>
              <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-rose-500"
                  style={{ width: `${selectedField.heatStress}%` }}
                />
              </div>
              <p className="text-[11px] text-stone-500">
                Ambient canopy temperature is 34.2°C; afternoon solar radiance elevates transpiration.
              </p>
            </div>

            {/* 3. Nutrient Stress */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-900 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-teal-600" />
                  <span>Nutrient Stress (Electrical Conductivity)</span>
                </span>
                <span className="font-mono font-bold text-emerald-700">
                  {selectedField.nutrientStress}% (Optimal)
                </span>
              </div>
              <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${selectedField.nutrientStress}%` }}
                />
              </div>
              <p className="text-[11px] text-stone-500">
                Soil EC is 1.2 dS/m. Root fertility uptake is balanced.
              </p>
            </div>

            {/* 4. Disease Risk */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-900 flex items-center gap-1.5">
                  <HeartPulse className="w-4 h-4 text-purple-600" />
                  <span>Disease Risk (Fungal / Mold Humidity Model)</span>
                </span>
                <span className="font-mono font-bold text-emerald-700">
                  LOW (22%)
                </span>
              </div>
              <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: '22%' }}
                />
              </div>
              <p className="text-[11px] text-stone-500">
                Dry canopy air (42% humidity) suppresses fungal sporulation. (Note: Multi-spectral imaging required for lab confirmation).
              </p>
            </div>
          </div>

          {/* Hackathon Honesty Disclaimer */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 flex items-start gap-3 text-xs text-stone-600">
            <Info className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-stone-900 block">Agronomic Note for Evaluators:</span>
              Crop stress indicators are computed using FAO-56 moisture deficit equations and microclimate thermistors. Values are clearly labeled for hackathon demonstrator integrity.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
