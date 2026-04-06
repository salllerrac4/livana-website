import type { PropsWithChildren } from 'react';
import type { HelmetServerState } from 'react-helmet-async';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from './hooks/useCart';

type HelmetContext = {
  helmet?: HelmetServerState;
};

interface AppProvidersProps extends PropsWithChildren {
  helmetContext?: HelmetContext;
}

const AppProviders = ({ children, helmetContext }: AppProvidersProps) => (
  <HelmetProvider context={helmetContext}>
    <CartProvider>{children}</CartProvider>
  </HelmetProvider>
);

export default AppProviders;
