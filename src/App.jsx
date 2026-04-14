import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import IntentEngine from './components/IntentEngine';
import AnalysisView from './components/AnalysisView';
import ReadyPanel from './components/ReadyPanel';
import OperationsView from './components/OperationsView';
import HistoryView from './components/HistoryView';
import ResourcesView from './components/ResourcesView';
import NewDeploymentModal from './components/NewDeploymentModal';
import DeploymentOrderModal from './components/DeploymentOrderModal';

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
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [isDOModalOpen, setIsDOModalOpen] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setWorkPlan({
        job: {
          cargo: 'Siemens Magnetom MRI',
          weight: '3 Tons',
          priority: 'CRITICAL',
          destination: 'City General Hospital',
        },
        match: {
          score: '99%',
          specialist: 'Sarah Jenkins',
          role: 'Medical Logistics Chief',
          tags: ['Class A Medical', 'Vibration Control', 'Climate Certified'],
          note: 'System Note: Selection based on 40+ flawless high-cost medical equipment relocations.',
        },
        assets: [
          { icon: 'rv_hookup',  title: 'Air-Ride Transport Trailer', sub: 'Vehicle Unit: MT-904X' },
          { icon: 'thermostat', title: 'Climate Control Unit',       sub: 'Regulated to 20°C ± 1°C' },
          { icon: 'sensors',    title: 'Vibration Sensors',          sub: 'Continuous Live Monitoring' },
        ],
      });
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onNewDeployment={() => setIsManualModalOpen(true)}
      />

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
              <ReadyPanel hasWorkPlan={!!workPlan} onConfirm={() => setIsDOModalOpen(true)} />

              {/* Bottom breathing room */}
              <div className="h-8" />
            </div>
          )}

          {activeTab === 'operations' && <OperationsView />}
          {activeTab === 'resources'  && <ResourcesView />}
          {activeTab === 'history'    && <HistoryView />}
        </main>
      </div>

      {isManualModalOpen && (
        <NewDeploymentModal onClose={() => setIsManualModalOpen(false)} />
      )}

      {isDOModalOpen && workPlan && (
        <DeploymentOrderModal plan={workPlan} onClose={() => setIsDOModalOpen(false)} />
      )}
    </div>
  );
}

export default App;
