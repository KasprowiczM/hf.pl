import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { WhySection } from './components/WhySection';
import { UseCases } from './components/UseCases';
import { MarketData } from './components/MarketData';
import { Scarcity } from './components/Scarcity';
import { Valuation } from './components/Valuation';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { SEO } from './components/SEO';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage || i18n.language || 'pl';
  }, [i18n.language, i18n.resolvedLanguage]);

  return (
    <div className="flex min-h-screen flex-col">
      <SEO />
      <Navigation />
      <main id="main" className="flex-1">
        <Hero />
        <WhySection />
        <UseCases />
        <MarketData />
        <Scarcity />
        <Valuation />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
