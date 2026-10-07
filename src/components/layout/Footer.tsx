import React from 'react';
import { useFarm } from '../../context/FarmContext';
import { ShieldCheck, Award, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage, setIsJudgeTourOpen, applyJudgeScenarioStep, t } = useFarm();

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight font-serif">
                {t('appName')}
              </span>
            </div>
            <p className="text-sm text-stone-400 max-w-sm leading-relaxed">
              {t('subHero')}
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-700/50 text-emerald-300 text-xs font-semibold">
                <Award className="w-3.5 h-3.5" />
                <span>{t('Built for Smart Agriculture & Farming Hackathon')}</span>
              </div>
            </div>
          </div>

          {/* Core Problem */}
          <div>
            <h4 className="text-xs font-bold text-stone-200 uppercase tracking-wider mb-3">
              {t('The Real Problem')}
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>• {t('Limited reservoir water')}</li>
              <li>• {t('Faulty & uncalibrated sensors')}</li>
              <li>• {t('Grid power outage windows')}</li>
              <li>• {t('Sudden rainfall shifts')}</li>
              <li>• {t('High cost of flower abortion')}</li>
            </ul>
          </div>

          {/* Solution & Tech */}
          <div>
            <h4 className="text-xs font-bold text-stone-200 uppercase tracking-wider mb-3">
              {t('Solution Pillars')}
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => setActivePage('simulator')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  {t('navSimulator')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('explanation')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  {t('navExplanation')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('sensors')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  {t('navSensors')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('whatif')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  {t('navWhatIf')}
                </button>
              </li>
            </ul>
          </div>

          {/* Demo & Hackathon Links */}
          <div>
            <h4 className="text-xs font-bold text-stone-200 uppercase tracking-wider mb-3">
              {t('Hackathon Evaluation')}
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => {
                    applyJudgeScenarioStep(0);
                    setIsJudgeTourOpen(true);
                  }}
                  className="text-emerald-400 font-semibold hover:underline flex items-center gap-1"
                >
                  <span>{t('Launch 90s Judge Tour')}</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('dashboard')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {t('navDashboard')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('settings')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {t('navSettings')}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            &copy; 2026 AgriTrust Project. {t('All rights reserved.')}
          </div>
          <div className="italic text-stone-400 text-center sm:text-right">
            "{t('secondaryTagline')}"
          </div>
        </div>
      </div>
    </footer>
  );
};
