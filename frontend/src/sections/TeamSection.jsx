import React from 'react';
import { GraduationCap, Code2, Cloud, Globe, Briefcase } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';

const TEAM_MEMBERS = [
  {
    name:   'Deepa Chandrashekhar Rathod',
    dept:   'CSE, 7th Semester, AIML',
    role:   'Python Developer',
    icon:   Code2,
    color:  '#f43f5e',
    initials: 'DC',
  },
  {
    name:   'Santhosh MR',
    dept:   'CSE, 7th Semester, AIML',
    role:   'Cloud Computing',
    icon:   Cloud,
    color:  '#06b6d4',
    initials: 'SM',
  },
  {
    name:   'Arpitha GA',
    dept:   'CSE, 7th Semester, AIML',
    role:   'Web Development',
    icon:   Globe,
    color:  '#a855f7',
    initials: 'AG',
  },
  {
    name:   'Brunda U Jajur',
    dept:   'CSE, 7th Semester',
    role:   'Web Development',
    icon:   Globe,
    color:  '#10b981',
    initials: 'BJ',
  },
  {
    name:   'Keerthi M Rao',
    dept:   'ISE, 7th Semester, AIML',
    role:   'Cloud Computing',
    icon:   Cloud,
    color:  '#f59e0b',
    initials: 'KR',
  },
];

const MENTORS = [
  {
    name:       'Dr. Latha B M',
    designation:'Professor and HOD',
    department: 'Department of CS&E',
    institution:'JIT Davangere',
    initials:   'LB',
    color:      '#06b6d4',
    type: 'faculty',
  },
  {
    name:       'Dr. H.S. Saraswathi',
    designation:'Professor and HOD',
    department: 'Department of IS&E',
    institution:'JIT Davangere',
    initials:   'HS',
    color:      '#2dd4bf',
    type: 'faculty',
  },
  {
    name:       'Vinutha L B',
    designation:'Assistant Professor',
    department: 'Department of EC&E',
    institution:'JIT Davangere',
    initials:   'VL',
    color:      '#10b981',
    type: 'faculty',
  },
  {
    name:       'Raghavendra G Shetty',
    designation:'Co-Founder & CEO',
    department: 'RDL Technologies LTD',
    institution:'Industry Advisor',
    initials:   'RS',
    color:      '#f59e0b',
    type: 'industry',
  },
];

function TeamCard({ member }) {
  return (
    <div className="glass-card p-5 flex flex-col items-center text-center
                    hover:border-white/15 hover:scale-[1.02] transition-all duration-300 group">
      {/* Avatar */}
      <div className="relative mb-4">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center
                        text-xl font-black text-white"
             style={{ backgroundColor: member.color + '20', border: `2px solid ${member.color}50` }}>
          {member.initials}
        </div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg flex items-center justify-center"
             style={{ backgroundColor: member.color + '15', border: `1px solid ${member.color}40` }}>
          <member.icon size={11} style={{ color: member.color }} />
        </div>
      </div>
      <h3 className="text-white font-bold text-sm leading-tight mb-1">{member.name}</h3>
      <p className="text-slate-500 text-xs mb-2">{member.dept}</p>
      <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold"
            style={{ backgroundColor: member.color + '15', color: member.color, border: `1px solid ${member.color}30` }}>
        {member.role}
      </span>
    </div>
  );
}

function MentorCard({ mentor }) {
  return (
    <div className="glass-card p-5 flex items-start gap-4
                    hover:border-white/15 transition-all duration-300 group">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0
                      text-base font-black text-white"
           style={{ backgroundColor: mentor.color + '20', border: `2px solid ${mentor.color}40` }}>
        {mentor.initials}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-white font-bold text-sm">{mentor.name}</h4>
        <p className="text-slate-300 text-xs mt-0.5">{mentor.designation}</p>
        <p className="text-slate-500 text-xs">{mentor.department}</p>
        <p className="text-slate-600 text-xs">{mentor.institution}</p>
        <span className="inline-block mt-2 text-[9px] font-semibold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: mentor.color + '15', color: mentor.color }}>
          {mentor.type === 'industry' ? '🏢 Industry Advisor' : '🎓 Academic Mentor'}
        </span>
      </div>
    </div>
  );
}

