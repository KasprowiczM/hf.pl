import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { SEO } from './SEO';
import { describe, test, expect, vi } from 'vitest';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      const translations = {
        seo_title: 'hf.pl title',
        seo_desc: 'hf.pl description',
        seo_keywords: 'hf.pl,domain',
        faq1_q: 'Q1',
        faq1_a: 'A1',
        faq2_q: 'Q2',
        faq2_a: 'A2',
        faq3_q: 'Q3',
        faq3_a: 'A3',
      };
      return translations[key] || key;
    },
    i18n: { language: 'en' },
  }),
}));

describe('SEO', () => {
  test('sets title, canonical, and hreflang links', () => {
    render(
      <HelmetProvider>
        <SEO />
      </HelmetProvider>,
    );

    expect(document.title).toBe('hf.pl title');
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe('https://hf.pl/en/');
    expect(document.querySelector('link[rel="alternate"][hreflang="en"]')?.getAttribute('href')).toBe('https://hf.pl/en/');
  });

  test('renders key open graph and robots tags', () => {
    render(
      <HelmetProvider>
        <SEO />
      </HelmetProvider>,
    );

    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toContain('index,follow');
    expect(document.querySelector('meta[property="og:site_name"]')?.getAttribute('content')).toBe('hf.pl');
    expect(document.querySelectorAll('script[type="application/ld+json"]').length).toBe(4);
  });
});
