import React, { useState, useEffect, useRef } from 'react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { RefreshCw, Wifi, Battery, Activity, Wind, Thermometer, Droplets } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import DemoTag from '../components/ui/DemoTag';
import AQIGauge from '../components/ui/AQIGauge';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorState from '../components/ui/ErrorState';
import { getDashboard, getAnalytics } from '../services/api';
import { getSocket, disconnectSocket } from '../services/socket';
import { getAQIStatus, formatTimestamp, formatTimeShort } from '../utils/aqiUtils';

function MetricCard({ label, value, unit, color = '#06b6d4', icon: Icon, status }) {
  return (
    <div className="glass-card p-4 hover:border-cyan-500/20 transition-all">
      <div className="flex items-start justify-between mb-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center"
             style={{ backgroundColor: color + '15', border: `1px solid ${color}30` }}>
          {Icon && <Icon size={14} style={{ color }} />}
        </div>
        {status && (
          <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full"
                style={{ backgroundColor: color + '20', color }}>
            {status}
          </span>
        )}
      </div>
      <div className="mt-2">
        <span className="text-xl font-bold text-white">{value ?? '—'}</span>
        {unit && <span className="text-xs text-slate-500 ml-1">{unit}</span>}
      </div>
      <p className="text-slate-500 text-xs mt-0.5">{label}</p>
    </div>
  );
}

const PERIOD_OPTIONS = [
  { label: '24 Hours', value: '24h' },
  { label: '7 Days',   value: '7d' },
  { label: '30 Days',  value: '30d' },
];

