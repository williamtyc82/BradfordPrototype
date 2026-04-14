import React from 'react';

const ReadyPanel = ({ hasWorkPlan, onConfirm }) => {
  return (
    <section className="rounded-xl overflow-hidden border border-slate-800 bg-black">
      <div className="px-6 py-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-[240px]">
          <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-0.5">Ready for Execution</p>
          <h3 className="text-sm font-bold text-white leading-tight">Confirm &amp; Generate Deployment Order</h3>
          {!hasWorkPlan && (
            <p className="text-[10px] text-slate-600 mt-0.5">Generate a work plan above to unlock.</p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            disabled={!hasWorkPlan}
            className="border border-slate-700 text-slate-300 px-4 py-2 rounded-lg text-xs font-bold hover:bg-white/10 active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed whitespace-nowrap"
          >
            Re-generate AI Plan
          </button>
          <button
            disabled={!hasWorkPlan}
            onClick={onConfirm}
            className="bg-white text-black px-5 py-2 rounded-lg text-xs font-black flex items-center gap-1.5 hover:bg-slate-100 active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed whitespace-nowrap shadow-sm cursor-pointer"
          >
            Confirm &amp; Generate DO
            <span className="material-symbols-outlined" style={{fontSize:'14px'}}>arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReadyPanel;
