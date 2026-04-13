import React, { useState } from 'react';

/* ─── Seed data ────────────────────────────────────────────────── */
const SEED_WORKERS = [
  { id: 'W-001', name: 'Marcus Tan',   role: 'Lead Specialist',      license: 'Class 4 + Fragile Cert', status: 'available', exp: '8 yrs', contact: '+65 9123 4567' },
  { id: 'W-002', name: 'Priya Nair',   role: 'Cold-Chain Specialist', license: 'Class 3 + Cold-Chain',   status: 'on_duty',   exp: '5 yrs', contact: '+65 9234 5678' },
  { id: 'W-003', name: 'Ahmad Razif',  role: 'Heavy Load Operator',   license: 'Class 5 + Crane Cert',   status: 'on_duty',   exp: '11 yrs', contact: '+65 9345 6789' },
  { id: 'W-004', name: 'Wei Li Chen',  role: 'General Driver',        license: 'Class 3',                status: 'available', exp: '3 yrs', contact: '+65 9456 7890' },
  { id: 'W-005', name: 'Siti Rahman',  role: 'Admin Dispatcher',      license: 'N/A',                    status: 'available', exp: '6 yrs', contact: '+65 9567 8901' },
];

const SEED_VEHICLES = [
  { id: 'VH-8821', type: '10T Tail-lift',    reg: 'SBJ 8821 C', capacity: '10 Tons',  status: 'in_use',    lastService: '01 Apr 2026', features: ['Tail-lift', 'GPS', 'Air-ride'] },
  { id: 'VH-3304', type: 'Reefer Unit',       reg: 'SCK 3304 A', capacity: '8 Tons',   status: 'in_use',    lastService: '28 Mar 2026', features: ['Refrigerated', 'Temp Logger', 'GPS'] },
  { id: 'VH-1102', type: '30T Flatbed',       reg: 'SDB 1102 P', capacity: '30 Tons',  status: 'in_use',    lastService: '05 Apr 2026', features: ['Flatbed', 'Tie-down Straps', 'GPS'] },
  { id: 'VH-5500', type: '3T Box Truck',      reg: 'SFG 5500 H', capacity: '3 Tons',   status: 'available', lastService: '10 Apr 2026', features: ['Box Body', 'GPS', 'Cargo Net'] },
  { id: 'VH-6633', type: 'Hazmat Van',        reg: 'SGH 6633 B', capacity: '2 Tons',   status: 'available', lastService: '08 Apr 2026', features: ['Hazmat Liner', 'GPS', 'Fire Suppressor'] },
  { id: 'VH-2201', type: '5T Curtainsider',   reg: 'SHJ 2201 K', capacity: '5 Tons',   status: 'maintenance', lastService: '02 Apr 2026', features: ['Curtain Sides', 'GPS'] },
];

const SEED_TOOLS = [
  { id: 'T-001', name: 'Forklift — Electric',   category: 'Lifting',   qty: 3, available: 2, location: 'Warehouse Alpha', rating: 'up_to_2t'   },
  { id: 'T-002', name: 'Pallet Jacks (Manual)', category: 'Lifting',   qty: 8, available: 5, location: 'Warehouse Alpha', rating: 'up_to_1t'   },
  { id: 'T-003', name: 'Corner Protectors',      category: 'Packaging', qty: 120, available: 80, location: 'Warehouse Alpha', rating: 'fragile_cert' },
  { id: 'T-004', name: 'Air-Ride Pads',          category: 'Packaging', qty: 40, available: 30, location: 'Warehouse Alpha', rating: 'fragile_cert' },
  { id: 'T-005', name: 'Crane Slings (4T)',      category: 'Lifting',   qty: 6, available: 4, location: 'Warehouse Beta',  rating: 'up_to_4t'   },
  { id: 'T-006', name: 'Temp Loggers',           category: 'Cold-Chain',qty: 15, available: 10, location: 'Warehouse Beta', rating: 'cold_chain'  },
  { id: 'T-007', name: 'Hazmat Spill Kits',      category: 'Safety',    qty: 10, available: 8, location: 'Warehouse Alpha', rating: 'hazmat'      },
  { id: 'T-008', name: 'Stretch Wrap Machines',  category: 'Packaging', qty: 4, available: 3, location: 'Warehouse Alpha', rating: 'standard'   },
];

/* ─── Sub-components ────────────────────────────────────────────── */

