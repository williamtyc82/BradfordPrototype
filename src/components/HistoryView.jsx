import React, { useState } from 'react';

const HISTORY = [
  {
    id: 'DO-2037', date: '12 Apr 2026', time: '09:14', cargo: 'Siemens Magnetom MRI',
    weight: '3 Tons', destination: 'City General Hospital', worker: 'Sarah Jenkins',
    vehicle: 'VH-8821', outcome: 'completed', aiScore: '99%',
    duration: '3h 22m', notes: 'Zero-damage delivery. Strict climate control maintained.',
  },
  {
    id: 'DO-2036', date: '12 Apr 2026', time: '06:45', cargo: 'Organ Transport Coolers',
    weight: '0.5 Tons', destination: 'National Heart Centre', worker: 'Priya Nair',
    vehicle: 'VH-3304', outcome: 'completed', aiScore: '98%',
    duration: '2h 08m', notes: 'Cold-chain maintained at strict 2°C throughout. Immediate handover.',
  },
  {
    id: 'DO-2035', date: '11 Apr 2026', time: '15:30', cargo: 'X-Ray Tube Assemblies',
    weight: '1.2 Tons', destination: 'Sembawang ClinicHub', worker: 'Ahmad Razif',
    vehicle: 'VH-1102', outcome: 'completed', aiScore: '89%',
    duration: '4h 55m', notes: 'Overtime incurred due to traffic. High fragility parts delivered intact.',
  },
  {
    id: 'DO-2034', date: '11 Apr 2026', time: '08:00', cargo: 'Medical Oxygen Tanks',
    weight: '3.1 Tons', destination: 'Singapore General Hospital', worker: 'Wei Li Chen',
    vehicle: 'VH-6633', outcome: 'partial', aiScore: '72%',
    duration: '5h 10m', notes: 'One tank rejected due to valve damage on arrival. Incident logged.',
  },
  {
    id: 'DO-2033', date: '10 Apr 2026', time: '11:20', cargo: 'Surgical Sterilization Kits',
    weight: '1.4 Tons', destination: 'Paya Lebar MedHub', worker: 'Siti Rahman',
    vehicle: 'VH-5500', outcome: 'completed', aiScore: '96%',
    duration: '1h 45m', notes: 'Text-book delivery. No issues.',
  },
  {
    id: 'DO-2032', date: '10 Apr 2026', time: '07:00', cargo: 'CT Scanner Gantry',
    weight: '5 Tons', destination: 'Queenstown Imaging Center', worker: 'Ahmad Razif',
    vehicle: 'VH-1102', outcome: 'failed', aiScore: '61%',
    duration: '—', notes: 'Delivery aborted — site access denied due to structural assessment. Cargo returned.',
  },
  {
    id: 'DO-2031', date: '09 Apr 2026', time: '14:00', cargo: 'Surgical Microscopy Systems',
    weight: '0.8 Tons', destination: 'One-North BioCore', worker: 'Marcus Tan',
    vehicle: 'VH-8821', outcome: 'completed', aiScore: '99%',
    duration: '2h 30m', notes: 'Highest-precision install with laser alignment check included.',
  },
];

