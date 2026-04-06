import { renderToString } from 'react-dom/server';
import { createMemoryRouter, RouterProvider } from 'react-router';
import type { HelmetServerState } from 'react-helmet-async';
import AppProviders from './AppProviders';
import { prerenderRoutes } from './prerender-routes';
import { routeObjects } from './routes';

type HelmetContext = {
  helmet?: HelmetServerState;
};

export const render = (url: string) => {
  const helmetContext: HelmetContext = {};
  const router = createMemoryRouter(routeObjects, {
    initialEntries: [url],
  });

  const appHtml = renderToString(
    <AppProviders helmetContext={helmetContext}>
      <RouterProvider router={router} />
    </AppProviders>,
  );

  const helmet = helmetContext.helmet;
  const head = helmet
    ? [
        helmet.title.toString(),
        helmet.priority?.toString() ?? '',
        helmet.meta.toString(),
        helmet.link.toString(),
      ].join('')
    : '';

  return { appHtml, head };
};

export { prerenderRoutes };
