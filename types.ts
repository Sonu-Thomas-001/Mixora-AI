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

export interface StemLevels {
  vocals: number;
  drums: number;
  bass: number;
  melody: number;
}

export interface DeckState {
  track: Track | null;
  isPlaying: boolean;
  volume: number;
  speed: number;
  currentTime: number;
  loopActive: boolean;
  fxActive: boolean;
  stems: StemLevels;
  remixGenre?: string;
  activePads: number[];
}

export type DeckId = 'A' | 'B';

export interface AIAnalysis {
  transitionSuitability: number; // 0-100
  suggestedTransition: string;
  keyCompatibility: 'Harmonic' | 'Compatible' | 'Clash';
  energyChange: 'Build Up' | 'Drop' | 'Consistent' | 'Chill';
}

export interface CrowdState {
  energy: number; // 0-100
  engagement: number; // 0-100
  mood: 'Hyped' | 'Vibing' | 'Chill' | 'Bored';
}

export enum ViewMode {
  MIXER = 'MIXER',
  LIBRARY = 'LIBRARY',
}