import React, { useState } from 'react';
import Deck from './Deck';
import Mixer from './Mixer';
import Library from './Library';
import AISidebar from './AISidebar';
import { DeckState, DeckId, Track } from '../types';
import { Menu, Disc, ArrowLeft } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';

// Initial empty deck state
const createInitialDeckState = (): DeckState => ({
  track: null,
  isPlaying: false,
  volume: 1,
  speed: 1,
  currentTime: 0,
  loopActive: false,
  fxActive: false
});

interface MixerLayoutProps {
  onBack: () => void;
}

const MixerLayout: React.FC<MixerLayoutProps> = ({ onBack }) => {
  const [deckA, setDeckA] = useState<DeckState>(createInitialDeckState());
  const [deckB, setDeckB] = useState<DeckState>(createInitialDeckState());
  const [crossfader, setCrossfader] = useState(0);
  const [showLibraryMobile, setShowLibraryMobile] = useState(false);

  const handleDeckStateChange = (id: DeckId, newState: Partial<DeckState>) => {
    if (id === 'A') {
      setDeckA(prev => ({ ...prev, ...newState }));
    } else {
      setDeckB(prev => ({ ...prev, ...newState }));
    }
  };

  const handleLoadTrack = async (track: Track, deckId: DeckId) => {
    try {
        // Load audio into engine
        await audioEngine.loadTrack(deckId, track.url);
        
        handleDeckStateChange(deckId, {
            track: track,
            isPlaying: false,
            speed: 1,
            currentTime: 0
        });
        
        setShowLibraryMobile(false);
    } catch (e) {
        console.error("Failed to load audio", e);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-neon-dark text-gray-200 font-sans selection:bg-neon-purple selection:text-white">
      {/* Top Bar */}
      <header className="h-16 border-b border-white/5 bg-neon-dark/95 backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center gap-3">
           <button onClick={onBack} className="md:hidden text-gray-400 hover:text-white">
             <ArrowLeft className="w-6 h-6" />
           </button>
           <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-neon-purple blur-md opacity-50 rounded-full"></div>
              <Disc className="w-8 h-8 text-white relative z-10" />
           </div>
           <h1 className="text-2xl font-display font-bold tracking-tight text-white cursor-pointer" onClick={onBack}>
             MIXORA <span className="text-neon-purple">AI</span>
           </h1>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <button 
             onClick={onBack}
             className="mr-4 text-xs font-bold text-gray-500 hover:text-white transition-colors"
          >
            EXIT STUDIO
          </button>
          <div className="px-3 py-1 bg-white/5 rounded-full border border-white/5 text-xs font-medium text-neon-blue flex items-center gap-2">
            <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse"></div>
            SYSTEM ONLINE
          </div>
        </div>

        <button 
            className="md:hidden text-white"
            onClick={() => setShowLibraryMobile(!showLibraryMobile)}
        >
            <Menu />
        </button>
      </header>

      {/* Main Content Grid */}
      <div className="flex-1 overflow-hidden relative flex">
        
        {/* Left: Library (Collapsible on mobile) */}
        <aside className={`${showLibraryMobile ? 'absolute inset-0 z-30' : 'hidden'} md:relative md:block md:w-80 lg:w-96 shrink-0 h-full transition-all`}>
           <Library onLoadTrack={handleLoadTrack} />
        </aside>

        {/* Center: Decks & Mixer */}
        <main className="flex-1 flex flex-col min-w-0 bg-neutral-900/20">
           
           {/* Decks Area */}
           <div className="flex-1 p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 overflow-y-auto lg:overflow-visible">
              <Deck 
                id="A" 
                state={deckA} 
                onStateChange={handleDeckStateChange} 
                onLoadRequest={() => setShowLibraryMobile(true)}
              />
              <Deck 
                id="B" 
                state={deckB} 
                onStateChange={handleDeckStateChange}
                onLoadRequest={() => setShowLibraryMobile(true)}
               />
           </div>

           {/* Mixer Area (Bottom) */}
           <div className="shrink-0 flex justify-center pb-4 px-4">
              <Mixer crossfader={crossfader} onCrossfaderChange={setCrossfader} />
           </div>
        </main>

        {/* Right: AI Panel */}
        <aside className="hidden xl:block w-80 shrink-0 h-full">
            <AISidebar deckA={deckA.track} deckB={deckB.track} />
        </aside>
      </div>
    </div>
  );
};

export default MixerLayout;