const Badge = ({ children, color = 'slate' }) => {
  const map = {
    slate:    'bg-slate-100 text-slate-600 border-slate-200',
    green:    'bg-emerald-100 text-emerald-700 border-emerald-200',
    blue:     'bg-blue-100 text-blue-700 border-blue-200',
    amber:    'bg-amber-100 text-amber-700 border-amber-200',
    red:      'bg-red-100 text-red-700 border-red-200',
  };
  return (
    <span className={`inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${map[color]}`}>
      {children}
    </span>
  );
};

/* ─── Worker status map ─ */
const W_STATUS = { available: { label: 'Available', color: 'green' }, on_duty: { label: 'On Duty', color: 'blue' }, off: { label: 'Off', color: 'slate' } };
const V_STATUS = { available: { label: 'Available', color: 'green' }, in_use: { label: 'In Use', color: 'blue' }, maintenance: { label: 'Maintenance', color: 'amber' } };

/* ─── Blank form defaults ─ */
const BLANK_WORKER  = { name: '', role: '', license: '', status: 'available', exp: '', contact: '' };
const BLANK_VEHICLE = { type: '', reg: '', capacity: '', status: 'available', lastService: '', features: '' };
const BLANK_TOOL    = { name: '', category: '', qty: '', available: '', location: '', rating: '' };

/* ─── Modal wrapper ─ */
const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.4)' }}>
    <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md" style={{ animation: 'fadeSlideIn 0.25s ease forwards' }}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <p className="font-black text-sm text-black">{title}</p>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer">
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>close</span>
        </button>
      </div>
      <div className="px-6 py-5 space-y-4">{children}</div>
    </div>
  </div>
);

const Field = ({ label, children }) => (
  <div className="space-y-1">
    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</label>
    {children}
  </div>
);

const Input = (props) => (
  <input
    {...props}
    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-black placeholder:text-slate-400 focus:outline-none focus:border-black focus:bg-white transition-all"
  />
);

const Select = ({ children, ...props }) => (
  <select
    {...props}
    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-black focus:outline-none focus:border-black focus:bg-white transition-all cursor-pointer"
  >
    {children}
  </select>
);

/* ─── Workers tab ─ */
const WorkersSubTab = () => {
  const [workers, setWorkers] = useState(SEED_WORKERS);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(BLANK_WORKER);

  const handleAdd = () => {
    if (!form.name.trim()) return;
    setWorkers(prev => [...prev, { ...form, id: `W-${String(prev.length + 1).padStart(3, '0')}` }]);
    setForm(BLANK_WORKER);
    setShowModal(false);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-bold text-slate-500">{workers.length} workers registered</p>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-3 py-2 bg-black text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>add</span>
          Add Worker
        </button>
      </div>

      <div className="space-y-2">
        {workers.map(w => {
          const sc = W_STATUS[w.status] || W_STATUS.available;
          return (
            <div key={w.id} className="bg-white rounded-xl border border-slate-200 px-4 py-3.5 flex items-center gap-4 shadow-sm hover:shadow-md hover:border-slate-300 transition-all">
              <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-slate-500" style={{ fontSize: '18px' }}>person</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-bold text-black truncate">{w.name}</p>
                  <Badge color={sc.color}>{sc.label}</Badge>
                </div>
                <p className="text-[10px] text-slate-500 truncate mt-0.5">{w.role} · {w.license}</p>
              </div>
              <div className="text-right shrink-0 hidden md:block">
                <p className="text-xs font-bold text-slate-700">{w.exp}</p>
                <p className="text-[10px] text-slate-400">{w.contact}</p>
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider hidden lg:block">{w.id}</span>
            </div>
          );
        })}
      </div>

      {showModal && (
        <Modal title="Add New Worker" onClose={() => setShowModal(false)}>
          <Field label="Full Name"><Input placeholder="e.g. James Lim" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} /></Field>
          <Field label="Role / Specialisation"><Input placeholder="e.g. Cold-Chain Specialist" value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))} /></Field>
          <Field label="License / Certifications"><Input placeholder="e.g. Class 4 + Fragile Cert" value={form.license} onChange={e => setForm(p => ({ ...p, license: e.target.value }))} /></Field>
          <Field label="Years of Experience"><Input placeholder="e.g. 5 yrs" value={form.exp} onChange={e => setForm(p => ({ ...p, exp: e.target.value }))} /></Field>
          <Field label="Contact Number"><Input placeholder="+65 9XXX XXXX" value={form.contact} onChange={e => setForm(p => ({ ...p, contact: e.target.value }))} /></Field>
          <Field label="Availability Status">
            <Select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
              <option value="available">Available</option>
              <option value="on_duty">On Duty</option>
              <option value="off">Off</option>
            </Select>
          </Field>
          <button onClick={handleAdd} className="w-full bg-black text-white py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors cursor-pointer">
            Save Worker
          </button>
        </Modal>
      )}
    </>
  );
};

