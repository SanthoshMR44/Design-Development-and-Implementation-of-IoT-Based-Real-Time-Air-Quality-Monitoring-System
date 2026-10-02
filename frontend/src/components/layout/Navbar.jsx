import React, { useState, useEffect } from 'react';
import { Wind, Menu, X, Activity } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Overview',    href: '#about' },
  { label: 'Problem',     href: '#problem' },
  { label: 'Features',    href: '#features' },
  { label: 'Architecture',href: '#architecture' },
  { label: 'Hardware',    href: '#hardware' },
  { label: 'Dashboard',   href: '#dashboard' },
  { label: 'Alerts',      href: '#alerts' },
  { label: 'Analytics',   href: '#analytics' },
  { label: 'Use Cases',   href: '#usecases' },
  { label: 'Market',      href: '#market' },
  { label: 'Team',        href: '#team' },
  { label: 'Contact',     href: '#contact' },
];

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [activeSection,setActiveSection]= useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      // Active section detection
      const sections = NAV_LINKS.map(l => l.href.replace('#', ''));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled ? 'bg-[#020818]/90 backdrop-blur-xl border-b border-white/5 shadow-lg' : 'bg-transparent'}`}
    >
      <div className="section-wrapper">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 group"
            aria-label="AQMS Home"
          >
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-full bg-cyan-500/20 group-hover:bg-cyan-500/30 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Activity size={16} className="text-cyan-400" />
              </div>
              <div className="absolute inset-0 rounded-full border border-cyan-500/50 animate-pulse-ring opacity-60" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-white text-sm tracking-wide">AQMS</span>
              <span className="text-cyan-400/70 text-[9px] tracking-widest uppercase font-medium hidden sm:block">
                Air Quality Monitor
              </span>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className={`nav-link px-2.5 py-1.5 rounded-lg text-xs transition-all
                  ${activeSection === link.href.replace('#','')
                    ? 'nav-link-active bg-cyan-500/10'
                    : 'hover:bg-white/5'}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNav('#contact')}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg
                         bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500
                         text-white text-xs font-semibold transition-all duration-200 btn-glow"
            >
              <Wind size={12} />
              Request Demo
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400
                         hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-[#020818]/95 backdrop-blur-xl
                          border-b border-white/10 py-4 px-4 grid grid-cols-2 gap-1">
            {NAV_LINKS.map(link => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="nav-link text-left px-3 py-2 rounded-lg hover:bg-white/5 text-xs"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNav('#contact')}
              className="col-span-2 mt-2 py-2.5 rounded-lg bg-gradient-to-r from-cyan-600 to-teal-600
                         text-white text-sm font-semibold transition-all"
            >
              Request AQMS Demo
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
