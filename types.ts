export interface Track {
  id: string;
  title: string;
  artist: string;
  bpm: number;
  key: string;
  genre: string;
  energy: number; // 1-10
  url: string; // Blob URL or placeholder
  coverUrl?: string;
  duration: number;
}

export interface DeckState {
  track: Track | null;
  isPlaying: boolean;
  volume: number;
  speed: number;
  currentTime: number;
  loopActive: boolean;
  fxActive: boolean;
}

export type DeckId = 'A' | 'B';

export interface AIAnalysis {
  transitionSuitability: number; // 0-100
  suggestedTransition: string;
  keyCompatibility: 'Harmonic' | 'Compatible' | 'Clash';
  energyChange: 'Build Up' | 'Drop' | 'Consistent' | 'Chill';
}

export enum ViewMode {
  MIXER = 'MIXER',
  LIBRARY = 'LIBRARY',
}