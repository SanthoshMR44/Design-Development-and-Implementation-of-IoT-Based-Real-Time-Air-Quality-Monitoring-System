import React, { useEffect, useState } from 'react';
import { Activity, Wind, MapPin, Bell, ChevronDown, Cpu, Cloud, Zap } from 'lucide-react';
import { getAQIStatus } from '../utils/aqiUtils';
import AQIGauge from '../components/ui/AQIGauge';

// Animated air particle
function Particle({ style }) {
  return (
    <div
      className="absolute rounded-full bg-cyan-400/20 pointer-events-none animate-particle"
      style={style}
    />
  );
}

// Flowing pipeline step
function PipelineStep({ icon: Icon, label, color = 'cyan', delay = 0 }) {
  return (
    <div
      className="flex flex-col items-center gap-1.5 group"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                       bg-${color}-500/10 border border-${color}-500/30
                       group-hover:bg-${color}-500/20 group-hover:border-${color}-500/60
                       transition-all duration-300`}
      >
        <Icon size={18} className={`text-${color}-400`} />
      </div>
      <span className="text-[10px] text-slate-500 font-medium text-center leading-tight max-w-[64px]">{label}</span>
    </div>
  );
}

const DEMO_AQI_VALUES = [72, 145, 98, 210, 68, 183, 125];

export default function HeroSection() {
  const [aqiIdx, setAqiIdx]       = useState(0);
  const [liveAqi, setLiveAqi]     = useState(72);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Cycle through demo AQI values
    const t = setInterval(() => {
      setAqiIdx(i => {
        const next = (i + 1) % DEMO_AQI_VALUES.length;
        setLiveAqi(DEMO_AQI_VALUES[next]);
        return next;
      });
    }, 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    // Generate random particles
    setParticles(
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        width:  Math.random() * 6 + 2,
        left:   Math.random() * 100,
        animDuration: Math.random() * 10 + 8,
        animDelay:    Math.random() * 8,
        opacity:      Math.random() * 0.4 + 0.1,
      }))
    );
  }, []);

  const status = getAQIStatus(liveAqi);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden
                 bg-[#020818]"
    >
      {/* Background radials */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full
                        bg-cyan-600/5 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full
                        bg-teal-500/5 blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      </div>

      {/* Air particles */}
      {particles.map(p => (
        <Particle
          key={p.id}
          style={{
            width:           `${p.width}px`,
            height:          `${p.width}px`,
            left:            `${p.left}%`,
            bottom:          '-10px',
            animationDuration:`${p.animDuration}s`,
            animationDelay:  `${p.animDelay}s`,
            opacity:          p.opacity,
          }}
        />
      ))}

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(6,182,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="section-wrapper relative z-10 pt-24 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* ── Left: Content ── */}
          <div className="flex flex-col gap-6">
            {/* Eyebrow */}
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                              bg-cyan-500/10 border border-cyan-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-cyan-400 text-xs font-semibold tracking-widest uppercase">
                  IoT · Edge · Cloud Platform
                </span>
              </div>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none">
                <span className="text-white">AQ</span>
                <span className="gradient-text">MS</span>
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-slate-300 mt-2 leading-tight">
                IoT-Based Real-Time Air Quality<br className="hidden sm:block" /> Monitoring System
              </p>
            </div>

            {/* Tagline */}
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl">
              Real-Time Intelligence for Cleaner, Safer Indoor &amp; Outdoor Environments.
              Sensors → Edge → Cloud → Analytics → Alerts.
            </p>

            {/* Live AQI mini indicator */}
            <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl
                            glass-card border border-cyan-500/20 w-fit">
              <div className="relative">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }} />
                <div className="absolute inset-0 rounded-full animate-ping" style={{ backgroundColor: status.color, opacity: 0.4 }} />
              </div>
              <div>
                <span className="text-slate-400 text-xs">Live AQI Demo</span>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold text-lg" style={{ color: status.color }}>{liveAqi}</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: status.color + '20', color: status.color }}>
                    {status.label}
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-amber-400/70 font-mono border border-amber-400/20 px-1.5 py-0.5 rounded">
                DEMO
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo('about')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600
                           hover:from-cyan-500 hover:to-teal-500 text-white font-semibold text-sm
                           transition-all duration-200 btn-glow flex items-center gap-2"
              >
                <Activity size={16} />
                Explore AQMS
              </button>
              <button
                onClick={() => scrollTo('dashboard')}
                className="px-5 py-2.5 rounded-xl border border-cyan-500/40 text-cyan-400
                           hover:bg-cyan-500/10 font-semibold text-sm transition-all duration-200
                           flex items-center gap-2"
              >
                <Zap size={16} />
                View Dashboard
              </button>
              <button
                onClick={() => scrollTo('architecture')}
                className="px-5 py-2.5 rounded-xl border border-white/10 text-slate-300
                           hover:bg-white/5 font-semibold text-sm transition-all duration-200
                           flex items-center gap-2"
              >
                <Cpu size={16} />
                Architecture
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="px-5 py-2.5 rounded-xl border border-teal-500/30 text-teal-400
                           hover:bg-teal-500/10 font-semibold text-sm transition-all duration-200
                           flex items-center gap-2"
              >
                <Bell size={16} />
                Request Demo
              </button>
            </div>

            {/* Stats strip */}
            <div className="flex flex-wrap gap-6 pt-2">
              {[
                { value: '15+', label: 'Parameters' },
                { value: '<5s', label: 'Response Time' },
                { value: '4',   label: 'Devices' },
                { value: '6',   label: 'Locations' },
              ].map(stat => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-2xl font-black gradient-text">{stat.value}</span>
                  <span className="text-slate-500 text-xs">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Visual panel ── */}
          <div className="flex flex-col gap-6 items-center">
            {/* Hardware Prototype Image */}
            <div className="relative w-full max-w-md">
              {/* Glow halo */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-teal-500/10
                              blur-xl -m-2" />
              <div className="relative glass-card border border-cyan-500/30 overflow-hidden rounded-2xl group">
                {/* Scanline overlay */}
                <div className="absolute inset-0 z-10 pointer-events-none opacity-30"
                     style={{
                       background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 4px)',
                     }} />
                {/* Image */}
                <img
                  src="/hardware-prototype.jpg"
                  alt="AQMS Hardware Prototype — RDL838 Industrial Data Logger with XY-MD02 sensor and Mornsun power supply"
                  className="w-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
                  style={{ maxHeight: '280px', objectPosition: 'center' }}
                  onError={e => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                {/* Fallback SVG if hardware-prototype.jpg is not present */}
                <div style={{ display: 'none' }}
                     className="w-full h-56 items-center justify-center">
                  <img src="/hardware-placeholder.svg" alt="AQMS Hardware Prototype Diagram"
                       className="w-full h-56 object-contain rounded-2xl" />
                </div>

                {/* Annotation overlay */}
                <div className="absolute top-3 left-3 z-20">
                  <span className="text-[10px] font-mono bg-[#020818]/80 text-cyan-400
                                   border border-cyan-500/30 px-2 py-1 rounded-md backdrop-blur-sm">
                    AQMS HARDWARE PROTOTYPE
                  </span>
                </div>

                {/* Device labels */}
                <div className="absolute bottom-3 right-3 z-20 flex flex-col gap-1 items-end">
                  <span className="text-[9px] font-mono bg-[#020818]/80 text-teal-400
                                   border border-teal-500/20 px-1.5 py-0.5 rounded backdrop-blur-sm">
                    RDL838 Industrial Logger
                  </span>
                  <span className="text-[9px] font-mono bg-[#020818]/80 text-cyan-400
                                   border border-cyan-500/20 px-1.5 py-0.5 rounded backdrop-blur-sm">
                    XY-MD02 Temp/Humidity
                  </span>
                  <span className="text-[9px] font-mono bg-[#020818]/80 text-emerald-400
                                   border border-emerald-500/20 px-1.5 py-0.5 rounded backdrop-blur-sm">
                    Mornsun Power Supply
                  </span>
                </div>
              </div>
            </div>

            {/* AQI Gauge Card */}
            <div className="glass-card border border-cyan-500/20 p-4 w-full max-w-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-xs font-medium">Overall AQI</span>
                <span className="demo-tag">DEMO</span>
              </div>
              <div className="flex items-center gap-6">
                <AQIGauge aqi={liveAqi} size={120} />
                <div className="flex flex-col gap-2">
                  {[
                    { label: 'PM2.5', value: '68.4 µg/m³', color: '#f59e0b' },
                    { label: 'PM10',  value: '112 µg/m³',  color: '#f97316' },
                    { label: 'Temp',  value: '28.3 °C',    color: '#22d3ee' },
                    { label: 'Humid', value: '62%',         color: '#2dd4bf' },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-xs text-slate-400 w-12">{item.label}</span>
                      <span className="text-xs font-mono text-slate-300">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pipeline flow */}
        <div className="mt-16 pt-8 border-t border-white/5">
          <p className="text-center text-slate-600 text-xs font-medium uppercase tracking-widest mb-6">
            System Flow
          </p>
          <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
            {[
              { icon: Activity,  label: 'IoT Sensors',  color: 'cyan',    delay: 0 },
              { icon: Cpu,       label: 'Edge Logger',  color: 'teal',    delay: 0.1 },
              { icon: Wind,      label: 'Wi-Fi / 4G',  color: 'blue',    delay: 0.2 },
              { icon: Cloud,     label: 'AQMS Cloud',  color: 'indigo',  delay: 0.3 },
              { icon: Zap,       label: 'Analytics',   color: 'violet',  delay: 0.4 },
              { icon: Bell,      label: 'Alerts',      color: 'rose',    delay: 0.5 },
              { icon: MapPin,    label: 'Dashboard',   color: 'emerald', delay: 0.6 },
            ].map((step, i, arr) => (
              <React.Fragment key={step.label}>
                <PipelineStep {...step} />
                {i < arr.length - 1 && (
                  <div className="hidden sm:flex items-center">
                    <svg width="24" height="2" className="overflow-visible">
                      <line x1="0" y1="1" x2="24" y2="1"
                            stroke="rgba(6,182,212,0.3)" strokeWidth="1"
                            strokeDasharray="4,3" />
                      <circle cx="20" cy="1" r="2" fill="#06b6d4" opacity="0.6" />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo('about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1
                   text-slate-600 hover:text-slate-400 transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <span className="text-xs uppercase tracking-widest">Explore</span>
        <ChevronDown size={18} />
      </button>
    </section>
  );
}
