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

  // reveal observer — keeps brutalist fallback, enhanced by GSAP batch below
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

  // Lenis + GSAP ScrollTrigger — super scroll foundation
  useEffect(() => {
    // respect reduced motion: skip smooth + scrub, keep static progress hidden
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

    // Sync ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    // RAF loop — mirrors Lenis docs; ticker also added for GSAP lagSmoothing compat
    function raf(time) {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    }
    rafIdRef.current = requestAnimationFrame(raf);

    const tickerHandler = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerHandler);
    gsap.ticker.lagSmoothing(0);

    // scroll progress bar — scrub from 0 to 1 across whole doc
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

    // evidence-row stagger reveal — punchy, subtle (12-16px)
    ScrollTrigger.batch('.evidence-row', {
      onEnter: (els) =>
        gsap.fromTo(
          els,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out', stagger: 0.07, overwrite: true },
        ),
      start: 'top 92%',
      once: true,
    });

    // generic reveal enhancement — complements observer (GSAP as progressive enhancement)
    ScrollTrigger.batch('.reveal', {
      onEnter: (els) =>
        gsap.to(els, {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
          stagger: 0.05,
          overwrite: true,
        }),
      start: 'top 92%',
    });

    // lightweight section snap — lenis + gsap snap can conflict, so keep snap soft (0.1)
    // sections.length-aware snap; snap 1/(n-1) with tolerance so it feels punchy not janky
    const sections = document.querySelectorAll('.section-shell');
    let snapTrigger;
    if (sections.length > 1) {
      snapTrigger = ScrollTrigger.create({
        snap: 1 / (sections.length - 1),
        // delay + duration keep snap subtle; lenis smooth handles the glide
        // ScrollTrigger snap is 0.1-scale soft — adjust as content slogans evolve
      });
      // Fallback soft snap value per spec: 0.1 tolerance
      if (snapTrigger && snapTrigger.vars) {
        snapTrigger.vars.snap = 0.1;
      }
    }

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
    <div className="flex min-h-screen flex-col">
      {/* scroll progress — fixed top, GSAP drives scaleX 0→1 */}
      <div
        id="progress"
        className="fixed top-0 left-0 h-[2px] w-full bg-[#8b1a1a] z-[100] origin-left scale-x-0 will-change-transform"
        aria-hidden="true"
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
