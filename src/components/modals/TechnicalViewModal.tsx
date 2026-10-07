import React from 'react';
import { X, Cpu, ArrowDown } from 'lucide-react';
import { useFarm } from '../../context/FarmContext';

interface TechnicalViewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TechnicalViewModal: React.FC<TechnicalViewModalProps> = ({ isOpen, onClose }) => {
  const { t } = useFarm();
  if (!isOpen) return null;

  const pipeline = [
    {
      step: '1. Ingestion & Preprocessing',
      name: 'Data Sources & Ingestion',
      type: 'Data Processing',
      typeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      description: 'Collects capacitive soil probe telemetry, LoRaWAN weather gateway readings, and historical evapotranspiration curves (Penman-Monteith ET0).'
    },
    {
      step: '2. Range & Sanity Checking',
      name: 'Data Validation',
      type: 'Deterministic Rules',
      typeColor: 'bg-stone-200 text-stone-800 border-stone-300',
      description: 'Filters physical impossibilities (e.g., negative humidity, temperature spikes > 55°C, disconnect timeouts).'
    },
    {
      step: '3. Multi-Sensor Cross-Validation',
      name: 'Sensor Reliability Engine',
      type: 'Statistical Signal Processing',
      typeColor: 'bg-purple-100 text-purple-800 border-purple-200',
      description: 'Spatial-temporal anomaly detection. Compares root moisture decay against adjacent fields and atmospheric ET0. Penalizes confidence if sensor reads 85% in dry 34°C weather.'
    },
    {
      step: '4. Precipitation Probability Fusion',
      name: 'Weather Intelligence',
      type: 'Data Processing & Forecast Fusion',
      typeColor: 'bg-sky-100 text-sky-800 border-sky-200',
      description: 'Integrates next 24h precipitation probability, solar radiance, and vapor pressure deficit to discount irrigation demands prior to incoming rain.'
    },
    {
      step: '5. Phenological Sensitivity Weighting',
      name: 'Crop Stress Estimation',
      type: 'Agronomic Biophysical Rules',
      typeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      description: 'Applies FAO-56 crop coefficient (Kc) curves. Flowering stages (Tomato) have zero stress tolerance compared to vegetative legumes (Groundnut).'
    },
    {
      step: '6. Expected Loss Matrix',
      name: 'Risk Engine',
      type: 'Risk Modeling & Decision Theory',
      typeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      description: 'Computes Expected Yield Loss = Stress Risk × Stage Sensitivity × Market Value Penalty if irrigation is withheld for 24h.'
    },
    {
      step: '7. Constrained Knapsack Allocation',
      name: 'Water Optimization',
      type: 'Constrained Mathematical Optimization',
      typeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      description: 'Solves limited reservoir allocation (e.g. 1,000 L) maximizing protected yield value, ensuring deficit irrigation is only applied where crops can tolerate it.'
    },
    {
      step: '8. Grid Schedule & Pump Constraints',
      name: 'Decision Engine & Contingency Logic',
      type: 'Constraint Satisfaction Rules',
      typeColor: 'bg-stone-200 text-stone-800 border-stone-300',
      description: 'Maps allocation to physical pump delivery rates and electricity grid availability windows, proposing feasible contingency hours (e.g., 7 AM instead of 6 PM).'
    },
    {
      step: '9. Transparent Feature Attribution',
      name: 'Explainable Recommendation',
      type: 'Transparent Feature Attribution',
      typeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      description: 'Generates understandable factor weights and natural evidence chips for the farmer without black-box obfuscation.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="bg-linear-to-r from-stone-900 via-indigo-950 to-stone-900 text-white p-6 border-b border-indigo-900/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-300">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold font-serif text-white">
                  Technical Architecture & Decision Pipeline
                </h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-indigo-500/30 text-indigo-200 border border-indigo-400/40">
                  Judges Section
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                Transparent system breakdown: Honesty in AI vs Deterministic Rules vs Optimization
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 text-xs text-stone-700 leading-relaxed flex items-center justify-between gap-4">
            <div>
              <span className="font-bold text-stone-900">Engineering Philosophy: </span>
              We deliberately avoid black-box neural networks for core life-or-death irrigation decisions. Instead, AgriTrust integrates statistical anomaly isolation, agronomic biophysical models (FAO-56), and constrained mathematical optimization with full explainability.
            </div>
            <div className="hidden sm:flex shrink-0 gap-2">
              <span className="px-2 py-1 bg-white border border-stone-300 rounded-md text-[10px] font-bold text-stone-600">
                100% Deterministic & Auditable
              </span>
            </div>
          </div>

          {/* Pipeline Cards with flow arrows */}
          <div className="space-y-3 pt-2">
            {pipeline.map((item, idx) => (
              <React.Fragment key={idx}>
                <div className="bg-white rounded-2xl p-4 border border-stone-200 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-stone-400">{item.step}</span>
                      <h4 className="text-sm font-bold text-stone-900">{item.name}</h4>
                    </div>
                    <p className="text-xs text-stone-600 max-w-xl">{item.description}</p>
                  </div>
                  <div className="shrink-0">
                    <span className={`inline-block text-xs px-2.5 py-1 rounded-full border font-semibold ${item.typeColor}`}>
                      {item.type}
                    </span>
                  </div>
                </div>

                {idx < pipeline.length - 1 && (
                  <div className="flex justify-center -my-1">
                    <div className="w-5 h-5 rounded-full bg-stone-100 border border-stone-300 flex items-center justify-center text-stone-400">
                      <ArrowDown className="w-3 h-3" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
          <span>Ready for hardware gateway integration via MQTT / HTTP JSON payloads.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-900 text-white font-medium hover:bg-stone-800 transition-colors"
          >
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  );
};
