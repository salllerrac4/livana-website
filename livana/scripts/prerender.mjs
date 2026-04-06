import { access, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const distDir = resolve(process.cwd(), 'dist');
const serverDir = join(distDir, 'server');

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

const routes = [...new Set(serverEntry.prerenderRoutes)];

for (const route of routes) {
  const { appHtml, head } = await serverEntry.render(route);
  const outputPath = toOutputPath(route);
  const html = template
    .replace('<!--app-head-->', head)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, 'utf8');
}

await rm(serverDir, { recursive: true, force: true });
console.error = originalConsoleError;
console.warn = originalConsoleWarn;
