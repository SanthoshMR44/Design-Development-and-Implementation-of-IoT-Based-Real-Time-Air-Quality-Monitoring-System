import React from 'react';
import { TrendingUp, Target, Crosshair, AlertCircle } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';

const COMPETITORS = [
  {
    name: 'Thermo Fisher Scientific',
    desc: 'Global analytical instruments company with air quality monitoring solutions for research and regulatory applications.',
    position: 'High-end research & compliance',
  },
  {
    name: 'Honeywell',
    desc: 'Industrial technology company offering environmental monitoring products for industrial safety and smart building applications.',
    position: 'Industrial & smart building',
  },
  {
    name: 'IQAir',
    desc: 'Air quality technology company focused on indoor and outdoor air quality monitoring with consumer and professional products.',
    position: 'Consumer & professional AQM',
  },
];

const DIFFERENTIATORS = [
  'Cost-effective real-time indoor & outdoor monitoring',
  'Multi-level environmental mapping from one platform',
  'Rapid harmful-gas detection (< 5 second target)',
  'Centralized device management for distributed nodes',
  'Scalable IoT + Edge + Cloud architecture',
  'Designed for campus, traffic, and industrial deployment',
];

const IMPACT_ITEMS = [
  {
    icon: '👷',
    title: 'Employment Generation',
    desc: 'Creates jobs through manufacturing, installation, field deployment, and data monitoring operations.',
    color: '#06b6d4',
  },
  {
    icon: '🌍',
    title: 'Empowering Society',
    desc: 'Provides real-time air quality data empowering communities, institutions, and authorities with better environmental decisions.',
    color: '#10b981',
  },
  {
    icon: '❤️',
    title: 'Improving Lives',
    desc: 'Supports public health protection through early detection and alerts for harmful air conditions.',
    color: '#f43f5e',
  },
  {
    icon: '🌱',
    title: 'Reducing Carbon Footprint',
    desc: 'Identifies pollution sources and supports targeted interventions to help lower emissions over time.',
    color: '#22c55e',
  },
  {
    icon: '⚡',
    title: 'Saving Energy',
    desc: 'Smart air quality-based controls can enable energy-efficient responses such as HVAC adjustments and ventilation optimization.',
    color: '#f59e0b',
  },
];

const STARTUP_APPROACHES = [
  { icon: '🏭', label: 'Local industries',          desc: 'Pilot installations for emission monitoring' },
  { icon: '🏥', label: 'Hospitals',                 desc: 'Indoor air quality for healthcare safety' },
  { icon: '🏙', label: 'Smart City Projects',       desc: 'Collaborate with government bodies' },
  { icon: '🎓', label: 'College Campuses',          desc: 'Demonstration and research deployments' },
  { icon: '📱', label: 'Social Media & Exhibitions',desc: 'Digital visibility and product showcasing' },
  { icon: '🆓', label: 'Free Trial Deployments',    desc: 'Early adopter pilot programs' },
];

