import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Disc, RotateCcw, FastForward, Activity } from 'lucide-react';
import { DeckState, DeckId, Track } from '../types';
import { audioEngine } from '../services/audioEngine';

interface DeckProps {
  id: DeckId;
  state: DeckState;
  onStateChange: (id: DeckId, newState: Partial<DeckState>) => void;
  onLoadRequest: () => void;
}

const Deck: React.FC<DeckProps> = ({ id, state, onStateChange, onLoadRequest }) => {
  const [rotation, setRotation] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  return (
    <div className={`relative flex flex-col h-full bg-neon-panel rounded-xl border border-white/10 overflow-hidden ${state.isPlaying ? 'shadow-[0_0_15px_rgba(0,0,0,0.5)]' : ''}`}>
      {/* Header */}
      <div className={`flex justify-between items-center p-4 border-b border-white/5 ${id === 'A' ? 'bg-gradient-to-r from-blue-900/20 to-transparent' : 'bg-gradient-to-l from-purple-900/20 to-transparent'}`}>
        <h2 className={`font-display font-bold text-2xl ${id === 'A' ? 'text-neon-blue' : 'text-neon-pink'}`}>DECK {id}</h2>
        {state.track && (
          <div className="text-right">
            <div className="text-xs text-gray-400">BPM</div>
            <div className="text-xl font-bold font-mono">{(state.track.bpm * state.speed).toFixed(1)}</div>
          </div>
        )}
      </div>

      {/* Main Display */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
        {!state.track ? (
          <button 
            onClick={onLoadRequest}
            className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-gray-700 rounded-lg hover:border-gray-500 hover:bg-white/5 transition-all group"
          >
            <Disc className="w-16 h-16 text-gray-600 mb-4 group-hover:scale-110 transition-transform" />
            <span className="text-gray-400 font-medium">Load Track</span>
          </button>
        ) : (
          <>
            {/* Spinning Vinyl UI */}
            <div className="relative mb-6">
              <div 
                className="w-48 h-48 rounded-full bg-black border-4 border-gray-800 shadow-2xl flex items-center justify-center overflow-hidden"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                <img 
                  src={state.track.coverUrl || "https://via.placeholder.com/150"} 
                  className="w-full h-full object-cover opacity-80" 
                  alt="cover" 
                />
                <div className="absolute w-12 h-12 bg-black rounded-full border-2 border-gray-600 z-10"></div>
              </div>
              {/* Tone Arm simulation could go here */}
            </div>

            {/* Track Info */}
            <div className="text-center w-full mb-4">
              <h3 className="font-bold text-lg truncate text-white">{state.track.title}</h3>
              <p className="text-sm text-gray-400 truncate">{state.track.artist}</p>
              <div className="flex justify-center gap-2 mt-2">
                 <span className="px-2 py-0.5 bg-white/10 rounded text-xs text-gray-300 border border-white/10">{state.track.key}</span>
                 <span className="px-2 py-0.5 bg-white/10 rounded text-xs text-gray-300 border border-white/10">{state.track.genre}</span>
              </div>
            </div>

            {/* Waveform Canvas */}
            <canvas ref={canvasRef} width={300} height={60} className="w-full h-16 bg-black/40 rounded border border-white/5 mb-4" />

            {/* Controls */}
            <div className="flex items-center gap-6">
               <button className="text-gray-400 hover:text-white transition-colors" title="Cue">
                 <RotateCcw className="w-6 h-6" />
               </button>
               
               <button 
                onClick={togglePlay}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 ${
                  state.isPlaying 
                    ? `bg-${id === 'A' ? 'cyan-500' : 'fuchsia-500'} shadow-[0_0_20px_currentColor]` 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
               >
                 {state.isPlaying ? <Pause className="w-8 h-8 text-black fill-current" /> : <Play className="w-8 h-8 text-white fill-current ml-1" />}
               </button>

               <button className={`text-gray-400 hover:text-white transition-colors ${state.loopActive ? 'text-neon-green' : ''}`} title="Loop">
                 <Activity className="w-6 h-6" />
               </button>
            </div>
          </>
        )}
      </div>

      {/* Tempo Slider */}
      <div className="px-6 pb-6 flex items-center gap-4">
         <span className="text-xs font-mono text-gray-500">-8%</span>
         <input 
          type="range" 
          min="0.92" 
          max="1.08" 
          step="0.001"
          value={state.speed}
          onChange={handleSpeedChange}
          className={`w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:bg-gray-300 [&::-webkit-slider-thumb]:rounded-sm`} 
         />
         <span className="text-xs font-mono text-gray-500">+8%</span>
      </div>
    </div>
  );
};

export default Deck;
