import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
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
  const lenisRef = useRef(null);
  const rafIdRef = useRef(null);

  useEffect(() => {
    trackPageView(i18n.resolvedLanguage || i18n.language || 'pl');
  }, [i18n.language, i18n.resolvedLanguage]);

  // reveal fallback for no-js / before GSAP
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

  // Lenis + GSAP ScrollTrigger — FIXED: pinSpacing true, scrub 0.5, no overlap
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return undefined;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      smoothTouch: false,
      gestureOrientation: 'vertical',
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    function raf(time) {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    }
    rafIdRef.current = requestAnimationFrame(raf);

    const tickerHandler = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerHandler);
    gsap.ticker.lagSmoothing(0);

    // progress cyan #00e5ff — scrub 0.5
    gsap.to('#progress', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
      },
    });

    // terminal batch — y 12 opacity 0 stagger 0.08
    ScrollTrigger.batch('.evidence-row', {
      onEnter: (els) =>
        gsap.fromTo(
          els,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.08, overwrite: true },
        ),
      start: 'top 92%',
      once: true,
    });

    ScrollTrigger.batch('.reveal', {
      onEnter: (els) =>
        gsap.fromTo(
          els,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.08, overwrite: true },
        ),
      start: 'top 92%',
      once: true,
    });

    // no snap — removed to prevent jank; no pin in App (sections keep 85vh + overflow visible)
    ScrollTrigger.refresh();

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      gsap.ticker.remove(tickerHandler);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      lenisRef.current = null;
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#070a12]">
      {/* scroll progress — fixed top, GSAP drives scaleX 0→1, cyan */}
      <div
        id="progress"
        className="fixed top-0 left-0 h-[2px] w-full bg-[#00e5ff] z-[100] origin-left scale-x-0 will-change-transform"
        aria-hidden="true"
        style={{ boxShadow: '0 0 8px rgba(0,229,255,0.6)' }}
      />
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
