// A simplified audio engine for the prototype
// In a real app, this would be much more complex handling buffering, scheduling, etc.

class AudioEngine {
  private ctx: AudioContext;
  private deckANode: HTMLAudioElement | null = null;
  private deckBNode: HTMLAudioElement | null = null;
  private sourceA: MediaElementAudioSourceNode | null = null;
  private sourceB: MediaElementAudioSourceNode | null = null;
  private gainA: GainNode;
  private gainB: GainNode;
  private masterGain: GainNode;

  // Stem Gains (Mock implementation using filters for demonstration)
  private stemsA: { vocals: { filter: BiquadFilterNode, gain: GainNode }; drums: { filter: BiquadFilterNode, gain: GainNode }; bass: { filter: BiquadFilterNode, gain: GainNode }; melody: { filter: BiquadFilterNode, gain: GainNode } };
  private stemsB: { vocals: { filter: BiquadFilterNode, gain: GainNode }; drums: { filter: BiquadFilterNode, gain: GainNode }; bass: { filter: BiquadFilterNode, gain: GainNode }; melody: { filter: BiquadFilterNode, gain: GainNode } };

  // Volume Gains
  private volumeGainA: GainNode;
  private volumeGainB: GainNode;

  constructor() {
    this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.masterGain = this.ctx.createGain();
    this.gainA = this.ctx.createGain();
    this.gainB = this.ctx.createGain();
    this.volumeGainA = this.ctx.createGain();
    this.volumeGainB = this.ctx.createGain();

    this.masterGain.connect(this.ctx.destination);
    this.gainA.connect(this.masterGain);
    this.gainB.connect(this.masterGain);

    // Initialize mock stems (using EQ bands to simulate stems)
    this.stemsA = this.createMockStems(this.volumeGainA);
    this.stemsB = this.createMockStems(this.volumeGainB);

    this.volumeGainA.connect(this.gainA);
    this.volumeGainB.connect(this.gainB);

    // Initial volumes for crossfader center
    this.gainA.gain.value = 1;
    this.gainB.gain.value = 1;
    this.volumeGainA.gain.value = 1;
    this.volumeGainB.gain.value = 1;
  }

  private createMockStems(destination: AudioNode) {
    // This is a highly simplified mock. Real stem separation requires ML models (like Spleeter)
    // Here we use basic EQ to roughly isolate frequency bands as a placeholder.
    
    const vocalsFilter = this.ctx.createBiquadFilter();
    vocalsFilter.type = 'bandpass';
    vocalsFilter.frequency.value = 1000; // Mid range
    vocalsFilter.Q.value = 1;
    const vocalsGain = this.ctx.createGain();
    vocalsFilter.connect(vocalsGain);
    vocalsGain.connect(destination);

    const drumsFilter = this.ctx.createBiquadFilter();
    drumsFilter.type = 'highpass';
    drumsFilter.frequency.value = 5000; // Highs (snares, hats) + some lows (kick)
    const drumsGain = this.ctx.createGain();
    drumsFilter.connect(drumsGain);
    drumsGain.connect(destination);
    
    const bassFilter = this.ctx.createBiquadFilter();
    bassFilter.type = 'lowpass';
    bassFilter.frequency.value = 200; // Lows
    const bassGain = this.ctx.createGain();
    bassFilter.connect(bassGain);
    bassGain.connect(destination);

    const melodyFilter = this.ctx.createBiquadFilter();
    melodyFilter.type = 'bandpass';
    melodyFilter.frequency.value = 2500; // High-mids
    melodyFilter.Q.value = 0.5;
    const melodyGain = this.ctx.createGain();
    melodyFilter.connect(melodyGain);
    melodyGain.connect(destination);

    return { 
        vocals: { filter: vocalsFilter, gain: vocalsGain }, 
        drums: { filter: drumsFilter, gain: drumsGain }, 
        bass: { filter: bassFilter, gain: bassGain }, 
        melody: { filter: melodyFilter, gain: melodyGain } 
    };
  }

