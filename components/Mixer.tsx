import React from 'react';
import { Sliders, Mic, Volume2 } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';

interface MixerProps {
  crossfader: number;
  onCrossfaderChange: (val: number) => void;
}

const Mixer: React.FC<MixerProps> = ({ crossfader, onCrossfaderChange }) => {
  
  const handleCrossfader = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    onCrossfaderChange(val);
    audioEngine.setCrossfader(val);
  };

  return (
    <div className="bg-neon-panel border-x border-white/10 w-full md:w-80 flex flex-col items-center py-4 px-2 z-10 shadow-2xl">
      <div className="flex-1 w-full flex justify-between px-4">
        {/* Channel A Strip */}
        <div className="flex flex-col items-center gap-4">
           <div className="text-neon-blue font-bold font-display">CH A</div>
           <Knob label="HIGH" color="cyan" />
           <Knob label="MID" color="cyan" />
           <Knob label="LOW" color="cyan" />
           <div className="h-32 w-2 bg-gray-800 rounded-full relative mt-4">
             <div className="absolute bottom-0 w-full bg-neon-blue h-[70%] rounded-full opacity-50"></div>
             {/* Volume Fader Handle Mock */}
             <div className="absolute bottom-[70%] left-1/2 -translate-x-1/2 w-8 h-4 bg-gray-300 rounded shadow-md cursor-pointer hover:bg-white"></div>
           </div>
        </div>

        {/* Master Section */}
        <div className="flex flex-col items-center justify-center gap-6">
           <div className="flex flex-col items-center gap-2">
             <span className="text-xs text-gray-500 font-mono">MASTER</span>
             <div className="flex gap-1 h-32 items-end">
               <div className="w-2 bg-gradient-to-t from-green-500 via-yellow-500 to-red-500 h-24 rounded-sm"></div>
               <div className="w-2 bg-gradient-to-t from-green-500 via-yellow-500 to-red-500 h-20 rounded-sm"></div>
             </div>
           </div>
           
           <button className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 active:bg-neon-purple active:text-white transition-colors text-gray-400 border border-white/10">
             <Mic className="w-5 h-5" />
           </button>
        </div>

        {/* Channel B Strip */}
        <div className="flex flex-col items-center gap-4">
           <div className="text-neon-pink font-bold font-display">CH B</div>
           <Knob label="HIGH" color="magenta" />
           <Knob label="MID" color="magenta" />
           <Knob label="LOW" color="magenta" />
           <div className="h-32 w-2 bg-gray-800 rounded-full relative mt-4">
             <div className="absolute bottom-0 w-full bg-neon-pink h-[70%] rounded-full opacity-50"></div>
             {/* Volume Fader Handle Mock */}
             <div className="absolute bottom-[70%] left-1/2 -translate-x-1/2 w-8 h-4 bg-gray-300 rounded shadow-md cursor-pointer hover:bg-white"></div>
           </div>
        </div>
      </div>

      {/* Crossfader Section */}
      <div className="w-full mt-8 px-4">
        <div className="flex justify-between text-xs text-gray-500 font-mono mb-2 px-2">
          <span>A</span>
          <span>CROSSFADER</span>
          <span>B</span>
        </div>
        <input 
          type="range" 
          min="-1" 
          max="1" 
          step="0.01"
          value={crossfader}
          onChange={handleCrossfader}
          className="w-full h-8 bg-gray-800 rounded-lg appearance-none cursor-pointer border-2 border-gray-700 
                     [&::-webkit-slider-thumb]:w-10 [&::-webkit-slider-thumb]:h-10 [&::-webkit-slider-thumb]:bg-gray-200 
                     [&::-webkit-slider-thumb]:rounded [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(255,255,255,0.3)]
                     [&::-webkit-slider-thumb]:border-y-4 [&::-webkit-slider-thumb]:border-gray-400"
        />
      </div>
    </div>
  );
};

const Knob: React.FC<{ label: string; color: string }> = ({ label, color }) => {
    // Static knob for visual aesthetics
    return (
        <div className="flex flex-col items-center gap-1">
            <div className={`w-10 h-10 rounded-full bg-gray-800 border-2 ${color === 'cyan' ? 'border-cyan-900' : 'border-fuchsia-900'} relative shadow-inner group cursor-pointer hover:border-white/30`}>
                <div className={`absolute top-1 left-1/2 -translate-x-1/2 w-1 h-3 ${color === 'cyan' ? 'bg-cyan-400' : 'bg-fuchsia-400'} rounded-full`}></div>
            </div>
            <span className="text-[10px] text-gray-500 font-bold">{label}</span>
        </div>
    )
}

export default Mixer;