import React, { useState, useEffect } from 'react';
import { MapPin, Wifi, AlertTriangle, RefreshCw } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import DemoTag from '../components/ui/DemoTag';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorState from '../components/ui/ErrorState';
import { getLocations } from '../services/api';
import { getAQIStatus, formatTimestamp } from '../utils/aqiUtils';

const LOCATION_TYPE_CONFIG = {
  urban:       { label: 'Urban',         icon: '🏙', color: '#06b6d4' },
  industrial:  { label: 'Industrial',    icon: '🏭', color: '#f97316' },
  traffic:     { label: 'Traffic',       icon: '🚦', color: '#ef4444' },
  campus:      { label: 'Campus',        icon: '🎓', color: '#22c55e' },
  commercial:  { label: 'Commercial',    icon: '🏬', color: '#a855f7' },
  sensitive:   { label: 'Eco-Sensitive', icon: '🌿', color: '#10b981' },
};

function LocationCard({ loc, selected, onClick }) {
  const aqiStat = getAQIStatus(loc.reading?.aqi);
  const typeConf = LOCATION_TYPE_CONFIG[loc.type] || { label: loc.type, icon: '📍', color: '#06b6d4' };

  return (
    <button
      onClick={onClick}
      className={`glass-card text-left p-4 transition-all duration-300 w-full
                  ${selected
                    ? 'border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                    : 'border-white/5 hover:border-white/15 hover:scale-[1.01]'}`}
    >
      <div className="flex items-start gap-3">
        <div className="text-2xl shrink-0">{typeConf.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                  style={{ backgroundColor: typeConf.color + '20', color: typeConf.color }}>
              {typeConf.label}
            </span>
            <span className="text-[10px] font-mono text-slate-600">{loc.environment}</span>
          </div>
          <h4 className="text-white font-semibold text-sm truncate">{loc.name}</h4>
          <div className="flex items-center gap-3 mt-2">
            <div>
              <span className="text-lg font-black" style={{ color: aqiStat.color }}>
                {loc.reading?.aqi ?? '—'}
              </span>
              <span className="text-[10px] text-slate-600 ml-1">AQI</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                  style={{ backgroundColor: aqiStat.color + '20', color: aqiStat.color }}>
              {aqiStat.label}
            </span>
          </div>
          <div className="flex gap-3 mt-1.5 text-[10px] text-slate-600">
            <span>PM2.5: <span className="text-slate-400">{loc.reading?.pm25?.toFixed(0)}</span></span>
            <span>Temp: <span className="text-slate-400">{loc.reading?.temperature?.toFixed(0)}°C</span></span>
          </div>
        </div>
      </div>
    </button>
  );
}

// Simple SVG-based map (no external tile server needed)
function MapVisualization({ locations, selected, onSelect }) {
  // Davangere approximate bounding box
  const minLat = 14.43, maxLat = 14.48, minLng = 75.91, maxLng = 75.94;

  const toSvgX = (lng) => ((lng - minLng) / (maxLng - minLng)) * 560 + 20;
  const toSvgY = (lat) => ((maxLat - lat) / (maxLat - minLat)) * 280 + 20;

  return (
    <div className="relative rounded-xl overflow-hidden border border-cyan-500/20 bg-[#0a1628]">
      {/* Map grid background */}
      <div className="absolute inset-0 opacity-10"
           style={{
             backgroundImage: 'linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)',
             backgroundSize: '40px 40px',
           }} />

      <svg viewBox="0 0 600 320" className="w-full h-auto" style={{ minHeight: '220px' }}>
        {/* Roads (simplified) */}
        <line x1="0" y1="160" x2="600" y2="160" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
        <line x1="300" y1="0" x2="300" y2="320" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
        <line x1="0" y1="80" x2="600" y2="200" stroke="rgba(255,255,255,0.04)" strokeWidth="3" />

        {/* Region label */}
        <text x="10" y="315" fill="rgba(100,116,139,0.6)" fontSize="10" fontFamily="monospace">
          Davangere Region — DEMO LOCATIONS
        </text>

        {locations.map(loc => {
          const x = toSvgX(loc.lng);
          const y = toSvgY(loc.lat);
          const aqiStat = getAQIStatus(loc.reading?.aqi);
          const isSelected = selected?.id === loc.id;
          const typeConf = LOCATION_TYPE_CONFIG[loc.type] || { color: '#06b6d4' };

          return (
            <g key={loc.id} onClick={() => onSelect(loc)} style={{ cursor: 'pointer' }}>
              {/* Pulse ring */}
              {isSelected && (
                <circle cx={x} cy={y} r="20" fill="none"
                        stroke={aqiStat.color} strokeWidth="1" opacity="0.4"
                        style={{ animation: 'pulse 2s infinite' }} />
              )}
              {/* Outer glow */}
              <circle cx={x} cy={y} r="14"
                      fill={typeConf.color + '20'}
                      stroke={isSelected ? aqiStat.color : typeConf.color + '60'}
                      strokeWidth={isSelected ? 2 : 1} />
              {/* Inner dot */}
              <circle cx={x} cy={y} r="6" fill={aqiStat.color} />
              {/* AQI label */}
              <text x={x + 16} y={y - 4} fill="white" fontSize="9" fontWeight="bold"
                    fontFamily="monospace" opacity="0.9">
                {loc.reading?.aqi ?? '?'}
              </text>
              <text x={x + 16} y={y + 6} fill="rgba(148,163,184,0.8)" fontSize="7.5"
                    fontFamily="sans-serif">
                {loc.name.split('–')[0].trim().split(' ').slice(0, 2).join(' ')}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="absolute top-3 right-3 flex flex-col gap-1.5 bg-[#020818]/80 border border-white/10
                      rounded-lg p-2 backdrop-blur-sm">
        {[
          { label: 'Good',        color: '#22c55e' },
          { label: 'Satisfactory',color: '#84cc16' },
          { label: 'Moderate',    color: '#f59e0b' },
          { label: 'Poor',        color: '#f97316' },
        ].map(l => (
          <div key={l.label} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: l.color }} />
            <span className="text-[9px] text-slate-400">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MappingSection() {
  const [locations, setLocations] = useState([]);
  const [selected,  setSelected]  = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);

  const load = async () => {
    setLoading(true); setError(null);
    try {
      const res = await getLocations();
      const locs = res.data || [];
      setLocations(locs);
      if (locs.length) setSelected(locs[0]);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const aqiStat = getAQIStatus(selected?.reading?.aqi);

  return (
    <section id="mapping" className="py-24 bg-[#050f1e]">
      <div className="section-wrapper">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <SectionHeader
            eyebrow="Environmental Mapping"
            title={<>Multi-Location <span className="gradient-text">AQI Map</span></>}
            subtitle="Monitor air quality across Davangere's key locations — traffic junctions, industrial zones, campuses, and sensitive environments."
            className="mb-0"
          />
          <div className="flex items-center gap-2 shrink-0">
            <DemoTag />
            <button onClick={load}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10
                               border border-cyan-500/30 text-cyan-400 text-xs hover:bg-cyan-500/20">
              <RefreshCw size={11} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>
        </div>

        {loading && <LoadingSpinner message="Loading location data…" />}
        {error   && <ErrorState message={error} onRetry={load} />}

        {!loading && !error && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Location list */}
            <div className="flex flex-col gap-3 max-h-[520px] overflow-y-auto pr-1 no-scrollbar">
              {locations.map(loc => (
                <LocationCard
                  key={loc.id}
                  loc={loc}
                  selected={selected?.id === loc.id}
                  onClick={() => setSelected(loc)}
                />
              ))}
            </div>

            {/* Map + detail */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {/* Map */}
              <MapVisualization
                locations={locations}
                selected={selected}
                onSelect={setSelected}
              />

              {/* Selected location detail */}
              {selected && (
                <div className="glass-card p-5 border border-cyan-500/20">
                  <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">
                        {(LOCATION_TYPE_CONFIG[selected.type] || {}).icon || '📍'}
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-base">{selected.name}</h3>
                        <p className="text-slate-500 text-xs capitalize">
                          {selected.type} · {selected.environment} · {selected.lat.toFixed(4)}, {selected.lng.toFixed(4)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-black" style={{ color: aqiStat.color }}>
                        {selected.reading?.aqi}
                      </div>
                      <span className="text-xs font-semibold px-2 py-1 rounded-full"
                            style={{ backgroundColor: aqiStat.color + '20', color: aqiStat.color }}>
                        {aqiStat.label}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                    {[
                      { label: 'PM2.5',  value: selected.reading?.pm25?.toFixed(1),  unit: 'µg/m³' },
                      { label: 'PM10',   value: selected.reading?.pm10?.toFixed(1),  unit: 'µg/m³' },
                      { label: 'Temp',   value: selected.reading?.temperature?.toFixed(1), unit: '°C' },
                      { label: 'Humid',  value: selected.reading?.humidity?.toFixed(0), unit: '%' },
                      ...(selected.environment === 'indoor' ? [
                        { label: 'eCO₂', value: selected.reading?.eco2, unit: 'ppm' },
                        { label: 'TVOC', value: selected.reading?.tvoc, unit: 'ppb' },
                      ] : [
                        { label: 'NO₂',  value: selected.reading?.no2?.toFixed(0),   unit: 'µg/m³' },
                        { label: 'Wind', value: selected.reading?.windSpeed?.toFixed(1), unit: 'm/s' },
                      ]),
                    ].map(r => (
                      <div key={r.label} className="text-center p-2 rounded-lg bg-white/3">
                        <div className="text-white font-bold text-sm">{r.value ?? '—'}</div>
                        <div className="text-slate-600 text-[10px]">{r.label}</div>
                        <div className="text-slate-700 text-[9px]">{r.unit}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <span className="demo-tag">DEMO LOCATION</span>
                    <span className="text-slate-600 text-xs">
                      Updated: {formatTimestamp(selected.reading?.timestamp)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Deployment targets */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {Object.entries(LOCATION_TYPE_CONFIG).map(([key, conf]) => (
            <div key={key} className="glass-card p-3 text-center hover:border-white/15 transition-colors">
              <div className="text-2xl mb-1">{conf.icon}</div>
              <p className="text-xs font-medium" style={{ color: conf.color }}>{conf.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