  async loadTrack(deck: 'A' | 'B', url: string): Promise<HTMLAudioElement> {
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    const audio = new Audio();
    audio.crossOrigin = "anonymous";
    audio.loop = true;
    audio.preload = "auto";
    audio.preservesPitch = true;
    audio.src = url;

    if (deck === 'A') {
      if (this.deckANode) {
        this.deckANode.pause();
        this.deckANode.src = ""; // Detach old source
      }
      if (this.sourceA) {
        this.sourceA.disconnect();
      }
      
      this.deckANode = audio;
      this.sourceA = this.ctx.createMediaElementSource(audio);
      
      // Connect source to all mock stems
      this.sourceA.connect(this.stemsA.vocals.filter);
      this.sourceA.connect(this.stemsA.drums.filter);
      this.sourceA.connect(this.stemsA.bass.filter);
      this.sourceA.connect(this.stemsA.melody.filter);

    } else {
      if (this.deckBNode) {
        this.deckBNode.pause();
        this.deckBNode.src = ""; // Detach old source
      }
      if (this.sourceB) {
        this.sourceB.disconnect();
      }

      this.deckBNode = audio;
      this.sourceB = this.ctx.createMediaElementSource(audio);
      
      // Connect source to all mock stems
      this.sourceB.connect(this.stemsB.vocals.filter);
      this.sourceB.connect(this.stemsB.drums.filter);
      this.sourceB.connect(this.stemsB.bass.filter);
      this.sourceB.connect(this.stemsB.melody.filter);
    }

    return audio;
  }

  play(deck: 'A' | 'B') {
    const audio = deck === 'A' ? this.deckANode : this.deckBNode;
    if (audio) {
        audio.play().catch(e => console.error("Playback failed:", e));
    }
  }

  pause(deck: 'A' | 'B') {
    const audio = deck === 'A' ? this.deckANode : this.deckBNode;
    if (audio) audio.pause();
  }

  setSpeed(deck: 'A' | 'B', speed: number) {
    const audio = deck === 'A' ? this.deckANode : this.deckBNode;
    if (audio) audio.playbackRate = speed;
  }

  // Crossfader value: -1 (Left) to 1 (Right)
  setCrossfader(value: number) {
    // Equal power crossfade
    const x = (value + 1) * 0.5; // 0 to 1
    this.gainA.gain.value = Math.cos(x * 0.5 * Math.PI);
    this.gainB.gain.value = Math.cos((1 - x) * 0.5 * Math.PI);
  }

  setVolume(deck: 'A' | 'B', value: number) {
    if (deck === 'A') {
      this.volumeGainA.gain.value = value;
    } else {
      this.volumeGainB.gain.value = value;
    }
  }

  setStemVolume(deck: 'A' | 'B', stem: 'vocals' | 'drums' | 'bass' | 'melody', volume: number) {
    const stems = deck === 'A' ? this.stemsA : this.stemsB;
    stems[stem].gain.gain.value = volume;
  }

  triggerPad(deck: 'A' | 'B', padIndex: number) {
    const audio = deck === 'A' ? this.deckANode : this.deckBNode;
    if (!audio) return;

    // Mock pad actions
    switch (padIndex) {
      case 0: // CUE 1
        audio.currentTime = 0;
        break;
      case 1: // CUE 2
        audio.currentTime = 15; // Jump 15s
        break;
      case 2: // CUE 3
        audio.currentTime = 30; // Jump 30s
        break;
      case 3: // CUE 4
        audio.currentTime = 45; // Jump 45s
        break;
      case 4: // LOOP 1/4
        // Implement short loop logic
        console.log(`Triggered Loop 1/4 on Deck ${deck}`);
        break;
      case 5: // LOOP 1/2
        console.log(`Triggered Loop 1/2 on Deck ${deck}`);
        break;
      case 6: // LOOP 1
        console.log(`Triggered Loop 1 on Deck ${deck}`);
        break;
      case 7: // LOOP 2
        console.log(`Triggered Loop 2 on Deck ${deck}`);
        break;
    }
  }

  getAnalyser(deck: 'A' | 'B'): AnalyserNode {
      const analyser = this.ctx.createAnalyser();
      analyser.fftSize = 256;
      const source = deck === 'A' ? this.sourceA : this.sourceB;
      if (source) {
          source.connect(analyser);
      }
      return analyser;
  }
}

export const audioEngine = new AudioEngine();