import React from 'react';
import { useFarm } from '../../context/FarmContext';
import { FieldVisualizer } from '../common/FieldVisualizer';
import {
  Droplets,
  CloudRain,
  Sprout,
  Activity,
  ArrowRight,
  CheckCircle2,
  XCircle,
  PlayCircle,
  Sparkles
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActivePage, setIsJudgeTourOpen, applyJudgeScenarioStep, t } = useFarm();

  const pillars = [
    {
      title: t('soilIntelligence'),
      icon: Sprout,
      desc: t('soilIntelDesc'),
      highlight: t('27% Soil Moisture')
    },
    {
      title: t('weatherIntelligence'),
      icon: CloudRain,
      desc: t('weatherIntelDesc'),
      highlight: t('18% Rain Probability')
    },
    {
      title: t('cropHealthStage'),
      icon: Activity,
      desc: t('cropHealthDesc'),
      highlight: t('Critical Flowering')
    },
    {
      title: t('waterAvailability'),
      icon: Droplets,
      desc: t('waterAvailDesc'),
      highlight: t('2,000 L Reservoir')
    }
  ];

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-10">
        <div className="text-center max-w-3xl mx-auto space-y-5 px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-wide uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('nextGenBadge')}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-stone-950 tracking-tight leading-[1.1] font-serif">
            {t('smarterWaterDecisions')} <br />
            <span className="bg-linear-to-r from-emerald-700 via-teal-600 to-emerald-800 bg-clip-text text-transparent">
              {t('healthierCrops')}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
            {t('subHero')}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setActivePage('dashboard')}
              className="px-6 py-3.5 rounded-2xl bg-emerald-800 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-900/20 hover:bg-emerald-700 hover:scale-102 transition-all flex items-center gap-2"
            >
              <span>{t('openFarmDashboard')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                applyJudgeScenarioStep(0);
                setIsJudgeTourOpen(true);
              }}
              className="px-6 py-3.5 rounded-2xl bg-white text-stone-800 font-bold text-sm sm:text-base border border-stone-300 shadow-xs hover:bg-stone-50 hover:border-stone-400 transition-all flex items-center gap-2"
            >
              <PlayCircle className="w-4 h-4 text-emerald-700" />
              <span>{t('seeHowItWorks')}</span>
            </button>
          </div>

          {/* Core differentiator ticker */}
          <div className="pt-4 flex items-center justify-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-wider">
            <span className="text-emerald-700">{t('flowWater')}</span>
            <span>&rarr;</span>
            <span className="text-amber-600">{t('flowRisk')}</span>
            <span>&rarr;</span>
            <span className="text-teal-700">{t('flowPriority')}</span>
            <span>&rarr;</span>
            <span className="text-stone-900">{t('flowAction')}</span>
          </div>
        </div>

        {/* Hero Visual: Interactive Live Zone Map */}
        <div className="mt-10 max-w-5xl mx-auto px-4">
          <FieldVisualizer interactive={true} />
        </div>
      </section>

      {/* The Four Pillars */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Four Core Pillars
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
            Holistic Agro-Intelligence Engine
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Every recommendation is calculated from multi-dimensional cross-verified signals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-stone-900 tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {pillar.desc}
                </p>
                <div className="pt-2 border-t border-stone-100">
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50/80 px-2 py-0.5 rounded-md">
                    {pillar.highlight}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Comparison: Why AgriTrust is Different */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-10 border border-stone-800 shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              The Real-World Difference
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white">
              Why AgriTrust is Different
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm">
              Most smart farming dashboards break down the moment water is scarce or hardware malfunctions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Standard Systems */}
            <div className="bg-stone-800/60 rounded-2xl p-6 border border-rose-900/40 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  <XCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-200 uppercase tracking-wider">
                    Normal Smart Systems
                  </h4>
                  <p className="text-xs text-rose-400 font-semibold italic">
                    "When should I irrigate?"
                  </p>
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-stone-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-0.5">✕</span>
                  <span>Assumes unlimited reservoir water exists</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-0.5">✕</span>
                  <span>Blindly trusts single sensor readings (even if faulty)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-0.5">✕</span>
                  <span>Irrigates regardless of upcoming thunderstorm</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-0.5">✕</span>
                  <span>Treats all crops identically under water shortages</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-0.5">✕</span>
                  <span>Offers no alternative when grid power is cut</span>
                </li>
              </ul>
            </div>

            {/* AgriTrust */}
            <div className="bg-emerald-950/40 rounded-2xl p-6 border border-emerald-500/40 space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-500 text-emerald-950 text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-xl">
                AgriTrust Advantage
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">
                    AgriTrust Decision Intelligence
                  </h4>
                  <p className="text-xs text-emerald-400 font-semibold italic">
                    "Which action minimizes crop risk with the water I actually have?"
                  </p>
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-stone-200">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5 font-bold">✓</span>
                  <span>Optimizes limited water (500L - 5000L) by yield loss impact</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5 font-bold">✓</span>
                  <span>Cross-validates sensors to catch anomalies (e.g. 85% false wet)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5 font-bold">✓</span>
                  <span>Adapts to forecasted rain, saving water and preventing rot</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5 font-bold">✓</span>
                  <span>Flowering tomato gets protected; resilient groundnut delayed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5 font-bold">✓</span>
                  <span>Provides contingency actions when power windows clash</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-800 text-xs">
            <span className="text-stone-400">
              Tested on 3 micro-climate testbeds: Sandy Loam, Red Loam, Sandy Clay.
            </span>
            <button
              onClick={() => setActivePage('simulator')}
              className="text-emerald-400 font-bold hover:text-emerald-300 flex items-center gap-1.5"
            >
              <span>Test The Water Allocation Simulator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Philosophy Banner */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-linear-to-r from-emerald-50 via-teal-50 to-emerald-50 p-8 rounded-3xl border border-emerald-200/80 shadow-xs space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-800">
            Guiding Decision Philosophy
          </p>
          <blockquote className="text-xl sm:text-2xl font-serif font-bold text-stone-900 leading-snug">
            "Most systems ask: <span className="text-stone-500">WHEN should I irrigate?</span><br />
            AgriTrust asks: <span className="text-emerald-800">WHAT is the safest action with the water, time and information I actually have?</span>"
          </blockquote>
          <p className="text-xs text-stone-500 font-mono">
            AgriTrust Decision Intelligence Engine • Hackathon 2026
          </p>
        </div>
      </section>
    </div>
  );
};
