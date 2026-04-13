import React, { useState } from 'react';

const ACTIVE_OPS = [
  {
    id: 'DO-2041',
    cargo: 'Surgical Laser Systems',
    weight: '1.2 Tons',
    status: 'in_transit',
    priority: 'HIGH',
    worker: 'Marcus Tan',
    workerRole: 'Lead Specialist',
    vehicle: 'VH-8821 · 10T Tail-lift',
    origin: 'Medical Supply Depot',
    destination: 'Changi General Hospital',
    eta: '14:30',
    progress: 68,
    alerts: [],
  },
  {
    id: 'DO-2040',
    cargo: 'Blood Plasma Coolant',
    weight: '2.4 Tons',
    status: 'loading',
    priority: 'CRITICAL',
    worker: 'Priya Nair',
    workerRole: 'Cold-Chain Specialist',
    vehicle: 'VH-3304 · Reefer Unit',
    origin: 'National Blood Centre',
    destination: 'Tuas MedHub',
    eta: '16:00',
    progress: 25,
    alerts: ['Temperature variance detected — 3°C above threshold'],
  },
  {
    id: 'DO-2039',
    cargo: 'Robotic Surgery Arms',
    weight: '1.5 Tons',
    status: 'unloading',
    priority: 'MEDIUM',
    worker: 'Ahmad Razif',
    workerRole: 'Heavy Load Operator',
    vehicle: 'VH-1102 · Flatbed 30T',
    origin: 'Port West Gate',
    destination: 'Jurong Health Center',
    eta: '12:15',
    progress: 92,
    alerts: [],
  },
  {
    id: 'DO-2038',
    cargo: 'Patient Monitors',
    weight: '1.8 Tons',
    status: 'pending_departure',
    priority: 'LOW',
    worker: 'Wei Li Chen',
    workerRole: 'General Driver',
    vehicle: 'VH-5500 · 3T Box Truck',
    origin: 'Medical Supply Depot',
    destination: 'Serangoon Clinic',
    eta: '17:45',
    progress: 5,
    alerts: [],
  },
];

const STATUS_CONFIG = {
  in_transit:        { label: 'In Transit',         color: 'bg-blue-100 text-blue-700 border-blue-200',       dot: 'bg-blue-500'   },
  loading:           { label: 'Loading',             color: 'bg-amber-100 text-amber-700 border-amber-200',     dot: 'bg-amber-500'  },
  unloading:         { label: 'Unloading',           color: 'bg-emerald-100 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
  pending_departure: { label: 'Pending Departure',   color: 'bg-slate-100 text-slate-600 border-slate-200',    dot: 'bg-slate-400'  },
};

const PRIORITY_CONFIG = {
  CRITICAL: 'bg-red-600 text-white',
  HIGH:     'bg-orange-500 text-white',
  MEDIUM:   'bg-blue-600 text-white',
  LOW:      'bg-slate-400 text-white',
};

const OpCard = ({ op }) => {
  const sc = STATUS_CONFIG[op.status];
  const pc = PRIORITY_CONFIG[op.priority];

  return (
    <div
      className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col gap-4 hover:shadow-md hover:border-slate-300 transition-all duration-200"
      style={{ animation: 'fadeSlideIn 0.35s ease forwards' }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-black text-slate-400 tracking-widest uppercase">{op.id}</span>
            <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${pc}`}>
              {op.priority}
            </span>
          </div>
          <p className="text-sm font-bold text-black mt-1 truncate">{op.cargo}</p>
          <p className="text-[10px] text-slate-400 mt-0.5">{op.weight}</p>
        </div>
        <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border shrink-0 ${sc.color}`}>
          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${sc.dot}`} />
          {sc.label}
        </span>
      </div>

      {/* Alert */}
      {op.alerts.length > 0 && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-[11px] font-medium">
          <span className="material-symbols-outlined text-red-500 shrink-0" style={{ fontSize: '14px' }}>warning</span>
          {op.alerts[0]}
        </div>
      )}

      {/* Route */}
      <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 rounded-lg px-3 py-2 border border-slate-100">
        <span className="material-symbols-outlined text-slate-400 shrink-0" style={{ fontSize: '14px' }}>location_on</span>
        <span className="truncate font-medium">{op.origin}</span>
        <span className="material-symbols-outlined text-slate-300 shrink-0" style={{ fontSize: '14px' }}>arrow_forward</span>
        <span className="truncate font-medium">{op.destination}</span>
      </div>

      {/* Progress */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          <span>Progress</span>
          <span>{op.progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-black rounded-full transition-all duration-700"
            style={{ width: `${op.progress}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-slate-200 shrink-0" />
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-black truncate">{op.worker}</p>
            <p className="text-[9px] text-slate-400 truncate">{op.vehicle}</p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">ETA</p>
          <p className="text-sm font-black text-black">{op.eta}</p>
        </div>
      </div>
    </div>
  );
};

const OperationsView = () => {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all'
    ? ACTIVE_OPS
    : ACTIVE_OPS.filter(o => o.status === filter);

  const counts = {
    all:               ACTIVE_OPS.length,
    in_transit:        ACTIVE_OPS.filter(o => o.status === 'in_transit').length,
    loading:           ACTIVE_OPS.filter(o => o.status === 'loading').length,
    unloading:         ACTIVE_OPS.filter(o => o.status === 'unloading').length,
    pending_departure: ACTIVE_OPS.filter(o => o.status === 'pending_departure').length,
  };

  const FILTERS = [
    { key: 'all',               label: 'All' },
    { key: 'in_transit',        label: 'In Transit' },
    { key: 'loading',           label: 'Loading' },
    { key: 'unloading',         label: 'Unloading' },
    { key: 'pending_departure', label: 'Pending' },
  ];

  return (
    <div className="w-full px-8 md:px-12 xl:px-16 py-8 space-y-6">
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Page heading */}
      <section>
        <h1 className="text-3xl md:text-4xl xl:text-5xl font-black tracking-tight text-black leading-tight">
          Live Operations
        </h1>
        <p className="text-sm md:text-base text-slate-500 mt-2 max-w-2xl leading-relaxed">
          Real-time view of all active deployments across the fleet. Monitor progress, alerts, and routing.
        </p>
      </section>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Active DO',         value: '4',    icon: 'assignment', color: 'text-black'         },
          { label: 'Alerts',            value: '1',    icon: 'warning',    color: 'text-red-500'        },
          { label: 'Avg. Progress',     value: '48%',  icon: 'trending_up', color: 'text-emerald-600'  },
          { label: 'Fleet Utilisation', value: '73%',  icon: 'local_shipping', color: 'text-blue-600'  },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-xl border border-slate-200 px-4 py-3.5 shadow-sm flex items-center gap-3">
            <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 shrink-0">
              <span className={`material-symbols-outlined ${k.color}`} style={{ fontSize: '18px' }}>{k.icon}</span>
            </div>
            <div>
              <p className="text-xl font-black text-black leading-none">{k.value}</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mt-0.5">{k.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={[
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer',
              filter === f.key
                ? 'bg-black text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-400',
            ].join(' ')}
          >
            {f.label}
            <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-black ${filter === f.key ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
              {counts[f.key]}
            </span>
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
        {filtered.map(op => <OpCard key={op.id} op={op} />)}
      </div>

      <div className="h-8" />
    </div>
  );
};

export default OperationsView;
