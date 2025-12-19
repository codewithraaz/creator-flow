
import React, { useState } from 'react';
import { generateVideoIdeas } from '../services/geminiService';
import { VideoIdea } from '../types';

export const IdeaLab: React.FC = () => {
  const [niche, setNiche] = useState('');
  const [audience, setAudience] = useState('');
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<VideoIdea[]>([]);

  const handleGenerate = async () => {
    if (!niche || !audience) return;
    setLoading(true);
    try {
      const result = await generateVideoIdeas(niche, audience);
      setIdeas(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-xl">
        <h2 className="text-2xl font-bold mb-2">AI Idea Lab</h2>
        <p className="text-slate-400 mb-6">Brainstorm your next viral video concept based on your niche.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Your Niche</label>
            <input 
              type="text" 
              placeholder="e.g. Tech Reviews, Cooking, Fitness"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Target Audience</label>
            <input 
              type="text" 
              placeholder="e.g. Beginners, Pro Photographers, Students"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
            />
          </div>
        </div>
        
        <button 
          onClick={handleGenerate}
          disabled={loading || !niche || !audience}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/20"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Thinking of some bangers...
            </div>
          ) : 'Generate Viral Ideas'}
        </button>
      </div>

      {ideas.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ideas.map((idea, idx) => (
            <div key={idx} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-2 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
                  idea.potential === 'Viral' ? 'bg-rose-500/20 text-rose-400' :
                  idea.potential === 'Search-Focused' ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {idea.potential}
                </span>
                <button className="text-slate-500 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{idea.title}</h3>
              <p className="text-slate-400 text-sm mb-4 line-clamp-2">{idea.description}</p>
              
              <div className="bg-slate-900 p-4 rounded-xl mb-4">
                <p className="text-xs font-bold text-slate-500 uppercase mb-1">Hook</p>
                <p className="text-sm italic text-slate-300">"{idea.hook}"</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {idea.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-[10px] font-bold bg-slate-700 px-2 py-1 rounded text-slate-300">#{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
