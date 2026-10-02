import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { DollarSign, Package, Cpu, Wifi, Shield, Layers, Cloud, Wrench } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';

// ─── BOM data — exactly as provided ─────────────────────────────────────────
const BOM_ITEMS = [
  {
    icon: Package,
    category: 'Sensors',
    desc: 'PM Sensor, MQ Gas Sensors (CO, NO₂, SO₂, O₃), eCO₂ & TVOC Sensors',
    qty: '2 units',
    cost: 140000,
    display: '₹1,40,000',
    color: '#f43f5e',
  },
  {
    icon: Cpu,
    category: 'Processing Unit',
    desc: 'ESP32 and Edge Logger Modules',
    qty: '2 units',
    cost: 60000,
    display: '₹60,000',
    color: '#6366f1',
  },
  {
    icon: Wifi,
    category: 'Connectivity',
    desc: 'Wi-Fi/GSM Modules',
    qty: '2 units',
    cost: 45000,
    display: '₹45,000',
    color: '#06b6d4',
  },
  {
    icon: Shield,
    category: 'Hardware',
    desc: 'PCB, Enclosure and Power Supply',
    qty: '2 units',
    cost: 70000,
    display: '₹70,000',
    color: '#f59e0b',
  },
  {
    icon: Layers,
    category: '3D-Printing & Fabrication',
    desc: 'Circuit design, layout, prototyping, board manufacturing and assembly',
    qty: '2 units',
    cost: 120000,
    display: '₹1,20,000',
    color: '#10b981',
  },
  {
    icon: Cloud,
    category: 'Cloud',
    desc: 'Cloud hosting and storage / AWS',
    qty: '—',
    cost: 55000,
    display: '₹55,000',
    color: '#8b5cf6',
  },
  {
    icon: Wrench,
    category: 'Testing & Calibration',
    desc: 'Testing, calibration and quality assurance',
    qty: '—',
    cost: null,
    display: 'Not specified',
    color: '#64748b',
  },
  {
    icon: DollarSign,
    category: 'Deployment / Installation',
    desc: 'Deployment, installation, logistics and maintenance',
    qty: '—',
    cost: null,
    display: 'Not specified',
    color: '#64748b',
  },
];

const TOTAL = 490000;

const chartData = BOM_ITEMS.filter(i => i.cost).map(i => ({
  name: i.category.split(' ')[0],
  cost: i.cost / 1000,  // in thousands
  color: i.color,
}));

export default function BOMSection() {
  const [view, setView] = useState('table');

  return (
    <section id="investment" className="py-24 bg-[#050f1e]">
      <div className="section-wrapper">
        <SectionHeader
          eyebrow="Bill of Materials / Investment"
          title={<>Project <span className="gradient-text">Investment</span></>}
          subtitle="Complete bill of materials for the 2-unit AQMS prototype covering indoor and outdoor monitoring. Figures are exactly as stated in the project reference."
        />

        {/* Total highlight */}
        <div className="glass-card border border-cyan-500/30 p-6 mb-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-teal-500/5" />
          <p className="text-slate-400 text-sm mb-2">Total Stated Project Investment</p>
          <div className="text-5xl sm:text-6xl font-black gradient-text mb-2">₹4,90,000</div>
          <p className="text-slate-500 text-sm">2-unit AQMS prototype (indoor + outdoor deployment)</p>
          <p className="text-slate-600 text-xs mt-1">
            Source: Project BOM reference · Testing, calibration, deployment and maintenance costs not specified
          </p>
        </div>

        {/* Toggle */}
        <div className="flex gap-2 mb-6">
          {[{ id: 'table', label: 'BOM Table' }, { id: 'chart', label: 'Cost Breakdown' }].map(v => (
            <button key={v.id} onClick={() => setView(v.id)}
                    className={`px-4 py-2 rounded-lg text-xs font-medium transition-all
                      ${view === v.id
                        ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-400'
                        : 'border border-white/10 text-slate-500 hover:text-slate-300'}`}>
              {v.label}
            </button>
          ))}
        </div>

        {view === 'table' ? (
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full">
              <thead>
                <tr className="bg-white/3 border-b border-white/10">
                  {['Component Category', 'Description', 'Qty', 'Cost (INR)'].map(h => (
                    <th key={h} className="text-left px-5 py-3.5 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {BOM_ITEMS.map((item, i) => (
                  <tr key={item.category}
                      className={`border-b border-white/5 hover:bg-white/3 transition-colors
                                  ${i % 2 === 0 ? '' : 'bg-white/[0.01]'}`}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                             style={{ backgroundColor: item.color + '15', border: `1px solid ${item.color}30` }}>
                          <item.icon size={13} style={{ color: item.color }} />
                        </div>
                        <span className="text-white font-medium text-sm">{item.category}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-400 text-xs max-w-xs">{item.desc}</td>
                    <td className="px-5 py-4 text-slate-400 text-xs">{item.qty}</td>
                    <td className="px-5 py-4">
                      <span className={`text-sm font-bold ${item.cost ? 'text-white' : 'text-slate-600'}`}>
                        {item.display}
                      </span>
                    </td>
                  </tr>
                ))}
                <tr className="bg-cyan-500/5 border-t-2 border-cyan-500/30">
                  <td colSpan={3} className="px-5 py-4 text-white font-bold text-sm">
                    TOTAL STATED INVESTMENT
                  </td>
                  <td className="px-5 py-4 text-cyan-400 font-black text-lg">₹4,90,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="glass-card p-5">
              <h3 className="text-white font-semibold text-sm mb-4">Cost Distribution (₹ in thousands)</h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={chartData} margin={{ top: 5, right: 5, left: -10, bottom: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 9 }} tickLine={false}
                         angle={-25} textAnchor="end" />
                  <YAxis tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} axisLine={false} />
                  <Tooltip
                    formatter={(v) => [`₹${(v * 1000).toLocaleString('en-IN')}`, 'Cost']}
                    contentStyle={{ background: 'rgba(10,22,40,0.95)', border: '1px solid rgba(6,182,212,0.3)', borderRadius: '8px', fontSize: '11px', color: '#e2e8f0' }}
                  />
                  <Bar dataKey="cost" radius={[4, 4, 0, 0]}>
                    {chartData.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-col gap-3">
              {BOM_ITEMS.filter(i => i.cost).map(item => {
                const pct = ((item.cost / TOTAL) * 100).toFixed(1);
                return (
                  <div key={item.category} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-slate-300 text-xs">{item.category}</span>
                        <span className="text-white text-xs font-bold">{item.display}</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-700"
                             style={{ width: `${pct}%`, backgroundColor: item.color }} />
                      </div>
                      <span className="text-slate-600 text-[10px]">{pct}% of total</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <p className="mt-6 text-slate-600 text-xs text-center">
          * Testing &amp; Calibration and Deployment/Installation/Logistics/Maintenance costs are listed without a specified amount in the project reference.
        </p>
      </div>
    </section>
  );
}
