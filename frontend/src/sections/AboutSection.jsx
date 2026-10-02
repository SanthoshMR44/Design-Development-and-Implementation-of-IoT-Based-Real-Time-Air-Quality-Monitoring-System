import React from 'react';
import { Wind, Thermometer, Droplets, Activity, Globe, Shield, Zap, BarChart3 } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';

const PARAMETERS = [
  { icon: Activity,    label: 'PM2.5',          unit: 'µg/m³', color: 'text-red-400',     desc: 'Fine particulate matter' },
  { icon: Activity,    label: 'PM10',           unit: 'µg/m³', color: 'text-orange-400',  desc: 'Coarse particulate matter' },
  { icon: Wind,        label: 'O₃',             unit: 'µg/m³', color: 'text-cyan-400',    desc: 'Ground-level ozone' },
  { icon: Wind,        label: 'SO₂',            unit: 'µg/m³', color: 'text-yellow-400',  desc: 'Sulfur dioxide' },
  { icon: Wind,        label: 'NO₂',            unit: 'µg/m³', color: 'text-purple-400',  desc: 'Nitrogen dioxide' },
  { icon: Wind,        label: 'CO',             unit: 'ppm',   color: 'text-pink-400',    desc: 'Carbon monoxide' },
  { icon: Thermometer, label: 'Temperature',    unit: '°C',    color: 'text-teal-400',    desc: 'Ambient temperature' },
  { icon: Droplets,    label: 'Humidity',       unit: '%',     color: 'text-blue-400',    desc: 'Relative humidity' },
  { icon: BarChart3,   label: 'Pressure',       unit: 'hPa',   color: 'text-indigo-400',  desc: 'Atmospheric pressure' },
  { icon: Activity,    label: 'eCO₂',           unit: 'ppm',   color: 'text-emerald-400', desc: 'Indoor CO₂ equivalent' },
  { icon: Activity,    label: 'TVOC',           unit: 'ppb',   color: 'text-lime-400',    desc: 'Total VOCs' },
  { icon: Wind,        label: 'Wind Speed',     unit: 'm/s',   color: 'text-sky-400',     desc: 'Anemometer reading' },
];

const OBJECTIVES = [
  { icon: Zap,     title: 'Real-Time Information',  desc: 'Continuous data acquisition and cloud delivery targeting under 5-second alert response for immediate environmental awareness.' },
  { icon: Shield,  title: 'Prompt Alert Response',  desc: 'Harmful gas detection targeting under 5-second alert response time.' },
  { icon: Globe,   title: 'Environmental Protection',desc: 'Support environmental safety decisions and awareness through timely air quality information.' },
  { icon: BarChart3,title: 'Better Decision-Making', desc: 'Analytics and forecasting for evidence-based environmental management.' },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[#020818]">
      <div className="section-wrapper">
        <SectionHeader
          eyebrow="About AQMS"
          title={<>Air Quality Management System — <span className="gradient-text">Overview</span></>}
          subtitle="A cost-effective IoT-, edge-, and cloud-based platform designed for real-time indoor and outdoor air quality monitoring, supporting public health, environmental protection, and informed decision-making."
        />

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Description */}
          <div className="flex flex-col gap-8">
            <div className="glass-card p-6">
              <p className="text-slate-300 leading-relaxed text-sm">
                The Air Quality Management System (AQMS) is designed to provide a comprehensive, scalable, and affordable
                solution for monitoring and improving both indoor and outdoor air quality. By integrating IoT sensors,
                edge computing, and cloud infrastructure, AQMS delivers timely environmental information that supports
                better decision-making and enables prompt responses to harmful air conditions.
              </p>
              <p className="text-slate-400 leading-relaxed text-sm mt-4">
                The platform measures key pollutants including <strong className="text-cyan-400">PM2.5, O₃, SO₂, and NO₂</strong> along
                with a comprehensive suite of environmental and indoor air quality parameters, based on established
                air quality standards. It is intended to support health, safety, environmental awareness, and
                scalable centralized monitoring across multiple locations.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {OBJECTIVES.map(obj => (
                <div key={obj.title} className="glass-card p-4 hover:border-cyan-500/30 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20
                                  flex items-center justify-center mb-3 group-hover:bg-cyan-500/20 transition-colors">
                    <obj.icon size={18} className="text-cyan-400" />
                  </div>
                  <h4 className="text-white font-semibold text-sm mb-1">{obj.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{obj.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Parameters grid */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Monitored Parameters</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {PARAMETERS.map(param => (
                <div
                  key={param.label}
                  className="glass-card p-3 hover:border-cyan-500/30 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <param.icon size={14} className={param.color} />
                    <span className="text-white font-bold text-sm">{param.label}</span>
                  </div>
                  <p className="text-slate-500 text-xs">{param.desc}</p>
                  <span className="inline-block mt-1.5 text-[10px] font-mono bg-white/5 px-1.5 py-0.5 rounded text-slate-400">
                    {param.unit}
                  </span>
                </div>
              ))}
            </div>

            {/* Additional outdoor params */}
            <div className="mt-4 glass-card p-4 border border-teal-500/20">
              <p className="text-teal-400 text-xs font-semibold uppercase tracking-wider mb-3">
                Outdoor-Specific Parameters
              </p>
              <div className="flex flex-wrap gap-2">
                {['Wind Direction', 'Rainfall', 'Solar Radiation'].map(p => (
                  <span key={p} className="px-2 py-1 rounded-lg bg-teal-500/10 border border-teal-500/20
                                           text-teal-300 text-xs">{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
