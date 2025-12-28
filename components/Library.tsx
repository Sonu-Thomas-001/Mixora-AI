import React, { useState } from 'react';
import { Music, Upload, Search, Clock, Zap } from 'lucide-react';
import { Track } from '../types';
import { INITIAL_TRACKS } from '../constants';
import { getTrackAnalysis } from '../services/geminiService';

interface LibraryProps {
  onLoadTrack: (track: Track, deckId: 'A' | 'B') => void;
}

const Library: React.FC<LibraryProps> = ({ onLoadTrack }) => {
  const [tracks, setTracks] = useState<Track[]>(INITIAL_TRACKS);
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      
      // Simulate/AI analyze metadata
      const cleanName = file.name.replace(/\.[^/.]+$/, "");
      const analysis = await getTrackAnalysis(cleanName, "Unknown Artist");
      
      const newTrack: Track = {
        id: Date.now().toString(),
        title: cleanName,
        artist: 'Unknown Artist',
        url: url,
        bpm: analysis.bpm || 128,
        key: analysis.key || 'Cm',
        genre: analysis.genre || 'House',
        energy: analysis.energy || 5,
        duration: 180, // Mock duration
        coverUrl: `https://picsum.photos/200/200?random=${Date.now()}`
      };

      setTracks(prev => [newTrack, ...prev]);
      setIsUploading(false);
    }
  };

  const filteredTracks = tracks.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-neon-panel border-r border-white/10">
      <div className="p-4 border-b border-white/10 bg-black/20">
        <h2 className="text-white font-display font-bold text-lg mb-4 flex items-center gap-2">
          <Music className="w-5 h-5 text-neon-green" /> LIBRARY
        </h2>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search tracks..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-neon-blue transition-colors"
          />
        </div>

        <label className="flex items-center justify-center gap-2 w-full py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded cursor-pointer transition-colors border border-dashed border-gray-600">
           <Upload className="w-4 h-4" />
           <span className="text-sm font-medium">{isUploading ? 'Analyzing...' : 'Upload Track'}</span>
           <input type="file" accept="audio/*" onChange={handleFileUpload} className="hidden" disabled={isUploading} />
        </label>
      </div>

      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs text-gray-500 border-b border-white/5">
              <th className="p-3 font-medium">TITLE</th>
              <th className="p-3 font-medium w-16">BPM</th>
              <th className="p-3 font-medium w-16">KEY</th>
              <th className="p-3 font-medium w-12"><Zap className="w-3 h-3" /></th>
              <th className="p-3 font-medium text-right">LOAD</th>
            </tr>
          </thead>
          <tbody>
            {filteredTracks.map((track) => (
              <tr key={track.id} className="hover:bg-white/5 transition-colors group border-b border-white/5 last:border-0">
                <td className="p-3">
                  <div className="font-medium text-gray-200 text-sm">{track.title}</div>
                  <div className="text-xs text-gray-500">{track.artist}</div>
                </td>
                <td className="p-3 text-sm text-neon-blue font-mono">{track.bpm}</td>
                <td className="p-3 text-sm text-neon-pink font-mono">{track.key}</td>
                <td className="p-3 text-xs">
                   <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                     <div className="h-full bg-neon-green" style={{ width: `${track.energy * 10}%` }}></div>
                   </div>
                </td>
                <td className="p-3 text-right">
                  <div className="flex gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => onLoadTrack(track, 'A')}
                      className="px-2 py-1 bg-gray-800 text-neon-blue text-xs font-bold rounded hover:bg-neon-blue hover:text-black transition-colors"
                    >
                      A
                    </button>
                    <button 
                      onClick={() => onLoadTrack(track, 'B')}
                      className="px-2 py-1 bg-gray-800 text-neon-pink text-xs font-bold rounded hover:bg-neon-pink hover:text-black transition-colors"
                    >
                      B
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Library;