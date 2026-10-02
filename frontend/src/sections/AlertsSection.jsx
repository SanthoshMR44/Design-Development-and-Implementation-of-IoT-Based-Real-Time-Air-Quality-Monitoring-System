import React, { useState, useEffect } from 'react';
import { Bell, AlertTriangle, Info, XCircle, CheckCircle, RefreshCw, Clock } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import DemoTag from '../components/ui/DemoTag';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorState from '../components/ui/ErrorState';
import { getAlerts } from '../services/api';
import { formatTimestamp, getSeverityColor } from '../utils/aqiUtils';

const SEVERITY_ICONS = {
  info:     Info,
  warning:  AlertTriangle,
  error:    XCircle,
  critical: AlertTriangle,
};

const SEVERITY_STYLES = {
  info:     { bg: 'bg-blue-500/10',  border: 'border-blue-500/20',  text: 'text-blue-400',   label: 'INFO' },
  warning:  { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400',  label: 'WARNING' },
  error:    { bg: 'bg-red-500/10',   border: 'border-red-500/20',   text: 'text-red-400',    label: 'ERROR' },
  critical: { bg: 'bg-purple-500/10',border: 'border-purple-500/20',text: 'text-purple-400', label: 'CRITICAL' },
};

function AlertCard({ alert }) {
  const style = SEVERITY_STYLES[alert.severity] || SEVERITY_STYLES.info;
  const Icon  = SEVERITY_ICONS[alert.severity]  || Info;

  return (
    <div className={`glass-card p-4 border ${style.border} transition-all hover:scale-[1.01]`}>
      <div className="flex items-start gap-3">
        <div className={`w-8 h-8 rounded-lg ${style.bg} border ${style.border}
                        flex items-center justify-center shrink-0 mt-0.5`}>
          <Icon size={14} className={style.text} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full
                              ${style.bg} ${style.text}`}>
              {style.label}
            </span>
            <span className="text-[10px] text-amber-400 font-mono border border-amber-400/20 px-1.5 py-0.5 rounded">
              DEMO ALERT
            </span>
            {alert.acknowledged && (
              <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                <CheckCircle size={10} /> Acknowledged
              </span>
            )}
          </div>
          <p className="text-white text-sm font-medium">{alert.message}</p>
          <div className="flex flex-wrap gap-3 mt-2">
            <span className="text-slate-500 text-xs flex items-center gap-1">
              <Clock size={10} /> {formatTimestamp(alert.timestamp)}
            </span>
            <span className="text-slate-500 text-xs">Device: <span className="text-slate-300">{alert.deviceId}</span></span>
            <span className="text-slate-500 text-xs">Sensor: <span className="text-slate-300">{alert.sensor}</span></span>
          </div>
          <p className="text-slate-500 text-xs mt-1">{alert.locationName}</p>
        </div>
      </div>
    </div>
  );
}

export default function AlertsSection() {
  const [alerts,  setAlerts]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [filter,  setFilter]  = useState('all');

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAlerts(12);
      setAlerts(res.data || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = filter === 'all' ? alerts : alerts.filter(a => a.severity === filter);

  return (
    <section id="alerts" className="py-24 bg-[#050f1e]">
      <div className="section-wrapper">
        <SectionHeader
          eyebrow="Alert & Notification System"
          title={<>Alert &amp; Notification <span className="gradient-text">Center</span></>}
          subtitle="When connected to real hardware, AQMS will monitor sensor data streams for harmful conditions and deliver instant alerts. All alerts below are demonstration examples only — no physical sensors are currently connected."
        />

        {/* Alert type examples */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { type: 'Elevated PM2.5',           icon: '🌫',  desc: 'Fine particulate matter above safe threshold', severity: 'warning' },
            { type: 'Harmful Gas Detection',     icon: '☣',  desc: 'CO or NO₂ at hazardous concentration',         severity: 'critical' },
            { type: 'Poor Indoor Air Quality',   icon: '🏢',  desc: 'eCO₂ exceeds 1000 ppm comfort threshold',      severity: 'warning' },
            { type: 'Device Connectivity Loss',  icon: '📡',  desc: 'Edge logger disconnected from network',         severity: 'error' },
          ].map(item => (
            <div key={item.type}
                 className={`glass-card p-4 border ${SEVERITY_STYLES[item.severity].border}`}>
              <div className="text-2xl mb-2">{item.type.split(' ')[0] === 'Elevated' ? '🌫' :
                             item.type.includes('Gas') ? '☣' :
                             item.type.includes('Indoor') ? '🏢' : '📡'}</div>
              <span className={`text-[10px] font-bold uppercase ${SEVERITY_STYLES[item.severity].text}`}>
                {SEVERITY_STYLES[item.severity].label}
              </span>
              <h4 className="text-white font-semibold text-sm mt-1">{item.type}</h4>
              <p className="text-slate-500 text-xs mt-1">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Filter + refresh */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {['all', 'critical', 'warning', 'error', 'info'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all
                ${filter === f
                  ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-400'
                  : 'border border-white/10 text-slate-500 hover:text-slate-300 hover:border-white/20'}`}
            >
              {f === 'all' ? 'All' : f}
            </button>
          ))}
          <div className="flex items-center gap-2 ml-auto">
            <DemoTag />
            <button onClick={load}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10
                               border border-cyan-500/30 text-cyan-400 text-xs hover:bg-cyan-500/20 transition-colors">
              <RefreshCw size={11} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>
        </div>

        {loading && <LoadingSpinner message="Loading AQMS alerts…" />}
        {error   && <ErrorState message={error} onRetry={load} />}

        {!loading && !error && (
          <div className="flex flex-col gap-3">
            {filtered.length === 0 ? (
              <div className="glass-card p-8 text-center border-dashed">
                <Bell size={32} className="text-slate-700 mx-auto mb-3" />
                <p className="text-slate-500 text-sm">No {filter !== 'all' ? filter : ''} alerts found.</p>
              </div>
            ) : (
              filtered.map(alert => <AlertCard key={alert.id} alert={alert} />)
            )}
          </div>
        )}

        {/* Alert response note */}
        <div className="mt-8 glass-card p-4 border border-amber-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <Bell size={16} className="text-amber-400" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Response Time Target: &lt;5 Seconds</p>
              <p className="text-slate-500 text-xs">
                AQMS is designed to detect harmful gas conditions and deliver alerts within five seconds.
                Real hardware integration with AQMi/AQMo edge loggers and MQTT will enable actual real-time alerting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
