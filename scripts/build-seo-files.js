'use strict';
const fs = require('fs');
const upath = require('upath');
const sh = require('shelljs');

const distPath = upath.resolve(upath.dirname(__filename), '../dist');
const siteUrl = 'https://revivephysiobkk.com';

if (!sh.test('-e', distPath)) {
    sh.mkdir('-p', distPath);
}

// robots.txt — allow everything, point crawlers at the sitemap.
const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;
fs.writeFileSync(upath.join(distPath, 'robots.txt'), robotsTxt);
console.log('### INFO: wrote dist/robots.txt');

// sitemap.xml — single-page site, one entry.
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
  </url>
</urlset>
`;
fs.writeFileSync(upath.join(distPath, 'sitemap.xml'), sitemapXml);
console.log('### INFO: wrote dist/sitemap.xml');