/* ─── Vehicles tab ─ */
const VehiclesSubTab = () => {
  const [vehicles, setVehicles] = useState(SEED_VEHICLES);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(BLANK_VEHICLE);

  const handleAdd = () => {
    if (!form.type.trim()) return;
    const id = `VH-${Math.floor(1000 + Math.random() * 9000)}`;
    setVehicles(prev => [...prev, { ...form, id, features: form.features.split(',').map(s => s.trim()).filter(Boolean) }]);
    setForm(BLANK_VEHICLE);
    setShowModal(false);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-bold text-slate-500">{vehicles.length} vehicles registered</p>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-3 py-2 bg-black text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>add</span>
          Add Vehicle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {vehicles.map(v => {
          const sc = V_STATUS[v.status] || V_STATUS.available;
          return (
            <div key={v.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-bold text-black leading-tight">{v.type}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-mono">{v.reg}</p>
                </div>
                <Badge color={sc.color}>{sc.label}</Badge>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-600 bg-slate-50 rounded-lg px-3 py-2 border border-slate-100">
                <span className="material-symbols-outlined text-slate-400" style={{ fontSize: '14px' }}>scale</span>
                <span className="font-semibold">{v.capacity}</span>
                <span className="text-slate-300">·</span>
                <span className="text-[10px] text-slate-400">Serviced {v.lastService}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {Array.isArray(v.features) && v.features.map(f => (
                  <Badge key={f} color="slate">{f}</Badge>
                ))}
              </div>
              <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{v.id}</p>
            </div>
          );
        })}
      </div>

      {showModal && (
        <Modal title="Add New Vehicle" onClose={() => setShowModal(false)}>
          <Field label="Vehicle Type / Name"><Input placeholder="e.g. 10T Tail-lift" value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} /></Field>
          <Field label="Registration Plate"><Input placeholder="e.g. SBJ 8821 C" value={form.reg} onChange={e => setForm(p => ({ ...p, reg: e.target.value }))} /></Field>
          <Field label="Cargo Capacity"><Input placeholder="e.g. 10 Tons" value={form.capacity} onChange={e => setForm(p => ({ ...p, capacity: e.target.value }))} /></Field>
          <Field label="Last Service Date"><Input placeholder="e.g. 01 Apr 2026" value={form.lastService} onChange={e => setForm(p => ({ ...p, lastService: e.target.value }))} /></Field>
          <Field label="Features (comma-separated)"><Input placeholder="e.g. Tail-lift, GPS, Air-ride" value={form.features} onChange={e => setForm(p => ({ ...p, features: e.target.value }))} /></Field>
          <Field label="Status">
            <Select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
              <option value="available">Available</option>
              <option value="in_use">In Use</option>
              <option value="maintenance">Maintenance</option>
            </Select>
          </Field>
          <button onClick={handleAdd} className="w-full bg-black text-white py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors cursor-pointer">
            Save Vehicle
          </button>
        </Modal>
      )}
    </>
  );
};

