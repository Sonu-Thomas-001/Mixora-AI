import React, { useEffect, useState } from 'react';
import { Sparkles, BrainCircuit, RefreshCw, MessageSquare } from 'lucide-react';
import { Track, AIAnalysis } from '../types';
import { getTransitionAdvice, generateDJPersonaMessage } from '../services/geminiService';

interface AISidebarProps {
  deckA: Track | null;
  deckB: Track | null;
}

const AISidebar: React.FC<AISidebarProps> = ({ deckA, deckB }) => {
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [personaMsg, setPersonaMsg] = useState("AI DJ Agent Ready. Load tracks to begin.");
  const [activeTab, setActiveTab] = useState<'advice' | 'persona'>('advice');

  useEffect(() => {
    const fetchAdvice = async () => {
      if (deckA && deckB) {
        setLoading(true);
        const result = await getTransitionAdvice(deckA, deckB);
        setAnalysis(result);
        setLoading(false);
      } else {
        setAnalysis(null);
      }
    };
    fetchAdvice();
  }, [deckA, deckB]);

  useEffect(() => {
    const activeTrack = deckA || deckB;
    if (activeTrack) {
        generateDJPersonaMessage(activeTrack, 'Hype').then(setPersonaMsg);
    }
  }, [deckA, deckB]);

  return (
    <div className="h-full bg-neon-panel border-l border-white/10 flex flex-col w-full">
      <div className="p-4 border-b border-white/10 bg-gradient-to-r from-purple-900/10 to-transparent">
        <h2 className="text-white font-display font-bold text-lg flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-neon-purple" /> AI AGENT
        </h2>
      </div>

      <div className="flex border-b border-white/10">
          <button 
            onClick={() => setActiveTab('advice')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'advice' ? 'text-white border-b-2 border-neon-purple' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Mixing Advice
          </button>
          <button 
            onClick={() => setActiveTab('persona')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'persona' ? 'text-white border-b-2 border-neon-purple' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Personality
          </button>
      </div>

      <div className="p-6 flex-1 overflow-y-auto">
        {activeTab === 'advice' ? (
             <div className="space-y-6">
             {loading ? (
               <div className="flex flex-col items-center justify-center py-10 gap-3 text-gray-500">
                 <RefreshCw className="w-6 h-6 animate-spin" />
                 <span className="text-xs">Analyzing harmonic compatibility...</span>
               </div>
             ) : analysis ? (
               <>
                 {/* Score */}
                 <div className="bg-black/40 rounded-xl p-4 border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-10">
                        <Sparkles className="w-24 h-24 text-white" />
                    </div>
                    <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Compatibility Score</div>
                    <div className="text-4xl font-display font-bold text-white flex items-end gap-2">
                        {analysis.transitionSuitability}%
                        <span className={`text-sm mb-1 px-2 py-0.5 rounded ${
                            analysis.transitionSuitability > 80 ? 'bg-green-500/20 text-green-400' : 
                            analysis.transitionSuitability > 50 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                            {analysis.transitionSuitability > 80 ? 'EXCELLENT' : analysis.transitionSuitability > 50 ? 'GOOD' : 'TRICKY'}
                        </span>
                    </div>
                 </div>
     
                 {/* Key Check */}
                 <div className="space-y-3">
                    <h3 className="text-sm font-bold text-gray-300 border-b border-white/10 pb-2">DIAGNOSTICS</h3>
                    
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Key Harmony</span>
                        <span className={`text-sm font-mono ${
                            analysis.keyCompatibility === 'Harmonic' ? 'text-neon-blue' :
                            analysis.keyCompatibility === 'Compatible' ? 'text-neon-green' : 'text-red-400'
                        }`}>{analysis.keyCompatibility}</span>
                    </div>
     
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Energy Flow</span>
                        <span className="text-sm font-mono text-purple-400">{analysis.energyChange}</span>
                    </div>
                 </div>
     
                 {/* Suggestion */}
                 <div className="bg-gradient-to-br from-neon-purple/10 to-transparent p-4 rounded-lg border border-neon-purple/20">
                    <div className="flex items-center gap-2 mb-2 text-neon-purple">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase">AI Recommendation</span>
                    </div>
                    <p className="text-sm text-gray-200 leading-relaxed">
                        {analysis.suggestedTransition}
                    </p>
                 </div>
               </>
             ) : (
               <div className="text-center py-10 text-gray-500">
                 <p>Load tracks on Deck A and B to receive real-time mixing advice.</p>
               </div>
             )}
           </div>
        ) : (
            <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-lg p-4 border border-white/5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-neon-green flex items-center justify-center text-black font-bold">DJ</div>
                        <span className="text-sm font-bold text-gray-300">Auto-MC</span>
                    </div>
                    <p className="text-white text-lg font-medium italic">"{personaMsg}"</p>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => deckA && generateDJPersonaMessage(deckA, 'Hype').then(setPersonaMsg)} className="p-2 bg-gray-800 hover:bg-gray-700 rounded text-xs text-gray-300 transition-colors">Generate Hype</button>
                    <button onClick={() => deckA && generateDJPersonaMessage(deckA, 'Chill').then(setPersonaMsg)} className="p-2 bg-gray-800 hover:bg-gray-700 rounded text-xs text-gray-300 transition-colors">Generate Chill</button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default AISidebar;