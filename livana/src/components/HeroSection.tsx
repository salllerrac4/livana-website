import Button from './Button';
import heroDropLogo from '../assets/hero-1.svg';

const metrics = [
  { value: '4,9/5', label: 'ĐÁNH GIÁ HÀI LÒNG' },
  { value: '+10', label: 'MÙI HƯƠNG' },
  { value: '24-48H', label: 'GIAO HÀNG' },
];

const avatars = ['#2D9CDB', '#F2994A', '#EB5757', '#6FCF97'];
const benefits = [
  '100% tinh dầu nguyên chất',
  'Giúp ngủ sâu, giảm căng thẳng',
  'Mùi hương tinh tế, dịu nhẹ',
];

const HeroSection = () => {
  return (
    <section className="hero-section relative w-full overflow-hidden font-display">
      <div className="hero-content mx-auto grid w-full max-w-screen-xl gap-6 px-4 pt-5 pb-6 sm:px-6 md:gap-8 md:pt-9 md:pb-10 lg:grid-cols-2 lg:gap-12 lg:px-10 lg:pt-11 lg:pb-12 xl:gap-16">
        <div className="order-2 flex w-full flex-col items-start space-y-5 -ml-1 pl-1 text-left sm:space-y-6 sm:ml-0 sm:pl-0 lg:order-1 lg:items-start lg:space-y-7 lg:text-left lg:-ml-1 lg:pl-1">
          <div className="hero-reveal hero-reveal--1 flex flex-wrap items-center gap-3">
            <span className="hero-kicker">Tinh dầu cao cấp</span>
            <div className="hero-proof">
              <span className="hero-proof__dot" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-textMain/70">
                4,9/5 từ khách hàng
              </span>
            </div>
          </div>
          <h1 className="hero-headline hero-display hero-reveal hero-reveal--2 self-start max-w-2xl text-[clamp(2.1rem,5.4vw+0.35rem,3.9rem)] font-semibold leading-[1.02] tracking-tight text-textMain sm:max-w-3xl md:leading-[1.04] pl-1 sm:pl-0">
            <span className="hero-headline-line hero-headline-line--1">Livana</span>
            <span className="hero-headline-line hero-headline-line--2">Tinh dầu thiên nhiên</span>
            <span className="hero-headline-line hero-headline-line--3">Một chạm an nhiên</span>
          </h1>
          <p className="hero-subtitle hero-reveal hero-reveal--3 max-w-xl text-base md:text-lg text-textMain/75 self-start pl-1 sm:pl-0">
            Chắt lọc từ thảo mộc nguyên chất, thiết kế tối giản và lan tỏa dịu nhẹ cho phòng ngủ,
            góc làm việc và mọi khoảnh khắc thư giãn.
          </p>
          <ul className="hero-reveal hero-reveal--4 max-w-2xl space-y-3 text-base md:text-lg text-textMain/75 self-start pl-1 sm:pl-0">
            {benefits.map((text) => (
              <li key={text} className="flex items-start gap-3">
                <span
                  className="mt-[2px] inline-flex h-6 w-6 items-center justify-center rounded-full border border-primary/30 bg-primary/5 text-primary"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 10.5 8.5 14 15 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <div className="hero-reveal hero-reveal--5 flex w-full flex-wrap items-center justify-center gap-3 sm:w-auto lg:justify-start">
            <Button to="/products" className="flex-1 px-7 sm:flex-none">
              Mua ngay
            </Button>
            <Button to="/about" variant="secondary" className="flex-1 px-7 sm:flex-none">
              Về LIVANA
            </Button>
          </div>
          <p className="hero-note hero-reveal hero-reveal--6 pl-1 text-sm text-textMain/65 sm:pl-0">
            Tư vấn chọn mùi miễn phí • Giao hàng nhanh toàn quốc
          </p>
        </div>

        <div className="hero-reveal hero-reveal--2 relative order-1 min-h-[280px] overflow-hidden sm:min-h-[320px] lg:order-2 lg:min-h-[400px] xl:min-h-[430px]">
          <div className="hero-art">
            <span className="hero-art__glow" aria-hidden="true" />
            <span className="hero-art__ring" aria-hidden="true" />
            <div className="hero-art__image-wrap">
              <img src={heroDropLogo} alt="Livana hero" className="hero-art__image hero-creative-motion" />
            </div>
          </div>
        </div>
      </div>

      <div className="text-textMain lg:border-t lg:border-primary/10 -mb-4 sm:mb-0">
        <div className="mx-auto grid w-full max-w-screen-xl grid-cols-2 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.45fr]">
          {metrics.map((item, idx) => (
            <div
              key={item.label}
              className={`px-7 py-5 ${idx > 0 ? 'lg:border-l lg:border-primary/20' : ''}`}
            >
              <p className="text-xl font-semibold sm:text-2xl">{item.value}</p>
              <p className="mt-1 text-sm text-textMain/70">{item.label}</p>
            </div>
          ))}

          <div className="px-7 py-5 sm:hidden">
            <p className="text-xl font-semibold">187K</p>
            <p className="mt-1 text-sm text-textMain/70">KHÁCH HÀNG</p>
          </div>

          <div className="hidden items-center gap-4 border-l border-primary/20 px-6 py-4 sm:flex">
            <div className="flex -space-x-3">
              {avatars.map((color, index) => (
                <span
                  key={color}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold text-white ring-2 ring-[#fff8f1]"
                  style={{ backgroundColor: color }}
                >
                  {String.fromCharCode(65 + index)}
                </span>
              ))}
            </div>
            <div>
              <p className="text-2xl font-semibold">187K</p>
              <p className="mt-1 text-sm text-textMain/70">KHÁCH HÀNG TIN DÙNG</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
