import React, { useState } from 'react';
import { Activity, Wind, Thermometer, Droplets, Cpu, Wifi, BatteryCharging, Shield, ChevronRight } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';

const COMPONENTS = [
  {
    icon: Activity,
    name: 'PM2.5 / PM10 Sensor',
    category: 'Particulate',
    desc: 'Optical particle counter measuring fine (PM2.5) and coarse (PM10) particulate matter concentrations in the ambient air.',
    specs: ['Range: 0–500 µg/m³', 'Resolution: 1 µg/m³', 'Interface: UART/I²C'],
    color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20',
  },
  {
    icon: Wind,
    name: 'Gas Sensors',
    category: 'Gas Detection',
    desc: 'MQ-series electrochemical sensors for detecting carbon monoxide (CO), nitrogen dioxide (NO₂), sulfur dioxide (SO₂), and ozone (O₃).',
    specs: ['CO, NO₂, SO₂, O₃', 'MQ Gas Sensor Series', 'Analog Output'],
    color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20',
  },
  {
    icon: Thermometer,
    name: 'Env. Sensors (T/H/P)',
    category: 'Environmental',
    desc: 'High-accuracy sensors measuring ambient temperature, relative humidity, and barometric pressure for complete environmental context.',
    specs: ['Temp: –40 to +80°C', 'Humidity: 0–100% RH', 'Pressure: 300–1100 hPa'],
    color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20',
  },
  {
    icon: Activity,
    name: 'eCO₂ & TVOC Sensors',
    category: 'Indoor Air Quality',
    desc: 'Indoor air quality sensors measuring equivalent CO₂ (eCO₂) and total volatile organic compounds (TVOC) for building and room monitoring.',
    specs: ['eCO₂: 400–60,000 ppm', 'TVOC: 0–60,000 ppb', 'Digital I²C Interface'],
    color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20',
  },
  {
    icon: Wind,
    name: 'Wind & Rain Sensors',
    category: 'Meteorological',
    desc: 'Outdoor meteorological sensors measuring wind speed, wind direction, rainfall rate, and solar radiation for comprehensive outdoor environmental data.',
    specs: ['Wind: 0–60 m/s', 'Direction: 0–360°', 'Rainfall: 0.2mm resolution'],
    color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/20',
  },
  {
    icon: Cpu,
    name: 'AQMi Edge Logger',
    category: 'Indoor Edge',
    desc: 'Indoor edge logger (AQMi) based on RDL838 Industrial Data Logger architecture for indoor environment data acquisition, processing, and transmission.',
    specs: ['RDL838 Platform', 'ESP32 MCU', 'XY-MD02 Interface'],
    color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20',
    highlight: true,
  },
  {
    icon: Cpu,
    name: 'AQMo Edge Logger',
    category: 'Outdoor Edge',
    desc: 'Outdoor edge logger (AQMo) for outdoor environment data acquisition. Ruggedized design for deployment in traffic junctions, industrial zones, and urban locations.',
    specs: ['RDL838 Platform', 'ESP32 MCU', 'Weatherproof Housing'],
    color: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/20',
    highlight: true,
  },
  {
    icon: Wifi,
    name: 'Connectivity Module',
    category: 'Communication',
    desc: 'Integrated Wi-Fi and GSM (4G/5G) module providing flexible connectivity for both local network and cellular network data transmission.',
    specs: ['Wi-Fi 802.11 b/g/n', '4G LTE / 5G', 'MQTT / REST'],
    color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20',
  },
  {
    icon: BatteryCharging,
    name: 'Power Supply',
    category: 'Power',
    desc: 'Rechargeable battery and Mornsun industrial power supply unit (visible in the hardware prototype), providing stable regulated DC power to all components.',
    specs: ['Mornsun PSU', 'DC 24V Output', 'Rechargeable Battery'],
    color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20',
  },
  {
    icon: Shield,
    name: 'Weatherproof Enclosure',
    category: 'Mechanical',
    desc: 'IP-rated weatherproof enclosure and RDL junction box (visible in prototype) protecting all electronics from outdoor environmental conditions.',
    specs: ['RDL Junction Box', 'IP-rated Enclosure', '3D-Printed Design'],
    color: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/20',
  },
];

const JOURNEY_STEPS = [
  { label: 'Sensor',       desc: 'Measures physical parameter' },
  { label: 'Signal',       desc: 'Analog/digital conversion' },
  { label: 'Edge Logger',  desc: 'Local acquisition & validation' },
  { label: 'Connectivity', desc: 'Wi-Fi / 4G / 5G transmission' },
  { label: 'Cloud',        desc: 'Storage & processing' },
  { label: 'Analytics',    desc: 'Trend analysis & forecasting' },
  { label: 'Dashboard',    desc: 'Visualization & alerts' },
];

