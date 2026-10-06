import React from 'react';
import { useFarm } from '../../context/FarmContext';
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area
} from 'recharts';

export const WeatherIntelligencePage: React.FC = () => {
  const { weather, rainCondition, setRainCondition } = useFarm();

  const impactData = {
    none: {
      effect: 'LOW',
      effectColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      recommendation: 'Proceed with planned irrigation. Natural rainfall will not recharge the root zone.',
      actionDetail: 'Apply 550 L to Field A; evaporative loss is high at 34°C.'
    },
    light: {
      effect: 'MODERATE',
      effectColor: 'bg-amber-100 text-amber-800 border-amber-300',
      recommendation: 'Trim irrigation dosage by ~30%. Rainfall will partially supplement root zones.',
      actionDetail: 'Field A receives 385 L defensive pulse; Chilli irrigation delayed.'
    },
    heavy: {
      effect: 'CRITICAL / BENEFICIAL',
      effectColor: 'bg-sky-100 text-sky-800 border-sky-300',
      recommendation: 'Delay or cancel planned irrigation. Heavy precipitation arriving in 12 hours.',
      actionDetail: 'Groundnut skips completely; Chilli delayed to harvest incoming rainwater.'
    }
  }[rainCondition];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Microclimate Radar & Forecast
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif mt-1">
            Weather Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Atmospheric moisture demand, precipitation probability, and wind evaporation indexing.
          </p>
        </div>

        {/* Quick Weather Simulator Switch */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-500 font-semibold hidden sm:inline">Scenario:</span>
          <div className="flex bg-stone-100 p-1 rounded-2xl border border-stone-200">
            {(['none', 'light', 'heavy'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setRainCondition(mode)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                  rainCondition === mode
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {mode === 'none' ? 'Clear (18%)' : mode === 'light' ? 'Light (50%)' : 'Heavy (85%)'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Weather Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-stone-400 block">Temperature</span>
          <span className="text-2xl font-extrabold text-stone-900 font-mono">{weather.temperatureC}°C</span>
          <span className="text-[10px] text-amber-600 block mt-0.5">Heat Stress High</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-stone-400 block">Humidity</span>
          <span className="text-2xl font-extrabold text-stone-900 font-mono">{weather.humidityPercent}%</span>
          <span className="text-[10px] text-stone-500 block mt-0.5">Dry Canopy Air</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-stone-400 block">Rain Probability</span>
          <span className="text-2xl font-extrabold text-sky-700 font-mono">{weather.rainProbabilityPercent}%</span>
          <span className="text-[10px] text-stone-500 block mt-0.5">Next 24 Hours</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-stone-400 block">Expected Rain</span>
          <span className="text-2xl font-extrabold text-stone-900 font-mono">{weather.expectedRainfallMm} mm</span>
          <span className="text-[10px] text-stone-500 block mt-0.5">Depth Equiv</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-stone-400 block">Wind Speed</span>
          <span className="text-2xl font-extrabold text-stone-900 font-mono">{weather.windSpeedKmh} km/h</span>
          <span className="text-[10px] text-stone-500 block mt-0.5">Breeze</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-stone-400 block">ET0 Demand</span>
          <span className="text-2xl font-extrabold text-emerald-800 font-mono">{weather.evapotranspirationMmDay} mm</span>
          <span className="text-[10px] text-stone-500 block mt-0.5">Daily Loss</span>
        </div>
      </div>

      {/* Expected Weather Impact on Irrigation Section */}
      <div className="bg-linear-to-r from-emerald-950 via-teal-950 to-stone-950 text-white rounded-3xl p-6 sm:p-8 border border-emerald-900 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-emerald-800/50">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">
              Irrigation Weather Impact Analysis
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-white mt-0.5">
              How Today's Weather Shapes The Decision
            </h3>
          </div>
          <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase border ${impactData.effectColor}`}>
            Impact Effect: {impactData.effect}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-stone-900/80 p-4 rounded-2xl border border-stone-700 space-y-1">
            <span className="text-stone-400 font-semibold block">Precipitation Chance</span>
            <span className="text-xl font-bold text-sky-400 font-mono">{weather.rainProbabilityPercent}%</span>
            <p className="text-stone-300">{weather.expectedRainfallMm} mm expected volume</p>
          </div>

          <div className="bg-stone-900/80 p-4 rounded-2xl border border-stone-700 space-y-1">
            <span className="text-stone-400 font-semibold block">Atmospheric Loss</span>
            <span className="text-xl font-bold text-amber-400 font-mono">5.6 mm / day</span>
            <p className="text-stone-300">Dry wind accelerates topsoil evaporation</p>
          </div>

          <div className="bg-stone-900/80 p-4 rounded-2xl border border-stone-700 space-y-1">
            <span className="text-stone-400 font-semibold block">System Recommendation</span>
            <span className="text-sm font-bold text-emerald-300 block">{impactData.recommendation}</span>
            <p className="text-stone-300 mt-1">{impactData.actionDetail}</p>
          </div>
        </div>
      </div>

      {/* 24-Hour Timeline Chart */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-stone-100">
          <div>
            <h3 className="text-base font-bold text-stone-900 font-serif">
              24-Hour Hourly Forecast Timeline
            </h3>
            <p className="text-xs text-stone-500">
              Temperature trajectory (°C) vs Rainfall probability (%)
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-stone-600">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Temp (°C)
            </span>
            <span className="flex items-center gap-1.5 text-stone-600">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500" /> Rain Prob (%)
            </span>
          </div>
        </div>

        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weather.forecast24h} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="hour" stroke="#78716c" fontSize={11} tickLine={false} />
              <YAxis stroke="#78716c" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1c1917', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
              />
              <Area type="monotone" dataKey="temp" stroke="#f59e0b" strokeWidth={2.5} fill="url(#tempGradient)" name="Temp (°C)" />
              <Area type="monotone" dataKey="rainProb" stroke="#0284c7" strokeWidth={2.5} fill="url(#rainGradient)" name="Rain Chance (%)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
