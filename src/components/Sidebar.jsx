import React from 'react';

const NAV_ITEMS = [
  { id: 'planning',   icon: 'dashboard',               label: 'Planning Canvas'  },
  { id: 'operations', icon: 'precision_manufacturing',  label: 'Operations'       },
  { id: 'resources',  icon: 'inventory',                label: 'Resources'        },
  { id: 'history',    icon: 'history',                  label: 'History'          },
];

const Sidebar = ({ activeTab, onTabChange, onNewDeployment }) => {
  return (
    <aside className="flex flex-col h-screen w-72 bg-white border-r border-slate-200 shrink-0 sticky top-0 overflow-hidden">

      {/* ── Brand lockup ── */}
      <div className="px-5 pt-6 pb-5 border-b border-slate-100">
        {/* Logo image — centred, slightly larger */}
        <div className="mb-3 flex justify-center">
          <img
            src="/logo.png"
            alt="Bradford Logistics"
            className="h-12 w-auto object-contain"
          />
        </div>

        {/* Brand text row */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-black text-black tracking-tight leading-none">
            Control Center
          </span>
          {/* Session badge — intentional, not orphaned */}
          <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-500 text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-md">
            <span
              className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"
              aria-hidden="true"
            />
            ID-882
          </span>
        </div>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 px-4 py-4 space-y-0.5 overflow-y-auto" aria-label="Main navigation">
        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest px-3 pb-2 select-none">
          Main
        </p>

        {NAV_ITEMS.map(({ id, icon, label }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={[
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-150 cursor-pointer text-left',
                active
                  ? 'bg-black text-white'
                  : 'text-slate-500 hover:text-black hover:bg-slate-50',
              ].join(' ')}
              aria-current={active ? 'page' : undefined}
            >
              <span
                className="material-symbols-outlined shrink-0"
                style={{ fontSize: '18px' }}
              >
                {icon}
              </span>
              <span className="truncate">{label}</span>

              {/* Resources gets an "AI" badge to hint its purpose */}
              {id === 'resources' && !active && (
                <span className="ml-auto text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-100 text-blue-600 shrink-0">
                  AI
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* ── Footer ── */}
      <div className="px-4 pb-5 pt-4 space-y-4 border-t border-slate-100">
        <button
          onClick={onNewDeployment}
          className="w-full bg-black text-white py-2.5 px-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-800 active:scale-[0.98] transition-all cursor-pointer"
          aria-label="Create new deployment"
        >
          <span className="material-symbols-outlined shrink-0" style={{ fontSize: '16px' }}>add</span>
          New Deployment
        </button>

        {/* User row */}
        <div className="flex items-center gap-3">
          <div className="rounded-lg overflow-hidden bg-slate-200 shrink-0" style={{ width: 36, height: 36 }}>
            <img
              alt="Warehouse Alpha — Node Supervisor"
              style={{ width: 36, height: 36, objectFit: 'cover' }}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbdBjEjxE7BQa_ZCQCo4BmcmbLm0SiWWGeLFvtB4yTApABNnmkXLpSDePSawN5mFf0fbFkCR05q30pMGwXBMRr6wc7-ZsLgchF34ourJARJ4CDLMMdKqchvTpEpKUPSp5S0khPd2pw4Ffa1LHkdV8nH2rgstSTIIU8cpxglP2u2uzO-T2ReVJ5tkaC5R0Y67ALfswOlplgwDjbeEZsCJORblwvgUaRG_YOPGzUQFxzczOWNmxRZYkF__P2CQ9MhsCMylL32WDU7C4"
            />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-black truncate">Warehouse Alpha</p>
            <p className="text-[10px] text-slate-400 truncate">Node Supervisor</p>
          </div>
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;
