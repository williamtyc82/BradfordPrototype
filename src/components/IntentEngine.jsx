import React, { useState } from 'react';

const IntentEngine = ({ onGenerate, isGenerating }) => {
  const [intent, setIntent] = useState('');

  const handleSubmit = () => {
    if (!intent.trim()) return;
    onGenerate(intent);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  };

  return (
    <section className="bg-white rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
      {isGenerating && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-7 h-7 border-[3px] border-black border-t-transparent rounded-full animate-spin" />
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-600 animate-pulse">Analyzing Intent…</p>
          </div>
        </div>
      )}

      <div className="p-6 space-y-4">
        {/* Label row */}
        <div className="flex items-center justify-between">
          <label className="text-[10px] uppercase font-bold tracking-widest text-slate-500 flex items-center gap-1.5">
            <span className="material-symbols-outlined" style={{fontSize:'14px'}}>auto_awesome</span>
            Intent Engine
          </label>
          <button
            onClick={() => setIntent('Need to move a 3-ton Siemens Magnetom MRI Machine to City General Hospital. Requires cleanroom-grade transport, absolute vibration control, and climate regulation for tomorrow 0800.')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          >
            Try a Sample →
          </button>
        </div>

        {/* Textarea */}
        <textarea
          className="w-full bg-slate-50 border border-slate-200 focus:border-black focus:ring-0 focus:outline-none rounded-lg p-4 text-sm font-medium placeholder:text-slate-400 resize-none transition-all leading-relaxed"
          placeholder="Describe cargo needs, destination, timing, and any special handling requirements…"
          rows={4}
          value={intent}
          onChange={(e) => setIntent(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {/* Actions row */}
        <div className="flex items-center justify-between">
          <p className="text-[10px] text-slate-400">⌘ + Enter to generate</p>
          <button
            onClick={handleSubmit}
            disabled={isGenerating || !intent.trim()}
            className="bg-black text-white px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all hover:bg-slate-800 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
          >
            {isGenerating ? 'Generating…' : 'Generate Work Plan'}
            <span className="material-symbols-outlined" style={{fontSize:'16px'}}>bolt</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default IntentEngine;
