import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import { supportedLanguages } from '../../i18n/translations';
import {
  ShieldCheck,
  PlayCircle,
  Wifi,
  WifiOff,
  Code,
  RotateCcw,
  Menu,
  X,
  Sprout,
  Globe,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  onOpenMobileMenu?: () => void;
  mobileMenuOpen?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenMobileMenu, mobileMenuOpen }) => {
  const {
    language,
    setLanguage,
    t,
    openCropModalForField,
    isOffline,
    setIsOffline,
    isTechnicalView,
    setIsTechnicalView,
    setIsJudgeTourOpen,
    applyJudgeScenarioStep,
    resetToDefaultDemo,
    syncNow
  } = useFarm();

  const [langDropdownOpen, setLangDropdownOpen] = useState<boolean>(false);

  const currentLang = supportedLanguages.find((l) => l.code === language) || supportedLanguages[0];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Farm Identity */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 text-stone-600 hover:text-stone-900 rounded-lg focus:outline-hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-md shadow-emerald-700/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-emerald-950 font-serif">
                  {t('appName')}
                </span>
                <span className="hidden sm:inline-block text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Hackathon Edition
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-medium hidden md:block">
                {t('tagline')}
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls & Modes */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* LANGUAGE SWITCHER DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 shadow-2xs transition-all"
              title={t('selectLanguage')}
            >
              <span>{currentLang.flag}</span>
              <span className="hidden sm:inline">{currentLang.nativeName}</span>
              <ChevronDown className="w-3 h-3 text-stone-500" />
            </button>

            {langDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setLangDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 z-50 w-44 bg-white rounded-2xl shadow-xl border border-stone-200 py-1.5 divide-y divide-stone-100">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Globe className="w-3 h-3 text-stone-500" />
                    <span>{t('selectLanguage')}</span>
                  </div>
                  <div className="py-1">
                    {supportedLanguages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-1.5 text-xs text-left flex items-center justify-between hover:bg-emerald-50 transition-colors ${
                          language === lang.code
                            ? 'font-bold text-emerald-800 bg-emerald-50/60'
                            : 'text-stone-700'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.nativeName}</span>
                        </span>
                        <span className="text-[10px] text-stone-400 uppercase">{lang.code}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* FARMER CHOICE OF CROP SHORTCUT BUTTON */}
          <button
            onClick={() => openCropModalForField('field-a')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border border-emerald-300 bg-emerald-50/80 hover:bg-emerald-100 text-emerald-900 shadow-2xs transition-all"
            title="Configure farmer's choice of crop for fields"
          >
            <Sprout className="w-3.5 h-3.5 text-emerald-700" />
            <span className="hidden md:inline">{t('changeCropBtn')}</span>
          </button>

          {/* Sync / Offline status badge */}
          <button
            onClick={() => {
              setIsOffline(!isOffline);
              if (isOffline) syncNow();
            }}
            title={isOffline ? 'Currently Offline: Using last cached sensor telemetry' : 'Online: Connected to Gateway'}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
              isOffline
                ? 'bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-100'
                : 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            {isOffline ? (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden lg:inline">{t('offlineMode')}</span>
              </>
            ) : (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden lg:inline">{t('onlineSynced')}</span>
              </>
            )}
          </button>

          {/* Farmer vs Technical View Toggle */}
          <button
            onClick={() => setIsTechnicalView(!isTechnicalView)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              isTechnicalView
                ? 'bg-indigo-50 border-indigo-300 text-indigo-700 shadow-xs'
                : 'bg-stone-100 border-stone-200 text-stone-700 hover:bg-stone-200'
            }`}
            title="Toggle between Farmer-Friendly language and Engineering/Algorithm explanations"
          >
            <Code className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">
              {isTechnicalView ? `${t('technicalView')}: ON` : t('technicalView')}
            </span>
          </button>

          {/* Reset Demo State Button */}
          <button
            onClick={resetToDefaultDemo}
            className="p-1.5 text-stone-500 hover:text-stone-800 rounded-lg hover:bg-stone-100 transition-colors"
            title="Reset scenario to initial baseline"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* JUDGE DEMO MODE BUTTON */}
          <button
            onClick={() => {
              applyJudgeScenarioStep(0);
              setIsJudgeTourOpen(true);
            }}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold bg-linear-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-md shadow-emerald-700/25 hover:from-emerald-500 hover:to-teal-600 transition-all hover:scale-102 active:scale-98 animate-pulse-subtle"
          >
            <PlayCircle className="w-4 h-4 fill-white/20" />
            <span>{t('judgeDemo')}</span>
            <span className="hidden xl:inline text-[10px] bg-white/25 px-1.5 py-0.5 rounded-sm font-mono">
              90s
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
