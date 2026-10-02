import React, { useState } from 'react';
import { Activity, Cpu, Wifi, Cloud, BarChart3, Bell, Smartphone } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';

const LAYERS = [
  {
    id: 'sensors',
    icon: Activity,
    label: 'Sensors',
    sublabel: 'Physical Environment',
    color: '#22d3ee',
    items: ['PM2.5 / PM10 Sensor', 'Gas Sensors (CO, NO₂, SO₂, O₃)', 'Temp / Humidity / Pressure', 'eCO₂ & TVOC (Indoor)', 'Wind, Rain, Solar (Outdoor)'],
    detail: {
      title: 'IoT Sensor Layer',
      desc: 'Physical sensing layer comprising multiple sensor modules measuring particulate matter, gas concentrations, meteorological parameters, and indoor air quality indicators. Sensors connect to the AQMi (indoor) or AQMo (outdoor) edge logger via analog and digital interfaces.',
      tech: ['PM Sensor', 'MQ Gas Sensors', 'SHT Temp/Humidity', 'XY-MD02', 'Anemometer', 'Rain Gauge'],
    },
  },
  {
    id: 'edge',
    icon: Cpu,
    label: 'Edge Logger',
    sublabel: 'AQMi / AQMo',
    color: '#2dd4bf',
    items: ['AQMo Edge Logger (Outdoor)', 'AQMi Edge Logger (Indoor)', 'ESP32 Processing Unit', 'PCB Hardware', 'Local Data Buffering'],
    detail: {
      title: 'Edge Processing Layer',
      desc: 'The AQMi (indoor) and AQMo (outdoor) edge loggers — based on the RDL838 Industrial Data Logger architecture — perform local data acquisition, signal conditioning, validation, and buffering. The ESP32 microcontroller unit handles processing and connectivity management.',
      tech: ['RDL838 Industrial Logger', 'ESP32', 'PCB Assembly', 'Edge Gateway', 'Local Storage'],
    },
  },
  {
    id: 'connectivity',
    icon: Wifi,
    label: 'Connectivity',
    sublabel: 'Wi-Fi / 4G / 5G',
    color: '#818cf8',
    items: ['Wi-Fi Module', '4G / 5G GSM Module', 'MQTT Protocol', 'REST API', 'Edge Gateway'],
    detail: {
      title: 'Connectivity Layer',
      desc: 'Multi-mode connectivity supporting Wi-Fi for campus/building deployments and 4G/5G cellular for remote outdoor monitoring. Data is transmitted using MQTT for efficient IoT messaging or REST APIs for integration. The Edge Gateway bridges field devices to the cloud.',
      tech: ['Wi-Fi / GSM Module', 'MQTT Broker', 'REST API', 'TLS Encryption', '4G/5G Antenna'],
    },
  },
  {
    id: 'cloud',
    icon: Cloud,
    label: 'AQMS Cloud',
    sublabel: 'Cloud / On-Premise',
    color: '#6366f1',
    items: ['AQMS Cloud Platform', 'Node.js Backend', 'MongoDB Database', 'AWS Hosting (BOM context)', 'On-Premise Option'],
    detail: {
      title: 'Cloud & Infrastructure Layer',
      desc: 'Centralized cloud infrastructure — built on Node.js + Express.js with MongoDB — receives, validates, stores, and processes sensor data. The project identifies AWS cloud hosting and storage in its investment/BOM context. On-premise deployment is also supported for sensitive environments.',
      tech: ['Node.js + Express', 'MongoDB', 'Socket.IO', 'REST API', 'AWS (BOM context)'],
    },
  },
  {
    id: 'analytics',
    icon: BarChart3,
    label: 'Analytics',
    sublabel: 'Data Intelligence',
    color: '#a855f7',
    items: ['Historical Trend Analysis', 'Pollutant Comparison', 'Indoor vs Outdoor', 'Daily/Weekly/Monthly', 'Forecasting Visualization'],
    detail: {
      title: 'Analytics & Processing Layer',
      desc: 'The analytics engine processes raw sensor data to generate historical trends, pollutant comparisons, indoor-outdoor correlations, and forecast visualizations. The existing KNN-based AQI prediction model (originally in Python) has been migrated to the Node.js backend.',
      tech: ['KNN Prediction (JS)', 'Time Series', 'Recharts', 'Statistical Analysis'],
    },
  },
  {
    id: 'alerts',
    icon: Bell,
    label: 'Alerts',
    sublabel: 'Real-Time Notifications',
    color: '#f43f5e',
    items: ['PM2.5 Threshold Alert', 'Harmful Gas Detection', 'Indoor Air Quality Alert', 'Device Malfunction Alert', 'Connectivity Loss Alert'],
    detail: {
      title: 'Alert & Notification Layer',
      desc: 'Real-time alert engine monitors sensor data streams for threshold violations and anomalies. When harmful conditions are detected, alerts are generated and delivered through the dashboard, mobile notifications, and optional email/SMS channels. Target response time: < 5 seconds.',
      tech: ['Socket.IO Push', 'Threshold Engine', 'Multi-Channel', 'Alert Dashboard'],
    },
  },
  {
    id: 'applications',
    icon: Smartphone,
    label: 'Applications',
    sublabel: 'User Interface',
    color: '#10b981',
    items: ['AQMS Web Application', 'On-Premise Display', 'Mobile Alerts', 'BMS Integration (possible)', 'API Integration'],
    detail: {
      title: 'Application Layer',
      desc: 'End-user interfaces including the AQMS web application (this platform), on-premise display panels, and mobile alert channels. The platform exposes REST APIs enabling future integration with Building Management Systems (BMS) and third-party environmental monitoring platforms.',
      tech: ['React.js + Vite', 'Tailwind CSS', 'Recharts', 'Leaflet Maps', 'REST API'],
    },
  },
];

