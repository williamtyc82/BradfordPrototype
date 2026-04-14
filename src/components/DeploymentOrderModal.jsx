import React, { useState, useEffect } from 'react';

/* ─── Reusable label / value row ─────────────────────────── */
const Row = ({ label, value, mono = false }) => (
  <div className="flex items-start justify-between gap-4 py-3 border-b border-slate-100 last:border-0">
    <span className="text-xs font-bold uppercase tracking-widest text-slate-400 shrink-0 w-36">{label}</span>
    <span className={`text-xs text-right ${mono ? 'font-mono text-slate-700' : 'font-semibold text-slate-800'}`}>
      {value}
    </span>
  </div>
);

/* ─── Section wrapper ─────────────────────────────────────── */
const Section = ({ icon, title, children }) => (
  <div className="mb-6">
    <div className="flex items-center gap-2 mb-3">
      <span className="material-symbols-outlined text-slate-500" style={{ fontSize: '16px' }}>{icon}</span>
      <h4 className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">{title}</h4>
    </div>
    <div className="bg-white rounded-xl border border-slate-200 px-5 divide-y divide-slate-100 shadow-sm">
      {children}
    </div>
  </div>
);

/* ─── Badge helper ────────────────────────────────────────── */
const Badge = ({ label, color = 'slate' }) => {
  const palettes = {
    red:   'bg-red-100 text-red-700 border-red-200',
    blue:  'bg-blue-100 text-blue-700 border-blue-200',
    green: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    slate: 'bg-slate-100 text-slate-600 border-slate-200',
  };
  return (
    <span className={`inline-block text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border ${palettes[color]}`}>
      {label}
    </span>
  );
};

