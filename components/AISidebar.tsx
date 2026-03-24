import React, { useEffect, useState } from 'react';
import { Sparkles, BrainCircuit, RefreshCw, MessageSquare, Users, Activity, Mic, BarChart3, Settings2, Zap } from 'lucide-react';
import { Track, AIAnalysis, CrowdState } from '../types';
import { getTransitionAdvice, generateDJPersonaMessage } from '../services/geminiService';

interface AISidebarProps {
  deckA: Track | null;
  deckB: Track | null;
}

const AISidebar: React.FC<AISidebarProps> = ({ deckA, deckB }) => {
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [personaMsg, setPersonaMsg] = useState("AI DJ Agent Ready. Load tracks to begin.");
  const [activeTab, setActiveTab] = useState<'agents' | 'crowd' | 'voice' | 'analytics'>('agents');
  const [crowdState, setCrowdState] = useState<CrowdState>({ energy: 65, engagement: 80, mood: 'Vibing' });

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

  // Simulate crowd energy changes
  useEffect(() => {
    const interval = setInterval(() => {
      setCrowdState(prev => ({
        ...prev,
        energy: Math.max(0, Math.min(100, prev.energy + (Math.random() * 10 - 5))),
        engagement: Math.max(0, Math.min(100, prev.engagement + (Math.random() * 6 - 3)))
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const agents = [
    { name: 'Track Analysis', status: deckA || deckB ? 'Active' : 'Idle', color: 'text-blue-400' },
    { name: 'Beat Sync', status: deckA && deckB ? 'Active' : 'Standby', color: 'text-green-400' },
    { name: 'Transition', status: analysis ? 'Ready' : 'Waiting', color: 'text-purple-400' },
    { name: 'Effects', status: 'Active', color: 'text-pink-400' },
    { name: 'Flow Director', status: 'Monitoring', color: 'text-yellow-400' },
    { name: 'Remix Engine', status: 'Standby', color: 'text-orange-400' },
  ];

  return (
    <div className="h-full bg-neon-panel border-l border-white/10 flex flex-col w-full">
      <div className="p-4 border-b border-white/10 bg-gradient-to-r from-purple-900/10 to-transparent flex items-center justify-between">
        <h2 className="text-white font-display font-bold text-lg flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-neon-purple" /> AI CO-PILOT
        </h2>
        <div className="flex items-center gap-2 text-xs font-mono text-neon-green bg-neon-green/10 px-2 py-1 rounded border border-neon-green/20">
          <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          SYSTEM ACTIVE
        </div>
      </div>

      <div className="flex border-b border-white/10 overflow-x-auto scrollbar-hide">
        {[
          { id: 'agents', icon: Settings2, label: 'Agents' },
          { id: 'crowd', icon: Users, label: 'Crowd' },
          { id: 'voice', icon: Mic, label: 'Voice' },
          { id: 'analytics', icon: BarChart3, label: 'Stats' }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-3 px-2 flex flex-col items-center gap-1 text-xs font-medium transition-colors min-w-[70px] ${
              activeTab === tab.id ? 'text-white border-b-2 border-neon-purple bg-white/5' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        {activeTab === 'agents' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-2">
              {agents.map((agent, idx) => (
                <div key={idx} className="bg-black/40 p-3 rounded-lg border border-white/5 flex flex-col gap-1">
                  <span className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">{agent.name}</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${agent.status === 'Active' || agent.status === 'Ready' || agent.status === 'Monitoring' ? 'bg-current animate-pulse' : 'bg-gray-600'} ${agent.color}`} />
                    <span className={`text-xs font-mono ${agent.status === 'Active' || agent.status === 'Ready' || agent.status === 'Monitoring' ? 'text-white' : 'text-gray-500'}`}>
                      {agent.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-10 gap-3 text-gray-500">
                <RefreshCw className="w-6 h-6 animate-spin" />
                <span className="text-xs">Agents analyzing tracks...</span>
              </div>
            ) : analysis ? (
              <div className="space-y-4">
                <div className="bg-black/40 rounded-xl p-4 border border-white/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-10">
                    <Sparkles className="w-24 h-24 text-white" />
                  </div>
                  <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Transition Score</div>
                  <div className="text-4xl font-display font-bold text-white flex items-end gap-2">
                    {analysis.transitionSuitability}%
                  </div>
                </div>
                <div className="bg-gradient-to-br from-neon-purple/10 to-transparent p-4 rounded-lg border border-neon-purple/20">
                  <div className="flex items-center gap-2 mb-2 text-neon-purple">
                    <Zap className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase">Transition Agent Suggestion</span>
                  </div>
                  <p className="text-sm text-gray-200 leading-relaxed">
                    {analysis.suggestedTransition}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500 text-sm">
                Load tracks on Deck A and B to activate transition agents.
              </div>
            )}
          </div>
        )}

        {activeTab === 'crowd' && (
          <div className="space-y-6">
            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">Crowd Energy</div>
                  <div className="text-3xl font-display font-bold text-white">{Math.round(crowdState.energy)}%</div>
                </div>
                <div className={`px-3 py-1 rounded text-xs font-bold uppercase ${
                  crowdState.energy > 80 ? 'bg-red-500/20 text-red-400 border border-red-500/50' :
                  crowdState.energy > 50 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50' :
                  'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                }`}>
                  {crowdState.energy > 80 ? 'Hyped' : crowdState.energy > 50 ? 'Vibing' : 'Chill'}
                </div>
              </div>
              
              <div className="h-32 flex items-end gap-1">
                {Array.from({ length: 20 }).map((_, i) => {
                  const height = Math.random() * crowdState.energy;
                  return (
                    <div 
                      key={i} 
                      className="flex-1 bg-gradient-to-t from-neon-purple/50 to-neon-pink rounded-t-sm transition-all duration-500"
                      style={{ height: `${height}%`, opacity: height > 20 ? 1 : 0.3 }}
                    />
                  );
                })}
              </div>
            </div>

            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
              <div className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-3">Crowd Agent Actions</div>
              <div className="space-y-2">
                <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded border border-white/10 text-sm text-gray-300 transition-colors text-left px-3 flex justify-between">
                  <span>Increase Energy</span>
                  <span className="text-neon-pink">Drop Bass</span>
                </button>
                <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded border border-white/10 text-sm text-gray-300 transition-colors text-left px-3 flex justify-between">
                  <span>Cool Down</span>
                  <span className="text-neon-blue">Filter Highs</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'voice' && (
          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-lg p-4 border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-green/10 blur-3xl rounded-full" />
              <div className="flex items-center gap-3 mb-3 relative z-10">
                <div className="w-10 h-10 rounded-full bg-neon-green flex items-center justify-center text-black font-bold">
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm font-bold text-white block">Voice Agent</span>
                  <span className="text-[10px] text-neon-green uppercase tracking-wider">Ready to broadcast</span>
                </div>
              </div>
              <p className="text-white text-lg font-medium italic relative z-10">"{personaMsg}"</p>
            </div>
            
            <div className="space-y-3">
              <div className="text-xs text-gray-400 uppercase tracking-wider font-bold">Generate Shoutout</div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => deckA && generateDJPersonaMessage(deckA, 'Hype').then(setPersonaMsg)} className="p-3 bg-black/40 hover:bg-white/10 rounded-lg border border-white/5 text-sm text-white transition-colors flex flex-col items-center gap-1">
                  <span className="text-xl">🔥</span> Hype Drop
                </button>
                <button onClick={() => deckA && generateDJPersonaMessage(deckA, 'Chill').then(setPersonaMsg)} className="p-3 bg-black/40 hover:bg-white/10 rounded-lg border border-white/5 text-sm text-white transition-colors flex flex-col items-center gap-1">
                  <span className="text-xl">🌊</span> Smooth Vibe
                </button>
                <button className="p-3 bg-black/40 hover:bg-white/10 rounded-lg border border-white/5 text-sm text-white transition-colors flex flex-col items-center gap-1">
                  <span className="text-xl">👋</span> Welcome
                </button>
                <button className="p-3 bg-black/40 hover:bg-white/10 rounded-lg border border-white/5 text-sm text-white transition-colors flex flex-col items-center gap-1">
                  <span className="text-xl">🚀</span> Transition
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs text-gray-400 uppercase tracking-wider font-bold">Voice Settings</div>
              <select className="w-full bg-black/40 border border-white/10 rounded p-2 text-sm text-white outline-none focus:border-neon-purple">
                <option>Male - Energetic (Default)</option>
                <option>Female - Smooth</option>
                <option>Robotic - Daft Style</option>
                <option>Deep - Festival Announcer</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
              <div className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-4">Mix Analytics</div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">BPM Consistency</span>
                    <span className="text-white font-mono">94%</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-neon-blue w-[94%]" />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">Harmonic Matches</span>
                    <span className="text-white font-mono">8/10</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-neon-purple w-[80%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">Energy Flow</span>
                    <span className="text-white font-mono">Optimal</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-neon-pink w-[100%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
              <div className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-3">Set Generator</div>
              <p className="text-xs text-gray-500 mb-3">AI will generate a playlist based on your selected mood and duration.</p>
              
              <div className="space-y-2 mb-4">
                <select className="w-full bg-gray-900 border border-white/10 rounded p-2 text-sm text-white outline-none">
                  <option>Mood: High Energy Party</option>
                  <option>Mood: Deep House Lounge</option>
                  <option>Mood: Workout Motivation</option>
                  <option>Mood: Late Night Drive</option>
                </select>
                <select className="w-full bg-gray-900 border border-white/10 rounded p-2 text-sm text-white outline-none">
                  <option>Duration: 30 Minutes</option>
                  <option>Duration: 1 Hour</option>
                  <option>Duration: 2 Hours</option>
                </select>
              </div>
              
              <button className="w-full py-2 bg-neon-purple hover:bg-neon-purple/80 text-white font-bold rounded text-sm transition-colors">
                Generate Smart Set
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AISidebar;