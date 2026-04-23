import { access, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const distDir = resolve(process.cwd(), 'dist');
const serverDir = join(distDir, 'server');
const defaultSiteUrl = 'https://tinhdaulivana.netlify.app';

const loadServerEntry = async () => {
  const candidates = ['entry-server.mjs', 'entry-server.js'];

  for (const fileName of candidates) {
    const filePath = join(serverDir, fileName);
    try {
      await access(filePath);
      return import(pathToFileURL(filePath).href);
    } catch {
      // Try the next candidate.
    }
  }

  throw new Error('Could not find the SSR entry output in dist/server.');
};

const toOutputPath = (route) => {
  if (route === '/') {
    return join(distDir, 'index.html');
  }

  return join(distDir, route.replace(/^\//, ''), 'index.html');
};

const normalizeSiteUrl = (value) => (value ? value.trim().replace(/\/+$/, '') : defaultSiteUrl);
const hasFileExtension = (value) => /\/[^/?#]+\.[^/?#]+(?:[?#].*)?$/i.test(value);
const normalizeSitePath = (value) => {
  if (!value || value === '/') {
    return '/';
  }

  const [pathWithSearch, hash = ''] = value.split('#');
  const [pathname, search = ''] = pathWithSearch.split('?');
  const normalizedPath = hasFileExtension(pathname) ? pathname.replace(/\/+$/, '') : `${pathname.replace(/\/+$/, '')}/`;
  return `${normalizedPath}${search ? `?${search}` : ''}${hash ? `#${hash}` : ''}`;
};

const toSitemapXml = (siteUrl, routes) => {
  const urls = routes
    .map((route) => {
      const path = normalizeSitePath(route);
      return `  <url>\n    <loc>${siteUrl}${path}</loc>\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
};

const toRobotsTxt = (siteUrl) => `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;

const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

console.error = (message, ...rest) => {
  if (typeof message === 'string' && message.includes('useLayoutEffect does nothing on the server')) {
    return;
  }

  if (typeof message === 'string' && message.includes('React does not recognize the `fetchPriority` prop')) {
    return;
  }

  originalConsoleError(message, ...rest);
};

console.warn = (message, ...rest) => {
  if (typeof message === 'string' && message.includes('baseline-browser-mapping')) {
    return;
  }

  originalConsoleWarn(message, ...rest);
};

const template = await readFile(join(distDir, 'index.html'), 'utf8');
const serverEntry = await loadServerEntry();

if (typeof serverEntry.render !== 'function') {
  throw new Error('SSR entry does not export a render(url) function.');
}

if (!Array.isArray(serverEntry.prerenderRoutes)) {
  throw new Error('SSR entry does not export prerenderRoutes.');
}

if (!Array.isArray(serverEntry.sitemapRoutes)) {
  throw new Error('SSR entry does not export sitemapRoutes.');
}

const routes = [...new Set(serverEntry.prerenderRoutes)];
const sitemapRoutes = [...new Set(serverEntry.sitemapRoutes)];
const siteUrl = normalizeSiteUrl(serverEntry.SITE_URL);

for (const route of routes) {
  const { appHtml, head } = await serverEntry.render(route);
  const outputPath = toOutputPath(route);
  const html = template
    .replace('<!--app-head-->', head)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, 'utf8');
}

const { appHtml: notFoundHtml, head: notFoundHead } = await serverEntry.render('/404');
const notFoundPage = template
  .replace('<!--app-head-->', notFoundHead)
  .replace('<div id="root"></div>', `<div id="root">${notFoundHtml}</div>`);

await writeFile(join(distDir, '404.html'), notFoundPage, 'utf8');
await writeFile(join(distDir, 'sitemap.xml'), toSitemapXml(siteUrl, sitemapRoutes), 'utf8');
await writeFile(join(distDir, 'robots.txt'), toRobotsTxt(siteUrl), 'utf8');

await rm(serverDir, { recursive: true, force: true });
console.error = originalConsoleError;
console.warn = originalConsoleWarn;
