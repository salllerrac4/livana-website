import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';
import SocialLinks from '../components/SocialLinks';

const MainLayout = () => {
  const { pathname } = useLocation();
  const topPaddingClasses = pathname === '/' ? 'pt-[3.75rem] md:pt-24' : 'pt-[5.5rem] md:pt-32';

  return (
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
  );
};

export default MainLayout;
