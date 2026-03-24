import React from 'react';
import { motion } from 'framer-motion';
import { Play, Activity, Mic2, Disc, Zap, Music, ArrowRight, CheckCircle, BrainCircuit, Headphones, Sliders, Layers, UploadCloud, Cpu, Sparkles, Download } from 'lucide-react';

interface LandingPageProps {
  onStartMixing: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartMixing }) => {
  return (
    <div className="bg-[#0B0F14] min-h-screen text-gray-200 selection:bg-neon-purple selection:text-white overflow-x-hidden font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#0B0F14]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-neon-purple blur-md opacity-50 rounded-full"></div>
                <Disc className="w-8 h-8 text-white relative z-10 animate-spin-slow" />
             </div>
             <h1 className="text-2xl font-display font-bold tracking-tight text-white">
               MIXORA <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan">AI</span>
             </h1>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <button 
            onClick={onStartMixing}
            className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2"
          >
            Start Mixing <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-purple/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-neon-cyan mb-6">
              <Sparkles className="w-3 h-3" /> Introducing Mixora AI 2.0
            </div>
            <h1 className="text-5xl lg:text-7xl font-display font-bold leading-tight mb-6 text-white">
              Your AI DJ. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue">
                Perfectly Mixed.
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed">
              Turn tracks into seamless DJ sets with real-time AI mixing, beat matching, and intelligent transitions.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button onClick={onStartMixing} className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-neon-purple to-neon-pink text-white rounded-full font-bold text-lg hover:scale-105 transition-all shadow-[0_0_30px_rgba(236,72,153,0.3)] flex items-center justify-center gap-2">
                <Play className="w-5 h-5 fill-current" /> Start Mixing Free
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                Watch Demo
              </button>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-neon-blue/20 to-neon-purple/20 blur-2xl rounded-3xl"></div>
            <div className="relative bg-[#15191E]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
              <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs font-mono text-neon-cyan animate-pulse">LIVE MIXING</div>
              </div>
              <div className="space-y-6">
                {/* Deck A */}
                <div className="bg-black/50 rounded-xl p-4 border border-white/5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border-2 border-neon-purple flex items-center justify-center animate-spin-slow">
                    <Disc className="w-6 h-6 text-neon-purple" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-bold text-white">Midnight City</span>
                      <span className="text-neon-purple font-mono">120 BPM</span>
                    </div>
                    <div className="h-8 w-full flex items-center gap-1">
                      {[...Array(20)].map((_, i) => (
                        <div key={i} className="flex-1 bg-neon-purple/40 rounded-full" style={{ height: `${Math.random() * 100}%` }}></div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Crossfader */}
                <div className="px-4">
                  <div className="h-2 bg-gray-800 rounded-full relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-6 bg-white rounded shadow-lg"></div>
                  </div>
                </div>
                {/* Deck B */}
                <div className="bg-black/50 rounded-xl p-4 border border-white/5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border-2 border-neon-blue flex items-center justify-center animate-spin-slow" style={{ animationDirection: 'reverse' }}>
                    <Disc className="w-6 h-6 text-neon-blue" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-bold text-white">Blinding Lights</span>
                      <span className="text-neon-blue font-mono">120 BPM</span>
                    </div>
                    <div className="h-8 w-full flex items-center gap-1">
                      {[...Array(20)].map((_, i) => (
                        <div key={i} className="flex-1 bg-neon-blue/40 rounded-full" style={{ height: `${Math.random() * 100}%` }}></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Social Proof */}
      <section className="py-10 border-y border-white/5 bg-white/[0.02] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-medium text-gray-500 mb-6 uppercase tracking-widest">Trusted by creators, DJs & music lovers</p>
          <div className="flex justify-center flex-wrap gap-8 md:gap-12 opacity-50 grayscale">
            <div className="text-xl font-display font-bold">Spotify</div>
            <div className="text-xl font-display font-bold">SoundCloud</div>
            <div className="text-xl font-display font-bold">Pioneer DJ</div>
            <div className="text-xl font-display font-bold">Rekordbox</div>
            <div className="text-xl font-display font-bold">Apple Music</div>
          </div>
        </div>
      </section>

      {/* 3. Features Section */}
      <section id="features" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">Intelligent Mixing Arsenal</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Everything you need to create festival-ready sets without touching a deck.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard icon={<Activity className="w-6 h-6 text-neon-pink" />} title="AI Beat Matching" desc="Flawless grid alignment and tempo syncing across any genre." />
            <FeatureCard icon={<Music className="w-6 h-6 text-neon-purple" />} title="Harmonic Mixing" desc="Key detection and shifting for musically perfect transitions." />
            <FeatureCard icon={<Sliders className="w-6 h-6 text-neon-blue" />} title="Real-Time Effects" desc="Context-aware EQ, filters, and reverb applied automatically." />
            <FeatureCard icon={<Layers className="w-6 h-6 text-neon-green" />} title="Smart Transitions" desc="Phrase-aware mixing that drops exactly on the 1." />
            <FeatureCard icon={<Headphones className="w-6 h-6 text-yellow-400" />} title="DJ Personalities" desc="Choose from Club, Festival, Radio, or Chill mixing styles." />
            <FeatureCard icon={<Download className="w-6 h-6 text-orange-400" />} title="Live Export" desc="Record and export your sets in high-quality WAV or MP3." />
          </div>
        </div>
      </section>

      {/* 4. How It Works */}
      <section id="how-it-works" className="py-24 bg-[#15191E] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">From Tracks to Mainstage</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Four simple steps to your perfect mix.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-pink -translate-y-1/2 opacity-20"></div>
            <StepCard number="01" icon={<UploadCloud />} title="Upload Tracks" desc="Drop your playlist or select a genre." />
            <StepCard number="02" icon={<Cpu />} title="AI Analysis" desc="Engine maps BPM, key & energy levels." />
            <StepCard number="03" icon={<Zap />} title="Smart Mixing" desc="AI crafts seamless transitions." />
            <StepCard number="04" icon={<Play />} title="Output Set" desc="Listen live or export your mix." />
          </div>
        </div>
      </section>

      {/* 5. Product Preview */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-purple/5 to-transparent pointer-events-none"></div>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-white">Experience the Interface</h2>
          <div className="relative rounded-2xl border border-white/10 bg-[#0B0F14] shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
            <img src="https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=2076&auto=format&fit=crop" alt="DJ Interface" className="w-full h-auto opacity-50 group-hover:opacity-70 transition-opacity duration-700" referrerPolicy="no-referrer" />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
              <button onClick={onStartMixing} className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                Launch Studio <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            {/* Floating Labels */}
            <div className="absolute top-1/4 left-10 bg-black/80 backdrop-blur border border-white/10 px-4 py-2 rounded-lg text-sm font-medium text-neon-cyan z-20 hidden md:block animate-pulse">Dual AI Decks</div>
            <div className="absolute top-1/3 right-10 bg-black/80 backdrop-blur border border-white/10 px-4 py-2 rounded-lg text-sm font-medium text-neon-pink z-20 hidden md:block animate-pulse" style={{ animationDelay: '1s' }}>Smart FX Panel</div>
          </div>
        </div>
      </section>

      {/* 6. AI DJ Personalities */}
      <section className="py-24 bg-[#15191E] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">Choose Your Vibe</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Different crowds need different energy. Select an AI personality to guide the mix.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <PersonalityCard title="Club DJ" color="bg-neon-purple" desc="High energy, quick cuts, heavy bass drops." />
            <PersonalityCard title="Festival DJ" color="bg-neon-pink" desc="Epic build-ups, massive anthems, crowd control." />
            <PersonalityCard title="Radio DJ" color="bg-neon-cyan" desc="Smooth fades, vocal focus, pop-friendly." />
            <PersonalityCard title="Chill" color="bg-neon-green" desc="Long blends, ambient textures, deep grooves." />
          </div>
        </div>
      </section>

      {/* 7. Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-400">Start for free, upgrade when you need more power.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard title="Free" price="$0" desc="Perfect for trying out the AI engine." features={["5 tracks per mix", "Standard transitions", "Web playback"]} />
            <PricingCard title="Pro" price="$15" period="/mo" desc="For creators and house parties." highlight features={["Unlimited tracks", "Advanced FX & EQ", "WAV export", "All AI Personalities"]} />
            <PricingCard title="Studio" price="$39" period="/mo" desc="For professional DJs and venues." features={["Everything in Pro", "Stem separation", "MIDI controller support", "Commercial license"]} />
          </div>
        </div>
      </section>

      {/* 8. CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 via-neon-pink/20 to-neon-cyan/20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10 bg-black/40 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">Ready to Experience AI DJ Mixing?</h2>
          <p className="text-xl text-gray-300 mb-10">Join thousands of creators making perfect mixes in seconds.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={onStartMixing} className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              Start Mixing Free
            </button>
            <button className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/5 transition-colors">
              Try Demo
            </button>
          </div>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="bg-[#0B0F14] py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Disc className="w-6 h-6 text-neon-purple" />
            <span className="text-xl font-bold font-display text-white tracking-tight">MIXORA AI</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Product</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
          </div>
          <div className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Mixora AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="group bg-[#15191E] p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    <div className="mb-6 w-14 h-14 rounded-xl bg-black/50 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{desc}</p>
  </div>
);

const StepCard = ({ number, icon, title, desc }: { number: string, icon: React.ReactNode, title: string, desc: string }) => (
  <div className="relative z-10 bg-[#0B0F14] p-6 rounded-2xl border border-white/5 text-center group hover:border-white/20 transition-colors">
    <div className="text-5xl font-display font-bold text-white/5 absolute top-4 right-4 group-hover:text-white/10 transition-colors">{number}</div>
    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gray-800 to-black rounded-full flex items-center justify-center mb-6 border border-white/10 text-white group-hover:text-neon-cyan transition-colors shadow-lg">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
    <p className="text-gray-400 text-sm">{desc}</p>
  </div>
);

const PersonalityCard = ({ title, color, desc }: { title: string, color: string, desc: string }) => (
  <div className="bg-[#0B0F14] p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-all group relative overflow-hidden">
    <div className={`absolute top-0 left-0 w-full h-1 ${color}`}></div>
    <div className={`absolute inset-0 ${color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
    <h3 className="text-xl font-bold mb-3 text-white mt-2">{title}</h3>
    <p className="text-gray-400 text-sm">{desc}</p>
  </div>
);

const PricingCard = ({ title, price, period, desc, features, highlight }: { title: string, price: string, period?: string, desc: string, features: string[], highlight?: boolean }) => (
  <div className={`p-8 rounded-3xl flex flex-col ${highlight ? 'bg-gradient-to-b from-[#15191E] to-[#0B0F14] border-2 border-neon-purple relative shadow-[0_0_40px_rgba(139,92,246,0.15)]' : 'bg-[#15191E] border border-white/5'}`}>
    {highlight && <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-neon-purple text-white text-xs font-bold px-4 py-1 rounded-b-lg">RECOMMENDED</div>}
    <h3 className="text-2xl font-bold mb-2 text-white mt-4">{title}</h3>
    <p className="text-sm text-gray-400 mb-6">{desc}</p>
    <div className="mb-8 flex items-baseline gap-1">
      <span className="text-5xl font-display font-bold text-white">{price}</span>
      {period && <span className="text-gray-500">{period}</span>}
    </div>
    <ul className="space-y-4 mb-8 flex-1">
      {features.map((f, i) => (
        <li key={i} className="flex items-center gap-3 text-gray-300">
          <CheckCircle className={`w-5 h-5 ${highlight ? 'text-neon-purple' : 'text-gray-600'}`} />
          {f}
        </li>
      ))}
    </ul>
    <button className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${highlight ? 'bg-neon-purple hover:bg-purple-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]' : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'}`}>
      Choose {title}
    </button>
  </div>
);

export default LandingPage;
