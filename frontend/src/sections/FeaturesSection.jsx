import React, { useState } from 'react';
import {
  Home, Settings, BarChart3, Map, Bell, Stethoscope,
  DollarSign, Plug, RefreshCw, ChevronRight
} from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';

const FEATURES = [
  {
    icon: Home,
    title: 'Indoor & Outdoor AQI Monitoring',
    desc: 'Simultaneous real-time monitoring of indoor environments (offices, hospitals, campuses) and outdoor locations (traffic junctions, industrial zones) from a single platform.',
    tags: ['PM2.5', 'PM10', 'eCO₂', 'TVOC', 'Gases'],
    color: 'cyan',
  },
  {
    icon: Settings,
    title: 'Centralized Device Management',
    desc: 'Manage all deployed AQMS edge loggers from a unified dashboard. Monitor connectivity, sensor health, calibration status, and firmware across distributed devices.',
    tags: ['AQMi Logger', 'AQMo Logger', 'Diagnostics'],
    color: 'teal',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Trend Analysis',
    desc: 'Historical trend analysis, pollutant comparisons, daily/weekly/monthly patterns, indoor-outdoor comparisons, and simulated forecast-style visualizations for environmental intelligence.',
    tags: ['Trends', 'Historical', 'Visualization'],
    color: 'indigo',
  },
  {
    icon: Map,
    title: 'End-to-End Environmental Mapping',
    desc: 'Multi-level air quality mapping across multiple locations — from individual rooms to city-wide outdoor grids — enabling comprehensive environmental situational awareness.',
    tags: ['Multi-Location', 'GeoMapping', 'City-Wide'],
    color: 'violet',
  },
  {
    icon: Bell,
    title: 'Real-Time Alerts',
    desc: 'Immediate notifications for elevated PM2.5, harmful gas detection, poor indoor air quality, device connectivity loss, and other critical environmental conditions.',
    tags: ['< 5s Response', 'Multi-Channel', 'Configurable'],
    color: 'rose',
  },
  {
    icon: Stethoscope,
    title: 'Device Diagnostics',
    desc: 'Per-device diagnostic dashboards showing sensor health, data transmission quality, battery/power status, calibration records, and maintenance scheduling.',
    tags: ['Health Check', 'Calibration', 'Maintenance'],
    color: 'amber',
  },
  {
    icon: DollarSign,
    title: 'Cost-Effective & Scalable',
    desc: 'Designed from the ground up to be affordable and deployable at scale. Total hardware investment of ₹4,90,000 for a 2-unit prototype covering indoor and outdoor.',
    tags: ['₹4,90,000 BOM', 'Scalable', 'Low OPEX'],
    color: 'emerald',
  },
  {
    icon: Plug,
    title: 'Plug-and-Play Devices',
    desc: 'AQMi and AQMo edge loggers are designed for easy installation without complex configuration, supporting rapid deployment in new monitoring locations.',
    tags: ['Easy Install', 'Quick Deploy', 'Minimal Setup'],
    color: 'sky',
  },
  {
    icon: RefreshCw,
    title: 'Adaptability to New Sensors',
    desc: 'The platform architecture supports future sensor expansion. New pollutant or environmental sensors can be integrated without redesigning the core infrastructure.',
    tags: ['Extensible', 'Future-Ready', 'Modular'],
    color: 'lime',
  },
];

const colorMap = {
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', text: 'text-cyan-400', hover: 'hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]' },
  teal: { bg: 'bg-teal-500/10', border: 'border-teal-500/20', text: 'text-teal-400', hover: 'hover:border-teal-500/40 hover:shadow-[0_0_20px_rgba(45,212,191,0.15)]' },
  indigo:{ bg: 'bg-indigo-500/10',border: 'border-indigo-500/20',text: 'text-indigo-400',hover: 'hover:border-indigo-500/40' },
  violet:{ bg: 'bg-violet-500/10',border: 'border-violet-500/20',text: 'text-violet-400',hover: 'hover:border-violet-500/40' },
  rose:  { bg: 'bg-rose-500/10', border: 'border-rose-500/20', text: 'text-rose-400', hover: 'hover:border-rose-500/40' },
  amber: { bg: 'bg-amber-500/10',border: 'border-amber-500/20',text: 'text-amber-400',hover: 'hover:border-amber-500/40' },
  emerald:{bg:'bg-emerald-500/10',border:'border-emerald-500/20',text:'text-emerald-400',hover:'hover:border-emerald-500/40'},
  sky:   { bg: 'bg-sky-500/10',  border: 'border-sky-500/20',  text: 'text-sky-400',  hover: 'hover:border-sky-500/40' },
  lime:  { bg: 'bg-lime-500/10', border: 'border-lime-500/20', text: 'text-lime-400', hover: 'hover:border-lime-500/40' },
};

export default function FeaturesSection() {
  const [active, setActive] = useState(0);
  const c = colorMap[FEATURES[active].color];

  return (
    <section id="features" className="py-24 bg-[#050f1e]">
      <div className="section-wrapper">
        <SectionHeader
          eyebrow="Key Features"
          title={<>What Makes AQMS <span className="gradient-text">Different</span></>}
          subtitle="Nine documented differentiators that position AQMS as a complete environmental IoT solution rather than a standalone sensor or data logger."
          centered
        />

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Feature cards */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {FEATURES.map((feat, i) => {
              const colors = colorMap[feat.color];
              return (
                <button
                  key={feat.title}
                  onClick={() => setActive(i)}
                  className={`glass-card text-left p-5 transition-all duration-300 cursor-pointer
                    ${colors.hover} ${i === active ? `${colors.border} shadow-[0_0_20px_rgba(6,182,212,0.2)]` : 'border-white/5'}`}
                >
                  <div className={`w-10 h-10 rounded-xl ${colors.bg} border ${colors.border}
                                  flex items-center justify-center mb-3`}>
                    <feat.icon size={18} className={colors.text} />
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-2 leading-tight">{feat.title}</h3>
                  <div className="flex flex-wrap gap-1">
                    {feat.tags.slice(0, 2).map(tag => (
                      <span key={tag} className={`text-[10px] px-1.5 py-0.5 rounded ${colors.bg} ${colors.text} font-medium`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active feature detail */}
          <div className={`glass-card p-6 border ${c.border} flex flex-col gap-4`}>
            <div className={`w-14 h-14 rounded-2xl ${c.bg} border ${c.border}
                            flex items-center justify-center`}>
              {React.createElement(FEATURES[active].icon, { size: 26, className: c.text })}
            </div>
            <h3 className="text-white font-bold text-lg leading-tight">{FEATURES[active].title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{FEATURES[active].desc}</p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {FEATURES[active].tags.map(tag => (
                <span key={tag} className={`px-2.5 py-1 rounded-lg text-xs font-medium ${c.bg} ${c.text} border ${c.border}`}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-500 mt-2">
              <span>Feature</span>
              <span className={`font-bold ${c.text}`}>{active + 1}</span>
              <span>of {FEATURES.length}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
