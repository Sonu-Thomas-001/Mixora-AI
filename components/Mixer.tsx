import React, { useState } from 'react';
import { Sliders, Mic, Volume2, Wand2, Settings2, RefreshCw } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';

interface MixerProps {
  crossfader: number;
  onCrossfaderChange: (val: number) => void;
}

const Mixer: React.FC<MixerProps> = ({ crossfader, onCrossfaderChange }) => {
  const [transitionStyle, setTransitionStyle] = useState('Smooth');
  const [remixGenreA, setRemixGenreA] = useState('Original');
  const [remixGenreB, setRemixGenreB] = useState('Original');
  const [isRemixingA, setIsRemixingA] = useState(false);
  const [isRemixingB, setIsRemixingB] = useState(false);
  const [volumeA, setVolumeA] = useState(1);
  const [volumeB, setVolumeB] = useState(1);

  const handleCrossfader = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    onCrossfaderChange(val);
    audioEngine.setCrossfader(val);
  };

  const handleVolumeA = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolumeA(val);
    audioEngine.setVolume('A', val);
  };

  const handleVolumeB = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolumeB(val);
    audioEngine.setVolume('B', val);
  };

  const handleRemix = (deck: 'A' | 'B') => {
    if (deck === 'A') {
      setIsRemixingA(true);
      setTimeout(() => setIsRemixingA(false), 2000);
    } else {
      setIsRemixingB(true);
      setTimeout(() => setIsRemixingB(false), 2000);
    }
  };

  return (
    <div className="bg-neon-panel border border-white/10 rounded-xl w-full max-w-4xl flex flex-col items-center py-2 px-4 z-10 shadow-2xl shrink-0 overflow-y-auto">
      <div className="w-full flex justify-between gap-2 mb-2">
        {/* Channel A Strip */}
        <div className="flex-1 flex flex-col items-center gap-2 bg-black/20 p-2 rounded-xl border border-white/5">
           <div className="text-neon-blue font-bold font-display text-lg">CH A</div>
           
           {/* AI Remix Engine A */}
           <div className="w-full bg-black/40 p-2 rounded-lg border border-neon-blue/20">
             <div className="flex items-center gap-2 mb-1 text-neon-blue">
               <Wand2 className="w-3 h-3" />
               <span className="text-[9px] uppercase font-bold tracking-wider">AI Remix</span>
             </div>
             <select 
               value={remixGenreA}
               onChange={(e) => setRemixGenreA(e.target.value)}
               className="w-full bg-gray-900 border border-white/10 rounded p-1 text-[10px] text-white outline-none mb-1"
             >
               <option>Original</option>
               <option>EDM Drop</option>
               <option>Lo-Fi Chill</option>
               <option>Trap Beat</option>
             </select>
             <button 
               onClick={() => handleRemix('A')}
               disabled={isRemixingA || remixGenreA === 'Original'}
               className="w-full py-1 bg-neon-blue/20 hover:bg-neon-blue/30 text-neon-blue border border-neon-blue/50 rounded text-[10px] font-bold transition-colors flex items-center justify-center gap-1 disabled:opacity-50"
             >
               {isRemixingA ? <RefreshCw className="w-3 h-3 animate-spin" /> : 'Apply Remix'}
             </button>
           </div>

           <div className="flex gap-2">
             <Knob label="HIGH" color="cyan" />
             <Knob label="MID" color="cyan" />
             <Knob label="LOW" color="cyan" />
           </div>
           
           <div className="h-24 w-6 bg-gray-900 rounded-full relative mt-2 border border-white/5 flex justify-center">
             <div className="absolute bottom-0 w-3 bg-gradient-to-t from-neon-blue/20 to-neon-blue rounded-full opacity-80 pointer-events-none" style={{ height: `${volumeA * 100}%` }}></div>
             <input
               type="range"
               min="0"
               max="1"
               step="0.01"
               value={volumeA}
               onChange={handleVolumeA}
               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
               style={{ writingMode: 'vertical-lr' } as any}
             />
             <div 
                className="absolute w-10 h-4 bg-gray-300 rounded shadow-[0_4px_10px_rgba(0,0,0,0.5)] pointer-events-none border-y-2 border-gray-400 flex items-center justify-center"
                style={{ bottom: `calc(${volumeA * 100}% - 8px)` }}
             >
               <div className="w-6 h-0.5 bg-gray-500"></div>
             </div>
           </div>
        </div>

        {/* Master Section */}
        <div className="flex flex-col items-center justify-between py-2 w-40 shrink-0">
           <div className="flex flex-col items-center gap-1 w-full">
             <span className="text-[10px] text-gray-500 font-mono tracking-widest font-bold">MASTER</span>
             <div className="flex gap-1 h-16 items-end bg-black/40 p-1 rounded-lg border border-white/5 w-full justify-center">
               <div className="w-2 bg-gradient-to-t from-green-500 via-yellow-500 to-red-500 h-[80%] rounded-sm shadow-[0_0_10px_rgba(0,255,0,0.2)]"></div>
               <div className="w-2 bg-gradient-to-t from-green-500 via-yellow-500 to-red-500 h-[75%] rounded-sm shadow-[0_0_10px_rgba(0,255,0,0.2)]"></div>
             </div>
           </div>
           
           {/* Transition Customization */}
           <div className="w-full bg-black/40 p-2 rounded-lg border border-white/5 mt-2">
             <div className="flex items-center gap-1 mb-1 text-neon-purple">
               <Settings2 className="w-3 h-3" />
               <span className="text-[9px] uppercase font-bold tracking-wider">Transition</span>
             </div>
             <select 
               value={transitionStyle}
               onChange={(e) => setTransitionStyle(e.target.value)}
               className="w-full bg-gray-900 border border-white/10 rounded p-1 text-[10px] text-white outline-none"
             >
               <option>Smooth Blend</option>
               <option>Aggressive Cut</option>
               <option>Drop Switch</option>
               <option>Echo Out</option>
             </select>
           </div>
           
           <button className="mt-2 p-3 bg-gray-800 rounded-full hover:bg-gray-700 active:bg-neon-purple active:text-white transition-colors text-gray-400 border border-white/10 shadow-lg">
             <Mic className="w-5 h-5" />
           </button>
        </div>

        {/* Channel B Strip */}
        <div className="flex-1 flex flex-col items-center gap-2 bg-black/20 p-2 rounded-xl border border-white/5">
           <div className="text-neon-pink font-bold font-display text-lg">CH B</div>
           
           {/* AI Remix Engine B */}
           <div className="w-full bg-black/40 p-2 rounded-lg border border-neon-pink/20">
             <div className="flex items-center gap-2 mb-1 text-neon-pink">
               <Wand2 className="w-3 h-3" />
               <span className="text-[9px] uppercase font-bold tracking-wider">AI Remix</span>
             </div>
             <select 
               value={remixGenreB}
               onChange={(e) => setRemixGenreB(e.target.value)}
               className="w-full bg-gray-900 border border-white/10 rounded p-1 text-[10px] text-white outline-none mb-1"
             >
               <option>Original</option>
               <option>EDM Drop</option>
               <option>Lo-Fi Chill</option>
               <option>Trap Beat</option>
             </select>
             <button 
               onClick={() => handleRemix('B')}
               disabled={isRemixingB || remixGenreB === 'Original'}
               className="w-full py-1 bg-neon-pink/20 hover:bg-neon-pink/30 text-neon-pink border border-neon-pink/50 rounded text-[10px] font-bold transition-colors flex items-center justify-center gap-1 disabled:opacity-50"
             >
               {isRemixingB ? <RefreshCw className="w-3 h-3 animate-spin" /> : 'Apply Remix'}
             </button>
           </div>

           <div className="flex gap-2">
             <Knob label="HIGH" color="magenta" />
             <Knob label="MID" color="magenta" />
             <Knob label="LOW" color="magenta" />
           </div>
           
           <div className="h-24 w-6 bg-gray-900 rounded-full relative mt-2 border border-white/5 flex justify-center">
             <div className="absolute bottom-0 w-3 bg-gradient-to-t from-neon-pink/20 to-neon-pink rounded-full opacity-80 pointer-events-none" style={{ height: `${volumeB * 100}%` }}></div>
             <input
               type="range"
               min="0"
               max="1"
               step="0.01"
               value={volumeB}
               onChange={handleVolumeB}
               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
               style={{ writingMode: 'vertical-lr' } as any}
             />
             <div 
                className="absolute w-10 h-4 bg-gray-300 rounded shadow-[0_4px_10px_rgba(0,0,0,0.5)] pointer-events-none border-y-2 border-gray-400 flex items-center justify-center"
                style={{ bottom: `calc(${volumeB * 100}% - 8px)` }}
             >
               <div className="w-6 h-0.5 bg-gray-500"></div>
             </div>
           </div>
        </div>
      </div>

      {/* Crossfader Section */}
      <div className="w-full px-8 bg-black/40 p-4 rounded-xl border border-white/5">
        <div className="flex justify-between text-[10px] text-gray-500 font-mono mb-2 px-2 font-bold tracking-widest">
          <span className="text-neon-blue">DECK A</span>
          <span>CROSSFADER</span>
          <span className="text-neon-pink">DECK B</span>
        </div>
        <div className="relative">
          <div className="absolute inset-0 top-1/2 -translate-y-1/2 h-2 bg-gray-900 rounded-full border border-white/5 pointer-events-none"></div>
          <input 
            type="range" 
            min="-1" 
            max="1" 
            step="0.01"
            value={crossfader}
            onChange={handleCrossfader}
            className="w-full h-8 bg-transparent appearance-none cursor-pointer relative z-10
                       [&::-webkit-slider-thumb]:w-12 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:bg-gray-200 
                       [&::-webkit-slider-thumb]:rounded [&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(255,255,255,0.4)]
                       [&::-webkit-slider-thumb]:border-x-4 [&::-webkit-slider-thumb]:border-gray-400
                       [&::-webkit-slider-thumb]:appearance-none"
          />
        </div>
      </div>
    </div>
  );
};

const Knob: React.FC<{ label: string; color: string }> = ({ label, color }) => {
    // Static knob for visual aesthetics
    return (
        <div className="flex flex-col items-center gap-1">
            <div className={`w-8 h-8 rounded-full bg-gray-800 border-2 ${color === 'cyan' ? 'border-cyan-900/50' : 'border-fuchsia-900/50'} relative shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] group cursor-pointer hover:border-white/30 transition-colors`}>
                <div className={`absolute top-1 left-1/2 -translate-x-1/2 w-0.5 h-2 ${color === 'cyan' ? 'bg-cyan-400 shadow-[0_0_5px_#00ffff]' : 'bg-fuchsia-400 shadow-[0_0_5px_#ff00ff]'} rounded-full`}></div>
            </div>
            <span className="text-[8px] text-gray-500 font-bold tracking-wider">{label}</span>
        </div>
    )
}

export default Mixer;