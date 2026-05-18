import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const ROOT = new URL('..', import.meta.url).pathname;

// 1. og-card.png from og-card.svg
const svgPath = path.join(ROOT, 'public', 'og-card.svg');
const pngOut  = path.join(ROOT, 'dist',   'og-card.png');

if (fs.existsSync(svgPath)) {
  await sharp(fs.readFileSync(svgPath))
    .resize(1200, 630, { fit: 'contain', background: { r: 15, g: 23, b: 34, alpha: 1 } })
    .png({ quality: 90 })
    .toFile(pngOut);
  console.log('og-card.png ->', pngOut);
} else {
  console.warn('og-card.svg not found, skipping PNG generation');
}

// 2. sitemap.xml with lastmod = today
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://hf.pl/</loc>
    <xhtml:link rel="alternate" hreflang="pl-PL" href="https://hf.pl/" />
    <xhtml:link rel="alternate" hreflang="en" href="https://hf.pl/en/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://hf.pl/" />
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://hf.pl/en/</loc>
    <xhtml:link rel="alternate" hreflang="pl-PL" href="https://hf.pl/" />
    <xhtml:link rel="alternate" hreflang="en" href="https://hf.pl/en/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://hf.pl/" />
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
`;
const sitemapOut = path.join(ROOT, 'dist', 'sitemap.xml');
fs.writeFileSync(sitemapOut, sitemap.trim() + '\n');
console.log('sitemap.xml ->', sitemapOut);
