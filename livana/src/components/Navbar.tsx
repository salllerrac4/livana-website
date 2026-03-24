import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../assets/logo-livana.svg';
import { useCart } from '../hooks/useCart';

const links = [
  { label: 'Trang chủ', to: '/' },
  { label: 'Sản phẩm', to: '/products' },
  { label: 'Về LIVANA', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'Liên hệ', to: '/contact' },
];

const Navbar = () => {
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const scrollingDown = currentY > lastScrollY.current;
      const pastThreshold = currentY > 80;

      if (!mobileOpen && scrollingDown && pastThreshold) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-primary/10 bg-background/80 backdrop-blur transition-transform duration-300 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-1 md:py-3">
        <Link to="/" className="flex items-center gap-0 text-xl font-semibold leading-none text-primary">
          <img src={Logo} alt="LIVANA logo" className="logo-favicon object-contain" />
          LIVANA
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-textMain/80 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `transition hover:text-primary ${isActive ? 'text-primary' : 'text-textMain/70'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className="relative flex items-center gap-2 rounded-full border border-primary/20 px-4 py-2 text-sm font-semibold text-textMain hover:border-primary"
            aria-label={`Giỏ hàng với ${totalItems} sản phẩm`}
          >
            <span>Giỏ hàng</span>
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-white">
              {totalItems}
            </span>
          </Link>
          <button
            className="md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Mở menu"
          >
            <span className="block h-0.5 w-6 bg-textMain"></span>
            <span className="mt-1 block h-0.5 w-6 bg-textMain"></span>
            <span className="mt-1 block h-0.5 w-6 bg-textMain"></span>
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="border-t border-primary/10 bg-background px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3 text-sm font-semibold text-textMain">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} onClick={() => setMobileOpen(false)} className="py-1">
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
