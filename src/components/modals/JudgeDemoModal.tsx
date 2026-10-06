import React, { useState, useEffect } from 'react';
import { useFarm } from '../../context/FarmContext';
import {
  X,
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

export const JudgeDemoModal: React.FC = () => {
  const {
    isJudgeTourOpen,
    setIsJudgeTourOpen,
    judgeTourStep,
    applyJudgeScenarioStep,
    availableWater,
    rainCondition,
    tomatoAnomalyActive
  } = useFarm();

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const steps = [
    {
      title: '1. Baseline Farm State (2,000 L Reservoir)',
      subtitle: 'Ample water scenario on Green Valley Farm',
      content:
        'We begin with 2,000 L available in the farm reservoir. All 3 fields (Tomato, Chilli, Groundnut) have their full water requirement fulfilled. No immediate constraint crisis.',
      actionLabel: 'Setup baseline (2,000 L)',
      targetPage: 'Farmer Dashboard'
    },
    {
      title: '2. Review Three Diverse Crop Zones',
      subtitle: 'Different stages, soil types, and economic stakes',
      content:
        'Field A (Tomato) is Flowering (highest risk of flower abortion). Field B (Chilli) is Vegetative (moderate resilience). Field C (Groundnut) is Vegetative with drought-tolerant taproots.',
      actionLabel: 'Inspect 3 field zones',
      targetPage: 'Field Intelligence'
    },
    {
      title: '3. Multi-Factor Crop Stress Estimation',
      subtitle: 'Why standard timers fail farmers',
      content:
        'Standard timers treat all crops equally. AgriTrust calculates water stress, heat stress (34°C air temp), and critical growth stage sensitivity to rank economic loss severity.',
      actionLabel: 'Evaluate crop stress indices',
      targetPage: 'Crop Health'
    },
    {
      title: '4. Resource Shock: Reservoir Drops to 1,000 L',
      subtitle: 'Simulating severe irrigation water deficit',
      content:
        'Watch what happens when available water is reduced to 1,000 L (drought or low canal release). Standard irrigation systems either shut off or deliver equal fractional water to everyone.',
      actionLabel: 'Reduce water to 1,000 L',
      targetPage: 'Water Simulator'
    },
    {
      title: '5. Automatic Risk-First Reprioritization',
      subtitle: 'Protecting the highest-value, highest-risk crop',
      content:
        'AgriTrust automatically allocates 100% of Tomato’s 550 L need to prevent total yield collapse. Chilli receives deficit irrigation (350 L). Groundnut is skipped without harm due to high drought buffer.',
      actionLabel: 'Verify reallocation chart',
      targetPage: 'Water Simulator'
    },
    {
      title: '6. Unexpected Weather Shock: Rain Forecast',
      subtitle: 'Sudden rainstorm arriving in 12 hours (85% prob, 28mm)',
      content:
        'Now simulate sudden monsoon/rainfall forecast. Why waste limited reservoir water or drown roots right before a storm?',
      actionLabel: 'Toggle Heavy Rain Forecast',
      targetPage: 'Water Simulator'
    },
    {
      title: '7. Dynamic Weather Adaptive Actions',
      subtitle: 'Groundnut skips, Chilli delays, Tomato monitors',
      content:
        'Irrigation recommendations instantly adapt: Groundnut skips completely, Chilli delays to harvest natural rainfall, preserving water and saving farm pumping power.',
      actionLabel: 'Review updated recommendations',
      targetPage: 'Recommendations'
    },
    {
      title: '8. Faulty Sensor Injection: Tomato Reads 85% Wet',
      subtitle: 'Simulating broken, short-circuited, or puddled soil probe',
      content:
        'A rogue sensor in Tomato Field A suddenly reports 85% moisture (saturated wet). A normal smart farm would stop irrigation and let the tomatoes desiccate in the 34°C heat.',
      actionLabel: 'Inject 85% sensor fault',
      targetPage: 'Sensor Reliability'
    },
    {
      title: '9. Cross-Validation & Anomaly Detection',
      subtitle: 'Physical balance & neighbor cross-correlation',
      content:
        'AgriTrust cross-references dry air (34°C, 42% humidity), zero rain, and adjacent fields (34% and 42%). It flags an anomaly, penalizes sensor confidence, and prevents crop failure.',
      actionLabel: 'Examine cross-validation diagnostics',
      targetPage: 'Sensor Reliability'
    },
    {
      title: '10. Transparent Explainable Decision',
      subtitle: 'Water → Risk → Priority → Action',
      content:
        'The farmer sees clear, transparent reasoning with factor weights, confidence scores, and contingency actions for power cuts. Not a black-box AI.',
      actionLabel: 'View explainable breakdown',
      targetPage: 'Decision Logic'
    }
  ];

  const currentStepData = steps[judgeTourStep] || steps[0];

  // Auto-play timer
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isPlaying && isJudgeTourOpen) {
      timer = setInterval(() => {
        if (judgeTourStep < steps.length - 1) {
          const next = judgeTourStep + 1;
          applyJudgeScenarioStep(next);
        } else {
          setIsPlaying(false);
        }
      }, 7000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, isJudgeTourOpen, judgeTourStep, steps.length, applyJudgeScenarioStep]);

  if (!isJudgeTourOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden">
        {/* Top Header */}
        <div className="bg-linear-to-r from-emerald-900 via-teal-900 to-stone-900 text-white p-5 sm:p-6 relative">
          <button
            onClick={() => {
              setIsPlaying(false);
              setIsJudgeTourOpen(false);
            }}
            className="absolute top-5 right-5 p-1 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold tracking-wide uppercase">
              Hackathon Evaluation Tour (90s)
            </span>
            <span className="text-xs text-stone-300">
              Step {judgeTourStep + 1} of {steps.length}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold tracking-tight font-serif text-white">
            {currentStepData.title}
          </h3>
          <p className="text-stone-300 text-xs sm:text-sm mt-1">
            {currentStepData.subtitle}
          </p>

          {/* Progress bar */}
          <div className="mt-4 w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-400 h-full transition-all duration-300 ease-out"
              style={{ width: `${((judgeTourStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-stone-700 text-sm leading-relaxed">
            {currentStepData.content}
          </div>

          {/* Live System State Indicators in modal */}
          <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
            <div className="bg-stone-100 rounded-xl p-2.5 border border-stone-200">
              <span className="text-stone-500 block text-[10px] font-semibold uppercase">Water Budget</span>
              <span className="font-bold text-sky-700 text-sm">{availableWater.toLocaleString()} L</span>
            </div>
            <div className="bg-stone-100 rounded-xl p-2.5 border border-stone-200">
              <span className="text-stone-500 block text-[10px] font-semibold uppercase">Rain Scenario</span>
              <span className="font-bold text-stone-800 text-sm capitalize">{rainCondition} Rain</span>
            </div>
            <div className="bg-stone-100 rounded-xl p-2.5 border border-stone-200">
              <span className="text-stone-500 block text-[10px] font-semibold uppercase">Sensor Status</span>
              <span className={`font-bold text-sm ${tomatoAnomalyActive ? 'text-rose-600' : 'text-emerald-700'}`}>
                {tomatoAnomalyActive ? 'Anomaly Flagged' : 'Reliable'}
              </span>
            </div>
          </div>

          {/* Core differentiator callout banner */}
          <div className="bg-emerald-50 rounded-2xl p-3.5 border border-emerald-200 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-900 leading-snug">
              <span className="font-bold block">Key Hackathon Takeaway:</span>
              "AgriTrust does not simply predict irrigation. It decides how to act under uncertainty and resource constraints."
            </div>
          </div>
        </div>

        {/* Footer controls */}
        <div className="p-4 sm:p-5 bg-stone-100 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
          {/* Auto play toggle */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              isPlaying
                ? 'bg-amber-100 border-amber-300 text-amber-900'
                : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause Autoplay' : 'Autoplay Demo'}</span>
          </button>

          {/* Navigation buttons */}
          <div className="flex items-center gap-2">
            <button
              disabled={judgeTourStep === 0}
              onClick={() => applyJudgeScenarioStep(judgeTourStep - 1)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold border border-stone-300 bg-white text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            {judgeTourStep < steps.length - 1 ? (
              <button
                onClick={() => applyJudgeScenarioStep(judgeTourStep + 1)}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-600 shadow-xs transition-all"
              >
                <span>Next Step</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsPlaying(false);
                  setIsJudgeTourOpen(false);
                }}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-600 shadow-xs transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Finish Tour</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
