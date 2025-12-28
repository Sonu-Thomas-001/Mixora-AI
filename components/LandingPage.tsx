import React from 'react';
import { motion } from 'framer-motion';
import { Play, Activity, Mic2, Disc, Zap, Music, ArrowRight, CheckCircle, BrainCircuit } from 'lucide-react';

interface LandingPageProps {
  onStartMixing: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartMixing }) => {
  return (
    <div className="bg-neon-dark min-h-screen text-gray-200 selection:bg-neon-purple selection:text-white overflow-x-hidden">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-neon-dark/90 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-neon-purple blur-md opacity-50 rounded-full"></div>
                <Disc className="w-8 h-8 text-white relative z-10" />
             </div>
             <h1 className="text-2xl font-display font-bold tracking-tight text-white">
               MIXORA <span className="text-neon-purple">AI</span>
             </h1>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#about" className="hover:text-white transition-colors">How it Works</a>
          </div>
          <button 
            onClick={onStartMixing}
            className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-neon-blue transition-colors flex items-center gap-2"
          >
            Start Mixing <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-7xl font-display font-bold leading-tight mb-6">
              Your AI DJ. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue">
                Perfectly Mixed.
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Mixora AI turns any collection of tracks into a seamless, professional DJ set. 
              Our engine analyzes BPM, key, energy, and flow to deliver real-time mixes—automatically.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={onStartMixing}
                className="w-full sm:w-auto px-8 py-4 bg-neon-purple text-white rounded-full font-bold text-lg hover:bg-purple-600 transition-all shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5 fill-current" /> Start Mixing Free
              </button>
              <button className="w-full sm:w-auto px-8 py-4 border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                Watch Demo
              </button>
            </div>
          </motion.div>

          {/* Hero Highlights */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-12 flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-500"
          >
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-neon-green" /> Real-time AI mixing</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-neon-green" /> Beat-matched transitions</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-neon-green" /> Studio-quality export</span>
          </motion.div>
        </div>

        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-purple/10 blur-[120px] rounded-full pointer-events-none"></div>
      </section>

      {/* Feature Section 1: Intelligent Mixing */}
      <section id="features" className="py-24 bg-neon-panel border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-3 py-1 bg-neon-blue/10 text-neon-blue rounded-full text-xs font-bold mb-4">INTELLIGENT ENGINE</div>
            <h2 className="text-4xl font-display font-bold mb-6">AI That Mixes Like a Human DJ</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Mixora AI doesn’t just crossfade tracks. It understands rhythm, energy, and phrasing—making decisions the way real DJs do.
            </p>
            <ul className="space-y-4">
              {[
                "BPM detection & alignment",
                "Harmonic (key-matched) mixing",
                "Phrase-aware transitions",
                "Loudness normalization (LUFS)"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <div className="w-6 h-6 rounded-full bg-neon-blue/20 flex items-center justify-center text-neon-blue">
                    <Activity className="w-3 h-3" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-neon-blue/20 blur-3xl opacity-20 rounded-full"></div>
            <div className="relative bg-neon-dark border border-white/10 rounded-2xl p-6 shadow-2xl">
                {/* Mock Visualization of AI Logic */}
                <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-gray-500">ANALYSIS ENGINE</span>
                    <span className="text-xs text-neon-green flex items-center gap-1"><div className="w-1.5 h-1.5 bg-neon-green rounded-full animate-pulse"></div> ACTIVE</span>
                </div>
                <div className="space-y-3">
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden"><div className="h-full w-3/4 bg-neon-blue"></div></div>
                    <div className="flex justify-between text-xs font-mono text-gray-400">
                        <span>BPM: 128.00</span>
                        <span>KEY: 4A (Fm)</span>
                    </div>
                    <div className="p-4 bg-gray-800/50 rounded border border-white/5 flex gap-4 mt-4">
                        <div className="flex-1 text-center border-r border-white/5">
                            <div className="text-2xl font-bold text-white">92%</div>
                            <div className="text-[10px] text-gray-500">MATCH SCORE</div>
                        </div>
                         <div className="flex-1 text-center">
                            <div className="text-2xl font-bold text-neon-purple">DROP</div>
                            <div className="text-[10px] text-gray-500">NEXT TRANSITION</div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 2: Effects & Personalities */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Feel the Drop, Not the Algorithm</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Effects are applied contextually—never randomly. Choose your AI DJ personality to match the vibe.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<Zap className="w-6 h-6 text-neon-pink" />}
              title="Smart Filters"
              desc="Context-aware Low-pass & High-pass filters applied during transitions."
            />
            <FeatureCard 
              icon={<Mic2 className="w-6 h-6 text-neon-purple" />}
              title="Voice Drops"
              desc="AI-generated DJ drops to announce tracks and keep the energy high."
            />
             <FeatureCard 
              icon={<Music className="w-6 h-6 text-neon-blue" />}
              title="Genre Presets"
              desc="Optimized mixing styles for House, Techno, Hip-Hop, and Chill."
            />
             <FeatureCard 
              icon={<BrainCircuit className="w-6 h-6 text-neon-green" />}
              title="Flow Control"
              desc="AI manages the energy curve of the set to ensure perfect pacing."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Choose Your Tier</h2>
            <p className="text-gray-400">From bedroom DJ to festival mainstage.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Free */}
            <PricingCard 
              title="Mixora Core"
              price="₹0"
              desc="Best for casual users & demos."
              features={["Upload up to 5 tracks", "Basic AI mixing", "Standard transitions", "Live playback only"]}
            />
            {/* Pro */}
            <PricingCard 
              title="Mixora Pro"
              price="₹799"
              period="/ month"
              desc="For creators & content makers."
              highlight
              features={["Unlimited track uploads", "Advanced AI transitions", "DJ effects engine", "Export MP3 / WAV", "AI DJ personalities"]}
            />
             {/* Studio */}
            <PricingCard 
              title="Mixora Studio"
              price="₹2499"
              period="/ month"
              desc="For DJs, studios, and live events."
              features={["Everything in Pro", "Real-time low-latency", "High-res export (WAV)", "Custom transition tuning", "Live streaming mode"]}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neon-dark py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
                 <div className="w-6 h-6 bg-neon-purple rounded-full flex items-center justify-center"><Disc className="w-4 h-4 text-white" /></div>
                 <span className="text-lg font-bold font-display text-white">MIXORA AI</span>
            </div>
            <div className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Mixora AI. All rights reserved.
            </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="bg-neon-panel p-6 rounded-xl border border-white/5 hover:border-white/20 transition-colors">
    <div className="mb-4 bg-white/5 w-12 h-12 rounded-lg flex items-center justify-center">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
  </div>
);

const PricingCard: React.FC<{ title: string; price: string; period?: string; desc: string; features: string[]; highlight?: boolean }> = ({ title, price, period, desc, features, highlight }) => (
  <div className={`p-8 rounded-2xl flex flex-col ${highlight ? 'bg-neon-panel border-2 border-neon-purple relative overflow-hidden' : 'bg-neon-panel/50 border border-white/5'}`}>
    {highlight && <div className="absolute top-0 right-0 bg-neon-purple text-white text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>}
    <h3 className={`text-xl font-bold mb-2 ${highlight ? 'text-white' : 'text-gray-300'}`}>{title}</h3>
    <div className="mb-2">
      <span className="text-4xl font-display font-bold">{price}</span>
      {period && <span className="text-gray-500 text-sm">{period}</span>}
    </div>
    <p className="text-sm text-gray-400 mb-8">{desc}</p>
    
    <ul className="space-y-3 mb-8 flex-1">
      {features.map((f, i) => (
        <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
          <CheckCircle className={`w-4 h-4 ${highlight ? 'text-neon-purple' : 'text-gray-600'}`} />
          {f}
        </li>
      ))}
    </ul>

    <button className={`w-full py-3 rounded-lg font-bold text-sm transition-all ${highlight ? 'bg-neon-purple hover:bg-purple-600 text-white shadow-lg shadow-purple-900/20' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
      Choose Plan
    </button>
  </div>
);

export default LandingPage;