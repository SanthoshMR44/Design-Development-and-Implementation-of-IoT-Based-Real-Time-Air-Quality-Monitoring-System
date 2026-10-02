import React from 'react';
import { Factory, TrafficCone, Building2, ShoppingBag, Leaf, Landmark, Cross, GraduationCap, Home, Wind } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';

const USE_CASES = [
  {
    icon: Factory,
    title: 'Industries',
    desc: 'Monitor air quality near industrial zones to detect emissions, ensure worker safety, and maintain regulatory compliance.',
    example: 'KIADB Industrial Area, Davangere — continuous outdoor monitoring of SO₂, NO₂, and PM levels.',
    color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20',
  },
  {
    icon: TrafficCone,
    title: 'Traffic Junctions',
    desc: 'Deploy at high-density intersections to monitor vehicular emissions — CO, NO₂, and PM2.5 — and inform smart traffic management.',
    example: 'MCC Traffic Junction, Davangere — real-time CO and NO₂ monitoring.',
    color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20',
  },
  {
    icon: Building2,
    title: 'Urban City Locations',
    desc: 'City-wide outdoor monitoring to build a granular AQI map, helping urban planners and residents understand air quality patterns.',
    example: 'Davangere City Center — multi-point outdoor AQI grid.',
    color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20',
  },
  {
    icon: ShoppingBag,
    title: 'Commercial Areas',
    desc: 'Shopping centres and crowded marketplaces require monitoring of both outdoor ambient and indoor air quality for visitor health.',
    example: 'Davangere Market Area — combined indoor/outdoor monitoring.',
    color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20',
  },
  {
    icon: Leaf,
    title: 'Eco-Sensitive Zones',
    desc: 'Protect environmentally sensitive areas from pollution encroachment with continuous monitoring and immediate alert on threshold violations.',
    example: 'P.J. Extension Green Zone — pollutant threshold monitoring.',
    color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20',
  },
  {
    icon: Landmark,
    title: 'Smart City Infrastructure',
    desc: 'Integrate with smart city platforms to provide real-time environmental data for city-wide decisions, dashboards, and public information systems.',
    example: 'Smart City Davangere — multi-node environmental data feed.',
    color: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/20',
  },
  {
    icon: Cross,
    title: 'Hospitals & Healthcare',
    desc: 'Ensure indoor air quality in healthcare facilities to protect patients and staff, monitoring eCO₂, TVOC, and PM levels in critical areas.',
    example: 'Hospital indoor monitoring — eCO₂/TVOC/PM2.5 in wards and OT.',
    color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20',
  },
  {
    icon: GraduationCap,
    title: 'College Campuses',
    desc: 'Monitor campus indoor and outdoor air quality, starting from demonstration deployments at JIT Davangere and expanding to other institutions.',
    example: 'JIT Davangere Campus — pilot deployment site.',
    color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/20',
  },
  {
    icon: Home,
    title: 'Indoor Buildings',
    desc: 'Office buildings, residential complexes, and public facilities benefit from continuous indoor AQI monitoring using the AQMi edge logger.',
    example: 'Office / Classroom — temperature, humidity, eCO₂, TVOC, PM monitoring.',
    color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20',
  },
];

const CUSTOMER_SEGMENTS = [
  { icon: Factory,      label: 'Industrial Organizations' },
  { icon: Landmark,     label: 'Smart City Authorities' },
  { icon: ShoppingBag,  label: 'Commercial Buildings' },
  { icon: Leaf,         label: 'Environmental Agencies' },
  { icon: TrafficCone,  label: 'Traffic Management' },
  { icon: Cross,        label: 'Healthcare Facilities' },
  { icon: GraduationCap,label: 'Educational Institutions' },
  { icon: Wind,         label: 'Environmental Research' },
];

export default function UseCasesSection() {
  return (
    <section id="usecases" className="py-24 bg-[#020818]">
      <div className="section-wrapper">
        <SectionHeader
          eyebrow="Use Cases & Deployment"
          title={<>Where AQMS <span className="gradient-text">Deploys</span></>}
          subtitle="AQMS is designed for flexible deployment across a wide range of indoor and outdoor environments, with a focus on high-impact monitoring locations."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {USE_CASES.map(uc => (
            <div key={uc.title}
                 className={`glass-card p-5 border ${uc.border} hover:scale-[1.01] transition-all duration-300 group`}>
              <div className={`w-11 h-11 rounded-xl ${uc.bg} border ${uc.border}
                              flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <uc.icon size={20} className={uc.color} />
              </div>
              <h3 className="text-white font-bold text-sm mb-2">{uc.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-3">{uc.desc}</p>
              <div className={`p-2.5 rounded-lg ${uc.bg} border ${uc.border}`}>
                <p className="text-[10px] text-slate-400 leading-relaxed">{uc.example}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Customer Segments */}
        <div id="customers">
          <h3 className="text-white font-bold text-xl mb-6">
            Customer <span className="gradient-text">Segments</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CUSTOMER_SEGMENTS.map(seg => (
              <div key={seg.label}
                   className="glass-card p-4 text-center hover:border-cyan-500/20 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20
                                flex items-center justify-center mx-auto mb-3
                                group-hover:bg-cyan-500/20 transition-colors">
                  <seg.icon size={16} className="text-cyan-400" />
                </div>
                <p className="text-slate-300 text-xs font-medium leading-tight">{seg.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
