import React from 'react';

interface PerformancePadsProps {
  activePads: number[];
  onPadPress: (padIndex: number) => void;
  color: string;
}

const PerformancePads: React.FC<PerformancePadsProps> = ({ activePads, onPadPress, color }) => {
  const padLabels = ['CUE 1', 'CUE 2', 'CUE 3', 'CUE 4', 'LOOP 1/4', 'LOOP 1/2', 'LOOP 1', 'LOOP 2'];

  const getActiveClasses = (isActive: boolean) => {
    if (!isActive) return 'bg-gray-800 text-gray-400 border-gray-900 hover:bg-gray-700';
    if (color === 'cyan') return 'bg-cyan-500 text-black border-cyan-700 shadow-[0_0_15px_rgba(6,182,212,0.6)]';
    if (color === 'fuchsia') return 'bg-fuchsia-500 text-black border-fuchsia-700 shadow-[0_0_15px_rgba(217,70,239,0.6)]';
    return '';
  };

  return (
    <div className="grid grid-cols-4 gap-2 p-2 bg-black/40 rounded-xl border border-white/5 h-full min-h-[120px]">
      {padLabels.map((label, index) => {
        const isActive = activePads.includes(index);
        return (
          <button
            key={index}
            onMouseDown={() => onPadPress(index)}
            className={`
              relative h-full min-h-[40px] rounded-lg font-mono text-[9px] font-bold tracking-wider
              transition-all duration-75 border-b-4 active:border-b-0 active:translate-y-1
              flex flex-col items-center justify-center gap-1
              ${getActiveClasses(isActive)}
            `}
          >
            {label}
            {isActive && (
              <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default PerformancePads;