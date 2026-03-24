const PhoneIcon = () => (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="h-6 w-6 text-white"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.5 6.5c0 .6-.1 1.2-.3 1.7a1 1 0 0 1-.2 1.1l-.7.7c-.4.4-.5 1-.2 1.5a11 11 0 0 0 4.9 4.9c.5.3 1.1.2 1.5-.2l.7-.7a1 1 0 0 1 1.1-.2c.5.2 1.1.3 1.7.3.6 0 1 .4 1 1V19c0 .6-.4 1-1 1C10.6 20 4 13.4 4 5c0-.6.4-1 1-1h2.3c.6 0 1 .4 1 1 0 .6.1 1.2.2 1.7 0 .1 0 .1 0 0Z"
    />
  </svg>
);

const MailIcon = () => (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="h-6 w-6 text-white"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6.5c0-.8.7-1.5 1.5-1.5h13c.8 0 1.5.7 1.5 1.5v11c0 .8-.7 1.5-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5v-11Z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="m5 7 7 5 7-5" />
  </svg>
);

const socials = [
  { label: 'Gọi ngay', href: 'tel:+84345077138', bg: '#F3436B', icon: <PhoneIcon /> },
  { label: 'Zalo', href: 'https://zalo.me/+84345077138', bg: '#0A84D0', icon: <span className="text-lg font-semibold text-white">Z</span> },
  { label: 'Email', href: 'mailto:tinhdaulivana@gmail.com', bg: '#F59E0B', icon: <MailIcon /> },
];

const SocialLinks = () => {
  return (
    <div className="fixed left-3 bottom-16 z-50 flex flex-col items-center gap-3">
      {socials.map((item) => (
        <a
          key={item.label}
          href={item.href}
          aria-label={item.label}
          className="group flex h-12 w-12 items-center justify-center rounded-full shadow-soft transition-transform duration-200 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          style={{ backgroundColor: item.bg }}
          target={item.href.startsWith('http') ? '_blank' : undefined}
          rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
