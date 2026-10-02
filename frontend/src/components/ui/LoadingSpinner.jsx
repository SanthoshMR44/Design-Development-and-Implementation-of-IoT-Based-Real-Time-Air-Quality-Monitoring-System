import React from 'react';

export default function LoadingSpinner({ message = 'Loading AQMS data…', size = 'md' }) {
  const ring = size === 'sm' ? 'w-6 h-6' : size === 'lg' ? 'w-16 h-16' : 'w-10 h-10';
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className={`${ring} rounded-full border-2 border-cyan-900 border-t-cyan-500 animate-spin`} />
      {message && <p className="text-slate-400 text-sm">{message}</p>}
    </div>
  );
}
