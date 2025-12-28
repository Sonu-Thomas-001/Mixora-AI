import { GoogleGenAI } from "@google/genai";
import { Track, AIAnalysis } from '../types';

let ai: GoogleGenAI | null = null;

try {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
} catch (e) {
    console.error("Failed to initialize Gemini Client", e);
}

export const getTrackAnalysis = async (trackName: string, artist: string): Promise<Partial<Track>> => {
  if (!ai) return {};

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the song "${trackName}" by "${artist}". Return a JSON object with estimated bpm (number), key (string), genre (string), and energy (number 1-10). Only return JSON.`,
      config: {
        responseMimeType: "application/json",
      }
    });
    
    const text = response.text;
    if (text) {
        return JSON.parse(text);
    }
  } catch (error) {
    console.error("Gemini analysis failed:", error);
  }
  return { bpm: 120, key: 'Am', energy: 5, genre: 'Unknown' };
};

export const getTransitionAdvice = async (current: Track, next: Track): Promise<AIAnalysis> => {
  if (!ai) {
    return {
      transitionSuitability: 85,
      suggestedTransition: "Use a long dissolve.",
      keyCompatibility: 'Compatible',
      energyChange: 'Consistent'
    };
  }

  try {
    const prompt = `
      Act as Mixora AI, a professional DJ mentor. I am mixing from "${current.title}" (${current.bpm} BPM, ${current.key}, ${current.genre}) 
      into "${next.title}" (${next.bpm} BPM, ${next.key}, ${next.genre}).
      
      Analyze compatibility.
      Return JSON with:
      - transitionSuitability (0-100 number)
      - suggestedTransition (short string advice, max 10 words)
      - keyCompatibility ('Harmonic' | 'Compatible' | 'Clash')
      - energyChange ('Build Up' | 'Drop' | 'Consistent' | 'Chill')
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (text) {
        return JSON.parse(text);
    }
  } catch (error) {
    console.error("Gemini advice failed:", error);
  }

  return {
    transitionSuitability: 50,
    suggestedTransition: "Hard cut recommended due to tempo mismatch.",
    keyCompatibility: 'Clash',
    energyChange: 'Consistent'
  };
};

export const generateDJPersonaMessage = async (currentTrack: Track | null, style: 'Hype' | 'Chill' | 'Technical'): Promise<string> => {
    if (!ai || !currentTrack) return "Keep the vibe going!";

    const prompts = {
        Hype: `Act as Mixora AI (Host). Generate a short, 1-sentence hype intro for a DJ playing "${currentTrack.title}". Be energetic!`,
        Chill: `Act as Mixora AI (Host). Generate a relaxed, 1-sentence thought about the vibe of "${currentTrack.title}".`,
        Technical: `Act as Mixora AI (Host). Give a 1-sentence technical observation about mixing "${currentTrack.title}" (e.g., bassline, percussion).`
    };

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompts[style],
        });
        return response.text || "Mixora AI is listening...";
    } catch (e) {
        return "Mixora AI ready.";
    }
};