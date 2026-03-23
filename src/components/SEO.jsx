import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export function SEO() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'pl';
  const baseUrl = 'https://hf.pl';
  const currentUrl = lang === 'en' ? `${baseUrl}/en/` : `${baseUrl}/`;
  const title = t('seo_title');
  const description = t('seo_desc');
  const keywords = t('seo_keywords');
  const image = `${baseUrl}/og-card.svg`;

  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index,follow,max-image-preview:large" />
      <meta name="theme-color" content="#0f1722" />
      <link rel="canonical" href={currentUrl} />
      <link rel="alternate" hrefLang="pl-PL" href={`${baseUrl}/`} />
      <link rel="alternate" hrefLang="en" href={`${baseUrl}/en/`} />
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={lang === 'pl' ? 'pl_PL' : 'en_US'} />
      <meta property="og:site_name" content="hf.pl" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'hf.pl',
          url: baseUrl,
          description,
          inLanguage: lang,
          potentialAction: {
            '@type': 'CommunicateAction',
            target: 'mailto:domain@hf.pl',
          },
        })}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: 'hf.pl',
          description,
          brand: {
            '@type': 'Brand',
            name: 'hf.pl',
          },
          offers: {
            '@type': 'AggregateOffer',
            url: currentUrl,
            priceCurrency: lang === 'pl' ? 'PLN' : 'EUR',
            lowPrice: lang === 'pl' ? '35000' : '8000',
            highPrice: lang === 'pl' ? '40000' : '9000',
            availability: 'https://schema.org/InStock',
          },
        })}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'hf.pl',
          url: baseUrl,
          contactPoint: {
            '@type': 'ContactPoint',
            email: 'domain@hf.pl',
            contactType: 'sales',
            availableLanguage: ['pl', 'en'],
          },
          sameAs: [baseUrl],
        })}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [1, 2, 3].map((index) => ({
            '@type': 'Question',
            name: t(`faq${index}_q`),
            acceptedAnswer: {
              '@type': 'Answer',
              text: t(`faq${index}_a`),
            },
          })),
        })}
      </script>
    </Helmet>
  );
}
