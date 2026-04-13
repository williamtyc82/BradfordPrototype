import React, { useState } from 'react';

const AVAILABLE_WORKERS = [
  { id: 'W-001', name: 'Marcus Tan', role: 'Lead Specialist', exp: '8 yrs', match: '98%' },
  { id: 'W-004', name: 'Wei Li Chen', role: 'General Driver', exp: '3 yrs', match: '75%' },
  { id: 'W-005', name: 'Siti Rahman', role: 'Admin Dispatcher', exp: '6 yrs', match: '40%' },
];

const AVAILABLE_VEHICLES = [
  { id: 'VH-5500', type: '3T Box Truck', reg: 'SFG 5500 H', capacity: '3 Tons', features: 'Box Body, GPS' },
  { id: 'VH-6633', type: 'Hazmat Van', reg: 'SGH 6633 B', capacity: '2 Tons', features: 'Hazmat Liner, GPS' },
];

const AVAILABLE_TOOLS = [
  { id: 'T-001', name: 'Forklift — Electric', qty: 2 },
  { id: 'T-002', name: 'Pallet Jacks (Manual)', qty: 5 },
  { id: 'T-003', name: 'Corner Protectors', qty: 80 },
  { id: 'T-004', name: 'Air-Ride Pads', qty: 30 },
  { id: 'T-006', name: 'Temp Loggers', qty: 10 },
  { id: 'T-007', name: 'Hazmat Spill Kits', qty: 8 },
];

const NewDeploymentModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    cargo: '',
    weight: '',
    destination: '',
    date: '',
    workerId: '',
    vehicleId: '',
    tools: [],
  });

  const toggleTool = (id) => {
    setFormData(prev => ({
      ...prev,
      tools: prev.tools.includes(id) ? prev.tools.filter(t => t !== id) : [...prev.tools, id]
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div 
        className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        style={{ maxHeight: '90vh', animation: 'fadeSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
      >
        <style>{`
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(20px) scale(0.98); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div>
            <div className="inline-block bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md mb-2">
              Manual Override
            </div>
            <h2 className="text-2xl font-black text-black tracking-tight">New Deployment</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined shrink-0" style={{ fontSize: '20px' }}>close</span>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-8 overflow-y-auto flex-1 bg-slate-50">
          {step === 1 && (
            <div className="space-y-6" style={{ animation: 'fadeSlideUp 0.3s ease forwards' }}>
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 border-b border-slate-200 pb-2">1. Cargo Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Cargo Description</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Sensitive Medical Equipment" 
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-black placeholder:text-slate-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                    value={formData.cargo}
                    onChange={(e) => setFormData(p => ({ ...p, cargo: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Estimated Weight</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 1.2 Tons" 
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-black placeholder:text-slate-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                    value={formData.weight}
                    onChange={(e) => setFormData(p => ({ ...p, weight: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-700">Destination</label>
                  <input 
                    type="text" 
                    placeholder="e.g. City General Hospital" 
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-black placeholder:text-slate-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                    value={formData.destination}
                    onChange={(e) => setFormData(p => ({ ...p, destination: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-700">Deployment Date &amp; Time</label>
                  <input 
                    type="datetime-local" 
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-black placeholder:text-slate-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                    value={formData.date}
                    onChange={(e) => setFormData(p => ({ ...p, date: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8" style={{ animation: 'fadeSlideUp 0.3s ease forwards' }}>
              
              {/* Workers */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">2. Assign Worker</h3>
                  <span className="text-[10px] font-bold text-slate-400">{AVAILABLE_WORKERS.length} Available</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {AVAILABLE_WORKERS.map(w => (
                    <div 
                      key={w.id}
                      onClick={() => setFormData(p => ({ ...p, workerId: w.id }))}
                      className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${
                        formData.workerId === w.id 
                          ? 'border-blue-600 bg-blue-50/50' 
                          : 'border-white bg-white hover:border-slate-300 shadow-sm'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-bold text-black">{w.name}</p>
                          <p className="text-xs text-slate-500 mt-1">{w.role}</p>
                        </div>
                        <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">{w.match} Match</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vehicles */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">3. Select Vehicle</h3>
                  <span className="text-[10px] font-bold text-slate-400">{AVAILABLE_VEHICLES.length} Available</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {AVAILABLE_VEHICLES.map(v => (
                    <div 
                      key={v.id}
                      onClick={() => setFormData(p => ({ ...p, vehicleId: v.id }))}
                      className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${
                        formData.vehicleId === v.id 
                          ? 'border-blue-600 bg-blue-50/50' 
                          : 'border-white bg-white hover:border-slate-300 shadow-sm'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-sm font-bold text-black">{v.type}</p>
                        <p className="text-[10px] text-slate-400 font-mono bg-slate-100 px-1.5 py-0.5 rounded">{v.reg}</p>
                      </div>
                      <p className="text-xs text-slate-500 mb-2">Cap: {v.capacity}</p>
                      <div className="flex flex-wrap gap-1">
                        {v.features.split(',').map(f => (
                          <span key={f} className="text-[9px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">{f.trim()}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">4. Equipment Allocations</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_TOOLS.map(t => {
                    const isSelected = formData.tools.includes(t.id);
                    return (
                      <div 
                        key={t.id}
                        onClick={() => toggleTool(t.id)}
                        className={`cursor-pointer px-4 py-2 rounded-xl border-2 transition-all flex items-center gap-2 ${
                          isSelected 
                            ? 'border-black bg-black text-white' 
                            : 'border-white bg-white text-slate-600 shadow-sm hover:border-slate-300'
                        }`}
                      >
                        <span className="text-xs font-bold">{t.name}</span>
                        {!isSelected && <span className="text-[10px] text-slate-400 ml-1">({t.qty} available)</span>}
                        {isSelected && <span className="material-symbols-outlined text-[14px]">check_circle</span>}
                      </div>
                    )
                  })}
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-slate-100 bg-white flex items-center justify-between shrink-0">
          <div className="flex gap-2">
            {step === 2 && (
              <button 
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Back
              </button>
            )}
            <button 
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"
            >
              Cancel
            </button>
          </div>
          
          {step === 1 ? (
            <button 
              onClick={() => setStep(2)}
              disabled={!formData.cargo || !formData.destination}
              className="px-6 py-2.5 bg-black text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Resource Allocation
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          ) : (
            <button 
              onClick={onClose} // In a real app, this would submit the form
              disabled={!formData.workerId || !formData.vehicleId}
              className="px-8 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-black hover:bg-blue-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              Submit Deployment Order
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default NewDeploymentModal;
