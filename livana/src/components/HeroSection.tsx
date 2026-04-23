import Button from './Button';
import heroDesktop from '../assets/hero-1-desktop.jpg';
import heroMobile from '../assets/hero-1-mobile.jpg';

const metrics = [
  { value: '4,9/5', label: 'ĐÁNH GIÁ HÀI LÒNG' },
  { value: '+10', label: 'MÙI HƯƠNG' },
  { value: '24-48H', label: 'GIAO HÀNG' },
];

const avatars = ['#2D9CDB', '#F2994A', '#EB5757', '#6FCF97'];

const HeroSection = () => {
  return (
    <section className="hero-section relative w-full overflow-hidden font-display">
      <div className="hero-stage mx-auto w-full max-w-[1440px] overflow-hidden">
        <img
          src={heroDesktop}
          srcSet={`${heroMobile} 700w, ${heroDesktop} 1400w`}
          sizes="100vw"
          width="1400"
          height="773"
          loading="eager"
          decoding="async"
          alt="Không gian tinh dầu Livana"
          className="hero-stage__media hero-creative-motion"
        />
        <div className="hero-stage__overlay" aria-hidden="true" />
        <div className="hero-stage__content hero-reveal hero-reveal--1">
          <p className="hero-stage__eyebrow">Bộ sưu tập tinh dầu thiên nhiên</p>
          <h1 className="hero-display hero-stage__title">
            Chạm vào
            <span>một khoảng</span>
            <span>an nhiên</span>
          </h1>
          <p className="hero-stage__subtitle">
            Hương thơm dịu nhẹ cho phòng ngủ, góc làm việc và những lúc bạn cần chậm lại, thở sâu hơn một chút.
          </p>
          <div className="hero-stage__actions">
            <Button to="/products" className="hero-stage__cta">
              Xem sản phẩm
            </Button>
            <Button to="/about" variant="ghost" className="hero-stage__link">
              Câu chuyện LIVANA
            </Button>
          </div>
          <p className="hero-stage__note">Tư vấn chọn mùi miễn phí | Giao hàng nhanh toàn quốc</p>
        </div>
      </div>

      <div className="hero-metrics text-textMain">
        <div className="mx-auto grid w-full max-w-screen-xl grid-cols-2 bg-white/72 backdrop-blur-sm sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.45fr]">
          {metrics.map((item, idx) => (
            <div key={item.label} className={`px-7 py-5 ${idx > 0 ? 'lg:border-l lg:border-primary/12' : ''}`}>
              <p className="text-xl font-semibold sm:text-2xl">{item.value}</p>
              <p className="mt-1 text-sm text-textMain/70">{item.label}</p>
            </div>
          ))}

          <div className="px-7 py-5 sm:hidden">
            <p className="text-xl font-semibold">187K</p>
            <p className="mt-1 text-sm text-textMain/70">KHÁCH HÀNG</p>
          </div>

          <div className="hidden items-center gap-4 border-l border-primary/12 px-6 py-4 sm:flex">
            <div className="flex -space-x-3">
              {avatars.map((color, index) => (
                <span
                  key={color}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold text-white ring-2 ring-[#fffaf3]"
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
