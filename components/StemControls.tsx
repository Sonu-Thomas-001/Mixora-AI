import React from 'react';
import { StemLevels } from '../types';
import { Mic2, Drum, Guitar, Music } from 'lucide-react';

interface StemControlsProps {
  stems: StemLevels;
  onChange: (stems: StemLevels) => void;
  color: string;
}

const StemControls: React.FC<StemControlsProps> = ({ stems, onChange, color }) => {
  const handleStemChange = (stem: keyof StemLevels, value: number) => {
    onChange({ ...stems, [stem]: value });
  };

  const toggleMute = (stem: keyof StemLevels) => {
    onChange({ ...stems, [stem]: stems[stem] === 0 ? 1 : 0 });
  };

  const stemConfig = [
    { key: 'vocals', label: 'VOCALS', icon: Mic2 },
    { key: 'drums', label: 'DRUMS', icon: Drum },
    { key: 'bass', label: 'BASS', icon: Guitar },
    { key: 'melody', label: 'MELODY', icon: Music },
  ] as const;

  const getActiveClasses = (isActive: boolean) => {
    if (!isActive) return 'bg-gray-800 text-gray-500 border border-gray-700';
    if (color === 'cyan') return 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]';
    if (color === 'fuchsia') return 'bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/50 shadow-[0_0_10px_rgba(217,70,239,0.3)]';
    return '';
  };

  const getBarClasses = (isActive: boolean) => {
    if (!isActive) return 'bg-gray-700';
    if (color === 'cyan') return 'bg-cyan-500';
    if (color === 'fuchsia') return 'bg-fuchsia-500';
    return '';
  };

  return (
    <div className="flex justify-between gap-2 p-2 bg-black/40 rounded-xl border border-white/5 h-full min-h-[120px]">
      {stemConfig.map(({ key, label, icon: Icon }) => {
        const isActive = stems[key] > 0;
        return (
          <div key={key} className="flex flex-col items-center gap-2 flex-1">
            <button
              onClick={() => toggleMute(key)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${getActiveClasses(isActive)}`}
            >
              <Icon className="w-4 h-4" />
            </button>
            <div className="flex-1 min-h-[40px] max-h-24 w-6 bg-gray-900 rounded-full relative flex items-end p-1 border border-white/5">
              <div 
                className={`w-full rounded-full transition-all duration-100 ${getBarClasses(isActive)}`}
                style={{ height: `${stems[key] * 100}%` }}
              />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={stems[key]}
                onChange={(e) => handleStemChange(key, parseFloat(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                style={{ writingMode: 'vertical-lr' } as any}
              />
            </div>
            <span className="text-[9px] font-bold tracking-wider text-gray-400">{label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default StemControls;