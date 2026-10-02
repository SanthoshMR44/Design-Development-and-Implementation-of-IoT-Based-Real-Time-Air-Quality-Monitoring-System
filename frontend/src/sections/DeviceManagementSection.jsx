import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Battery, CheckCircle, AlertTriangle, XCircle, RefreshCw, Cpu, Settings } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import DemoTag from '../components/ui/DemoTag';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorState from '../components/ui/ErrorState';
import { getDevices, getDeviceById } from '../services/api';
import { formatTimestamp } from '../utils/aqiUtils';

function HealthDot({ status }) {
  if (status === 'healthy') return <div className="w-2 h-2 rounded-full bg-emerald-400" />;
  if (status === 'warning') return <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />;
  return <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />;
}

function DeviceCard({ device, selected, onClick }) {
  const online = device.status === 'online';
  return (
    <button
      onClick={onClick}
      className={`glass-card text-left p-5 transition-all duration-300 w-full
                  ${selected
                    ? 'border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                    : 'border-white/5 hover:border-white/10 hover:scale-[1.01]'}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${online ? 'bg-emerald-400' : 'bg-red-400'}`}>
            {online && <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping opacity-60" />}
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-wider"
                style={{ color: online ? '#4ade80' : '#f87171' }}>
            {device.status}
          </span>
        </div>
        <span className="text-[9px] font-mono text-slate-500">{device.id}</span>
      </div>

      <h3 className="text-white font-semibold text-sm mb-1">{device.name}</h3>
      <p className="text-slate-500 text-xs mb-3">{device.type} · {device.environment}</p>

      <div className="grid grid-cols-2 gap-2 text-[10px]">
        <div className="flex items-center gap-1.5">
          <Wifi size={10} className={online ? 'text-cyan-400' : 'text-slate-600'} />
          <span className="text-slate-500">{device.connectivity}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Battery size={10} className="text-emerald-400" />
          <span className="text-slate-500">{device.batteryLevel}%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <HealthDot status={device.sensorHealth?.pm} />
          <span className="text-slate-500">PM Sensor</span>
        </div>
        <div className="flex items-center gap-1.5">
          <HealthDot status={device.sensorHealth?.gas} />
          <span className="text-slate-500">Gas Sensor</span>
        </div>
      </div>

      {device.calibrationDue && (
        <div className="mt-3 flex items-center gap-1.5 text-[10px] text-amber-400">
          <AlertTriangle size={10} />
          Calibration due
        </div>
      )}
    </button>
  );
}

export default function DeviceManagementSection() {
  const [devices,  setDevices]  = useState([]);
  const [selected, setSelected] = useState(null);
  const [detail,   setDetail]   = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getDevices();
      setDevices(res.data || []);
      if (!selected && res.data?.length) selectDevice(res.data[0].id);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const selectDevice = async (id) => {
    setSelected(id);
    try {
      const res = await getDeviceById(id);
      setDetail(res.data);
    } catch {}
  };

  useEffect(() => { load(); }, []);

  const selectedDevice = devices.find(d => d.id === selected);

  return (
    <section id="devices" className="py-24 bg-[#020818]">
      <div className="section-wrapper">
        <SectionHeader
          eyebrow="Device Management"
          title={<>Centralized Device <span className="gradient-text">Control</span></>}
          subtitle="Monitor and manage all deployed AQMS edge loggers from a single dashboard. Track connectivity, sensor health, battery, and calibration status."
        />

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              {devices.filter(d => d.status === 'online').length} Online
            </span>
            <span className="flex items-center gap-1.5 text-red-400">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              {devices.filter(d => d.status !== 'online').length} Offline
            </span>
          </div>
          <div className="flex items-center gap-2">
            <DemoTag />
            <button onClick={load}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10
                               border border-cyan-500/30 text-cyan-400 text-xs hover:bg-cyan-500/20">
              <RefreshCw size={11} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>
        </div>

        {loading && <LoadingSpinner message="Loading device status…" />}
        {error   && <ErrorState message={error} onRetry={load} />}

        {!loading && !error && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Device list */}
            <div className="flex flex-col gap-3">
              {devices.map(dev => (
                <DeviceCard
                  key={dev.id}
                  device={dev}
                  selected={selected === dev.id}
                  onClick={() => selectDevice(dev.id)}
                />
              ))}
            </div>

            {/* Device detail */}
            <div className="lg:col-span-2">
              {selectedDevice && detail ? (
                <div className="flex flex-col gap-4">
                  {/* Header */}
                  <div className="glass-card p-5 border border-cyan-500/20">
                    <div className="flex items-start justify-between flex-wrap gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20
                                        flex items-center justify-center">
                          <Cpu size={22} className="text-cyan-400" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-lg">{selectedDevice.name}</h3>
                          <p className="text-slate-500 text-xs">{selectedDevice.id} · {selectedDevice.model} · FW {selectedDevice.firmware}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`status-badge ${selectedDevice.status === 'online' ? 'status-good' : 'status-high'}`}>
                          {selectedDevice.status === 'online' ? <CheckCircle size={10} /> : <XCircle size={10} />}
                          {selectedDevice.status}
                        </span>
                        <DemoTag />
                      </div>
                    </div>
                  </div>

                  {/* Sensor health grid */}
                  <div className="glass-card p-5">
                    <h4 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
                      <Settings size={14} className="text-cyan-400" />
                      Sensor Health
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {Object.entries(selectedDevice.sensorHealth || {}).map(([sensor, status]) => (
                        <div key={sensor} className="glass-card p-3 text-center">
                          <HealthDot status={status} />
                          <p className="text-slate-400 text-xs mt-1.5 capitalize">{sensor}</p>
                          <p className="text-xs font-medium capitalize"
                             style={{ color: status === 'healthy' ? '#4ade80' : status === 'warning' ? '#facc15' : '#f87171' }}>
                            {status}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: 'Signal',      value: `${selectedDevice.signalStrength}%`,  color: '#06b6d4' },
                      { label: 'Battery',     value: `${selectedDevice.batteryLevel}%`,    color: '#4ade80' },
                      { label: 'Readings/24h',value: selectedDevice.readingCount24h,         color: '#a78bfa' },
                      { label: 'Uptime',      value: `${selectedDevice.uptime}h`,           color: '#f59e0b' },
                    ].map(s => (
                      <div key={s.label} className="glass-card p-4 text-center">
                        <div className="text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
                        <div className="text-slate-500 text-xs mt-1">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Latest reading */}
                  {detail.latestReading && (
                    <div className="glass-card p-5">
                      <p className="text-white font-semibold text-sm mb-3">Latest Reading</p>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                        {[
                          { label: 'AQI',    value: detail.latestReading.aqi },
                          { label: 'PM2.5',  value: detail.latestReading.pm25?.toFixed(1) },
                          { label: 'Temp',   value: detail.latestReading.temperature?.toFixed(1) + '°C' },
                          { label: 'Humid',  value: detail.latestReading.humidity?.toFixed(0) + '%' },
                          ...(selectedDevice.environment === 'indoor' ? [
                            { label: 'eCO₂', value: detail.latestReading.eco2 },
                            { label: 'TVOC', value: detail.latestReading.tvoc },
                          ] : [
                            { label: 'NO₂',  value: detail.latestReading.no2?.toFixed(1) },
                            { label: 'Wind', value: detail.latestReading.windSpeed?.toFixed(1) + ' m/s' },
                          ]),
                        ].map(r => (
                          <div key={r.label} className="text-center">
                            <div className="text-white font-bold text-sm">{r.value ?? '—'}</div>
                            <div className="text-slate-600 text-[10px]">{r.label}</div>
                          </div>
                        ))}
                      </div>
                      <p className="text-slate-600 text-xs mt-3">
                        Last seen: {formatTimestamp(detail.device?.lastSeen)} · <span className="text-amber-400/70">DEMO DATA</span>
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="glass-card p-12 text-center border-dashed">
                  <Cpu size={40} className="text-slate-700 mx-auto mb-3" />
                  <p className="text-slate-500 text-sm">Select a device to view details.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
