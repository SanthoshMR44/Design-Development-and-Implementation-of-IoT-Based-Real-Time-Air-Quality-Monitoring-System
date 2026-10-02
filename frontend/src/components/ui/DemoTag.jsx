import React from 'react';
import { Cpu } from 'lucide-react';

export default function DemoTag({ className = '' }) {
  return (
    <span className={`demo-tag ${className}`}>
      <Cpu size={10} />
      DEMO / SIMULATED DATA
    </span>
  );
}
