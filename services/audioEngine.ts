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

  constructor() {
    this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.masterGain = this.ctx.createGain();
    this.gainA = this.ctx.createGain();
    this.gainB = this.ctx.createGain();

    this.masterGain.connect(this.ctx.destination);
    this.gainA.connect(this.masterGain);
    this.gainB.connect(this.masterGain);

    // Initial volumes for crossfader center
    this.gainA.gain.value = 1;
    this.gainB.gain.value = 1;
  }

  async loadTrack(deck: 'A' | 'B', url: string): Promise<HTMLAudioElement> {
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    const audio = new Audio();
    audio.crossOrigin = "anonymous";
    audio.loop = true;
    audio.preload = "auto";
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
      this.sourceA.connect(this.gainA);
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
      this.sourceB.connect(this.gainB);
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
     // This would ideally be a separate gain node before the crossfader gain
     // For simplicity in this mock, we assume the crossfader handles the main balance
     // and this is just a trim. We won't implement pre-fader gain in this simple version
     // strictly, but conceptually it exists.
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