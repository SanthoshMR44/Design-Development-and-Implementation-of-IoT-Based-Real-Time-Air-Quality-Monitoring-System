import React from 'react';
import { AlertTriangle, DollarSign, Map, Timer, Activity, CheckCircle2 } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';

const PROBLEMS = [
  {
    icon: DollarSign,
    title: 'High Cost of Existing Systems',
    desc: 'Commercial air quality monitoring solutions from established vendors may be expensive, limiting access for smaller institutions, campuses, and developing urban areas.',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
  },
  {
    icon: Map,
    title: 'Limited Multi-Level Coverage',
    desc: 'Existing systems may not provide an exact multi-level air quality map covering both indoor and outdoor environments simultaneously from a single centralized platform.',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
  },
  {
    icon: Timer,
    title: 'Slow Harmful Gas Detection',
    desc: 'Current solutions may not detect harmful gases instantly. AQMS targets a response period of less than five seconds for rapid harmful air condition detection and alerting.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
  },
  {
    icon: Activity,
    title: 'Lack of Real-Time Integration',
    desc: 'Fragmented data from isolated sensors without centralized cloud integration limits the ability to correlate indoor and outdoor air quality conditions in real time.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
  },
];

const NEEDS = [
  'Affordable, accessible AQI monitoring solution',
  'Real-time indoor and outdoor air quality data',
  'Multi-level environmental mapping',
  'Prompt harmful gas detection (< 5 seconds)',
  'Health and safety awareness alerts',
  'Centralized device and data management',
  'Scalable deployment across locations',
  'Support for better environmental decisions',
];

export default function ProblemSection() {
  return (
    <section id="problem" className="py-24 bg-gradient-to-b from-[#020818] to-[#050f1e]">
      <div className="section-wrapper">
        <SectionHeader
          eyebrow="Problem Statement"
          title={<>The Gap AQMS <span className="gradient-text">Addresses</span></>}
          subtitle="Existing air quality monitoring systems present challenges that limit effective environmental monitoring and public health protection."
          centered
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {PROBLEMS.map(problem => (
            <div
              key={problem.title}
              className={`glass-card p-6 border ${problem.border} hover:scale-[1.02] transition-all duration-300`}
            >
              <div className={`w-12 h-12 rounded-xl ${problem.bg} border ${problem.border}
                              flex items-center justify-center mb-4`}>
                <problem.icon size={22} className={problem.color} />
              </div>
              <h3 className="text-white font-semibold text-sm mb-3 leading-tight">{problem.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{problem.desc}</p>
            </div>
          ))}
        </div>

        {/* Need for the Solution */}
        <div id="why" className="glass-card border border-cyan-500/20 p-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                              bg-cyan-500/10 border border-cyan-500/20 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-cyan-400 text-xs font-semibold tracking-widest uppercase">Why AQMS?</span>
              </div>
              <h3 className="text-white text-2xl font-bold mb-4">
                High Need for a Low-Cost,<br />
                <span className="gradient-text">Real-Time AQI Platform</span>
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                There is a significant and growing need for an affordable, accessible air quality monitoring system
                that can guarantee better health and safety conditions through real-time information, prompt alerts,
                improved decision-making, and ease of use.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                AQMS addresses this by combining IoT sensors, edge computing, and cloud infrastructure into a
                single cohesive platform that can be deployed cost-effectively across indoor and outdoor environments.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
                <AlertTriangle size={16} className="text-amber-400" />
                What the Solution Must Provide
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {NEEDS.map(need => (
                  <div key={need} className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-xs">{need}</span>
                  </div>
                ))}
              </div>

              {/* Response time highlight */}
              <div className="mt-6 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                <div className="flex items-center gap-3">
                  <div className="text-3xl font-black text-amber-400">&lt;5s</div>
                  <div>
                    <p className="text-white text-sm font-semibold">Target Response Time</p>
                    <p className="text-slate-500 text-xs">Harmful gas detection and alert delivery</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
