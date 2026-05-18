const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'X-Frame-Options': 'DENY',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
};

function generateNonce() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes));
}

function buildCsp(nonce) {
  return [
    `default-src 'self'`,
    `script-src 'self' 'nonce-${nonce}' https://plausible.io`,
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.fontshare.com`,
    `font-src 'self' data: https://fonts.gstatic.com https://api.fontshare.com`,
    `img-src 'self' data: https:`,
    `connect-src 'self' https://plausible.io`,
    `frame-ancestors 'none'`,
    `base-uri 'self'`,
    `form-action 'self' mailto:`,
  ].join('; ');
}

function isEnglishPath(pathname) {
  return pathname === '/en' || pathname.startsWith('/en/');
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const response = await env.STATIC_ASSETS.fetch(request);
    const contentType = response.headers.get('content-type') || '';
    const isHtml = contentType.includes('text/html');

    const nonce = generateNonce();
    const headers = new Headers(response.headers);

    for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
      headers.set(key, value);
    }
    headers.set('Content-Security-Policy', buildCsp(nonce));

    if (url.pathname.startsWith('/assets/')) {
      headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (url.pathname === '/sitemap.xml' || url.pathname === '/robots.txt') {
      headers.set('Cache-Control', 'public, max-age=3600');
    }

    if (!isHtml) {
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    }

    // For HTML: inject nonce into inline script tags and fix og:locale for /en/
    let html = await response.text();

    // Inject nonce into the Vite runtime inline script (matches any <script> without src)
    html = html.replace(/<script(?![^>]*\bsrc\b)([^>]*)>/g, `<script$1 nonce="${nonce}">`);

    // For /en/ requests rewrite og:locale and canonical in the static shell
    if (isEnglishPath(url.pathname)) {
      html = html.replace(
        '<meta property="og:locale" content="pl_PL" />',
        '<meta property="og:locale" content="en_US" />',
      );
      html = html.replace(
        '<link rel="canonical" href="https://hf.pl/" />',
        '<link rel="canonical" href="https://hf.pl/en/" />',
      );
    }

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
