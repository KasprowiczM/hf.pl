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
  const image = `${baseUrl}/og-card.png`;
  const locale = lang === 'pl' ? 'pl_PL' : 'en_US';
  const localeAlternate = lang === 'pl' ? 'en_US' : 'pl_PL';
  const imageAlt = 'hf.pl — premium two-letter .pl domain';

  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index,follow,max-image-preview:large" />
      <meta name="theme-color" content="#070a12" />
      <link rel="canonical" href={currentUrl} />
      <link rel="alternate" hrefLang="pl-PL" href={`${baseUrl}/`} />
      <link rel="alternate" hrefLang="en" href={`${baseUrl}/en/`} />
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:locale" content={locale} />
      <meta property="og:locale:alternate" content={localeAlternate} />
      <meta property="og:site_name" content="hf.pl" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={imageAlt} />
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'hf.pl',
          url: baseUrl,
          description,
          inLanguage: ['pl-PL', 'en-US'],
          potentialAction: {
            '@type': 'CommunicateAction',
            target: 'mailto:domain@hf.pl',
          },
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['#tldr', '#faq'],
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
          sku: 'hf.pl',
          image: `${baseUrl}/og-card.png`,
          offers: [
            {
              '@type': 'Offer',
              priceCurrency: 'PLN',
              lowPrice: '35000',
              highPrice: '40000',
              availability: 'https://schema.org/InStock',
              url: currentUrl,
              priceValidUntil: '2026-12-31',
              seller: {
                '@type': 'Organization',
                name: 'hf.pl',
              },
            },
            {
              '@type': 'Offer',
              priceCurrency: 'EUR',
              lowPrice: '8200',
              highPrice: '9400',
              availability: 'https://schema.org/InStock',
              url: currentUrl,
              priceValidUntil: '2026-12-31',
              seller: {
                '@type': 'Organization',
                name: 'hf.pl',
              },
            },
          ],
        })}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'hf.pl',
          url: baseUrl,
          logo: `${baseUrl}/og-card.png`,
          contactPoint: {
            '@type': 'ContactPoint',
            email: 'domain@hf.pl',
            contactType: 'sales',
            areaServed: 'PL',
            availableLanguage: ['pl', 'en'],
          },
          sameAs: [baseUrl],
        })}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: `${baseUrl}/`,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'hf.pl',
              item: currentUrl,
            },
          ],
        })}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [1, 2, 3, 4, 5, 6, 7].map((index) => ({
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
