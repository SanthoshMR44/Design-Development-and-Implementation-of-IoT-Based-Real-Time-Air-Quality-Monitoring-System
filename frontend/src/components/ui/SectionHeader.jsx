import React from 'react';

export default function SectionHeader({ eyebrow, title, subtitle, centered = false, className = '' }) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                        bg-cyan-500/10 border border-cyan-500/20 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-cyan-400 text-xs font-semibold tracking-widest uppercase">{eyebrow}</span>
        </div>
      )}
      <h2 className="section-title mb-4">{title}</h2>
      {subtitle && (
        <p className={`text-slate-400 text-lg leading-relaxed ${centered ? 'max-w-3xl mx-auto' : 'max-w-2xl'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
