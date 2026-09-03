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

  // reveal observer — Swiss fallback, GSAP batch is progressive enhancement
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

  // Lenis + GSAP — Signal Swiss: Lenis duration 1.0, pinSpacing true, no overlap
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return undefined;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.0,
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

    // horizontal scroll progress — signal red 2px
    gsap.to('#progress', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });

    // evidence rows — y12 stagger 0.06 (brief) — Swiss batch
    ScrollTrigger.batch('.evidence-row', {
      onEnter: (els) =>
        gsap.fromTo(
          els,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.48, ease: 'power2.out', stagger: 0.06, overwrite: true },
        ),
      start: 'top 94%',
      once: true,
    });

    // generic reveal complement
    ScrollTrigger.batch('.reveal', {
      onEnter: (els) =>
        gsap.to(els, {
          y: 0,
          opacity: 1,
          duration: 0.42,
          ease: 'power2.out',
          stagger: 0.05,
          overwrite: true,
        }),
      start: 'top 92%',
    });

    // hero split — clipPath inset scrub 0.7 (brief): done inside Hero component via context
    // scarcity WORD pin is inside Scarcity component with pinSpacing true

    // ensure ScrollTrigger measures after fonts/lenis
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
    <div className="flex min-h-screen flex-col bg-[#f6f1e8] dark:bg-[#0a0a0a]">
      {/* scroll progress — signal red 2px top */}
      <div
        id="progress"
        className="fixed top-0 left-0 h-[2px] w-full bg-[#e30613] z-[100] origin-left scale-x-0 will-change-transform dark:bg-[#ff1a2b]"
        aria-hidden="true"
      />
      {/* Swiss 12col grid lines — faint vertical hairlines (desktop) */}
      <div className="swiss-grid-overlay" aria-hidden="true">
        <div className="swiss-grid-overlay__inner">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="swiss-grid-overlay__col" />
          ))}
        </div>
      </div>

      <SEO />
      <Navigation />
      <main id="main" className="flex-1 relative z-[1]">
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
