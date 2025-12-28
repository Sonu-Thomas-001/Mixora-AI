import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import MixerLayout from './components/MixerLayout';

type ViewState = 'landing' | 'mixer';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('landing');

  return (
    <>
      {view === 'landing' ? (
        <LandingPage onStartMixing={() => setView('mixer')} />
      ) : (
        <MixerLayout onBack={() => setView('landing')} />
      )}
    </>
  );
};

export default App;