export default function DashboardSection() {
  const [dashboard, setDashboard] = useState(null);
  const [history,   setHistory]   = useState([]);
  const [period,    setPeriod]     = useState('24h');
  const [envMode,   setEnvMode]    = useState('outdoor');
  const [loading,   setLoading]    = useState(true);
  const [error,     setError]      = useState(null);
  const [lastRefresh, setLastRefresh] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [dashRes, histRes] = await Promise.all([
        getDashboard(),
        getAnalytics(period, envMode),
      ]);
      setDashboard(dashRes.data);
      setHistory(histRes.data || []);
      setLastRefresh(new Date());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, [period, envMode]);

  // Auto-refresh every 30 seconds (REST polling)
  useEffect(() => {
    const t = setInterval(loadData, 30000);
    return () => clearInterval(t);
  }, [period, envMode]);

  // Socket.IO live updates — update current reading without full page reload
  useEffect(() => {
    let socket;
    try {
      socket = getSocket();
      socket.on('outdoor:reading', (data) => {
        if (envMode === 'outdoor') {
          setDashboard(prev => prev ? { ...prev, outdoor: data } : prev);
        }
      });
      socket.on('indoor:reading', (data) => {
        if (envMode === 'indoor') {
          setDashboard(prev => prev ? { ...prev, indoor: data } : prev);
        }
      });
    } catch {
      // Socket unavailable — REST polling will continue
    }
    return () => {
      if (socket) {
        socket.off('outdoor:reading');
        socket.off('indoor:reading');
      }
    };
  }, [envMode]);

  const outdoor = dashboard?.outdoor;
  const indoor  = dashboard?.indoor;
  const reading = envMode === 'indoor' ? indoor : outdoor;
  const aqiStat = getAQIStatus(reading?.aqi);

  // Format chart data — subsample to max 24 visible points for readability
  const subsample = (arr, n) => {
    if (!arr.length) return [];
    if (arr.length <= n) return arr;
    const step = Math.floor(arr.length / n);
    return arr.filter((_, i) => i % step === 0).slice(0, n);
  };

  const chartData = subsample(history, 24).map(d => ({
    time:  formatTimeShort(d.timestamp),
    pm25:  d.pm25,
    pm10:  d.pm10,
    aqi:   d.aqi,
    temp:  d.temperature,
    humid: d.humidity,
    no2:   d.no2,
    co:    d.co,
  }));

  return (
    <section id="dashboard" className="py-24 bg-[#020818]">
      <div className="section-wrapper">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <SectionHeader
            eyebrow="Live Monitoring Dashboard"
            title={<>AQMS <span className="gradient-text">Control Center</span></>}
            subtitle="Real-time dashboard demonstration using simulated sensor streams — no physical hardware is currently connected."
            className="mb-0"
          />
          <div className="flex items-center gap-3 shrink-0">
            <DemoTag />
            <button
              onClick={loadData}
              disabled={loading}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30
                         text-cyan-400 text-xs hover:bg-cyan-500/20 transition-colors"
            >
              <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>
        </div>

        {loading && !dashboard && <LoadingSpinner message="Loading AQMS dashboard…" />}
        {error && !dashboard && <ErrorState message={error} onRetry={loadData} />}

        {dashboard && (
          <>
            {/* Summary strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Overall AQI',    value: dashboard.summary.overallAQI,       color: aqiStat.color, icon: Activity },
                { label: 'Devices Online', value: `${dashboard.summary.devicesOnline}/${dashboard.summary.devicesTotal}`, color: '#22c55e', icon: Wifi },
                { label: 'Active Alerts',  value: dashboard.summary.activeAlerts,      color: '#f59e0b', icon: Activity },
                { label: 'Locations',      value: dashboard.summary.locationsMonitored, color: '#06b6d4', icon: Activity },
              ].map(s => (
                <div key={s.label} className="glass-card p-4 text-center">
                  <div className="text-3xl font-black" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-slate-500 text-xs mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Environment toggle + period */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {['outdoor', 'indoor'].map(e => (
                <button
                  key={e}
                  onClick={() => setEnvMode(e)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all
                    ${envMode === e
                      ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-400'
                      : 'border border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-300'}`}
                >
                  {e === 'outdoor' ? '🌤 Outdoor' : '🏢 Indoor'}
                </button>
              ))}
              <div className="flex items-center gap-1 ml-auto">
                {PERIOD_OPTIONS.map(p => (
                  <button
                    key={p.value}
                    onClick={() => setPeriod(p.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                      ${period === p.value
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                        : 'text-slate-500 hover:text-slate-300 border border-transparent hover:border-white/10'}`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Main readings */}
            <div className="grid lg:grid-cols-4 gap-6 mb-8">
              {/* AQI Gauge */}
              <div className="glass-card p-6 flex flex-col items-center gap-4 border border-cyan-500/20">
                <div className="text-center">
                  <p className="text-slate-400 text-xs mb-1">Air Quality Index</p>
                  <AQIGauge aqi={reading?.aqi} size={140} />
                </div>
                <div className="w-full text-center">
                  <p className="text-slate-600 text-[10px] mt-2">Last updated: {formatTimestamp(reading?.timestamp)}</p>
                  <DemoTag className="mt-1" />
                </div>
              </div>

              {/* PM cards */}
              <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {reading && [
                  { label: 'PM2.5',  value: reading.pm25?.toFixed(1),  unit: 'µg/m³', color: '#f43f5e', icon: Activity },
                  { label: 'PM10',   value: reading.pm10?.toFixed(1),  unit: 'µg/m³', color: '#f97316', icon: Activity },
                  { label: 'CO',     value: reading.co?.toFixed(3),    unit: 'ppm',   color: '#a78bfa', icon: Wind },
                  { label: 'NO₂',    value: reading.no2?.toFixed(1),   unit: 'µg/m³', color: '#c084fc', icon: Wind },
                  { label: 'SO₂',    value: reading.so2?.toFixed(1),   unit: 'µg/m³', color: '#facc15', icon: Wind },
                  { label: 'O₃',     value: reading.o3?.toFixed(1),    unit: 'µg/m³', color: '#38bdf8', icon: Wind },
                  { label: 'Temp',   value: reading.temperature?.toFixed(1), unit: '°C', color: '#2dd4bf', icon: Thermometer },
                  { label: 'Humidity', value: reading.humidity?.toFixed(1), unit: '%', color: '#60a5fa', icon: Droplets },
                  ...(envMode === 'indoor' ? [
                    { label: 'eCO₂',  value: reading.eco2?.toFixed(0),  unit: 'ppm', color: '#4ade80', icon: Activity },
                    { label: 'TVOC',  value: reading.tvoc?.toFixed(0),  unit: 'ppb', color: '#86efac', icon: Activity },
                  ] : [
                    { label: 'Wind',   value: reading.windSpeed?.toFixed(1), unit: 'm/s', color: '#7dd3fc', icon: Wind },
                    { label: 'Rainfall',value: reading.rainfall?.toFixed(2), unit: 'mm/h', color: '#93c5fd', icon: Droplets },
                  ]),
                ].map(card => (
                  <MetricCard key={card.label} {...card} />
                ))}
              </div>
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              {/* PM Trend */}
              <div className="glass-card p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold text-sm">PM2.5 / PM10 Trend</h3>
                  <DemoTag />
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="pm25Grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#f43f5e" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="pm10Grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#f97316" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} />
                    <YAxis tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ background: 'rgba(10,22,40,0.95)', border: '1px solid rgba(6,182,212,0.3)', borderRadius: '8px', color: '#e2e8f0', fontSize: '12px' }} />
                    <Area type="monotone" dataKey="pm25" stroke="#f43f5e" fill="url(#pm25Grad)" strokeWidth={2} name="PM2.5" dot={false} />
                    <Area type="monotone" dataKey="pm10" stroke="#f97316" fill="url(#pm10Grad)" strokeWidth={2} name="PM10" dot={false} />
                    <Legend wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* AQI Trend */}
              <div className="glass-card p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold text-sm">AQI Variation</h3>
                  <DemoTag />
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} interval="preserveStartEnd" />
                    <YAxis tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ background: 'rgba(10,22,40,0.95)', border: '1px solid rgba(6,182,212,0.3)', borderRadius: '8px', color: '#e2e8f0', fontSize: '12px' }} />
                    <Bar dataKey="aqi" fill="#06b6d4" radius={[3, 3, 0, 0]} name="AQI" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Temp/Humidity trend */}
            <div className="glass-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold text-sm">Temperature &amp; Humidity Trend</h3>
                <DemoTag />
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} interval="preserveStartEnd" />
                  <YAxis tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: 'rgba(10,22,40,0.95)', border: '1px solid rgba(6,182,212,0.3)', borderRadius: '8px', color: '#e2e8f0', fontSize: '12px' }} />
                  <Line type="monotone" dataKey="temp"  stroke="#2dd4bf" strokeWidth={2} dot={false} name="Temp (°C)" />
                  <Line type="monotone" dataKey="humid" stroke="#60a5fa" strokeWidth={2} dot={false} name="Humidity (%)" />
                  <Legend wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