const OUTCOME = {
  completed: { label: 'Completed', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  partial:   { label: 'Partial',   color: 'bg-amber-100 text-amber-700 border-amber-200'     },
  failed:    { label: 'Failed',    color: 'bg-red-100 text-red-700 border-red-200'           },
};

const HistoryView = () => {
  const [outlet, setOutlet] = useState('all');
  const [expanded, setExpanded] = useState(null);

  const filtered = outlet === 'all' ? HISTORY : HISTORY.filter(h => h.outcome === outlet);

  return (
    <div className="w-full px-8 md:px-12 xl:px-16 py-8 space-y-6">
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .expand-grid { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.3s ease; }
        .expand-grid.open { grid-template-rows: 1fr; }
      `}</style>

      {/* Heading */}
      <section>
        <h1 className="text-3xl md:text-4xl xl:text-5xl font-black tracking-tight text-black leading-tight">
          Deployment History
        </h1>
        <p className="text-sm md:text-base text-slate-500 mt-2 max-w-2xl leading-relaxed">
          Full audit trail of completed, partial, and failed delivery orders. Reviewed by AI for future planning.
        </p>
      </section>

      {/* Summary KPIs */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Completed', value: HISTORY.filter(h => h.outcome === 'completed').length, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' },
          { label: 'Partial',   value: HISTORY.filter(h => h.outcome === 'partial').length,   color: 'text-amber-600',   bg: 'bg-amber-50 border-amber-100'   },
          { label: 'Failed',    value: HISTORY.filter(h => h.outcome === 'failed').length,    color: 'text-red-600',     bg: 'bg-red-50 border-red-100'       },
        ].map(s => (
          <div key={s.label} className={`rounded-xl border px-4 py-3.5 ${s.bg}`}>
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter pills */}
      <div className="flex gap-2">
        {['all', 'completed', 'partial', 'failed'].map(o => (
          <button
            key={o}
            onClick={() => setOutlet(o)}
            className={[
              'px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer',
              outlet === o ? 'bg-black text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-400',
            ].join(' ')}
          >
            {o === 'all' ? 'All' : o.charAt(0).toUpperCase() + o.slice(1)}
          </button>
        ))}
      </div>

      {/* Log table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table header */}
        <div className="grid gap-0 border-b border-slate-100 bg-slate-50 px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-400"
          style={{ gridTemplateColumns: '1fr 1.5fr 0.8fr 1fr 1fr 0.7fr 0.6fr' }}>
          <span>DO #</span>
          <span>Cargo</span>
          <span>Worker</span>
          <span>Destination</span>
          <span>Date</span>
          <span>AI Score</span>
          <span>Status</span>
        </div>

        {filtered.map((h, i) => {
          const oc = OUTCOME[h.outcome];
          const isOpen = expanded === h.id;
          return (
            <div key={h.id} className={i < filtered.length - 1 ? 'border-b border-slate-100' : ''}>
              {/* Row */}
              <button
                onClick={() => setExpanded(isOpen ? null : h.id)}
                className="w-full grid gap-0 px-5 py-3.5 text-left hover:bg-slate-50 transition-colors cursor-pointer"
                style={{ gridTemplateColumns: '1fr 1.5fr 0.8fr 1fr 1fr 0.7fr 0.6fr' }}
              >
                <span className="text-xs font-black text-slate-700">{h.id}</span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-black truncate">{h.cargo}</p>
                  <p className="text-[10px] text-slate-400">{h.weight}</p>
                </div>
                <span className="text-xs text-slate-600 truncate self-center">{h.worker.split(' ')[0]}</span>
                <span className="text-xs text-slate-600 truncate self-center">{h.destination}</span>
                <div className="min-w-0 self-center">
                  <p className="text-xs text-slate-700">{h.date}</p>
                  <p className="text-[10px] text-slate-400">{h.time}</p>
                </div>
                <span className="text-sm font-black text-black self-center">{h.aiScore}</span>
                <div className="self-center">
                  <span className={`text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md border ${oc.color}`}>
                    {oc.label}
                  </span>
                </div>
              </button>

              {/* Expandable notes */}
              <div className={`expand-grid ${isOpen ? 'open' : ''}`}>
                <div className="overflow-hidden">
                  <div className="px-5 pb-4 pt-1 bg-slate-50 border-t border-slate-100 flex items-start gap-4">
                    <span className="material-symbols-outlined text-slate-400 shrink-0 mt-0.5" style={{ fontSize: '16px' }}>notes</span>
                    <div className="text-xs text-slate-600 space-y-1">
                      <p><span className="font-bold text-black">Vehicle:</span> {h.vehicle} · <span className="font-bold text-black">Duration:</span> {h.duration}</p>
                      <p className="italic text-slate-500">{h.notes}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="h-8" />
    </div>
  );
};

export default HistoryView;
