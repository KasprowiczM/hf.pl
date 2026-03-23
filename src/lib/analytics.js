const isBrowser = typeof window !== 'undefined';

export function trackEvent(name, properties = {}) {
  if (!isBrowser) {
    return;
  }

  const payload = {
    path: window.location.pathname,
    lang: document.documentElement.lang || 'pl',
    ...properties,
  };

  if (typeof window.plausible === 'function') {
    window.plausible(name, { props: payload });
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: name,
      ...payload,
    });
  }
}

export function trackPageView(language) {
  trackEvent('page_view', { language });
}
