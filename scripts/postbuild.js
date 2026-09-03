import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

// 1. og-card.png from og-card.svg
const svgPath = path.join(ROOT, 'public', 'og-card.svg');
const pngOut = path.join(ROOT, 'dist', 'og-card.png');

if (fs.existsSync(svgPath)) {
  // ensure dist exists
  fs.mkdirSync(path.dirname(pngOut), { recursive: true });
  await sharp(fs.readFileSync(svgPath))
    .resize(1200, 630, { fit: 'contain', background: { r: 15, g: 23, b: 34, alpha: 1 } })
    .png({ quality: 90 })
    .toFile(pngOut);
  console.log('og-card.png ->', pngOut);
} else {
  console.warn('og-card.svg not found, skipping PNG generation');
}

// 2. sitemap.xml with lastmod from git log (fallback today)
let lastmod;
try {
  lastmod = execSync('git log -1 --format=%cs', { cwd: ROOT, encoding: 'utf8' }).trim();
  // validate YYYY-MM-DD
  if (!/^\d{4}-\d{2}-\d{2}$/.test(lastmod)) throw new Error('invalid date');
} catch {
  lastmod = new Date().toISOString().slice(0, 10);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://hf.pl/</loc>
    <xhtml:link rel="alternate" hreflang="pl-PL" href="https://hf.pl/" />
    <xhtml:link rel="alternate" hreflang="en" href="https://hf.pl/en/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://hf.pl/" />
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://hf.pl/en/</loc>
    <xhtml:link rel="alternate" hreflang="pl-PL" href="https://hf.pl/" />
    <xhtml:link rel="alternate" hreflang="en" href="https://hf.pl/en/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://hf.pl/" />
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
`;
const sitemapOut = path.join(ROOT, 'dist', 'sitemap.xml');
fs.mkdirSync(path.dirname(sitemapOut), { recursive: true });
fs.writeFileSync(sitemapOut, sitemap.trim() + '\n');
console.log('sitemap.xml ->', sitemapOut, `lastmod=${lastmod}`);

// 3. prerender dist/en/index.html for SPA /en/ route (Cloudflare Pages)
const distIndex = path.join(ROOT, 'dist', 'index.html');
const enDir = path.join(ROOT, 'dist', 'en');
const enIndex = path.join(enDir, 'index.html');

if (fs.existsSync(distIndex)) {
  let html = fs.readFileSync(distIndex, 'utf8');

  // Load EN locale for replacement
  let en = {};
  try {
    en = JSON.parse(fs.readFileSync(path.join(ROOT, 'src', 'locales', 'en.json'), 'utf8'));
  } catch (_e) {
    // ignore missing locales — fallback to html as-is
    void _e;
  }

  // Replace <html lang="pl"> -> <html lang="en">
  html = html.replace(/<html\s+lang="pl"/, '<html lang="en"');

  // og:locale pl_PL -> en_US
  html = html.replace(/content="pl_PL"/g, 'content="en_US"');

  // Ensure og:locale:alternate exists (inject after og:locale if missing)
  if (!html.includes('og:locale:alternate')) {
    html = html.replace(
      /<meta\s+property="og:locale"\s+content="en_US"\s*\/?>/,
      '<meta property="og:locale" content="en_US" />\n    <meta property="og:locale:alternate" content="pl_PL" />',
    );
  } else {
    // if alternate already exists but is pl_PL inverted, ensure correct for en page
    html = html.replace(/<meta\s+property="og:locale:alternate"\s+content="[^"]*"\s*\/?>/, '<meta property="og:locale:alternate" content="pl_PL" />');
  }

  // canonical https://hf.pl/ -> https://hf.pl/en/
  html = html.replace(/<link\s+rel="canonical"\s+href="https:\/\/hf\.pl\/"\s*\/?>/, '<link rel="canonical" href="https://hf.pl/en/" />');

  // og:url and twitter:url
  html = html.replace(/<meta\s+property="og:url"\s+content="https:\/\/hf\.pl\/"\s*\/?>/, '<meta property="og:url" content="https://hf.pl/en/" />');
  html = html.replace(/<meta\s+property="twitter:url"\s+content="https:\/\/hf\.pl\/"\s*\/?>/, '<meta property="twitter:url" content="https://hf.pl/en/" />');
  // generic fallback for content="https://hf.pl/" that is og:url/twitter:url context - ensure at least og:url is corrected
  if (!html.includes('og:url" content="https://hf.pl/en/')) {
    html = html.replace('content="https://hf.pl/"', 'content="https://hf.pl/en/"');
  }

  // Replace title/description with EN versions if available
  if (en.seo_title) {
    html = html.replace(/<title>.*?<\/title>/s, `<title>${en.seo_title}</title>`);
    // og:title
    html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${en.seo_title}" />`);
    // twitter:title
    if (html.includes('twitter:title')) {
      html = html.replace(/<meta\s+property="twitter:title"\s+content="[^"]*"\s*\/?>/, `<meta property="twitter:title" content="${en.seo_title}" />`);
    } else if (html.includes('name="twitter:title"')) {
      html = html.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/, `<meta property="twitter:title" content="${en.seo_title}" />`);
    }
  }
  if (en.seo_desc) {
    // meta description
    html = html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/, `<meta name="description" content="${en.seo_desc}" />`);
    // og:description
    html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${en.seo_desc}" />`);
    // twitter:description
    if (html.includes('twitter:description')) {
      html = html.replace(/<meta\s+property="twitter:description"\s+content="[^"]*"\s*\/?>/, `<meta property="twitter:description" content="${en.seo_desc}" />`);
      html = html.replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/, `<meta property="twitter:description" content="${en.seo_desc}" />`);
    }
  }

  fs.mkdirSync(enDir, { recursive: true });
  fs.writeFileSync(enIndex, html);
  console.log('prerender ->', enIndex);
} else {
  console.warn('dist/index.html not found, skipping /en/ prerender');
}

// 4. Ensure dist/_headers exists (public/_headers is copied by Vite, but verify)
const publicHeaders = path.join(ROOT, 'public', '_headers');
const distHeaders = path.join(ROOT, 'dist', '_headers');
if (fs.existsSync(publicHeaders) && !fs.existsSync(distHeaders)) {
  fs.copyFileSync(publicHeaders, distHeaders);
  console.log('_headers copied ->', distHeaders);
}
