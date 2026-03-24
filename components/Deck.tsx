// ... existing imports
import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Disc, RotateCcw, FastForward, Activity } from 'lucide-react';
import { DeckState, DeckId, Track } from '../types';
import { audioEngine } from '../services/audioEngine';
import StemControls from './StemControls';
import PerformancePads from './PerformancePads';

interface DeckProps {
  id: DeckId;
  state: DeckState;
  onStateChange: (id: DeckId, newState: Partial<DeckState>) => void;
  onLoadRequest: () => void;
}

const Deck: React.FC<DeckProps> = ({ id, state, onStateChange, onLoadRequest }) => {
  const [rotation, setRotation] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const color = id === 'A' ? 'cyan' : 'fuchsia';

  useEffect(() => {
    let animationFrame: number;
    
    if (state.isPlaying && state.track) {
      const animate = () => {
        setRotation(prev => (prev + state.speed * 2) % 360);
        animationFrame = requestAnimationFrame(animate);
      };
      animate();
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [state.isPlaying, state.speed, state.track]);

  // Simulated Waveform visualizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = id === 'A' ? '#00ffff' : '#ff00ff';
      const bars = 50;
      const gap = 2;
      const barWidth = (canvas.width - (bars * gap)) / bars;

      for (let i = 0; i < bars; i++) {
        // Pseudo-random height based on playback
        const baseHeight = Math.random() * canvas.height * 0.4;
        const activeHeight = state.isPlaying ? baseHeight + (Math.sin(Date.now() / 200 + i) * 10) : baseHeight * 0.2;
        
        ctx.fillRect(
          i * (barWidth + gap), 
          (canvas.height - activeHeight) / 2, 
          barWidth, 
          activeHeight
        );
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, [state.isPlaying, id]);

  const togglePlay = () => {
    if (!state.track) return;
    if (state.isPlaying) {
      audioEngine.pause(id);
    } else {
      audioEngine.play(id);
    }
    onStateChange(id, { isPlaying: !state.isPlaying });
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSpeed = parseFloat(e.target.value);
    audioEngine.setSpeed(id, newSpeed);
    onStateChange(id, { speed: newSpeed });
  };

  const handlePadPress = (padIndex: number) => {
    audioEngine.triggerPad(id, padIndex);
    const newActivePads = state.activePads.includes(padIndex)
      ? state.activePads.filter(p => p !== padIndex)
      : [...state.activePads, padIndex];
    onStateChange(id, { activePads: newActivePads });
  };

  const handleStemChange = (newStems: typeof state.stems) => {
    onStateChange(id, { stems: newStems });
    // In a real app, we'd trigger audioEngine.setStemVolume for each changed stem here
    // For now, we'll just log it or call it for the first one as an example
    audioEngine.setStemVolume(id, 'vocals', newStems.vocals);
    audioEngine.setStemVolume(id, 'drums', newStems.drums);
    audioEngine.setStemVolume(id, 'bass', newStems.bass);
    audioEngine.setStemVolume(id, 'melody', newStems.melody);
  };

  return (
    <div className="relative flex flex-col h-full bg-neon-panel rounded-xl border border-white/10 overflow-hidden">
      {/* Header */}
      <div className={`flex justify-between items-center p-3 border-b border-white/5 shrink-0 ${id === 'A' ? 'bg-gradient-to-r from-blue-900/20 to-transparent' : 'bg-gradient-to-l from-purple-900/20 to-transparent'}`}>
        <h2 className={`font-display font-bold text-xl ${id === 'A' ? 'text-neon-blue' : 'text-neon-pink'}`}>DECK {id}</h2>
        {state.track && (
          <div className="text-right">
            <div className="text-[10px] text-gray-400">BPM</div>
            <div className="text-lg font-bold font-mono leading-none">{(state.track.bpm * state.speed).toFixed(1)}</div>
          </div>
        )}
      </div>

      {/* Main Display */}
      <div className="flex-1 flex flex-col items-center justify-start p-2 relative overflow-y-auto min-h-0">
        {!state.track ? (
          <button 
            onClick={onLoadRequest}
            className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-gray-700 rounded-lg hover:border-gray-500 hover:bg-white/5 transition-all group min-h-[200px]"
          >
            <Disc className="w-12 h-12 text-gray-600 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm text-gray-400 font-medium">Load Track</span>
          </button>
        ) : (
          <>
            {/* Spinning Vinyl UI */}
            <div className="relative mb-2 shrink-0">
              <div 
                className={`w-24 h-24 rounded-full bg-black border-4 border-gray-800 shadow-2xl flex items-center justify-center overflow-hidden ${state.isPlaying ? 'shadow-[0_0_15px_rgba(0,0,0,0.5)]' : ''}`}
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                <img 
                  src={state.track.coverUrl || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=200&auto=format&fit=crop"} 
                  className="w-full h-full object-cover opacity-80" 
                  alt="cover" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute w-6 h-6 bg-black rounded-full border-2 border-gray-600 z-10"></div>
              </div>
            </div>

            {/* Track Info */}
            <div className="text-center w-full mb-2 shrink-0">
              <h3 className="font-bold text-sm truncate text-white">{state.track.title}</h3>
              <p className="text-[10px] text-gray-400 truncate">{state.track.artist}</p>
              <div className="flex justify-center gap-1 mt-1">
                 <span className="px-1.5 py-0.5 bg-white/10 rounded text-[9px] text-gray-300 border border-white/10">{state.track.key}</span>
                 <span className="px-1.5 py-0.5 bg-white/10 rounded text-[9px] text-gray-300 border border-white/10">{state.track.genre}</span>
              </div>
            </div>

            {/* Waveform Canvas */}
            <canvas ref={canvasRef} width={300} height={24} className="w-full h-6 bg-black/40 rounded border border-white/5 mb-2 shrink-0" />

            {/* Controls */}
            <div className="flex items-center gap-4 mb-2 shrink-0">
               <button className="text-gray-400 hover:text-white transition-colors" title="Cue">
                 <RotateCcw className="w-4 h-4" />
               </button>
               
               <button 
                onClick={togglePlay}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 ${
                  state.isPlaying 
                    ? `bg-${color}-500 shadow-[0_0_15px_currentColor]` 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
               >
                 {state.isPlaying ? <Pause className="w-4 h-4 text-black fill-current" /> : <Play className="w-4 h-4 text-white fill-current ml-1" />}
               </button>

               <button className={`text-gray-400 hover:text-white transition-colors ${state.loopActive ? 'text-neon-green' : ''}`} title="Loop">
                 <Activity className="w-4 h-4" />
               </button>
            </div>

            {/* Advanced Controls */}
            <div className="w-full grid grid-cols-2 gap-2 shrink-0 pb-1 flex-1 min-h-0">
              <div className="min-h-0">
                <StemControls 
                  stems={state.stems} 
                  onChange={handleStemChange} 
                  color={color} 
                />
              </div>
              <div className="min-h-0">
                <PerformancePads 
                  activePads={state.activePads} 
                  onPadPress={handlePadPress} 
                  color={color} 
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Tempo Slider */}
      <div className="px-3 pb-3 flex items-center gap-2 mt-auto shrink-0 bg-neon-panel pt-2 border-t border-white/5">
         <span className="text-[10px] font-mono text-gray-500">-8%</span>
         <input 
          type="range" 
          min="0.92" 
          max="1.08" 
          step="0.001"
          value={state.speed}
          onChange={handleSpeedChange}
          className={`w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-gray-300 [&::-webkit-slider-thumb]:rounded-sm`} 
         />
         <span className="text-[10px] font-mono text-gray-500">+8%</span>
      </div>
    </div>
  );
};

export default Deck;
