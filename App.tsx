
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { IdeaLab } from './components/IdeaLab';
import { ScriptBuddy } from './components/ScriptBuddy';
import { CreatorTool } from './types';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<CreatorTool>('analytics');

  const renderContent = () => {
    switch (activeTool) {
      case 'analytics':
        return <Dashboard />;
      case 'ideas':
        return <IdeaLab />;
      case 'scripts':
        return <ScriptBuddy />;
      case 'seo':
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-in zoom-in-95 duration-500">
             <div className="bg-amber-500/10 p-4 rounded-2xl">
               <svg className="w-16 h-16 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
               </svg>
             </div>
             <h2 className="text-3xl font-black">SEO Tool Coming Soon!</h2>
             <p className="text-slate-400 max-w-md">We're finalizing our high-performance metadata analysis engine to give you the best CTR possible.</p>
             <button 
               onClick={() => setActiveTool('ideas')}
               className="bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-xl font-bold transition-all border border-slate-700"
             >
               Go to Idea Lab
             </button>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  const getTitle = () => {
    switch(activeTool) {
      case 'analytics': return "Channel Analytics Overview";
      case 'ideas': return "AI Idea Laboratory";
      case 'scripts': return "Content Script Writer";
      case 'seo': return "SEO & Title Optimization";
      default: return "Dashboard";
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <Sidebar activeTool={activeTool} onToolChange={setActiveTool} />
      
      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl font-black">{getTitle()}</h2>
            <p className="text-slate-500 text-sm">Welcome back, Creator! Your channel is growing 15% faster than last month.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-slate-800 rounded-xl p-2 px-4 flex items-center gap-2 border border-slate-700">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Live Sync</span>
            </div>
            <button className="bg-blue-600 hover:bg-blue-500 p-2.5 rounded-xl transition-all shadow-lg shadow-blue-900/20">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>

      {/* Floating Action Menu for Quick AI Help */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="bg-gradient-to-tr from-blue-600 to-indigo-600 w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-900/40 hover:scale-110 transition-transform group">
          <svg className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default App;