export default function HardwareSection() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="hardware" className="py-24 bg-[#050f1e]">
      <div className="section-wrapper">
        <SectionHeader
          eyebrow="Sensor & Hardware Components"
          title={<>AQMS <span className="gradient-text">Hardware Platform</span></>}
          subtitle="Complete bill of components — from sensors and edge loggers to connectivity modules and enclosures — that make up the AQMS physical layer."
        />

        {/* Hardware prototype spotlight */}
        <div className="glass-card border border-cyan-500/30 p-6 mb-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full
                              bg-cyan-500/10 border border-cyan-500/20">
                <Cpu size={12} className="text-cyan-400" />
                <span className="text-cyan-400 text-xs font-semibold">AQMS Hardware Prototype</span>
              </div>
              <h3 className="text-white font-bold text-xl mb-3">Physical Prototype</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                The AQMS hardware prototype integrates the RDL838 Industrial Data Logger with a Smart Analytic Tool,
                the XY-MD02 temperature and humidity sensor, and a Mornsun industrial-grade power supply,
                all mounted on a structured panel with proper wiring and connectivity infrastructure.
              </p>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'RDL838 Industrial Data Logger', note: 'Smart Analytic Tool, CE certified' },
                  { label: 'XY-MD02 Temp/Humidity Transmitter', note: 'RS485 Modbus interface' },
                  { label: 'RDL Junction Box', note: 'Field wiring and connections' },
                  { label: 'Mornsun Power Supply', note: 'Industrial-grade DC power' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span className="text-slate-300 text-sm">{item.label}</span>
                    <span className="text-slate-600 text-xs hidden sm:block">— {item.note}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-2xl blur-xl -m-4" />
              <div className="relative rounded-2xl overflow-hidden border border-cyan-500/20">
                <img
                  src="/hardware-prototype.jpg"
                  alt="AQMS Hardware Prototype"
                  className="w-full object-cover"
                  style={{ maxHeight: '280px', objectPosition: 'center top' }}
                  onError={e => {
                    e.currentTarget.src = '/hardware-placeholder.svg';
                    e.currentTarget.className = 'w-full h-48 object-contain rounded-2xl p-4';
                    e.currentTarget.onerror = null; // prevent infinite loop
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Component grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-12">
          {COMPONENTS.map(comp => (
            <button
              key={comp.name}
              onClick={() => setSelected(selected?.name === comp.name ? null : comp)}
              className={`glass-card text-left p-4 transition-all duration-300
                          hover:scale-[1.02] cursor-pointer
                          ${selected?.name === comp.name
                            ? `${comp.border} shadow-[0_0_20px_rgba(6,182,212,0.15)]`
                            : 'border-white/5 hover:border-white/10'}`}
            >
              {comp.highlight && (
                <div className="mb-2">
                  <span className="text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded
                                   bg-teal-500/20 text-teal-400 border border-teal-500/30">Core Component</span>
                </div>
              )}
              <div className={`w-9 h-9 rounded-xl ${comp.bg} border ${comp.border}
                              flex items-center justify-center mb-3`}>
                <comp.icon size={16} className={comp.color} />
              </div>
              <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider mb-1">{comp.category}</p>
              <h4 className="text-white font-semibold text-xs leading-tight">{comp.name}</h4>
            </button>
          ))}
        </div>

        {/* Selected component detail */}
        {selected && (
          <div className={`glass-card p-6 mb-12 border ${selected.border} transition-all`}>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl ${selected.bg} border ${selected.border}
                                  flex items-center justify-center`}>
                    <selected.icon size={18} className={selected.color} />
                  </div>
                  <div>
                    <p className="text-slate-500 text-[10px] uppercase tracking-wider">{selected.category}</p>
                    <h4 className="text-white font-bold text-base">{selected.name}</h4>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{selected.desc}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wider mb-2">Specifications</p>
                <ul className="flex flex-col gap-2">
                  {selected.specs.map(s => (
                    <li key={s} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-slate-500" />
                      <span className="text-slate-300 text-xs font-mono">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Data journey */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-6">Data Journey: Sensor to Dashboard</h3>
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap overflow-x-auto no-scrollbar">
            {JOURNEY_STEPS.map((step, i) => (
              <React.Fragment key={step.label}>
                <div className="flex flex-col items-center gap-2 min-w-[80px] sm:min-w-[100px]">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30
                                  flex items-center justify-center text-cyan-400 font-bold text-sm">
                    {i + 1}
                  </div>
                  <span className="text-white text-xs font-semibold text-center">{step.label}</span>
                  <span className="text-slate-600 text-[10px] text-center leading-tight">{step.desc}</span>
                </div>
                {i < JOURNEY_STEPS.length - 1 && (
                  <ChevronRight size={16} className="text-cyan-800 shrink-0 hidden sm:block" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
