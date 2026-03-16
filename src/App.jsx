import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { WhySection } from './components/WhySection';
import { UseCases } from './components/UseCases';
import { MarketData } from './components/MarketData';
import { Scarcity } from './components/Scarcity';
import { Valuation } from './components/Valuation';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // initialize theme
    const html = document.documentElement;
    html.className = theme;
    html.style.colorScheme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation theme={theme} toggleTheme={toggleTheme} />
      <main id="main" className="flex-grow">
        <Hero />
        <WhySection />
        <UseCases />
        <MarketData theme={theme} />
        <Scarcity />
        <Valuation />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
