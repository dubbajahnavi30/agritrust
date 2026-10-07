import React from 'react';
import { useFarm } from '../../context/FarmContext';
import { ConfidenceMeter } from '../common/ConfidenceMeter';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Radio,
  CloudSun
} from 'lucide-react';

export const SensorReliabilityPage: React.FC = () => {
  const {
    tomatoAnomalyActive,
    setTomatoAnomalyActive,
    fields,
    isTechnicalView,
    t
  } = useFarm();

  const tomatoField = fields.find((f) => f.id === 'field-a') || fields[0];
  const moistureSensor = tomatoField.sensors.find((s) => s.type === 'soil_moisture') || tomatoField.sensors[0];
  const tempSensor = tomatoField.sensors.find((s) => s.type === 'temperature') || tomatoField.sensors[1];
  const humSensor = tomatoField.sensors.find((s) => s.type === 'humidity') || tomatoField.sensors[2];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            {t('navSensors')}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif mt-1">
            {t('Can We Trust The Data?')}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            {t('AgriTrust cross-validates hardware sensors against physical micro-climate models to detect broken or drifting probes.')}
          </p>
        </div>

        {/* Live Fault Injection Trigger */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTomatoAnomalyActive(!tomatoAnomalyActive)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border shadow-xs ${
              tomatoAnomalyActive
                ? 'bg-rose-600 text-white border-rose-700 hover:bg-rose-700'
                : 'bg-amber-500 text-stone-950 border-amber-600 hover:bg-amber-400'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>
              {tomatoAnomalyActive ? 'Reset: Remove 85% Fault' : 'Inject Fault: Tomato Reads 85%'}
            </span>
          </button>
        </div>
      </div>

      {/* Sensor Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Sensor 1: Soil Moisture */}
        <div
          className={`bg-white rounded-3xl p-6 border shadow-xs transition-all ${
            tomatoAnomalyActive
              ? 'border-rose-400 ring-2 ring-rose-500/20 bg-rose-50/20'
              : 'border-stone-200 hover:border-emerald-300'
          }`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-2xl bg-sky-50 text-sky-700 border border-sky-100">
              <Activity className="w-5 h-5" />
            </div>
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase ${
                tomatoAnomalyActive
                  ? 'bg-rose-100 text-rose-800 border border-rose-300'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              }`}
            >
              {tomatoAnomalyActive ? 'Anomaly Detected' : 'Status: Reliable'}
            </span>
          </div>

          <h3 className="text-base font-bold text-stone-900">
            Soil Moisture Sensor (Field A)
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">Capacitive Depth Probe A1</p>

          <div className="my-4 py-3 px-4 bg-stone-50 rounded-2xl border border-stone-100 flex items-baseline justify-between">
            <span className="text-xs text-stone-500">Telemetry Value:</span>
            <span
              className={`text-2xl font-extrabold font-mono ${
                tomatoAnomalyActive ? 'text-rose-600' : 'text-emerald-700'
              }`}
            >
              {moistureSensor.currentValue}%
            </span>
          </div>

          <ConfidenceMeter
            score={tomatoAnomalyActive ? 58 : 94}
            labelPrefix={isTechnicalView ? 'Bayesian Signal Trust' : 'Sensor Trust'}
          />

          <p className="text-xs text-stone-500 mt-3 pt-3 border-t border-stone-100">
            {tomatoAnomalyActive
              ? '⚠️ Extreme divergence from ET0 and neighbor nodes. Confidence reduced to 58%.'
              : 'Consistent with 24h evaporation curve. High confidence.'}
          </p>
        </div>

        {/* Sensor 2: Temperature Sensor */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs hover:border-emerald-300 transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-2xl bg-amber-50 text-amber-700 border border-amber-100">
              <CloudSun className="w-5 h-5" />
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full font-bold uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
              Status: Reliable
            </span>
          </div>

          <h3 className="text-base font-bold text-stone-900">
            Canopy Temperature Sensor
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">Infrared Microclimate Thermistor</p>

          <div className="my-4 py-3 px-4 bg-stone-50 rounded-2xl border border-stone-100 flex items-baseline justify-between">
            <span className="text-xs text-stone-500">Telemetry Value:</span>
            <span className="text-2xl font-extrabold font-mono text-stone-900">
              {tempSensor.currentValue} {tempSensor.unit}
            </span>
          </div>

          <ConfidenceMeter score={98} labelPrefix="Sensor Trust" />

          <p className="text-xs text-stone-500 mt-3 pt-3 border-t border-stone-100">
            Corroborated by regional weather station (34.0°C) with &lt;0.3°C variance.
          </p>
        </div>

        {/* Sensor 3: Humidity Sensor */}
        <div className="bg-white rounded-3xl p-6 border border-amber-200 bg-amber-50/10 shadow-xs">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-2xl bg-purple-50 text-purple-700 border border-purple-100">
              <Radio className="w-5 h-5" />
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full font-bold uppercase bg-amber-100 text-amber-800 border border-amber-300">
              Status: Warning
            </span>
          </div>

          <h3 className="text-base font-bold text-stone-900">
            Microclimate Humidity Sensor
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">Capacitive RH Probe A1</p>

          <div className="my-4 py-3 px-4 bg-stone-50 rounded-2xl border border-stone-100 flex items-baseline justify-between">
            <span className="text-xs text-stone-500">Telemetry Value:</span>
            <span className="text-2xl font-extrabold font-mono text-amber-700">
              {humSensor.currentValue} %
            </span>
          </div>

          <ConfidenceMeter score={62} labelPrefix="Sensor Trust" />

          <p className="text-xs text-stone-500 mt-3 pt-3 border-t border-stone-100">
            Slight calibration drift detected (-7% vs local dew point calculation). Flagged for recalibration.
          </p>
        </div>
      </div>

      {/* DEEP DIVE: SENSOR ANOMALY CROSS-VALIDATION DEMO */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-widest block">
                Verification Proof
              </span>
              {tomatoAnomalyActive && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 animate-pulse">
                  Anomaly Active
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold font-serif text-stone-900">
              Cross-Field & Physical Validation Matrix
            </h3>
          </div>
          <span className="text-xs text-stone-500">
            Evaluates sensor readings against 4 independent physics checks
          </span>
        </div>

        {/* Comparison grid: Reported vs Reality */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Box 1: What the faulty sensor claims */}
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Single Probe Reading
              </span>
              <span className="text-xs font-mono font-bold text-stone-800">Field A Probe</span>
            </div>
            <div className="text-3xl font-extrabold text-stone-900 font-mono">
              Moisture = {tomatoAnomalyActive ? '85%' : '27%'}
            </div>
            <p className="text-xs text-stone-600">
              {tomatoAnomalyActive
                ? 'Probe claims soil is fully waterlogged and saturated. Normal timers would immediately halt all irrigation!'
                : 'Probe reads 27%, indicating soil moisture has depleted below the critical threshold.'}
            </p>
          </div>

          {/* Box 2: Supporting environmental evidence */}
          <div className="bg-emerald-50/60 rounded-2xl p-5 border border-emerald-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Cross-Validating Environmental Signals
              </span>
              <span className="text-xs font-bold text-emerald-700">4 Signals Checked</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                <span className="text-[10px] text-stone-400 block font-semibold">Weather</span>
                <span className="font-bold text-stone-800">Dry (34°C, 0mm Rain)</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                <span className="text-[10px] text-stone-400 block font-semibold">Adjacent Field B</span>
                <span className="font-bold text-stone-800">Moisture: 34% (Dry)</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                <span className="text-[10px] text-stone-400 block font-semibold">Physical ET0 Model</span>
                <span className="font-bold text-stone-800">Loss: 5.6 mm/day</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                <span className="text-[10px] text-stone-400 block font-semibold">Expected State</span>
                <span className="font-bold text-stone-800">~27% to 29%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Anomaly Resolution Banner */}
        {tomatoAnomalyActive ? (
          <div className="bg-rose-50 rounded-2xl p-5 border border-rose-300 space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
              <h4 className="text-sm font-bold text-rose-950 uppercase tracking-wider">
                WARNING: Possible Sensor Anomaly Detected in Tomato Field A
              </h4>
            </div>

            <p className="text-xs sm:text-sm text-rose-900 leading-relaxed">
              <strong>AgriTrust Action:</strong> The system detected a severe divergence between the 85% reading and ambient drying conditions (34°C heat, zero rainfall, neighboring field at 34%). Rather than blindly trusting the 85% reading and shutting off water, AgriTrust reduced probe confidence to 58%, utilized physical evapotranspiration estimates, and preserved the protective 550 L irrigation action.
            </p>

            <div className="pt-2 border-t border-rose-200/80 flex flex-wrap items-center justify-between gap-2 text-xs text-rose-800">
              <span className="font-semibold">Prevented Failure: Tomato plants avoided fatal heat flower abortion.</span>
              <span className="font-mono">Spatial Correlation Anomaly Score: Z = 3.42 (Critical)</span>
            </div>
          </div>
        ) : (
          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
              <span className="text-xs sm:text-sm text-emerald-900 font-medium">
                All 3 field probes pass cross-correlation integrity tests. Sensor data is trusted.
              </span>
            </div>
            <button
              onClick={() => setTomatoAnomalyActive(true)}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-900 underline shrink-0"
            >
              Test Anomaly Reaction &rarr;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