export default function MarketSection() {
  return (
    <section id="market" className="py-24 bg-[#020818]">
      <div className="section-wrapper">
        {/* Market Opportunity */}
        <SectionHeader
          eyebrow="Market Opportunity"
          title={<>Addressable <span className="gradient-text">Market</span></>}
          subtitle="Market figures from the project presentation. Not independently verified market research."
          centered
        />

        {/* TAM/SAM/SOM */}
        <div className="grid sm:grid-cols-3 gap-6 mb-6">
          {[
            {
              icon: TrendingUp, label: 'TAM', value: '₹56,567 Cr', color: '#06b6d4',
              desc: 'Total Addressable Market',
              def: 'Overall global market demand for air quality monitoring solutions assuming full adoption across potential users and sectors.',
            },
            {
              icon: Target,     label: 'SAM', value: '₹800 Cr',    color: '#2dd4bf',
              desc: 'Serviceable Addressable Market',
              def: 'Portion of TAM the product can cater to based on capability and geographical location.',
            },
            {
              icon: Crosshair,  label: 'SOM', value: '₹27 Cr',     color: '#4ade80',
              desc: 'Serviceable Obtainable Market',
              def: 'Feasible portion of SAM that could potentially be captured within the next few years considering market conditions and product feasibility.',
            },
          ].map(m => (
            <div key={m.label} className="glass-card p-6 text-center border border-white/10
                                          hover:border-cyan-500/20 transition-all group">
              <div className="w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center
                              group-hover:scale-110 transition-transform"
                   style={{ backgroundColor: m.color + '15', border: `1px solid ${m.color}30` }}>
                <m.icon size={22} style={{ color: m.color }} />
              </div>
              <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">{m.label}</p>
              <div className="text-3xl font-black mb-1" style={{ color: m.color }}>{m.value}</div>
              <p className="text-slate-300 text-sm font-medium mb-2">{m.desc}</p>
              <p className="text-slate-600 text-xs leading-relaxed">{m.def}</p>
            </div>
          ))}
        </div>

        <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 mb-16">
          <AlertCircle size={14} className="text-amber-400 shrink-0 mt-0.5" />
          <p className="text-slate-500 text-xs">
            Figures from the AQMS project presentation — not independently verified market research.
          </p>
        </div>

        {/* Competition */}
        <div id="competition" className="mb-16">
          <h3 className="text-white font-bold text-2xl mb-2">
            Existing Solutions &amp; <span className="gradient-text">Differentiation</span>
          </h3>
          <p className="text-slate-400 text-sm mb-8 max-w-2xl">
            The following organizations are working on air quality monitoring solutions. AQMS presents its differentiation as documented project positioning — not a claim of objective superiority.
          </p>
          <div className="grid sm:grid-cols-3 gap-5 mb-8">
            {COMPETITORS.map(c => (
              <div key={c.name} className="glass-card p-5 border border-white/5 hover:border-white/10 transition-all">
                <h4 className="text-white font-semibold text-sm mb-1">{c.name}</h4>
                <span className="inline-block text-[10px] px-2 py-0.5 rounded-full
                                 bg-slate-500/20 text-slate-400 border border-slate-500/20 mb-3">
                  {c.position}
                </span>
                <p className="text-slate-500 text-xs leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
          <div className="glass-card p-5 border border-cyan-500/20">
            <p className="text-cyan-400 font-semibold text-sm mb-3">AQMS Differentiation (Project Positioning)</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {DIFFERENTIATORS.map(d => (
                <div key={d} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                  <span className="text-slate-300 text-xs">{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social & Economic Impact */}
        <div id="impact">
          <SectionHeader
            eyebrow="Social & Economic Impact"
            title={<>Impact of <span className="gradient-text">AQMS</span></>}
            subtitle="Five documented impact areas from the project presentation."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {IMPACT_ITEMS.map(item => (
              <div key={item.title}
                   className="glass-card p-5 hover:border-cyan-500/20 transition-all group border border-white/5">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform w-fit">
                  {item.icon}
                </div>
                <h4 className="text-white font-bold text-sm mb-2" style={{ color: item.color }}>
                  {item.title}
                </h4>
                <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Startup Potential */}
        <div id="startup">
          <SectionHeader
            eyebrow="Startup Potential"
            title={<>Business <span className="gradient-text">Opportunity</span></>}
            subtitle="AQMS has startup potential through scalable B2B and B2C applications. The opportunity is associated with rising air pollution and the lack of affordable real-time monitoring solutions."
          />
          <div className="grid sm:grid-cols-3 gap-5 mb-8">
            {[
              { icon: '🏙', label: 'Smart Cities',  desc: 'Municipal and government monitoring networks' },
              { icon: '🏭', label: 'B2B Industry',  desc: 'Industrial emission monitoring subscriptions' },
              { icon: '🏠', label: 'B2C Homes',     desc: 'Consumer indoor air quality monitoring products' },
            ].map(s => (
              <div key={s.label} className="glass-card p-5 text-center border border-white/5">
                <div className="text-3xl mb-2">{s.icon}</div>
                <h4 className="text-white font-semibold text-sm mb-1">{s.label}</h4>
                <p className="text-slate-500 text-xs">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Go-to-Market */}
          <div id="gtm" className="glass-card p-6 border border-teal-500/20">
            <h4 className="text-teal-400 font-semibold text-sm mb-4">Go-to-Market: First 10 Customers Strategy</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {STARTUP_APPROACHES.map(a => (
                <div key={a.label} className="flex items-start gap-3">
                  <span className="text-lg shrink-0">{a.icon}</span>
                  <div>
                    <p className="text-white text-xs font-semibold">{a.label}</p>
                    <p className="text-slate-500 text-xs">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-slate-600 text-xs mt-4">
              These are proposed strategies from the project presentation, not completed customer acquisitions.
            </p>
          </div>
        </div>

        {/* Research & Patent */}
        <div id="research" className="mt-16">
          <SectionHeader
            eyebrow="Research & Innovation"
            title={<>Patent &amp; Publication <span className="gradient-text">Potential</span></>}
            subtitle="The project identifies potential for patents, publications, and conference participation. These are future opportunities, not currently granted or accepted."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: '📝', label: 'Patent Potential',      desc: 'Novel IoT + Edge + Cloud architecture for indoor-outdoor AQI monitoring' },
              { icon: '📄', label: 'Publication Potential', desc: 'Research papers on real-time AQI monitoring methodology and system design' },
              { icon: '🎤', label: 'Conference Potential',  desc: 'IoT, environmental engineering, and smart city conference presentations' },
              { icon: '🔬', label: 'Future Research',       desc: 'ML-enhanced forecasting, sensor fusion, and smart city integration' },
            ].map(r => (
              <div key={r.label} className="glass-card p-5 border border-white/5 hover:border-violet-500/20 transition-all">
                <div className="text-3xl mb-3">{r.icon}</div>
                <h4 className="text-white font-semibold text-sm mb-2">{r.label}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-slate-600 text-xs mt-4">
            * No patents have been granted, publications accepted, or conference papers submitted at this stage.
          </p>
        </div>
      </div>
    </section>
  );
}
