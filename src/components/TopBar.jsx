import React from 'react';

const TopBar = ({ title = 'Logistics Engine' }) => {
  return (
    <header className="flex justify-between items-center w-full px-6 h-14 bg-white/80 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-10">
      <div className="flex items-center gap-4 min-w-0">
        <span className="text-base font-bold tracking-tight text-black whitespace-nowrap">{title}</span>
        <div className="hidden md:flex items-center bg-slate-100 px-3 py-1.5 rounded-lg gap-2 border border-transparent focus-within:border-black focus-within:bg-white transition-all">
          <span className="material-symbols-outlined text-slate-400" style={{fontSize:'18px'}}>search</span>
          <input
            className="bg-transparent outline-none border-none text-sm w-48 lg:w-64 placeholder:text-slate-400 text-slate-700"
            placeholder="Search operational logs..."
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors" title="Notifications">
          <span className="material-symbols-outlined" style={{fontSize:'20px'}}>notifications</span>
        </button>
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors" title="Settings">
          <span className="material-symbols-outlined" style={{fontSize:'20px'}}>settings</span>
        </button>
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors" title="Help">
          <span className="material-symbols-outlined" style={{fontSize:'20px'}}>help</span>
        </button>
      </div>
    </header>
  );
};

export default TopBar;
