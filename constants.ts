import { Track } from './types';

// Using GitHub Raw content for reliable CORS-enabled MP3 hosting
const BASE_URL = 'https://raw.githubusercontent.com/captbaritone/webamp-music-spite/master/mp3';

export const INITIAL_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Llama Whippin\' Intro',
    artist: 'DJ Camel',
    bpm: 95,
    key: 'Cm',
    genre: 'Intro',
    energy: 4,
    url: `${BASE_URL}/01.mp3`,
    duration: 5,
    coverUrl: 'https://picsum.photos/200/200?random=1'
  },
  {
    id: '2',
    title: 'Neon Nights',
    artist: 'Cyberwave',
    bpm: 128,
    key: 'Am',
    genre: 'Synthwave',
    energy: 8,
    url: `${BASE_URL}/02.mp3`,
    duration: 245,
    coverUrl: 'https://picsum.photos/200/200?random=2'
  },
  {
    id: '3',
    title: 'Deep Focus',
    artist: 'Mindset',
    bpm: 124,
    key: 'Gm',
    genre: 'Deep House',
    energy: 6,
    url: `${BASE_URL}/03.mp3`,
    duration: 310,
    coverUrl: 'https://picsum.photos/200/200?random=3'
  },
  {
    id: '4',
    title: 'Festival Banger',
    artist: 'Mainstage',
    bpm: 130,
    key: 'Fm',
    genre: 'Big Room',
    energy: 10,
    url: `${BASE_URL}/04.mp3`,
    duration: 195,
    coverUrl: 'https://picsum.photos/200/200?random=4'
  }
];

export const GENRES = ['House', 'Techno', 'Trance', 'Hip-Hop', 'DnB', 'Lo-Fi', 'Dubstep'];