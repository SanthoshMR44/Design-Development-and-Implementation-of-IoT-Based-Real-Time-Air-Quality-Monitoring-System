import React from 'react';
import { Activity } from 'lucide-react';

const FOOTER_LINKS = [
  { group: 'Platform', links: [
    { label: 'About AQMS',      href: '#about' },
    { label: 'Architecture',    href: '#architecture' },
    { label: 'Dashboard',       href: '#dashboard' },
    { label: 'Analytics',       href: '#analytics' },
  ]},
  { group: 'Project', links: [
    { label: 'Hardware',        href: '#hardware' },
    { label: 'Use Cases',       href: '#usecases' },
    { label: 'Investment',      href: '#investment' },
    { label: 'Market',          href: '#market' },
  ]},
  { group: 'Team', links: [
    { label: 'Team Members',    href: '#team' },
    { label: 'Research',        href: '#research' },
    { label: 'Contact',         href: '#contact' },
    { label: 'Request Demo',    href: '#contact' },
  ]},
];

export default function Footer() {
  const scrollTo = (href) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#020818] border-t border-white/5 pt-16 pb-8">
      <div className="section-wrapper">
        <div className="grid lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-500/30
                              flex items-center justify-center">
                <Activity size={16} className="text-cyan-400" />
              </div>
              <span className="font-black text-white text-lg tracking-tight">AQMS</span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed mb-4">
              Design, Development and Implementation of IoT-Based Real-Time Air Quality Monitoring System.
              Real-Time Intelligence for Cleaner, Safer Indoor &amp; Outdoor Environments.
            </p>
            <p className="text-slate-600 text-xs">
              A research and engineering project from JIT Davangere in collaboration with RDL Technologies LTD.
            </p>
          </div>

          {/* Links */}
          {FOOTER_LINKS.map(group => (
            <div key={group.group}>
              <h4 className="text-white font-semibold text-sm mb-4">{group.group}</h4>
              <ul className="flex flex-col gap-2.5">
                {group.links.map(link => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="text-slate-500 text-xs hover:text-cyan-400 transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center
                        justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-slate-600 text-xs">
              © 2026 AQMS — JIT Davangere. Academic research project.
            </p>
            <p className="text-slate-700 text-xs mt-1">
              All monitoring data displayed is DEMO / SIMULATED unless stated otherwise.
              No actual sensor readings, deployments, or revenue claims are implied.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-slate-600 text-xs font-mono">
              Node.js + React + IoT
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