const TECH_AQMS = [
  'IoT Sensors (PM, Gas, Env, eCO₂, TVOC, Wind)',
  'ESP32 Microcontroller',
  'AQMi Edge Logger',
  'AQMo Edge Logger',
  'Wi-Fi / 4G / 5G Connectivity',
  'PCB Hardware',
  'AQMS Cloud Platform',
  'AWS (hosting/storage context)',
  'AQMS Application',
  'Mobile Alerts',
  'On-Premise Display',
  'Edge Gateway',
  'BMS Integration (possible)',
  'Analytics & Forecasting',
  'Adaptable Sensor Interface',
];

const TECH_WEB = [
  'Node.js + Express.js',
  'React.js + Vite',
  'Tailwind CSS',
  'Socket.IO',
  'REST APIs',
  'MongoDB / Mongoose (optional)',
  'Recharts',
  'Leaflet',
  'Framer Motion',
  'Axios',
];

export default function TeamSection() {
  return (
    <section id="team" className="py-24 bg-[#050f1e]">
      <div className="section-wrapper">
        {/* Team */}
        <SectionHeader
          eyebrow="Project Team"
          title={<>The People Behind <span className="gradient-text">AQMS</span></>}
          subtitle="7th-semester engineering students from JIT Davangere building a real-world IoT environmental monitoring platform."
          centered
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
          {TEAM_MEMBERS.map(m => <TeamCard key={m.name} member={m} />)}
        </div>

        {/* Mentors */}
        <div className="mb-16">
          <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
            <GraduationCap size={20} className="text-cyan-400" />
            Mentors &amp; Advisors
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {MENTORS.map(m => <MentorCard key={m.name} mentor={m} />)}
          </div>
        </div>

        {/* Technology Stack */}
        <div id="techstack">
          <SectionHeader
            eyebrow="Technology Stack"
            title={<>Platform <span className="gradient-text">Technologies</span></>}
            subtitle="A clear distinction between the AQMS project hardware/system technology and the website implementation technology."
          />
          <div className="grid lg:grid-cols-2 gap-6">
            {/* AQMS System Technology */}
            <div className="glass-card p-6 border border-cyan-500/20">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  <Briefcase size={14} className="text-cyan-400" />
                </div>
                <div>
                  <p className="text-cyan-400 font-bold text-sm">AQMS Project Technology</p>
                  <p className="text-slate-600 text-xs">Hardware, IoT, and platform system components</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {TECH_AQMS.map(t => (
                  <span key={t} className="px-2.5 py-1 rounded-lg text-xs
                                           bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Website Implementation Stack */}
            <div className="glass-card p-6 border border-teal-500/20">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                  <Code2 size={14} className="text-teal-400" />
                </div>
                <div>
                  <p className="text-teal-400 font-bold text-sm">Website Implementation Stack</p>
                  <p className="text-slate-600 text-xs">Technologies used to build this web platform</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {TECH_WEB.map(t => (
                  <span key={t} className="px-2.5 py-1 rounded-lg text-xs
                                           bg-teal-500/10 text-teal-300 border border-teal-500/20">
                    {t}
                  </span>
                ))}
              </div>
              <p className="text-slate-600 text-xs mt-4">
                Note: React, Tailwind CSS, and other web technologies are used to build this demonstration platform only — they are not part of the physical AQMS hardware system.
              </p>
            </div>
          </div>
        </div>

        {/* Implementation Timeline */}
        <div id="timeline" className="mt-16">
          <SectionHeader
            eyebrow="Implementation"
            title={<>Project <span className="gradient-text">Timeline</span></>}
            subtitle="Timeline framework — detailed milestone dates to be populated from the project implementation schedule."
          />
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-teal-500/30 to-transparent" />
            <div className="flex flex-col gap-6 pl-16">
              {[
                { phase: 'Requirements',              desc: 'Stakeholder analysis, functional & non-functional requirements definition' },
                { phase: 'Sensor & Hardware Dev',     desc: 'Sensor selection, procurement, and hardware component testing' },
                { phase: 'PCB / Prototyping',         desc: 'Circuit design, PCB layout, 3D printing, board manufacturing and assembly' },
                { phase: 'IoT / Edge Integration',    desc: 'ESP32 programming, AQMi/AQMo edge logger configuration and field testing' },
                { phase: 'Cloud / App Development',   desc: 'Node.js backend, MongoDB, React frontend, API development' },
                { phase: 'Testing & Calibration',     desc: 'Sensor accuracy validation, system-level testing, performance benchmarking' },
                { phase: 'Deployment',                desc: 'Field deployment at pilot locations, connectivity verification' },
                { phase: 'Validation',                desc: 'Real-world performance validation, stakeholder review, documentation' },
              ].map((step, i) => (
                <div key={step.phase} className="relative">
                  <div className="absolute -left-10 top-1 w-4 h-4 rounded-full border-2 border-cyan-500/50 bg-cyan-500/20" />
                  <div className="glass-card p-4 border border-white/5 hover:border-white/10 transition-all">
                    <div className="flex items-center gap-3">
                      <span className="text-cyan-400 font-mono text-[10px] font-bold">0{i + 1}</span>
                      <h4 className="text-white font-semibold text-sm">{step.phase}</h4>
                    </div>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Assumptions */}
        <div id="assumptions" className="mt-16">
          <SectionHeader
            eyebrow="Assumptions & Alternatives"
            title={<>Design <span className="gradient-text">Rationale</span></>}
          />
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="glass-card p-6 border border-white/5">
              <h4 className="text-white font-semibold text-sm mb-4">Key Assumptions</h4>
              {[
                'IoT and cloud infrastructure support real-time accurate monitoring',
                'System should be scalable and cost-effective for broad deployment',
                'Indoor and outdoor integration into one platform is technically feasible',
                'Sensors and connectivity will be reliable in deployment conditions',
                'Users require real-time monitoring over periodic batch reporting',
                'System integration with existing infrastructure is feasible',
                'There is sufficient demand for an affordable monitoring solution',
              ].map(a => (
                <div key={a} className="flex items-start gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                  <span className="text-slate-400 text-xs">{a}</span>
                </div>
              ))}
            </div>
            <div className="glass-card p-6 border border-white/5">
              <h4 className="text-white font-semibold text-sm mb-4">Alternatives Considered</h4>
              <div className="flex flex-col gap-3 mb-4">
                {[
                  { opt: 'Standalone Sensors Only', note: 'Limited to local display, no centralized cloud analytics', rejected: true },
                  { opt: 'Cloud-Only System',        note: 'No edge processing, high latency, no offline resilience', rejected: true },
                  { opt: 'IoT + Edge + Cloud',       note: 'Selected: real-time performance, scalability, cost-effectiveness, centralized monitoring', rejected: false },
                ].map(a => (
                  <div key={a.opt} className={`p-3 rounded-xl border ${a.rejected ? 'border-red-500/20 bg-red-500/5' : 'border-green-500/30 bg-green-500/5'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs">{a.rejected ? '✗' : '✓'}</span>
                      <span className="text-white text-xs font-semibold">{a.opt}</span>
                      {!a.rejected && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-400">Selected</span>}
                    </div>
                    <p className="text-slate-500 text-xs">{a.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cloud Infrastructure */}
        <div id="cloud" className="mt-16">
          <SectionHeader
            eyebrow="Cloud & Data Infrastructure"
            title={<>AQMS <span className="gradient-text">Cloud Platform</span></>}
            subtitle="How data flows from physical sensors to the user dashboard. In the current demo deployment, the Node.js backend uses in-memory demo data. MongoDB is an optional persistent storage layer for production."
          />
          <div className="glass-card p-6 border border-indigo-500/20">
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {[
                { label: 'Sensors',      color: '#06b6d4' },
                { label: '→', color: '#475569', plain: true },
                { label: 'Edge Logger', color: '#2dd4bf' },
                { label: '→', color: '#475569', plain: true },
                { label: 'Wi-Fi/4G/5G', color: '#818cf8' },
                { label: '→', color: '#475569', plain: true },
                { label: 'Node.js API', color: '#6366f1' },
                { label: '→', color: '#475569', plain: true },
                { label: 'MongoDB (opt.)', color: '#a855f7' },
                { label: '→', color: '#475569', plain: true },
                { label: 'Analytics',   color: '#f43f5e' },
                { label: '→', color: '#475569', plain: true },
                { label: 'Dashboard',   color: '#10b981' },
              ].map((s, i) =>
                s.plain ? (
                  <span key={i} className="text-slate-700 text-lg">→</span>
                ) : (
                  <span key={i} className="px-3 py-1.5 rounded-xl text-xs font-semibold"
                        style={{ backgroundColor: s.color + '15', color: s.color, border: `1px solid ${s.color}30` }}>
                    {s.label}
                  </span>
                )
              )}
            </div>
            <p className="text-slate-500 text-xs text-center mt-4">
              The project identifies AWS cloud hosting and storage in its investment/BOM context.
              The Node.js backend is designed for cloud deployment on AWS, Render, Railway, or any VPS.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
