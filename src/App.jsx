import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import IntentEngine from './components/IntentEngine';
import AnalysisView from './components/AnalysisView';
import ReadyPanel from './components/ReadyPanel';
import OperationsView from './components/OperationsView';
import HistoryView from './components/HistoryView';
import ResourcesView from './components/ResourcesView';

const TAB_LABELS = {
  planning:   'Logistics Engine',
  operations: 'Live Operations',
  resources:  'Resource Registry',
  history:    'Deployment History',
};

function App() {
  const [activeTab, setActiveTab] = useState('planning');
  const [workPlan, setWorkPlan] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = (intent) => {
    setIsGenerating(true);
    setTimeout(() => {
      setWorkPlan({
        job: {
          cargo: 'Heritage Pottery',
          weight: '4 Tons',
          priority: 'HIGH',
          destination: 'Northern Port',
        },
        match: {
          score: '98%',
          specialist: 'Marcus Tan',
          role: 'Lead Specialist',
          tags: ['Class 4', 'Fragile Certified'],
          note: 'System Note: Selection based on 12-month zero-damage record for pottery.',
        },
        assets: [
          { icon: 'rv_hookup',  title: '10-Ton Tail-lift',      sub: 'Vehicle Unit: VH-8821' },
          { icon: 'shield',     title: 'Corner Protectors',     sub: 'Qty: 24 Industrial Units' },
          { icon: 'air',        title: 'Air-Ride Suspension',   sub: 'Primary Shock Mitigation' },
        ],
      });
      setIsGenerating(false);
    }, 1500);
  };

  return (
    /* Root: fixed-height viewport, flex row, no overflow at this level */
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main: fills remaining width, scrolls independently */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopBar title={TAB_LABELS[activeTab]} />

        <main className="flex-1 overflow-y-auto">
          {activeTab === 'planning' && (
            <div className="w-full px-8 md:px-12 xl:px-16 py-8 space-y-6">
              {/* Page heading */}
              <section>
                <h1 className="text-3xl md:text-4xl xl:text-5xl font-black tracking-tight text-black leading-tight">
                  Morning Intelligence Hub
                </h1>
                <p className="text-sm md:text-base text-slate-500 mt-2 max-w-2xl leading-relaxed">
                  Initialize operations with AI-assisted workload mapping. Describe your cargo needs to generate a compliance-ready deployment.
                </p>
              </section>

              {/* Intent Engine */}
              <IntentEngine onGenerate={handleGenerate} isGenerating={isGenerating} />

              {/* Analysis — only visible after generation */}
              {workPlan && <AnalysisView plan={workPlan} />}

              {/* Ready Panel — always visible, disabled until plan exists */}
              <ReadyPanel hasWorkPlan={!!workPlan} />

              {/* Bottom breathing room */}
              <div className="h-8" />
            </div>
          )}

          {activeTab === 'operations' && <OperationsView />}
          {activeTab === 'resources'  && <ResourcesView />}
          {activeTab === 'history'    && <HistoryView />}
        </main>
      </div>
    </div>
  );
}

export default App;