export default function ArchitectureSection() {
  const [activeLayer, setActiveLayer] = useState(0);
  const layer = LAYERS[activeLayer];

  return (
    <section id="architecture" className="py-24 bg-[#020818]">
      <div className="section-wrapper">
        <SectionHeader
          eyebrow="System Architecture"
          title={<>End-to-End IoT <span className="gradient-text">Architecture</span></>}
          subtitle="Click any layer to explore the technical details of each stage in the AQMS data pipeline — from physical sensors to user applications."
          centered
        />

        {/* Architecture visual */}
        <div className="glass-card border border-cyan-500/20 p-6 sm:p-8 mb-8">
          {/* Layer flow */}
          <div className="flex items-center justify-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar pb-4">
            {LAYERS.map((l, i) => (
              <React.Fragment key={l.id}>
                <button
                  onClick={() => setActiveLayer(i)}
                  className={`flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl
                               border transition-all duration-300 min-w-[80px] sm:min-w-[90px]
                               ${i === activeLayer
                                  ? 'border-opacity-100 scale-105'
                                  : 'border-white/10 hover:border-white/20 hover:scale-102'}`}
                  style={i === activeLayer ? {
                    backgroundColor: l.color + '15',
                    borderColor:     l.color + '60',
                    boxShadow:       `0 0 20px ${l.color}20`,
                  } : {}}
                  aria-label={`View ${l.label} layer`}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                    style={{ backgroundColor: i === activeLayer ? l.color + '25' : 'transparent' }}
                  >
                    <l.icon size={18} style={{ color: i === activeLayer ? l.color : '#64748b' }} />
                  </div>
                  <span className="text-[10px] sm:text-xs font-semibold text-center leading-tight"
                        style={{ color: i === activeLayer ? l.color : '#94a3b8' }}>
                    {l.label}
                  </span>
                  <span className="hidden sm:block text-[9px] text-center text-slate-600">
                    {l.sublabel}
                  </span>
                </button>

                {/* Connector */}
                {i < LAYERS.length - 1 && (
                  <div className="flex items-center shrink-0">
                    <svg width="28" height="12" className="overflow-visible">
                      <defs>
                        <marker id={`arrow-${i}`} markerWidth="6" markerHeight="6"
                                refX="3" refY="3" orient="auto">
                          <path d="M0,0 L0,6 L6,3 z"
                                fill={i < activeLayer ? '#06b6d4' : 'rgba(100,116,139,0.4)'} />
                        </marker>
                      </defs>
                      <line x1="2" y1="6" x2="22" y2="6"
                            stroke={i < activeLayer ? '#06b6d4' : 'rgba(100,116,139,0.3)'}
                            strokeWidth="1.5"
                            strokeDasharray={i < activeLayer ? 'none' : '4,3'}
                            markerEnd={`url(#arrow-${i})`} />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Active layer detail */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div
            className="lg:col-span-2 glass-card p-6 border transition-all duration-500"
            style={{ borderColor: layer.color + '40' }}
          >
            <div className="flex items-start gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                   style={{ backgroundColor: layer.color + '15', border: `1px solid ${layer.color}40` }}>
                <layer.icon size={26} style={{ color: layer.color }} />
              </div>
              <div>
                <h3 className="text-white font-bold text-xl mb-1">{layer.detail.title}</h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded"
                      style={{ backgroundColor: layer.color + '15', color: layer.color }}>
                  Layer {activeLayer + 1} of {LAYERS.length}
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">{layer.detail.desc}</p>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Technologies / Components</p>
              <div className="flex flex-wrap gap-2">
                {layer.detail.tech.map(t => (
                  <span key={t} className="px-2.5 py-1 rounded-lg text-xs font-medium"
                        style={{ backgroundColor: layer.color + '10', color: layer.color, border: `1px solid ${layer.color}30` }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-card p-5 border border-white/5">
            <h4 className="text-white font-semibold text-sm mb-4">Layer Components</h4>
            <ul className="flex flex-col gap-2.5">
              {layer.items.map(item => (
                <li key={item} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                       style={{ backgroundColor: layer.color }} />
                  <span className="text-slate-300 text-xs">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 p-3 rounded-xl bg-white/3 border border-white/5">
              <p className="text-slate-500 text-xs text-center">
                ← Navigate layers to explore the full pipeline
              </p>
            </div>
          </div>
        </div>

        {/* Architecture summary */}
        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          {[
            { label: 'Physical Layer', desc: 'Sensors → Edge Logger (AQMi/AQMo) → PCB Hardware' },
            { label: 'Data Layer', desc: 'Wi-Fi/4G/5G → MQTT/REST → Node.js Backend → MongoDB' },
            { label: 'Application Layer', desc: 'Analytics → Alerts → Dashboard → BMS Integration' },
          ].map(s => (
            <div key={s.label} className="glass-card p-4 border border-white/5 text-center">
              <p className="text-cyan-400 font-semibold text-sm mb-1">{s.label}</p>
              <p className="text-slate-500 text-xs">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
