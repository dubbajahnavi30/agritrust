import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import { cropsCatalog } from '../../data/cropsCatalog';
import { CropGrowthStage } from '../../types';
import {
  X,
  Sprout,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const CropSelectorModal: React.FC = () => {
  const {
    isCropModalOpen,
    setIsCropModalOpen,
    targetFieldForCropChange,
    fields,
    changeFieldCrop,
    t
  } = useFarm();

  const initialFieldId = targetFieldForCropChange || 'field-a';
  const currentField = fields.find((f) => f.id === initialFieldId);
  const initialCrop = cropsCatalog.find((c) => c.name.toLowerCase() === currentField?.cropName.toLowerCase()) || cropsCatalog[0];

  const [selectedFieldId, setSelectedFieldId] = useState<string>(initialFieldId);
  const [selectedCropId, setSelectedCropId] = useState<string>(initialCrop.id);
  const [selectedStage, setSelectedStage] = useState<CropGrowthStage>(currentField?.stage || 'Flowering');
  const [selectedVariety, setSelectedVariety] = useState<string>(currentField?.cropVariety || initialCrop.varieties[0]);

  if (!isCropModalOpen) return null;

  const activeCropData = cropsCatalog.find((c) => c.id === selectedCropId) || cropsCatalog[0];

  const handleFieldChange = (fieldId: string) => {
    setSelectedFieldId(fieldId);
    const f = fields.find((item) => item.id === fieldId);
    if (f) {
      const match = cropsCatalog.find((c) => c.name.toLowerCase() === f.cropName.toLowerCase()) || cropsCatalog[0];
      setSelectedCropId(match.id);
      setSelectedStage(f.stage);
      setSelectedVariety(f.cropVariety || match.varieties[0]);
    }
  };

  const handleCropChange = (cropId: string) => {
    setSelectedCropId(cropId);
    const crop = cropsCatalog.find((c) => c.id === cropId) || cropsCatalog[0];
    setSelectedVariety(crop.varieties[0]);
    if (!crop.stages.includes(selectedStage)) {
      setSelectedStage(crop.stages[0]);
    }
  };

  const handleApply = () => {
    changeFieldCrop(selectedFieldId, selectedCropId, selectedVariety, selectedStage);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-emerald-900 via-teal-900 to-stone-900 text-white p-5 sm:p-6 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <Sprout className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                {t('cropSelectorTitle')}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
              Configure Crop & Growth Stage
            </h3>
            <p className="text-xs text-stone-300 max-w-xl">
              {t('cropSelectorSub')}
            </p>
          </div>

          <button
            onClick={() => setIsCropModalOpen(false)}
            className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* 1. Field Selection Row */}
          <div>
            <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2">
              1. {t('selectField')}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {fields.map((f) => (
                <button
                  key={f.id}
                  onClick={() => handleFieldChange(f.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    selectedFieldId === f.id
                      ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20'
                      : 'bg-stone-50 border-stone-200 hover:bg-white'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-mono text-stone-500 block">ZONE {f.id.split('-')[1].toUpperCase()}</span>
                    <span className="text-sm font-bold text-stone-900 block">{f.name}</span>
                    <span className="text-xs text-emerald-700 font-medium">Currently: {f.cropName} ({f.stage})</span>
                  </div>
                  {selectedFieldId === f.id && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Choose Crop from Catalogue */}
          <div>
            <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2">
              2. {t('selectCrop')} (10 Agronomic Presets)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {cropsCatalog.map((crop) => {
                const isSelected = selectedCropId === crop.id;
                return (
                  <button
                    key={crop.id}
                    onClick={() => handleCropChange(crop.id)}
                    className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between h-36 ${
                      isSelected
                        ? 'bg-emerald-50/80 border-emerald-600 ring-2 ring-emerald-600/20 shadow-xs'
                        : 'bg-stone-50 border-stone-200 hover:bg-white hover:border-stone-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-stone-200 text-stone-700 font-medium">
                          {crop.category}
                        </span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                      </div>
                      <h4 className="text-sm font-bold text-stone-900 leading-tight">
                        {t(crop.name)}
                      </h4>
                      <p className="text-[10px] text-stone-500 italic truncate mt-0.5">
                        {crop.scientificName}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-stone-200/80 text-[10px] space-y-0.5">
                      <div className="flex justify-between text-stone-600">
                        <span>{t('Target')}:</span>
                        <span className="font-bold">{crop.optimalMoistureMin}%–{crop.optimalMoistureMax}%</span>
                      </div>
                      <div className="flex justify-between text-sky-800 font-bold">
                        <span>{t('Water')}:</span>
                        <span>{crop.baseWaterNeedLiters} L</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Growth Stage & Variety */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-stone-50 p-4 rounded-2xl border border-stone-200">
            <div>
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-1.5">
                3. {t('selectStage')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {activeCropData.stages.map((stg) => (
                  <button
                    key={stg}
                    onClick={() => setSelectedStage(stg)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border text-center transition-all ${
                      selectedStage === stg
                        ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                        : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {t(stg)}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-stone-500 mt-2">
                Flowering and reproductive stages have higher biophysical sensitivity to water deficits.
              </p>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-1.5">
                4. Crop Variety / Hybrid
              </label>
              <select
                value={selectedVariety}
                onChange={(e) => setSelectedVariety(e.target.value)}
                className="w-full text-xs font-bold p-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 mb-2 focus:outline-hidden focus:border-emerald-500"
              >
                {activeCropData.varieties.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>

              <div className="bg-white p-3 rounded-xl border border-stone-200 text-xs text-stone-600 leading-snug">
                <span className="font-bold text-stone-900 block mb-0.5">Agronomic Note:</span>
                {activeCropData.description}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 flex items-center justify-between">
          <button
            onClick={() => setIsCropModalOpen(false)}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:text-stone-900"
          >
            {t('cancel')}
          </button>

          <button
            onClick={handleApply}
            className="px-5 py-2.5 rounded-xl bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-xs"
          >
            <span>{t('applyChanges')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
