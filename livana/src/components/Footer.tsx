import { Link } from 'react-router-dom';

const Footer = () => {
  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/livana.official',
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M22 12.07C22 6.48 17.52 2 11.93 2 6.34 2 1.86 6.48 1.86 12.07c0 4.97 3.65 9.1 8.43 9.9v-6.99H7.9v-2.91h2.39v-2.22c0-2.36 1.4-3.66 3.54-3.66 1.02 0 2.08.18 2.08.18v2.29h-1.17c-1.15 0-1.51.72-1.51 1.46v1.95h2.56l-.41 2.91h-2.15v6.99C18.35 21.17 22 17.04 22 12.07Z"
          />
        </svg>
      ),
    },
    {
      name: 'TikTok',
      href: 'https://www.tiktok.com/@livana.official',
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M12.8 3h2.46c.2 2.2 1.85 3.64 4.03 3.78v2.37c-.95.09-1.9-.12-2.76-.55v6.07c0 3.85-2.3 5.86-5.48 5.86-1.16 0-2.28-.34-3.2-1a5.57 5.57 0 0 1 2.95-10.18v2.44a2.86 2.86 0 0 0-1.41 5.4c.43.27.91.39 1.41.37 1.49 0 2.42-.93 2.42-2.81V3Z"
          />
        </svg>
      ),
    },
    {
      name: 'Shopee',
      href: 'https://shopee.vn/livana.official',
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M17.1 7.4h-1.08c-.21-1.36-1.39-2.37-2.89-2.37-1.5 0-2.68 1.01-2.89 2.37H9.1c-.58 0-1.05.42-1.1.96l-.82 8.96A2.56 2.56 0 0 0 9.65 20h7.18a2.56 2.56 0 0 0 2.47-2.68l-.82-8.96a1.05 1.05 0 0 0-1.08-.96Zm-3.97-1.3c.95 0 1.64.58 1.82 1.3h-3.64c.18-.72.87-1.3 1.82-1.3Zm-2.29 5.45c0-1.23 1.03-1.88 2.11-1.88.68 0 1.39.2 1.92.58l-.56.75c-.38-.28-.86-.44-1.35-.44-.53 0-.88.27-.88.65 0 .43.38.58.79.7 1.12.34 2.05.69 2.05 1.87 0 1.21-1.01 1.82-2.16 1.82-.8 0-1.62-.26-2.26-.78l.6-.74c.45.35 1.02.55 1.62.55.59 0 1.04-.3 1.04-.75 0-.59-.6-.75-1.12-.92-1.04-.31-2.13-.69-2.13-1.79Z"
          />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-[#0f3012] text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div className="space-y-3">
          <h3 className="text-xl font-semibold">LIVANA</h3>
          <p className="text-sm text-white/80">
            Thương hiệu tinh dầu thiên nhiên hướng đến sự cân bằng xanh trong từng không gian sống.
          </p>
          <p className="text-xs font-semibold text-primaryLight">SỐNG XANH - AN NHIÊN</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-primaryLight">Liên kết</h4>
          <div className="mt-3 flex flex-col gap-2 text-sm text-white/80">
            <Link to="/products">Sản phẩm</Link>
            <Link to="/about">Về LIVANA</Link>
            <Link to="/blog">Blog cảm hứng</Link>
            <Link to="/contact">Liên hệ</Link>
          </div>
        </div>
        <div className="space-y-3 text-sm text-white/80">
          <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-primaryLight">Kết nối</h4>
          <p>Email: tinhdaulivana@gmail.com</p>
          <p>Hotline/Zalo: 0345077138</p>
          <p>Shopee &amp; Lazada: @livana.official</p>
          <div className="flex items-center gap-3 pt-1">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-primaryLight/60 hover:text-primaryLight"
                aria-label={item.name}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/70">
        © {new Date().getFullYear()} LIVANA. Giữ gần và lan tỏa năng lượng xanh.
      </div>
    </footer>
  );
};

export default Footer;
