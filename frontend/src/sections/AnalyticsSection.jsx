import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, BarChart, Bar
} from 'recharts';
import { RefreshCw, TrendingUp, TrendingDown, BarChart2 } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import DemoTag from '../components/ui/DemoTag';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorState from '../components/ui/ErrorState';
import { getHistory, getForecast } from '../services/api';
import { formatTimeShort } from '../utils/aqiUtils';

const PERIODS = [
  { label: '24 Hours', value: '24',   hours: 24  },
  { label: '7 Days',   value: '168',  hours: 168 },
  { label: '30 Days',  value: '720',  hours: 720 },
];

// How many chart points to display (subsample for readability on longer periods)
const CHART_POINTS = 24;

export default function AnalyticsSection() {
  const [outdoor,  setOutdoor]  = useState([]);
  const [indoor,   setIndoor]   = useState([]);
  const [forecast, setForecast] = useState([]);
  const [period,   setPeriod]   = useState('24');
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const [outRes, inRes, foreRes] = await Promise.all([
        getHistory('outdoor', parseInt(period, 10)),
        getHistory('indoor',  parseInt(period, 10)),
        getForecast(),
      ]);
      setOutdoor(outRes.data   || []);
      setIndoor(inRes.data     || []);
      setForecast(foreRes.data || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [period]);

  // Subsample data to CHART_POINTS evenly spaced points for chart readability
  function subsample(arr, n) {
    if (!arr.length) return [];
    if (arr.length <= n) return arr;
    const step = Math.floor(arr.length / n);
    return arr.filter((_, i) => i % step === 0).slice(0, n);
  }

  const outdoorChart = subsample(outdoor, CHART_POINTS).map(d => ({
    time:  formatTimeShort(d.timestamp),
    pm25:  d.pm25,
    pm10:  d.pm10,
    aqi:   d.aqi,
    no2:   d.no2,
    temp:  d.temperature,
    wind:  d.windSpeed,
  }));

  const indoorChart = subsample(indoor, CHART_POINTS).map(d => ({
    time:  formatTimeShort(d.timestamp),
    eco2:  d.eco2,
    tvoc:  d.tvoc,
    pm25:  d.pm25,
    temp:  d.temperature,
    humid: d.humidity,
  }));

  const forecastChart = (forecast || []).slice(0, 12).map(d => ({
    hour: `+${d.hour}h`,
    pm25: d.pm25Forecast,
    aqi:  d.aqiForecast,
    conf: d.confidence,
  }));

  // Summary statistics — calculated from full (non-subsampled) data
  const outdoorAvgPM25 = outdoor.length
    ? (outdoor.reduce((s, d) => s + (d.pm25 || 0), 0) / outdoor.length).toFixed(1)
    : null;
  const indoorAvgPM25 = indoor.length
    ? (indoor.reduce((s, d) => s + (d.pm25 || 0), 0) / indoor.length).toFixed(1)
    : null;

  const selectedPeriod = PERIODS.find(p => p.value === period);

  const tooltipStyle = {
    background: 'rgba(10,22,40,0.95)',
    border: '1px solid rgba(6,182,212,0.3)',
    borderRadius: '8px',
    fontSize: '11px',
    color: '#e2e8f0',
  };

  return (
    <section id="analytics" className="py-24 bg-[#020818]">
      <div className="section-wrapper">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <SectionHeader
            eyebrow="Analytics & Trend Visualization"
            title={<>Environmental Data <span className="gradient-text">Intelligence</span></>}
            subtitle="Historical trends, pollutant comparisons, indoor-outdoor analysis, and demo forecast visualization. All data is simulated."
            className="mb-0"
          />
          <div className="flex items-center gap-2 shrink-0">
            <DemoTag />
            <button
              onClick={load}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10
                         border border-cyan-500/30 text-cyan-400 text-xs hover:bg-cyan-500/20 transition-colors"
            >
              <RefreshCw size={11} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>
        </div>

        {/* Period selector */}
        <div className="flex gap-2 mb-8">
          {PERIODS.map(p => (
            <button
              key={p.value}
              onClick={() => setPeriod(p.value)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all
                ${period === p.value
                  ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-400'
                  : 'border border-white/10 text-slate-500 hover:text-slate-300'}`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {loading && <LoadingSpinner message="Loading analytics data…" />}
        {error   && <ErrorState message={error} onRetry={load} />}

        {!loading && !error && (
          <>
            {/* Summary stats */}
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <div className="glass-card p-5 text-center">
                <div className="text-3xl font-black mb-1" style={{ color: '#f43f5e' }}>
                  {outdoorAvgPM25 ?? '—'}
                  <span className="text-base font-normal text-slate-500 ml-1">µg/m³</span>
                </div>
                <p className="text-slate-500 text-xs">Outdoor Avg PM2.5</p>
                <p className="text-slate-700 text-[10px] mt-0.5">
                  over {selectedPeriod?.label}
                </p>
              </div>
              <div className="glass-card p-5 text-center">
                <div className="text-3xl font-black mb-1" style={{ color: '#4ade80' }}>
                  {indoorAvgPM25 ?? '—'}
                  <span className="text-base font-normal text-slate-500 ml-1">µg/m³</span>
                </div>
                <p className="text-slate-500 text-xs">Indoor Avg PM2.5</p>
                <p className="text-slate-700 text-[10px] mt-0.5">
                  over {selectedPeriod?.label}
                </p>
              </div>
              <div className="glass-card p-5 text-center">
                <div className="text-3xl font-black mb-1" style={{ color: '#06b6d4' }}>
                  {outdoor.length}
                  <span className="text-base font-normal text-slate-500 ml-1">pts</span>
                </div>
                <p className="text-slate-500 text-xs">Outdoor Data Points</p>
                <p className="text-slate-700 text-[10px] mt-0.5">
                  {selectedPeriod?.label} — DEMO/SIMULATED
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              {/* Outdoor PM trend */}
              <div className="glass-card p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-white font-semibold text-sm">Outdoor PM2.5 / PM10 Trend</h3>
                    <p className="text-slate-600 text-xs">Particulate matter — {selectedPeriod?.label}</p>
                  </div>
                  <DemoTag />
                </div>
                {outdoorChart.length === 0 ? (
                  <p className="text-slate-600 text-xs text-center py-8">No outdoor data available.</p>
                ) : (
                  <ResponsiveContainer width="100%" height={180}>
                    <AreaChart data={outdoorChart} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="gradPM25" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor="#f43f5e" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}   />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 9 }} tickLine={false} interval="preserveStartEnd" />
                      <YAxis tick={{ fill: '#64748b', fontSize: 9 }} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Area type="monotone" dataKey="pm25" stroke="#f43f5e" fill="url(#gradPM25)" strokeWidth={2} dot={false} name="PM2.5 (µg/m³)" />
                      <Line type="monotone" dataKey="pm10" stroke="#f97316" strokeWidth={1.5} dot={false} name="PM10 (µg/m³)" strokeDasharray="4 3" />
                      <Legend wrapperStyle={{ fontSize: '10px', color: '#94a3b8' }} />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>

              {/* Indoor eCO₂ / TVOC */}
              <div className="glass-card p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-white font-semibold text-sm">Indoor eCO₂ &amp; TVOC Trend</h3>
                    <p className="text-slate-600 text-xs">Indoor air quality — {selectedPeriod?.label}</p>
                  </div>
                  <DemoTag />
                </div>
                {indoorChart.length === 0 ? (
                  <p className="text-slate-600 text-xs text-center py-8">No indoor data available.</p>
                ) : (
                  <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={indoorChart} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 9 }} tickLine={false} interval="preserveStartEnd" />
                      <YAxis tick={{ fill: '#64748b', fontSize: 9 }} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Line type="monotone" dataKey="eco2" stroke="#4ade80"  strokeWidth={2}   dot={false} name="eCO₂ (ppm)" />
                      <Line type="monotone" dataKey="tvoc" stroke="#86efac"  strokeWidth={1.5} dot={false} name="TVOC (ppb)" strokeDasharray="4 3" />
                      <Legend wrapperStyle={{ fontSize: '10px', color: '#94a3b8' }} />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>

              {/* Gas concentration trend */}
              <div className="glass-card p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-white font-semibold text-sm">Gas Concentration Trend</h3>
                    <p className="text-slate-600 text-xs">NO₂ levels — {selectedPeriod?.label}</p>
                  </div>
                  <DemoTag />
                </div>
                {outdoorChart.length === 0 ? (
                  <p className="text-slate-600 text-xs text-center py-8">No outdoor data available.</p>
                ) : (
                  <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={outdoorChart} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 9 }} tickLine={false} interval="preserveStartEnd" />
                      <YAxis tick={{ fill: '#64748b', fontSize: 9 }} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Line type="monotone" dataKey="no2" stroke="#c084fc" strokeWidth={2} dot={false} name="NO₂ (µg/m³)" />
                      <Legend wrapperStyle={{ fontSize: '10px', color: '#94a3b8' }} />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>

              {/* Forecast — clearly labeled demo */}
              <div className="glass-card p-5 border border-violet-500/20">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-white font-semibold text-sm">PM2.5 Forecast Visualization</h3>
                    <p className="text-slate-600 text-xs">Next 12 hours — demonstration only</p>
                  </div>
                  <BarChart2 size={14} className="text-violet-400 shrink-0" />
                </div>
                <div className="inline-flex items-center gap-1.5 mb-3 px-2 py-1 rounded-lg
                                bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-medium">
                  ⚠ DEMO FORECAST — Not a validated scientific model
                </div>
                {forecastChart.length === 0 ? (
                  <p className="text-slate-600 text-xs text-center py-6">Forecast data unavailable.</p>
                ) : (
                  <ResponsiveContainer width="100%" height={148}>
                    <BarChart data={forecastChart} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="hour" tick={{ fill: '#64748b', fontSize: 9 }} tickLine={false} />
                      <YAxis tick={{ fill: '#64748b', fontSize: 9 }} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Bar dataKey="pm25" fill="#818cf8" radius={[3, 3, 0, 0]} name="PM2.5 Forecast (µg/m³)" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* AQI trend chart */}
            <div className="glass-card p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-white font-semibold text-sm">AQI Trend — Outdoor</h3>
                  <p className="text-slate-600 text-xs">Air Quality Index over {selectedPeriod?.label}</p>
                </div>
                <DemoTag />
              </div>
              {outdoorChart.length === 0 ? (
                <p className="text-slate-600 text-xs text-center py-8">No AQI data available.</p>
              ) : (
                <ResponsiveContainer width="100%" height={160}>
                  <AreaChart data={outdoorChart} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gradAQI" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#06b6d4" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}   />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 9 }} tickLine={false} interval="preserveStartEnd" />
                    <YAxis tick={{ fill: '#64748b', fontSize: 9 }} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Area type="monotone" dataKey="aqi" stroke="#06b6d4" fill="url(#gradAQI)" strokeWidth={2} dot={false} name="AQI" />
                    <Legend wrapperStyle={{ fontSize: '10px', color: '#94a3b8' }} />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
