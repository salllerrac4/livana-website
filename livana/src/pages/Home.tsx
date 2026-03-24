import FeatureGrid from '../components/FeatureGrid';
import HeroSection from '../components/HeroSection';
import ProductGrid from '../components/ProductGrid';
import ReviewCard from '../components/ReviewCard';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import { products } from '../data/products';
import usageGuideImg from '../assets/huong dan su dung.svg';

const reviewList = [
  {
    name: 'Lan Chi - Hà Nội',
    title: 'Không gian ngủ dễ chịu hơn',
    message: 'Hương phòng ngủ trước khi ngủ giúp mình bỏ điện thoại sớm và ngủ sâu hơn.',
    rating: 5,
  },
  {
    name: 'Gia Khang - TP.HCM',
    title: 'Góc làm việc tinh gọn',
    message: 'Hương thảo mộc không bị ngọt, giúp tập trung tốt khi làm việc tại nhà.',
    rating: 4,
  },
  {
    name: 'Thảo Tiên - Đà Nẵng',
    title: 'Tư vấn chi tiết',
    message: 'Mỗi đơn hàng đều được hướng dẫn kỹ, cảm giác được chăm sóc như tại spa.',
    rating: 5,
  },
];

const safeTips = [
  'Pha loãng với dầu nền khi massage cơ thể.',
  'Khuếch tán 20-30 phút mỗi lần, luôn để phòng thoáng.',
  'Đặt máy trên mặt phẳng chắc chắn, tránh tầm tay trẻ nhỏ.',
  'Bảo quản nơi mát, tránh ánh nắng trực tiếp.',
];

const heroBenefitsImg = '/assets/cong-dung.svg';

const Home = () => {
  const featuredProducts = products.filter((item) => item.isFeatured);

  return (
    <div className="space-y-12 md:space-y-16">
      <HeroSection />
      <FeatureGrid />

      <section className="space-y-8">
        <SectionTitle heading="Sản phẩm nổi bật" subheading="Chọn lọc những mùi hương bán chạy nhất tháng" />
        <ProductGrid products={featuredProducts} />
      </section>

      <section className="grid gap-8 rounded-[32px] bg-white/60 p-8 shadow-soft md:grid-cols-2">
        <div className="space-y-4 order-2 md:order-1">
          <SectionTitle
            heading="Cách sử dụng tinh dầu an toàn"
            subheading="Những lưu ý nhỏ giúp trải nghiệm thiên nhiên tròn vẹn hơn."
            headingClassName="break-words md:whitespace-nowrap"
          />
          <p className="text-sm text-textMain/75">
            Tinh dầu LIVANA đều có độ đậm đặc cao. Hãy đọc kỹ hướng dẫn trước khi áp dụng lên da và ưu tiên pha loãng với
            dầu nền. Khuếch tán luân phiên để không gian luôn thoáng và dễ chịu.
          </p>
          <ul className="space-y-3 text-sm text-textMain/80">
            {safeTips.map((tip) => (
              <li key={tip} className="flex items-start gap-3 rounded-xl bg-white/70 p-3 shadow-sm">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary"></span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="overflow-hidden rounded-2xl border border-primary/10 bg-white/80 shadow-soft max-w-md w-full justify-self-center order-1 md:order-2">
          <img
            src={usageGuideImg}
            alt="Hướng dẫn sử dụng tinh dầu"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </section>

      <section className="rounded-[32px] bg-white/80 px-6 py-8 shadow-soft md:px-10">
        <div className="mx-auto grid max-w-5xl items-center gap-8 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-primary/10 bg-white">
            <img
              src={heroBenefitsImg}
              alt="Công dụng tinh dầu Livana"
              className="w-full object-contain"
              loading="lazy"
            />
          </div>
          <div className="space-y-4 text-left">
            <SectionTitle heading="Công dụng tuyệt vời" subheading="Tự nhiên · An toàn · Hiệu quả" />
            <p className="text-sm text-textMain/75">
              Lợi ích nổi bật của tinh dầu LIVANA: giúp thư giãn, lọc không khí, đuổi côn trùng và hỗ trợ giấc ngủ ngon. Mỗi giọt đều được chưng cất từ nguyên liệu chọn lọc, không pha tạp, an toàn cho cả gia đình. Dùng đều đặn giúp hỗ trợ cân bằng tâm trạng sau ngày dài căng thẳng.
            </p>
            <ul className="space-y-2 text-sm text-textMain/75">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary"></span>
                Giảm nhanh cảm giác bí bách, khử mùi phòng kín sau 15 phút khuếch tán.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary"></span>
                Tạo nền hương thơm thư giãn giúp vào giấc nhanh hơn, ngủ sâu và ít tỉnh giấc.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary"></span>
                Tinh dầu cam quýt & sả chanh hỗ trợ xua côn trùng, đặc biệt vào mùa mưa.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary"></span>
                Có thể pha loãng để massage thư giãn vai gáy hoặc hòa cùng nước tắm ấm.
              </li>
            </ul>
            <Button to="/products" className="mt-2 inline-flex">
              Xem sản phẩm
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <SectionTitle heading="Khách hàng nói gì về LIVANA" align="center" />
        <div className="grid gap-6 md:grid-cols-3">
          {reviewList.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </div>
      </section>

      <section className="rounded-[32px] bg-gradient-to-r from-primary to-primaryLight px-8 py-12 text-white shadow-soft">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-white/70">Sống xanh mỗi ngày</p>
            <h3 className="mt-3 text-3xl font-semibold">Ưu đãi riêng cho bộ sưu tập mùa lạnh</h3>
            <p className="mt-2 text-sm text-white/80">Nhận tư vấn phối hương miễn phí khi đặt hàng online trong tuần này.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button to="/products" variant="secondary">
              Đặt mua ngay
            </Button>
            <Button to="/contact" variant="ghost" className="text-white">
              Nhận tư vấn
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