/* ─── Main Component ─────────────────────────────────────── */
const DeploymentOrderModal = ({ plan, onClose }) => {
  const [visible, setVisible] = useState(false);

  // Stagger-in animation trigger
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 260);
  };

  // Generate a DO reference number deterministically from current time
  const doRef = `DO-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
  const issuedAt = new Date().toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  });

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 lg:p-10"
      style={{ fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif" }}
    >
      {/* ── Backdrop ── */}
      <div
        onClick={handleClose}
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: 'rgba(2, 6, 23, 0.72)',
          backdropFilter: 'blur(6px)',
          opacity: visible ? 1 : 0,
        }}
      />

      {/* ── Document Panel ── */}
      <div
        className="relative w-full flex flex-col rounded-2xl overflow-hidden shadow-2xl"
        style={{
          maxWidth: 760,
          maxHeight: '92vh',
          background: '#f8fafc',
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(28px) scale(0.97)',
          opacity: visible ? 1 : 0,
          transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.25s ease',
        }}
      >

        {/* ━━━ HEADER BAND ━━━ */}
        <div
          className="shrink-0 px-8 pt-7 pb-5"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)',
            borderBottom: '3px solid #f59e0b',
          }}
        >
          {/* Top row */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-[9px] font-black uppercase tracking-[0.22em] px-2 py-0.5 rounded"
                  style={{ background: '#f59e0b', color: '#0f172a' }}
                >
                  Official Document
                </span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Bradford Logistics</span>
              </div>
              <h2
                className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none"
                style={{ letterSpacing: '-0.02em' }}
              >
                Deployment Order
              </h2>
              <p className="text-slate-400 text-xs mt-1.5 font-mono">{doRef}</p>
            </div>

            <button
              onClick={handleClose}
              aria-label="Close deployment order"
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0 mt-1"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>close</span>
            </button>
          </div>

          {/* Status strip */}
          <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-white/10">
            <div>
              <p className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">Status</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs font-black text-amber-400">Pending Client Confirmation</span>
              </div>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">Issued</p>
              <p className="text-xs font-semibold text-white mt-0.5">{issuedAt}</p>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">Priority</p>
              <Badge label={plan.job.priority} color="red" />
            </div>
          </div>
        </div>

        {/* ━━━ SCROLLABLE BODY ━━━ */}
        <div className="flex-1 overflow-y-auto px-8 py-6">

          {/* ── Job Details ── */}
          <Section icon="inventory_2" title="Cargo & Job Details">
            <Row label="Cargo Description" value={plan.job.cargo} />
            <Row label="Gross Weight" value={plan.job.weight} />
            <Row label="Destination" value={plan.job.destination} />
            <Row label="Priority Class" value={plan.job.priority} />
            <Row label="DO Reference" value={doRef} mono />
          </Section>

          {/* ── Assigned Specialist ── */}
          <Section icon="person_pin" title="Assigned Logistics Specialist">
            <div className="py-4 flex items-center gap-4">
              {/* Avatar */}
              <div
                className="shrink-0 rounded-xl overflow-hidden border border-slate-200"
                style={{ width: 52, height: 52, background: '#e2e8f0' }}
              >
                <img
                  alt={plan.match.specialist}
                  style={{ width: 52, height: 52, objectFit: 'cover' }}
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiOy1grrut2Fl_3rKpALzl0ftIItgbrpC2yO7OyAdwPg0GK5hgEWIYajyef2OFDF-KvzejW4eFUxr0KjID9kG3urquhm6fX9OfjdUxcQz0sLLEcxTs5XdMkOqMCIAzcbzO9gbh-BRfV-qGOW3fZ9skUnAK414XRpbhO3oqXJgFCuagncDFLiHaPRLvjnMV80dQDcBxIK4lBO76R5o0Dz3snTexnQWZ_chL4z520MBiFO-cGF0uPCDKfCLL5krM7e3N4hX5sQIeAC8"
                />
              </div>
              <div>
                <p className="text-sm font-black text-slate-900">{plan.match.specialist}</p>
                <p className="text-xs text-slate-500 mt-0.5">{plan.match.role}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {plan.match.tags.map(tag => (
                    <Badge key={tag} label={tag} color="blue" />
                  ))}
                </div>
              </div>
              {/* Match score callout */}
              <div className="ml-auto text-center shrink-0">
                <div className="text-3xl font-black text-slate-900 leading-none">{plan.match.score}</div>
                <div className="text-[8px] uppercase tracking-widest text-slate-400 font-bold mt-0.5">AI Match</div>
              </div>
            </div>
            {/* System note */}
            <div className="py-3 flex items-start gap-2">
              <span className="material-symbols-outlined text-blue-400 shrink-0 mt-0.5" style={{ fontSize: '14px' }}>info</span>
              <p className="text-[10px] text-slate-500 italic leading-relaxed">{plan.match.note}</p>
            </div>
          </Section>

          {/* ── Allocated Assets ── */}
          <Section icon="local_shipping" title="Allocated Assets & Equipment">
            {plan.assets.map((asset, i) => (
              <div key={asset.title} className="flex items-center gap-3 py-3">
                <div className="p-2 rounded-lg shrink-0" style={{ background: '#f1f5f9' }}>
                  <span className="material-symbols-outlined text-slate-700" style={{ fontSize: '16px' }}>{asset.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800">{asset.title}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{asset.sub}</p>
                </div>
                <Badge label={`Asset ${i + 1}`} color="slate" />
              </div>
            ))}
          </Section>

          {/* ── Compliance & Notes ── */}
          <Section icon="verified_user" title="Compliance & Pre-Deployment Checklist">
            {[
              { label: 'Medical Equipment Handling Cert', status: 'Verified', ok: true },
              { label: 'Vibration Sensitivity Protocol', status: 'Active', ok: true },
              { label: 'Climate Control Calibration', status: 'Completed', ok: true },
              { label: 'Worker License Validity', status: '⚠ Expiring in 3 days', ok: false },
              { label: 'Route Risk Assessment', status: 'Cleared', ok: true },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between py-3">
                <span className="text-xs text-slate-700 font-medium">{item.label}</span>
                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${item.ok
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </Section>

          {/* ── Client Acknowledgement ── */}
          <div
            className="rounded-xl p-5 mb-4"
            style={{ background: 'linear-gradient(135deg, #fffbeb, #fef3c7)', border: '1px solid #fbbf24' }}
          >
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-amber-600 shrink-0 mt-0.5" style={{ fontSize: '18px' }}>gavel</span>
              <div>
                <p className="text-xs font-black text-amber-900 mb-1">Client Acknowledgement Required</p>
                <p className="text-[10px] text-amber-800 leading-relaxed">
                  This Deployment Order is awaiting formal acknowledgement from the client before execution can commence. 
                  All allocated resources are on standby. Confirmation must be received at least 2 hours prior to the scheduled deployment window.
                </p>
              </div>
            </div>
          </div>

          {/* bottom breathing room */}
          <div className="h-4" />
        </div>

        {/* ━━━ FOOTER ACTIONS ━━━ */}
        <div
          className="shrink-0 px-8 py-5 flex flex-wrap items-center justify-between gap-3"
          style={{ borderTop: '1px solid #e2e8f0', background: '#ffffff' }}
        >
          {/* Left: reference + issuer */}
          <div>
            <p className="text-[10px] font-mono text-slate-400">{doRef}</p>
            <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold mt-0.5">
              Bradford Logistics Intelligence System
            </p>
          </div>

          {/* Right: action buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* PDF Download — UI only, not active yet */}
            <button
              disabled
              title="PDF export coming soon"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-400 text-xs font-bold cursor-not-allowed select-none"
              style={{ opacity: 0.55 }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>file_download</span>
              Download PDF
              <span
                className="text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded"
                style={{ background: '#e2e8f0', color: '#94a3b8' }}
              >
                Soon
              </span>
            </button>

            {/* Close / Done */}
            <button
              onClick={handleClose}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black text-white transition-all hover:opacity-90 active:scale-[0.98] cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>check_circle</span>
              Acknowledge & Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DeploymentOrderModal;
