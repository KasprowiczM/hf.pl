/* eslint-disable no-unused-vars */
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Lenis from 'lenis';
import { motion, useScroll, useSpring } from 'motion';
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

function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 h-[1px] w-full origin-left z-[100] will-change-transform"
      style={{ scaleX, backgroundColor: '#c9b99a' }}
      aria-hidden="true"
    />
  );
}

function App() {
  const { i18n } = useTranslation();
  const lenisRef = useRef(null);
  const rafIdRef = useRef(null);

  useEffect(() => {
    trackPageView(i18n.resolvedLanguage || i18n.language || 'pl');
  }, [i18n.language, i18n.resolvedLanguage]);

  // reveal fallback — adds is-visible for .reveal if IntersectionObserver unavailable
  // framer whileInView handles main reveals; this is progressive enhancement only
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('.reveal'));
    if (!elements.length) return undefined;
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

  // Lenis — smoothWheel 0.9, NO pin, no GSAP — prevents overlap entirely
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return undefined;

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      gestureOrientation: 'vertical',
      touchMultiplier: 1.4,
      infinite: false,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    }
    rafIdRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-paper)]">
      <ProgressBar />
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
