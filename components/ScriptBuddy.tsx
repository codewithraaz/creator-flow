
import React, { useState } from 'react';
import { generateScriptOutline } from '../services/geminiService';
import { ScriptSection } from '../types';

export const ScriptBuddy: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [script, setScript] = useState<ScriptSection[]>([]);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const result = await generateScriptOutline(topic);
      setScript(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
        <h2 className="text-2xl font-bold mb-4">Script Buddy</h2>
        <div className="flex gap-3">
          <input 
            type="text" 
            placeholder="Enter your video topic (e.g. How to grow on YouTube in 2024)"
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <button 
            onClick={handleGenerate}
            disabled={loading || !topic}
            className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 px-6 rounded-xl font-bold transition-all"
          >
            {loading ? 'Writing...' : 'Draft Script'}
          </button>
        </div>
      </div>

      {script.length > 0 && (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-6 bg-slate-700/50 border-b border-slate-700 flex justify-between items-center">
            <h3 className="font-bold text-lg">Retain Your Audience: Outline</h3>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-slate-600 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
              </button>
              <button className="p-2 hover:bg-slate-600 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              </button>
            </div>
          </div>
          <div className="p-6 space-y-6">
            {script.map((section, idx) => (
              <div key={idx} className="flex gap-6 relative">
                {idx !== script.length - 1 && <div className="absolute left-3 top-10 bottom-0 w-[2px] bg-slate-700"></div>}
                <div className="z-10 bg-emerald-500 h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold text-emerald-950 shrink-0 mt-1">
                  {idx + 1}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold text-slate-100">{section.part}</span>
                    <span className="bg-slate-700 text-slate-400 text-[10px] px-2 py-0.5 rounded font-mono">{section.time}</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    {section.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
