import React from 'react';

const AnalysisView = ({ plan }) => {
  return (
    <section className="space-y-4" style={{ animation: 'fadeSlideIn 0.4s ease forwards' }}>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Compliance Alert */}
      <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl">
        <span className="material-symbols-outlined text-red-500 shrink-0 mt-0.5" style={{fontSize:'18px'}}>warning</span>
        <div>
          <p className="text-sm font-bold">Compliance Alert</p>
          <p className="text-xs text-red-600 mt-0.5">Worker license expiring in 3 days. Renew before generating delivery order.</p>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 xl:gap-6">

        {/* Column 1: The Job */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-black">The Job</h3>
            <span className="material-symbols-outlined text-slate-400" style={{fontSize:'18px'}}>inventory_2</span>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-[9px] text-slate-400 uppercase font-bold tracking-widest mb-0.5">Extracted Cargo</p>
              <p className="text-lg font-black text-black leading-tight">{plan.job.cargo}</p>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[9px] text-slate-400 uppercase font-bold tracking-widest mb-0.5">Weight</p>
                <p className="text-base font-bold">{plan.job.weight}</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] text-slate-400 uppercase font-bold tracking-widest mb-0.5">Priority</p>
                <span className="inline-block bg-red-600 text-white text-[9px] px-2 py-0.5 rounded-md font-black tracking-wide">
                  {plan.job.priority}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-500">
            <span className="material-symbols-outlined shrink-0" style={{fontSize:'13px'}}>location_on</span>
            {plan.job.destination}
          </div>
        </div>

        {/* Column 2: The Match */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-black">The Match</h3>
            <div className="text-right">
              <div className="text-xl font-black text-black leading-none">{plan.match.score}</div>
              <div className="text-[8px] uppercase font-bold tracking-widest text-slate-400">Match Score</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <div className="rounded-lg overflow-hidden bg-slate-200 shrink-0" style={{width:40, height:40}}>
              <img
                alt={plan.match.specialist}
                style={{width:40, height:40, objectFit:'cover'}}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiOy1grrut2Fl_3rKpALzl0ftIItgbrpC2yO7OyAdwPg0GK5hgEWIYajyef2OFDF-KvzejW4eFUxr0KjID9kG3urquhm6fX9OfjdUxcQz0sLLEcxTs5XdMkOqMCIAzcbzO9gbh-BRfV-qGOW3fZ9skUnAK414XRpbhO3oqXJgFCuagncDFLiHaPRLvjnMV80dQDcBxIK4lBO76R5o0Dz3snTexnQWZ_chL4z520MBiFO-cGF0uPCDKfCLL5krM7e3N4hX5sQIeAC8"
              />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-black truncate">{plan.match.specialist}</p>
              <p className="text-xs text-slate-500">{plan.match.role}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {plan.match.tags.map(tag => (
              <span
                key={tag}
                className="bg-blue-50 text-blue-700 border border-blue-200 text-[9px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="mt-auto text-[10px] text-slate-400 italic leading-relaxed">{plan.match.note}</p>
        </div>

        {/* Column 3: The Assets */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-black">The Assets</h3>
            <span className="material-symbols-outlined text-slate-400" style={{fontSize:'18px'}}>local_shipping</span>
          </div>

          <div className="space-y-3">
            {plan.assets.map(asset => (
              <div key={asset.title} className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg shrink-0">
                  <span className="material-symbols-outlined text-black" style={{fontSize:'16px'}}>{asset.icon}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-black truncate">{asset.title}</p>
                  <p className="text-[10px] text-slate-500 truncate">{asset.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AnalysisView;
