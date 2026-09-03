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
import { trackPageView } from './lib/analytics';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    trackPageView(i18n.resolvedLanguage || i18n.language || 'pl');
  }, [i18n.language, i18n.resolvedLanguage]);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('.reveal'));
    if (!elements.length) return undefined;
    // Editorial: quiet 12px reveal, show immediately if no IO support
    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-visible'));
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);



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
