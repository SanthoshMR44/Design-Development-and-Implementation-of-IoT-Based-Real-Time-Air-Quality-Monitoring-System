import React, { useState } from 'react';
import { Brain, Zap, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import { predictAQI } from '../services/api';

const DEFAULT_INPUTS = {
  PM2: 88, PM10: 140, NO: 5, NO2: 30, CO: 0.12, SO2: 18, O3: 110, AQI: 200,
};

const SAMPLE_PRESETS = [
  { label: 'Good',      values: { PM2: 7.2,  PM10: 26.4,  NO: 3.86, NO2: 5.22,  CO: 0.59, SO2: 6.62,  O3: 14.29, AQI: 46  } },
  { label: 'Satisfactory', values: { PM2: 10.5, PM10: 36.5, NO: 7.78, NO2: 22.5,  CO: 0.58, SO2: 2.8,   O3: 13.1,  AQI: 59  } },
  { label: 'Moderate',  values: { PM2: 88,   PM10: 140,   NO: 5,    NO2: 30,    CO: 0.12, SO2: 18,    O3: 110,   AQI: 200 } },
  { label: 'Poor',      values: { PM2: 117,  PM10: 181,   NO: 4.26, NO2: 41.1,  CO: 0.13, SO2: 28.79, O3: 94.63, AQI: 252 } },
  { label: 'Very Poor', values: { PM2: 122,  PM10: 208,   NO: 5.56, NO2: 54.87, CO: 0.27, SO2: 22.97, O3: 68.6,  AQI: 310 } },
];

const FIELD_CONFIG = [
  { key: 'PM2',  label: 'PM2.5', unit: 'µg/m³', min: 0, max: 1000,  step: 0.1  },
  { key: 'PM10', label: 'PM10',  unit: 'µg/m³', min: 0, max: 1200,  step: 0.1  },
  { key: 'NO',   label: 'NO',    unit: 'µg/m³', min: 0, max: 1000,  step: 0.01 },
  { key: 'NO2',  label: 'NO₂',   unit: 'µg/m³', min: 0, max: 1000,  step: 0.1  },
  { key: 'CO',   label: 'CO',    unit: 'ppm',   min: 0, max: 50,    step: 0.001},
  { key: 'SO2',  label: 'SO₂',   unit: 'µg/m³', min: 0, max: 1000,  step: 0.1  },
  { key: 'O3',   label: 'O₃',    unit: 'µg/m³', min: 0, max: 1000,  step: 0.1  },
  { key: 'AQI',  label: 'AQI',   unit: '',       min: 0, max: 1000,  step: 1    },
];

export default function PredictionSection() {
  const [inputs,  setInputs]  = useState(DEFAULT_INPUTS);
  const [result,  setResult]  = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const handleChange = (key, value) => {
    setInputs(prev => ({ ...prev, [key]: value === '' ? '' : parseFloat(value) }));
    setResult(null);
    setError(null);
  };

  const handlePreset = (preset) => {
    setInputs(preset.values);
    setResult(null);
    setError(null);
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setError(null);
  };

  // Client-side validation before submit
  const validate = () => {
    for (const f of FIELD_CONFIG) {
      const val = inputs[f.key];
      if (val === '' || val === undefined || isNaN(Number(val))) {
        return `${f.label} is required and must be a number.`;
      }
      if (Number(val) < f.min || Number(val) > f.max) {
        return `${f.label} must be between ${f.min} and ${f.max}.`;
      }
    }
    return null;
  };

  const handlePredict = async () => {
    const validationErr = validate();
    if (validationErr) {
      setError(validationErr);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await predictAQI(inputs);
      setResult(res.data);
    } catch (e) {
      setError(e.message || 'Prediction failed. Check that the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="prediction" className="py-24 bg-[#050f1e]">
      <div className="section-wrapper">
        <SectionHeader
          eyebrow="AQI Bucket Classification"
          title={<>KNN-Based AQI Bucket <span className="gradient-text">Classifier</span></>}
          subtitle="Enter pollutant measurements and a pre-computed AQI value to classify the AQI quality bucket. The model uses KNN (k=5) with StandardScaler normalization, matching the original Python/sklearn training workflow."
        />

        {/* Model information */}
        <div className="glass-card border border-violet-500/20 p-5 mb-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20
                            flex items-center justify-center shrink-0">
              <Brain size={18} className="text-violet-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">KNN Classifier — k=5, StandardScaler</h3>
              <p className="text-slate-500 text-xs">
                JavaScript port of sklearn KNeighborsClassifier · Station.csv dataset ·
                Classifies a pre-computed AQI value into a named bucket — AQI is an input feature, not an output
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 text-[10px]">
            {[
              { label: 'Algorithm',  value: 'K-Nearest Neighbours (k=5)' },
              { label: 'Scaling',    value: 'StandardScaler (z-score)' },
              { label: 'Training',   value: '360 balanced rows (60/class)' },
              { label: 'Features',   value: 'PM2.5, PM10, NO, NO₂, CO, SO₂, O₃, AQI (input)' },
              { label: 'Output',     value: '6 AQI bucket classes' },
              { label: 'What it does', value: 'Classifies a known AQI value into a named bucket' },
            ].map(item => (
              <span key={item.label} className="flex items-center gap-1 px-2 py-1 rounded-lg
                                                bg-white/3 border border-white/5">
                <span className="text-slate-500">{item.label}:</span>
                <span className="text-slate-300 font-medium">{item.value}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Input form */}
        <div className="glass-card border border-violet-500/10 p-6 mb-4">
          {/* Preset buttons */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="text-slate-500 text-xs">Quick presets:</span>
            {SAMPLE_PRESETS.map(p => (
              <button
                key={p.label}
                onClick={() => handlePreset(p)}
                className="px-3 py-1 rounded-lg text-xs border border-white/10 text-slate-400
                           hover:border-violet-500/30 hover:text-violet-400 transition-colors"
              >
                {p.label}
              </button>
            ))}
            <button
              onClick={handleReset}
              className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs
                         border border-white/10 text-slate-500 hover:text-slate-300 transition-colors"
            >
              <RefreshCw size={11} />
              Reset
            </button>
          </div>

          {/* Input grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
            {FIELD_CONFIG.map(field => (
              <div key={field.key}>
                <label className="block text-slate-400 text-xs mb-1.5">
                  {field.label}
                  {field.unit && <span className="text-slate-600 ml-1">({field.unit})</span>}
                </label>
                <input
                  type="number"
                  value={inputs[field.key]}
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  onChange={e => handleChange(field.key, e.target.value)}
                  className="input-field text-center"
                  aria-label={`${field.label} input`}
                />
              </div>
            ))}
          </div>

          <p className="text-slate-600 text-[10px] mb-4">
            ⓘ AQI is a required input feature matching the original Station.csv training data.
            The model classifies this pre-computed AQI value into a named bucket —
            it does <em>not</em> compute AQI from pollutants alone.
          </p>

          <button
            onClick={handlePredict}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600
                       hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm
                       transition-all duration-200 btn-glow flex items-center justify-center gap-2
                       disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading
              ? <><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />Predicting…</>
              : <><Zap size={16} />Predict AQI Bucket</>
            }
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="glass-card p-4 border border-red-500/20 flex items-start gap-3 mb-4">
            <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Result */}
        {result && (
          <div
            className="glass-card p-6 border transition-all duration-500"
            style={{ borderColor: result.color + '50' }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-5">
              <div className="text-5xl" role="img" aria-label={result.prediction}>
                {result.icon}
              </div>
              <div className="flex-1">
                <p className="text-slate-400 text-sm">Classified AQI Bucket</p>
                <h3 className="text-4xl font-black" style={{ color: result.color }}>
                  {result.prediction}
                </h3>
                <p className="text-slate-400 text-sm mt-1">{result.description}</p>
              </div>
              <div className="text-right">
                <p className="text-slate-500 text-xs">Model Confidence</p>
                <p className="text-3xl font-bold" style={{ color: result.color }}>
                  {result.confidence}%
                </p>
                <p className="text-slate-600 text-[10px]">
                  {result.confidence < 60 ? 'Uncertain — near class boundary' : 'Clear majority vote'}
                </p>
              </div>
            </div>

            {/* Vote distribution */}
            <div className="mb-4">
              <p className="text-slate-500 text-xs uppercase tracking-wider mb-2">
                KNN Vote Distribution (k=5 nearest neighbours)
              </p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(result.votes || {}).map(([label, votes]) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10"
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: label === result.prediction ? result.color : '#475569' }}
                    />
                    <span className="text-slate-300 text-xs font-medium">{label}</span>
                    <span className="text-slate-500 text-xs">{votes}/5</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Model details */}
            <div className="flex flex-wrap gap-3 mb-4 text-[10px]">
              <span className="text-slate-600">Training rows: <span className="text-slate-400">{result.trainingRows}</span></span>
              <span className="text-slate-600">Scaling: <span className="text-slate-400">{result.scalerUsed}</span></span>
              <span className="text-slate-600">Reported accuracy: <span className="text-slate-400">{result.accuracy}</span></span>
            </div>

            <div className="flex items-start gap-2 p-3 rounded-lg bg-white/3 border border-white/5">
              <CheckCircle size={12} className="text-slate-500 shrink-0 mt-0.5" />
              <p className="text-slate-500 text-xs">{result.note}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
