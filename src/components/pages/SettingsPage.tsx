import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import { supportedLanguages } from '../../i18n/translations';
import {
  Wifi,
  WifiOff,
  Code,
  RotateCcw,
  Globe,
  Check
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const {
    constraints,
    setConstraints,
    isOffline,
    setIsOffline,
    isTechnicalView,
    setIsTechnicalView,
    resetToDefaultDemo,
    syncNow,
    language,
    setLanguage,
    t
  } = useFarm();

  const [savedNotice, setSavedNotice] = useState<boolean>(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            {t('System Configuration')}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif mt-1">
            {t('settingsTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            {t('settingsSub')}
          </p>
        </div>

        <button
          onClick={resetToDefaultDemo}
          className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{t('resetDefaults')}</span>
        </button>
      </div>

      {/* Language Selection Card */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-700" />
            <h3 className="text-base font-bold text-stone-900 font-serif">
              {t('selectLanguage')} ({t('languageLabel')})
            </h3>
          </div>
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            {supportedLanguages.find((l) => l.code === language)?.nativeName}
          </span>
        </div>
        <p className="text-xs text-stone-500">
          {t('Choose your preferred language. The entire website interface, terminology, and recommendations will adapt instantly.')}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 pt-1">
          {supportedLanguages.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => setLanguage(lang.code)}
                className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-xs ring-2 ring-emerald-600/30'
                    : 'border-stone-200 bg-stone-50/70 hover:bg-stone-100 text-stone-700'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-lg">{lang.flag}</span>
                  <div className="min-w-0">
                    <span className="text-xs block font-bold truncate">{lang.nativeName}</span>
                    <span className="text-[10px] text-stone-400 block truncate">{lang.name}</span>
                  </div>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 ml-1" />}
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Farm Metadata & Boundaries */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-stone-900 font-serif pb-2 border-b border-stone-100">
            {t('Farm Identity & Plot Geometry')}
          </h3>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Farm Name
            </label>
            <input
              type="text"
              defaultValue="Green Valley Farm"
              className="w-full text-xs font-medium p-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 focus:outline-hidden focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Total Cultivated Area
              </label>
              <input
                type="text"
                defaultValue="4.2 Hectares"
                className="w-full text-xs font-medium p-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Active Production Zones
              </label>
              <input
                type="text"
                defaultValue="3 Fields (Tomato, Chilli, Groundnut)"
                disabled
                className="w-full text-xs font-medium p-3 rounded-xl border border-stone-200 bg-stone-100 text-stone-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Daily Water Allocation Ceiling (Budget Cap)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={constraints.maxDailyWaterBudgetLiters}
                onChange={(e) =>
                  setConstraints((prev) => ({
                    ...prev,
                    maxDailyWaterBudgetLiters: Number(e.target.value)
                  }))
                }
                className="w-full text-xs font-mono font-bold p-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900"
              />
              <span className="text-xs font-bold text-stone-500">Liters</span>
            </div>
          </div>
        </div>

        {/* Pump & Grid Electricity Constraints */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-stone-900 font-serif pb-2 border-b border-stone-100">
            Pump Mechanics & Grid Power Limits
          </h3>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Drip Irrigation Pump Rate
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={constraints.pumpCapacityLitersPerMin}
                onChange={(e) =>
                  setConstraints((prev) => ({
                    ...prev,
                    pumpCapacityLitersPerMin: Number(e.target.value)
                  }))
                }
                className="w-full text-xs font-mono font-bold p-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900"
              />
              <span className="text-xs font-bold text-stone-500">L/min</span>
            </div>
            <p className="text-[10px] text-stone-400 mt-1">
              Used to calculate exact valve opening runtime minutes.
            </p>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Electricity Grid Schedule (Power Windows)
            </label>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
                <span>Morning Power Window:</span>
                <span className="font-bold text-stone-900">07:00 AM – 09:00 AM</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
                <span>Evening Power Window:</span>
                <span className="font-bold text-stone-900">06:00 PM – 10:00 PM</span>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Preferred Irrigation Window
            </label>
            <select
              value={constraints.preferredIrrigationWindow}
              onChange={(e) =>
                setConstraints((prev) => ({
                  ...prev,
                  preferredIrrigationWindow: e.target.value as any
                }))
              }
              className="w-full text-xs font-semibold p-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900"
            >
              <option value="Early Morning (5-8 AM)">Early Morning (5-8 AM)</option>
              <option value="Evening (5-8 PM)">Evening (5-8 PM) [Optimal Low Evaporation]</option>
              <option value="Night (8-11 PM)">Night (8-11 PM)</option>
            </select>
          </div>
        </div>

        {/* Connectivity & Offline Operating Parameters */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-stone-900 font-serif pb-2 border-b border-stone-100">
            Connectivity & Edge Sync Modes
          </h3>

          <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl border border-stone-200">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-stone-900 block flex items-center gap-1.5">
                {isOffline ? <WifiOff className="w-4 h-4 text-amber-600" /> : <Wifi className="w-4 h-4 text-emerald-600" />}
                <span>Simulated Offline Mode</span>
              </span>
              <p className="text-[11px] text-stone-500">
                {isOffline
                  ? 'Currently disconnected. System relies on cached edge state.'
                  : 'Online with continuous gateway polling.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsOffline(!isOffline);
                if (isOffline) syncNow();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                isOffline ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-emerald-100 text-emerald-900 border-emerald-300'
              }`}
            >
              {isOffline ? 'Go Online' : 'Simulate Offline'}
            </button>
          </div>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600">
            <span className="font-bold text-stone-800">Edge Offline Policy: </span>
            In low-connectivity mode, decisions execute using the last verified 24h soil moisture curve and local micro-controller memory without requiring external cloud endpoints.
          </div>
        </div>

        {/* Language & Technical Exposition Toggle */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-stone-900 font-serif pb-2 border-b border-stone-100">
            Farmer vs Engineering View
          </h3>

          <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl border border-stone-200">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-stone-900 block flex items-center gap-1.5">
                <Code className="w-4 h-4 text-indigo-600" />
                <span>Technical & Hackathon Exposition Mode</span>
              </span>
              <p className="text-[11px] text-stone-500">
                Shows mathematical formulations, FAO-56 curves, and Bayesian trust tags.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsTechnicalView(!isTechnicalView)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                isTechnicalView ? 'bg-indigo-100 text-indigo-900 border-indigo-300' : 'bg-stone-200 text-stone-800'
              }`}
            >
              {isTechnicalView ? 'Active' : 'Disabled'}
            </button>
          </div>

          <div className="pt-2 flex items-center justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-700 transition-colors shadow-xs"
            >
              Save Configuration
            </button>
          </div>

          {savedNotice && (
            <div className="p-3 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-bold text-center">
              ✓ Farm profile and constraints updated successfully!
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