/* ─── Tools tab ─ */
const ToolsSubTab = () => {
  const [tools, setTools] = useState(SEED_TOOLS);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(BLANK_TOOL);

  const handleAdd = () => {
    if (!form.name.trim()) return;
    setTools(prev => [...prev, { ...form, id: `T-${String(prev.length + 1).padStart(3, '0')}`, qty: Number(form.qty), available: Number(form.available) }]);
    setForm(BLANK_TOOL);
    setShowModal(false);
  };

  const CAT_COLOR = {
    Lifting: 'blue', Packaging: 'slate', 'Cold-Chain': 'slate', Safety: 'amber',
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-bold text-slate-500">{tools.length} tool types registered</p>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-3 py-2 bg-black text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>add</span>
          Add Tool
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="grid border-b border-slate-100 bg-slate-50 px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-400"
          style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1.5fr 1fr' }}>
          <span>Tool</span><span>Category</span><span>Total Qty</span><span>Available</span><span>Location</span><span>Rating</span>
        </div>
        {tools.map((t, i) => (
          <div
            key={t.id}
            className={`grid px-5 py-3.5 items-center hover:bg-slate-50 transition-colors ${i < tools.length - 1 ? 'border-b border-slate-100' : ''}`}
            style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1.5fr 1fr' }}
          >
            <div className="min-w-0">
              <p className="text-xs font-bold text-black truncate">{t.name}</p>
              <p className="text-[9px] text-slate-400">{t.id}</p>
            </div>
            <div>
              <Badge color={CAT_COLOR[t.category] || 'slate'}>{t.category}</Badge>
            </div>
            <p className="text-sm font-black text-black">{t.qty}</p>
            <div className="flex items-center gap-1.5">
              <span className={`text-sm font-black ${t.available > 0 ? 'text-emerald-600' : 'text-red-500'}`}>{t.available}</span>
              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden max-w-12">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${(t.available / t.qty) * 100}%` }}
                />
              </div>
            </div>
            <p className="text-xs text-slate-600 truncate">{t.location}</p>
            <Badge color="slate">{t.rating}</Badge>
          </div>
        ))}
      </div>

      {showModal && (
        <Modal title="Add New Tool / Equipment" onClose={() => setShowModal(false)}>
          <Field label="Tool Name"><Input placeholder="e.g. Air-Ride Pads" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} /></Field>
          <Field label="Category">
            <Select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
              <option value="">Select…</option>
              <option>Lifting</option><option>Packaging</option><option>Cold-Chain</option><option>Safety</option><option>Other</option>
            </Select>
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Total Qty"><Input type="number" placeholder="e.g. 20" value={form.qty} onChange={e => setForm(p => ({ ...p, qty: e.target.value }))} /></Field>
            <Field label="Available Qty"><Input type="number" placeholder="e.g. 15" value={form.available} onChange={e => setForm(p => ({ ...p, available: e.target.value }))} /></Field>
          </div>
          <Field label="Storage Location"><Input placeholder="e.g. Warehouse Alpha" value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} /></Field>
          <Field label="Capability Rating / Tag"><Input placeholder="e.g. up_to_2t, cold_chain" value={form.rating} onChange={e => setForm(p => ({ ...p, rating: e.target.value }))} /></Field>
          <button onClick={handleAdd} className="w-full bg-black text-white py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors cursor-pointer">
            Save Tool / Equipment
          </button>
        </Modal>
      )}
    </>
  );
};

/* ─── Main ResourcesView ────────────────────────────────────────── */
const RESOURCE_TABS = [
  { key: 'workers',  label: 'Workers',  icon: 'group'         },
  { key: 'vehicles', label: 'Vehicles', icon: 'local_shipping' },
  { key: 'tools',    label: 'Tools & Equipment', icon: 'construction' },
];

const ResourcesView = () => {
  const [sub, setSub] = useState('workers');

  return (
    <div className="w-full px-8 md:px-12 xl:px-16 py-8 space-y-6">
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Heading */}
      <section>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl xl:text-5xl font-black tracking-tight text-black leading-tight">
              Resource Registry
            </h1>
            <p className="text-sm md:text-base text-slate-500 mt-2 max-w-2xl leading-relaxed">
              Manage your workforce, fleet, and equipment. All data here is used by the AI to build accurate, feasible work plans.
            </p>
          </div>
          {/* AI context badge */}
          <div className="shrink-0 flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold px-3 py-2 rounded-xl mt-1 hidden md:flex">
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>auto_awesome</span>
            AI Planning Context
          </div>
        </div>
      </section>

      {/* KPI strip */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Workers Available', value: SEED_WORKERS.filter(w => w.status === 'available').length + ' / ' + SEED_WORKERS.length, icon: 'group',          color: 'text-black'       },
          { label: 'Fleet Available',   value: SEED_VEHICLES.filter(v => v.status === 'available').length + ' / ' + SEED_VEHICLES.length,  icon: 'local_shipping', color: 'text-emerald-600' },
          { label: 'Tool Types',        value: SEED_TOOLS.length,  icon: 'construction',    color: 'text-blue-600'    },
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

      {/* Sub-tab bar */}
      <div className="flex gap-0 bg-slate-100 p-1 rounded-xl w-fit">
        {RESOURCE_TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setSub(t.key)}
            className={[
              'flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer',
              sub === t.key ? 'bg-white text-black shadow-sm' : 'text-slate-500 hover:text-black',
            ].join(' ')}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* Sub-tab content */}
      <div key={sub} style={{ animation: 'fadeSlideIn 0.25s ease forwards' }}>
        {sub === 'workers'  && <WorkersSubTab />}
        {sub === 'vehicles' && <VehiclesSubTab />}
        {sub === 'tools'    && <ToolsSubTab />}
      </div>

      <div className="h-8" />
    </div>
  );
};

export default ResourcesView;
