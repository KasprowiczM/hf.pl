import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export function SEO({ theme }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'pl';
  
  const title = t('seo_title');
  const description = t('seo_desc');
  const keywords = t('seo_keywords');
  const url = 'https://hf.pl';
  const themeColor = theme === 'dark' ? '#08080a' : '#fafafa';

  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="theme-color" content={themeColor} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${url}/og-image.jpg`} />
      <meta property="og:locale" content={lang === 'pl' ? 'pl_PL' : 'en_US'} />
      <meta property="og:site_name" content="hf.pl" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${url}/og-image.jpg`} />
      
      {/* Schema.org JSON-LD for AI Bots & Search Engines */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "hf.pl",
          "url": url,
          "description": description,
          "inLanguage": lang
        })}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "hf.pl",
          "description": description,
          "brand": {
            "@type": "Brand",
            "name": "hf.pl"
          },
          "offers": {
            "@type": "AggregateOffer",
            "url": url,
            "priceCurrency": lang === 'pl' ? "PLN" : "EUR",
            "lowPrice": lang === 'pl' ? "35000" : "8000",
            "highPrice": lang === 'pl' ? "40000" : "9000",
            "availability": "https://schema.org/InStock"
          }
        })}
      </script>
    </Helmet>
  );
}
