import React from 'react';
import { getAQIStatus } from '../../utils/aqiUtils';

export default function AQIGauge({ aqi, size = 120 }) {
  const status   = getAQIStatus(aqi);
  const maxAQI   = 400;
  const pct      = Math.min((aqi || 0) / maxAQI, 1);
  const r        = (size / 2) - 10;
  const cx       = size / 2;
  const cy       = size / 2;
  const circumference = Math.PI * r; // half-circle
  const strokeDash    = circumference * pct;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size / 2 + 20 }}>
        <svg width={size} height={size / 2 + 20}>
          {/* Track */}
          <path
            d={`M 10 ${cy} A ${r} ${r} 0 0 1 ${size - 10} ${cy}`}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* Value arc */}
          <path
            d={`M 10 ${cy} A ${r} ${r} 0 0 1 ${size - 10} ${cy}`}
            fill="none"
            stroke={status.color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${strokeDash} ${circumference}`}
            style={{ filter: `drop-shadow(0 0 6px ${status.color}80)`, transition: 'stroke-dasharray 0.8s ease' }}
          />
          {/* Needle dot */}
          <circle cx={cx} cy={cy} r="5" fill={status.color} />
        </svg>
        {/* Center value */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
          <span className="text-2xl font-bold" style={{ color: status.color }}>{aqi || '—'}</span>
        </div>
      </div>
      <span className="text-sm font-semibold" style={{ color: status.color }}>{status.label}</span>
    </div>
  );
}
