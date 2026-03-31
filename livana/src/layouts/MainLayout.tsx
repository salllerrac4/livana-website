import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';
import SocialLinks from '../components/SocialLinks';

const MainLayout = () => {
  const { pathname } = useLocation();
  const topPaddingClasses = pathname === '/' ? 'pt-[3.75rem] md:pt-24' : 'pt-[5.5rem] md:pt-32';
  const metaTitle = 'Tinh Dau LIVANA | Tinh dau thien nhien cho khong gian thu gian';
  const metaDescription =
    'Tinh Dau LIVANA cung cap tinh dau thien nhien, an toan cho gia dinh va khong gian spa tai nha. Mua bo huong thom dac sac, nhan tu van pha che va giao hang toan quoc.';
  const metaUrl = 'https://tinhdaulivana.netlify.app/';
  const metaImage = `${metaUrl}assets/hero-1.png`;

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content="tinh dau, tinh dau thien nhien, Livana, huong phong, huong thom Viet" />
        <link rel="canonical" href={metaUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={metaUrl} />
        <meta property="og:image" content={metaImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaImage} />
      </Helmet>
      <div className="min-h-screen bg-background text-textMain">
        <Navbar />
        <SocialLinks />
        <main className={`px-4 pb-16 overflow-x-hidden ${topPaddingClasses}`}>
          <div className="mx-auto max-w-6xl space-y-16">
            <Outlet />
          </div>
        </main>
        <Footer />
        <ScrollToTopButton />
        <ScrollRestoration />
      </div>
    </>
  );
};

export default MainLayout;
