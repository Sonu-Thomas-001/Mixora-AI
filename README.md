# 🎧 Mixora AI

**Your AI DJ. Perfectly Mixed.**

Mixora AI is an intelligent DJ platform that automatically mixes music tracks with human-level transitions, beat-matching, and energy control. It turns a static playlist into a dynamic, seamless DJ set in real-time.

![Mixora AI Banner](https://via.placeholder.com/1200x400/0B0F14/8B5CF6?text=MIXORA+AI)

## 🚀 Features

- **🎶 Intelligent Mixing Engine**: Auto-detects BPM, key, and energy to align tracks perfectly.
- **⚡ Real-time Transitions**: Performs beat-matched crossfades, drops, and build-ups automatically.
- **🎛 Contextual DJ Effects**: Smart filters, echos, and sweeps applied based on musical phrasing.
- **🧠 AI DJ Personalities**: Choose from "Club", "Radio", or "Chill" personas that drive the mixing style.
- **📤 Studio Quality**: Professional audio processing with loudness normalization.
- **🔴 Live Mode**: Real-time waveform visualization and manual override controls.

---

## 🧠 How It Works

Mixora AI uses a multi-agent architecture to simulate a professional DJ's decision-making process:

1.  **Analysis Agent**: Scans audio using DSP (Digital Signal Processing) to map beats, bars, and key signatures.
2.  **Beat Sync Agent**: Aligns the tempo and phase of two tracks to ensure no "clashing" beats.
3.  **Transition Agent**: Determines the optimal point to mix out (e.g., end of a chorus) and mix in (e.g., start of a drop).
4.  **Flow Director**: Manages the overall energy curve of the set, ensuring a journey rather than a random shuffle.

---

## 🧩 Tech Stack

**Frontend**
- **Framework**: React / Next.js
- **Styling**: Tailwind CSS (Neon/Dark Theme)
- **Audio**: Web Audio API
- **Visualization**: HTML5 Canvas / Framer Motion

**Backend & AI**
- **Language**: Python (FastAPI) / Node.js
- **Libraries**: Librosa (Analysis), Essentia (Feature Extraction)
- **LLM**: Google Gemini 1.5 Flash (Contextual decision making & persona generation)

---

## 📦 Project Structure

```
src/
├── components/
│   ├── LandingPage.tsx   # Marketing entry point
│   ├── MixerLayout.tsx   # Main DJ Application UI
│   ├── Deck.tsx          # Individual track player & visualizer
│   ├── Mixer.tsx         # Central EQ & Crossfader
│   ├── AISidebar.tsx     # AI suggestions & persona interface
│   └── Library.tsx       # Track management
├── services/
│   ├── audioEngine.ts    # Web Audio API wrapper
│   └── geminiService.ts  # Interface to Google Gemini API
└── types.ts              # TypeScript definitions
```

---

## 🛣 Roadmap

- [ ] **Spotify / Apple Music Integration**: Connect streaming libraries directly.
- [ ] **Live Remix Mode**: Real-time looping and beat slicing.
- [ ] **AI Crowd Prediction**: Adjust energy based on listener retention metrics.
- [ ] **Mobile App**: Native iOS/Android version.
- [ ] **Multi-User Rooms**: Collaborate on sets in real-time.

---

## 📜 License

MIT License. Copyright © 2024 Mixora AI.